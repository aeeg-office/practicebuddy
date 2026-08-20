'use client'

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  Award,
  Users,
  Star,
  Quote,
  MessageCircle,
  GraduationCap,
  Target,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Globe,
} from "lucide-react"
import { usePageContent } from "@/lib/use-page-content"
import { useLanguage } from "@/lib/i18n"

/* ────────────── STYLING MAPS (not in content) ────────────── */

const programStyles = [
  { icon: BookOpen, iconColor: "text-blue-600", borderColor: "border-blue-500", href: "/sat-prep" },
  { icon: Globe, iconColor: "text-teal-600", borderColor: "border-teal-500", href: "/ielts-prep" },
  { icon: GraduationCap, iconColor: "text-orange-600", borderColor: "border-orange-500", href: "/academic-english" },
  { icon: Award, iconColor: "text-green-600", borderColor: "border-green-500", href: "/ib" },
]

const statIcons = [Award, Users, BarChart3, CheckCircle]

/* ──────────────── PAGE ──────────────── */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const c = usePageContent("home")
  const { t } = useLanguage()

  return (
    <div className="flex flex-col">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[rgb(71,32,183)] to-[rgb(30,39,97)]">
        {/* Decorative circles */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/[0.03]" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-white/[0.03]" />

        <div className="container relative z-10 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-6 px-4 py-1.5 text-sm font-medium">
              <CheckCircle className="mr-1.5 inline-block h-4 w-4" />
              {c.hero.badge}
            </Badge>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {c.hero.title.split(" ").slice(0, 2).join(" ")}
              <br />
              {c.hero.title.split(" ").slice(2).join(" ")}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              {c.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/sat-prep">
                <Button
                  variant="accent"
                  size="xl"
                  className="text-base font-semibold shadow-lg shadow-[rgb(245,166,35)]/25 transition-all duration-300 hover:shadow-[rgb(245,166,35)]/40"
                >
                  {c.hero.ctas.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-base text-[#1e2761] hover:bg-[#1e2761] hover:text-white"
                >
                  {c.hero.ctas.secondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="relative block h-12 w-full md:h-16 lg:h-20"
          >
            <path
              d="M0,60 C360,120 1080,0 1440,60 L1440,100 L0,100 Z"
              fill="#f6f6f6"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="bg-background py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {c.stats.map((stat: { value: string; label: string }, i: number) => {
              const Icon = statIcons[i]
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ PROGRAMS ═══════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              {c.programs.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.programs.description}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.programs.items.map((program: { title: string; description: string; cta: string }, i: number) => {
              const style = programStyles[i]
              return (
                <Card
                  key={program.title}
                  className={`group border-t-4 ${style.borderColor} transition-all duration-300 hover:shadow-lg`}
                >
                  <CardContent className="p-6">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${style.iconColor.replace("text", "bg")}/10`}>
                      <style.icon className={`h-6 w-6 ${style.iconColor}`} />
                    </div>
                    <h3 className={`mb-2 text-xl font-bold ${style.iconColor}`}>{program.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {program.description}
                    </p>
                    <Link
                      href={style.href}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${style.iconColor} transition-colors hover:opacity-80`}
                    >
                      {program.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ DIAGNOSTIC CALLOUT ═══════════ */}
      <section className="bg-background py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm md:p-12">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                  {c.diagnostic.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {c.diagnostic.description}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link href="/take-diagnostic">
                  <Button variant="accent" size="lg" className="text-base font-semibold">
                    {c.diagnostic.buttons.primary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/201060618899"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="text-base">
                    <MessageCircle className="mr-2 h-5 w-5 text-green-500" />
                    {c.diagnostic.buttons.secondary}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              {c.testimonials.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.testimonials.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {c.testimonials.items.map((t: { name: string; role: string; quote: string; rating: number }) => (
              <Card
                key={t.name}
                className="transition-all duration-300 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[rgb(245,166,35)] text-[rgb(245,166,35)]"
                      />
                    ))}
                  </div>
                  <div className="relative mb-4">
                    <Quote className="absolute -left-1 -top-1 h-8 w-8 text-primary/10" />
                    <p className="relative z-10 pl-3 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              {t("faq.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("faq.subtitle")}
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {c.faqs.map((faq: { question: string; answer: string }, i: number) => (
              <div
                key={i}
                className="rounded-xl border bg-white shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 text-base font-semibold text-foreground">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t px-6 pb-5 pt-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[rgb(71,32,183)] to-[rgb(30,39,97)] py-20 md:py-24">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/[0.03]" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/[0.03]" />

        <div className="container relative z-10 text-center">
          <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
            {c.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            {c.cta.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/take-diagnostic">
              <Button
                variant="accent"
                size="xl"
                className="text-base font-semibold shadow-lg shadow-[rgb(245,166,35)]/25 transition-all duration-300 hover:shadow-[rgb(245,166,35)]/40"
              >
                {c.cta.buttons.primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a
              href="https://wa.me/201060618899"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-base text-[#1e2761] hover:bg-[#1e2761] hover:text-white"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {c.cta.buttons.secondary}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ FLOATING WHATSAPP ═══════════ */}
      <a
        href="https://wa.me/201060618899"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}