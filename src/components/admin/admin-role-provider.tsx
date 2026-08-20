"use client"

import { AdminRoleContext, type AdminRole } from "@/lib/admin-role-context"
import type { ReactNode } from "react"

export function AdminRoleProvider({ role, children }: { role: AdminRole; children: ReactNode }) {
  return <AdminRoleContext.Provider value={role}>{children}</AdminRoleContext.Provider>
}