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

type CoursePayload = {
  code?: unknown
  title?: unknown
  description?: unknown
  subject?: unknown
  level?: unknown
  teacherId?: unknown
  capacity?: unknown
  isActive?: unknown
  startsAt?: unknown
  endsAt?: unknown
}

function text(value: unknown, field: string, required = false): string | null | undefined {
  if (value === undefined) return undefined
  if (typeof value !== "string") throw new Error(`${field} must be text`)
  const normalized = value.trim()
  if (required && !normalized) throw new Error(`${field} is required`)
  return normalized || null
}

function optionalDate(value: unknown, field: string): Date | null | undefined {
  if (value === undefined) return undefined
  if (value === null || value === "") return null
  if (typeof value !== "string") throw new Error(`${field} must be an ISO date`)
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) throw new Error(`${field} must be an ISO date`)
  return date
}

function optionalCapacity(value: unknown): number | null | undefined {
  if (value === undefined) return undefined
  if (value === null || value === "") return null
  if (!Number.isInteger(value) || (value as number) < 1 || (value as number) > 100000) {
    throw new Error("capacity must be an integer between 1 and 100000")
  }
  return value as number
}

function optionalBoolean(value: unknown, field: string): boolean | undefined {
  if (value === undefined) return undefined
  if (typeof value !== "boolean") throw new Error(`${field} must be true or false`)
  return value
}

function parsePayload(body: CoursePayload, creating: boolean) {
  const code = text(body.code, "code", creating)
  const title = text(body.title, "title", creating)
  const startsAt = optionalDate(body.startsAt, "startsAt")
  const endsAt = optionalDate(body.endsAt, "endsAt")
  if (startsAt instanceof Date && endsAt instanceof Date && endsAt <= startsAt) {
    throw new Error("endsAt must be later than startsAt")
  }

  return {
    ...(code !== undefined ? { code: code === null ? null : code.toUpperCase() } : {}),
    ...(title !== undefined ? { title } : {}),
    ...(body.description !== undefined ? { description: text(body.description, "description") } : {}),
    ...(body.subject !== undefined ? { subject: text(body.subject, "subject") } : {}),
    ...(body.level !== undefined ? { level: text(body.level, "level") } : {}),
    ...(body.teacherId !== undefined ? { teacherId: text(body.teacherId, "teacherId") } : {}),
    ...(body.capacity !== undefined ? { capacity: optionalCapacity(body.capacity) } : {}),
    ...(body.isActive !== undefined ? { isActive: optionalBoolean(body.isActive, "isActive") } : {}),
    ...(startsAt !== undefined ? { startsAt } : {}),
    ...(endsAt !== undefined ? { endsAt } : {}),
  }
}

function validationError(error: unknown) {
  return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 })
}

/** GET /api/admin/courses — authenticated paginated course inventory. */
export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const url = new URL(request.url)
    const { page, limit, skip } = pagination(url.searchParams)
    const search = url.searchParams.get("search")?.trim()
    const published = url.searchParams.get("published")
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const where: Prisma.CourseWhereInput = {
      tenantId: adminUser?.tenantId ?? "",
      ...(search ? { OR: [{ code: { contains: search, mode: "insensitive" } }, { name: { contains: search, mode: "insensitive" } }] } : {}),
      ...(published === "true" ? { isActive: true } : published === "false" ? { isActive: false } : {}),
    }
    const [total, courses] = await Promise.all([
      prisma.course.count({ where }),
      prisma.course.findMany({ where, skip, take: limit, orderBy: [{ updatedAt: "desc" }, { id: "asc" }], include: { _count: { select: { enrollments: true, exams: true } } } }),
    ])
    return NextResponse.json({ courses, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) })
  } catch (error) {
    return apiError(error, "Failed to list courses")
  }
}

/** POST /api/admin/courses — creates a course and attributes an append-only audit event. */
export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let data: Record<string, unknown>
  try {
    data = parsePayload(await request.json() as CoursePayload, true)
  } catch (error) {
    return validationError(error)
  }

  // Resolve tenant for tenant-scoped course creation
  const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
  if (!adminUser?.tenantId) return apiResponseError("Admin has no tenant", 403)

  try {
    const course = await prisma.course.create({ data: { ...data, tenantId: adminUser.tenantId } as Prisma.CourseUncheckedCreateInput })
    await writeAdminAuditEvent({ actorId: identity.userId, request, action: "create", entityType: "course", entityId: course.id, metadata: { code: course.code } })
    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    return apiError(error, "Failed to create course")
  }
}

/** PATCH /api/admin/courses — updates course fields; course records are never deleted by this API. */
export async function PATCH(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let id: string
  let data: Record<string, unknown>
  try {
    const body = await request.json() as CoursePayload & { id?: unknown }
    if (typeof body.id !== "string" || !body.id.trim()) throw new Error("id is required")
    id = body.id.trim()
    data = parsePayload(body, false)
    if (!Object.keys(data).length) throw new Error("At least one editable field is required")
  } catch (error) {
    return validationError(error)
  }

  try {
    const course = await prisma.course.update({ where: { id }, data: data as Prisma.CourseUncheckedUpdateInput })
    await writeAdminAuditEvent({ actorId: identity.userId, request, action: "update", entityType: "course", entityId: course.id, metadata: { fields: Object.keys(data) } })
    return NextResponse.json({ course })
  } catch (error) {
    return apiError(error, "Failed to update course")
  }
}
