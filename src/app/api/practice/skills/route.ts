import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { mockSkills, VALID_SUBJECTS } from "@/data/practice-skills"
import type { SubjectKey } from "@/lib/question-loader"
import { getSkillQuestionCounts } from "@/lib/question-loader"

/**
 * GET /api/practice/skills?subject=math|reading|writing|science
 *
 * Returns the skill taxonomy for a subject with actual question counts
 * and real DB skill IDs from the database.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const raw = searchParams.get("subject")

    if (!raw || !(VALID_SUBJECTS as readonly string[]).includes(raw)) {
      return NextResponse.json(
        { error: `Invalid or missing subject. Valid values: ${VALID_SUBJECTS.join(", ")}` },
        { status: 400 },
      )
    }

    const subject = raw as SubjectKey
    const subjectData = mockSkills[subject]
    const counts = await getSkillQuestionCounts(subject)

    // Fetch real DB skill IDs for the codes used in mock data
    const skillCodes = subjectData.domains.flatMap((d) => d.skills.map((s) => s.id))
    const dbSkills = await prisma.skill.findMany({
      where: { code: { in: skillCodes } },
      select: { id: true, code: true },
    })
    const codeToIdMap = new Map(dbSkills.map((s) => [s.code, s.id]))

    // Deep-clone the mock data, inject real question counts and DB skill IDs
    const enriched = {
      name: subjectData.name,
      domains: subjectData.domains.map((domain) => ({
        name: domain.name,
        skills: domain.skills.map((skill) => ({
          id: codeToIdMap.get(skill.id) ?? skill.id, // use DB ID if available, fallback to code
          code: skill.id,
          name: skill.name,
          difficulty: skill.difficulty,
          mastery: skill.mastery,
          questions: counts[skill.id] ?? skill.questions,
        })),
      })),
    }

    return NextResponse.json(enriched)
  } catch (error) {
    console.error("Skills API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}