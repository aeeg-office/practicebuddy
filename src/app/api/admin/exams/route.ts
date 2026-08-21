import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import {
  apiResponseError,
  authenticateAdminApi,
  pagination,
  requireSafeAdminMutationOrigin,
  writeAdminAuditEvent,
} from "@/lib/admin-api"

const STATUSES = new Set(["draft", "published", "archived"])

function text(value: unknown, field: string, required = false, max = 500): string | null | NextResponse {
  if (value === undefined || value === null) return required ? apiResponseError(`${field} is required`, 400) : null
  if (typeof value !== "string" || !value.trim()) return apiResponseError(`${field} must be a non-empty string`, 400)
  const normalized = value.trim()
  return normalized.length <= max ? normalized : apiResponseError(`${field} must be ${max} characters or fewer`, 400)
}

function examData(input: Record<string, unknown>, partial = false): Prisma.ExamUncheckedCreateInput | Prisma.ExamUncheckedUpdateInput | NextResponse {
  const data: Record<string, unknown> = {}

  if (input.title !== undefined || !partial) {
    const title = text(input.title, "title", !partial)
    if (title instanceof Response) return title
    if (title !== null) data.title = title
  }

  if (input.description !== undefined) {
    if (input.description !== null && (typeof input.description !== "string" || input.description.trim().length > 2000))
      return apiResponseError("description is invalid", 400)
    data.description = typeof input.description === "string" ? input.description.trim() || null : null
  }

  for (const field of ["duration", "totalMarks", "passingMarks"] as const) {
    if (input[field] !== undefined) {
      if (input[field] !== null && (!Number.isInteger(input[field]) || (input[field] as number) < 0 || (input[field] as number) > 100_000))
        return apiResponseError(`${field} is invalid`, 400)
      data[field] = input[field]
    }
  }

  if (input.status !== undefined) {
    if (typeof input.status !== "string" || !STATUSES.has(input.status)) return apiResponseError("status is invalid", 400)
    data.status = input.status
  }

  if (input.courseId !== undefined) {
    const courseId = input.courseId === null ? null : text(input.courseId, "courseId", true, 160)
    if (courseId instanceof Response) return courseId
    data.courseId = courseId
  }

  if (input.type !== undefined || !partial) {
    const type = text(input.type, "type", !partial, 50)
    if (type instanceof Response) return type
    if (type !== null) data.type = type
  }

  return data as Prisma.ExamUncheckedCreateInput | Prisma.ExamUncheckedUpdateInput
}

export async function GET(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  try {
    const params = new URL(request.url).searchParams
    const { page, limit, skip } = pagination(params)
    const search = params.get("search")?.trim()
    const status = params.get("status")
    if (status && !STATUSES.has(status)) return apiResponseError("status is invalid", 400)
    const tenant = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const where: Prisma.ExamWhereInput = {
      tenantId: tenant?.tenantId,
      ...(status ? { status } : {}),
      ...(search ? { OR: [{ title: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }] } : {}),
    }
    const [total, exams] = await Promise.all([
      prisma.exam.count({ where }),
      prisma.exam.findMany({ where, skip, take: limit, include: { course: { select: { id: true, name: true } } }, orderBy: [{ createdAt: "desc" }, { id: "asc" }] }),
    ])
    return NextResponse.json({ exams, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } })
  } catch (error) {
    console.error("Error listing exams", error)
    return apiResponseError("Failed to list exams", 500)
  }
}

export async function POST(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure
  try {
    const tenant = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!tenant?.tenantId) return apiResponseError("Admin has no tenant", 403)

    const body: unknown = await request.json()
    if (!body || typeof body !== "object" || Array.isArray(body)) return apiResponseError("Request body must be an object", 400)
    const data = examData(body as Record<string, unknown>)
    if (data instanceof Response) return data
    const exam = await prisma.exam.create({
      data: { ...(data as Prisma.ExamUncheckedCreateInput), tenantId: tenant.tenantId! },
    })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "create", entityType: "exam", entityId: exam.id, metadata: { title: exam.title } })
    return NextResponse.json({ exam }, { status: 201 })
  } catch (error) {
    console.error("Error creating exam", error)
    return apiResponseError("Failed to create exam", 500)
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
    const id = text(input.id, "id", true, 160)
    if (id instanceof Response || typeof id !== "string") return id instanceof Response ? id : apiResponseError("id is required", 400)
    const data = examData(input, true)
    if (data instanceof Response) return data
    if (!Object.keys(data).length) return apiResponseError("At least one editable field is required", 400)
    // Verify the exam belongs to the admin's tenant
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!adminUser?.tenantId) return apiResponseError("Admin has no tenant", 403)
    const existing = await prisma.exam.findUnique({ where: { id }, select: { tenantId: true } })
    if (!existing || existing.tenantId !== adminUser.tenantId) return apiResponseError("Exam not found", 404)
    const exam = await prisma.exam.update({ where: { id }, data: data as Prisma.ExamUncheckedUpdateInput })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "update", entityType: "exam", entityId: exam.id, metadata: { fields: Object.keys(data) } })
    return NextResponse.json({ exam })
  } catch (error) {
    console.error("Error updating exam", error)
    return apiResponseError("Failed to update exam", 500)
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
    // Verify the exam belongs to the admin's tenant
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!adminUser?.tenantId) return apiResponseError("Admin has no tenant", 403)
    const existing = await prisma.exam.findUnique({ where: { id }, select: { tenantId: true } })
    if (!existing || existing.tenantId !== adminUser.tenantId) return apiResponseError("Exam not found", 404)
    const exam = await prisma.exam.update({ where: { id }, data: { isActive: false } })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "delete", entityType: "exam", entityId: exam.id, metadata: { title: exam.title } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting exam", error)
    return apiResponseError("Failed to delete exam", 500)
  }
}