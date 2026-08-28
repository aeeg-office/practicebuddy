'use client'

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  AlertCircle,
  Loader2,
  Star,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

/* ───────── Types ───────── */
interface SkillRecommendation {
  id: string
  name: string
  domain: string
  subject: string
  currentMastery: string
  priority: "high" | "medium" | "low"
  ritAligned: string
  reason: string
}

interface AttemptStats {
  subject: string
  totalAttempts: number
  totalCorrect: number
  accuracy: number
  todayAttempts: number
  streak: number
}

/* ───────── Fallback recommendations when no API data ───────── */
const FALLBACK_RECOMMENDATIONS: SkillRecommendation[] = [
  {
    id: "map-math-num-4",
    name: "Fractions & Mixed Numbers",
    domain: "Number & Operations",
    subject: "Math",
    currentMastery: "developing",
    priority: "high",
    ritAligned: "191-200",
    reason: "Foundational skill for higher-level math concepts.",
  },
  {
    id: "map-read-fiction-4",
    name: "Theme & Central Message",
    domain: "Fiction / Poetry / Drama",
    subject: "Reading",
    currentMastery: "developing",
    priority: "high",
    ritAligned: "191-200",
    reason: "Critical for reading comprehension across genres.",
  },
  {
    id: "map-lang-gram-4",
    name: "Verb Tenses & Consistency",
    domain: "Grammar & Usage",
    subject: "Language Usage",
    currentMastery: "developing",
    priority: "medium",
    ritAligned: "191-200",
    reason: "Improves writing clarity and accuracy.",
  },
  {
    id: "map-math-alg-4",
    name: "Multi-Step Equations",
    domain: "Algebra",
    subject: "Math",
    currentMastery: "beginning",
    priority: "high",
    ritAligned: "201-210",
    reason: "Key skill for MAP math growth in higher RIT bands.",
  },
  {
    id: "map-lang-conv-3",
    name: "Comma Rules (Lists, Clauses, Appositives)",
    domain: "Conventions",
    subject: "Language Usage",
    currentMastery: "beginning",
    priority: "medium",
    ritAligned: "181-190",
    reason: "Common tested convention on MAP Language Usage.",
  },
  {
    id: "map-read-nf-6",
    name: "Author's Purpose & Perspective",
    domain: "Nonfiction",
    subject: "Reading",
    currentMastery: "approaching",
    priority: "high",
    ritAligned: "211-220",
    reason: "Frequent MAP reading passage question type.",
  },
  {
    id: "map-math-geo-4",
    name: "Volume & Surface Area",
    domain: "Geometry",
    subject: "Math",
    currentMastery: "developing",
    priority: "low",
    ritAligned: "221-230",
    reason: "Builds spatial reasoning for advanced geometry.",
  },
  {
    id: "map-lang-write-5",
    name: "Transition Words & Cohesion",
    domain: "Writing",
    subject: "Language Usage",
    currentMastery: "beginning",
    priority: "medium",
    ritAligned: "191-200",
    reason: "Improves paragraph flow and organization.",
  },
]

/* ───────── Mastery badge helpers ───────── */
const masteryConfig: Record<string, { label: string; color: string; bg: string }> = {
  mastered: { label: "Mastered", color: "text-emerald-700", bg: "bg-emerald-100" },
  approaching: { label: "Approaching", color: "text-blue-700", bg: "bg-blue-100" },
  developing: { label: "Developing", color: "text-[#c8785a]", bg: "bg-[#c8785a]/10" },
  beginning: { label: "Beginning", color: "text-red-600", bg: "bg-red-100" },
  "not-assessed": { label: "Not Assessed", color: "text-gray-500", bg: "bg-gray-100" },
}

const priorityConfig: Record<string, { color: string; bg: string }> = {
  high: { color: "text-red-600", bg: "bg-red-100" },
  medium: { color: "text-[#c8785a]", bg: "bg-[#c8785a]/10" },
  low: { color: "text-blue-600", bg: "bg-blue-100" },
}

const SUBJECT_ICONS: Record<string, string> = {
  Math: "🔢",
  Reading: "📖",
  "Language Usage": "✏️",
}

