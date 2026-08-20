import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { apiError, apiResponseError, authenticateAdminApi, requireSafeAdminMutationOrigin, writeAdminAuditEvent } from "@/lib/admin-api"

const ROLES = new Set(["student", "teacher", "admin", "staff"])

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
    const role = (input.role as string) ?? "student"
    if (!ROLES.has(role)) return apiResponseError("role is invalid", 400)

    let maxUses = 1
    if (input.maxUses !== undefined) {
      if (!Number.isInteger(input.maxUses) || (input.maxUses as number) < 1 || (input.maxUses as number) > 100000)
        return apiResponseError("maxUses must be an integer between 1 and 100000", 400)
      maxUses = input.maxUses as number
    }

    let expiresAt: Date | null = null
    if (input.expiresAt !== undefined && input.expiresAt !== null && input.expiresAt !== "") {
      if (typeof input.expiresAt !== "string") return apiResponseError("expiresAt must be an ISO date", 400)
      expiresAt = new Date(input.expiresAt)
      if (Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) return apiResponseError("expiresAt must be a future ISO date", 400)
    }

    const accessCode = await prisma.accessCode.create({
      data: {
        code: crypto.randomBytes(6).toString("base64url").toUpperCase(),
        tenantId: admin.tenantId!,
        role,
        maxUses,
        expiresAt,
        createdBy: identity.userId,
      },
    })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "create", entityType: "access_code", entityId: accessCode.id, metadata: { role, generated: true } })
    return NextResponse.json({ accessCode }, { status: 201 })
  } catch (error) {
    return apiError(error, "Failed to generate access code")
  }
}