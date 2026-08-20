'use client'

import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Clock,
  Users,
  Target,
  BarChart3,
  Globe,
  MessageSquare,
  Lightbulb,
  GraduationCap,
  Star,
  Monitor,
  ArrowLeftRight,
  Phone,
} from "lucide-react"

const examIconMap: Record<string, React.ElementType> = {
  sat: BarChart3,
  act: Target,
  ielts: MessageSquare,
  toefl: Globe,
}

const examColors: Record<string, { borderClass: string; bgClass: string; iconColor: string; headerColor: string; lightBg: string; lightBorder: string; checkColor: string }> = {
  sat: { borderClass: "border-blue-500", bgClass: "bg-blue-50", iconColor: "text-blue-600", headerColor: "text-blue-700", lightBg: "bg-blue-50/50", lightBorder: "border-blue-100", checkColor: "text-blue-500" },
  act: { borderClass: "border-green-500", bgClass: "bg-green-50", iconColor: "text-green-600", headerColor: "text-green-700", lightBg: "bg-green-50/50", lightBorder: "border-green-100", checkColor: "text-green-500" },
  ielts: { borderClass: "border-orange-500", bgClass: "bg-orange-50", iconColor: "text-orange-600", headerColor: "text-orange-700", lightBg: "bg-orange-50/50", lightBorder: "border-orange-100", checkColor: "text-orange-500" },
  toefl: { borderClass: "border-teal-500", bgClass: "bg-teal-50", iconColor: "text-teal-600", headerColor: "text-teal-700", lightBg: "bg-teal-50/50", lightBorder: "border-teal-100", checkColor: "text-teal-500" },
}

const decisionIcons = [GraduationCap, Target, Clock, MessageSquare, Lightbulb]

