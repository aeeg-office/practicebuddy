import { NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"
import { VALID_SUBJECTS } from "@/data/practice-skills"
import type { SubjectKey } from "@/lib/question-loader"
import { getQuestions } from "@/lib/question-loader"
import { getJwtSecret } from "@/lib/auth-server"

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
 * Auth: Requires JWT Bearer token (fixes PARTIAL — was missing auth).
 */
export async function GET(request: Request) {
  try {
    // Authenticate — require valid JWT
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    const token = authHeader.split(" ")[1]
    try {
      jwt.verify(token, getJwtSecret())
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

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