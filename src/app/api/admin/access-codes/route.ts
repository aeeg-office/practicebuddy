import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { apiError, apiResponseError, authenticateAdminApi, pagination, requireSafeAdminMutationOrigin, writeAdminAuditEvent } from "@/lib/admin-api"

const ROLES = new Set(["student", "teacher", "admin", "staff"])
const CODE_PATTERN = /^[A-Z0-9_-]{4,64}$/

function parseCreate(input: Record<string, unknown>) {
  const role = input.role === undefined ? "student" : input.role
  if (typeof role !== "string" || !ROLES.has(role)) return apiResponseError("role is invalid", 400)

  let code: string
  if (input.code === undefined || input.code === null || input.code === "") {
    code = crypto.randomBytes(6).toString("base64url").toUpperCase()
  } else if (typeof input.code !== "string" || !CODE_PATTERN.test(input.code.trim().toUpperCase())) {
    return apiResponseError("code must use 4 to 64 uppercase letters, numbers, hyphens, or underscores", 400)
  } else {
    code = input.code.trim().toUpperCase()
  }

  if (input.maxUses !== undefined && (!Number.isInteger(input.maxUses) || (input.maxUses as number) < 1 || (input.maxUses as number) > 100000)) {
    return apiResponseError("maxUses must be an integer between 1 and 100000", 400)
  }

  let expiresAt: Date | null = null
  if (input.expiresAt !== undefined && input.expiresAt !== null && input.expiresAt !== "") {
    if (typeof input.expiresAt !== "string") return apiResponseError("expiresAt must be an ISO date", 400)
    expiresAt = new Date(input.expiresAt)
    if (Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) return apiResponseError("expiresAt must be a future ISO date", 400)
  }

  return { code, role, maxUses: (input.maxUses as number | undefined) ?? 1, expiresAt }
}

export async function GET(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity

  try {
    const admin = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const params = new URL(request.url).searchParams
    const role = params.get("role")
    const isActive = params.get("isActive")
    if (role !== null && !ROLES.has(role)) return apiResponseError("role is invalid", 400)
    if (isActive !== null && isActive !== "true" && isActive !== "false") return apiResponseError("isActive must be true or false", 400)
    const { page, limit, skip } = pagination(params)
    const where: Record<string, unknown> = { tenantId: admin?.tenantId }
    if (role) where.role = role
    if (isActive !== null) where.isActive = isActive === "true"
    const [total, accessCodes] = await Promise.all([
      prisma.accessCode.count({ where: where as any }),
      prisma.accessCode.findMany({
        where: where as any,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { redemptions: { take: 5, include: { user: { select: { id: true, name: true, email: true } } } } },
      }),
    ])
    return NextResponse.json({ accessCodes, page, limit, total, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    return apiError(error, "Failed to list access codes")
  }
}

export async function POST(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  try {
    const admin = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!admin?.tenantId) return apiResponseError("Admin has no tenant", 403)

    const body: unknown = await request.json()
    if (!body || typeof body !== "object" || Array.isArray(body)) return apiResponseError("Request body must be an object", 400)
    const input = body as Record<string, unknown>
    const data = parseCreate(input)
    if (data instanceof Response) return data
    const accessCode = await prisma.accessCode.create({
      data: { ...data, tenantId: admin.tenantId!, createdBy: identity.userId },
    })
    await writeAdminAuditEvent({
      request, actorId: identity.userId, action: "create", entityType: "access_code", entityId: accessCode.id,
      metadata: { role: data.role, generated: input.code === undefined || input.code === null || input.code === "" },
    })
    return NextResponse.json({ accessCode }, { status: 201 })
  } catch (error) {
    return apiError(error, "Failed to create access code")
  }
}

export async function DELETE(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  const id = new URL(request.url).searchParams.get("id")
  if (!id) return apiResponseError("Access code ID is required", 400)
  try {
    const admin = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const accessCode = await prisma.accessCode.update({
      where: { id, tenantId: admin?.tenantId ?? "" },
      data: { isActive: false },
    })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "revoke", entityType: "access_code", entityId: accessCode.id })
    return NextResponse.json({ accessCode })
  } catch (error) {
    return apiError(error, "Failed to revoke access code")
  }
}