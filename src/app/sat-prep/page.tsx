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
  MessageCircle,
  Sparkles,
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

  const itemIcons: any[] = [Award, MessageSquare, GraduationCap, Users, Target, BookOpen]
  const whyAeegItems = c.whyAEEG?.items?.map((item: any, i: number) => ({
    icon: itemIcons[i] || Award,
    title: item.title,
    description: item.description,
  })) ?? []

  const programIcons: any[] = [Globe, Users, GraduationCap]
  const programIds = ["online-group", "in-center", "online-private"]
  const programs = c.programs?.items?.map((item: any, i: number) => ({
    id: programIds[i] || `program-${i}`,
    icon: programIcons[i] || Globe,
    name: item.name,
    price: item.price,
    period: item.period,
    description: item.description,
    features: item.features,
    popular: item.popular,
    cta: item.cta,
  })) ?? []

  const satTestDates = c.testDates?.dates ?? []
  const faqData = c.faqs?.items ?? []

  return (
    <div className="flex flex-col min-h-screen">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4720b7] via-[#3a1a9a] to-[#1e2761]">
        {/* Decorative orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#f5a623]/10 blur-3xl" />
          <div className="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-white/[0.03] blur-2xl" />
        </div>

        {/* Grid pattern overlay */}
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-sm text-white/90 backdrop-blur-sm mb-8">
              <Star className="h-4 w-4 text-[#f5a623] fill-[#f5a623]" />
              <span>{c.hero?.badge}</span>
            </div>

            {/* Title */}
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {c.hero?.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              {c.hero?.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/take-diagnostic">
                <Button
                  size="xl"
                  variant="accent"
                  className="font-semibold shadow-lg shadow-[#f5a623]/25"
                >
                  {c.hero?.ctas?.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#programs">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white"
                >
                  {c.hero?.ctas?.secondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave SVG divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#f6f6f6" />
          </svg>
        </div>
      </section>

      {/* ==================== WHY AEEG SECTION ==================== */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="accent" className="mb-4">
              {c.whyAEEG?.badge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e2761] sm:text-4xl">
              {c.whyAEEG?.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.whyAEEG?.description}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyAeegItems.map((item: any) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.title}
                  className="group border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#4720b7]/20"
                >
                  <CardContent className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4720b7]/10 text-[#4720b7] transition-colors group-hover:bg-[#4720b7] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-[#1e2761]">{item.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== OUR PROGRAMS SECTION ==================== */}
      <section id="programs" className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="accent" className="mb-4">
              {c.programs?.badge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e2761] sm:text-4xl">
              {c.programs?.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.programs?.description}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {programs.map((program: any) => {
              const Icon = program.icon
              return (
                <div
                  key={program.id}
                  className={`relative flex flex-col rounded-2xl bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    program.popular
                      ? "border-2 border-[#4720b7] shadow-lg"
                      : "border border-border/60 shadow-sm"
                  }`}
                >
                  {/* Popular badge */}
                  {program.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4720b7] px-5 py-1.5 text-xs font-semibold text-white shadow-md">
                        <Sparkles className="h-3.5 w-3.5" />
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {/* Card header */}
                  <div className="flex flex-col items-center p-8 pt-10 text-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg ${
                        program.popular
                          ? "bg-gradient-to-br from-[#f5a623] to-[#d48e1c]"
                          : "bg-gradient-to-br from-[#4720b7] to-[#3a1a9a]"
                      } text-white`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-[#1e2761]">{program.name}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{program.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-border/60 px-8 py-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-[#4720b7]">{program.price}</span>
                      <span className="text-muted-foreground">{program.period}</span>
                    </div>

                    {/* Features */}
                    <ul className="mt-6 space-y-3">
                      {program.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#4720b7]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-8">
                      <Link href="/contact">
                        <Button
                          variant={program.popular ? "default" : "outline"}
                          className={`w-full font-semibold ${
                            program.popular ? "" : "border-[#4720b7]/30 text-[#4720b7] hover:bg-[#4720b7] hover:text-white"
                          }`}
                        >
                          {program.cta}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Discount note */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              {c.programs?.note}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SAT TEST DATES SECTION ==================== */}
      <section className="bg-card py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="accent" className="mb-4">
              {c.testDates?.badge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e2761] sm:text-4xl">
              {c.testDates?.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.testDates?.description}
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border/60 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-[#4720b7] to-[#1e2761]">
                    <th className="px-6 py-4 text-sm font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {c.testDates?.columns?.testDate}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-white">
                      {c.testDates?.columns?.registrationDeadline}
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-white">
                      {c.testDates?.columns?.lateRegistration}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {satTestDates.map((row: any, index: number) => (
                    <tr
                      key={row.date}
                      className={`border-b border-border/60 transition-colors hover:bg-[#4720b7]/5 ${
                        index % 2 === 0 ? "bg-card" : "bg-muted/20"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4720b7]/10 text-[#4720b7]">
                            <Clock className="h-5 w-5" />
                          </div>
                          <span className="font-medium text-foreground">{row.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{row.registration}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.late}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {c.testDates?.note}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="accent" className="mb-4">
              {c.faqs?.badge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e2761] sm:text-4xl">
              {c.faqs?.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.faqs?.description}
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqData.map((faq: any, index: number) => (
              <div
                key={index}
                className={`rounded-2xl border bg-card shadow-sm transition-all duration-200 ${
                  openFaq === index
                    ? "border-[#4720b7]/30 shadow-md"
                    : "border-border/60"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className="text-base font-semibold text-[#1e2761]">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openFaq === index ? "rotate-180 text-[#4720b7]" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="border-t border-border/60 px-6 py-5">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4720b7] via-[#3a1a9a] to-[#1e2761]">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 right-1/3 h-64 w-64 rounded-full bg-[#f5a623]/10 blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
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
            <HelpCircle className="h-12 w-12 text-[#f5a623] mb-6" />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {c.cta?.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              {c.cta?.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/take-diagnostic">
                <Button
                  size="xl"
                  variant="accent"
                  className="font-semibold shadow-lg shadow-[#f5a623]/25"
                >
                  {c.cta?.buttons?.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a
                href="https://wa.me/201060618899?text=Hi%20AEEG!%20I%20want%20to%20ask%20about%20SAT%20preparation%20programs."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  {c.cta?.buttons?.secondary}
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm text-white/60">
              {c.cta?.note}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FLOATING WHATSAPP BADGE ==================== */}
      <a
        href="https://wa.me/201060618899?text=Hi%20AEEG!%20I%20want%20to%20ask%20about%20SAT%20preparation%20programs."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        aria-label="Ask about SAT Prep on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-semibold hidden sm:inline">{c.cta?.floatingBadge}</span>
      </a>
    </div>
  )
}