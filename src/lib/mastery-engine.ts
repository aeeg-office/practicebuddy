/**
 * Mastery Engine — Server-side mastery computation
 * 
 * Derives skill mastery from immutable StudentAttempt records.
 * Mastery is always rebuildable from raw attempt data.
 * 
 * Mastery levels:
 *   mastered (80%+):  strong command, needs periodic review
 *   proficient (60-79%):  functional command, some gaps
 *   approaching (40-59%):  developing, needs more practice
 *   needs_support (<40%):  significant gaps, intervention recommended
 *   not-assessed:  no attempts recorded
 */

import prisma from "@/lib/prisma"

export type MasteryLevel = "mastered" | "proficient" | "approaching" | "needs_support" | "not-assessed"

export interface SkillMasteryResult {
  skillId: string
  microSkillId: string | null
  level: MasteryLevel
  confidence: number
  attemptsCount: number
  correctCount: number
  firstAttemptCorrect: number
  secondAttemptCorrect: number
  lastAttemptAt: Date | null
}

/**
 * Calculate mastery for a single skill based on a student's attempts.
 * First-attempt correctness weighted more heavily (2x) than second-attempt.
 */
export function calculateMasteryFromAttempts(attempts: {
  isCorrect: boolean
  attemptNumber: number
}[]): { level: MasteryLevel; confidence: number; correctCount: number; firstCorrect: number; secondCorrect: number } {
  if (attempts.length === 0) {
    return { level: "not-assessed", confidence: 0, correctCount: 0, firstCorrect: 0, secondCorrect: 0 }
  }

  const total = attempts.length
  let weightedScore = 0
  let firstCorrect = 0
  let secondCorrect = 0
  let firstTotal = 0
  let secondTotal = 0

  for (const a of attempts) {
    if (a.attemptNumber === 1) {
      firstTotal++
      if (a.isCorrect) firstCorrect++
      weightedScore += a.isCorrect ? 2 : 0 // first attempt weighted 2x
    } else if (a.attemptNumber === 2) {
      secondTotal++
      if (a.isCorrect) secondCorrect++
      weightedScore += a.isCorrect ? 1 : 0
    } else {
      weightedScore += a.isCorrect ? 1 : 0
    }
  }

  const maxWeight = (firstTotal * 2) + secondTotal + (total - firstTotal - secondTotal)
  const accuracy = maxWeight > 0 ? weightedScore / maxWeight : 0

  let level: MasteryLevel
  if (accuracy >= 0.8) level = "mastered"
  else if (accuracy >= 0.6) level = "proficient"
  else if (accuracy >= 0.4) level = "approaching"
  else level = "needs_support"

  // Confidence: higher with more attempts (capped at 0.95)
  const confidence = Math.min(0.95, (total / (total + 5)) * accuracy)

  return {
    level,
    confidence,
    correctCount: firstCorrect + secondCorrect,
    firstCorrect,
    secondCorrect,
  }
}

/**
 * Recalculate and persist mastery for a specific student+skill combination.
 */
export async function recalculateSkillMastery(userId: string, skillId: string): Promise<SkillMasteryResult> {
  const attempts = await prisma.studentAttempt.findMany({
    where: { userId, skillId, isCorrect: { not: undefined } },
    select: { isCorrect: true, attemptNumber: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  })

  const result = calculateMasteryFromAttempts(attempts)
  const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1].createdAt : null

  // Get user's tenant
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { tenantId: true } })

  // Upsert mastery record
  await prisma.userSkillMastery.upsert({
    where: { tenantId_userId_skillId: { tenantId: user?.tenantId ?? "", userId, skillId } },
    update: {
      level: result.level,
      confidence: result.confidence,
      attemptsCount: attempts.length,
      correctCount: result.correctCount,
      lastAttemptAt: lastAttempt,
    },
    create: {
      tenantId: user?.tenantId ?? "",
      userId,
      skillId,
      level: result.level,
      confidence: result.confidence,
      attemptsCount: attempts.length,
      correctCount: result.correctCount,
      lastAttemptAt: lastAttempt,
    },
  })

  return {
    skillId,
    microSkillId: null,
    level: result.level,
    confidence: result.confidence,
    attemptsCount: attempts.length,
    correctCount: result.correctCount,
    firstAttemptCorrect: result.firstCorrect,
    secondAttemptCorrect: result.secondCorrect,
    lastAttemptAt: lastAttempt,
  }
}

/**
 * Recalculate all mastery for a single user.
 */
export async function recalculateUserMastery(userId: string): Promise<SkillMasteryResult[]> {
  const skillIds = await prisma.studentAttempt.findMany({
    where: { userId },
    select: { skillId: true },
    distinct: ["skillId"],
  })

  const results: SkillMasteryResult[] = []
  for (const { skillId } of skillIds) {
    if (skillId) {
      const result = await recalculateSkillMastery(userId, skillId)
      results.push(result)
    }
  }
  return results
}

/**
 * Rebuild all mastery from scratch from raw attempts.
 */
export async function rebuildAllMastery(): Promise<number> {
  const users = await prisma.studentAttempt.findMany({
    select: { userId: true },
    distinct: ["userId"],
  })

  let total = 0
  for (const { userId } of users) {
    const results = await recalculateUserMastery(userId)
    total += results.length
  }
  return total
}