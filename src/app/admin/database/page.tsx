'use client'

import { useCallback, useEffect, useState } from "react"
import { AlertTriangle, CheckCircle, Database, RefreshCw, Shield, XCircle } from "lucide-react"

import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/* ───────── Types ───────── */

type IntegrityData = {
  questionCountByStatus: Record<string, number>
  integrityIssues: {
    missingStem: number
    missingOptions: number
    missingCorrectAnswer: number
    missingExplanation: number
    placeholderCount: number
  }
  placeholderQuestions: {
    id: string
    stem: string
    subject: string
    domain: string
    qualityStatus: string | null
    createdAt: string
  }[]
  orphans: {
    questionsWithNoSkill: number
    attemptsWithNoQuestion: number
    orphanSkills: number
  }
  duplicates: {
    stem: string
    subject: string
    count: number
    ids: string[]
  }[]
  counts: {
    activeUsers: number
    totalAttempts: number
    totalSkills: number
  }
  generatedAt: string
}

/* ───────── Helpers ───────── */

function statusBadgeVariant(key: string): "success" | "accent" | "secondary" | "outline" | "destructive" {
  switch (key) {
    case "published": return "success"
    case "draft": return "accent"
    case "review": return "secondary"
    case "archived": return "outline"
    case "quarantined": return "destructive"
    default: return "outline"
  }
}

function healthColor(value: number, thresholds: [number, number]): "green" | "amber" | "red" {
  const [safe, warn] = thresholds
  if (value <= safe) return "green"
  if (value <= warn) return "amber"
  return "red"
}

function HealthDot({ level }: { level: "green" | "amber" | "red" }) {
  const colorMap = { green: "rgb(16,185,129)", amber: "rgb(200,120,90)", red: "rgb(239,68,68)" }
  return (
    <span
      className="inline-block h-3 w-3 rounded-full shrink-0"
      style={{ backgroundColor: colorMap[level] }}
      title={level}
    />
  )
}

/* ───────── Page ───────── */

