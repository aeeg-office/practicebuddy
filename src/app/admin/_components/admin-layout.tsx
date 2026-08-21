'use client'

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  MessageCircle,
  HelpCircle,
  Shield,
  Database,
  Zap,
  BookMarked,
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { useAdminRole } from "@/lib/admin-role-context"
import { canAccessRoute } from "@/lib/rbac"

/* ───────── Design Tokens ───────── */
export const colors = {
  primary: "rgb(13,79,79)",
  secondary: "rgb(26,58,74)",
  accent: "rgb(232,184,75)",
  bg: "#f6f6f6",
  card: "#ffffff",
  foreground: "#281a39",
  muted: "#c5c5c5",
  mutedForeground: "#626262",
  border: "#e5e7eb",
}

/* ───────── Sidebar Link Definitions ───────── */
export interface SidebarLink {
  label: string
  href: string
  icon: React.ElementType
  active: boolean
  /** Minimum role required to see this link. Defaults to "school_admin". */
  minRole: "student" | "teacher" | "school_admin" | "admin"
}

export function getSidebarLinks(activeLabel: string, userRole: string = "admin"): SidebarLink[] {
  const links: SidebarLink[] = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard, active: activeLabel === "Overview", minRole: "teacher" },
    { label: "Students", href: "/admin/students", icon: Users, active: activeLabel === "Students", minRole: "school_admin" },
    { label: "Teachers", href: "/admin/teachers", icon: GraduationCap, active: activeLabel === "Teachers", minRole: "school_admin" },
    { label: "Courses", href: "/admin/courses", icon: BookOpen, active: activeLabel === "Courses", minRole: "teacher" },
    { label: "Payments", href: "/admin/payments", icon: CreditCard, active: activeLabel === "Payments", minRole: "admin" },
    { label: "Exams", href: "/admin/exams", icon: FileText, active: activeLabel === "Exams", minRole: "teacher" },
    { label: "Questions", href: "/admin/questions", icon: HelpCircle, active: activeLabel === "Questions", minRole: "teacher" },
    { label: "Review Queue", href: "/admin/review-queue", icon: FileText, active: activeLabel === "Review Queue", minRole: "school_admin" },
    { label: "AI Factory", href: "/admin/ai-factory", icon: Zap, active: activeLabel === "AI Factory", minRole: "teacher" },
    { label: "Curriculum", href: "/admin/curriculum", icon: BookMarked, active: activeLabel === "Curriculum", minRole: "school_admin" },
    { label: "Database", href: "/admin/database", icon: Database, active: activeLabel === "Database", minRole: "admin" },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3, active: activeLabel === "Analytics", minRole: "school_admin" },
    { label: "Users & Roles", href: "/admin/users", icon: Shield, active: activeLabel === "Users & Roles", minRole: "admin" },
    { label: "Organizations", href: "/admin/organizations", icon: Settings, active: activeLabel === "Organizations", minRole: "admin" },
    { label: "Audit Log", href: "/admin/audit-log", icon: FileText, active: activeLabel === "Audit Log", minRole: "admin" },
    { label: "Settings", href: "/admin/settings", icon: Settings, active: activeLabel === "Settings", minRole: "school_admin" },
  ]
  return links.filter((link) => canAccessRoute(userRole, link.minRole))
}

/* ───────── Notification Bell ───────── */
function NotificationBell() {
  return (
    <button className="relative p-2 rounded-full hover:bg-muted/50 transition-colors group">
      <Bell className="h-5 w-5" style={{ color: colors.mutedForeground }} />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
    </button>
  )
}

/* ───────── Admin Layout ───────── */
export function AdminLayout({
  children,
  activeSidebar,
  pageTitle,
  pageDescription,
  headerRight,
}: {
  children: React.ReactNode
  activeSidebar: string
  pageTitle: string
  pageDescription?: string
  headerRight?: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const userRole = useAdminRole()
  const sidebarLinks = getSidebarLinks(activeSidebar, userRole)

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* ───── SIDEBAR ───── */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } hidden lg:flex lg:flex-col shrink-0 bg-white border-r transition-all duration-200`}
        style={{ borderColor: colors.border }}
      >
        {/* Logo */}
                <Link
                  href="/admin"
                  className={`flex items-center gap-2 h-16 border-b transition-all ${
                    sidebarOpen ? "px-6" : "px-4 justify-center"
                  }`}
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    L
                  </div>
                  {sidebarOpen && (
                    <div className="min-w-0">
                      <div className="text-sm font-bold leading-tight truncate" style={{ color: colors.primary }}>
                        Lumaani
                      </div>
                      <div className="text-[10px] leading-tight text-muted-foreground truncate">Admin Panel</div>
                    </div>
                  )}
                </Link>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                link.active
                  ? "text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              } ${!sidebarOpen && "justify-center px-2"}`}
              style={
                link.active
                  ? { backgroundColor: colors.primary }
                  : undefined
              }
              title={!sidebarOpen ? link.label : undefined}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span className="truncate">{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Back to Site */}
        <div className="px-3 pb-4 space-y-2 border-t pt-4" style={{ borderColor: colors.border }}>
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors ${
              !sidebarOpen && "justify-center px-2"
            }`}
            title={!sidebarOpen ? "Back to Site" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span className="truncate">Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* ───── MAIN CONTENT ───── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Top Bar ── */}
        <header
          className="sticky top-0 z-30 bg-white border-b px-4 md:px-8 h-16 flex items-center justify-between"
          style={{ borderColor: colors.border }}
        >
          <div className="flex items-center gap-4">
            {/* Mobile sidebar toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-muted-foreground rounded" />
                <div className="w-5 h-0.5 bg-muted-foreground rounded" />
                <div className="w-5 h-0.5 bg-muted-foreground rounded" />
              </div>
            </button>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: colors.mutedForeground }} />
              <input
                type="text"
                placeholder="Search students, courses..."
                className="h-9 w-48 md:w-72 rounded-lg border pl-9 pr-3 text-sm outline-none transition-all bg-muted/30"
                style={{ borderColor: colors.border }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.border
                  e.currentTarget.style.boxShadow = "none"
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: colors.border }}>
              <Avatar src="" alt="Admin" fallback="AD" className="h-8 w-8" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold" style={{ color: colors.secondary }}>
                  Admin
                </p>
                <p className="text-[10px] text-muted-foreground">Super Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div className="flex-1 p-4 md:p-8 space-y-6 overflow-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-xl md:text-2xl font-bold" style={{ color: colors.secondary }}>
                {pageTitle}
              </h1>
              {pageDescription && (
                <p className="text-sm text-muted-foreground mt-0.5">{pageDescription}</p>
              )}
            </div>
            {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}