'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AuthGuard } from "@/components/auth/auth-guard"
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  Bookmark,
  HelpCircle,
  TrendingUp,
  ChevronRight,
  Home,
  Zap,
  LogOut,
} from "lucide-react"

const sidebarLinks = [
  { label: "Practice Home", href: "/practice", icon: LayoutDashboard },
  { label: "My Skills", href: "/practice/my-skills", icon: BookOpen },
  { label: "Recent Sessions", href: "/practice/recent", icon: Clock },
  { label: "Bookmarks", href: "/practice/bookmarks", icon: Bookmark },
  { label: "Missed Questions", href: "/practice/missed", icon: HelpCircle },
  { label: "Stats", href: "/practice/stats", icon: TrendingUp },
]

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Build breadcrumbs from pathname
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: { label: string; href: string }[] = []
  let accumulated = ""
  for (const seg of segments) {
    accumulated += `/${seg}`
    const label = seg === "practice" ? "Practice" : seg.charAt(0).toUpperCase() + seg.slice(1)
    breadcrumbs.push({ label, href: accumulated })
  }

  // Simple progress indicator (mock)
  const totalSkills = 89
  const masteredSkills = 23
  const progressPct = Math.round((masteredSkills / totalSkills) * 100)

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-background">
      {/* ─── SIDEBAR ─── */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-card border-r border-border">
        {/* Logo area */}
        <Link href="/practice" className="flex items-center gap-2.5 px-6 h-16 border-b border-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5a623] text-white text-sm font-bold shadow-sm">
            P
          </div>
          <div>
            <div className="text-sm font-bold leading-tight text-[#4720b7]">Practice</div>
            <div className="text-[10px] leading-tight text-muted-foreground">Skill Platform</div>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === "/practice"
                ? pathname === "/practice"
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#4720b7]/10 text-[#4720b7] shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <link.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-[#4720b7]" : ""}`} />
                {link.label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4720b7]" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section — Progress + Support */}
        <div className="px-3 pb-4 space-y-3 border-t border-border pt-4">
          {/* Progress mini-card */}
          <div className="px-3 py-3 rounded-lg bg-gradient-to-r from-[#4720b7]/5 to-[#1e2761]/5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-foreground">Mastery Progress</span>
              <span className="font-bold text-[#4720b7]">{masteredSkills}/{totalSkills}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4720b7] to-[#f5a623]"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">{progressPct}% complete</p>
          </div>

          {/* WhatsApp support link */}
          <a
            href="https://wa.me/201060618899"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.713.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp Support</span>
          </a>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all duration-200"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Sticky Top Bar with Breadcrumbs ── */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle placeholder */}
            <button
              onClick={() => {}} className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Zap className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-[#4720b7] transition-colors">
                <Home className="h-4 w-4" />
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                  {i === breadcrumbs.length - 1 ? (
                    <span className="font-semibold text-foreground">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-[#4720b7] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Right side — progress indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-24 h-2 rounded-full bg-muted/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4720b7] to-[#f5a623]"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{progressPct}%</span>
            </div>
            <a
              href="https://wa.me/201060618899"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden p-2 rounded-full text-emerald-500 hover:bg-emerald-50 transition-colors"
              title="WhatsApp Support"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.713.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
    </AuthGuard>
  )
}