export default function MapRecommendationsPage() {
  const { token, isAuthenticated } = useAuth()
  const [recommendations, setRecommendations] = useState<SkillRecommendation[]>(FALLBACK_RECOMMENDATIONS)
  const [attemptStats, setAttemptStats] = useState<Record<string, AttemptStats>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterSubject, setFilterSubject] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterMastery, setFilterMastery] = useState<string>("all")

  /* ───────── Fetch real attempt data ───────── */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      const subjects = ["math", "reading", "language-usage"]
      const stats: Record<string, AttemptStats> = {}

      // Fetch attempt history from API
      if (token && isAuthenticated) {
        try {
          const res = await fetch("/api/practice/progress?subject=all", {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (res.ok) {
            const data = await res.json()
            // Try to get per-subject progress
            for (const subject of subjects) {
              try {
                const subRes = await fetch(`/api/practice/progress?subject=${subject}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                if (subRes.ok) {
                  const subData = await subRes.json()
                  stats[subject] = {
                    subject: subData.subject,
                    totalAttempts: subData.totalAttempts ?? 0,
                    totalCorrect: subData.totalCorrect ?? 0,
                    accuracy: subData.accuracy ?? 0,
                    todayAttempts: subData.todayAttempts ?? 0,
                    streak: subData.streak ?? 0,
                  }
                }
              } catch { /* ignore */ }
            }

            // Try to fetch real recommendations from API
            try {
              const recRes = await fetch("/api/practice/recommendations", {
                headers: { Authorization: `Bearer ${token}` },
              })
              if (recRes.ok) {
                const recData = await recRes.json()
                if (recData.recommendations?.length > 0) {
                  setRecommendations(recData.recommendations)
                }
              }
            } catch { /* use fallback */ }
          }
        } catch {
          setError("Could not load your practice data. Showing general recommendations.")
        }
      }

      setAttemptStats(stats)
      setLoading(false)
    }

    fetchData()
  }, [token, isAuthenticated])

  /* ───────── Filter recommendations ───────── */
  const filteredRecs = useMemo(() => {
    return recommendations.filter((rec) => {
      const subjectMatch = filterSubject === "all" || rec.subject.toLowerCase() === filterSubject.toLowerCase()
      const priorityMatch = filterPriority === "all" || rec.priority === filterPriority
      const masteryMatch = filterMastery === "all" || rec.currentMastery === filterMastery
      return subjectMatch && priorityMatch && masteryMatch
    })
  }, [recommendations, filterSubject, filterPriority, filterMastery])

  /* ───────── Stats from fallback data ───────── */
  const totalAttempts = Object.values(attemptStats).reduce((sum, s) => sum + s.totalAttempts, 0)
  const totalCorrect = Object.values(attemptStats).reduce((sum, s) => sum + s.totalCorrect, 0)
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0
  const maxStreak = Math.max(...Object.values(attemptStats).map((s) => s.streak), 0)
  const todayAttempts = Object.values(attemptStats).reduce((sum, s) => sum + s.todayAttempts, 0)

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Back link */}
      <Link
        href="/map-prep"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0b4f4a] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to MAP Test Prep
      </Link>

      {/* ════════════════════════════════════════ */}
      {/* HEADER                                  */}
      {/* ════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b4f4a] via-[#0b4f4a] to-[#29374a] p-8 md:p-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-[#c8785a]/10 blur-3xl" />
        </div>
        <div className="relative">
          <Badge variant="accent" className="mb-3 text-xs px-3 py-1.5 font-semibold uppercase tracking-wide">
            <Trophy className="h-3.5 w-3.5 mr-1.5 inline-block" />
            Personalized for You
          </Badge>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            MAP Recommendations
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl">
            Skills to practice based on your attempt history and mastery levels. Data-driven recommendations aligned to your RIT band.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* STATS OVERVIEW                          */}
      {/* ════════════════════════════════════════ */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#0b4f4a]" />
          <span className="ml-2 text-sm text-muted-foreground">Loading your practice data...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border border-border/60 bg-card shadow-sm">
            <CardContent className="p-5 text-center">
              <div className="flex justify-center mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b4f4a]/10 text-[#0b4f4a]">
                  <Award className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{totalAttempts}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Attempts</div>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-card shadow-sm">
            <CardContent className="p-5 text-center">
              <div className="flex justify-center mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <Target className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{overallAccuracy}%</div>
              <div className="text-xs text-muted-foreground mt-1">Accuracy</div>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-card shadow-sm">
            <CardContent className="p-5 text-center">
              <div className="flex justify-center mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c8785a]/10 text-[#c8785a]">
                  <Star className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{maxStreak}</div>
              <div className="text-xs text-muted-foreground mt-1">Best Streak</div>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-card shadow-sm">
            <CardContent className="p-5 text-center">
              <div className="flex justify-center mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{todayAttempts}</div>
              <div className="text-xs text-muted-foreground mt-1">Today</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ════════════════════════════════════════ */}
      {/* ERROR STATE                             */}
      {/* ════════════════════════════════════════ */}
      {error && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">{error}</p>
        </div>
      )}

      {/* ════════════════════════════════════════ */}
      {/* FILTERS                                 */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">Filter:</span>

          {/* Subject filter */}
          <div className="flex items-center gap-1">
            {["all", "math", "reading", "language usage"].map((subj) => (
              <button
                key={subj}
                onClick={() => setFilterSubject(subj)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  filterSubject === subj
                    ? "bg-[#0b4f4a] text-white shadow-sm"
                    : "bg-white text-muted-foreground border border-border/60 hover:border-[#0b4f4a]/30"
                }`}
              >
                {subj === "all" ? "All" : subj === "language usage" ? "Language" : subj.charAt(0).toUpperCase() + subj.slice(1)}
              </button>
            ))}
          </div>

          {/* Priority filter */}
          {["all", "high", "medium", "low"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                filterPriority === p
                  ? p === "high"
                    ? "bg-red-500 text-white"
                    : p === "medium"
                      ? "bg-[#c8785a] text-white"
                      : p === "low"
                        ? "bg-blue-500 text-white"
                        : "bg-[#0b4f4a] text-white"
                  : "bg-white text-muted-foreground border border-border/60 hover:border-[#0b4f4a]/30"
              }`}
            >
              {p === "all" ? "All Priority" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* RECOMMENDATIONS LIST                     */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-[#c8785a]" />
          Suggested Skills to Practice
          <span className="text-xs font-normal text-muted-foreground ml-2">({filteredRecs.length} skills)</span>
        </h2>

        {filteredRecs.length === 0 ? (
          <Card className="border border-border/60 bg-card shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">No Matching Recommendations</h3>
              <p className="text-xs text-muted-foreground">Try adjusting your filters to see more suggestions.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredRecs.map((rec) => {
              const mastery = masteryConfig[rec.currentMastery] ?? masteryConfig["not-assessed"]
              const priority = priorityConfig[rec.priority] ?? priorityConfig.low
              const icon = SUBJECT_ICONS[rec.subject] ?? "📚"

              return (
                <Card
                  key={rec.id}
                  className="border border-border/60 bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Subject icon */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/30 text-lg">
                          {icon}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold text-foreground">{rec.name}</h3>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${priority.bg} ${priority.color}`}>
                              {rec.priority} priority
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {rec.domain} &middot; {rec.subject}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${mastery.bg} ${mastery.color}`}>
                              {mastery.label}
                            </span>
                            <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded-full bg-[#0b4f4a]/5">
                              RIT {rec.ritAligned}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{rec.reason}</p>
                        </div>
                      </div>

                      <Link href={`/practice/math?skill=${rec.id}`} className="shrink-0">
                        <Button size="sm" variant="accent" className="text-xs h-8 px-3">
                          Practice
                          <ChevronRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════ */}
      {/* CTA                                      */}
      {/* ════════════════════════════════════════ */}
      <div className="rounded-xl bg-gradient-to-r from-[#0b4f4a]/5 to-[#c8785a]/10 border border-[#0b4f4a]/10 p-6 text-center">
        <h2 className="text-base font-bold text-foreground mb-2">Want More Personalized Recommendations?</h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
          Complete more practice sessions to unlock data-driven recommendations tailored to your exact skill level and RIT band.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/map-prep/rit-practice">
            <Button variant="default" size="sm">
              Practice by RIT
            </Button>
          </Link>
          <Link href="/map-prep/mixed">
            <Button variant="outline" size="sm" className="border-[#0b4f4a]/30 text-[#0b4f4a]">
              Mixed Practice
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}