import { NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { getJwtSecret } from "@/lib/auth-server"
import { recalculateUserMastery } from "@/lib/mastery-engine"

/**
 * GET /api/dashboard
 * Returns real student dashboard data from the database.
 * Replaces the hardcoded mock data in the student dashboard page.
 */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const payload = jwt.verify(authHeader.split(" ")[1], getJwtSecret()) as { userId: string; role: string }

    // Get user info
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, role: true, tenantId: true, createdAt: true },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    // Get practice stats
    const totalAttempts = await prisma.studentAttempt.count({ where: { userId: payload.userId } })
    const correctAttempts = await prisma.studentAttempt.count({ where: { userId: payload.userId, isCorrect: true } })
    const firstAttempts = await prisma.studentAttempt.count({ where: { userId: payload.userId, attemptNumber: 1 } })
    const firstCorrect = await prisma.studentAttempt.count({ where: { userId: payload.userId, attemptNumber: 1, isCorrect: true } })
    const secondAttempts = await prisma.studentAttempt.count({ where: { userId: payload.userId, attemptNumber: 2 } })
    const secondCorrect = await prisma.studentAttempt.count({ where: { userId: payload.userId, attemptNumber: 2, isCorrect: true } })

    // Sessions
    const sessions = await prisma.practiceSession.findMany({
      where: { userId: payload.userId },
      orderBy: { startedAt: "desc" },
      take: 10,
    })
    const completedSessions = sessions.filter(s => s.status === "completed").length
    const totalQuestions = sessions.reduce((sum, s) => sum + s.totalQuestions, 0)
    const sessionCorrect = sessions.reduce((sum, s) => sum + s.correctCount, 0)
    const accuracy = totalQuestions > 0 ? Math.round((sessionCorrect / totalQuestions) * 100) : 0
    const firstAttemptAccuracy = firstAttempts > 0 ? Math.round((firstCorrect / firstAttempts) * 100) : 0

    // Mastery
    const mastery = await prisma.userSkillMastery.findMany({
      where: { userId: payload.userId },
      include: { skill: { select: { name: true, domain: true } } },
      orderBy: { lastAttemptAt: "desc" },
    })
    const masteredCount = mastery.filter(m => m.level === "mastered").length
    const proficientCount = mastery.filter(m => m.level === "proficient").length
    const approachingCount = mastery.filter(m => m.level === "approaching").length
    const needsSupportCount = mastery.filter(m => m.level === "needs_support").length

    // Streak from localStorage won't be available server-side
    // Instead compute from attempt dates
    const recentAttempts = await prisma.studentAttempt.findMany({
      where: { userId: payload.userId },
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    })
    const activeDates = new Set(recentAttempts.map(a => a.createdAt.toISOString().split("T")[0]))
    let streak = 0
    const today = new Date().toISOString().split("T")[0]
    let checkDate = new Date()
    while (activeDates.has(checkDate.toISOString().split("T")[0])) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    }

    // Assignments
    const assignments = await prisma.studentAssignment.findMany({
      where: { studentId: payload.userId },
      include: { assignment: { select: { title: true, dueAt: true, status: true } } },
      orderBy: { assignment: { dueAt: "asc" } },
    })
    const pendingAssignments = assignments.filter(a => a.status === "assigned" || a.status === "in_progress").length

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        memberSince: user.createdAt.toISOString().split("T")[0],
      },
      stats: {
        totalAttempts,
        correctAttempts,
        accuracy: totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0,
        firstAttemptAccuracy,
        secondAttemptRecovery: secondAttempts > 0 ? Math.round((secondCorrect / secondAttempts) * 100) : 0,
        sessionsCompleted: completedSessions,
        streak,
        pendingAssignments,
      },
      mastery: {
        total: mastery.length,
        mastered: masteredCount,
        proficient: proficientCount,
        approaching: approachingCount,
        needsSupport: needsSupportCount,
        skills: mastery.map(m => ({
          skillId: m.skillId,
          skillName: (m.skill as any)?.name ?? null,
          domain: (m.skill as any)?.domain ?? null,
          level: m.level,
          confidence: m.confidence,
          attemptsCount: m.attemptsCount,
          correctCount: m.correctCount,
          lastPracticed: m.lastAttemptAt?.toISOString() ?? null,
        })),
      },
      recentSessions: sessions.map(s => ({
        id: s.id,
        type: s.type,
        status: s.status,
        questions: s.totalQuestions,
        correct: s.correctCount,
        accuracy: s.totalQuestions > 0 ? Math.round((s.correctCount / s.totalQuestions) * 100) : 0,
        startedAt: s.startedAt.toISOString(),
        completedAt: s.completedAt?.toISOString() ?? null,
      })),
      assignments: assignments.map(a => ({
        id: a.id,
        title: a.assignment.title,
        dueAt: a.assignment.dueAt?.toISOString() ?? null,
        status: a.status,
        score: a.score,
        totalQuestions: a.totalQuestions,
        correctCount: a.correctCount,
      })),
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}