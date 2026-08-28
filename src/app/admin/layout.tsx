import type { Metadata } from "next"
import { cookies } from "next/headers"
import { verifyAdminSessionToken } from "@/lib/admin-session"
import { getJwtSecret } from "@/lib/auth-config"
import { type AdminRole } from "@/lib/admin-role-context"
import { AdminRoleProvider } from "@/components/admin/admin-role-provider"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Administrative dashboard for Lumaani.",
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  let role: AdminRole = "admin"

  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("pb-admin-session")?.value
    if (sessionCookie) {
      const identity = await verifyAdminSessionToken(sessionCookie, getJwtSecret())
      if (identity) {
        role = (identity.role as AdminRole) ?? "admin"
      }
    }
  } catch {
    // Fall back to "admin" if cookie cannot be read
  }

  return (
    <AdminRoleProvider role={role}>
      {children}
    </AdminRoleProvider>
  )
}