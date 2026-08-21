'use client'

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, ArrowRight, BarChart3, Award } from "lucide-react"

const programs = [
  { icon: BookOpen, title: "SAT Practice", href: "/sat-prep", desc: "Skill practice and full-length test simulations." },
  { icon: BarChart3, title: "English & Math", href: "/subjects", desc: "Core practice for Grades 3–10." },
  { icon: Award, title: "Progress", href: "/dashboard", desc: "Track your mastery and improvement." },
]

export default function Home() {
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="flex flex-col min-h-[80vh]">
      {/* ═══════════ HERO — Student Welcome ═══════════ */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            {isAuthenticated ? `Hi, ${user?.name?.split(" ")[0] || "there"}!` : "Welcome to Lumaani"}
          </h1>
          <p className="mt-2 text-lg text-white/80">
            {isAuthenticated ? "What would you like to practice today?" : "Practice smarter. Track your progress. Master every skill."}
          </p>
          {!isAuthenticated && (
            <div className="mt-6 flex gap-4">
              <Link href="/login">
                <Button variant="accent" size="lg" className="font-semibold">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sat-prep">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-primary">
                  Explore SAT
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ Programs ═══════════ */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <Link key={p.title} href={p.href}>
                <Card className="h-full transition-colors hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <p.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Quick Start (for auth users) ═══════════ */}
      {isAuthenticated && (
        <section className="bg-elevated py-16 md:py-20">
          <div className="container">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Continue Where You Left Off</h2>
            <div className="rounded-lg border bg-surface p-6">
              <p className="text-muted-foreground">Select a program above to start practicing. Your progress is saved automatically.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}