export default function ComparePage() {
  const c = usePageContent("compare")

  const comparisonData = c.comparisonTable ?? { headers: [], rows: [], note: "" }
  const examHighlights = c.examHighlights ?? { title: "", description: "", items: [] }
  const decisionGuide = c.decisionGuide ?? { badge: "", title: "", description: "", questions: [], quickSummary: { title: "", chooseSAT: { title: "", items: [] }, chooseACT: { title: "", items: [] }, chooseIELTS: { title: "", items: [] }, chooseTOEFL: { title: "", items: [] } } }
  const cta = c.cta ?? { title: "", description: "", buttons: { primary: "", secondary: "" } }
  const hero = c.hero ?? { badge: "", title: "", subtitle: "", ctas: { primary: "", secondary: "" } }

  const rowIcons = [Monitor, Clock, BookOpen, BarChart3, Target, GraduationCap, Clock]

  return (
    <div className="flex flex-col">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[rgb(71,32,183)] via-[rgb(55,25,150)] to-[rgb(30,39,97)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[rgb(245,166,35)]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm mb-8">
              <ArrowLeftRight className="h-4 w-4 text-[rgb(245,166,35)]" />
              <span>{hero.badge}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              {hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="xl" variant="accent" className="font-semibold shadow-lg">
                  {hero.ctas?.primary}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#comparison-table">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white"
                >
                  {hero.ctas?.secondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ==================== COMPARISON TABLE ==================== */}
      <section id="comparison-table" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[rgb(30,39,97)] sm:text-4xl">
              {comparisonData.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {comparisonData.description}
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-[rgb(71,32,183)] to-[rgb(30,39,97)]">
                    <th className="px-6 py-5 text-sm font-semibold text-white/80 min-w-[140px]">
                      {comparisonData.headers?.[0] || "Feature"}
                    </th>
                    {(comparisonData.headers ?? []).slice(1).map((header: string) => {
                      const colors = ["text-blue-200", "text-green-200", "text-orange-200", "text-teal-200"]
                      return (
                        <th
                          key={header}
                          className={`px-6 py-5 text-sm font-bold ${colors[comparisonData.headers.indexOf(header) - 1] || ""} text-center min-w-[160px]`}
                        >
                          {header}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {(comparisonData.rows ?? []).map((row: { feature: string; sat: string; act: string; ielts: string; toefl: string }, index: number) => {
                    const Icon = rowIcons[index] ?? Monitor
                    return (
                      <tr
                        key={row.feature}
                        className={`border-b border-gray-100 transition-colors hover:bg-[rgb(71,32,183)]/5 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgb(71,32,183)]/10 text-[rgb(71,32,183)]">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="font-semibold text-gray-900">{row.feature}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center text-sm text-gray-700">{row.sat}</td>
                        <td className="px-6 py-5 text-center text-sm text-gray-700">{row.act}</td>
                        <td className="px-6 py-5 text-center text-sm text-gray-700">{row.ielts}</td>
                        <td className="px-6 py-5 text-center text-sm text-gray-700">{row.toefl}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table footer note */}
          {comparisonData.note && (
            <div className="mt-8 rounded-xl bg-gradient-to-r from-[rgb(71,32,183)]/5 to-[rgb(30,39,97)]/5 p-6 text-center border border-[rgb(71,32,183)]/10">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-[rgb(30,39,97)]">Note:</span>{" "}
                {comparisonData.note.split("Contact us")[0]}
                <Link href="/contact" className="text-[rgb(71,32,183)] underline underline-offset-2 hover:text-[rgb(55,25,150)]">
                  Contact us
                </Link>{" "}
                {comparisonData.note.split("Contact us")[1] || "for a personalized quote."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== EXAM HIGHLIGHTS ==================== */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[rgb(30,39,97)] sm:text-4xl">
              {examHighlights.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {examHighlights.description}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {(examHighlights.items ?? []).map((exam: { title: string; subtitle: string; features: string[]; cta: string }, idx: number) => {
              const examId = ["sat", "act", "ielts", "toefl"][idx]
              const Icon = examIconMap[examId || ""] || BarChart3
              const colors = examColors[examId || ""] || examColors.sat
              return (
                <div
                  key={examId}
                  className={`group relative rounded-2xl border-t-4 ${colors.borderClass} ${colors.bgClass} p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm ${colors.iconColor}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exam.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{exam.subtitle}</p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {(exam.features ?? []).map((feature: string) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className={`mt-0.5 h-5 w-5 shrink-0 ${colors.iconColor}`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link href={`/${examId || ""}-prep`}>
                      <Button variant="outline" className="w-full font-semibold group-hover:border-[rgb(71,32,183)] group-hover:text-[rgb(71,32,183)] transition-colors">
                        {exam.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== DECISION GUIDE ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgb(71,32,183)]/10 px-4 py-1.5 text-sm font-medium text-[rgb(71,32,183)] mb-4">
              <HelpCircle className="h-4 w-4" />
              {decisionGuide.badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[rgb(30,39,97)] sm:text-4xl">
              {decisionGuide.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {decisionGuide.description}
            </p>
          </div>

          <div className="mt-16 mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(decisionGuide.questions ?? []).map((item: { question: string; hint: string }, idx: number) => {
                const Icon = decisionIcons[idx] ?? Lightbulb
                return (
                  <Card
                    key={item.question}
                    className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(71,32,183)]/10 text-[rgb(71,32,183)] group-hover:bg-[rgb(71,32,183)] group-hover:text-white transition-colors duration-300 mb-2">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg text-gray-900">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.hint}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Quick Summary */}
          {decisionGuide.quickSummary && (
            <div className="mt-16 mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[rgb(30,39,97)] text-center">
                {decisionGuide.quickSummary.title}
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                  <h4 className="font-bold text-blue-700 mb-2">{decisionGuide.quickSummary.chooseSAT?.title}</h4>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {(decisionGuide.quickSummary.chooseSAT?.items ?? []).map((item: string) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-green-100 bg-green-50/50 p-5">
                  <h4 className="font-bold text-green-700 mb-2">{decisionGuide.quickSummary.chooseACT?.title}</h4>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {(decisionGuide.quickSummary.chooseACT?.items ?? []).map((item: string) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-5">
                  <h4 className="font-bold text-orange-700 mb-2">{decisionGuide.quickSummary.chooseIELTS?.title}</h4>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {(decisionGuide.quickSummary.chooseIELTS?.items ?? []).map((item: string) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-5">
                  <h4 className="font-bold text-teal-700 mb-2">{decisionGuide.quickSummary.chooseTOEFL?.title}</h4>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {(decisionGuide.quickSummary.chooseTOEFL?.items ?? []).map((item: string) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[rgb(71,32,183)] via-[rgb(55,25,150)] to-[rgb(30,39,97)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-[rgb(245,166,35)]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              {cta.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="xl" variant="accent" className="font-semibold shadow-lg">
                  {cta.buttons?.primary}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a
                href="https://wa.me/201060618899"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {cta.buttons?.secondary}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}