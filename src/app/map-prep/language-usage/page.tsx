'use client'

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Pen,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Target,
  Layers,
  MessageSquare,
  AlignLeft,
  SpellCheck,
} from "lucide-react"

/* ───────── MAP Language Usage Data ───────── */
const RIT_BANDS = [
  { label: "151-160", value: "151-160" },
  { label: "161-170", value: "161-170" },
  { label: "171-180", value: "171-180" },
  { label: "181-190", value: "181-190" },
  { label: "191-200", value: "191-200" },
  { label: "201-210", value: "201-210" },
  { label: "211-220", value: "211-220" },
  { label: "221-230", value: "221-230" },
  { label: "231-240", value: "231-240" },
  { label: "241-250", value: "241-250" },
  { label: "251-260", value: "251-260" },
  { label: "261-270", value: "261-270" },
  { label: "271-280", value: "271-280" },
  { label: "281-290", value: "281-290" },
]

const DOMAINS = [
  {
    name: "Writing",
    description: "Planning, organizing, revising, and editing written work across genres.",
    icon: Pen,
    color: "text-[#c8785a]",
    bg: "bg-[#c8785a]/10",
    skills: [
      { id: "map-lang-write-1", name: "Sentence Construction", difficulty: "easy" },
      { id: "map-lang-write-2", name: "Paragraph Organization", difficulty: "easy" },
      { id: "map-lang-write-3", name: "Main Idea & Topic Sentences", difficulty: "easy" },
      { id: "map-lang-write-4", name: "Supporting Details & Examples", difficulty: "medium" },
      { id: "map-lang-write-5", name: "Transition Words & Cohesion", difficulty: "medium" },
      { id: "map-lang-write-6", name: "Introductions & Conclusions", difficulty: "medium" },
      { id: "map-lang-write-7", name: "Revising for Clarity & Style", difficulty: "hard" },
      { id: "map-lang-write-8", name: "Writing for Different Audiences", difficulty: "hard" },
    ],
  },
  {
    name: "Grammar & Usage",
    description: "Parts of speech, sentence structure, verb tenses, and standard English usage.",
    icon: MessageSquare,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    skills: [
      { id: "map-lang-gram-1", name: "Nouns, Verbs & Adjectives", difficulty: "easy" },
      { id: "map-lang-gram-2", name: "Subject-Verb Agreement", difficulty: "easy" },
      { id: "map-lang-gram-3", name: "Pronouns & Antecedents", difficulty: "easy" },
      { id: "map-lang-gram-4", name: "Verb Tenses & Consistency", difficulty: "medium" },
      { id: "map-lang-gram-5", name: "Adjectives & Adverbs", difficulty: "medium" },
      { id: "map-lang-gram-6", name: "Prepositions & Prepositional Phrases", difficulty: "medium" },
      { id: "map-lang-gram-7", name: "Conjunctions & Compound Sentences", difficulty: "hard" },
      { id: "map-lang-gram-8", name: "Parallel Structure & Modifiers", difficulty: "hard" },
    ],
  },
  {
    name: "Conventions",
    description: "Capitalization, punctuation, spelling, and formatting rules.",
    icon: SpellCheck,
    color: "text-[#0b4f4a]",
    bg: "bg-[#0b4f4a]/10",
    skills: [
      { id: "map-lang-conv-1", name: "Capitalization Rules", difficulty: "easy" },
      { id: "map-lang-conv-2", name: "End Punctuation (Period, Question Mark, Exclamation)", difficulty: "easy" },
      { id: "map-lang-conv-3", name: "Comma Rules (Lists, Clauses, Appositives)", difficulty: "medium" },
      { id: "map-lang-conv-4", name: "Apostrophes (Possession & Contractions)", difficulty: "medium" },
      { id: "map-lang-conv-5", name: "Quotation Marks & Dialogue Punctuation", difficulty: "medium" },
      { id: "map-lang-conv-6", name: "Colons, Semicolons & Dashes", difficulty: "hard" },
      { id: "map-lang-conv-7", name: "Common Spelling Rules & Patterns", difficulty: "hard" },
      { id: "map-lang-conv-8", name: "Formatting Titles & Paragraphs", difficulty: "hard" },
    ],
  },
]

