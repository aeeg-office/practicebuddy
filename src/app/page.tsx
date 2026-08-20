'use client'

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Award, ChevronDown, ChevronUp, BarChart3, CheckCircle, GraduationCap } from "lucide-react"
import { usePageContent } from "@/lib/use-page-content"
import { useLanguage } from "@/lib/i18n"

const features = [
  { icon: BookOpen, title: "SAT Practice", href: "/sat-prep", desc: "Skill practice and full-length test simulations for the Digital SAT." },
  { icon: GraduationCap, title: "English & Math", href: "/subjects", desc: "Core English and Mathematics for Grades 3–10." },
  { icon: BarChart3, title: "Progress Tracking", href: "/dashboard", desc: "Mastery-based analytics with cross-device sync." },
  { icon: Award, title: "AI Question Factory", href: "/admin/ai-factory", desc: "Automated content generation with gold-standard validation." },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const c = usePageContent("home")
  const { t } = useLanguage()

  return (
    <div className="flex flex-col">
      {/* ═══════════ HERO ═══════════ */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {c.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            {c.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sat-prep">
              <Button variant="accent" size="xl" className="text-base font-semibold">
                {c.hero.ctas.primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/subjects">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white hover:text-primary">
                {c.hero.ctas.secondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="bg-surface py-20 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{c.programs.title}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{c.programs.description}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Link key={f.title} href={f.href}>
                <Card className="h-full transition-colors hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="bg-elevated py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{c.diagnostic.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">{c.diagnostic.description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/take-diagnostic">
                <Button variant="accent" size="lg" className="text-base font-semibold">
                  {c.diagnostic.buttons.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg">{c.diagnostic.buttons.secondary}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="bg-surface py-20 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("faq.title")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t("faq.subtitle")}</p>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {c.faqs.map((faq: { question: string; answer: string }, i: number) => (
              <div key={i} className="rounded-lg border bg-surface">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="pr-4 text-base font-medium text-foreground">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t px-5 pb-4 pt-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{c.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/80">{c.cta.description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/take-diagnostic">
              <Button variant="accent" size="xl" className="text-base font-semibold">
                {c.cta.buttons.primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white hover:text-primary">
                {c.cta.buttons.secondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}