'use client'

import { createContext, useContext } from "react"

export type AdminRole = "student" | "teacher" | "school_admin" | "admin"

export const AdminRoleContext = createContext<AdminRole>("admin")

export function useAdminRole(): AdminRole {
  return useContext(AdminRoleContext)
}