'use client'

import { useEffect, useState, type ComponentType, type CSSProperties } from "react"
import Link from "next/link"
import { DollarSign, FileQuestion, GraduationCap, Users } from "lucide-react"

import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Dashboard = { totals: { users: number; activeStudents: number; publishedCourses: number; paidRevenue: number }; recentStudents: { id: string; name: string | null; email: string; isActive: boolean; createdAt: string; enrollments: { course: { title: string } }[] }[]; recentPayments: { id: string; amount: number | string; currency: string; status: string; createdAt: string; user: { name: string | null; email: string } }[] }

export default function AdminDashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => { void (async () => { try { const response = await fetch("/api/admin/analytics", { credentials: "same-origin" }); const payload = await response.json(); if (!response.ok) throw new Error(payload.error ?? "Unable to load dashboard"); setData(payload) } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to load dashboard") } })() }, [])
  return <AdminLayout activeSidebar="Overview" pageTitle="Admin dashboard" pageDescription="Platform operations overview">
    {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {!data ? <p className="text-sm text-muted-foreground">Loading authenticated dashboard…</p> : <>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
        ["Total users", data.totals.users, Users], ["Active students", data.totals.activeStudents, GraduationCap], ["Published courses", data.totals.publishedCourses, GraduationCap], ["Paid revenue", new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(data.totals.paidRevenue), DollarSign],
      ].map(([label, value, icon]) => {
        const Icon = icon as ComponentType<{ className?: string; style?: CSSProperties }>
        return <Card key={String(label)}><CardContent className="flex gap-3 p-5"><Icon className="h-5 w-5" style={{ color: colors.primary }} /><div><p className="text-xs text-muted-foreground">{String(label)}</p><p className="text-2xl font-bold" style={{ color: colors.secondary }}>{typeof value === "string" || typeof value === "number" ? value : "—"}</p></div></CardContent></Card>
      })}</section>

      {/* Question Bank Summary Card */}
      <QuestionBankSummary />

      <section className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardTitle>Recent students</CardTitle><CardDescription><Link className="underline" href="/admin/students">Manage students</Link></CardDescription></CardHeader><CardContent><ul className="space-y-3">{data.recentStudents.map((student) => <li key={student.id} className="flex justify-between gap-4 border-b pb-3 text-sm"><span><b>{student.name ?? student.email}</b><br /><span className="text-muted-foreground">{student.enrollments[0]?.course.title ?? "No enrollment"}</span></span><span className={student.isActive ? "text-green-700" : "text-muted-foreground"}>{student.isActive ? "Active" : "Inactive"}</span></li>)}{!data.recentStudents.length && <li className="text-sm text-muted-foreground">No students yet.</li>}</ul></CardContent></Card>
      <Card><CardHeader><CardTitle>Recent payments</CardTitle><CardDescription><Link className="underline" href="/admin/payments">Manage payments</Link></CardDescription></CardHeader><CardContent><ul className="space-y-3">{data.recentPayments.map((payment) => <li key={payment.id} className="flex justify-between gap-4 border-b pb-3 text-sm"><span><b>{payment.user.name ?? payment.user.email}</b><br /><span className="text-muted-foreground">{payment.status}</span></span><span>{Number(payment.amount).toFixed(2)} {payment.currency}</span></li>)}{!data.recentPayments.length && <li className="text-sm text-muted-foreground">No payments yet.</li>}</ul></CardContent></Card></section>
    </>}
  </AdminLayout>
}

/* ───────── Question Bank Summary ───────── */

function QuestionBankSummary() {
  const [stats, setStats] = useState<{ total: number; published: number; draft: number; archived: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let live = true
    void (async () => {
      try {
        const response = await fetch("/api/admin/questions?limit=2000", { credentials: "same-origin" })
        const data = await response.json() as { questions?: { qualityStatus?: string }[]; total?: number }
        if (!live) return
        const questions = data.questions ?? []
        const total = data.total ?? questions.length
        const published = questions.filter((q: { qualityStatus?: string }) => q.qualityStatus === "published").length
        const draft = questions.filter((q: { qualityStatus?: string }) =>
          q.qualityStatus === "draft" || q.qualityStatus === "ready_for_review").length
        const archived = questions.filter((q: { qualityStatus?: string }) =>
          q.qualityStatus === "archived" || q.qualityStatus === "quarantined").length
        setStats({ total, published, draft, archived })
      } catch { /* ignore */ } finally { if (live) setLoading(false) }
    })()
    return () => { live = false }
  }, [])

  return (
    <Card style={{ borderColor: colors.border }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base" style={{ color: colors.secondary }}>Question Bank</CardTitle>
          <CardDescription><Link className="underline" href="/admin/questions">Manage questions</Link></CardDescription>
        </div>
        <FileQuestion className="h-5 w-5" style={{ color: colors.primary }} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading question stats…</p>
        ) : stats ? (
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-2xl font-bold" style={{ color: colors.secondary }}>{stats.total}</p>
              <p className="text-[10px] text-muted-foreground">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              <p className="text-[10px] text-muted-foreground">Published</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
              <p className="text-[10px] text-muted-foreground">Draft</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-muted-foreground">{stats.archived}</p>
              <p className="text-[10px] text-muted-foreground">Archived</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Unable to load stats</p>
        )}
      </CardContent>
    </Card>
  )
}