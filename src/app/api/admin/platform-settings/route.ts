import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import {
  apiResponseError,
  authenticateAdminApi,
  requireSafeAdminMutationOrigin,
  writeAdminAuditEvent,
} from "@/lib/admin-api"

const KEY_PATTERN = /^[a-z][a-z0-9]*(?:[.-][a-z0-9]+)*$/
const MAX_VALUE_BYTES = 8_192

function settingKey(value: unknown): string | NextResponse {
  if (typeof value !== "string" || !KEY_PATTERN.test(value) || value.length > 120) {
    return apiResponseError("key must be a dot or dash separated identifier of 120 characters or fewer", 400)
  }
  if (/(secret|password|token|private.?key|credential)/i.test(value)) {
    return apiResponseError("sensitive settings must be managed through environment configuration", 400)
  }
  return value
}

function jsonValue(value: unknown): unknown | NextResponse {
  if (value === undefined) return apiResponseError("value is required", 400)
  try {
    const encoded = JSON.stringify(value)
    if (encoded === undefined || encoded.length > MAX_VALUE_BYTES) return apiResponseError("value must be JSON serializable and 8KB or smaller", 400)
    return JSON.parse(encoded)
  } catch {
    return apiResponseError("value must be JSON serializable", 400)
  }
}

export async function GET(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  try {
    const settings = await prisma.platformSetting.findMany({
      select: { id: true, key: true, value: true, type: true, group: true, updatedAt: true },
      orderBy: { key: "asc" },
    })
    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Error listing platform settings", error)
    return apiResponseError("Failed to list platform settings", 500)
  }
}

export async function PUT(request: NextRequest) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure
  try {
    const body: unknown = await request.json()
    if (!body || typeof body !== "object" || Array.isArray(body)) return apiResponseError("Request body must be an object", 400)
    const record = body as Record<string, unknown>
    const key = settingKey(record.key)
    if (key instanceof Response) return key
    const value = jsonValue(record.value)
    if (value instanceof Response) return value

    const setting = await prisma.platformSetting.upsert({
      where: { key },
      create: { key, value: String(value), type: (record.type as string) ?? "string", group: (record.group as string) ?? "general" },
      update: { value: String(value), type: (record.type as string) ?? undefined, group: (record.group as string) ?? undefined },
    })
    await writeAdminAuditEvent({ request, actorId: identity.userId, action: "update", entityType: "platform_setting", entityId: setting.id, metadata: { key: setting.key } })
    return NextResponse.json({ setting })
  } catch (error) {
    console.error("Error updating platform setting", error)
    return apiResponseError("Failed to update platform setting", 500)
  }
}