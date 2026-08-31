'use client'

import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import {
  Bell,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  GraduationCap,
  ChevronLeft,
  BarChart3,
  Clock,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Plus,
  Search,
  HelpCircle,
  LogOut,
  User,
  ArrowRight,
  Award,
  Settings,
} from "lucide-react"
import { useState } from "react"

// ───────── Sub-components ─────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: "default" | "success" | "destructive" }> = {
    completed: { label: "Completed", variant: "success" },
    upcoming: { label: "Upcoming", variant: "default" },
    cancelled: { label: "Cancelled", variant: "destructive" },
  }
  const { label, variant } = map[status] || map.upcoming
  return <Badge variant={variant}>{label}</Badge>
}

function ProgressBar({ value }: { value: number }) {
  const barColor =
    value >= 80
      ? "bg-emerald-500"
      : value >= 50
        ? "bg-[rgb(200,120,90)]"
        : "bg-[rgb(11,79,74)]"
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-500 w-8 text-right tabular-nums">
        {value}%
      </span>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp,
}: {
  label: string
  value: string
  icon: React.ElementType
  trend?: string
  trendUp?: boolean
}) {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(11,79,74)]/10 to-[rgb(22,32,34)]/10 text-[rgb(11,79,74)]">
            <Icon className="h-6 w-6" />
          </div>
          {trend && (
            <span className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
              <TrendingUp className={`h-3.5 w-3.5 ${!trendUp && "rotate-180"}`} />
              {trend}
            </span>
          )}
        </div>
        <p className="mt-3 text-2xl font-bold text-[rgb(22,32,34)]">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </CardContent>
    </Card>
  )
}

