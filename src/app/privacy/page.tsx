'use client'

import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import {
  Shield,
  ArrowLeft,
  Lock,
  Eye,
  Database,
  FileText,
  MessageSquare,
  Cookie,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react"

const sectionIcons = [Database, Eye, Lock, Database, FileText, MessageSquare, Shield, Cookie, Mail]

export default function PrivacyPolicy() {
  const c = usePageContent("privacy")

  const sections = c.sections ?? []
  const cta = c.cta ?? { title: "", description: "", buttons: { primary: "", secondary: "" } }

  return (
    <div className="min-h-screen flex flex-col">
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
              <Shield className="h-4 w-4 text-[rgb(245,166,35)]" />
              <span>{c.hero?.badge}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {c.hero?.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              {c.hero?.description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
              <Lock className="h-4 w-4" />
              {c.hero?.lastUpdated}
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

      {/* ==================== BACK NAV ==================== */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-6 py-4 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[rgb(71,32,183)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {c.backToHome}
          </Link>
        </div>
      </section>

      {/* ==================== CONTENT ==================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Quick nav */}
          <div className="mb-12 rounded-2xl bg-gray-50 border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-[rgb(30,39,97)] uppercase tracking-wider mb-4">
              {c.onThisPageTitle}
            </h2>
            <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section: { id: string; title: string }, idx: number) => {
                const Icon = sectionIcons[idx] ?? Database
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[rgb(71,32,183)] transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {section.title}
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section: { id: string; title: string; content: string | null; items: string[]; contactInfo?: { organization: string; address: string; email: string; phone: string } }, idx: number) => {
              const Icon = sectionIcons[idx] ?? Database
              return (
                <div key={section.id} id={section.id} className="scroll-mt-20">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgb(71,32,183)]/10 text-[rgb(71,32,183)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-[rgb(30,39,97)] mb-3">{section.title}</h2>
                      {section.content && (
                        <p className="text-gray-600 leading-relaxed mb-3">{section.content}</p>
                      )}
                      {section.items && section.items.length > 0 && (
                        <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                          {section.items.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {section.contactInfo && (
                        <div className="text-gray-600 leading-relaxed">
                          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-2 mt-3">
                            <p className="font-semibold text-[rgb(30,39,97)]">{section.contactInfo.organization}</p>
                            <p>{section.contactInfo.address}</p>
                            <p>Email: {section.contactInfo.email}</p>
                            <p>Phone: {section.contactInfo.phone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
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