import { NextResponse } from "next/server"
import { VALID_SUBJECTS } from "@/data/practice-skills"
import type { SubjectKey } from "@/lib/question-loader"
import { getQuestions } from "@/lib/question-loader"

/**
 * GET /api/practice/questions
 *
 * Query params:
 *   subject    — math | reading | writing | science (required)
 *   skill      — skill-id to filter by (optional)
 *   difficulty — easy | medium | hard (optional)
 *   limit      — max results, default 10 (optional)
 *
 * Returns questions from the database, mapped to a consistent response format.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rawSubject = searchParams.get("subject")
    const skill = searchParams.get("skill") ?? undefined
    const rawDifficulty = searchParams.get("difficulty") ?? undefined
    const rawLimit = searchParams.get("limit")

    if (!rawSubject || !(VALID_SUBJECTS as readonly string[]).includes(rawSubject)) {
      return NextResponse.json(
        { error: `Invalid or missing subject. Valid values: ${VALID_SUBJECTS.join(", ")}` },
        { status: 400 },
      )
    }

    const subject = rawSubject as SubjectKey
    const difficulty = rawDifficulty as "easy" | "medium" | "hard" | undefined
    if (rawDifficulty && !["easy", "medium", "hard"].includes(rawDifficulty)) {
      return NextResponse.json(
        { error: "Invalid difficulty. Valid values: easy, medium, hard" },
        { status: 400 },
      )
    }

    const limit = rawLimit ? Math.max(1, Math.min(100, parseInt(rawLimit, 10) || 10)) : 10

    const questions = await getQuestions(subject, skill, difficulty, limit)

    return NextResponse.json({
      questions,
      total: questions.length,
      subject,
      skill: skill ?? null,
      difficulty: difficulty ?? null,
    })
  } catch (error) {
    console.error("Questions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}