import crypto from "crypto"
import { NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { getQuestionById, getQuestionAnswer } from "@/lib/question-loader"
import { getJwtSecret } from "@/lib/auth-server"
import { recalculateSkillMastery } from "@/lib/mastery-engine"


/**
 * POST /api/practice/attempts
 *
 * Body: { questionId: string, answer: string, timeSpent?: number, sessionId?: string }
 * Auth: Bearer token (JWT) in Authorization header
 *
 * Saves a student attempt to the StudentAttempt table.
 * Returns { correct, correctAnswer, explanation }.
 */
export async function POST(request: Request) {
  try {
    // 1️⃣ Authenticate user from JWT
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

    // 2️⃣ Parse and validate body
    const body = await request.json()
    const { questionId, answer, timeSpent, sessionId } = body as {
      questionId?: string
      answer?: string
      timeSpent?: number
      sessionId?: string
    }

    if (!questionId || answer === undefined || answer === null) {
      return NextResponse.json({ error: "questionId and answer are required" }, { status: 400 })
    }

    // 3️⃣ Look up the question from database
    const question = await getQuestionById(questionId)
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 })
    }

    // 3b️⃣ Find or create a QuestionVersion
    const versionNum = question.version ?? 1
    let questionVersion = await prisma.questionVersion.findFirst({
      where: { questionId, versionNumber: versionNum },
    })
    if (!questionVersion) {
      // Auto-create version if missing (backward compatibility)
      const qDb = await prisma.question.findUnique({ where: { id: questionId } })
      if (qDb) {
        const hash = crypto.createHash('sha256')
          .update(`${qDb.stem}:${qDb.correctAnswer}:${qDb.options || ''}`)
          .digest('hex')
        questionVersion = await prisma.questionVersion.create({
          data: {
            tenantId: qDb.tenantId,
            questionId: qDb.id,
            versionNumber: qDb.version,
            stem: qDb.stem,
            options: qDb.options,
            correctAnswer: qDb.correctAnswer,
            explanation: qDb.explanation,
            strategy: qDb.strategy,
            difficulty: qDb.difficulty,
            format: qDb.format,
            passage: qDb.passage,
            acceptedResponses: qDb.acceptedResponses,
            questionType: qDb.format,
            contentHash: hash,
            qualityStatus: 'published',
            publishedAt: new Date(),
          }
        })
      }
    }

    const answerData = await getQuestionAnswer(questionId)
    if (!answerData) {
      return NextResponse.json({ error: "Answer data not found for question" }, { status: 500 })
    }

    const correct = answer.toLowerCase().trim() === answerData.correctAnswer.toLowerCase().trim()

    // Get the user's tenant and question's skillId
    const user = await prisma.user.findUnique({ where: { id: payload.userId }, select: { tenantId: true } })
    const questionDb = await prisma.question.findUnique({ where: { id: questionId }, select: { skillId: true } })
    const snapshotHash = crypto.createHash('sha256').update(`${payload.userId}:${questionId}:${answer}:${Date.now()}`).digest('hex')

    // 4️⃣ Save attempt to the StudentAttempt table (immutable, append-only)
    await prisma.studentAttempt.create({
      data: {
        tenantId: user?.tenantId ?? "",
        userId: payload.userId,
        questionId,
        questionVersionId: questionVersion?.id ?? null,
        skillId: questionDb?.skillId ?? null,
        sessionId: sessionId ?? null,
        answer,
        isCorrect: correct,
        timeSpent: timeSpent ?? null,
        hintsUsed: 0,
        snapshotHash,
      },
    })

    // 4b️⃣ Recalculate mastery for this skill (async, non-blocking)
    if (questionDb?.skillId) {
      recalculateSkillMastery(payload.userId, questionDb.skillId).catch(() => {})
    }

    // 5️⃣ Return result
    return NextResponse.json({
      correct,
      correctAnswer: answerData.correctAnswer,
      explanation: answerData.explanation,
    })
  } catch (error) {
    console.error("Attempts API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}