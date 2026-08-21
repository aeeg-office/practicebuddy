'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useDashboard } from "@/lib/use-dashboard"
import {
  TrendingUp,
  BookOpen,
  Target,
  Award,
  CheckCircle2,
  Clock,
  ArrowLeft,
  BarChart3,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/**
 * Student Progress page.
 * Fixes HIGH-004: /dashboard/progress was returning 404.
 */
export default function ProgressPage() {
  const { user } = useAuth()
  const { data: dashData, loading: dashLoading } = useDashboard()
  const [masteryData, setMasteryData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        const token = localStorage.getItem("pb-token")
        const res = await fetch("/api/practice/mastery", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setMasteryData(data.mastery ?? data.skills ?? [])
        }
      } catch { /* ignore */ }
      finally { setLoading(false) }
    })()
  }, [])

  const displayName = user?.name || dashData?.user?.name || "Student"
  const accuracy = dashData?.stats?.accuracy ?? 0
  const firstAttemptAccuracy = dashData?.stats?.firstAttemptAccuracy ?? 0
  const totalAttempts = dashData?.stats?.totalAttempts ?? 0
  const masteredCount = dashData?.mastery?.mastered ?? 0

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-foreground">My Progress</h1>
          <p className="text-sm text-muted-foreground">Track your performance and mastery across all subjects</p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Overall Accuracy</p>
                <p className="text-xl font-bold text-foreground">{Math.round(accuracy)}%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">First Attempt</p>
                <p className="text-xl font-bold text-foreground">{Math.round(firstAttemptAccuracy)}%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Target className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Questions Done</p>
                <p className="text-xl font-bold text-foreground">{totalAttempts}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                <Award className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Skills Mastered</p>
                <p className="text-xl font-bold text-foreground">{masteredCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mastery Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Skill Mastery
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : masteryData.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground">Complete practice sessions to see your mastery data.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {masteryData.map((skill: any, i: number) => {
                  const level = skill.level || skill.masteryLevel || "not-assessed"
                  const score = skill.score ?? skill.masteryScore ?? 0
                  const levelColors: Record<string, string> = {
                    mastered: "bg-emerald-500",
                    proficient: "bg-emerald-400",
                    approaching: "bg-amber-400",
                    developing: "bg-blue-400",
                    "needs-support": "bg-red-400",
                    "not-assessed": "bg-gray-200",
                  }
                  const levelLabels: Record<string, string> = {
                    mastered: "Mastered",
                    proficient: "Proficient",
                    approaching: "Approaching",
                    developing: "Developing",
                    "needs-support": "Needs Support",
                    "not-assessed": "Not Assessed",
                  }
                  return (
                    <div key={skill.id ?? i} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{skill.name ?? skill.skillName ?? `Skill ${i + 1}`}</span>
                        <Badge variant="outline" className="text-xs">{levelLabels[level] ?? level}</Badge>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${levelColors[level] ?? "bg-primary"}`}
                          style={{ width: `${Math.min(score, 100)}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}