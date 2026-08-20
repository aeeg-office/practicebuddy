import crypto from "crypto"
import { NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { getJwtSecret } from "@/lib/auth-server"

/**
 * GET /api/practice/progress/skill/[skillId]
 *
 * Returns skill-level progress: attempts, accuracy, mastery level, recent sessions.
 * Auth: Bearer token (JWT) in Authorization header.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ skillId: string }> },
) {
  try {
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

    const { skillId } = await params

    // Get user's tenant
    const user = await prisma.user.findUnique({ where: { id: payload.userId }, select: { tenantId: true } })
    if (!user?.tenantId) return NextResponse.json({ error: "User has no tenant" }, { status: 403 })

    // Get all attempts for this skill
    const skillAttempts = await prisma.studentAttempt.findMany({
      where: { tenantId: user.tenantId, userId: payload.userId, skillId },
      orderBy: { createdAt: "desc" },
      take: 500,
    })

    // Calculate stats
    const totalAttempts = skillAttempts.length
    const correctAttempts = skillAttempts.filter((a) => a.isCorrect).length
    const accuracy = totalAttempts > 0 ? correctAttempts / totalAttempts : 0

    const level =
      totalAttempts === 0 ? "not-assessed" :
      accuracy >= 0.8 ? "mastered" :
      accuracy >= 0.6 ? "approaching" :
      accuracy >= 0.4 ? "developing" :
      "beginning"

    // Get or create mastery record
    const masteryRecord = await prisma.userSkillMastery.findFirst({
      where: { tenantId: user.tenantId, userId: payload.userId, skillId },
    })

    if (masteryRecord) {
      await prisma.userSkillMastery.update({
        where: { id: masteryRecord.id },
        data: { level, confidence: accuracy, attemptsCount: totalAttempts, correctCount: correctAttempts, lastAttemptAt: new Date() },
      })
    } else {
      await prisma.userSkillMastery.create({
        data: { tenantId: user.tenantId, userId: payload.userId, skillId, level, confidence: accuracy, attemptsCount: totalAttempts, correctCount: correctAttempts, lastAttemptAt: new Date() },
      })
    }

    // Get the skill info
    const skill = await prisma.skill.findUnique({ where: { id: skillId }, select: { name: true, subject: true, domain: true } })

    return NextResponse.json({
      skillId,
      skillName: skill?.name ?? "Unknown",
      subject: skill?.subject ?? null,
      domain: skill?.domain ?? null,
      totalAttempts,
      correctAttempts,
      accuracy: Math.round(accuracy * 100),
      level,
      recentAttempts: skillAttempts.slice(0, 20).map((a) => ({
        id: a.id,
        questionId: a.questionId,
        answer: a.answer,
        isCorrect: a.isCorrect,
        timeSpent: a.timeSpent,
        createdAt: a.createdAt,
      })),
    })
  } catch (error) {
    console.error("Skill progress API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}