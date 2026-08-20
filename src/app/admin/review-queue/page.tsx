'use client'

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { CheckCircle, XCircle, AlertTriangle, FileQuestion, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"

export default function ReviewQueuePage() {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const load = useCallback(async (p: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/review-queue?page=${p}&limit=20`, { credentials: "same-origin" })
      if (res.ok) {
        const data = await res.json()
        setQuestions(data.questions ?? [])
        setTotal(data.total ?? 0)
      }
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load(page) }, [page, load])

  const handleAction = async (questionId: string, action: "approve" | "reject" | "quarantine") => {
    setActionLoading(questionId)
    try {
      await fetch("/api/admin/review-queue", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ questionId, action }),
      })
      setQuestions(prev => prev.filter(q => q.id !== questionId))
      setTotal(prev => prev - 1)
    } catch { /* ignore */ }
    finally { setActionLoading(null) }
  }

  return (
    <AdminLayout
      activeSidebar="Questions"
      pageTitle="Review Queue"
      pageDescription={`${total} questions pending review`}
    >
      <Card style={{ borderColor: colors.border }}>
        <CardHeader>
          <CardTitle className="text-lg" style={{ color: colors.secondary }}>
            AI-Generated Questions — Review & Publish
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading review queue...</p>
          ) : questions.length === 0 ? (
            <div className="text-center py-12">
              <FileQuestion className="h-12 w-12 mx-auto mb-4" style={{ color: colors.muted }} />
              <p className="text-muted-foreground font-medium">No questions pending review</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Use the AI Factory to generate questions</p>
              <Link href="/admin/ai-factory">
                <Button variant="default" size="sm" className="mt-4">Go to AI Factory</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q: any) => (
                <div key={q.id} className="border rounded-lg p-4 hover:bg-muted/10 transition-colors" style={{ borderColor: colors.border }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-1 line-clamp-2">{q.stem}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-[10px]">{q.subject}</Badge>
                        <Badge variant="outline" className="text-[10px]">{q.difficulty}</Badge>
                        <Badge variant="outline" className="text-[10px]">{q.format}</Badge>
                        {q.skillName && <span>{q.skillName}</span>}
                        {q.source && <span className="text-[10px]">Source: {q.source}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/admin/questions/${q.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-8 text-xs bg-green-600 hover:bg-green-700"
                        disabled={actionLoading === q.id}
                        onClick={() => handleAction(q.id, "approve")}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-red-300 text-red-600 hover:bg-red-50"
                        disabled={actionLoading === q.id}
                        onClick={() => handleAction(q.id, "reject")}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {total > 20 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: colors.border }}>
              <span className="text-xs text-muted-foreground">Page {page} of {Math.ceil(total / 20)}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page >= Math.ceil(total / 20)} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}