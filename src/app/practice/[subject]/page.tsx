'use client'

import { useEffect, useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Award,
  Target,
  Sparkles,
  HelpCircle,
  Layers,
  Zap,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  mockSkills,
  subjectList,
  getTotalSkillCount,
  mockSubjectMeta,
  type SubjectKey,
  type Difficulty,
  type MasteryLevel,
  type Domain,
  type Skill,
  type SubjectData,
} from "@/data/practice-skills"

/* ───────── Mastery Badge Config ───────── */
const masteryConfig: Record<MasteryLevel, { label: string; variant: "default" | "secondary" | "accent" | "outline" | "success" | "destructive"; color: string }> = {
  mastered: { label: "Mastered", variant: "success", color: "text-emerald-600 bg-emerald-100" },
  approaching: { label: "Approaching", variant: "accent", color: "text-[#c8785a] bg-[#c8785a]/10" },
  developing: { label: "Developing", variant: "default", color: "text-[#0b4f4a] bg-[#0b4f4a]/10" },
  beginning: { label: "Beginning", variant: "secondary", color: "text-[#0b4f4a] bg-[#0b4f4a]/10" },
  "not-assessed": { label: "Not Assessed", variant: "outline", color: "text-muted-foreground bg-muted/30" },
}

/* ───────── Difficulty Config ───────── */
const difficultyConfig: Record<Difficulty, { label: string; color: string }> = {
  easy: { label: "Easy", color: "text-emerald-600 bg-emerald-100" },
  medium: { label: "Medium", color: "text-[#c8785a] bg-[#c8785a]/10" },
  hard: { label: "Hard", color: "text-red-500 bg-red-100" },
}

/* ───────── Difficulty Filter Options ───────── */
const difficultyFilters = [
  { key: "all", label: "All" },
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "Hard" },
]

/* ───────── Subject icon map ───────── */
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

