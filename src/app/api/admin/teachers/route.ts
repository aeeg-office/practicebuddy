import { Prisma } from "@prisma/client"
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

type TeacherPayload = {
  id?: unknown
  userId?: unknown
  bio?: unknown
  isActive?: unknown
}

function text(value: unknown, field: string, required = false): string | null | undefined {
  if (value === undefined) return undefined
  if (typeof value !== "string") throw new Error(`${field} must be text`)
  const normalized = value.trim()
  if (required && !normalized) throw new Error(`${field} is required`)
  return normalized || null
}

function optionalBoolean(value: unknown, field: string): boolean | undefined {
  if (value === undefined) return undefined
  if (typeof value !== "boolean") throw new Error(`${field} must be true or false`)
  return value
}

function parsePayload(body: TeacherPayload, creating: boolean): Prisma.TeacherUncheckedCreateInput | Prisma.TeacherUncheckedUpdateInput {
  const userId = text(body.userId, "userId", creating)
  const bio = text(body.bio, "bio")
  const isActive = optionalBoolean(body.isActive, "isActive")

  return {
    ...(typeof userId === "string" ? { userId } : {}),
    ...(bio !== undefined ? { bio } : {}),
    ...(isActive !== undefined ? { isActive } : {}),
  }
}

function validationError(error: unknown) {
  return apiResponseError(error instanceof Error ? error.message : "Invalid request", 400)
}

const teacherInclude = {
  user: { select: { id: true, name: true, email: true, isActive: true } },
} as const

/** GET /api/admin/teachers — authenticated, paginated teacher inventory. */
export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const url = new URL(request.url)
    const { page, limit, skip } = pagination(url.searchParams)
    const search = url.searchParams.get("search")?.trim()
    const active = url.searchParams.get("active")
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const where: Prisma.TeacherWhereInput = {
      tenantId: adminUser?.tenantId ?? "",
      ...(search ? { OR: [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ] } : {}),
      ...(active === "true" ? { isActive: true } : active === "false" ? { isActive: false } : {}),
    }
    const [total, teachers] = await Promise.all([
      prisma.teacher.count({ where }),
      prisma.teacher.findMany({ where, skip, take: limit, orderBy: [{ updatedAt: "desc" }, { id: "asc" }], include: teacherInclude }),
    ])
    return NextResponse.json({ teachers, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) })
  } catch (error) {
    return apiError(error, "Failed to list teachers")
  }
}

/** POST /api/admin/teachers — creates a teacher profile for an existing user. */
export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let data: Prisma.TeacherUncheckedCreateInput
  try {
    data = parsePayload(await request.json() as TeacherPayload, true) as Prisma.TeacherUncheckedCreateInput
  } catch (error) {
    return validationError(error)
  }

  const userId = data.userId
  if (!userId) return apiResponseError("userId is required", 400)
  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, tenantId: true } })
    if (!user) return apiResponseError("User not found", 404)
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!adminUser?.tenantId) return apiResponseError("Admin has no tenant", 403)
    const teacher = await prisma.teacher.create({ data: { ...data, tenantId: adminUser.tenantId }, include: teacherInclude })
    await writeAdminAuditEvent({ actorId: identity.userId, request, action: "create", entityType: "teacher", entityId: teacher.id, metadata: { userId: teacher.userId } })
    return NextResponse.json({ teacher }, { status: 201 })
  } catch (error) {
    return apiError(error, "Failed to create teacher")
  }
}

/** PATCH /api/admin/teachers — updates administrative teacher-profile fields. */
export async function PATCH(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let id: string
  let data: Prisma.TeacherUncheckedUpdateInput
  try {
    const body = await request.json() as TeacherPayload
    if (typeof body.id !== "string" || !body.id.trim()) throw new Error("id is required")
    id = body.id.trim()
    if (body.userId !== undefined) throw new Error("userId cannot be changed")
    data = parsePayload(body, false) as Prisma.TeacherUncheckedUpdateInput
    if (!Object.keys(data).length) throw new Error("At least one editable field is required")
  } catch (error) {
    return validationError(error)
  }

  try {
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!adminUser?.tenantId) return apiResponseError("Admin has no tenant", 403)
    const teacher = await prisma.teacher.update({
      where: { id, tenantId: adminUser.tenantId },
      data,
      include: teacherInclude,
    })
    await writeAdminAuditEvent({ actorId: identity.userId, request, action: "update", entityType: "teacher", entityId: teacher.id, metadata: { fields: Object.keys(data) } })
    return NextResponse.json({ teacher })
  } catch (error) {
    return apiError(error, "Failed to update teacher")
  }
}
