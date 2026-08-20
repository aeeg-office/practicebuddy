import { AuthorizationError } from "@/lib/auth-server"

/**
 * Role hierarchy (highest to lowest):
 *   admin > school_admin > teacher > student
 *
 * These match the User.role string values in the database.
 * The schema supports: "student" | "parent" | "teacher" | "admin".
 * "school_admin" is an additional tier between teacher and admin.
 */
export const ROLES = ["student", "teacher", "school_admin", "admin"] as const
export type Role = (typeof ROLES)[number]

const ROLE_HIERARCHY: Record<string, number> = {
  student: 0,
  teacher: 1,
  school_admin: 2,
  admin: 3,
}

/** Returns the numeric priority of a role. Lower values = fewer privileges. Unknown roles return -1. */
export function getRolePriority(role: string): number {
  return ROLE_HIERARCHY[role] ?? -1
}

/** Returns true when `userRole` has at least the privileges of `requiredRole`. */
export function canAccessRoute(userRole: string, requiredRole: string): boolean {
  return getRolePriority(userRole) >= getRolePriority(requiredRole)
}

/**
 * Creates a guard that checks the identity has exactly the specified role.
 * Throws AuthorizationError when the role does not match.
 */
export function requireRole(role: Role) {
  return function (identity: { role: string }): void {
    if (identity.role !== role) {
      throw new AuthorizationError(`Role "${role}" is required`)
    }
  }
}

/**
 * Creates a guard that checks the identity has at least the specified role
 * in the hierarchy. Throws AuthorizationError when the minimum is not met.
 */
export function requireAtLeast(minRole: Role) {
  return function (identity: { role: string }): void {
    if (!canAccessRoute(identity.role, minRole)) {
      throw new AuthorizationError(`At least "${minRole}" role is required`)
    }
  }
}