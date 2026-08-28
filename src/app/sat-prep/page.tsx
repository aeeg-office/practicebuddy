'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  MessageSquare,
  GraduationCap,
  Users,
  Target,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  Globe,
  Calendar,
  HelpCircle,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"
import { usePageContent } from "@/lib/use-page-content"

export default function SatPrepPage() {
  const c = usePageContent("sat-prep")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqData = c.faqs?.items ?? c.faqs ?? []

  return (
    <div className="flex flex-col min-h-screen">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d4f4f] via-[#0a3d3d] to-[#0d4f4f]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#e8b84b]/10 blur-3xl" />
          <div className="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-white/[0.03] blur-2xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-sm text-white/90 backdrop-blur-sm mb-8">
              <Star className="h-4 w-4 text-[#e8b84b] fill-[#e8b84b]" />
              <span>{c.hero?.badge}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {c.hero?.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              {c.hero?.subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/practice/sat">
                <Button
                  size="xl"
                  variant="accent"
                  className="font-semibold shadow-lg shadow-[#e8b84b]/25"
                >
                  {c.hero?.ctas?.primary || "Start Skill Practice"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sat-simulation">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  {c.hero?.ctas?.secondary || "Take a Simulation"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#f6f6f6" />
          </svg>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="accent" className="mb-4">
              {c.features?.badge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {c.features?.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.features?.description}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(c.features?.items ?? []).map((item: any, i: number) => {
              const icons = [Award, MessageSquare, GraduationCap, BookOpen]
              const Icon = icons[i] || Award
              return (
                <Card
                  key={item.title}
                  className="group border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d4f4f]/10 text-[#0d4f4f] transition-colors group-hover:bg-[#0d4f4f] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== SAT TAXONOMY ==================== */}
      {c.taxonomies && (
        <section className="bg-muted/30 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Reading & Writing */}
              {c.taxonomies.readingWriting && (
                <div>
                  <h3 className="text-xl font-bold text-[#0d4f4f] mb-6">{c.taxonomies.readingWriting.title}</h3>
                  <div className="space-y-6">
                    {c.taxonomies.readingWriting.domains?.map((domain: any) => (
                      <div key={domain.name} className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                        <h4 className="font-semibold text-foreground">{domain.name}</h4>
                        <ul className="mt-3 space-y-1.5">
                          {(domain.skills ?? []).map((skill: string) => (
                            <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-3.5 w-3.5 text-[#0d4f4f]" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Math */}
              {c.taxonomies.math && (
                <div>
                  <h3 className="text-xl font-bold text-[#0d4f4f] mb-6">{c.taxonomies.math.title}</h3>
                  <div className="space-y-6">
                    {c.taxonomies.math.domains?.map((domain: any) => (
                      <div key={domain.name} className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                        <h4 className="font-semibold text-foreground">{domain.name}</h4>
                        <ul className="mt-3 space-y-1.5">
                          {(domain.skills ?? []).map((skill: string) => (
                            <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-3.5 w-3.5 text-[#0d4f4f]" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ==================== FAQ SECTION ==================== */}
      {faqData.length > 1 && (
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {c.faqs?.title || "Frequently Asked Questions"}
              </h2>
            </div>
            <div className="space-y-4">
              {(Array.isArray(faqData) ? faqData : []).map((faq: any, index: number) => (
                <div
                  key={index}
                  className={`rounded-2xl border bg-card shadow-sm transition-all duration-200 ${
                    openFaq === index
                      ? "border-[#0d4f4f]/30 shadow-md"
                      : "border-border/60"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left gap-4"
                  >
                    <span className="text-base font-semibold text-foreground">{faq.q || faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        openFaq === index ? "rotate-180 text-[#0d4f4f]" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-border/60 px-6 py-5">
                      <p className="text-muted-foreground leading-relaxed">{faq.a || faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d4f4f] via-[#0a3d3d] to-[#0d4f4f]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 right-1/3 h-64 w-64 rounded-full bg-[#e8b84b]/10 blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <HelpCircle className="h-12 w-12 text-[#e8b84b] mb-6" />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {c.cta?.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              {c.cta?.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/practice/sat">
                <Button
                  size="xl"
                  variant="accent"
                  className="font-semibold shadow-lg shadow-[#e8b84b]/25"
                >
                  {c.cta?.primary || "Start Practice"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/subjects">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  {c.cta?.secondary || "View Math Skills"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}