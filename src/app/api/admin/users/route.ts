import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import {
  apiError,
  apiResponseError,
  authenticateAdminApi,
  pagination,
  requireSafeAdminMutationOrigin,
  writeAdminAuditEvent,
} from "@/lib/admin-api"

const VALID_ROLES = ["student", "parent", "teacher", "school_admin", "admin"] as const

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
} as const

/** GET /api/admin/users — list users with optional role filter. Requires ADMIN role. */
export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request, "admin")
  if (identity instanceof NextResponse) return identity

  try {
    const url = new URL(request.url)
    const { page, limit, skip } = pagination(url.searchParams)
    const search = url.searchParams.get("search")?.trim()
    const roleFilter = url.searchParams.get("role")?.trim()
    const active = url.searchParams.get("active")

    const where: Record<string, unknown> = {
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(roleFilter && VALID_ROLES.includes(roleFilter as (typeof VALID_ROLES)[number])
        ? { role: roleFilter }
        : {}),
      ...(active === "true" ? { isActive: true } : active === "false" ? { isActive: false } : {}),
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
        select: userSelect,
      }),
    ])

    return NextResponse.json({ users, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) })
  } catch (error) {
    return apiError(error, "Failed to list users")
  }
}

/** PUT /api/admin/users — update user role. Requires ADMIN role. */
export async function PUT(request: Request) {
  const identity = await authenticateAdminApi(request, "admin")
  if (identity instanceof NextResponse) return identity

  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let userId: string
  let newRole: string
  try {
    const body = (await request.json()) as { userId?: unknown; role?: unknown }
    if (typeof body.userId !== "string" || !body.userId.trim()) {
      return apiResponseError("userId is required", 400)
    }
    if (typeof body.role !== "string" || !body.role.trim()) {
      return apiResponseError("role is required", 400)
    }
    userId = body.userId.trim()
    newRole = body.role.trim().toLowerCase()

    if (!VALID_ROLES.includes(newRole as (typeof VALID_ROLES)[number])) {
      return apiResponseError(`Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`, 400)
    }

    // Prevent self-demotion below admin
    if (userId === identity.userId && newRole !== "admin") {
      return apiResponseError("Cannot demote your own admin account", 403)
    }
  } catch {
    return apiResponseError("Invalid request body", 400)
  }

  try {
    const existing = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, role: true } })
    if (!existing) {
      return apiResponseError("User not found", 404)
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: userSelect,
    })

    await writeAdminAuditEvent({
      actorId: identity.userId,
      request,
      action: "update_role",
      entityType: "user",
      entityId: user.id,
      metadata: { previousRole: existing.role, newRole },
    })

    return NextResponse.json({ user })
  } catch (error) {
    return apiError(error, "Failed to update user role")
  }
}