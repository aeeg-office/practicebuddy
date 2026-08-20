/**
 * Practice Buddy question-loader
 *
 * Database-backed question loading for the practice system.
 * Subjects: math, reading, writing, science
 */

import prisma from "@/lib/prisma"

export type SubjectKey = "math" | "reading" | "writing" | "science"

export interface PracticeQuestion {
  id: string
  subject: string
  domain: string
  category: string | null
  difficulty: string
  format: string
  passage: string | null
  stem: string
  options: string | null
  correctAnswer: string | null
  explanation: string | null
  skillId: string | null
  estimatedTime: number | null
  calculatorAllowed: boolean | null
  version: number | null
}

export interface AnswerData {
  correctAnswer: string
  explanation: string | null
  strategy: string | null
}

/**
 * Get questions from the database for practice.
 * Filters by subject, optional skill, optional difficulty, and limit.
 */
export async function getQuestions(
  subject: SubjectKey,
  skillId?: string,
  difficulty?: string,
  limit: number = 10,
  tenantId?: string,
): Promise<PracticeQuestion[]> {
  const where: Record<string, unknown> = {
    subject,
    questionStatus: "active",
    isActive: true,
  }

  if (skillId) where.skillId = skillId
  if (difficulty) where.difficulty = difficulty
  if (tenantId) where.tenantId = tenantId

  const questions = await prisma.question.findMany({
    where: where as any,
    select: {
      id: true,
      subject: true,
      domain: true,
      category: true,
      difficulty: true,
      format: true,
      passage: true,
      stem: true,
      options: true,
      correctAnswer: true,
      explanation: true,
      skillId: true,
      estimatedTime: true,
      calculatorAllowed: true,
      version: true,
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  })

  return questions.map((q) => ({
    ...q,
    options: q.options, // keep as JSON string, client parses
  }))
}

/**
 * Get a single question by ID
 */
export async function getQuestionById(id: string): Promise<PracticeQuestion | null> {
  const q = await prisma.question.findUnique({
    where: { id },
    select: {
      id: true,
      subject: true,
      domain: true,
      category: true,
      difficulty: true,
      format: true,
      passage: true,
      stem: true,
      options: true,
      correctAnswer: true,
      explanation: true,
      skillId: true,
      estimatedTime: true,
      calculatorAllowed: true,
      version: true,
    },
  })
  if (!q) return null
  return q
}

/**
 * Get answer data for a question (correctAnswer + explanation)
 */
export async function getQuestionAnswer(id: string): Promise<AnswerData | null> {
  const q = await prisma.question.findUnique({
    where: { id },
    select: {
      correctAnswer: true,
      explanation: true,
      strategy: true,
    },
  })
  if (!q) return null
  return q
}

/**
 * Get question counts per skill for a subject
 */
export async function getSkillQuestionCounts(subject: SubjectKey): Promise<Record<string, number>> {
  const counts = await prisma.question.groupBy({
    by: ["skillId"],
    where: {
      subject,
      questionStatus: "active",
      isActive: true,
      skillId: { not: null },
    },
    _count: { id: true },
  })

  const result: Record<string, number> = {}
  for (const c of counts) {
    if (c.skillId) result[c.skillId] = c._count.id
  }
  return result
}