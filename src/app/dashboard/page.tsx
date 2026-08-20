'use client'

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useDashboard } from "@/lib/use-dashboard"
import {
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  CreditCard,
  Settings,
  TrendingUp,
  User,
  ArrowRight,
  ChevronRight,
  Award,
  Sparkles,
  Target,
  BookMarked,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

/* ───────── Sidebar Navigation ───────── */
const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
  { label: "My Schedule", href: "/dashboard/schedule", icon: Calendar },
  { label: "My Progress", href: "/dashboard/progress", icon: TrendingUp },
  { label: "Exams & Results", href: "/dashboard/exams", icon: FileText },
  { label: "Resources", href: "/dashboard/resources", icon: BookMarked },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

/* ───────── Mock Data ───────── */
const upcomingSessions = [
  { time: "Mon, 10:00 AM", course: "SAT Math Intensive", teacher: "Dr. Ahmed Khalil", type: "Online" },
  { time: "Tue, 2:00 PM", course: "ACT English Prep", teacher: "Ms. Sara Mansour", type: "In-Center" },
  { time: "Wed, 11:00 AM", course: "IELTS Speaking Practice", teacher: "Mr. James Wilson", type: "Online" },
  { time: "Thu, 4:00 PM", course: "TOEFL Writing Workshop", teacher: "Ms. Nour El-Din", type: "In-Center" },
  { time: "Sat, 9:00 AM", course: "SAT Full-Length Mock", teacher: "Dr. Ahmed Khalil", type: "In-Center" },
]

const domainMastery = [
  { label: "Words in Context", score: 74, color: "bg-primary" },
  { label: "Inference", score: 58, color: "bg-[#f5a623]" },
  { label: "Grammar & Usage", score: 82, color: "bg-secondary" },
  { label: "Expression of Ideas", score: 69, color: "bg-emerald-500" },
  { label: "Standard English Conventions", score: 77, color: "bg-violet-500" },
]

const quickActions = [
  { label: "Take a Diagnostic", href: "/take-diagnostic", icon: Sparkles, variant: "accent" as const },
  { label: "Start Practice", href: "/dashboard/practice", icon: BookOpen, variant: "default" as const },
  { label: "View Schedule", href: "/dashboard/schedule", icon: Calendar, variant: "outline" as const },
  { label: "Contact Support", href: "https://wa.me/201060618899", icon: MessageSquare, variant: "outline" as const, external: true },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { data: dashData, loading: dashLoading } = useDashboard()
  const displayName = user?.name || dashData?.user?.name || "Student"

  return (
    <div className="flex min-h-screen bg-background">
      {/* ─── SIDEBAR ─── */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-card border-r border-border">
        {/* Logo area */}
        <Link href="/" className="flex items-center gap-2.5 px-6 h-16 border-b border-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-sm">
            A
          </div>
          <div>
            <div className="text-sm font-bold leading-tight text-primary">AEEG</div>
            <div className="text-[10px] leading-tight text-muted-foreground">Student Portal</div>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                link.active
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <link.icon className={`h-5 w-5 shrink-0 ${link.active ? "text-primary" : ""}`} />
              {link.label}
              {link.active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar footer — WhatsApp + Logout */}
        <div className="px-3 pb-4 space-y-1 border-t border-border pt-4">
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
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all duration-200"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Log Out
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Sticky Top Bar ── */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle could go here */}
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                Welcome back, <span className="text-primary">{displayName}</span>
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Grade 11 &middot; SAT Track
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* WhatsApp link in top bar (visible on mobile) */}
            <a
              href="https://wa.me/201060618899"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden p-2 rounded-full text-emerald-500 hover:bg-emerald-50 transition-colors"
              title="WhatsApp Support"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.713.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* Notification Bell */}
            <button className="relative p-2 rounded-full hover:bg-muted/50 transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white ring-2 ring-card">
                3
              </span>
            </button>
            {/* Avatar */}
            <div className="flex items-center gap-2">
              <Avatar src="" alt={displayName} fallback={displayName.charAt(0)} size="md" />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-foreground leading-tight">{displayName}</p>
                <p className="text-[11px] text-muted-foreground leading-tight">Student</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div className="flex-1 p-4 md:p-8 space-y-6 overflow-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Questions Completed
                  </p>
                  <p className="text-2xl font-bold text-foreground">{dashData?.stats?.totalAttempts?.toLocaleString() ?? "0"}</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                    {dashLoading ? "Loading..." : "Based on your practice history"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    First-Attempt Accuracy
                  </p>
                  <p className="text-2xl font-bold text-foreground">{dashData?.stats?.firstAttemptAccuracy ?? 0}%</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                    {dashLoading ? "Loading..." : "First-try success rate"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Practice Streak
                  </p>
                  <p className="text-2xl font-bold text-foreground">{dashData?.stats?.streak ?? 0} days</p>
                  <p className="text-[11px] text-accent font-medium mt-0.5">
                    {dashLoading ? "Loading..." : dashData?.stats?.streak ? "Keep it going!" : "Start practicing to build a streak"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Upcoming Sessions
                  </p>
                  <p className="text-2xl font-bold text-foreground">{dashData?.stats?.pendingAssignments ?? 0}</p>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                    {dashLoading ? "Loading..." : "Pending assignments"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── LEFT COLUMN (wider) ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Sessions */}
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Sessions
                  </CardTitle>
                  <Link
                    href="/dashboard/schedule"
                    className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
                  >
                    View All <ChevronRight className="h-3 w-3" />
                  </Link>
                </CardHeader>
                <CardContent className="space-y-1">
                  {upcomingSessions.map((session, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-all duration-200 group cursor-pointer"
                    >
                      {/* Date/Time block */}
                      <div className="flex flex-col items-center w-16 shrink-0 bg-muted/40 rounded-lg py-2 px-1 group-hover:bg-primary/5 transition-colors">
                        <span className="text-[9px] font-semibold text-primary uppercase leading-tight">
                          {session.time.split(",")[0]}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          {session.time.split(", ")[1]}
                        </span>
                      </div>
                      {/* Course info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {session.course}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {session.teacher}
                        </p>
                      </div>
                      {/* Type badge */}
                      <Badge
                        variant={session.type === "Online" ? "default" : "secondary"}
                        className="shrink-0 text-[10px] px-2.5 py-0.5"
                      >
                        {session.type}
                      </Badge>
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Domain Mastery Progress */}
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Domain Mastery
                  </CardTitle>
                  <Link
                    href="/dashboard/progress"
                    className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
                  >
                    Full Report <ChevronRight className="h-3 w-3" />
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashData?.mastery?.skills?.length ? (
                    <>
                      {dashData.mastery.skills.slice(0, 5).map((skill) => (
                        <div key={skill.skillId} className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-foreground">{skill.skillName || skill.skillId.slice(0, 12)}</span>
                            <span className="font-bold text-foreground">{Math.round((skill.correctCount / Math.max(skill.attemptsCount, 1)) * 100)}%</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-muted/60 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ease-out ${
                                skill.level === "mastered" ? "bg-emerald-500" :
                                skill.level === "proficient" ? "bg-primary" :
                                skill.level === "approaching" ? "bg-[#f5a623]" :
                                "bg-red-400"
                              }`}
                              style={{ width: `${Math.round((skill.correctCount / Math.max(skill.attemptsCount, 1)) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                      {/* Overall average */}
                      {dashData.mastery.total > 0 && (
                        <div className="pt-3 border-t border-border mt-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-foreground">Overall Mastery</span>
                            <span className="font-bold text-primary text-lg">
                              {Math.round((dashData.mastery.mastered / Math.max(dashData.mastery.total, 1)) * 100)}%
                            </span>
                          </div>
                          <div className="w-full h-3 rounded-full bg-muted/60 overflow-hidden mt-1.5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${Math.round((dashData.mastery.mastered / Math.max(dashData.mastery.total, 1)) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : dashLoading ? (
                    <p className="text-sm text-muted-foreground">Loading mastery data...</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Complete practice sessions to see your mastery data.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action) =>
                    action.external ? (
                      <a
                        key={action.label}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant={action.variant}
                          size="sm"
                          className="w-full justify-start text-sm h-10"
                        >
                          <action.icon className="h-4 w-4 mr-2.5 shrink-0" />
                          {action.label}
                          <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 opacity-50" />
                        </Button>
                      </a>
                    ) : (
                      <Link key={action.label} href={action.href}>
                        <Button
                          variant={action.variant}
                          size="sm"
                          className="w-full justify-start text-sm h-10"
                        >
                          <action.icon className="h-4 w-4 mr-2.5 shrink-0" />
                          {action.label}
                          <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 opacity-50" />
                        </Button>
                      </Link>
                    )
                  )}
                </CardContent>
              </Card>

              {/* Progress Summary Card */}
              <Card className="bg-gradient-to-br from-primary to-secondary border-0">
                <CardContent className="p-6 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">Great Job!</p>
                      <p className="text-xs text-white/70">You&apos;re in the top 25%</p>
                    </div>
                  </div>
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">SAT Math</span>
                      <span className="text-white font-bold">720</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: "72%" }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">SAT Reading</span>
                      <span className="text-white font-bold">680</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: "68%" }}
                      />
                    </div>
                  </div>
                  <Link
                    href="/take-diagnostic"
                    className="mt-5 w-full"
                  >
                    <Button
                      variant="accent"
                      size="sm"
                      className="w-full text-sm font-semibold shadow-lg shadow-black/20"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Take a New Diagnostic
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Student Profile Card */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <Avatar src="" alt={displayName} fallback={displayName.charAt(0)} className="h-12 w-12 ring-2 ring-primary/20" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{displayName}</p>
                      <p className="text-xs text-muted-foreground">Grade 11 &middot; SAT Track</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                        Member since Sep 2024
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Settings className="h-3.5 w-3.5" />
                      Account Settings
                    </Link>
                    <a
                      href="https://wa.me/201060618899"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-xs text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      Need help? Chat on WhatsApp
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}