const difficultyColors: Record<string, string> = {
  easy: "text-emerald-600 bg-emerald-100",
  medium: "text-[#c8785a] bg-[#c8785a]/10",
  hard: "text-red-500 bg-red-100",
}

export default function MapLanguageUsagePage() {
  const [selectedBand, setSelectedBand] = useState("191-200")
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({})
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const toggleDomain = (name: string) => {
    setExpandedDomains((prev) => ({ ...prev, [name]: !prev[name] }))
  }

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
          <div className="absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-[#0b4f4a]/10 blur-3xl" />
        </div>
        <div className="relative">
          <Badge variant="accent" className="mb-3 text-xs px-3 py-1.5 font-semibold uppercase tracking-wide">
            <AlignLeft className="h-3.5 w-3.5 mr-1.5 inline-block" />
            MAP Language Usage
          </Badge>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            MAP Language Usage Practice
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl">
            Master writing strategies, grammar, and conventions at your RIT level to build stronger communication skills.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* RIT BAND SELECTOR                       */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-[#c8785a]" />
          Your RIT Band
        </h2>
        <div className="flex flex-wrap gap-2">
          {RIT_BANDS.map((band) => (
            <button
              key={band.value}
              onClick={() => setSelectedBand(band.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedBand === band.value
                  ? "bg-[#0b4f4a] text-white shadow-sm ring-2 ring-[#0b4f4a]/20"
                  : "bg-white text-muted-foreground border border-border/60 hover:border-[#0b4f4a]/30 hover:text-foreground"
              }`}
            >
              {band.label}
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* DOMAIN CARDS                            */}
      {/* ════════════════════════════════════════ */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Layers className="h-5 w-5 text-[#c8785a]" />
          Language Usage Domains (RIT {selectedBand})
        </h2>

        {DOMAINS.map((domain) => {
          const Icon = domain.icon
          const isExpanded = expandedDomains[domain.name] ?? true
          return (
            <Card
              key={domain.name}
              className="border border-border/60 bg-card shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardHeader
                className="p-5 cursor-pointer flex flex-row items-center justify-between"
                onClick={() => toggleDomain(domain.name)}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${domain.bg}`}>
                    <Icon className={`h-6 w-6 ${domain.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-foreground">{domain.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5 max-w-lg">{domain.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0"
                  onClick={(e) => { e.stopPropagation(); toggleDomain(domain.name); }}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </CardHeader>

              {isExpanded && (
                <CardContent className="px-5 pb-5 pt-0">
                  <div className="border-t border-border/50 pt-4 space-y-2">
                    {domain.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                          selectedSkill === skill.id
                            ? "bg-[#0b4f4a]/10 border border-[#0b4f4a]/20"
                            : "hover:bg-[#0b4f4a]/5 border border-transparent"
                        }`}
                        onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            difficultyColors[skill.difficulty]?.split(" ")[0] === "text-emerald-600"
                              ? "bg-emerald-500"
                              : difficultyColors[skill.difficulty]?.split(" ")[0] === "text-[#c8785a]"
                                ? "bg-[#c8785a]"
                                : "bg-red-500"
                          }`} />
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                            difficultyColors[skill.difficulty]
                          }`}>
                            {skill.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href="/practice">
                            <Button size="sm" variant="accent" className="text-xs h-8 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              Practice
                            </Button>
                          </Link>
                          {selectedSkill === skill.id && (
                            <CheckCircle className="h-4 w-4 text-[#0b4f4a]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </section>

      {/* ════════════════════════════════════════ */}
      {/* START PRACTICE CTA                      */}
      {/* ════════════════════════════════════════ */}
      <div className="text-center py-4">
        <Link href={`/practice/writing?rit=${selectedBand}`}>
          <Button size="xl" variant="accent" className="font-semibold shadow-lg shadow-[#c8785a]/25">
            <Sparkles className="mr-2 h-5 w-5" />
            Start Language Usage Practice (RIT {selectedBand})
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground mt-2">
          One skill at a time. Two attempts. Instant feedback.
        </p>
      </div>
    </div>
  )
}