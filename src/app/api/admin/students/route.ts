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

type StudentPayload = {
  id?: unknown
  email?: unknown
  name?: unknown
  isActive?: unknown
  role?: unknown
  passwordHash?: unknown
}

function email(value: unknown, required = false): string | undefined {
  if (value === undefined) return undefined
  if (typeof value !== "string") throw new Error("email must be text")
  const normalized = value.trim().toLowerCase()
  if (required && !normalized) throw new Error("email is required")
  if (normalized && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) || normalized.length > 254)) throw new Error("email must be valid")
  return normalized || undefined
}

function name(value: unknown): string | null | undefined {
  if (value === undefined) return undefined
  if (typeof value !== "string") throw new Error("name must be text")
  const normalized = value.trim()
  if (normalized.length > 160) throw new Error("name must be 160 characters or fewer")
  return normalized || null
}

function active(value: unknown): boolean | undefined {
  if (value === undefined) return undefined
  if (typeof value !== "boolean") throw new Error("isActive must be true or false")
  return value
}

function parsePayload(body: StudentPayload, creating: boolean): Prisma.UserCreateInput | Prisma.UserUpdateInput {
  if (body.role !== undefined || body.passwordHash !== undefined) throw new Error("role and password fields cannot be changed here")
  const normalizedEmail = email(body.email, creating)
  const normalizedName = name(body.name)
  const isActive = active(body.isActive)
  return {
    ...(normalizedEmail !== undefined ? { email: normalizedEmail } : {}),
    ...(normalizedName !== undefined ? { name: normalizedName } : {}),
    ...(isActive !== undefined ? { isActive } : {}),
    ...(creating ? { role: "student" } : {}),
  }
}

function validationError(error: unknown) {
  return apiResponseError(error instanceof Error ? error.message : "Invalid request", 400)
}

const studentInclude = {
  subscription: { select: { id: true, planId: true, isActive: true, endDate: true } },
  _count: { select: { enrollments: true, payments: true } },
} as const

/** GET /api/admin/students — authenticated student directory, excluding non-student accounts. */
export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const url = new URL(request.url)
    const { page, limit, skip } = pagination(url.searchParams)
    const search = url.searchParams.get("search")?.trim()
    const isActive = url.searchParams.get("active")
    // Look up the authenticated admin's tenant for tenant isolation
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const where: Prisma.UserWhereInput = {
      role: "student",
      tenantId: adminUser?.tenantId ?? "",
      ...(search ? { OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ] } : {}),
      ...(isActive === "true" ? { isActive: true } : isActive === "false" ? { isActive: false } : {}),
    }
    const [total, students] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({ where, skip, take: limit, orderBy: [{ updatedAt: "desc" }, { id: "asc" }], include: studentInclude }),
    ])
    return NextResponse.json({ students, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) })
  } catch (error) {
    return apiError(error, "Failed to list students")
  }
}

/** POST /api/admin/students — provisions a student identity without accepting credentials. */
export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let data: Prisma.UserCreateInput
  try {
    data = parsePayload(await request.json() as StudentPayload, true) as Prisma.UserCreateInput
  } catch (error) {
    return validationError(error)
  }

  try {
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!adminUser?.tenantId) return apiResponseError("Admin has no tenant", 403)
    const student = await prisma.user.create({
      data: { ...data, tenantId: adminUser.tenantId } as Prisma.UserCreateInput,
      include: studentInclude,
    })
    await writeAdminAuditEvent({ actorId: identity.userId, request, action: "create", entityType: "student", entityId: student.id, metadata: { email: student.email } })
    return NextResponse.json({ student }, { status: 201 })
  } catch (error) {
    return apiError(error, "Failed to create student")
  }
}

/** PATCH /api/admin/students — changes only permitted administrative profile fields. */
export async function PATCH(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let id: string
  let data: Prisma.UserUpdateInput
  try {
    const body = await request.json() as StudentPayload
    if (typeof body.id !== "string" || !body.id.trim()) throw new Error("id is required")
    id = body.id.trim()
    data = parsePayload(body, false) as Prisma.UserUpdateInput
    if (!Object.keys(data).length) throw new Error("At least one editable field is required")
  } catch (error) {
    return validationError(error)
  }

  try {
    const existing = await prisma.user.findUnique({ where: { id }, select: { id: true, role: true } })
    if (!existing || existing.role !== "student") return apiResponseError("Student not found", 404)
    const student = await prisma.user.update({ where: { id }, data, include: studentInclude })
    await writeAdminAuditEvent({ actorId: identity.userId, request, action: "update", entityType: "student", entityId: student.id, metadata: { fields: Object.keys(data) } })
    return NextResponse.json({ student })
  } catch (error) {
    return apiError(error, "Failed to update student")
  }
}
