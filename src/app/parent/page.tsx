'use client'

import Link from "next/link"
import { usePageContent } from "@/lib/use-page-content"
import {
  Bell,
  Calendar,
  Clock,
  CreditCard,
  Eye,
  FileText,
  GraduationCap,
  LogOut,
  MessageSquare,
  BookOpen,
  Settings,
  TrendingUp,
  User,
  Users,
  ArrowRight,
  ChevronRight,
  Award,
  Sparkles,
  CheckCircle2,
  LayoutDashboard,
  Star,
  AlertCircle,
  Heart,
  BarChart3,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

const sidebarIconMap: Record<string, React.ElementType> = {
  Dashboard: LayoutDashboard,
  "My Children": Users,
  Schedule: Calendar,
  "Progress Reports": TrendingUp,
  Payments: CreditCard,
  Messages: MessageSquare,
  Settings: Settings,
}

export default function ParentDashboardPage() {
  const c = usePageContent("parent")

  const dashboard = c.dashboard ?? {}
  const sidebar = c.sidebar ?? { logo: "", brand: "", subtitle: "", navigation: [], footer: { whatsapp: "", logout: "" } }
  const topBar = c.topBar ?? {}
  const stats = c.stats ?? []
  const children = c.children ?? []
  const quickActions = c.quickActions ?? { title: "", items: [] }
  const paymentSummary = c.paymentSummary ?? { title: "", subtitle: "", viewAll: "", recent: [], nextPayment: {} }
  const teacherComments = c.teacherComments ?? { title: "", items: [], viewAll: "" }
  const tipCard = c.tipCard ?? { title: "", subtitle: "", description: "", button: "" }
  const overallStats = c.overallStats ?? []

  const quickActionButtonIcons: Record<string, React.ElementType> = {
    Eye: Eye,
    Calendar: Calendar,
    CreditCard: CreditCard,
    MessageSquare: MessageSquare,
    Users: Users,
  }

  return (
    <div className="flex min-h-screen bg-[#f6f6f6]">
      {/* ─── SIDEBAR ─── */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-white border-r border-gray-200">
        {/* Logo */}
        <Link href="/parent" className="flex items-center gap-3 px-6 h-16 border-b border-gray-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(26,35,126)] to-[rgb(13,33,55)] text-white text-sm font-bold">
            {sidebar.logo}
          </div>
          <div>
            <div className="text-sm font-bold leading-tight text-[rgb(26,35,126)]">{sidebar.brand}</div>
            <div className="text-[10px] leading-tight text-gray-500">{sidebar.subtitle}</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {(sidebar.navigation ?? []).map((link: { label: string; href: string; active?: boolean; badge?: string }) => {
            const Icon = sidebarIconMap[link.label] || LayoutDashboard
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  link.active
                    ? "bg-[rgb(26,35,126)]/10 text-[rgb(26,35,126)]"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1">{link.label}</span>
                {link.badge && (
                  <Badge variant="destructive" className="text-[9px] px-1.5 py-0 h-4 min-w-4 flex items-center justify-center">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-100 px-3 py-4 space-y-1">
          <a
            href="https://wa.me/201060618899"
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
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Top Bar ── */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-[rgb(13,33,55)]">
              {dashboard.greeting} <span className="text-[rgb(26,35,126)]">{dashboard.userName}</span>
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">{dashboard.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Help */}
            <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-[rgb(13,33,55)] leading-tight">{topBar.userName}</p>
                <p className="text-[11px] text-gray-500">{topBar.userRole}</p>
              </div>
              <Avatar fallback="SP" size="md" className="ring-2 ring-[rgb(26,35,126)]/20" />
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {/* ═══ Stats Row ═══ */}
          <section>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(stats ?? []).map((stat: { label: string; value: string | number }, idx: number) => {
                const statIcons = [Users, Award, Calendar, MessageSquare]
                const iconColors = [
                  "bg-gradient-to-br from-[rgb(26,35,126)]/10 to-[rgb(13,33,55)]/10 text-[rgb(26,35,126)]",
                  "bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 text-emerald-600",
                  "bg-gradient-to-br from-[rgb(245,166,35)]/10 to-amber-600/10 text-[rgb(245,166,35)]",
                  "bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600",
                ]
                const Icon = statIcons[idx] ?? Users
                return (
                  <Card key={stat.label} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconColors[idx] ?? iconColors[0]}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <p className="mt-3 text-2xl font-bold text-[rgb(13,33,55)]">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* ═══ Main Content: Children + Right Sidebar ═══ */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* Left Area: Children Overview (spans 2 cols) */}
            <div className="xl:col-span-2 space-y-6">
              {(children ?? []).map((child: {
                name: string
                grade: string
                track: string
                initials?: string
                avatar?: string
                scores: { subject: string; score: number; maxScore: number }[]
                upcomingSessions: { date: string; time: string; subject: string; teacher: string; type: string }[]
                attendanceRate: number
                sessionsAttended: number
                totalSessions: number
                teacherComment: string
                teacherRecommendation: string
              }) => (
                <Card key={child.name} className="border border-gray-100 shadow-sm overflow-hidden">
                  <div className="md:flex">
                    {/* Child Header (left panel) */}
                    <div className="md:w-56 bg-gradient-to-br from-[rgb(26,35,126)] to-[rgb(13,33,55)] p-6 text-white flex flex-col items-center md:items-start justify-start">
                      <Avatar src={child.avatar} alt={child.name} fallback={child.initials || child.name.charAt(0)} className="h-16 w-16 ring-4 ring-white/20" />
                      <h3 className="text-lg font-bold mt-3">{child.name}</h3>
                      <p className="text-sm text-white/70">{child.grade}</p>
                      <Badge variant="accent" className="mt-2 text-[10px] px-2 py-0.5">
                        {child.track}
                      </Badge>
                      {/* Attendance */}
                      <div className="mt-4 w-full">
                        <div className="flex items-center gap-2 text-xs text-white/80">
                          <CheckCircle2 className="h-4 w-4 text-[rgb(245,166,35)]" />
                          <span>Attendance: {child.attendanceRate}%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[rgb(245,166,35)] transition-all"
                            style={{ width: `${child.attendanceRate}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-white/50 mt-0.5">{child.sessionsAttended}/{child.totalSessions} sessions</p>
                      </div>
                    </div>

                    {/* Right panel */}
                    <div className="flex-1 p-5">
                      {/* Recent Scores */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-[rgb(13,33,55)] mb-3 flex items-center gap-1.5">
                          <Award className="h-4 w-4 text-[rgb(245,166,35)]" />
                          Recent Scores
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {(child.scores ?? []).map((score: { subject: string; score: number; maxScore: number }) => {
                            const pct = Math.round((score.score / score.maxScore) * 100)
                            return (
                              <div key={score.subject} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                <p className="text-xs text-gray-500">{score.subject}</p>
                                <div className="flex items-baseline gap-1 mt-1">
                                  <span className="text-xl font-bold text-[rgb(13,33,55)]">{score.score}</span>
                                  <span className="text-xs text-gray-400">/{score.maxScore}</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-gray-200 mt-2 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${
                                      pct >= 90
                                        ? "bg-emerald-500"
                                        : pct >= 75
                                        ? "bg-[rgb(26,35,126)]"
                                        : pct >= 60
                                        ? "bg-[rgb(245,166,35)]"
                                        : "bg-red-400"
                                    }`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Upcoming Sessions */}
                      <div>
                        <h4 className="text-sm font-semibold text-[rgb(13,33,55)] mb-3 flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-[rgb(26,35,126)]" />
                          Upcoming Sessions
                        </h4>
                        <div className="space-y-2">
                          {(child.upcomingSessions ?? []).map((session: { date: string; time: string; subject: string; teacher: string; type: string }, i: number) => (
                            <div
                              key={i}
                              className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex flex-col items-center w-16 shrink-0">
                                <span className="text-[10px] font-semibold text-[rgb(26,35,126)] uppercase leading-tight">
                                  {session.date.split(",")[0]}
                                </span>
                                <span className="text-[9px] text-gray-500">{session.time}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[rgb(13,33,55)] truncate">{session.subject}</p>
                                <p className="text-xs text-gray-500">{session.teacher}</p>
                              </div>
                              <Badge
                                variant={session.type === "Online" ? "default" : "secondary"}
                                className="text-[10px] px-2 py-0.5 shrink-0"
                              >
                                {session.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Teacher Comment & Recommendation */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-lg bg-[rgb(26,35,126)]/[0.04] border border-[rgb(26,35,126)]/10 p-3">
                          <div className="flex items-center gap-2 mb-1.5">
                            <MessageSquare className="h-3.5 w-3.5 text-[rgb(26,35,126)]" />
                            <span className="text-[11px] font-semibold text-[rgb(13,33,55)]">Teacher Comment</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{child.teacherComment}</p>
                        </div>
                        <div className="rounded-lg bg-amber-50 border border-amber-100 p-3">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Star className="h-3.5 w-3.5 text-[rgb(245,166,35)]" />
                            <span className="text-[11px] font-semibold text-[rgb(13,33,55)]">Recommendation</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{child.teacherRecommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Right Column: Quick Actions + Payments + Info */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-[rgb(13,33,55)] flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[rgb(26,35,126)]" />
                    {quickActions.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(quickActions.items ?? []).map((action: { label: string; icon: string }) => {
                    const Icon = quickActionButtonIcons[action.icon] || Eye
                    const hrefMap: Record<string, string> = {
                      "View Progress Reports": "/parent/reports",
                      "View Schedule": "/parent/schedule",
                      "Make a Payment": "/parent/payments",
                      "Message Teacher": "/parent/messages",
                      "All Children": "/parent/children",
                    }
                    const variantMap: Record<string, "default" | "secondary" | "accent" | "outline" | "ghost"> = {
                      "View Progress Reports": "default",
                      "View Schedule": "secondary",
                      "Make a Payment": "accent",
                      "Message Teacher": "outline",
                      "All Children": "ghost",
                    }
                    return (
                      <Link key={action.label} href={hrefMap[action.label] || "/parent"}>
                        <Button variant={variantMap[action.label] || "default"} size="sm" className="w-full justify-start text-xs">
                          <Icon className="h-3.5 w-3.5 mr-2" />
                          {action.label}
                        </Button>
                      </Link>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold text-[rgb(13,33,55)]">{paymentSummary.title}</CardTitle>
                    <CardDescription className="text-[11px]">{paymentSummary.subtitle}</CardDescription>
                  </div>
                  <Link href="/parent/payments">
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                      {paymentSummary.viewAll}
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-0">
                    {(paymentSummary.recent ?? []).map((payment: { date: string; description: string; amount: number; status: string }, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                            <CreditCard className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[rgb(13,33,55)] truncate max-w-[140px]">{payment.description}</p>
                            <p className="text-[10px] text-gray-400">{payment.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[rgb(13,33,55)]">${payment.amount}</span>
                          <Badge variant="success" className="text-[9px] px-1.5 py-0 h-4">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Next Payment Due */}
                  {paymentSummary.nextPayment?.amount && (
                    <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[rgb(13,33,55)]">Next Payment</p>
                          <p className="text-[10px] text-gray-500">Due {paymentSummary.nextPayment.dueDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[rgb(13,33,55)]">${paymentSummary.nextPayment.amount}</p>
                        <Link href="/parent/payments">
                          <Button variant="accent" size="sm" className="text-[10px] h-6 px-2 mt-0.5">
                            {paymentSummary.nextPayment.button || "Pay Now"}
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Teacher Comments Feed */}
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-[rgb(13,33,55)] flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[rgb(26,35,126)]" />
                    {teacherComments.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {(teacherComments.items ?? []).map((item: { child: string; teacher: string; comment: string; date: string; avatar: string }, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <Avatar fallback={item.avatar} size="sm" className="ring-1 ring-gray-200 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[rgb(13,33,55)]">{item.teacher}</span>
                            <span className="text-[10px] text-gray-400">{item.date}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                            <span className="font-medium text-[rgb(26,35,126)]">@{item.child}</span> — {item.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/parent/messages" className="mt-3 block">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      {teacherComments.viewAll}
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Tip Card */}
              <Card className="border-0 bg-gradient-to-br from-[rgb(26,35,126)] to-[rgb(13,33,55)] shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <Sparkles className="h-5 w-5 text-[rgb(245,166,35)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{tipCard.title}</h3>
                      <p className="text-xs text-white/60">{tipCard.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed mt-3">
                    {tipCard.description}
                  </p>
                  <Button variant="accent" size="sm" className="mt-4 w-full text-xs">
                    <Bell className="h-3.5 w-3.5 mr-2" />
                    {tipCard.button}
                  </Button>
                </CardContent>
              </Card>

              {/* WhatsApp Support */}
              <a
                href="https://wa.me/201060618899"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[rgb(13,33,55)]">WhatsApp Support</h4>
                  <p className="text-xs text-gray-500">Chat with our support team</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </section>

          {/* ═══ Overall Stats Bar ═══ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(overallStats ?? []).map((stat: { label: string; value: string | number }, idx: number) => {
              const overallIcons = [Users, BarChart3, CheckCircle2, CreditCard]
              const iconColors = [
                "bg-[rgb(26,35,126)]/10 text-[rgb(26,35,126)]",
                "bg-[rgb(13,33,55)]/10 text-[rgb(13,33,55)]",
                "bg-emerald-500/10 text-emerald-600",
                "bg-[rgb(245,166,35)]/10 text-[rgb(245,166,35)]",
              ]
              const Icon = overallIcons[idx] ?? Users
              return (
                <Card key={stat.label} className="border border-gray-100 shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconColors[idx] ?? iconColors[0]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="text-lg font-bold text-[rgb(13,33,55)]">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Spacer */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  )
}