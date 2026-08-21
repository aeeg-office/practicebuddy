'use client'

import { useEffect, useState } from "react"
import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Tenant {
  id: string
  name: string
  slug: string
  domain: string | null
  isActive: boolean
  userCount: number
  studentCount: number
  createdAt: string
}

export default function AdminOrganizationsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/users?limit=5000", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((data) => {
        const users = data.users ?? []
        const tenantMap = new Map<string, { name: string; slug: string; domain: string | null; isActive: boolean; createdAt: string; userCount: number; studentCount: number }>()
        for (const u of users) {
          const tid = u.tenantId || "default"
          if (!tenantMap.has(tid)) {
            tenantMap.set(tid, {
              name: u.tenant?.name || `Tenant ${tid}`,
              slug: u.tenant?.slug || tid,
              domain: u.tenant?.domain || null,
              isActive: u.tenant?.isActive ?? true,
              createdAt: u.tenant?.createdAt || u.createdAt,
              userCount: 0,
              studentCount: 0,
            })
          }
          const t = tenantMap.get(tid)!
          t.userCount++
          if (u.role === "student") t.studentCount++
        }
        setTenants(Array.from(tenantMap.entries()).map(([id, t]) => ({ id, ...t })))
        setLoading(false)
      })
      .catch(() => { setError("Failed to load organizations"); setLoading(false) })
  }, [])

  return (
    <AdminLayout activeSidebar="Organizations" pageTitle="Organizations" pageDescription="Manage organizations and schools">
      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading organizations…</p>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base" style={{ color: colors.secondary }}>All Organizations</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                    <th className="pb-2 font-semibold">Name</th>
                    <th className="pb-2 font-semibold">Slug</th>
                    <th className="pb-2 font-semibold">Domain</th>
                    <th className="pb-2 font-semibold">Users</th>
                    <th className="pb-2 font-semibold">Students</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map((t) => (
                    <tr key={t.id} className="border-b last:border-0">
                      <td className="py-2.5 font-medium">{t.name}</td>
                      <td className="py-2.5 text-muted-foreground">{t.slug}</td>
                      <td className="py-2.5 text-muted-foreground">{t.domain || "—"}</td>
                      <td className="py-2.5">{t.userCount}</td>
                      <td className="py-2.5">{t.studentCount}</td>
                      <td className="py-2.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${t.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                          {t.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {tenants.length === 0 && (
                    <tr><td colSpan={6} className="py-4 text-center text-muted-foreground">No organizations found</td></tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </AdminLayout>
  )
}