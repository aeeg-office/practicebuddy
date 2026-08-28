'use client'

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  ChevronRight,
  Layers,
  Grid,
  List,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  Zap,
  HelpCircle,
  BookMarked,
  Pen,
  Headphones,
  Mic,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockSkills, subjectList, getTotalSkillCount, mockSubjectMeta, type SubjectKey } from "@/data/practice-skills"
import { useAuth } from "@/lib/auth-context"
import { calculateSubjectProgress, type SubjectProgress } from "@/lib/progress-tracker"

/* ───────── Subject Card Icons Map ───────── */
const subjectIconMap: Record<SubjectKey, string> = {
  sat: "🎯",
  act: "📝",
  ielts: "🌍",
  toefl: "🗽",
  english: "📖",
  math: "🔢",
  reading: "📖",
  writing: "✏️",
  science: "🔬",
}

/* ───────── Filter Options ───────── */
const filterOptions = [
  { key: "all", label: "All" },
  { key: "sat", label: "SAT" },
  { key: "act", label: "ACT" },
  { key: "ielts", label: "IELTS" },
  { key: "toefl", label: "TOEFL" },
  { key: "english", label: "English" },
  { key: "math", label: "Math" },
]

/* ───────── Quick Practice Cards ───────── */
const quickPractices = [
  {
    title: "5-Min Warmup",
    description: "Quick refresher on your weakest areas",
    icon: Zap,
    color: "text-[#c8785a]",
    bg: "bg-[#c8785a]/10",
    gradient: "from-[#c8785a]/10 to-transparent",
  },
  {
    title: "Daily Challenge",
    description: "New mixed-skills challenge every day",
    icon: Sparkles,
    color: "text-[#0b4f4a]",
    bg: "bg-[#0b4f4a]/10",
    gradient: "from-[#0b4f4a]/10 to-transparent",
  },
  {
    title: "Mixed Drill",
    description: "Random practice across all subjects",
    icon: Layers,
    color: "text-[#0b4f4a]",
    bg: "bg-[#0b4f4a]/10",
    gradient: "from-[#0b4f4a]/10 to-transparent",
  },
  {
    title: "Weakest Skill",
    description: "Focus on your lowest-mastery skills",
    icon: Target,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    gradient: "from-emerald-500/10 to-transparent",
  },
]

/* ───────── Assessment Tools Cards ───────── */
const assessmentTools = [
  {
    title: "Writing Practice",
    description: "Timed essays, letters, reports & summaries with AI feedback",
    icon: Pen,
    color: "text-[#0b4f4a]",
    bg: "bg-[#0b4f4a]/10",
    gradient: "from-[#0b4f4a]/10 to-transparent",
    href: "/writing",
  },
  {
    title: "Listening Practice",
    description: "Conversations, lectures & announcements with comprehension checks",
    icon: Headphones,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    gradient: "from-emerald-500/10 to-transparent",
    href: "/listening",
  },
  {
    title: "Speaking Practice",
    description: "Describe images, express opinions & read aloud with analysis",
    icon: Mic,
    color: "text-[#c8785a]",
    bg: "bg-[#c8785a]/10",
    gradient: "from-[#c8785a]/10 to-transparent",
    href: "/speaking",
  },
]

/* ───────── Assessment tools per-subject mapping ───────── */
const assessmentToolsBySubject: Record<string, string[]> = {
  all: ["Writing Practice", "Listening Practice", "Speaking Practice"],
  sat: ["Writing Practice"],                           // SAT: no Listening/Speaking
  act: ["Writing Practice", "Listening Practice", "Speaking Practice"],
  ielts: ["Listening Practice", "Speaking Practice", "Writing Practice"],  // Listening, Reading, Writing, Speaking
  toefl: ["Listening Practice", "Speaking Practice", "Writing Practice"],  // Reading, Listening, Speaking, Writing
  english: ["Writing Practice"],                        // Reading, Writing, Grammar, Vocabulary — no Listening/Speaking
  math: [],                                             // Quick Practice, Arithmetic, Algebra, Geometry, Data — no assessment tools
}

/* ───────── Difficulty display helpers ───────── */
const difficultyConfig = {
  easy: { label: "Easy", color: "text-emerald-600", bg: "bg-emerald-100" },
  medium: { label: "Medium", color: "text-[#c8785a]", bg: "bg-[#c8785a]/10" },
  hard: { label: "Hard", color: "text-red-500", bg: "bg-red-100" },
}

