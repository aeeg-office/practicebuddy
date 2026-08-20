'use client'

import Link from "next/link"
import { useState } from "react"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  Search,
  BookOpen,
  TrendingUp,
  Sparkles,
} from "lucide-react"

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function BlogPage() {
  const c = usePageContent("blog")
  const [activeCategory, setActiveCategory] = useState("All Posts")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const categories = c.categories ?? []
  const featuredPost = c.featuredPost ?? { title: "", excerpt: "", author: "", date: "", category: "", readTime: "" }
  const posts = c.posts ?? []
  const noResults = c.noResults ?? { title: "", description: "", button: "" }
  const pagination = c.pagination ?? { previous: "", next: "", pages: [] }
  const cta = c.cta ?? { title: "", description: "", emailPlaceholder: "", button: "" }

  const filteredPosts =
    activeCategory === "All Posts" ? posts : posts.filter((p: { category: string }) => p.category === activeCategory)

  const badgeColors: Record<string, "default" | "success" | "accent"> = {
    "SAT News": "default",
    "ACT News": "success",
    "IELTS News": "accent",
    "Education News": "success",
  }

  const borderColors: Record<string, string> = {
    "SAT News": "border-blue-500",
    "ACT News": "border-green-500",
    "IELTS News": "border-orange-500",
    "Education News": "border-teal-500",
  }

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
              <BookOpen className="h-4 w-4" />
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

      {/* ─── Featured Post ─── */}
      <section className="relative -mt-8 z-10 pb-8">
        <div className="container">
          <div className="group relative mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="grid md:grid-cols-5">
              <div className="hidden md:col-span-2 md:flex md:items-center md:justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 p-8">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <p className="text-sm font-semibold text-primary">Featured</p>
                  <p className="text-xs text-muted-foreground mt-1">Top Story</p>
                </div>
              </div>
              <div className="md:col-span-3 p-6 md:p-8">
                <Badge variant="default" className="mb-3">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-xl font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
                  {featuredPost.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredPost.readTime}
                  </span>
                  <span className="text-muted-foreground/60">By {featuredPost.author}</span>
                </div>
                <div className="mt-4">
                  <Link href={`/blog/${slugify(featuredPost.title)}`}>
                    <Button variant="outline" size="sm" className="gap-2 group/btn">
                      Read Article
                      <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <Link href={`/blog/${slugify(featuredPost.title)}`} className="absolute inset-0" aria-label={`Read ${featuredPost.title}`} />
          </div>
        </div>
      </section>

      {/* ─── Category Filters ─── */}
      <section className="border-b bg-white sticky top-0 z-20 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category: string) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-md shadow-primary/25 scale-105"
                    : "bg-gray-100 text-muted-foreground hover:bg-gray-200 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Blog Posts Grid ─── */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                <Search className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">{noResults.title}</h3>
              <p className="text-muted-foreground">
                {noResults.description}
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setActiveCategory("All Posts")}
              >
                {noResults.button}
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post: { title: string; excerpt: string; author: string; date: string; category: string; readTime: string }, index: number) => (
                <article
                  key={index}
                  className={`group relative rounded-xl border-l-4 ${borderColors[post.category] || "border-gray-300"} overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant={badgeColors[post.category] || "default"} className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-200 min-h-[3.5rem]">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4 mt-auto">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="text-muted-foreground/60">By {post.author}</span>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Link
                    href={`/blog/${slugify(post.title)}`}
                    className="absolute inset-0"
                    aria-label={`Read ${post.title}`}
                  />
                </article>
              ))}
            </div>
          )}

          {/* ─── Pagination ─── */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" disabled>
              <ArrowLeft className="h-4 w-4" />
              {pagination.previous}
            </Button>
            {pagination.pages.map((page: number) => (
              <Button key={page} variant="default" size="sm" className="min-w-[2.5rem] h-10">
                {page}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="gap-1">
              {pagination.next}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="bg-gradient-to-br from-primary via-[rgb(55,25,150)] to-secondary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg text-white/80">
              {cta.description}
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (loading || !email.trim()) return
                setLoading(true)
                setStatus("idle")
                try {
                  const res = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email.trim() }),
                  })
                  if (!res.ok) throw new Error("Failed")
                  setStatus("success")
                  setEmail("")
                } catch {
                  setStatus("error")
                } finally {
                  setLoading(false)
                }
              }}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={cta.emailPlaceholder}
                className="flex h-12 w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                disabled={loading}
              />
              <Button
                type="submit"
                variant="accent"
                size="xl"
                className="shrink-0 font-semibold shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  cta.button
                )}
              </Button>
            </form>
            {status === "success" && (
              <p className="mt-4 text-sm text-emerald-300 text-center">
                Thanks for subscribing! Check your inbox.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-300 text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}