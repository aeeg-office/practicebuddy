import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { apiError, apiResponseError, authenticateAdminApi, pagination, requireSafeAdminMutationOrigin, writeAdminAuditEvent } from "@/lib/admin-api"

const STATUSES = new Set(["pending", "completed", "failed", "refunded"])
const CURRENCY = /^[A-Z]{3}$/

function object(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null
}
function string(value: unknown, field: string, max = 160): string | NextResponse {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max) return apiResponseError(`${field} is invalid`, 400)
  return value.trim()
}

export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  try {
    const params = new URL(request.url).searchParams
    const { page, limit, skip } = pagination(params)
    const status = params.get("status")
    if (status && !STATUSES.has(status)) return apiResponseError("status is invalid", 400)
    const search = params.get("search")?.trim()
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const where: Prisma.PaymentWhereInput = {
      ...(adminUser?.tenantId ? { user: { tenantId: adminUser.tenantId } } : {}),
      ...(status ? { status } : {}),
      ...(search ? { OR: [{ transactionId: { contains: search, mode: "insensitive" } }, { userId: { contains: search, mode: "insensitive" } }] } : {}),
    }
    const [total, payments] = await Promise.all([
      prisma.payment.count({ where }),
      prisma.payment.findMany({ where, skip, take: limit, orderBy: [{ createdAt: "desc" }, { id: "asc" }] }),
    ])
    return NextResponse.json({ payments, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) })
  } catch (error) { return apiError(error, "Failed to list payments") }
}

export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure
  try {
    const input = object(await request.json())
    if (!input) return apiResponseError("Request body must be an object", 400)
    const userId = string(input.userId, "userId")
    if (userId instanceof Response) return userId
    const paymentMethod = input.paymentMethod === undefined ? undefined : string(input.paymentMethod, "paymentMethod", 80)
    if (paymentMethod instanceof Response) return paymentMethod
    if (typeof input.amount !== "string" && typeof input.amount !== "number") return apiResponseError("amount is invalid", 400)
    const amount = String(input.amount).trim()
    if (!/^\d{1,10}(\.\d{1,2})?$/.test(amount) || Number(amount) <= 0) return apiResponseError("amount is invalid", 400)
    const currency = input.currency === undefined ? "EGP" : typeof input.currency === "string" ? input.currency.trim().toUpperCase() : ""
    if (!CURRENCY.test(currency)) return apiResponseError("currency is invalid", 400)
    const status = input.status === undefined ? "pending" : input.status
    if (typeof status !== "string" || !STATUSES.has(status)) return apiResponseError("status is invalid", 400)
    const transactionId = input.transactionId === undefined ? undefined : input.transactionId === null ? null : string(input.transactionId, "transactionId", 200)
    if (transactionId instanceof Response) return transactionId
    const data = {
      userId,
      ...(paymentMethod !== undefined ? { paymentMethod } : {}),
      amount: new Prisma.Decimal(amount),
      currency,
      status,
      ...(transactionId !== undefined ? { transactionId } : {}),
      ...(status === "completed" ? { paidAt: new Date() } : {}),
    }
    const payment = await prisma.payment.create({ data })
    await writeAdminAuditEvent({ actorId: identity.userId, request, action: "create", entityType: "payment", entityId: payment.id, metadata: { status: payment.status, currency: payment.currency } })
    return NextResponse.json({ payment }, { status: 201 })
  } catch (error) { return apiError(error, "Failed to create payment") }
}

export async function PATCH(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure
  try {
    const input = object(await request.json())
    if (!input) return apiResponseError("Request body must be an object", 400)
    const id = string(input.id, "id")
    if (id instanceof Response) return id
    if (Object.keys(input).some(key => !["id", "status"].includes(key))) return apiResponseError("Only payment status may be changed", 400)
    if (typeof input.status !== "string" || !STATUSES.has(input.status)) return apiResponseError("status is invalid", 400)
    const existing = await prisma.payment.findUnique({ where: { id }, select: { id: true, status: true } })
    if (!existing) return apiResponseError("Payment not found", 404)
    const payment = await prisma.payment.update({
      where: { id },
      data: { status: input.status, ...(input.status === "completed" && existing.status !== "completed" ? { paidAt: new Date() } : {}) },
    })
    await writeAdminAuditEvent({ actorId: identity.userId, request, action: "update", entityType: "payment", entityId: payment.id, metadata: { previousStatus: existing.status, status: payment.status } })
    return NextResponse.json({ payment })
  } catch (error) { return apiError(error, "Failed to update payment") }
}