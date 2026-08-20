'use client'

import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  GraduationCap,
  Headphones,
  MessageSquare,
  PenTool,
  Target,
  Award,
  Star,
  Sparkles,
  TrendingUp,
  Globe,
} from "lucide-react"
import * as Accordion from "@radix-ui/react-accordion"

const benefitsIcons = [GraduationCap, Target, TrendingUp]

const sectionIcons = [BookOpen, Headphones, MessageSquare, PenTool]
const sectionColors = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-purple-500 to-purple-600",
  "from-amber-500 to-amber-600",
]

export default function TOEFLPrepPage() {
  const c = usePageContent("toefl-prep")

  const benefits = (c.benefits?.items ?? []).map(
    (item: { title: string; description: string }, i: number) => ({
      ...item,
      icon: benefitsIcons[i] ?? GraduationCap,
    })
  )

  const programs = (c.programs?.items ?? []).map(
    (item: { name: string; price: string; period: string; description: string; features: string[]; popular: boolean; cta: string }, i: number) => ({
      ...item,
      gradient: i === 0 ? "from-accent to-[#e09510]" : "from-secondary to-secondary/80",
    })
  )

  const sections = (c.testStructure?.sections ?? []).map(
    (item: { name: string; details: string; description: string }, i: number) => ({
      ...item,
      items: item.details,
      icon: sectionIcons[i] ?? BookOpen,
      color: sectionColors[i] ?? "from-blue-500 to-blue-600",
    })
  )

  const faqs = c.faqs?.items ?? []

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 md:py-32">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,166,35,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        <div className="container relative z-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge
              variant="accent"
              className="mb-6 px-4 py-2 text-sm font-semibold tracking-wide uppercase"
            >
              {c.hero?.badge}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {c.hero?.title}
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 md:text-xl">
              {c.hero?.subtitle}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/take-diagnostic">
                <Button
                  size="xl"
                  variant="accent"
                  className="w-full font-semibold shadow-lg hover:shadow-xl sm:w-auto"
                >
                  <Target className="mr-2 h-5 w-5" />
                  {c.hero?.ctas?.primary}
                </Button>
              </Link>
              <Link href="#programs">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white sm:w-auto"
                >
                  {c.hero?.ctas?.secondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ===== WHY AEEG FOR TOEFL ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="h-4 w-4" />
              {c.benefits?.badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {c.benefits?.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {c.benefits?.description}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {benefits.map((item: { title: string; description: string; icon: React.ComponentType<{ className?: string }> }, i: number) => {
              const Icon = item.icon
              return (
                <Card
                  key={i}
                  className="group border-0 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-colors group-hover:from-primary group-hover:to-primary/80 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== TOEFL PROGRAMS (Pricing) ===== */}
      <section id="programs" className="bg-gradient-to-b from-zinc-50 to-white py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-[#c4890f]">
              <Sparkles className="h-4 w-4" />
              {c.programs?.badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {c.programs?.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {c.programs?.description}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
            {programs.map((program: { name: string; price: string; period: string; description: string; features: string[]; popular: boolean; cta: string; gradient: string }, i: number) => (
              <Card
                key={i}
                className={`relative flex flex-col border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  program.popular ? "ring-2 ring-accent shadow-lg" : ""
                }`}
              >
                {/* Popular badge */}
                {program.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                      <Star className="h-3.5 w-3.5" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Header gradient */}
                <div
                  className={`rounded-t-lg bg-gradient-to-r ${program.gradient} px-6 pb-6 pt-8 text-white ${
                    program.popular ? "pt-10" : ""
                  }`}
                >
                  <CardTitle className="mb-1 text-2xl font-bold text-white">{program.name}</CardTitle>
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{program.price}</span>
                    <span className="text-sm text-white/70">{program.period}</span>
                  </div>
                  <p className="text-sm text-white/80">{program.description}</p>
                </div>

                <CardContent className="flex flex-1 flex-col pt-6">
                  <ul className="mb-8 flex-1 space-y-3">
                    {program.features.map((feature: string, j: number) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/take-diagnostic">
                    <Button
                      className={`w-full ${
                        program.popular
                          ? "bg-accent text-white hover:bg-[#e09510]"
                          : "bg-primary text-white hover:bg-primary/90"
                      }`}
                      size="lg"
                    >
                      {program.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOEFL TEST STRUCTURE ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Globe className="h-4 w-4" />
              {c.testStructure?.badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-secondary md:text-4xl">
              {c.testStructure?.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {c.testStructure?.description}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {sections.map((section: { name: string; items: string; description: string; icon: React.ComponentType<{ className?: string }>; color: string }, i: number) => {
              const SectionIcon = section.icon
              return (
                <Card key={i} className="group border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} text-white shadow-sm`}>
                        <SectionIcon className="h-7 w-7" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-xl text-foreground">{section.name}</CardTitle>
                        <p className="text-sm font-medium text-primary">{section.items}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">{section.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Score summary card */}
          <div className="mx-auto mt-8 max-w-5xl">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white shadow-sm">
                  <Award className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{c.testStructure?.scoring?.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.testStructure?.scoring?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="bg-gradient-to-b from-zinc-50 to-white py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <MessageSquare className="h-4 w-4" />
                {c.faqs?.badge}
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                {c.faqs?.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {c.faqs?.description}
              </p>
            </div>

            <Accordion.Root type="single" collapsible className="space-y-3">
              {faqs.map((faq: { question: string; answer: string }, index: number) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-4 text-left text-base font-medium text-foreground transition-colors hover:bg-zinc-50 data-[state=open]:bg-zinc-50">
                      <span>{faq.question}</span>
                      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="border-t border-border/50 px-6 pb-4 pt-3 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            <div className="mt-10 text-center">
              <p className="mb-4 text-muted-foreground">{c.faqs?.bottomText}</p>
              <Link
                href="https://wa.me/201060618899?text=Hi%20AEEG!%20I'd%20like%20to%20ask%20about%20TOEFL%20preparation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="accent" size="lg" className="gap-2 font-semibold shadow-md hover:shadow-lg">
                  <MessageSquare className="h-5 w-5" />
                  {c.faqs?.bottomCta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION WITH WHATSAPP ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 md:py-28">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,166,35,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_50%)]" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="accent"
              className="mb-6 px-4 py-2 text-sm font-semibold tracking-wide uppercase"
            >
              {c.cta?.badge}
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {c.cta?.title}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
              {c.cta?.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/take-diagnostic">
                <Button
                  size="xl"
                  variant="accent"
                  className="w-full font-semibold shadow-lg hover:shadow-xl sm:w-auto"
                >
                  <Target className="mr-2 h-5 w-5" />
                  {c.cta?.buttons?.primary}
                </Button>
              </Link>
              <Link
                href="https://wa.me/201060618899?text=Hi%20AEEG!%20I'd%20like%20to%20ask%20about%20TOEFL%20preparation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white sm:w-auto"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
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