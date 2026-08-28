'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Calculator,
  BookOpen,
  Pen,
} from "lucide-react"

/* ───────── RIT Bands ───────── */
const RIT_BANDS = [
  { label: "151-160", description: "Grades K-1" },
  { label: "161-170", description: "Grades 1-2" },
  { label: "171-180", description: "Grades 2-3" },
  { label: "181-190", description: "Grades 3-4" },
  { label: "191-200", description: "Grades 4-5" },
  { label: "201-210", description: "Grades 5-6" },
  { label: "211-220", description: "Grades 6-7" },
  { label: "221-230", description: "Grades 7-8" },
  { label: "231-240", description: "Grades 8-9" },
  { label: "241-250", description: "Grades 9-10" },
  { label: "251-260", description: "Grades 10-11" },
  { label: "261-270", description: "Grades 11-12" },
  { label: "271-280", description: "Advanced" },
  { label: "281-290", description: "Advanced+" },
]

const SUBJECTS = [
  { key: "math", label: "Mathematics", icon: Calculator, color: "text-[#c8785a]", bg: "bg-[#c8785a]/10", href: "/map-prep/math" },
  { key: "reading", label: "Reading", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/map-prep/reading" },
  { key: "language-usage", label: "Language Usage", icon: Pen, color: "text-[#0b4f4a]", bg: "bg-[#0b4f4a]/10", href: "/map-prep/language-usage" },
]

export default function RitPracticePage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>("math")
  const [selectedBand, setSelectedBand] = useState<string | null>("191-200")

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
            <Target className="h-3.5 w-3.5 mr-1.5 inline-block" />
            MAP Growth Aligned
          </Badge>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Practice by RIT Range
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl">
            Select your subject and MAP RIT band to get practice questions at exactly the right level.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* SUBJECT SELECTOR                        */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">1. Choose a Subject</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SUBJECTS.map((subject) => {
            const Icon = subject.icon
            const isSelected = selectedSubject === subject.key
            return (
              <button
                key={subject.key}
                onClick={() => setSelectedSubject(subject.key)}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-[#0b4f4a]/5 border-[#0b4f4a]/30 shadow-sm ring-2 ring-[#0b4f4a]/20"
                    : "bg-white border-border/60 hover:border-[#0b4f4a]/20 hover:shadow-sm"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isSelected ? `${subject.bg} ring-2 ring-[#0b4f4a]/10` : subject.bg}`}>
                  <Icon className={`h-5 w-5 ${subject.color}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{subject.label}</div>
                  <div className="text-xs text-muted-foreground">MAP Subject</div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* RIT BAND PICKER                         */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">2. Select Your RIT Band</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {RIT_BANDS.map((band) => (
            <button
              key={band.label}
              onClick={() => setSelectedBand(band.label)}
              className={`p-3 rounded-xl text-center border transition-all duration-200 ${
                selectedBand === band.label
                  ? "bg-[#0b4f4a] text-white shadow-md ring-2 ring-[#0b4f4a]/20 border-transparent"
                  : "bg-white text-foreground border-border/60 hover:border-[#0b4f4a]/30 hover:shadow-sm"
              }`}
            >
              <div className="text-sm font-bold">{band.label}</div>
              <div className={`text-[10px] mt-0.5 ${
                selectedBand === band.label ? "text-white/70" : "text-muted-foreground"
              }`}>
                {band.description}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* START PRACTICE                          */}
      {/* ════════════════════════════════════════ */}
      <div className="text-center py-6">
        {selectedSubject && selectedBand && (
          <Link href={`/practice/${selectedSubject}?rit=${selectedBand}`}>
            <Button size="xl" variant="accent" className="font-semibold shadow-lg shadow-[#c8785a]/25 px-10">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Practice — RIT {selectedBand}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          Questions adapt to your RIT band. Focus on one skill at a time.
        </p>
      </div>
    </div>
  )
}