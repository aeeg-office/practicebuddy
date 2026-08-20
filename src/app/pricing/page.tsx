'use client'

import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Users,
  UserCheck,
  Star,
  GraduationCap,
  Zap,
  Package,
  BookOpen,
  MessageSquare,
  DollarSign,
  Shield,
  HelpCircle,
  Phone,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

const optionIcons = [BookOpen, Zap, Package]

export default function PricingPage() {
  const c = usePageContent("pricing")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const hero = c.hero ?? { badge: "", title: "", subtitle: "", ctas: { primary: "", secondary: "" } }
  const plans = c.plans ?? { badge: "", title: "", description: "", tiers: [], guarantees: [] }
  const additionalOptions = c.additionalOptions ?? { title: "", description: "", items: [], cta: "" }
  const comparisonTable = c.comparisonTable ?? { title: "", description: "", rows: [], note: "" }
  const faqs = c.faqs ?? { badge: "", title: "", description: "", items: [] }
  const cta = c.cta ?? { title: "", description: "", buttons: { primary: "", secondary: "" } }

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
              <DollarSign className="h-4 w-4 text-[rgb(245,166,35)]" />
              <span>{hero.badge}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              {hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#plans">
                <Button size="xl" variant="accent" className="font-semibold shadow-lg">
                  {hero.ctas?.primary}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link href="/contact">
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

      {/* ==================== PRICING TIERS ==================== */}
      <section id="plans" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgb(71,32,183)]/10 px-4 py-1.5 text-sm font-medium text-[rgb(71,32,183)] mb-4">
              <Sparkles className="h-4 w-4" />
              {plans.badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[rgb(30,39,97)] sm:text-4xl">
              {plans.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {plans.description}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {(plans.tiers ?? []).map((tier: { name: string; price: number; period: string; description: string; features: string[]; cta: string; popular: boolean; badge?: string }, idx: number) => {
              const tierIcons = [Users, UserCheck, Star]
              const Icon = tierIcons[idx] ?? Users
              const isPopular = tier.popular

              return (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    isPopular
                      ? "border-2 border-[rgb(71,32,183)] shadow-lg scale-[1.02] lg:scale-105 z-10"
                      : "border border-gray-200"
                  }`}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge
                        variant={isPopular ? "default" : "accent"}
                        className="px-4 py-1.5 text-xs font-semibold shadow-md"
                      >
                        {tier.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Card header */}
                  <div
                    className={`flex flex-col items-center p-8 pb-6 text-center ${
                      isPopular ? "pt-10" : ""
                    }`}
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg ${
                        isPopular
                          ? "bg-gradient-to-br from-[rgb(71,32,183)] to-[rgb(55,25,150)] text-white"
                          : "bg-[rgb(71,32,183)]/10 text-[rgb(71,32,183)]"
                      }`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-[rgb(30,39,97)]">{tier.name}</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-xs">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="border-t border-gray-100 px-8 py-6 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-[rgb(71,32,183)]">
                        ${tier.price}
                      </span>
                      <span className="text-gray-500 text-sm">/{tier.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="px-8 pb-6 flex-1">
                    <ul className="space-y-3.5">
                      {tier.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <CheckCircle
                            className={`mt-0.5 h-5 w-5 shrink-0 ${
                              isPopular ? "text-[rgb(71,32,183)]" : "text-green-500"
                            }`}
                          />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="px-8 pb-8 mt-auto">
                    <Link href="/contact">
                      <Button
                        variant={isPopular ? "default" : "outline"}
                        size="lg"
                        className={`w-full font-semibold ${
                          isPopular
                            ? "shadow-md"
                            : "border-[rgb(71,32,183)] text-[rgb(71,32,183)] hover:bg-[rgb(71,32,183)] hover:text-white"
                        }`}
                      >
                        {tier.cta}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trust note */}
          {(plans.guarantees ?? []).length > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
              {(plans.guarantees ?? []).map((guarantee: string) => (
                <p key={guarantee} className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4 text-green-500" />
                  {guarantee}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== ADDITIONAL OPTIONS ==================== */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[rgb(30,39,97)] sm:text-4xl">
              {additionalOptions.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {additionalOptions.description}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {(additionalOptions.items ?? []).map((option: { title: string; description: string; price: string }, idx: number) => {
              const Icon = optionIcons[idx] ?? Package
              const accentColors = ["bg-blue-100 text-blue-700", "bg-orange-100 text-orange-700", "bg-green-100 text-green-700"]
              return (
                <Card
                  key={option.title}
                  className="border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(71,32,183)]/10 text-[rgb(71,32,183)] mb-2">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{option.title}</CardTitle>
                    <CardDescription className="mt-1">
                      <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold ${accentColors[idx] || accentColors[0]}`}>
                        {option.price}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 leading-relaxed">{option.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact">
              <Button variant="default" size="lg" className="font-semibold shadow-md">
                {additionalOptions.cta}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== COMPARISON TABLE ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[rgb(30,39,97)] sm:text-4xl">
              {comparisonTable.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {comparisonTable.description}
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-[rgb(71,32,183)] to-[rgb(30,39,97)] text-white">
                    <th className="px-6 py-4 text-sm font-semibold">Feature</th>
                    <th className="px-6 py-4 text-sm font-semibold text-center">Basic</th>
                    <th className="px-6 py-4 text-sm font-semibold text-center bg-white/10">Standard</th>
                    <th className="px-6 py-4 text-sm font-semibold text-center bg-[rgb(245,166,35)]/20">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {(comparisonTable.rows ?? []).map((row: { feature: string; basic: string; standard: string; premium: string }, index: number) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">{row.basic}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600 bg-[rgb(71,32,183)]/5 font-medium">
                        {row.standard}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-[rgb(245,166,35)] bg-[rgb(245,166,35)]/5">
                        {row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {comparisonTable.note && (
            <div className="mt-8 rounded-xl bg-gradient-to-r from-[rgb(71,32,183)]/5 to-[rgb(30,39,97)]/5 p-6 text-center border border-[rgb(71,32,183)]/10">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-[rgb(30,39,97)]">Pro tip:</span>{" "}
                {comparisonTable.note}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgb(71,32,183)]/10 px-4 py-1.5 text-sm font-medium text-[rgb(71,32,183)] mb-4">
              <HelpCircle className="h-4 w-4" />
              {faqs.badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[rgb(30,39,97)] sm:text-4xl">
              {faqs.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {faqs.description}
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {(faqs.items ?? []).map((faq: { question: string; answer: string }, index: number) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-gray-50/50 rounded-2xl transition-colors"
                >
                  <span className="text-base font-semibold text-[rgb(30,39,97)] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="border-t border-gray-100 px-6 py-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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