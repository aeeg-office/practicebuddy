'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { FileQuestion, Plus, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout, colors } from "../_components/admin-layout"
import {
  fetchQuestions,
  getDifficultyColor,
  getStatusBadgeVariant,
  getStatusLabel,
  getSubjectLabel,
  type AdminQuestion,
  type AdminQuestionFilters,
} from "@/lib/admin-question-client"

/* ───────── Query params ↔ filters ───────── */

function filtersFromParams(): AdminQuestionFilters {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  return {
    search: params.get("search") || undefined,
    page: Number(params.get("page")) || 1,
    subject: params.get("subject") || undefined,
    domain: params.get("domain") || undefined,
    skill: params.get("skill") || undefined,
    status: params.get("status") || undefined,
    difficulty: params.get("difficulty") || undefined,
  }
}

function paramsFromFilters(filters: AdminQuestionFilters): string {
  const params = new URLSearchParams()
  if (filters.search) params.set("search", filters.search)
  if (filters.page && filters.page > 1) params.set("page", String(filters.page))
  if (filters.subject) params.set("subject", filters.subject)
  if (filters.domain) params.set("domain", filters.domain)
  if (filters.skill) params.set("skill", filters.skill)
  if (filters.status) params.set("status", filters.status)
  if (filters.difficulty) params.set("difficulty", filters.difficulty)
  return params.toString()
}

/* ───────── Main page ───────── */

