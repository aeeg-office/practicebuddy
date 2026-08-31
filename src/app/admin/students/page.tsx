'use client'

import { FormEvent, type ReactNode, useEffect, useMemo, useState } from "react"
import { Plus, Search, Users } from "lucide-react"

import { fetchAdminCollection } from "@/lib/admin-client"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout, colors } from "../_components/admin-layout"

type Student = {
  id: string
  name: string | null
  email: string
  isActive: boolean
  createdAt: string
  subscription: { isActive: boolean } | null
  _count: { enrollments: number; payments: number }
}

type StudentPage = { items: Student[]; total: number; totalPages: number }

function initials(name: string | null, email: string) {
  const source = name?.trim() || email
  return source.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()
}

export default function StudentsPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<StudentPage>({ items: [], total: 0, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)

  const activeStudents = useMemo(() => data.items.filter((student) => student.isActive).length, [data.items])
  const subscribedStudents = useMemo(() => data.items.filter((student) => student.subscription?.isActive).length, [data.items])

  useEffect(() => {
    let live = true
    const timer = window.setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchAdminCollection<Student>("students", "students", { search, page, limit: 25 })
        if (live) setData(result)
      } catch (cause) {
        if (live) setError(cause instanceof Error ? cause.message : "Unable to load students")
      } finally {
        if (live) setLoading(false)
      }
    }, search ? 250 : 0)
    return () => { live = false; window.clearTimeout(timer) }
  }, [search, page])

  async function createStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setCreating(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/students", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), isActive: true }),
      })
      const payload = await response.json() as { error?: string }
      if (!response.ok) throw new Error(payload.error || "Unable to create student")
      setShowCreate(false)
      setPage(1)
      const result = await fetchAdminCollection<Student>("students", "students", { search, page: 1, limit: 25 })
      setData(result)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to create student")
    } finally {
      setCreating(false)
    }
  }

  return (
    <AdminLayout activeSidebar="Students" pageTitle="Student Management" pageDescription="Live directory of student accounts and enrollment activity" headerRight={
      <Button variant="default" size="sm" onClick={() => setShowCreate(true)}><Plus className="mr-1.5 h-4 w-4" />Add Student</Button>
    }>
      <div className="grid grid-cols-3 gap-4">
        <Metric icon={<Users className="h-5 w-5" />} label="Total students" value={data.total} />
        <Metric icon={<Users className="h-5 w-5 text-emerald-600" />} label="Active on this page" value={activeStudents} />
        <Metric icon={<Users className="h-5 w-5" style={{ color: colors.accent }} />} label="Active subscriptions" value={subscribedStudents} />
      </div>

      {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <Card style={{ borderColor: colors.border }}>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 pb-4">
          <div><CardTitle className="text-lg" style={{ color: colors.secondary }}>All Students</CardTitle><CardDescription>{data.total} account{data.total === 1 ? "" : "s"} in the live directory</CardDescription></div>
          <label className="relative block"><span className="sr-only">Search students</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: colors.mutedForeground }} /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search name or email" className="h-9 w-64 rounded-lg border bg-muted/30 pl-9 pr-3 text-sm" style={{ borderColor: colors.border }} /></label>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? <p className="p-8 text-sm text-muted-foreground">Loading live student records…</p> : data.items.length === 0 ? <p className="p-8 text-sm text-muted-foreground">{search ? "No students match this search." : "No student accounts have been created yet."}</p> : <div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b bg-muted/20 text-left text-[11px] uppercase tracking-wider text-muted-foreground" style={{ borderColor: colors.border }}><th className="px-6 py-3">Student</th><th className="hidden px-6 py-3 sm:table-cell">Email</th><th className="hidden px-6 py-3 md:table-cell">Enrollments</th><th className="hidden px-6 py-3 lg:table-cell">Payments</th><th className="px-6 py-3">Status</th></tr></thead><tbody className="divide-y" style={{ borderColor: colors.border }}>{data.items.map((student) => <tr key={student.id} className="hover:bg-muted/10"><td className="px-6 py-3.5"><div className="flex items-center gap-3"><Avatar src="" alt={student.name || student.email} fallback={initials(student.name, student.email)} className="h-8 w-8 shrink-0" /><div><span className="block text-sm font-medium" style={{ color: colors.secondary }}>{student.name || "Unnamed student"}</span><span className="text-[10px] text-muted-foreground">{student.id}</span></div></div></td><td className="hidden px-6 py-3.5 text-sm text-muted-foreground sm:table-cell">{student.email}</td><td className="hidden px-6 py-3.5 text-sm md:table-cell">{student._count.enrollments}</td><td className="hidden px-6 py-3.5 text-sm lg:table-cell">{student._count.payments}</td><td className="px-6 py-3.5"><Badge variant={student.isActive ? "success" : "secondary"} className="text-[10px]">{student.isActive ? "Active" : "Inactive"}</Badge></td></tr>)}</tbody></table></div>}
          <div className="flex items-center justify-between border-t px-6 py-3" style={{ borderColor: colors.border }}><span className="text-xs text-muted-foreground">Page {page} of {data.totalPages}</span><div className="flex gap-2"><Button variant="outline" size="sm" disabled={loading || page <= 1} onClick={() => setPage((current) => current - 1)}>Previous</Button><Button variant="outline" size="sm" disabled={loading || page >= data.totalPages} onClick={() => setPage((current) => current + 1)}>Next</Button></div></div>
        </CardContent>
      </Card>

      {showCreate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><form onSubmit={createStudent} className="w-full max-w-md space-y-4 rounded-xl bg-background p-6 shadow-xl"><div><h2 className="font-semibold">Add Student</h2><p className="mt-1 text-sm text-muted-foreground">Creates a student account without setting credentials.</p></div><label className="block text-sm font-medium">Full name<input required name="name" maxLength={160} className="mt-1 h-10 w-full rounded-md border px-3" /></label><label className="block text-sm font-medium">Email<input required type="email" name="email" maxLength={254} className="mt-1 h-10 w-full rounded-md border px-3" /></label><div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={creating} onClick={() => setShowCreate(false)}>Cancel</Button><Button type="submit" disabled={creating}>{creating ? "Creating…" : "Create student"}</Button></div></form></div>}
    </AdminLayout>
  )
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return <Card style={{ borderColor: colors.border }}><CardContent className="flex items-center gap-3 p-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/30" style={{ color: colors.primary }}>{icon}</div><div><p className="text-xs text-muted-foreground">{label}</p><p className="text-xl font-bold" style={{ color: colors.secondary }}>{value}</p></div></CardContent></Card>
}
