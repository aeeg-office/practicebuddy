'use client'

import { useState } from "react"
import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import {
  Globe,
  Calculator,
  Monitor,
  Users,
  UserCheck,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Star,
  GraduationCap,
  Sparkles,
  Target,
  MessageSquare,
  FileText,
  Book,
  HelpCircle,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

/* ───────── Icon Mappings ───────── */
const englishIcons = [FileText, Globe, MessageSquare, MessageCircle]
const mathIcons = [Calculator, Book, Target]
const formatIcons = [Monitor, Users, UserCheck]

/* ───────── SVG Wave Divider ───────── */
function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative -mt-1 ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[60px] md:h-[80px]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

/* ───────── Accordion Item Component ───────── */
function AccordionItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden transition-all duration-200 bg-white">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left font-medium text-[rgb(22,32,34)] hover:bg-muted/20 transition-colors gap-4"
      >
        <span className="text-sm md:text-base leading-snug">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[rgb(11,79,74)] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
          {a}
        </div>
      </div>
    </div>
  )
}

export default function SubjectsPage() {
  const c = usePageContent("subjects")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (i: number) => {
    setOpenFaq(openFaq === i ? null : i)
  }

  const englishTopics = (c.english?.items ?? []).map(
    (item: { title: string; description: string; highlights: string[] }, i: number) => ({
      ...item,
      icon: englishIcons[i] ?? FileText,
    })
  )

  const mathTopics = (c.math?.items ?? []).map(
    (item: { title: string; description: string; highlights: string[] }, i: number) => ({
      ...item,
      icon: mathIcons[i] ?? Calculator,
    })
  )

  const programFormats = (c.formats?.items ?? []).map(
    (item: { title: string; description: string; features: string[]; badge: string }, i: number) => ({
      ...item,
      icon: formatIcons[i] ?? Monitor,
    })
  )

  const faqs = c.faqs?.items ?? []
  const tags = c.hero?.tags ?? []

  return (
    <div className="min-h-screen bg-background">
      {/* ════════════════════════════════════════ */}
      {/* HERO SECTION                            */}
      {/* ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[rgb(11,79,74)] via-[rgb(11,79,74)] to-[rgb(22,32,34)]">
        {/* Decorative orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[rgb(200,120,90)]/8 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 h-[300px] w-[300px] rounded-full bg-[rgb(11,79,74)]/40 blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-5 text-xs px-4 py-1.5 tracking-wide uppercase font-semibold">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 inline-block" />
              {c.hero?.badge}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {c.hero?.title}
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
              {c.hero?.subtitle}
            </p>
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs px-3 py-1.5 bg-white/10 text-white border-white/20">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact">
                <Button size="xl" variant="accent" className="font-semibold shadow-xl shadow-black/20 group">
                  {c.hero?.ctas?.primary}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="/take-diagnostic">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  {c.hero?.ctas?.secondary}
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 text-white/60 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[rgb(200,120,90)] fill-[rgb(200,120,90)]" />
                <span className="text-white/70">{c.hero?.ratings?.stars}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[rgb(200,120,90)]" />
                <span className="text-white/70">{c.hero?.ratings?.tutors}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <WaveDivider />
      </section>

      {/* ════════════════════════════════════════ */}
      {/* ENGLISH TUTORING SECTION                */}
      {/* ════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-3 text-xs px-3 py-1">
                {c.english?.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(22,32,34)] tracking-tight">
                {c.english?.title}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {c.english?.description}
              </p>
            </div>
            <Link
              href="/take-diagnostic"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(11,79,74)] hover:text-[rgb(11,79,74)] transition-colors group"
            >
              {c.english?.linkText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {englishTopics.map((topic: { title: string; description: string; highlights: string[]; icon: React.ComponentType<{ className?: string }> }) => {
              const TopicIcon = topic.icon
              return (
                <Card
                  key={topic.title}
                  className="border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 bg-white"
                >
                  <CardHeader className="pb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgb(11,79,74)]/10 group-hover:bg-[rgb(11,79,74)]/20 transition-colors mb-2">
                      <TopicIcon className="h-5.5 w-5.5 text-[rgb(11,79,74)]" />
                    </div>
                    <CardTitle className="text-base text-[rgb(22,32,34)]">{topic.title}</CardTitle>
                    <CardDescription className="mt-1 text-xs leading-relaxed">{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {topic.highlights.map((h: string) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[rgb(200,120,90)] mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* MATH TUTORING SECTION                   */}
      {/* ════════════════════════════════════════ */}
      <section className="bg-[#f6f6f6] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-3 text-xs px-3 py-1">
                {c.math?.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(22,32,34)] tracking-tight">
                {c.math?.title}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {c.math?.description}
              </p>
            </div>
            <Link
              href="/take-diagnostic"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(11,79,74)] hover:text-[rgb(11,79,74)] transition-colors group"
            >
              {c.math?.linkText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {mathTopics.map((topic: { title: string; description: string; highlights: string[]; icon: React.ComponentType<{ className?: string }> }) => {
              const TopicIcon = topic.icon
              return (
                <Card
                  key={topic.title}
                  className="border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 bg-white"
                >
                  <CardHeader className="pb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgb(22,32,34)]/10 group-hover:bg-[rgb(22,32,34)]/20 transition-colors mb-2">
                      <TopicIcon className="h-5.5 w-5.5 text-[rgb(22,32,34)]" />
                    </div>
                    <CardTitle className="text-base text-[rgb(22,32,34)]">{topic.title}</CardTitle>
                    <CardDescription className="mt-1 text-xs leading-relaxed">{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {topic.highlights.map((h: string) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[rgb(200,120,90)] mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA banner within math section */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[rgb(11,79,74)] to-[rgb(22,32,34)] p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[rgb(200,120,90)]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="relative">
              <HelpCircle className="h-10 w-10 text-[rgb(200,120,90)] mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {c.math?.cta?.title}
              </h3>
              <p className="mt-2 text-white/70 max-w-xl mx-auto">
                {c.math?.cta?.description}
              </p>
              <Link href="/take-diagnostic" className="mt-6 inline-block">
                <Button variant="accent" size="lg" className="font-semibold shadow-lg shadow-black/20">
                  {c.math?.cta?.button}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* PROGRAM FORMATS                         */}
      {/* ════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="default" className="mb-3 text-xs px-3 py-1">
              {c.formats?.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(22,32,34)] tracking-tight">
              {c.formats?.title}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {c.formats?.description}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {programFormats.map((format: { title: string; description: string; features: string[]; badge: string; icon: React.ComponentType<{ className?: string }> }) => {
              const FormatIcon = format.icon
              const badgeVariant = format.badge === "Most Popular" ? "accent" as const : format.badge === "In-Person" ? "secondary" as const : "default" as const
              return (
                <Card
                  key={format.title}
                  className={`relative border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white ${
                    format.badge === "Most Popular" ? "ring-2 ring-[rgb(200,120,90)] shadow-lg shadow-[rgb(200,120,90)]/10" : ""
                  }`}
                >
                  {format.badge === "Most Popular" && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge variant="accent" className="text-xs px-3 py-1 font-semibold shadow-lg">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className={`pb-3 ${format.badge === "Most Popular" ? "pt-8" : "pt-7"}`}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(11,79,74)]/10 mb-3">
                      <FormatIcon className="h-7 w-7 text-[rgb(11,79,74)]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg text-[rgb(22,32,34)]">{format.title}</CardTitle>
                      {format.badge !== "Most Popular" && (
                        <Badge variant={badgeVariant} className="text-[10px] px-2 py-0">
                          {format.badge}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-xs mt-1.5 leading-relaxed">{format.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <ul className="space-y-2.5">
                      {format.features.map((f: string) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href="/contact" className="w-full">
                      <Button variant="outline" className="w-full font-medium" size="default">
                        {c.formats?.items?.[0]?.cta ?? "Learn More"}
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* FAQ SECTION                             */}
      {/* ════════════════════════════════════════ */}
      <section className="bg-[#f6f6f6] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3 text-xs px-3 py-1">
              {c.faqs?.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(22,32,34)] tracking-tight">
              {c.faqs?.title}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              {c.faqs?.description}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq: { question: string; answer: string }, i: number) => (
              <AccordionItem
                key={i}
                q={faq.question}
                a={faq.answer}
                open={openFaq === i}
                onToggle={() => toggleFaq(i)}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              {c.faqs?.bottomText}
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* FINAL CTA — WhatsApp                    */}
      {/* ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[rgb(11,79,74)] to-[rgb(22,32,34)] py-16 md:py-20">
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-64 h-64 rounded-full bg-[rgb(200,120,90)]/8 blur-3xl" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
            <MessageCircle className="h-8 w-8 text-[rgb(200,120,90)]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {c.cta?.title}
          </h2>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            {c.cta?.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="mailto:hello@lumaani.com?text=Hi%2C%20I'm%20interested%20in%20your%20English%20%26%20Math%20programs.%20Can%20you%20tell%20me%20more%3F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="xl"
                className="font-semibold shadow-xl shadow-black/20 bg-[#25D366] hover:bg-[#20bd5a] text-white"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {c.cta?.buttons?.primary}
              </Button>
            </a>
            <Link href="/contact">
              <Button
                size="xl"
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                {c.cta?.buttons?.secondary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}