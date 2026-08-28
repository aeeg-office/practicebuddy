'use client'

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Target,
  Layers,
  BookMarked,
} from "lucide-react"

/* ───────── MAP Reading Data ───────── */
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
    name: "Vocabulary & Literary Devices",
    description: "Word meanings, context clues, figurative language, and literary techniques.",
    icon: BookMarked,
    color: "text-[#f5a623]",
    bg: "bg-[#f5a623]/10",
    skills: [
      { id: "map-read-vocab-1", name: "Context Clues & Word Meanings", difficulty: "easy" },
      { id: "map-read-vocab-2", name: "Prefixes, Suffixes & Root Words", difficulty: "easy" },
      { id: "map-read-vocab-3", name: "Synonyms & Antonyms", difficulty: "easy" },
      { id: "map-read-vocab-4", name: "Similes, Metaphors & Personification", difficulty: "medium" },
      { id: "map-read-vocab-5", name: "Idioms & Figurative Language", difficulty: "medium" },
      { id: "map-read-vocab-6", name: "Tone & Mood", difficulty: "medium" },
      { id: "map-read-vocab-7", name: "Imagery & Sensory Language", difficulty: "hard" },
    ],
  },
  {
    name: "Fiction / Poetry / Drama",
    description: "Story elements, character analysis, theme, poetic structure, and dramatic techniques.",
    icon: BookOpen,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    skills: [
      { id: "map-read-fiction-1", name: "Story Elements (Plot, Setting, Characters)", difficulty: "easy" },
      { id: "map-read-fiction-2", name: "Main Idea & Supporting Details", difficulty: "easy" },
      { id: "map-read-fiction-3", name: "Character Traits & Motivations", difficulty: "medium" },
      { id: "map-read-fiction-4", name: "Theme & Central Message", difficulty: "medium" },
      { id: "map-read-fiction-5", name: "Point of View & Narrator", difficulty: "medium" },
      { id: "map-read-fiction-6", name: "Poetry: Rhyme, Meter & Structure", difficulty: "hard" },
      { id: "map-read-fiction-7", name: "Drama: Dialogue, Stage Directions & Conflict", difficulty: "hard" },
      { id: "map-read-fiction-8", name: "Comparing Texts & Genres", difficulty: "hard" },
    ],
  },
  {
    name: "Nonfiction",
    description: "Informational texts, text structures, argument analysis, and research skills.",
    icon: Layers,
    color: "text-[#0d4f4f]",
    bg: "bg-[#0d4f4f]/10",
    skills: [
      { id: "map-read-nf-1", name: "Main Idea & Key Details", difficulty: "easy" },
      { id: "map-read-nf-2", name: "Text Features (Headings, Captions, Diagrams)", difficulty: "easy" },
      { id: "map-read-nf-3", name: "Cause & Effect", difficulty: "easy" },
      { id: "map-read-nf-4", name: "Compare & Contrast", difficulty: "medium" },
      { id: "map-read-nf-5", name: "Sequence & Chronology", difficulty: "medium" },
      { id: "map-read-nf-6", name: "Author's Purpose & Perspective", difficulty: "medium" },
      { id: "map-read-nf-7", name: "Text Structure (Problem/Solution, Description)", difficulty: "hard" },
      { id: "map-read-nf-8", name: "Fact vs. Opinion & Bias", difficulty: "hard" },
      { id: "map-read-nf-9", name: "Argument Analysis & Evidence", difficulty: "hard" },
    ],
  },
]

const difficultyColors: Record<string, string> = {
  easy: "text-emerald-600 bg-emerald-100",
  medium: "text-[#f5a623] bg-[#f5a623]/10",
  hard: "text-red-500 bg-red-100",
}

export default function MapReadingPage() {
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
          <div className="absolute -top-24 -right-24 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
        <div className="relative">
          <Badge variant="accent" className="mb-3 text-xs px-3 py-1.5 font-semibold uppercase tracking-wide">
            <BookOpen className="h-3.5 w-3.5 mr-1.5 inline-block" />
            MAP Reading
          </Badge>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            MAP Reading Practice
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl">
            Build vocabulary, analyze fiction and poetry, and master nonfiction comprehension at your RIT level.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* RIT BAND SELECTOR                       */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-[#f5a623]" />
          Your RIT Band
        </h2>
        <div className="flex flex-wrap gap-2">
          {RIT_BANDS.map((band) => (
            <button
              key={band.value}
              onClick={() => setSelectedBand(band.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedBand === band.value
                  ? "bg-[#0d4f4f] text-white shadow-sm ring-2 ring-[#0d4f4f]/20"
                  : "bg-white text-muted-foreground border border-border/60 hover:border-[#0d4f4f]/30 hover:text-foreground"
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
          <Layers className="h-5 w-5 text-[#f5a623]" />
          Reading Domains (RIT {selectedBand})
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
                            ? "bg-[#0d4f4f]/10 border border-[#0d4f4f]/20"
                            : "hover:bg-[#0d4f4f]/5 border border-transparent"
                        }`}
                        onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            difficultyColors[skill.difficulty]?.split(" ")[0] === "text-emerald-600"
                              ? "bg-emerald-500"
                              : difficultyColors[skill.difficulty]?.split(" ")[0] === "text-[#f5a623]"
                                ? "bg-[#f5a623]"
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
                            <CheckCircle className="h-4 w-4 text-[#0d4f4f]" />
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
        <Link href={`/practice/reading?rit=${selectedBand}`}>
          <Button size="xl" variant="accent" className="font-semibold shadow-lg shadow-[#f5a623]/25">
            <Sparkles className="mr-2 h-5 w-5" />
            Start Reading Practice (RIT {selectedBand})
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground mt-2">
          One skill at a time. Two attempts. Instant feedback.
        </p>
      </div>
    </div>
  )
}