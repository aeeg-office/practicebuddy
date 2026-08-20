'use client'

import { useState } from "react"
import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ChevronDown,
  CheckCircle,
  BookOpen,
  ArrowRight,
} from "lucide-react"

const methodIcons = [MapPin, Phone, Mail, MessageCircle]

interface ContactMethod {
  icon: React.ElementType
  title: string
  details: string[]
  action: { href: string; label: string } | null
}

export default function ContactPage() {
  const c = usePageContent("contact")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send the form data to an API endpoint
    setSubmitted(true)
  }

  const contactMethods: ContactMethod[] = (c.methods ?? []).map(
    (m: { title: string; details: string[]; action: { href: string; label: string } | null }, i: number) => ({
      ...m,
      icon: methodIcons[i] ?? MapPin,
    })
  )

  const businessHours = c.businessHours?.days ?? []
  const subjects = c.form?.subjects ?? []

  return (
    <div className="flex flex-col">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[rgb(55,25,150)] to-secondary py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="absolute top-20 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        <div className="container relative z-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium border border-white/10">
              <MessageCircle className="h-4 w-4" />
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

      {/* ─── Quick Contact Cards ─── */}
      <section className="relative -mt-8 z-10 pb-8">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method: ContactMethod) => (
              <div
                key={method.title}
                className="group rounded-xl border bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{method.title}</p>
                    {method.details.map((detail: string, i: number) => (
                      <p key={i} className="text-xs text-muted-foreground truncate">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
                {method.action && (
                  <Link
                    href={method.action.href}
                    className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    {method.action.label}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Form + Info ─── */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* ─── Left Column — Form ─── */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-12 text-center shadow-sm">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-2">{c.form?.successTitle}</h3>
                  <p className="text-muted-foreground max-w-md">
                    {c.form?.successDescription}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
                    }}
                  >
                    {c.form?.sendAnother}
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border bg-white p-8 shadow-sm">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-secondary">{c.form?.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {c.form?.description}
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{c.form?.fields?.name?.label}</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={c.form?.fields?.name?.placeholder}
                          required
                          className="h-11 rounded-xl border-2 border-gray-200 focus-visible:border-primary focus-visible:ring-primary/20 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{c.form?.fields?.email?.label}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={c.form?.fields?.email?.placeholder}
                          required
                          className="h-11 rounded-xl border-2 border-gray-200 focus-visible:border-primary focus-visible:ring-primary/20 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{c.form?.fields?.phone?.label}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={c.form?.fields?.phone?.placeholder}
                          className="h-11 rounded-xl border-2 border-gray-200 focus-visible:border-primary focus-visible:ring-primary/20 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{c.form?.fields?.subject?.label}</Label>
                        <div className="relative">
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="flex h-11 w-full rounded-xl border-2 border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors appearance-none"
                          >
                            <option value="" disabled>
                              {c.form?.fields?.subject?.placeholder}
                            </option>
                            {subjects.map((s: string) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{c.form?.fields?.message?.label}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={c.form?.fields?.message?.placeholder}
                        rows={5}
                        required
                        className="rounded-xl border-2 border-gray-200 focus-visible:border-primary focus-visible:ring-primary/20 transition-colors"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="xl"
                      className="w-full font-semibold gap-2 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <Send className="h-4 w-4" />
                      {c.form?.submitButton}
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {/* ─── Right Column — Info ─── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business Hours */}
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary">{c.businessHours?.title}</h3>
                </div>
                <div className="space-y-2">
                  {businessHours.map((item: { day: string; hours: string }) => {
                    const isClosed = item.hours === "Closed"
                    const today = new Date().toLocaleDateString("en-US", { weekday: "long" })
                    const isToday = item.day === today
                    return (
                      <div
                        key={item.day}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                          isToday
                            ? "bg-primary/5 ring-1 ring-primary/20"
                            : isClosed
                              ? "opacity-50"
                              : "hover:bg-gray-50"
                        }`}
                      >
                        <span className={`text-sm font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
                          {item.day}
                          {isToday && (
                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-primary text-white">
                              Today
                            </span>
                          )}
                        </span>
                        <span
                          className={`text-sm ${
                            isClosed
                              ? "text-destructive font-medium"
                              : isToday
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                          }`}
                        >
                          {item.hours}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick Connect */}
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[rgb(220,150,30)] text-white shadow-sm">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary">{c.quickConnect?.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-5">
                  {c.quickConnect?.description}
                </p>
                <Link
                  href="https://wa.me/201060618899"
                  className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-left transition-colors hover:bg-green-100 hover:border-green-300 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white group-hover:bg-green-600 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800">{c.quickConnect?.whatsapp?.label}</p>
                    <p className="text-xs text-green-600">{c.quickConnect?.whatsapp?.number}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-green-500 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="flex h-52 items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 relative group">
                  <div className="text-center relative z-10">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <span className="block text-sm font-semibold text-secondary">{c.map?.location}</span>
                    <span className="block text-xs text-muted-foreground mt-1">{c.map?.city}</span>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(71,32,183,0.03),transparent_70%)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="bg-gradient-to-br from-primary via-[rgb(55,25,150)] to-secondary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {c.cta?.title}
            </h2>
            <p className="mb-8 text-lg text-white/80">
              {c.cta?.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/take-diagnostic">
                <Button
                  variant="accent"
                  size="xl"
                  className="font-semibold shadow-lg shadow-[rgb(245,166,35)]/25 hover:shadow-[rgb(245,166,35)]/40 transition-all duration-300"
                >
                  {c.cta?.buttons?.primary}
                </Button>
              </Link>
              <Link href="/faqs">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-[#1e2761] hover:bg-[#1e2761] hover:text-white"
                >
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