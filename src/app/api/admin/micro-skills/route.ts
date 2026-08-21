import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { apiError, authenticateAdminApi } from "@/lib/admin-api"

export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const url = new URL(request.url)
    const skillId = url.searchParams.get("skillId")
    const where: Record<string, unknown> = {}
    if (skillId) where.skillId = skillId

    const skills = await prisma.microSkill.findMany({
      where: where as any,
      include: { skill: { select: { name: true, code: true } } },
      orderBy: [{ skillId: "asc" }, { order: "asc" }],
    })

    return NextResponse.json({ microSkills: skills, total: skills.length })
  } catch (error) {
    return apiError(error, "Failed to list micro-skills")
  }
}

export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const data = await request.json() as Record<string, unknown>
    if (!data.skillId || !data.code || !data.name) {
      return NextResponse.json({ error: "skillId, code, and name are required" }, { status: 400 })
    }

    // Look up the admin's tenantId
    const admin = await prisma.user.findUnique({
      where: { id: identity.userId },
      select: { tenantId: true },
    })
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 })
    }

    const microSkill = await prisma.microSkill.create({
      data: {
        tenantId: admin.tenantId,
        skillId: String(data.skillId),
        code: String(data.code),
        name: String(data.name),
        description: data.description ? String(data.description) : null,
        learningObjective: data.learningObjective ? String(data.learningObjective) : null,
        difficulty: String(data.difficulty ?? "medium"),
        order: typeof data.order === "number" ? data.order : 0,
      },
    })
    return NextResponse.json({ microSkill }, { status: 201 })
  } catch (error) {
    return apiError(error, "Failed to create micro-skill")
  }
}