/* ───────── Domain Accordion Section ───────── */
function DomainSection({
  domain,
  difficultyFilter,
  searchQuery,
  subjectKey,
  questionCounts = {},
}: {
  domain: Domain
  difficultyFilter: string
  searchQuery: string
  subjectKey: string
  questionCounts: Record<string, number>
}) {
  const [expanded, setExpanded] = useState(true)

  // Filter skills based on difficulty and search
  const filteredSkills = domain.skills.filter((skill) => {
    const matchesDifficulty = difficultyFilter === "all" || skill.difficulty === difficultyFilter
    const matchesSearch =
      !searchQuery ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDifficulty && matchesSearch
  })

  if (filteredSkills.length === 0) return null

  return (
    <Card className="border border-border/50 shadow-sm bg-white overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0b4f4a]/10">
            <Layers className="h-4 w-4 text-[#0b4f4a]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{domain.name}</h3>
            <p className="text-xs text-muted-foreground">
              {filteredSkills.length} skill{filteredSkills.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {filteredSkills.reduce((acc, s) => acc + (questionCounts[s.id] ?? s.questions), 0)} questions
          </span>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border/50 divide-y divide-border/30">
          {filteredSkills.map((skill) => (
            <Link
              key={skill.id}
              href={`/practice/${subjectKey}/${skill.id}`}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/20 transition-colors group"
            >
              {/* Mastery dot */}
              <div
                className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                  skill.mastery === "mastered"
                    ? "bg-emerald-500"
                    : skill.mastery === "approaching"
                    ? "bg-[#c8785a]"
                    : skill.mastery === "developing"
                    ? "bg-[#0b4f4a]"
                    : skill.mastery === "beginning"
                    ? "bg-[#0b4f4a]"
                    : "bg-muted-foreground/30"
                }`}
              />

              {/* Skill info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground group-hover:text-[#0b4f4a] transition-colors">
                    {skill.name}
                  </span>
                  <Badge
                    variant={difficultyConfig[skill.difficulty].color.includes("emerald") ? "success" : difficultyConfig[skill.difficulty].color.includes("red") ? "destructive" : "accent"}
                    className="text-[10px] px-2 py-0 font-medium"
                  >
                    {difficultyConfig[skill.difficulty].label}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <Badge
                    variant={masteryConfig[skill.mastery].variant}
                    className="text-[10px] px-2 py-0 font-medium"
                  >
                    {masteryConfig[skill.mastery].label}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <HelpCircle className="h-3 w-3" />
                    {questionCounts[skill.id] ?? skill.questions} questions
                  </span>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-[#0b4f4a] group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </Card>
  )
}

/* ───────── Subject Page Component ───────── */
export default function SubjectPage() {
  const params = useParams()
  const subject = params.subject as SubjectKey

  // State — declared before early returns (Rules of Hooks)
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [apiSkills, setApiSkills] = useState<SubjectData | null>(null)

  // Fetch real question counts from the API (sat/act/ielts/toefl only)
  useEffect(() => {
    let cancelled = false
    if (!mockSkills[subject]) return
    const fetchSkills = async () => {
      try {
        const res = await fetch(`/api/practice/skills?subject=${subject}`)
        if (!res.ok) throw new Error(`API error: ${res.status}`)
        const data = await res.json()
        if (!cancelled) setApiSkills(data)
      } catch {
        if (!cancelled) setApiSkills(null)
      }
    }
    fetchSkills()
    return () => {
      cancelled = true
    }
  }, [subject])

  // Map of skillId → real question count from the API
  const questionCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    if (apiSkills) {
      apiSkills.domains.forEach((d) => d.skills.forEach((s) => { counts[s.id] = s.questions }))
    }
    return counts
  }, [apiSkills])

  // Validate subject key
  if (!mockSkills[subject]) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="text-center py-20">
          <HelpCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Subject Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t find &ldquo;{subject}&rdquo; in our practice platform.
          </p>
          <Link href="/practice">
            <Button variant="default">
              <ArrowRight className="h-4 w-4 mr-2" />
              Back to Practice Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const data = mockSkills[subject]
  const meta = mockSubjectMeta[subject]
  const totalSkills = getTotalSkillCount(subject)
  const totalDomains = data.domains.length
  const totalQuestions = apiSkills
    ? apiSkills.domains.reduce((acc, d) => acc + d.skills.reduce((s, sk) => s + sk.questions, 0), 0)
    : data.domains.reduce((acc, d) => acc + d.skills.reduce((s, sk) => s + sk.questions, 0), 0)

  // Calculate mastery stats
  const allSkills = data.domains.flatMap((d) => d.skills)
  const masteredCount = allSkills.filter((s) => s.mastery === "mastered").length
  const developingCount = allSkills.filter((s) => s.mastery === "developing" || s.mastery === "approaching").length
  const notStartedCount = allSkills.filter((s) => s.mastery === "not-assessed" || s.mastery === "beginning").length

  // Determine which domains to show
  const filteredDomains = data.domains.filter((domain) => {
    if (!searchQuery && difficultyFilter === "all") return true
    return domain.skills.some((skill) => {
      const matchesDifficulty = difficultyFilter === "all" || skill.difficulty === difficultyFilter
      const matchesSearch =
        !searchQuery || skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesDifficulty && matchesSearch
    })
  })

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* ════════════════════════════════════════ */}
      {/* SUBJECT HEADER                          */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${meta.color} p-8 md:p-10`}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-[350px] w-[350px] rounded-full bg-white/8 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-[250px] w-[250px] rounded-full bg-white/5 blur-3xl" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-lg shrink-0">
                {subjectIconMap[subject]}
              </div>
              <div>
                <Badge variant="accent" className="mb-2 text-xs px-3 py-1 font-semibold">
                  <BookOpen className="h-3 w-3 mr-1.5 inline-block" />
                  {totalDomains} Domains
                </Badge>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  {data.name} Practice
                </h1>
                <p className="mt-2 text-base text-white/70 max-w-xl">
                  {totalSkills} skills across {totalDomains} domains — {totalQuestions} practice questions available
                </p>
              </div>
            </div>

            <Link href={`/practice/${subject}/practice-all`}>
              <Button
                variant="accent"
                size="xl"
                className="font-semibold shadow-xl shadow-black/20 group w-full md:w-auto"
              >
                <Zap className="h-5 w-5 mr-2" />
                Practice All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* STATS OVERVIEW                          */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="border border-border/50 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 shrink-0">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Mastered</p>
                <p className="text-xl font-bold text-foreground">{masteredCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/50 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0b4f4a]/10 shrink-0">
                <Target className="h-5 w-5 text-[#0b4f4a]" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">In Progress</p>
                <p className="text-xl font-bold text-foreground">{developingCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/50 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 shrink-0">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Not Started</p>
                <p className="text-xl font-bold text-foreground">{notStartedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/50 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c8785a]/10 shrink-0">
                <Award className="h-5 w-5 text-[#c8785a]" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Progress</p>
                <p className="text-xl font-bold text-foreground">{Math.round((masteredCount / totalSkills) * 100)}%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* SEARCH & DIFFICULTY FILTERS             */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={`Search ${data.name} skills...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-sm bg-white border-border/60 shadow-sm focus-visible:ring-[#0b4f4a]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
            <div className="flex gap-1.5">
              {difficultyFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setDifficultyFilter(f.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    difficultyFilter === f.key
                      ? "bg-[#0b4f4a] text-white shadow-sm"
                      : "bg-white text-muted-foreground border border-border/60 hover:border-[#0b4f4a]/30 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* DOMAIN SECTIONS                         */}
      {/* ════════════════════════════════════════ */}
      <section>
        {filteredDomains.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">No domains match your filters</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Try adjusting the difficulty filter or search term
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setDifficultyFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDomains.map((domain) => (
              <DomainSection
                key={domain.name}
                domain={domain}
                difficultyFilter={difficultyFilter}
                searchQuery={searchQuery}
                subjectKey={subject}
                questionCounts={questionCounts}
              />
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════ */}
      {/* BOTTOM CTA                              */}
      {/* ════════════════════════════════════════ */}
      <section className="pb-8">
        <Card className="border-0 bg-gradient-to-r from-[#0b4f4a] to-[#0b4f4a] shadow-lg">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Need help with {data.name}?</h3>
              <p className="text-sm text-white/70 mt-1">
                Our expert tutors are ready to help you master every skill.
              </p>
            </div>
            <a
              href="mailto:hello@lumaani.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="accent"
                size="lg"
                className="font-semibold shadow-lg shadow-black/20 gap-2 shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.713.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Support
              </Button>
            </a>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}