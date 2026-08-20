'use client'

import { useEffect, useMemo, useState } from "react"
import { Activity, Award, BookOpen, DollarSign, GraduationCap, RefreshCw, Users } from "lucide-react"

import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Analytics = {
  totals: { users: number; activeStudents: number; publishedCourses: number; paidRevenue: number; practiceSessions: number; completionRate: number; accuracy: number }
  months: { key: string; label: string; users: number; revenue: number; sessions: number }[]
  generatedAt: string
}

const formatCurrency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [metric, setMetric] = useState<"users" | "revenue" | "sessions">("users")

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/analytics", { credentials: "same-origin", headers: { Accept: "application/json" } })
      const payload = await response.json() as Analytics & { error?: string }
      if (!response.ok) throw new Error(payload.error ?? "Unable to load analytics")
      setData(payload)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load analytics")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])
  const max = useMemo(() => Math.max(1, ...(data?.months.map((month) => month[metric]) ?? [1])), [data, metric])
  const cards = data ? [
    { label: "Total users", value: data.totals.users.toLocaleString(), icon: Users },
    { label: "Active students", value: data.totals.activeStudents.toLocaleString(), icon: GraduationCap },
    { label: "Paid revenue", value: formatCurrency.format(data.totals.paidRevenue), icon: DollarSign },
    { label: "Published courses", value: data.totals.publishedCourses.toLocaleString(), icon: BookOpen },
    { label: "Practice sessions", value: data.totals.practiceSessions.toLocaleString(), icon: Activity },
    { label: "Practice accuracy", value: `${data.totals.accuracy}%`, icon: Award },
  ] : []

  return <AdminLayout activeSidebar="Analytics" pageTitle="Analytics" pageDescription="Live platform activity and education outcomes" headerRight={<button onClick={() => void load()} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm" disabled={loading}><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh</button>}>
    {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {loading && !data ? <p className="text-sm text-muted-foreground">Loading authenticated analytics…</p> : <>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {cards.map(({ label, value, icon: Icon }) => <Card key={label}><CardContent className="flex items-center gap-3 p-5"><Icon className="h-5 w-5" style={{ color: colors.primary }} /><div><p className="text-xs text-muted-foreground">{label}</p><p className="text-xl font-bold" style={{ color: colors.secondary }}>{value}</p></div></CardContent></Card>)}
      </section>
      <Card>
        <CardHeader><CardTitle>Six-month trend</CardTitle><CardDescription>Live records created in the selected month.</CardDescription></CardHeader>
        <CardContent><div className="mb-5 flex gap-2">{(["users", "revenue", "sessions"] as const).map((item) => <button key={item} onClick={() => setMetric(item)} className={`rounded-md px-3 py-1.5 text-sm capitalize ${metric === item ? "bg-[rgb(71,32,183)] text-white" : "border"}`}>{item}</button>)}</div>
          <div className="flex h-56 items-end gap-3">{data?.months.map((month) => <div key={month.key} className="flex h-full flex-1 flex-col justify-end gap-2 text-center"><span className="text-xs font-medium">{metric === "revenue" ? formatCurrency.format(month.revenue) : month[metric].toLocaleString()}</span><div className="rounded-t bg-[rgb(71,32,183)]" style={{ height: `${(month[metric] / max) * 100}%`, minHeight: month[metric] ? "4px" : 0 }} /><span className="text-xs text-muted-foreground">{month.label}</span></div>)}</div>
          <p className="mt-5 text-xs text-muted-foreground">Completion rate: {data?.totals.completionRate ?? 0}%. Generated {data && new Date(data.generatedAt).toLocaleString()}.</p>
        </CardContent>
      </Card>
    </>}
  </AdminLayout>
}