export default function AdminQuestionsPage() {
  const [filters, setFilters] = useState<AdminQuestionFilters>(() => filtersFromParams())
  const [data, setData] = useState<{ items: AdminQuestion[]; total: number; totalPages: number }>({
    items: [],
    total: 0,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async (currentFilters: AdminQuestionFilters) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchQuestions(currentFilters)
      setData({ items: result.items, total: result.total, totalPages: result.totalPages })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load questions")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      load(filters)
      const params = paramsFromFilters(filters)
      const url = params ? `/admin/questions?${params}` : "/admin/questions"
      window.history.replaceState(null, "", url)
    }, filters.search ? 250 : 0)
    return () => window.clearTimeout(timer)
  }, [filters, load])

  function updateFilter(key: keyof AdminQuestionFilters, value: string | undefined) {
    setFilters((prev) => ({ ...prev, [key]: value || undefined, page: key !== "page" ? 1 : prev.page }))
  }

  function clearFilters() {
    setFilters({ page: 1 })
    if (searchRef.current) searchRef.current.value = ""
  }

  const hasActiveFilters = !!(
    filters.search ||
    filters.subject ||
    filters.domain ||
    filters.skill ||
    filters.status ||
    filters.difficulty
  )

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const q of data.items) {
      counts[q.qualityStatus ?? "draft"] = (counts[q.qualityStatus ?? "draft"] || 0) + 1
    }
    return counts
  }, [data.items])

  return (
    <AdminLayout
      activeSidebar="Questions"
      pageTitle="Question Bank"
      pageDescription="Manage the SAT practice question library"
      headerRight={
        <div className="flex items-center gap-2">
          <Link href="/admin/questions/import">
            <Button variant="outline" size="sm">
              <FileQuestion className="mr-1.5 h-4 w-4" />
              Bulk Import
            </Button>
          </Link>
          <Link href="/admin/questions/new">
            <Button variant="default" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New Question
            </Button>
          </Link>
        </div>
      }
    >
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric icon={<FileQuestion className="h-5 w-5" />} label="Total questions" value={data.total} />
        <Metric
          icon={<FileQuestion className="h-5 w-5 text-emerald-600" />}
          label="Published"
          value={data.items.filter((q) => q.qualityStatus === "published").length}
        />
        <Metric
          icon={<FileQuestion className="h-5 w-5 text-yellow-600" />}
          label="Draft"
          value={data.items.filter((q) => q.qualityStatus === "draft" || q.qualityStatus === "ready_for_review").length}
        />
        <Metric
          icon={<FileQuestion className="h-5 w-5 text-red-600" />}
          label="Archived"
          value={data.items.filter((q) => q.qualityStatus === "archived" || q.qualityStatus === "quarantined").length}
        />
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card style={{ borderColor: colors.border }}>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 pb-4">
          <div>
            <CardTitle className="text-lg" style={{ color: colors.secondary }}>
              All Questions
            </CardTitle>
            <CardDescription>
              {data.total} question{data.total === 1 ? "" : "s"} in the bank
              {hasActiveFilters && ` (${data.items.length} shown)`}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <label className="relative block">
              <span className="sr-only">Search questions</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: colors.mutedForeground }} />
              <input
                ref={searchRef}
                defaultValue={filters.search ?? ""}
                onChange={(event) => updateFilter("search", event.target.value || undefined)}
                placeholder="Search stem, ID, domain..."
                className="h-9 w-56 rounded-lg border bg-muted/30 pl-9 pr-3 text-sm"
                style={{ borderColor: colors.border }}
              />
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters || hasActiveFilters ? "border-primary" : ""}
            >
              Filters
              {hasActiveFilters && <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-white">!</span>}
            </Button>
          </div>
        </CardHeader>

        {/* Filter bar */}
        {showFilters && (
          <div className="border-t px-6 py-4" style={{ borderColor: colors.border }}>
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.subject ?? ""}
                onChange={(e) => updateFilter("subject", e.target.value || undefined)}
                className="h-9 rounded-lg border bg-background px-3 text-sm"
                style={{ borderColor: colors.border }}
              >
                <option value="">All subjects</option>
                <option value="sat">SAT</option>
                <option value="act">ACT</option>
                <option value="ielts">IELTS</option>
                <option value="toefl">TOEFL</option>
              </select>
              <select
                value={filters.difficulty ?? ""}
                onChange={(e) => updateFilter("difficulty", e.target.value || undefined)}
                className="h-9 rounded-lg border bg-background px-3 text-sm"
                style={{ borderColor: colors.border }}
              >
                <option value="">All difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select
                value={filters.status ?? ""}
                onChange={(e) => updateFilter("status", e.target.value || undefined)}
                className="h-9 rounded-lg border bg-background px-3 text-sm"
                style={{ borderColor: colors.border }}
              >
                <option value="">All statuses</option>
                <option value="draft">Draft</option>
                <option value="ready_for_review">Ready for Review</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
                <option value="quarantined">Quarantined</option>
              </select>
              <input
                value={filters.domain ?? ""}
                onChange={(e) => updateFilter("domain", e.target.value || undefined)}
                placeholder="Domain..."
                className="h-9 rounded-lg border bg-background px-3 text-sm"
                style={{ borderColor: colors.border }}
              />
              <input
                value={filters.skill ?? ""}
                onChange={(e) => updateFilter("skill", e.target.value || undefined)}
                placeholder="Skill..."
                className="h-9 rounded-lg border bg-background px-3 text-sm"
                style={{ borderColor: colors.border }}
              />
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        )}

        <CardContent className="p-0">
          {loading ? (
            <p className="p-8 text-sm text-muted-foreground">Loading questions…</p>
          ) : data.items.length === 0 ? (
            <p className="p-8 text-sm text-muted-foreground">
              {hasActiveFilters ? "No questions match these filters." : "No questions have been created yet."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className="border-b bg-muted/20 text-left text-[11px] uppercase tracking-wider text-muted-foreground"
                    style={{ borderColor: colors.border }}
                  >
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="hidden px-4 py-3 md:table-cell">Domain</th>
                    <th className="hidden px-4 py-3 lg:table-cell">Skill</th>
                    <th className="hidden px-4 py-3 sm:table-cell">Difficulty</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: colors.border }}>
                  {data.items.map((question) => (
                    <tr key={question.id} className="hover:bg-muted/10">
                      <td className="max-w-[120px] truncate px-4 py-3 text-sm font-mono text-xs" style={{ color: colors.secondary }} title={question.id}>
                        {question.id}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge variant="outline" className="text-[10px]">
                          {getSubjectLabel(question.subject)}
                        </Badge>
                      </td>
                      <td className="hidden max-w-[180px] truncate px-4 py-3 text-sm text-muted-foreground md:table-cell" title={question.domain}>
                        {question.domain}
                      </td>
                      <td className="hidden max-w-[160px] truncate px-4 py-3 text-sm text-muted-foreground lg:table-cell" title={question.skillName}>
                        {question.skillName || "—"}
                      </td>
                      <td className="hidden px-4 py-3 text-sm sm:table-cell">
                        <span className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={getStatusBadgeVariant(question.qualityStatus ?? "draft")} className="text-[10px]">
                          {getStatusLabel(question.qualityStatus ?? "draft")}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/questions/${encodeURIComponent(question.id)}`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t px-6 py-3" style={{ borderColor: colors.border }}>
            <span className="text-xs text-muted-foreground">
              Page {filters.page ?? 1} of {data.totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={loading || (filters.page ?? 1) <= 1}
                onClick={() => updateFilter("page", String((filters.page ?? 1) - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={loading || (filters.page ?? 1) >= data.totalPages}
                onClick={() => updateFilter("page", String((filters.page ?? 1) + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <Card style={{ borderColor: colors.border }}>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/30" style={{ color: colors.primary }}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold" style={{ color: colors.secondary }}>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}