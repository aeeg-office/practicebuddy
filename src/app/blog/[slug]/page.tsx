'use client'

import { use } from "react"
import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react"

interface Post {
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  readTime: string
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

const badgeColors: Record<string, "default" | "success" | "accent"> = {
  "SAT News": "default",
  "ACT News": "success",
  "IELTS News": "accent",
  "Education News": "success",
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const c = usePageContent("blog")
  const allPosts: Post[] = [c.featuredPost, ...(c.posts ?? [])]

  const post = allPosts.find((p) => slugify(p.title) === slug)

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
          <BookOpen className="h-10 w-10 text-muted-foreground/40" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Article Not Found
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Sorry, we couldn&apos;t find the article you&apos;re looking for. It
          may have been moved or no longer exists.
        </p>
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* ─── Article Header ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[rgb(55,25,150)] to-secondary py-16 text-white lg:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <Badge
              variant={badgeColors[post.category] || "default"}
              className="mb-4"
            >
              {post.category}
            </Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span>By {post.author}</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Article Content ─── */}
      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <article className="mx-auto max-w-3xl">
            <div className="prose prose-gray max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t pt-8">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground">
                By {post.author} &middot; {post.date}
              </span>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}