export default function PracticeHomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [apiCounts, setApiCounts] = useState<Record<string, { totalQuestions: number; totalSkills: number; domains: number } | null>>({})
  const [apiLoading, setApiLoading] = useState(true)
  const [userProgress, setUserProgress] = useState<SubjectProgress | null>(null)
  const [progressLoading, setProgressLoading] = useState(false)
  const { token, isAuthenticated } = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isAuthenticated)
  }, [isAuthenticated])

  // Fetch user progress stats when authenticated
  useEffect(() => {
    if (!token || !isAuthenticated) {
      // When not logged in, use local progress data
      try {
        const localProgress = calculateSubjectProgress("sat")
        if (localProgress.totalAttempts > 0) {
          setUserProgress(localProgress)
        }
      } catch { /* ignore */ }
      return
    }

    setProgressLoading(true)
    fetch("/api/practice/progress?subject=sat", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) {
          setUserProgress({
            subject: data.subject,
            totalAttempts: data.totalAttempts,
            totalCorrect: data.totalCorrect,
            accuracy: data.accuracy,
            skills: data.skills ?? [],
            todayAttempts: data.todayAttempts,
            streak: data.streak,
            lastActiveDate: data.lastActiveDate,
          })
        }
      })
      .catch(() => {
        // Fallback to local data
        try {
          const localProgress = calculateSubjectProgress("sat")
          if (localProgress.totalAttempts > 0) {
            setUserProgress(localProgress)
          }
        } catch { /* ignore */ }
      })
      .finally(() => setProgressLoading(false))
  }, [token, isAuthenticated])

  // Debounced search and additional filters
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [domainFilter, setDomainFilter] = useState("all")

  // Fetch real question counts from the API for subjects that support it
  useEffect(() => {
    const fetchCounts = async () => {
      const counts: Record<string, { totalQuestions: number; totalSkills: number; domains: number } | null> = {}
      const apiSubjects = ["sat", "act", "ielts", "toefl"]
      
      await Promise.all(
        apiSubjects.map(async (subject) => {
          try {
            const res = await fetch(`/api/practice/skills?subject=${subject}`)
            if (!res.ok) throw new Error(`API error: ${res.status}`)
            const data = await res.json()
            const totalQuestions = data.domains.reduce(
              (acc: number, d: any) => acc + d.skills.reduce((s: number, sk: any) => s + sk.questions, 0),
              0
            )
            const totalSkills = data.domains.reduce((acc: number, d: any) => acc + d.skills.length, 0)
            const domains = data.domains.length
            counts[subject] = { totalQuestions, totalSkills, domains }
          } catch {
            // API failed — leave as null so mock fallback is used
            counts[subject] = null
          }
        })
      )
      
      setApiCounts(counts)
      setApiLoading(false)
    }
    
    fetchCounts()
  }, [])

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Collect unique domain names — filtered by selected assessment
  const allDomains = useMemo(
    () => {
      if (activeFilter !== "all") {
        // Only show domains for the selected assessment
        return mockSkills[activeFilter as SubjectKey].domains.map((d) => d.name).sort()
      }
      // Show all domains when viewing all subjects
      return Array.from(
        new Set(
          subjectList.flatMap((key) => mockSkills[key].domains.map((d) => d.name)),
        ),
      ).sort()
    },
    [activeFilter],
  )

  // Filter subjects based on selected filter
  const filteredSubjects = subjectList.filter(
    (s) => activeFilter === "all" || s === activeFilter,
  )

  // Filter by difficulty (only subjects that have skills of the selected difficulty)
  const difficultyFilteredSubjects = filteredSubjects.filter((s) => {
    if (difficultyFilter === "all") return true
    return mockSkills[s].domains.some((d) =>
      d.skills.some((sk) => sk.difficulty === difficultyFilter),
    )
  })

  // Filter by domain
  const domainFilteredSubjects = difficultyFilteredSubjects.filter((s) => {
    if (domainFilter === "all") return true
    return mockSkills[s].domains.some((d) => d.name === domainFilter)
  })

  // Filter by search (using debounced value)
  const searchedSubjects = domainFilteredSubjects.filter((s) => {
    if (!debouncedSearch) return true
    const q = debouncedSearch.toLowerCase()
    const subject = mockSkills[s]
    return (
      subject.name.toLowerCase().includes(q) ||
      subject.domains.some(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.skills.some((sk) => sk.name.toLowerCase().includes(q)),
      )
    )
  })

  // Filter assessment tools by active subject filter
  const filteredAssessmentTools = useMemo(() => {
    if (activeFilter === "all") return assessmentTools
    const validTitles = assessmentToolsBySubject[activeFilter] ?? []
    return assessmentTools.filter((tool) => validTitles.includes(tool.title))
  }, [activeFilter])

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* ════════════════════════════════════════ */}
      {/* HERO SECTION                            */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b4f4a] via-[#5f6a6c] to-[#0b4f4a] p-8 md:p-12">
          {/* Decorative orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-[#c8785a]/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative">
            <Badge variant="accent" className="mb-4 text-xs px-3 py-1.5 font-semibold uppercase tracking-wide">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 inline-block" />
              Master Every Skill
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Practice Platform
            </h1>
            <p className="mt-3 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
              Master every skill with targeted practice. Search by subject, skill, or
              difficulty — then drill, track, and improve.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* SEARCH & FILTERS                        */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search skills, domains, or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 text-sm bg-white border-border/60 shadow-sm focus-visible:ring-[#0b4f4a]"
            />
          </div>
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex items-center border border-border/60 rounded-lg overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#0b4f4a] text-white"
                    : "text-muted-foreground hover:text-foreground bg-white"
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-[#0b4f4a] text-white"
                    : "text-muted-foreground hover:text-foreground bg-white"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActiveFilter(opt.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeFilter === opt.key
                  ? "bg-[#0b4f4a] text-white shadow-sm"
                  : "bg-white text-muted-foreground border border-border/60 hover:border-[#0b4f4a]/30 hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Difficulty filter chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs font-medium text-muted-foreground mr-1">Difficulty:</span>
          {["all", "easy", "medium", "hard"].map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                difficultyFilter === d
                  ? d === "easy"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : d === "medium"
                      ? "bg-[#c8785a] text-white shadow-sm"
                      : d === "hard"
                        ? "bg-red-500 text-white shadow-sm"
                        : "bg-[#0b4f4a] text-white shadow-sm"
                  : "bg-white text-muted-foreground border border-border/60 hover:border-[#0b4f4a]/30 hover:text-foreground"
              }`}
            >
              {d === "all" ? "All" : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
          {(difficultyFilter !== "all" || domainFilter !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setDifficultyFilter("all")
                setDomainFilter("all")
                setSearchQuery("")
              }}
              className="px-3 py-1 rounded-full text-xs font-medium text-muted-foreground border border-border/60 hover:border-red-300 hover:text-red-500 transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Domain filter chips */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs font-medium text-muted-foreground mr-1">Domain:</span>
          <button
            onClick={() => setDomainFilter("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              domainFilter === "all"
                ? "bg-[#0b4f4a] text-white shadow-sm"
                : "bg-white text-muted-foreground border border-border/60 hover:border-[#0b4f4a]/30 hover:text-foreground"
            }`}
          >
            All
          </button>
          {allDomains.map((domain) => (
            <button
              key={domain}
              onClick={() => setDomainFilter(domain)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 max-w-[180px] truncate ${
                domainFilter === domain
                  ? "bg-[#0b4f4a] text-white shadow-sm"
                  : "bg-white text-muted-foreground border border-border/60 hover:border-[#0b4f4a]/30 hover:text-foreground"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* QUICK PRACTICE BUTTONS                  */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#c8785a]" />
          Quick Practice
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickPractices.map((item) => (
            <button
              key={item.title}
              onClick={() => setShowAuthModal(true)}
              className={`group relative overflow-hidden rounded-xl border border-border/50 bg-white p-4 md:p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg} mb-3`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* ASSESSMENT TOOLS                        */}
      {/* ════════════════════════════════════════ */}
      {filteredAssessmentTools.length > 0 && (
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Pen className="h-5 w-5 text-[#0b4f4a]" />
          Assessment Tools
        </h2>
        <div className={`grid grid-cols-1 gap-3 ${
          filteredAssessmentTools.length === 3
            ? "md:grid-cols-3"
            : filteredAssessmentTools.length === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-1"
        }`}>
          {filteredAssessmentTools.map((tool) => (
            <Link key={tool.title} href={tool.href}>
              <button
                className={`group relative overflow-hidden rounded-xl border border-border/50 bg-white p-4 md:p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 w-full`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tool.bg} mb-3`}>
                    <tool.icon className={`h-5 w-5 ${tool.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{tool.description}</p>
                </div>
              </button>
            </Link>
          ))}
        </div>
      </section>
      )}

      {/* ════════════════════════════════════════ */}
      {/* STATS SECTION                           */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-border/50 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b4f4a]/10 shrink-0">
                <CheckCircle className="h-6 w-6 text-[#0b4f4a]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Questions Today</p>
                {isLoggedIn && userProgress ? (
                  <>
                    <p className="text-2xl font-bold text-foreground">{userProgress.todayAttempts}</p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                      {userProgress.totalAttempts} total · {userProgress.totalCorrect} correct
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-foreground">—</p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Sign in to track</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/50 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c8785a]/10 shrink-0">
                <Award className="h-6 w-6 text-[#c8785a]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Current Streak</p>
                {isLoggedIn && userProgress ? (
                  <>
                    <p className="text-2xl font-bold text-foreground">{userProgress.streak} {userProgress.streak === 1 ? "day" : "days"}</p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                      {userProgress.streak > 0 ? "Keep it up! 🔥" : "Start a streak today"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-foreground">—</p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Sign in to track</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/50 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 shrink-0">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Accuracy</p>
                {isLoggedIn && userProgress && userProgress.totalAttempts > 0 ? (
                  <>
                    <p className="text-2xl font-bold text-foreground">{Math.round(userProgress.accuracy * 100)}%</p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                      {userProgress.totalCorrect}/{userProgress.totalAttempts} correct
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-foreground">—</p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Sign in to track</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* BROWSE BY SUBJECT                       */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#0b4f4a]" />
            Browse by Subject
          </h2>
          {searchQuery && searchedSubjects.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {searchedSubjects.length} subject{searchedSubjects.length !== 1 ? "s" : ""} found
            </span>
          )}
        </div>

        {searchedSubjects.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">No subjects match your search</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Try a different keyword or clear the filter</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setActiveFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          /* ── Grid View ── */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {searchedSubjects.map((key) => {
              const data = mockSkills[key]
              const meta = mockSubjectMeta[key]
              const totalDomains = data.domains.length
              const apiData = apiCounts[key]
              const totalSkills = apiData?.totalSkills ?? getTotalSkillCount(key)
              const totalQuestions = apiData?.totalQuestions ?? data.domains.reduce(
                (acc, d) => acc + d.skills.reduce((s, sk) => s + sk.questions, 0),
                0
              )
              const label = meta?.label ?? key
              return (
                <Link key={key} href={`/practice/${key}`} className="group">
                  <Card className="border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full bg-white overflow-hidden">
                    <div className={`h-1.5 bg-gradient-to-r ${meta.color}`} />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b4f4a]/10 group-hover:bg-[#0b4f4a]/20 transition-colors text-lg">
                            {subjectIconMap[key]}
                          </div>
                          <div>
                            <CardTitle className="text-base text-foreground">{label}</CardTitle>
                            <CardDescription className="text-xs">{totalDomains} domains</CardDescription>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-[#0b4f4a] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {totalSkills} skills
                        </span>
                        <span className="flex items-center gap-1">
                          <HelpCircle className="h-3.5 w-3.5" />
                          {totalQuestions} questions
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          /* ── List View ── */
          <div className="space-y-2">
            {searchedSubjects.map((key) => {
              const data = mockSkills[key]
              const meta = mockSubjectMeta[key]
              const totalDomains = data.domains.length
              const apiData = apiCounts[key]
              const totalSkills = apiData?.totalSkills ?? getTotalSkillCount(key)
              const totalQuestions = apiData?.totalQuestions ?? data.domains.reduce(
                (acc, d) => acc + d.skills.reduce((s, sk) => s + sk.questions, 0),
                0
              )
              const label = meta?.label ?? key
              return (
                <Link key={key} href={`/practice/${key}`}>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} text-white text-lg shrink-0`}>
                      {subjectIconMap[key]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{totalDomains} domains · {totalSkills} skills · {totalQuestions} questions</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-[#0b4f4a] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════ */}
      {/* WHATSAPP CTA                             */}
      {/* ════════════════════════════════════════ */}
      <section className="pb-8">
        <div className="rounded-xl bg-gradient-to-r from-[#0b4f4a] to-[#0b4f4a] p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#c8785a]/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative">
            <p className="text-white/70 text-sm mb-2">Need help choosing what to practice?</p>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Chat with us on WhatsApp
            </h3>
            <p className="mt-2 text-white/60 text-sm max-w-md mx-auto">
              Our academic advisors can help you build a personalized practice plan.
            </p>
            <a
              href="https://mailto:hello@lumaani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block"
            >
              <Button
                variant="accent"
                size="lg"
                className="font-semibold shadow-lg shadow-black/20 gap-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.713.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contact Us on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Account Required Modal ─── */}
      {showAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowAuthModal(false)}
          onKeyDown={(e) => (e.key === "Escape" ? setShowAuthModal(false) : null)}
          tabIndex={-1}
        >
          <div
            className="mx-4 w-full max-w-md rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-center text-xl font-bold text-foreground">
                Account Required
              </h3>
              <p className="mt-3 text-center text-sm text-muted-foreground leading-relaxed">
                This feature requires a registered account. Please log in or create an account to
                access quick practice features.
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t border-border/50 p-4">
              <Link href="/dashboard">
                <Button variant="default" className="w-full font-semibold">
                  Login
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="accent" className="w-full font-semibold">
                  Register
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full font-medium text-muted-foreground"
                onClick={() => setShowAuthModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}