'use client'

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { BookOpen, Calendar, FileText, Plus, Search, Timer } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchAdminCollection } from "@/lib/admin-client"
import { toExamListItem, type ExamApiRecord, type ExamListItem } from "@/lib/admin-exam-client"
import { AdminLayout, colors } from "../_components/admin-layout"

const statusVariant: Record<ExamListItem["status"], "success" | "secondary" | "destructive"> = {
  Published: "success",
  Draft: "secondary",
  Archived: "destructive",
}

function EmptyState({ query }: { query: string }) {
  return <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30"><FileText className="h-8 w-8" style={{ color: colors.mutedForeground }} /></div>
    <h3 className="mb-1 text-lg font-semibold" style={{ color: colors.secondary }}>{query ? "No exams found" : "No exams yet"}</h3>
    <p className="mb-6 max-w-sm text-sm text-muted-foreground">{query ? `No exams match "${query}". Try a different term.` : "Create an exam to get started with assessments."}</p>
    {!query && <Link href="/admin/exams/create"><Button size="sm"><Plus className="mr-1.5 h-4 w-4" />Create exam</Button></Link>}
  </div>
}

export default function ExamsPage() {
  const [query, setQuery] = useState("")
  const [exams, setExams] = useState<ExamListItem[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    fetchAdminCollection<ExamApiRecord>("exams", "exams", { limit: 100 })
      .then(({ items }) => setExams(items.map(toExamListItem)))
      .catch((error: unknown) => setLoadError(error instanceof Error ? error.message : "Unable to load exams"))
  }, [])

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase()
    return exams.filter((exam) => [exam.id, exam.code, exam.title, exam.subject, exam.course, exam.status].some((value) => value.toLowerCase().includes(normalized)))
  }, [exams, query])
  const published = exams.filter((exam) => exam.status === "Published").length
  const scheduled = exams.filter((exam) => exam.schedule !== "Not scheduled").length

  return <AdminLayout
    activeSidebar="Exams"
    pageTitle="Exam Management"
    pageDescription="Manage the assessment catalogue and its publication state"
    headerRight={<Link href="/admin/exams/create"><Button size="sm"><Plus className="mr-1.5 h-4 w-4" />Create exam</Button></Link>}
  >
    <div className="grid grid-cols-3 gap-4">
      <Card style={{ borderColor: colors.border }}><CardContent className="flex items-center gap-3 p-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${colors.primary}10` }}><FileText className="h-5 w-5" style={{ color: colors.primary }} /></div><div><p className="text-xs text-muted-foreground">Total exams</p><p className="text-xl font-bold" style={{ color: colors.secondary }}>{exams.length}</p></div></CardContent></Card>
      <Card style={{ borderColor: colors.border }}><CardContent className="flex items-center gap-3 p-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10"><BookOpen className="h-5 w-5 text-green-600" /></div><div><p className="text-xs text-muted-foreground">Published</p><p className="text-xl font-bold" style={{ color: colors.secondary }}>{published}</p></div></CardContent></Card>
      <Card style={{ borderColor: colors.border }}><CardContent className="flex items-center gap-3 p-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${colors.accent}20` }}><Calendar className="h-5 w-5" style={{ color: colors.accent }} /></div><div><p className="text-xs text-muted-foreground">Scheduled</p><p className="text-xl font-bold" style={{ color: colors.secondary }}>{scheduled}</p></div></CardContent></Card>
    </div>

    {loadError && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{loadError}</p>}
    <Card style={{ borderColor: colors.border }}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 pb-4"><div><CardTitle className="text-lg font-semibold" style={{ color: colors.secondary }}>All exams</CardTitle><CardDescription>{filtered.length} exam{filtered.length === 1 ? "" : "s"} found</CardDescription></div><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: colors.mutedForeground }} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search exams..." className="h-9 w-48 rounded-lg border bg-muted/30 pl-9 pr-3 text-sm outline-none md:w-64" style={{ borderColor: colors.border }} /></div></CardHeader>
      <CardContent className="p-0">
        {filtered.length === 0 ? <EmptyState query={query} /> : <div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b bg-muted/20" style={{ borderColor: colors.border }}><th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Exam</th><th className="hidden px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">Subject</th><th className="hidden px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Course</th><th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Duration</th><th className="hidden px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">Schedule</th><th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th></tr></thead><tbody className="divide-y" style={{ borderColor: colors.border }}>{filtered.map((exam) => <tr key={exam.id} className="transition-colors hover:bg-muted/10"><td className="px-6 py-3.5"><p className="text-sm font-medium" style={{ color: colors.secondary }}>{exam.title}</p><p className="text-[10px] text-muted-foreground">{exam.code}</p></td><td className="hidden px-6 py-3.5 text-sm text-muted-foreground sm:table-cell">{exam.subject}</td><td className="hidden px-6 py-3.5 text-sm text-muted-foreground md:table-cell">{exam.course}</td><td className="px-6 py-3.5"><span className="flex items-center gap-1 text-sm text-muted-foreground"><Timer className="h-3.5 w-3.5" />{exam.duration}</span></td><td className="hidden px-6 py-3.5 text-sm text-muted-foreground lg:table-cell">{exam.schedule}</td><td className="px-6 py-3.5"><Badge variant={statusVariant[exam.status]} className="text-[10px]">{exam.status}</Badge></td></tr>)}</tbody></table></div>}
      </CardContent>
    </Card>
  </AdminLayout>
}
