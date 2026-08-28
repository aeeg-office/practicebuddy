'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Calculator,
  BookOpen,
  Pen,
  Lightbulb,
  Clock,
  ListChecks,
  Brain,
  Target,
} from "lucide-react"

/* ───────── Subjects ───────── */
const SUBJECTS = [
  { key: "math", label: "Mathematics", icon: Calculator, color: "text-[#f5a623]", bg: "bg-[#f5a623]/10" },
  { key: "reading", label: "Reading", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "language-usage", label: "Language Usage", icon: Pen, color: "text-[#0d4f4f]", bg: "bg-[#0d4f4f]/10" },
]

/* ───────── Test-taking strategies ───────── */
const STRATEGIES = [
  {
    title: "Read the Question First",
    description: "Before reading the passage or problem, read the question so you know what to look for. This focuses your attention and saves time.",
    icon: Brain,
  },
  {
    title: "Eliminate Wrong Answers",
    description: "Cross out answers you know are wrong. Narrowing down choices increases your odds of selecting the correct answer.",
    icon: ListChecks,
  },
  {
    title: "Pace Yourself",
    description: "Don't spend too long on any one question. If stuck, mark it and come back. Use your time wisely across all questions.",
    icon: Clock,
  },
  {
    title: "Use the Process of Elimination",
    description: "For multiple choice, eliminate clearly incorrect options first. Even if unsure, you can often guess correctly from the remaining choices.",
    icon: Target,
  },
  {
    title: "Check Your Work",
    description: "If you finish early, review your answers. Look for careless mistakes, especially in math calculations and grammar questions.",
    icon: Lightbulb,
  },
]

export default function MapWarmUpPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("math")

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
            <Zap className="h-3.5 w-3.5 mr-1.5 inline-block" />
            Quick Start
          </Badge>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            MAP Warm-Up
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl">
            Get ready for MAP practice with a quick warm-up session and test-taking strategies.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* SUBJECT SELECTOR                        */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">Choose a Subject for Your Warm-Up</h2>
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
                    ? "bg-[#0d4f4f]/5 border-[#0d4f4f]/30 shadow-sm ring-2 ring-[#0d4f4f]/20"
                    : "bg-white border-border/60 hover:border-[#0d4f4f]/20 hover:shadow-sm"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${subject.bg}`}>
                  <Icon className={`h-5 w-5 ${subject.color}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{subject.label}</div>
                  <div className="text-xs text-muted-foreground">5 quick questions</div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* START WARM-UP                           */}
      {/* ════════════════════════════════════════ */}
      <div className="text-center py-4">
        <Link href={`/practice/${selectedSubject}?warmup=true&count=5`}>
          <Button size="xl" variant="accent" className="font-semibold shadow-lg shadow-[#f5a623]/25 px-10">
            <Sparkles className="mr-2 h-5 w-5" />
            Start Warm-Up
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground mt-2">
          5 quick questions to get you started. No pressure — just warm up.
        </p>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* TEST-TAKING STRATEGIES                   */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-[#f5a623]" />
          <h2 className="text-lg font-bold text-foreground">Test-Taking Strategies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STRATEGIES.map((strategy) => {
            const Icon = strategy.icon
            return (
              <Card key={strategy.title} className="border border-border/60 bg-card shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5a623]/10 text-[#f5a623] mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{strategy.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{strategy.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tip box */}
        <div className="mt-6 rounded-xl bg-gradient-to-r from-[#f5a623]/10 to-[#0d4f4f]/10 border border-[#f5a623]/20 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5a623] text-white">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">MAP Growth Tip</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                MAP Growth tests adapt to your level. If a question is too hard, don't worry — it means the test is finding
                your exact skill level. Always give your best effort, even when things get challenging. The RIT score is just
                a starting point for growth, not a final grade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}