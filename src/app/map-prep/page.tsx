'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  BookOpen,
  Pen,
  ArrowRight,
  Target,
  Sparkles,
  Zap,
  Layers,
  Trophy,
  ChevronRight,
} from "lucide-react"

/* ───────── Program Cards ───────── */
const programs = [
  {
    title: "MAP Mathematics",
    description: "Number & Operations, Algebra, Geometry, Probability & Statistics — aligned to MAP Growth RIT bands.",
    icon: Calculator,
    href: "/map-prep/math",
    color: "text-[#f5a623]",
    bg: "bg-[#f5a623]/10",
    gradient: "from-[#f5a623]/10 to-transparent",
  },
  {
    title: "MAP Reading",
    description: "Vocabulary, Literary Devices, Fiction, Poetry, Drama & Nonfiction comprehension.",
    icon: BookOpen,
    href: "/map-prep/reading",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    gradient: "from-emerald-500/10 to-transparent",
  },
  {
    title: "MAP Language Usage",
    description: "Writing strategies, grammar & usage, and conventions — MAP-aligned practice.",
    icon: Pen,
    href: "/map-prep/language-usage",
    color: "text-[#1a237e]",
    bg: "bg-[#1a237e]/10",
    gradient: "from-[#1a237e]/10 to-transparent",
  },
]

/* ───────── Quick Links ───────── */
const quickLinks = [
  {
    title: "Practice by RIT Range",
    description: "Choose your RIT band and practice at the right level.",
    icon: Target,
    href: "/map-prep/rit-practice",
    color: "text-[#f5a623]",
    bg: "bg-[#f5a623]/10",
  },
  {
    title: "Mixed MAP Practice",
    description: "Random practice across subjects and RIT bands.",
    icon: Layers,
    href: "/map-prep/mixed",
    color: "text-[#1a237e]",
    bg: "bg-[#1a237e]/10",
  },
  {
    title: "MAP Warm-Up",
    description: "Quick warm-up with test-taking strategies.",
    icon: Zap,
    href: "/map-prep/warm-up",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "MAP Recommendations",
    description: "Personalized skill recommendations based on your progress.",
    icon: Trophy,
    href: "/map-prep/recommendations",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
]

export default function MapPrepLandingPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* ════════════════════════════════════════ */}
      {/* HERO                                    */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a237e] via-[#1e2761] to-[#0d2137] p-8 md:p-12">
          {/* Decorative orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-[#f5a623]/10 blur-3xl" />
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
              MAP Growth Aligned
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              MAP Test Prep
            </h1>
            <p className="mt-3 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
              Practice by RIT band, master every MAP domain, and track your growth.
              One screen, one task — focused practice that builds real results.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/map-prep/math">
                <Button variant="accent" size="lg" className="font-semibold shadow-lg shadow-[#f5a623]/25">
                  Start Math Practice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/map-prep/rit-practice">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-[#1a237e]"
                >
                  Practice by RIT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* PROGRAM CARDS                          */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#f5a623]" />
          MAP Subject Practice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programs.map((program) => (
            <Link key={program.title} href={program.href}>
              <Card className="group h-full border border-border/50 bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                <CardContent className="p-6 relative">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${program.bg} mb-4`}>
                    <program.icon className={`h-6 w-6 ${program.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-[#1a237e] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-[#1a237e] opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Practice
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* QUICK LINKS                            */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#f5a623]" />
          Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-white p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                <div className="relative">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.bg} mb-3`}>
                    <link.icon className={`h-5 w-5 ${link.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{link.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* HOW IT WORKS                           */}
      {/* ════════════════════════════════════════ */}
      <section className="rounded-xl bg-[#1a237e]/5 border border-[#1a237e]/10 p-6 md:p-8">
        <h2 className="text-lg font-bold text-foreground mb-4">How MAP Prep Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a237e] text-white font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Find Your RIT Band</h3>
              <p className="text-xs text-muted-foreground mt-1">Select your MAP Growth RIT range for targeted practice at the right level.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a237e] text-white font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Practice Skills</h3>
              <p className="text-xs text-muted-foreground mt-1">Work through domains and skills with two-attempt teaching and instant feedback.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a237e] text-white font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Grow Your Score</h3>
              <p className="text-xs text-muted-foreground mt-1">Track mastery, build streaks, and watch your RIT band confidence grow.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}