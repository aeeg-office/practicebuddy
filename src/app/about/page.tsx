'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { usePageContent } from "@/lib/use-page-content"
import {
  Award,
  BookOpen,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  MessageCircle,
  Quote,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

/** Icons for stats, keyed by label (via content) */
const statsIcons = [Users, Award, GlobeIcon, Heart, TrendingUp, Target]
const timelineIcons = [Rocket, TrendingUp, Zap, Award, BookOpen, Sparkles]
const valuesIcons = [Target, Heart, Lightbulb, Users] as const
const valuesColors = [
  "from-primary/20 to-primary/5",
  "from-accent/20 to-accent/5",
  "from-secondary/20 to-secondary/5",
  "from-primary/20 to-primary/5",
] as const

export default function AboutPage() {
  const c = usePageContent("about")

  const team = c.team?.members ?? []
  const countries: string[] = c.globalReach?.countries ?? []
  const stats = (c.stats ?? []).map((s: { value: string; label: string }, i: number) => ({
    ...s,
    icon: statsIcons[i] ?? Users,
  }))
  const timeline = (c.timeline?.events ?? []).map((e: { year: string; title: string; description: string }, i: number) => ({
    ...e,
    icon: timelineIcons[i] ?? Award,
  }))
  const values = (c.values?.items ?? []).map((v: { title: string; description: string }, i: number) => ({
    ...v,
    icon: valuesIcons[i] ?? Target,
    color: valuesColors[i] ?? "from-primary/20 to-primary/5",
  }))

  const memberInitials: Record<string, string> = { "Qadir Abdul-Baqi": "QA", "Mohamed Hamdy": "MH" }

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[rgb(55,25,150)] to-secondary pb-24 pt-16 sm:pt-20">
        {/* Decorative floating shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/[0.03] blur-3xl" />
          <div className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-accent/[0.04] blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 h-48 w-48 rounded-full bg-white/[0.02] blur-2xl" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Pill badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <GraduationCap className="h-4 w-4" />
              {c.hero?.badge}
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {c.hero?.title}
            </h1>

            <p className="mb-3 text-balance text-xl font-light italic leading-relaxed text-white/80">
              &ldquo;{c.hero?.motto}&rdquo;
            </p>

            <p className="max-w-3xl text-balance text-lg leading-relaxed text-white/80">
              {c.hero?.description}
            </p>

            {/* Scroll indicator */}
            <div className="mt-10 flex animate-bounce items-center gap-2 text-xs text-white/40">
              <span>{c.hero?.scrollHint}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ===== MISSION ===== */}
      <section className="relative -mt-12 pb-16 pt-8 sm:pb-20">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            {/* Mission card — overlaps hero */}
            <div className="relative z-20 rounded-2xl border bg-card p-8 shadow-xl sm:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <Badge variant="accent" className="mb-4">
                  {c.mission?.badge}
                </Badge>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                  {c.mission?.title}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {c.mission?.description}
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl bg-primary/5 p-6 text-left">
                    <Quote className="mb-3 h-6 w-6 text-primary" />
                    <p className="text-sm font-medium text-secondary">
                      &ldquo;{c.mission?.quotes?.[0]?.text}&rdquo;
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      — {c.mission?.quotes?.[0]?.author}
                    </p>
                  </div>
                  <div className="rounded-xl bg-accent/5 p-6 text-left">
                    <Star className="mb-3 h-6 w-6 text-accent" />
                    <p className="text-sm font-medium text-secondary">
                      &ldquo;{c.mission?.quotes?.[1]?.text}&rdquo;
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      — {c.mission?.quotes?.[1]?.author}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12 text-white">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((stat: { value: string; label: string; icon: React.ComponentType<{ className?: string }> }) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>
                    <div className="mt-0.5 text-xs text-white/70">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <Badge variant="secondary" className="mb-4">
                {c.timeline?.badge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                {c.timeline?.title}
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                {c.timeline?.description}
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-secondary sm:left-1/2 sm:-translate-x-1/2" />

              <div className="space-y-10">
                {timeline.map((item: { year: string; title: string; description: string; icon: React.ComponentType<{ className?: string }> }, i: number) => {
                  const Icon = item.icon
                  const isLeft = i % 2 === 0

                  return (
                    <div
                      key={item.year}
                      className="relative flex flex-col sm:flex-row sm:items-start"
                    >
                      {/* Dot + year on mobile — always left */}
                      <div className="relative z-10 flex items-center gap-4 sm:w-1/2 sm:flex-col sm:items-end sm:pr-10 sm:text-right">
                        {/* Desktop: year on the left side */}
                        <div className="hidden sm:block">
                          <span className="whitespace-nowrap text-3xl font-bold text-primary/20">
                            {item.year}
                          </span>
                        </div>

                        {/* Dot */}
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background shadow-md sm:h-10 sm:w-10 ${
                            isLeft
                              ? "bg-primary text-white"
                              : "bg-accent text-white"
                          }`}
                        >
                          <Icon className="h-5 w-5 sm:h-4 sm:w-4" />
                        </div>

                        {/* Mobile: year + card */}
                        <div className="flex-1 sm:hidden">
                          <span className="text-sm font-bold text-primary">{item.year}</span>
                        </div>
                      </div>

                      {/* Card */}
                      <div
                        className={`mt-2 sm:mt-0 sm:w-1/2 sm:pl-10 ${
                          isLeft ? "" : "sm:order-3"
                        }`}
                      >
                        <Card className="overflow-hidden border-l-4 transition-shadow hover:shadow-md"
                          style={{
                            borderLeftColor: isLeft ? "var(--color-primary)" : "var(--color-accent)",
                          }}
                        >
                          <CardContent className="p-5">
                            {/* Desktop year (hidden on mobile, shown on desktop inside card for right side) */}
                            <div className="mb-1 hidden text-xs font-semibold uppercase tracking-wider text-primary sm:block">
                              {item.year}
                            </div>
                            <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Desktop: empty space on the right side for left cards */}
                      <div className="hidden sm:block sm:w-1/2" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="bg-zinc-50 py-20">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <Badge variant="accent" className="mb-4">
                {c.values?.badge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                {c.values?.title}
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                {c.values?.description}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value: { title: string; description: string; icon: React.ComponentType<{ className?: string }>; color: string }) => {
                const Icon = value.icon
                return (
                  <Card
                    key={value.title}
                    className="group border-0 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${value.color} transition-transform group-hover:scale-110`}
                      >
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-secondary">{value.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEET THE TEAM ===== */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <Badge variant="secondary" className="mb-4">
                {c.team?.badge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                {c.team?.title}
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                {c.team?.description}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {team.map((member: { name: string; role: string; bio: string }) => (
                <Card
                  key={member.name}
                  className="overflow-hidden border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-8 pb-20 pt-8">
                    <div className="flex flex-col items-center text-center">
                      <Avatar
                        size="lg"
                        fallback={memberInitials[member.name] ?? member.name.charAt(0)}
                        className="h-24 w-24 border-4 border-white text-2xl font-bold shadow-lg"
                      />
                      <h3 className="mt-4 text-xl font-bold text-secondary">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="-mt-12 rounded-t-2xl bg-card px-6 pb-6 pt-8">
                    <p className="text-center text-sm leading-relaxed text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== GLOBAL REACH ===== */}
      <section className="bg-zinc-50 py-20">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <Badge variant="outline" className="border-primary/30 text-primary">
                {c.globalReach?.badge}
              </Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                {c.globalReach?.title}
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                {c.globalReach?.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5">
              {countries.map((country: string) => (
                <span
                  key={country}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-white px-3.5 py-1.5 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHATSAPP CTA ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[rgb(55,25,150)] to-secondary py-20 text-white">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/[0.03] blur-3xl" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25D366]/20 backdrop-blur-sm">
              <MessageCircle className="h-8 w-8 text-[#25D366]" />
            </div>

            <Badge variant="accent" className="mb-4 border-accent/30 text-xs">
              {c.cta?.badge}
            </Badge>

            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {c.cta?.title}
            </h2>

            <p className="mb-4 text-lg text-white/90">
              {c.cta?.description}
            </p>

            <p className="mb-8 text-sm text-white/60">
              {c.cta?.responseTime}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/201060618899"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="xl"
                  className="bg-[#25D366] text-white shadow-lg transition-all hover:bg-[#20bd5a] hover:shadow-xl"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {c.cta?.buttons?.primary}
                </Button>
              </a>
              <Link href="/take-diagnostic">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white"
                >
                  {c.cta?.buttons?.secondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}