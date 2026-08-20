'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { usePageContent } from "@/lib/use-page-content"
import { ArrowRight, MessageCircle, Sparkles, Award, Target, Users, BookOpen, GraduationCap, Globe } from "lucide-react"

const benefitIcons = [Award, Target, Users, BookOpen, GraduationCap, Globe]

export default function AcademicEnglishPage() {
  const c = usePageContent("academic-english")

  const benefits = (c.benefits?.items ?? []).map(
    (item: { title: string; description: string }, i: number) => ({
      ...item,
      icon: benefitIcons[i] ?? Award,
    })
  )

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4720b7] via-[#3a1a9a] to-[#1e2761]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-sm text-white/90 backdrop-blur-sm mb-8">
              <Sparkles className="h-4 w-4 text-[#f5a623]" />
              <span>{c.hero?.badge}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {c.hero?.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              {c.hero?.subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="xl" variant="accent" className="font-semibold shadow-lg shadow-[#f5a623]/25">
                  {c.hero?.ctas?.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/201060618899" target="_blank" rel="noopener noreferrer">
                <Button size="xl" variant="outline" className="border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {c.hero?.ctas?.secondary}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="accent" className="mb-4">{c.benefits?.badge}</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-[#1e2761] sm:text-4xl">{c.benefits?.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{c.benefits?.description}</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="group border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#4720b7]/20">
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

      <section className="relative overflow-hidden bg-gradient-to-br from-[#4720b7] via-[#3a1a9a] to-[#1e2761] py-20 sm:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{c.cta?.title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">{c.cta?.description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
            <Link href="/contact">
              <Button size="xl" variant="accent" className="font-semibold shadow-lg shadow-[#f5a623]/25">
                {c.cta?.buttons?.primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://wa.me/201060618899" target="_blank" rel="noopener noreferrer">
              <Button size="xl" variant="outline" className="border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white gap-2">
                <MessageCircle className="h-5 w-5" />
                {c.cta?.buttons?.secondary}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}