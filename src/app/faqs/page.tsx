'use client'

import { useState } from "react"
import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  ChevronDown,
  HelpCircle,
  FileText,
  CreditCard,
  Calendar,
  ShieldCheck,
  MessageCircle,
} from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  category: string
  icon: React.ElementType
  items: FAQItem[]
  description: string
}

const categoryIcons: Record<string, React.ElementType> = {
  General: HelpCircle,
  Programs: FileText,
  Pricing: CreditCard,
  Scheduling: Calendar,
  Payment: ShieldCheck,
}

export default function FAQsPage() {
  const c = usePageContent("faqs")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openIndex, setOpenIndex] = useState<{ categoryIndex: number; itemIndex: number } | null>(null)

  const rawCategories: FAQCategory[] = (c.categories?.items ?? []).map(
    (item: { category: string; description: string; items: FAQItem[] }) => ({
      ...item,
      icon: categoryIcons[item.category] ?? HelpCircle,
    })
  )

  const filteredData = rawCategories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0)

  const allCategories = c.categories?.labels ?? rawCategories.map((c) => c.category)

  const toggleAccordion = (categoryIndex: number, itemIndex: number) => {
    if (
      openIndex?.categoryIndex === categoryIndex &&
      openIndex?.itemIndex === itemIndex
    ) {
      setOpenIndex(null)
    } else {
      setOpenIndex({ categoryIndex, itemIndex })
    }
  }

  const categoryToShow = activeCategory
    ? filteredData.filter((c) => c.category === activeCategory)
    : filteredData

  return (
    <div className="flex flex-col">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[rgb(55,25,150)] to-secondary py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        <div className="container relative z-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium border border-white/10">
              <HelpCircle className="h-4 w-4" />
              {c.hero?.badge}
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {c.hero?.title}
            </h1>
            <p className="max-w-2xl text-lg text-white/80">
              {c.hero?.description}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Category Quick Navigation ─── */}
      <section className="border-b bg-white">
        <div className="container py-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {allCategories.map((category: string) => {
              const Icon = categoryIcons[category] ?? HelpCircle
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-gray-200 bg-white text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category}
                </button>
              )
            })}
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="text-xs text-muted-foreground hover:text-primary underline ml-1"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── Search Bar ─── */}
      <section className="bg-gray-50 border-b">
        <div className="container py-6">
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={c.searchPlaceholder ?? "Search frequently asked questions..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setOpenIndex(null)
                }}
                className="h-12 pl-12 pr-4 text-base rounded-xl border-2 border-gray-200 focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Accordion ─── */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container">
          {categoryToShow.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                <Search className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">{c.noResults?.title}</h3>
              <p className="text-muted-foreground mb-6">
                {c.noResults?.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setOpenIndex(null)
                  }}
                >
                  {c.noResults?.clearButton}
                </Button>
                {activeCategory && (
                  <Button
                    variant="default"
                    onClick={() => {
                      setActiveCategory(null)
                      setSearchQuery("")
                      setOpenIndex(null)
                    }}
                  >
                    {c.noResults?.viewAllButton}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-8">
              {categoryToShow.map((category: FAQCategory, categoryIndex: number) => {
                const actualIndex = rawCategories.findIndex((c) => c.category === category.category)
                return (
                  <div key={category.category} className="scroll-mt-24">
                    <div className="mb-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-md">
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-secondary">{category.category}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                      </div>
                      <BadgeCount count={category.items.length} />
                    </div>
                    <div className="space-y-3">
                      {category.items.map((item: FAQItem, itemIndex: number) => {
                        const isOpen =
                          openIndex?.categoryIndex === actualIndex &&
                          openIndex?.itemIndex === itemIndex
                        return (
                          <div
                            key={itemIndex}
                            className={`rounded-xl border bg-white shadow-sm overflow-hidden transition-all duration-200 ${
                              isOpen ? "border-primary/20 shadow-md" : "hover:border-gray-300"
                            }`}
                          >
                            <button
                              onClick={() => toggleAccordion(actualIndex, itemIndex)}
                              className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-gray-50"
                            >
                              <span
                                className={`text-sm font-semibold pr-2 ${
                                  isOpen ? "text-primary" : "text-foreground"
                                }`}
                              >
                                {item.question}
                              </span>
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                                  isOpen
                                    ? "bg-primary/10 text-primary rotate-180"
                                    : "bg-gray-100 text-muted-foreground"
                                }`}
                              >
                                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                              </div>
                            </button>
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                              }`}
                            >
                              <div className="border-t border-primary/10 px-5 py-4 bg-gradient-to-b from-white to-gray-50/50">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[rgb(55,25,150)] to-secondary py-20 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {c.cta?.title}
            </h2>
            <p className="mb-8 text-lg text-white/80">
              {c.cta?.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button
                  variant="accent"
                  size="xl"
                  className="font-semibold shadow-lg shadow-[rgb(245,166,35)]/25 hover:shadow-[rgb(245,166,35)]/40 transition-all duration-300"
                >
                  {c.cta?.buttons?.primary}
                </Button>
              </Link>
              <Link href="https://wa.me/201060618899">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
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

function BadgeCount({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center justify-center h-6 min-w-[2rem] rounded-full bg-primary/10 px-2 text-xs font-semibold text-primary">
      {count}
    </span>
  )
}