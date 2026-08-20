import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import {
  apiResponseError,
  authenticateAdminApi,
  pagination,
  requireSafeAdminMutationOrigin,
  writeAdminAuditEvent,
} from "@/lib/admin-api"

const INTERVALS = new Set(["monthly", "yearly", "weekly", "lifetime"])

function stringValue(value: unknown, field: string, required = false, max = 160): string | null | NextResponse {
  if (value === undefined || value === null) return required ? apiResponseError(`${field} is required`, 400) : null
  if (typeof value !== "string" || !value.trim()) return apiResponseError(`${field} must be a non-empty string`, 400)
  const normalized = value.trim()
  return normalized.length <= max ? normalized : apiResponseError(`${field} must be ${max} characters or fewer`, 400)
}

function planData(input: Record<string, unknown>, partial = false): Record<string, unknown> | NextResponse {
  const data: Record<string, unknown> = {}
  if (input.name !== undefined || !partial) {
    const name = stringValue(input.name, "name", !partial)
    if (name instanceof Response) return name
    if (name !== null) data.name = name
  }
  if (input.description !== undefined) {
    if (input.description !== null && (typeof input.description !== "string" || input.description.trim().length > 2000))
      return apiResponseError("description is invalid", 400)
    data.description = typeof input.description === "string" ? input.description.trim() || null : null
  }
  if (input.price !== undefined) {
    if (typeof input.price !== "number" || !Number.isFinite(input.price) || input.price < 0 || input.price > 1_000_000)
      return apiResponseError("price is invalid", 400)
    data.price = input.price
  }
  if (input.currency !== undefined) {
    const currency = stringValue(input.currency, "currency", false, 3)
    if (currency instanceof Response) return currency
    if (currency !== null) data.currency = currency?.toUpperCase()
  }
  if (input.interval !== undefined) {
    if (typeof input.interval !== "string" || !INTERVALS.has(input.interval)) return apiResponseError("interval is invalid", 400)
    data.interval = input.interval
  }
  if (input.features !== undefined) {
    if (input.features !== null && typeof input.features !== "string") return apiResponseError("features must be a JSON string or null", 400)
    data.features = input.features
  }
  if (input.isActive !== undefined) {
    if (typeof input.isActive !== "boolean") return apiResponseError("isActive must be boolean", 400)
    data.isActive = input.isActive
  }
  return data
}

export async function GET(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  try {
    const { page, limit, skip } = pagination(new URL(request.url).searchParams)
    const includeInactive = new URL(request.url).searchParams.get("includeInactive") === "true"
    const where = includeInactive ? {} : { isActive: true }
    const [total, plans] = await Promise.all([
      prisma.subscriptionPlan.count({ where }),
      prisma.subscriptionPlan.findMany({ where, skip, take: limit, orderBy: [{ price: "asc" }, { name: "asc" }] }),
    ])
    return NextResponse.json({ plans, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } })
  } catch (error) {
    console.error("Error listing subscription plans", error)
    return apiResponseError("Failed to list subscription plans", 500)
  }
}

export async function POST(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure
  try {
    const body: unknown = await request.json()
    if (!body || typeof body !== "object" || Array.isArray(body)) return apiResponseError("Request body must be an object", 400)
    const input = body as Record<string, unknown>
    const data = planData(input)
    if (data instanceof Response) return data
    const plan = await prisma.subscriptionPlan.create({ data: data as any })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "create", entityType: "subscription_plan", entityId: plan.id, metadata: { name: plan.name } })
    return NextResponse.json({ plan }, { status: 201 })
  } catch (error) {
    console.error("Error creating subscription plan", error)
    return apiResponseError("Failed to create subscription plan", 500)
  }
}

export async function PATCH(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure
  try {
    const body: unknown = await request.json()
    if (!body || typeof body !== "object" || Array.isArray(body)) return apiResponseError("Request body must be an object", 400)
    const input = body as Record<string, unknown>
    const id = stringValue(input.id, "id", true)
    if (id instanceof Response || typeof id !== "string") return id instanceof Response ? id : apiResponseError("id is required", 400)
    const data = planData(input, true)
    if (data instanceof Response) return data
    if (!Object.keys(data).length) return apiResponseError("At least one editable field is required", 400)
    const plan = await prisma.subscriptionPlan.update({ where: { id }, data: data as any })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "update", entityType: "subscription_plan", entityId: plan.id, metadata: { fields: Object.keys(data) } })
    return NextResponse.json({ plan })
  } catch (error) {
    console.error("Error updating subscription plan", error)
    return apiResponseError("Failed to update subscription plan", 500)
  }
}

export async function DELETE(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure
  const id = new URL(request.url).searchParams.get("id")
  if (!id) return apiResponseError("id is required", 400)
  try {
    const plan = await prisma.subscriptionPlan.update({ where: { id }, data: { isActive: false } })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "delete", entityType: "subscription_plan", entityId: plan.id, metadata: { name: plan.name } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting subscription plan", error)
    return apiResponseError("Failed to delete subscription plan", 500)
  }
}