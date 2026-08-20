import { NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { getJwtSecret } from "@/lib/auth-server"

/**
 * GET /api/practice/progress?subject=sat
 *
 * Returns overall progress data for a subject — total attempts, accuracy,
 * per-skill mastery breakdown, today's activity, and streak.
 * Auth: Bearer token (JWT) in Authorization header.
 */
export async function GET(request: Request) {
  try {
    // 1️⃣ Authenticate
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    let payload: { userId: string; role: string }
    try {
      payload = jwt.verify(token, getJwtSecret()) as { userId: string; role: string }
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const subject = searchParams.get("subject")

    if (!subject) {
      return NextResponse.json({ error: "subject query parameter is required" }, { status: 400 })
    }

    // 2️⃣ Find question IDs matching the subject, then query attempts
    const subjectQuestions = await prisma.question.findMany({
      where: { subject },
      select: { id: true },
    })
    const questionIds = subjectQuestions.map((q) => q.id)

    const attempts = await prisma.studentAttempt.findMany({
      where: {
        userId: payload.userId,
        questionId: { in: questionIds },
      },
      orderBy: { createdAt: "desc" },
    })

    // 3️⃣ Aggregate stats
    const totalAttempts = attempts.length
    const totalCorrect = attempts.filter((a) => a.isCorrect).length
    const accuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : 0

    // 4️⃣ Per-skill breakdown
    //    Use skillId from StudentAttempt records (or questionId fallback)
    const skillMap = new Map<string, { correct: number; total: number }>()
    for (const a of attempts) {
      const key = a.skillId ?? a.questionId.split("-").slice(0, 2).join("-")
      const entry = skillMap.get(key) ?? { correct: 0, total: 0 }
      entry.total++
      if (a.isCorrect) entry.correct++
      skillMap.set(key, entry)
    }

    const skills = Array.from(skillMap.entries()).map(([key, stats]) => ({
      skillKey: key,
      attempted: stats.total,
      correct: stats.correct,
      accuracy: stats.total > 0 ? stats.correct / stats.total : 0,
    }))

    // 5️⃣ Today's activity
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayAttempts = attempts.filter((a) => a.createdAt >= todayStart).length

    // 6️⃣ Streak — calculated from attempt dates
    const attemptDates = [
      ...new Set(
        attempts.map((a) => a.createdAt.toISOString().split("T")[0]),
      ),
    ].sort().reverse()

    let streak = 0
    if (attemptDates.length > 0) {
      const today = new Date().toISOString().split("T")[0]
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
      const mostRecent = attemptDates[0]

      if (mostRecent === today || mostRecent === yesterday) {
        streak = 1
        for (let i = 1; i < attemptDates.length; i++) {
          const curr = new Date(attemptDates[i])
          const prev = new Date(attemptDates[i - 1])
          const diff = Math.round((prev.getTime() - curr.getTime()) / 86400000)
          if (diff === 1) streak++
          else break
        }
      }
    }

    // 7️⃣ Session history (last 20)
    const recentSessions = await prisma.practiceSession.findMany({
      where: {
        userId: payload.userId,
        type: subject ? { contains: subject } : undefined,
      },
      orderBy: { startedAt: "desc" },
      take: 20,
    })

    return NextResponse.json({
      subject,
      totalAttempts,
      totalCorrect,
      accuracy,
      skills,
      todayAttempts,
      streak,
      lastActiveDate: attemptDates[0] ?? null,
      recentSessions: recentSessions.map((s) => ({
              id: s.id,
              type: s.type,
              skillId: null,
              questionCount: s.totalQuestions,
              correctCount: s.correctCount,
              completed: s.completedAt !== null,
              completedAt: s.completedAt,
              startedAt: s.startedAt,
              totalTimeSpent: s.totalTimeSpent,
            })),
    })
  } catch (error) {
    console.error("Progress API GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * POST /api/practice/progress/session
 *
 * Body: { subject, skillId, skillName, questionCount, correctCount, totalTime, mode, difficulty, completed }
 * Auth: Bearer token (JWT)
 *
 * Saves a practice session result and updates skill mastery.
 */
export async function POST(request: Request) {
  try {
    // 1️⃣ Authenticate
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    let payload: { userId: string; role: string }
    try {
      payload = jwt.verify(token, getJwtSecret()) as { userId: string; role: string }
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // 2️⃣ Parse body
    const body = await request.json()
    const {
      subject,
      skillId,
      skillName,
      questionCount,
      correctCount,
      totalTime,
      mode = "targeted",
      difficulty = "mixed",
      completed = true,
    } = body as {
      subject?: string
      skillId?: string
      skillName?: string
      questionCount?: number
      correctCount?: number
      totalTime?: number
      mode?: string
      difficulty?: string
      completed?: boolean
    }

    if (!subject || questionCount === undefined || correctCount === undefined) {
      return NextResponse.json(
        { error: "subject, questionCount, and correctCount are required" },
        { status: 400 },
      )
    }

    // 3️⃣ Create PracticeSession record
    const user = await prisma.user.findUnique({ where: { id: payload.userId }, select: { tenantId: true } })
    const session = await prisma.practiceSession.create({
      data: {
        tenantId: user?.tenantId ?? "",
        userId: payload.userId,
        type: subject ?? "practice",
        totalQuestions: questionCount,
        correctCount,
        totalTimeSpent: totalTime ?? null,
        completedAt: completed ? new Date() : null,
      },
    })

    // 4️⃣ Update or create UserSkillMastery if skillId is provided
    if (skillId) {
      const existingAttempts = await prisma.studentAttempt.findMany({
        where: {
          userId: payload.userId,
          skillId,
        },
      })

      const totalAttempts = existingAttempts.length
      const firstCorrect = existingAttempts.filter((a) => a.isCorrect).length
      const accuracy = totalAttempts > 0 ? firstCorrect / totalAttempts : 0

      // Determine mastery level from accuracy
      const level = totalAttempts === 0
        ? "not-assessed"
        : accuracy >= 0.8
          ? "mastered"
          : accuracy >= 0.6
            ? "approaching"
            : accuracy >= 0.4
              ? "developing"
              : "beginning"

      // UserSkillMastery has @@unique([tenantId, userId, skillId])
      const userRecord = await prisma.user.findUnique({ where: { id: payload.userId }, select: { tenantId: true } })
      if (userRecord?.tenantId) {
        const existingMastery = await prisma.userSkillMastery.findFirst({
          where: { tenantId: userRecord.tenantId, userId: payload.userId, skillId },
        })
        if (existingMastery) {
          await prisma.userSkillMastery.update({
            where: { id: existingMastery.id },
            data: { level, confidence: accuracy, attemptsCount: totalAttempts, correctCount: firstCorrect, lastAttemptAt: new Date() },
          })
        } else {
          await prisma.userSkillMastery.create({
            data: { tenantId: userRecord.tenantId, userId: payload.userId, skillId, level, confidence: accuracy, attemptsCount: totalAttempts, correctCount: firstCorrect, lastAttemptAt: new Date() },
          })
        }
      }
    }

    return NextResponse.json({
      session: {
        id: session.id,
        subject,
        skillId: skillId ?? null,
        questionCount,
        correctCount,
        totalTime: totalTime ?? null,
        completed,
        startedAt: session.startedAt,
        completedAt: session.completedAt,
      },
    })
  } catch (error) {
    console.error("Progress API POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}