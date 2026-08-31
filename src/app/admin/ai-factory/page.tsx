'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Zap, Sparkles, FileQuestion, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"

export default function AIFactoryPage() {
  const [stats, setStats] = useState<{ pendingReview: number; published: number; draft: number; goldCount: number; total: number } | null>(null)
  const [gaps, setGaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    void (async () => {
      try {
        const [statsRes, gapsRes] = await Promise.all([
          fetch("/api/admin/ai-factory", { credentials: "same-origin" }),
          fetch("/api/admin/ai-factory?action=gaps", { credentials: "same-origin" }),
        ])
        if (statsRes.ok) setStats(await statsRes.json())
        if (gapsRes.ok) {
          const gapsData = await gapsRes.json()
          setGaps(gapsData.gaps ?? [])
        }
      } catch { /* ignore */ }
      finally { setLoading(false) }
    })()
  }, [])

  const handleGenerate = async (skillId: string) => {
    setGenerating(true)
    setResult(null)
    try {
      const res = await fetch("/api/admin/ai-factory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ skillId, count: 10 }),
      })
      const data = await res.json()
      setResult(data.message || `Generated ${data.created} questions`)
      // Refresh stats
      const statsRes = await fetch("/api/admin/ai-factory", { credentials: "same-origin" })
      if (statsRes.ok) setStats(await statsRes.json())
    } catch {
      setResult("Generation failed")
    } finally { setGenerating(false) }
  }

  return (
    <AdminLayout
      activeSidebar="AI Factory"
      pageTitle="AI Question Factory"
      pageDescription="Generate, validate, and review AI-powered questions"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card style={{ borderColor: colors.border }}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10" style={{ color: colors.primary }}>
              <FileQuestion className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Questions</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>{stats?.total ?? (loading ? "..." : "0")}</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ borderColor: colors.border }}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Published</p>
              <p className="text-xl font-bold text-emerald-600">{stats?.published ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ borderColor: colors.border }}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Review</p>
              <p className="text-xl font-bold text-amber-600">{stats?.pendingReview ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ borderColor: colors.border }}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gold Questions</p>
              <p className="text-xl font-bold text-purple-600">{stats?.goldCount ?? 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generation result */}
      {result && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {result}
        </div>
      )}

      {/* Inventory Gaps */}
      <Card style={{ borderColor: colors.border }}>
        <CardHeader>
          <CardTitle className="text-lg" style={{ color: colors.secondary }}>Inventory Gaps</CardTitle>
          <CardDescription>Skills that need more questions. Click Generate to create new questions via AI.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading inventory gaps...</p>
          ) : gaps.length === 0 ? (
            <p className="text-sm text-muted-foreground">No inventory gaps detected. All skills have sufficient questions.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-[11px] uppercase tracking-wider text-muted-foreground" style={{ borderColor: colors.border }}>
                    <th className="px-4 py-3">Skill</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Domain</th>
                    <th className="px-4 py-3">Current</th>
                    <th className="px-4 py-3">Target</th>
                    <th className="px-4 py-3">Deficit</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: colors.border }}>
                  {gaps.slice(0, 30).map((gap: any) => (
                    <tr key={gap.skillId + (gap.microSkillId || "")} className="hover:bg-muted/10">
                      <td className="px-4 py-3 font-medium" style={{ color: colors.secondary }}>{gap.skillName}</td>
                      <td className="px-4 py-3 text-muted-foreground">{gap.subject}</td>
                      <td className="px-4 py-3 text-muted-foreground">{gap.domain}</td>
                      <td className="px-4 py-3">{gap.currentCount}</td>
                      <td className="px-4 py-3">{gap.targetCount}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${gap.deficit > 20 ? "text-red-600" : gap.deficit > 10 ? "text-amber-600" : "text-muted-foreground"}`}>
                          -{gap.deficit}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={generating}
                          onClick={() => handleGenerate(gap.skillId)}
                          className="text-xs"
                        >
                          {generating ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Zap className="h-3 w-3 mr-1" />}
                          Generate
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {gaps.length > 30 && (
            <p className="mt-4 text-xs text-muted-foreground">Showing 30 of {gaps.length} gaps. Narrow your search to see more.</p>
          )}
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/admin/questions?status=ready_for_review">
          <Card className="border border-amber-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold" style={{ color: colors.secondary }}>Review Queue</h3>
              </div>
              <p className="text-sm text-muted-foreground">{stats?.pendingReview ?? 0} questions pending review</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/questions">
          <Card className="border hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <FileQuestion className="h-5 w-5" style={{ color: colors.primary }} />
                <h3 className="font-semibold" style={{ color: colors.secondary }}>Question Bank</h3>
              </div>
              <p className="text-sm text-muted-foreground">{stats?.total ?? 0} total questions</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/curriculum">
          <Card className="border hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold" style={{ color: colors.secondary }}>Curriculum</h3>
              </div>
              <p className="text-sm text-muted-foreground">Manage skills, taxonomy, and gold questions</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </AdminLayout>
  )
}