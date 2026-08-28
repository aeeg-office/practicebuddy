'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Layers,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Calculator,
  BookOpen,
  Pen,
  Settings,
} from "lucide-react"

/* ───────── Options ───────── */
const SUBJECTS = [
  { key: "math", label: "Mathematics", icon: Calculator, color: "text-[#f5a623]", bg: "bg-[#f5a623]/10" },
  { key: "reading", label: "Reading", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "language-usage", label: "Language Usage", icon: Pen, color: "text-[#0d4f4f]", bg: "bg-[#0d4f4f]/10" },
  { key: "all", label: "All MAP Subjects", icon: Layers, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const DOMAIN_OPTIONS: Record<string, { key: string; label: string }[]> = {
  math: [
    { key: "number", label: "Number & Operations" },
    { key: "algebra", label: "Algebra" },
    { key: "geometry", label: "Geometry" },
    { key: "statistics", label: "Probability & Statistics" },
  ],
  reading: [
    { key: "vocabulary", label: "Vocabulary & Literary Devices" },
    { key: "fiction", label: "Fiction / Poetry / Drama" },
    { key: "nonfiction", label: "Nonfiction" },
  ],
  "language-usage": [
    { key: "writing", label: "Writing" },
    { key: "grammar", label: "Grammar & Usage" },
    { key: "conventions", label: "Conventions" },
  ],
  all: [
    { key: "all-domains", label: "All Domains" },
  ],
}

const RIT_BANDS = [
  "151-160", "161-170", "171-180", "181-190", "191-200",
  "201-210", "211-220", "221-230", "231-240",
  "241-250", "251-260", "261-270", "271-280", "281-290",
]

const QUESTION_COUNTS = [5, 10, 15, 20, 25]

export default function MixedMapPracticePage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedBand, setSelectedBand] = useState("191-200")
  const [questionCount, setQuestionCount] = useState(10)

  const availableDomains = DOMAIN_OPTIONS[selectedSubject] ?? DOMAIN_OPTIONS.all

  const toggleDomain = (key: string) => {
    setSelectedDomains((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key],
    )
  }

  const handleStart = () => {
    const subjectRoute = selectedSubject === "all" ? "math" : selectedSubject
    const params = new URLSearchParams()
    if (selectedDomains.length > 0) params.set("domains", selectedDomains.join(","))
    params.set("rit", selectedBand)
    params.set("count", String(questionCount))
    if (selectedSubject === "all") params.set("mixed", "true")
    return `/practice/${subjectRoute}?${params.toString()}`
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Back link */}
      <Link
        href="/map-prep"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0d4f4f] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to MAP Test Prep
      </Link>

      {/* ════════════════════════════════════════ */}
      {/* HEADER                                  */}
      {/* ════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d4f4f] via-[#1e2761] to-[#0d2137] p-8 md:p-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-[#f5a623]/10 blur-3xl" />
        </div>
        <div className="relative">
          <Badge variant="accent" className="mb-3 text-xs px-3 py-1.5 font-semibold uppercase tracking-wide">
            <Layers className="h-3.5 w-3.5 mr-1.5 inline-block" />
            Mixed Practice
          </Badge>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Mixed MAP Practice
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl">
            Configure your own practice session — choose subjects, domains, RIT band, and question count.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* CONFIGURATION PANEL                     */}
      {/* ════════════════════════════════════════ */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="p-6 pb-0">
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#f5a623]" />
            Configure Your Session
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Subject */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Subject</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SUBJECTS.map((subject) => {
                const Icon = subject.icon
                const isSelected = selectedSubject === subject.key
                return (
                  <button
                    key={subject.key}
                    onClick={() => {
                      setSelectedSubject(subject.key)
                      setSelectedDomains([])
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-[#0d4f4f]/5 border-[#0d4f4f]/30 ring-2 ring-[#0d4f4f]/20"
                        : "bg-white border-border/60 hover:border-[#0d4f4f]/20"
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${subject.bg}`}>
                      <Icon className={`h-4 w-4 ${subject.color}`} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{subject.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Domains */}
          {availableDomains.length > 1 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Domains</h3>
              <div className="flex flex-wrap gap-2">
                {availableDomains.map((domain) => (
                  <button
                    key={domain.key}
                    onClick={() => toggleDomain(domain.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedDomains.includes(domain.key)
                        ? "bg-[#0d4f4f] text-white shadow-sm"
                        : "bg-white text-muted-foreground border border-border/60 hover:border-[#0d4f4f]/30"
                    }`}
                  >
                    {domain.label}
                  </button>
                ))}
              </div>
              {selectedDomains.length === 0 && (
                <p className="text-xs text-muted-foreground mt-2">Select one or more domains, or leave empty for all.</p>
              )}
            </div>
          )}

          {/* RIT Band */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">RIT Band</h3>
            <div className="flex flex-wrap gap-2">
              {RIT_BANDS.map((band) => (
                <button
                  key={band}
                  onClick={() => setSelectedBand(band)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedBand === band
                      ? "bg-[#0d4f4f] text-white shadow-sm ring-2 ring-[#0d4f4f]/20"
                      : "bg-white text-muted-foreground border border-border/60 hover:border-[#0d4f4f]/30 hover:text-foreground"
                  }`}
                >
                  {band}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Questions</h3>
            <div className="flex items-center gap-3">
              {QUESTION_COUNTS.map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`w-12 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                    questionCount === count
                      ? "bg-[#0d4f4f] text-white shadow-sm"
                      : "bg-white text-muted-foreground border border-border/60 hover:border-[#0d4f4f]/30 hover:text-foreground"
                  }`}
                >
                  {count}
                </button>
              ))}
              <span className="text-xs text-muted-foreground ml-2">questions per session</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ════════════════════════════════════════ */}
      {/* START BUTTON                            */}
      {/* ════════════════════════════════════════ */}
      <div className="text-center py-4">
        <Link href={handleStart()}>
          <Button size="xl" variant="accent" className="font-semibold shadow-lg shadow-[#f5a623]/25 px-10">
            <Sparkles className="mr-2 h-5 w-5" />
            Start {questionCount}-Question Mixed Session
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground mt-2">
          Mixed-domain practice with two-attempt teaching and instant feedback.
        </p>
      </div>
    </div>
  )
}