export default function DatabaseIntegrityPage() {
  const [data, setData] = useState<IntegrityData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [quarantining, setQuarantining] = useState(false)
  const [quarantineResult, setQuarantineResult] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/database-integrity", {
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      })
      const payload = (await response.json()) as IntegrityData & { error?: string }
      if (!response.ok) throw new Error(payload.error ?? "Unable to load integrity data")
      setData(payload)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load integrity data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const handleQuarantineAll = async () => {
    if (!confirm("Quarantine all placeholder questions? This sets qualityStatus to 'quarantined'.")) return
    setQuarantining(true)
    setQuarantineResult(null)
    try {
      const ids = data?.placeholderQuestions.map((q) => q.id) ?? []
      if (ids.length === 0) {
        setQuarantineResult("No placeholder questions to quarantine")
        setQuarantining(false)
        return
      }
      const response = await fetch("/api/admin/database-integrity", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "quarantine", questionIds: ids }),
      })
      const payload = (await response.json()) as { error?: string; message?: string }
      if (!response.ok) throw new Error(payload.error ?? "Quarantine failed")
      setQuarantineResult(payload.message ?? "Successfully quarantined")
      void load()
    } catch (reason) {
      setQuarantineResult(reason instanceof Error ? reason.message : "Quarantine failed")
    } finally {
      setQuarantining(false)
    }
  }

  const totalIssues = data
    ? data.integrityIssues.missingStem +
      data.integrityIssues.missingOptions +
      data.integrityIssues.missingCorrectAnswer +
      data.integrityIssues.missingExplanation +
      data.integrityIssues.placeholderCount +
      data.orphans.questionsWithNoSkill +
      data.orphans.attemptsWithNoQuestion +
      data.orphans.orphanSkills +
      data.duplicates.length
    : 0

  const overallHealth = totalIssues === 0 ? "green" : totalIssues <= 5 ? "amber" : "red"

  return (
    <AdminLayout
      activeSidebar="Database"
      pageTitle="Database Integrity"
      pageDescription="Health monitoring and data quality metrics"
      headerRight={
        <button
          onClick={() => void load()}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      }
    >
      {error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading && !data ? (
        <p className="text-sm text-muted-foreground">Loading database integrity metrics…</p>
      ) : data ? (
        <div className="space-y-6">
          {/* ── Overall Health ── */}
          <Card
            className="border-2"
            style={{
              borderColor:
                overallHealth === "green"
                  ? "rgb(16,185,129)"
                  : overallHealth === "amber"
                    ? "rgb(200,120,90)"
                    : "rgb(239,68,68)",
            }}
          >
            <CardContent className="flex items-center gap-4 p-5">
              {overallHealth === "green" ? (
                <CheckCircle className="h-8 w-8" style={{ color: "rgb(16,185,129)" }} />
              ) : overallHealth === "amber" ? (
                <AlertTriangle className="h-8 w-8" style={{ color: "rgb(200,120,90)" }} />
              ) : (
                <XCircle className="h-8 w-8" style={{ color: "rgb(239,68,68)" }} />
              )}
              <div>
                <p className="text-lg font-bold" style={{ color: colors.secondary }}>
                  {overallHealth === "green"
                    ? "All clear — no integrity issues found"
                    : `${totalIssues} integrity issue${totalIssues !== 1 ? "s" : ""} found`}
                </p>
                <p className="text-xs text-muted-foreground">
                  Generated {new Date(data.generatedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ── Summary Cards ── */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5" style={{ color: colors.primary }} />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Questions</p>
                    <p className="text-xl font-bold" style={{ color: colors.secondary }}>
                      {Object.values(data.questionCountByStatus).reduce((a, b) => a + b, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <UsersIcon className="h-5 w-5" style={{ color: colors.primary }} />
                  <div>
                    <p className="text-xs text-muted-foreground">Active Users</p>
                    <p className="text-xl font-bold" style={{ color: colors.secondary }}>
                      {data.counts.activeUsers.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" style={{ color: colors.primary }} />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Skills</p>
                    <p className="text-xl font-bold" style={{ color: colors.secondary }}>
                      {data.counts.totalSkills}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <ActivityIcon className="h-5 w-5" style={{ color: colors.primary }} />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Attempts</p>
                    <p className="text-xl font-bold" style={{ color: colors.secondary }}>
                      {data.counts.totalAttempts.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ── Question Count by Status ── */}
          <Card>
            <CardHeader>
              <CardTitle>Question Count by Status</CardTitle>
              <CardDescription>Distribution of active questions across quality statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {Object.entries(data.questionCountByStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center gap-2 rounded-lg border px-4 py-3">
                    <Badge variant={statusBadgeVariant(status)}>{status}</Badge>
                    <span className="text-lg font-bold" style={{ color: colors.secondary }}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Integrity Issues ── */}
          <Card>
            <CardHeader>
              <CardTitle>
                Integrity Issues
                <HealthDot level={healthColor(totalIssues, [0, 5])} />
              </CardTitle>
              <CardDescription>Questions with missing or placeholder content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(
                  [
                    { label: "Missing stem", value: data.integrityIssues.missingStem, thresholds: [0, 3] as [number, number] },
                    { label: "Missing options", value: data.integrityIssues.missingOptions, thresholds: [0, 3] as [number, number] },
                    { label: "Missing correct answer", value: data.integrityIssues.missingCorrectAnswer, thresholds: [0, 3] as [number, number] },
                    { label: "Missing explanation", value: data.integrityIssues.missingExplanation, thresholds: [0, 10] as [number, number] },
                    { label: "Placeholder content", value: data.integrityIssues.placeholderCount, thresholds: [0, 5] as [number, number] },
                  ] as const
                ).map(({ label, value, thresholds }) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border px-4 py-3">
                    <div className="flex items-center gap-3">
                      <HealthDot level={healthColor(value, thresholds)} />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <span className={`text-lg font-bold ${value > thresholds[1] ? "text-red-600" : value > thresholds[0] ? "text-amber-600" : "text-emerald-600"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Orphan Records ── */}
          <Card>
            <CardHeader>
              <CardTitle>Orphan Records</CardTitle>
              <CardDescription>Records missing their required parent relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(
                  [
                    { label: "Questions with no skill", value: data.orphans.questionsWithNoSkill, thresholds: [0, 5] as [number, number] },
                    { label: "Attempts with no question", value: data.orphans.attemptsWithNoQuestion, thresholds: [0, 0] as [number, number] },
                    { label: "Orphan skills (no questions)", value: data.orphans.orphanSkills, thresholds: [0, 3] as [number, number] },
                  ] as const
                ).map(({ label, value, thresholds }) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border px-4 py-3">
                    <div className="flex items-center gap-3">
                      <HealthDot level={healthColor(value, thresholds)} />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <span className={`text-lg font-bold ${value > thresholds[1] ? "text-red-600" : value > thresholds[0] ? "text-amber-600" : "text-emerald-600"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Duplicate Candidates ── */}
          <Card>
            <CardHeader>
              <CardTitle>
                Duplicate Question Candidates
                <HealthDot level={healthColor(data.duplicates.length, [0, 3])} />
              </CardTitle>
              <CardDescription>Questions with the same stem and subject (potential duplicates)</CardDescription>
            </CardHeader>
            <CardContent>
              {data.duplicates.length === 0 ? (
                <p className="text-sm text-emerald-600">No duplicate candidates found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-2 pr-4 font-medium">Stem (truncated)</th>
                        <th className="pb-2 pr-4 font-medium">Subject</th>
                        <th className="pb-2 pr-4 font-medium">Count</th>
                        <th className="pb-2 font-medium">IDs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.duplicates.map((dup, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-2 pr-4 max-w-[300px] truncate text-muted-foreground">
                            {dup.stem}
                          </td>
                          <td className="py-2 pr-4">
                            <Badge variant="outline">{dup.subject}</Badge>
                          </td>
                          <td className="py-2 pr-4">
                            <span className="font-bold text-red-600">{dup.count}</span>
                          </td>
                          <td className="py-2 max-w-[200px] truncate text-xs text-muted-foreground">
                            {dup.ids.join(", ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Placeholder Questions ── */}
          {data.placeholderQuestions.length > 0 && (
            <Card className="border-red-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-red-700">Placeholder Questions</CardTitle>
                  <CardDescription>{data.placeholderQuestions.length} question(s) flagged as placeholder</CardDescription>
                </div>
                <button
                  onClick={handleQuarantineAll}
                  disabled={quarantining}
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                >
                  <Shield className="h-4 w-4" />
                  {quarantining ? "Quarantining…" : "Quarantine All"}
                </button>
              </CardHeader>
              <CardContent>
                {quarantineResult && (
                  <p
                    className={`mb-3 rounded-md p-2 text-sm ${
                      quarantineResult.startsWith("Success")
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {quarantineResult}
                  </p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-2 pr-4 font-medium">ID</th>
                        <th className="pb-2 pr-4 font-medium">Stem</th>
                        <th className="pb-2 pr-4 font-medium">Subject</th>
                        <th className="pb-2 pr-4 font-medium">Domain</th>
                        <th className="pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.placeholderQuestions.map((q) => (
                        <tr key={q.id} className="border-b last:border-0">
                          <td className="py-2 pr-4 font-mono text-xs">{q.id.slice(0, 12)}…</td>
                          <td className="py-2 pr-4 max-w-[300px] truncate text-muted-foreground">
                            {q.stem}
                          </td>
                          <td className="py-2 pr-4">
                            <Badge variant="outline">{q.subject}</Badge>
                          </td>
                          <td className="py-2 pr-4 text-muted-foreground">{q.domain}</td>
                          <td className="py-2">
                            <Badge variant={q.qualityStatus === "quarantined" ? "destructive" : "accent"}>
                              {q.qualityStatus ?? "unknown"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : null}
    </AdminLayout>
  )
}

/* ───────── Inline icons not provided by lucide (or referenced above) ───────── */

function UsersIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ActivityIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}