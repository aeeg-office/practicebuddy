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
    const body: unknown = await request.json()
    if (!body || typeof body !== "object" || Array.isArray(body)) return apiResponseError("Request body must be an object", 400)
    const input = body as Record<string, unknown>
    const countRaw = input.count ?? 1
    if (!Number.isInteger(countRaw) || (countRaw as number) < 1 || (countRaw as number) > 500) return apiResponseError("count must be an integer between 1 and 500", 400)
    const count = countRaw as number
    const role = input.role ?? "student"
    if (typeof role !== "string" || !ROLES.has(role)) return apiResponseError("role is invalid", 400)
    if (input.maxUses !== undefined && (!Number.isInteger(input.maxUses) || (input.maxUses as number) < 1 || (input.maxUses as number) > 100000)) return apiResponseError("maxUses must be an integer between 1 and 100000", 400)

    let expiresAt: Date | null = null
    if (input.expiresAt !== undefined && input.expiresAt !== null && input.expiresAt !== "") {
      if (typeof input.expiresAt !== "string") return apiResponseError("expiresAt must be an ISO date", 400)
      expiresAt = new Date(input.expiresAt)
      if (Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) return apiResponseError("expiresAt must be a future ISO date", 400)
    }

    // Get the admin's tenant
    const admin = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!admin?.tenantId) return apiResponseError("Admin has no tenant", 403)

    const codes = new Set<string>()
    while (codes.size < count) codes.add(crypto.randomBytes(6).toString("base64url").toUpperCase())

    const accessCodes = await prisma.accessCode.createManyAndReturn({
      data: [...codes].map((code) => ({
        code,
        tenantId: admin.tenantId!,
        role,
        maxUses: (input.maxUses as number | undefined) ?? 1,
        createdBy: identity.userId,
        expiresAt,
      })),
    })

    await writeAdminAuditEvent({
      request, actorId: identity.userId, action: "batch_create", entityType: "access_code",
      metadata: { count: accessCodes.length, role, generated: true },
    })

    return NextResponse.json({ count: accessCodes.length, accessCodes: accessCodes.map(({ code }) => code) }, { status: 201 })
  } catch (error) {
    return apiError(error, "Failed to generate access codes")
  }
}