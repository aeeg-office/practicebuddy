import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { verifyAdminSessionToken } from "@/lib/admin-session"
import { AuthConfigurationError, AuthorizationError, getJwtSecret, requireAdminToken, type AuthIdentity } from "@/lib/auth-server"
import { requireAtLeast, type Role } from "@/lib/rbac"

export type AdminApiIdentity = AuthIdentity

function cookieValue(request: Request, name: string): string | undefined {
  const prefix = `${name}=`
  return request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(prefix))?.slice(prefix.length)
}

function authError(error: unknown): NextResponse {
  if (error instanceof AuthConfigurationError) {
    console.error("Admin auth configuration error", error)
    return NextResponse.json({ error: "Authentication is unavailable" }, { status: 503 })
  }
  return NextResponse.json({ error: "Not authorized" }, { status: 401 })
}

/** Supports legacy bearer clients and the signed HttpOnly admin session. */
export async function authenticateAdminApi(request: Request, minimumRole: Role = "admin"): Promise<AdminApiIdentity | NextResponse> {
  try {
    let identity: AuthIdentity
    if (request.headers.get("authorization")) {
      identity = requireAdminToken(request)
    } else {
      const verified = await verifyAdminSessionToken(cookieValue(request, "pb-admin-session"), getJwtSecret())
      if (!verified) throw new AuthorizationError()
      identity = verified
    }
    requireAtLeast(minimumRole)(identity)
    return identity
  } catch (error) {
    return authError(error)
  }
}

/**
 * Standalone guard for checking a role requirement after authentication.
 * Useful when a route needs to authenticate first then enforce a specific role.
 */
export function requireAdminRole(role: Role = "admin") {
  return requireAtLeast(role)
}

/** Cookie-authenticated mutations must be same-origin; bearer requests are not CSRF credentials. */
export function requireSafeAdminMutationOrigin(request: Request): NextResponse | null {
  if (request.headers.get("authorization")) return null
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (!origin || !host) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 })
  try {
    if (new URL(origin).host !== host) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 })
  } catch {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 })
  }
  return null
}

export function pagination(search: URLSearchParams) {
  const page = Math.max(1, Number.parseInt(search.get("page") ?? "1", 10) || 1)
  const limit = Math.min(100, Math.max(1, Number.parseInt(search.get("limit") ?? "20", 10) || 20))
  return { page, limit, skip: (page - 1) * limit }
}

export async function writeAdminAuditEvent(input: {
  actorId: string
  request: Request
  action: string
  entityType: string
  entityId?: string
  metadata?: Record<string, unknown>
}) {
  await prisma.adminAuditEvent.create({
    data: {
      adminId: input.actorId,
      action: input.action,
      entity: input.entityType,
      entityId: input.entityId,
      details: input.metadata ? JSON.stringify(input.metadata) : null,
      ipAddress: input.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 64) ?? null,
    },
  })
}

export function apiResponseError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status })
}

export function apiError(error: unknown, fallback: string) {
  if (typeof error === "object" && error && "code" in error && (error as { code?: string }).code === "P2002") {
    return NextResponse.json({ error: "A record with that unique value already exists" }, { status: 409 })
  }
  console.error(fallback, error)
  return NextResponse.json({ error: fallback }, { status: 500 })
}
