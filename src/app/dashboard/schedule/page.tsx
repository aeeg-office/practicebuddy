'use client'

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import {
  Calendar,
  Clock,
  ArrowLeft,
  BookOpen,
  User,
  Monitor,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * Student Schedule page.
 * Fixes HIGH-004: /dashboard/schedule was returning 404.
 */
const upcomingSessions = [
  { time: "Mon, 10:00 AM", course: "SAT Math Intensive", teacher: "Dr. Ahmed Khalil", type: "Online" },
  { time: "Tue, 2:00 PM", course: "ACT English Prep", teacher: "Ms. Sara Mansour", type: "In-Center" },
  { time: "Wed, 11:00 AM", course: "IELTS Speaking Practice", teacher: "Mr. James Wilson", type: "Online" },
  { time: "Thu, 4:00 PM", course: "TOEFL Writing Workshop", teacher: "Ms. Nour El-Din", type: "In-Center" },
  { time: "Sat, 9:00 AM", course: "SAT Full-Length Mock", teacher: "Dr. Ahmed Khalil", type: "In-Center" },
]

export default function SchedulePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-foreground">My Schedule</h1>
          <p className="text-sm text-muted-foreground">View your upcoming sessions and practice plan</p>
        </div>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingSessions.map((session, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{session.course}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {session.time}</span>
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {session.teacher}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={session.type === "Online" ? "default" : "secondary"}>{session.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Practice Plan */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <Clock className="h-5 w-5 text-primary" />
              Recommended Practice Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium text-foreground">Daily Practice Goal</p>
                  <p className="text-sm text-muted-foreground">Complete at least 20 questions per day</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">On Track</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium text-foreground">SAT Math — Algebra</p>
                  <p className="text-sm text-muted-foreground">Focus on linear equations and systems</p>
                </div>
                <Link href="/practice/math">
                  <Button size="sm" variant="outline">
                    Practice <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium text-foreground">SAT Reading — Command of Evidence</p>
                  <p className="text-sm text-muted-foreground">Practice textual and quantitative evidence questions</p>
                </div>
                <Link href="/practice/reading">
                  <Button size="sm" variant="outline">
                    Practice <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}