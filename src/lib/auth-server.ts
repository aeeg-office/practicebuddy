import * as jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

import { AuthConfigurationError, getJwtSecret } from "@/lib/auth-config"

export { AuthConfigurationError, getJwtSecret } from "@/lib/auth-config"

export class AuthorizationError extends Error {
  constructor(message = "Not authorized") {
    super(message)
    this.name = "AuthorizationError"
  }
}

export type AuthIdentity = {
  userId: string
  role: string
}

export function requireAdminToken(request: Request): AuthIdentity {
  const authorization = request.headers.get("authorization")
  if (!authorization?.startsWith("Bearer ")) {
    throw new AuthorizationError("Bearer token is required")
  }

  let payload: unknown
  try {
    payload = jwt.verify(authorization.slice("Bearer ".length), getJwtSecret())
  } catch {
    throw new AuthorizationError("Invalid token")
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as { userId?: unknown }).userId !== "string" ||
    (payload as { role?: unknown }).role !== "admin"
  ) {
    throw new AuthorizationError("Administrator access is required")
  }

  return payload as AuthIdentity
}

/**
 * Applies the consistent fail-closed HTTP policy for administrator API routes.
 * A null return means the request has a verified administrator identity.
 */
export function requireAdminApiAccess(request: Request): NextResponse | null {
  try {
    requireAdminToken(request)
    return null
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }
    if (error instanceof AuthConfigurationError) {
      console.error("Admin auth configuration error", error)
      return NextResponse.json({ error: "Authentication is unavailable" }, { status: 503 })
    }
    throw error
  }
}