function QuickActionButton({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ElementType
  label: string
  color: string
}) {
  return (
    <button
      className={`flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md ${color}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(11,79,74)]/10 to-[rgb(22,32,34)]/10 text-[rgb(11,79,74)]">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-medium text-[rgb(22,32,34)] text-center leading-tight">
        {label}
      </span>
    </button>
  )
}

// ───────── Page Component ─────────

export default function TeacherDashboardPage() {
  const c = usePageContent("teacher")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const dashboard = c.dashboard ?? {}
  const sidebar = c.sidebar ?? { logo: "", brand: "", subtitle: "", navigation: [], footer: { whatsapp: "", logout: "" } }
  const topBar = c.topBar ?? {}
  const stats = c.stats ?? []
  const todaySchedule = c.todaySchedule ?? { title: "", date: "", viewAll: "", items: [] }
  const quickActions = c.quickActions ?? { title: "", items: [] }
  const monthlyStats = c.monthlyStats ?? {}
  const myStudents = c.myStudents ?? { title: "", subtitle: "", viewAll: "", columns: [], items: [] }
  const recentActivity = c.recentActivity ?? { title: "", items: [] }
  const aiTools = c.aiTools ?? { title: "", subtitle: "", buttons: [] }
  const generateReports = c.generateReports ?? { title: "", description: "", button: "" }

  const quickActionIcons = [Plus, FileText, CheckCircle2, MessageSquare]

  return (
    <div className="flex min-h-screen bg-[#f6f6f6]">
      {/* ─────── Sidebar ─────── */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } hidden border-r border-gray-200 bg-white transition-all duration-300 md:flex md:flex-col z-30`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
          {sidebarOpen && (
            <Link href="/teacher" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(11,79,74)] to-[rgb(22,32,34)] text-white text-sm font-bold">
                {sidebar.logo}
              </div>
              <div>
                <div className="text-sm font-bold leading-tight text-[rgb(11,79,74)]">{sidebar.brand}</div>
                <div className="text-[10px] leading-tight text-gray-500">{sidebar.subtitle}</div>
              </div>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {(sidebar.navigation ?? []).map((item: { label: string; href: string; active?: boolean; badge?: string }) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[rgb(11,79,74)]/10 text-[rgb(11,79,74)]"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {item.label === "Overview" && <LayoutDashboard className="h-5 w-5 shrink-0" />}
              {item.label === "My Schedule" && <Calendar className="h-5 w-5 shrink-0" />}
              {item.label === "My Students" && <Users className="h-5 w-5 shrink-0" />}
              {item.label === "AI Tools" && <Sparkles className="h-5 w-5 shrink-0" />}
              {item.label === "Resources" && <FileText className="h-5 w-5 shrink-0" />}
              {item.label === "Reports" && <BarChart3 className="h-5 w-5 shrink-0" />}
              {item.label === "Messages" && <MessageSquare className="h-5 w-5 shrink-0" />}
              {sidebarOpen && (
                <span className="flex-1">{item.label}</span>
              )}
              {sidebarOpen && item.badge && (
                <Badge
                  variant={item.badge === "New" ? "accent" : "destructive"}
                  className="text-[9px] px-1.5 py-0 h-4 min-w-4 flex items-center justify-center"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-100 p-3 space-y-1">
          {sidebarOpen && (
            <>
              <a
                href="mailto:hello@lumaani.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>{sidebar.footer?.whatsapp}</span>
              </a>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>{sidebar.footer?.logout}</span>
              </Link>
            </>
          )}
          {!sidebarOpen && (
            <>
              <a
                href="mailto:hello@lumaani.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-lg p-2.5 text-emerald-600 hover:bg-emerald-50 transition-colors"
                title="WhatsApp Support"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <Link
                href="/"
                className="flex items-center justify-center rounded-lg p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Log Out"
              >
                <LogOut className="h-5 w-5" />
              </Link>
            </>
          )}
        </div>
      </aside>

      {/* ─────── Main Content ─────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Top Bar ── */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors md:hidden"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-[rgb(22,32,34)] hidden sm:block">
                {dashboard.greeting} <span className="text-[rgb(11,79,74)]">{dashboard.instructorName}</span>
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">{dashboard.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="hidden md:flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-400 hover:border-gray-300 transition-colors">
              <Search className="h-3.5 w-3.5" />
              <span>{topBar.searchPlaceholder}</span>
              <kbd className="ml-4 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">⌘K</kbd>
            </button>

            {/* Help */}
            <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* Settings */}
            <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>

            {/* Notification bell */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                5
              </span>
            </button>

            {/* Avatar + name */}
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-[rgb(22,32,34)] leading-tight">{topBar.instructorName}</p>
                <p className="text-[11px] text-gray-500">{topBar.instructorRole}</p>
              </div>
              <Avatar fallback="AK" size="md" className="ring-2 ring-[rgb(11,79,74)]/20" />
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {/* ═══ Stats Row ═══ */}
          <section>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(stats ?? []).map((stat: { label: string; value: string; trend?: string; trendUp?: boolean }, idx: number) => {
                const statIcons = [Users, Calendar, Clock, Sparkles]
                return (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    icon={statIcons[idx] ?? Users}
                    trend={stat.trend}
                    trendUp={stat.trendUp}
                  />
                )
              })}
            </div>
          </section>

          {/* ═══ Schedule + Quick Actions ═══ */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* Today's Schedule */}
            <Card className="border border-gray-100 shadow-sm xl:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <CardTitle className="text-base font-semibold text-[rgb(22,32,34)] flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[rgb(11,79,74)]" />
                    {todaySchedule.title}
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-0.5">{todaySchedule.date}</p>
                </div>
                <Link href="/teacher/schedule">
                  <Button variant="outline" size="sm">
                    {todaySchedule.viewAll}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {(todaySchedule.items ?? []).map((item: { time: string; student: string; course: string; room: string; status: string }, i: number) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {/* Time indicator */}
                        <div className="min-w-[110px] flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full shrink-0 ${
                            item.status === "completed" ? "bg-emerald-500" :
                            item.status === "upcoming" ? "bg-[rgb(11,79,74)]" :
                            "bg-red-400"
                          }`} />
                          <p className="text-sm font-medium text-[rgb(22,32,34)]">
                            {item.time}
                          </p>
                        </div>
                        {/* Details */}
                        <div>
                          <p className="text-sm font-semibold text-[rgb(22,32,34)]">
                            {item.student}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.course}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pl-[130px] sm:pl-0">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <GraduationCap className="h-3 w-3" />
                          {item.room}
                        </span>
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions + Stats */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="border-b border-gray-100 pb-3">
                  <CardTitle className="text-sm font-semibold text-[rgb(22,32,34)] flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[rgb(11,79,74)]" />
                    {quickActions.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-2.5">
                    {(quickActions.items ?? []).map((action: { label: string; color: string }, idx: number) => (
                      <QuickActionButton
                        key={action.label}
                        icon={quickActionIcons[idx] ?? Plus}
                        label={action.label}
                        color={action.color}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Stats Card */}
              <Card className="border-0 bg-gradient-to-br from-[rgb(11,79,74)] to-[rgb(22,32,34)] text-white shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/70">{monthlyStats.label}</p>
                      <p className="text-2xl font-bold">{monthlyStats.value}</p>
                      <p className="text-xs text-white/50">{monthlyStats.sublabel}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-white/80">
                    <TrendingUp className="h-3.5 w-3.5 text-[rgb(200,120,90)]" />
                    <span>{monthlyStats.trend}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ═══ My Students + Recent Activity ═══ */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* Students Table */}
            <div className="xl:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-[rgb(22,32,34)] flex items-center gap-2">
                    <Users className="h-4 w-4 text-[rgb(11,79,74)]" />
                    {myStudents.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">{myStudents.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/teacher/students">
                    <Button variant="outline" size="sm">
                      {myStudents.viewAll}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <Card className="border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/80">
                        {(myStudents.columns ?? []).map((col: string) => (
                          <th key={col} className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(myStudents.items ?? []).map((student: { name: string; course: string; lastScore: string; nextSession: string; progress: number }, i: number) => (
                        <tr
                          key={i}
                          className="transition-colors hover:bg-[rgb(11,79,74)]/[0.02]"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar fallback={student.name} size="sm" className="ring-1 ring-gray-200" />
                              <span className="font-medium text-[rgb(22,32,34)]">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gray-600">
                            {student.course}
                          </td>
                          <td className="px-5 py-4">
                            <Badge
                              variant={
                                parseInt(student.lastScore) >= 700 ||
                                parseFloat(student.lastScore) >= 7.0
                                  ? "success"
                                  : parseInt(student.lastScore) >= 600 ||
                                      parseFloat(student.lastScore) >= 6.0
                                    ? "accent"
                                    : "secondary"
                              }
                              className="text-[11px]"
                            >
                              {student.lastScore}
                            </Badge>
                          </td>
                          <td className="px-5 py-4 text-gray-500 text-xs">
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3 text-gray-400" />
                              {student.nextSession}
                            </span>
                          </td>
                          <td className="px-5 py-4 min-w-[140px]">
                            <ProgressBar value={student.progress} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-[rgb(22,32,34)] flex items-center gap-2">
                  <Bell className="h-4 w-4 text-[rgb(11,79,74)]" />
                  {recentActivity.title}
                </h2>
              </div>

              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {(recentActivity.items ?? []).map((item: { text: string; time: string }, i: number) => {
                      const activityColors = [
                        "text-emerald-600 bg-emerald-100",
                        "text-[rgb(11,79,74)] bg-[rgb(11,79,74)]/10",
                        "text-[rgb(200,120,90)] bg-[rgb(200,120,90)]/10",
                        "text-emerald-600 bg-emerald-100",
                        "text-[rgb(22,32,34)] bg-[rgb(22,32,34)]/10",
                      ]
                      const activityIcons = [CheckCircle2, FileText, MessageSquare, Award, Users]
                      const Icon = activityIcons[i] ?? CheckCircle2
                      return (
                        <div key={i} className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activityColors[i] ?? activityColors[0]}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[rgb(22,32,34)] leading-snug">{item.text}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* AI Tools Card */}
              <Card className="mt-4 border border-gray-100 shadow-sm bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(200,120,90)] to-[rgb(200,120,90)] text-white">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[rgb(22,32,34)]">{aiTools.title}</h3>
                      <p className="text-xs text-gray-500">{aiTools.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(aiTools.buttons ?? []).map((btn: string, i: number) => (
                      <Button key={btn} size="sm" variant={i === 0 ? "accent" : "outline"} className="text-xs">
                        {i === 0 && <Sparkles className="h-3 w-3 mr-1" />}
                        {i === 1 && <FileText className="h-3 w-3 mr-1" />}
                        {btn}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ═══ Generate Reports CTA ═══ */}
          <section className="flex flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(11,79,74)]/10 to-[rgb(22,32,34)]/10 text-[rgb(11,79,74)]">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[rgb(22,32,34)]">
                  {generateReports.title}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {generateReports.description}
                </p>
              </div>
            </div>
            <Button className="shrink-0 gap-2 bg-[rgb(200,120,90)] text-white hover:bg-[rgb(200,120,90)] shadow-sm">
              <FileText className="h-4 w-4" />
              {generateReports.button}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </section>

          {/* Spacer for bottom padding */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  )
}