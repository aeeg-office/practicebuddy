import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { apiError, authenticateAdminApi } from "@/lib/admin-api"

const MONTHS = 6

function monthStart(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
}

function monthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`
}

export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof Response) return identity

  try {
    const currentMonth = monthStart(new Date())
    const start = new Date(Date.UTC(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() - (MONTHS - 1), 1))
    const months = Array.from({ length: MONTHS }, (_, index) => {
      const date = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + index, 1))
      return { key: monthKey(date), label: new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format(date), users: 0, revenue: 0, sessions: 0 }
    })
    const indexedMonths = new Map(months.map((month) => [month.key, month]))

    // Resolve admin's tenant for tenant-scoped analytics
    const adminUser = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const tenantId = adminUser?.tenantId ?? ""

    const [totalUsers, activeStudents, courseCount, paidRevenue, users, payments, sessions, recentStudents, recentPayments] = await Promise.all([
      prisma.user.count({ where: { tenantId } }),
      prisma.user.count({ where: { role: "student", isActive: true, tenantId } }),
      prisma.course.count({ where: { isActive: true, tenantId } }),
      prisma.payment.aggregate({ where: { status: "paid", user: { tenantId } }, _sum: { amount: true } }),
      prisma.user.findMany({ where: { createdAt: { gte: start }, tenantId }, select: { createdAt: true } }),
      prisma.payment.findMany({ where: { status: "paid", paidAt: { gte: start }, user: { tenantId } }, select: { amount: true, paidAt: true } }),
      prisma.practiceSession.findMany({ where: { startedAt: { gte: start }, tenantId }, select: { startedAt: true, completedAt: true, correctCount: true, totalQuestions: true } }),
      prisma.user.findMany({ where: { role: "student", tenantId }, take: 8, orderBy: [{ createdAt: "desc" }, { id: "asc" }], select: { id: true, name: true, email: true, isActive: true, createdAt: true, enrollments: { take: 1, orderBy: { enrolledAt: "desc" }, select: { course: { select: { name: true } } } } } }),
      prisma.payment.findMany({ where: { user: { tenantId } }, take: 8, orderBy: [{ createdAt: "desc" }, { id: "asc" }], select: { id: true, amount: true, currency: true, status: true, createdAt: true, user: { select: { name: true, email: true } } } }),
    ])

    for (const user of users) {
      const month = indexedMonths.get(monthKey(user.createdAt))
      if (month) month.users++
    }
    for (const payment of payments) {
      if (payment.paidAt) {
        const month = indexedMonths.get(monthKey(payment.paidAt))
        if (month) month.revenue += Number(payment.amount)
      }
    }
    let completedSessions = 0
    let attemptedQuestions = 0
    let correctQuestions = 0
    for (const session of sessions) {
      const month = indexedMonths.get(monthKey(session.startedAt))
      if (month) month.sessions++
      if (session.completedAt !== null) completedSessions++
      attemptedQuestions += session.totalQuestions
      correctQuestions += session.correctCount
    }

    return NextResponse.json({
      totals: {
        users: totalUsers,
        activeStudents,
        publishedCourses: courseCount,
        paidRevenue: Number(paidRevenue._sum.amount ?? 0),
        practiceSessions: sessions.length,
        completionRate: sessions.length ? Math.round((completedSessions / sessions.length) * 100) : 0,
        accuracy: attemptedQuestions ? Math.round((correctQuestions / attemptedQuestions) * 100) : 0,
      },
      months,
      recentStudents,
      recentPayments,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    return apiError(error, "Failed to load admin analytics")
  }
}
