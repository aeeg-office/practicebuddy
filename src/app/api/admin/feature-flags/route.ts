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

function text(value: unknown, field: string, required = false): string | null | NextResponse {
  if (value === undefined || value === null) return required ? apiResponseError(`${field} is required`, 400) : null
  if (typeof value !== "string" || !value.trim()) return apiResponseError(`${field} must be a non-empty string`, 400)
  const normalized = value.trim()
  if (normalized.length > 160) return apiResponseError(`${field} must be 160 characters or fewer`, 400)
  return normalized
}

function flagData(body: Record<string, unknown>, partial = false): Record<string, unknown> | NextResponse {
  const data: Record<string, unknown> = {}
  for (const field of ["key", "label", "description"] as const) {
    if (body[field] !== undefined || !partial) {
      const value = text(body[field], field, !partial && field !== "description")
      if (value instanceof Response) return value
      data[field] = value
    }
  }
  if (!partial) {
    data.isActive ??= false
  }
  return data
}

export async function GET(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip } = pagination(searchParams)
    const [total, flags] = await Promise.all([
      prisma.featureFlag.count(),
      prisma.featureFlag.findMany({ skip, take: limit, orderBy: [{ key: "asc" }] }),
    ])
    return NextResponse.json({ flags, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } })
  } catch (error) {
    console.error("Error listing feature flags", error)
    return apiResponseError("Failed to list feature flags", 500)
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
    const data = flagData(body as Record<string, unknown>)
    if (data instanceof Response) return data
    const flag = await prisma.featureFlag.create({ data: data as Prisma.FeatureFlagUncheckedCreateInput })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "create", entityType: "feature_flag", entityId: flag.id, metadata: { key: flag.key } })
    return NextResponse.json({ flag }, { status: 201 })
  } catch (error) {
    console.error("Error creating feature flag", error)
    return apiResponseError("Failed to create feature flag", 500)
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
    const record = body as Record<string, unknown>
    const id = text(record.id, "id", true)
    if (id instanceof Response) return id
    if (typeof id !== "string") return apiResponseError("id is required", 400)
    const data = flagData(record, true)
    if (data instanceof Response) return data
    if (!Object.keys(data).length) return apiResponseError("At least one editable field is required", 400)
    const flag = await prisma.featureFlag.update({ where: { id }, data: data as Prisma.FeatureFlagUncheckedUpdateInput })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "update", entityType: "feature_flag", entityId: flag.id, metadata: { fields: Object.keys(data) } })
    return NextResponse.json({ flag })
  } catch (error) {
    console.error("Error updating feature flag", error)
    return apiResponseError("Failed to update feature flag", 500)
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
    const flag = await prisma.featureFlag.delete({ where: { id } })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "delete", entityType: "feature_flag", entityId: flag.id, metadata: { key: flag.key } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting feature flag", error)
    return apiResponseError("Failed to delete feature flag", 500)
  }
}