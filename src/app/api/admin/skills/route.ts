import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { apiError, authenticateAdminApi } from "@/lib/admin-api"

export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const user = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const skills = await prisma.skill.findMany({
      where: { isActive: true },
      include: {
        grade: { include: { program: { select: { name: true, code: true } } } },
        _count: { select: { questions: true, microSkills: true } },
      },
      orderBy: [{ subject: "asc" }, { domain: "asc" }, { name: "asc" }],
    })

    return NextResponse.json({
      skills: skills.map(s => ({
        id: s.id,
        code: s.code,
        name: s.name,
        subject: s.subject,
        domain: s.domain,
        difficulty: s.difficulty,
        programName: s.grade?.program?.name ?? null,
        gradeLevel: s.grade?.level ?? null,
        questionCount: s._count.questions,
        microSkillCount: s._count.microSkills,
      })),
      total: skills.length,
    })
  } catch (error) {
    return apiError(error, "Failed to list skills")
  }
}
