'use client'

import { useEffect, useState } from "react"
import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface AdminUser {
  id: string
  email: string
  name: string | null
  role: string
  isActive: boolean
  tenantId: string
  tenant?: { name: string }
  lastLoginAt: string | null
  createdAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("")

  useEffect(() => {
    fetch("/api/admin/users?limit=5000", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((data) => { setUsers(data.users ?? []); setLoading(false) })
      .catch(() => { setError("Failed to load users"); setLoading(false) })
  }, [])

  const filtered = users.filter((u) => {
    if (search && !u.email.toLowerCase().includes(search.toLowerCase()) && !(u.name ?? "").toLowerCase().includes(search.toLowerCase())) return false
    if (roleFilter && u.role !== roleFilter) return false
    return true
  })

  const roleCounts = users.reduce((acc, u) => { acc[u.role] = (acc[u.role] || 0) + 1; return acc }, {} as Record<string, number>)

  return (
    <AdminLayout
      activeSidebar="Users & Roles"
      pageTitle="Users & Roles"
      pageDescription={`${users.length} total users`}
    >
      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {Object.entries(roleCounts).map(([role, count]) => (
          <Card key={role}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: colors.secondary }}>{count}</p>
              <p className="text-xs text-muted-foreground capitalize">{role}s</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base" style={{ color: colors.secondary }}>All Users</CardTitle>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search users..."
                className="h-9 rounded-lg border px-3 text-sm outline-none"
                style={{ borderColor: colors.border }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="h-9 rounded-lg border px-3 text-sm outline-none"
                style={{ borderColor: colors.border }}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
          </div>
          <CardDescription>Manage users, roles, and account status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                  <th className="pb-2 font-semibold pr-4">Name</th>
                  <th className="pb-2 font-semibold pr-4">Email</th>
                  <th className="pb-2 font-semibold pr-4">Role</th>
                  <th className="pb-2 font-semibold pr-4">Organization</th>
                  <th className="pb-2 font-semibold pr-4">Status</th>
                  <th className="pb-2 font-semibold">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2.5 pr-4 font-medium">{u.name || "—"}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{u.email}</td>
                    <td className="py-2.5 pr-4">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>{u.role}</span>
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{u.tenant?.name || "—"}</td>
                    <td className="py-2.5 pr-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${u.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                        {u.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2.5 text-muted-foreground">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "Never"}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="py-4 text-center text-muted-foreground">No users found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}