import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { apiError, authenticateAdminApi } from "@/lib/admin-api"

export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const url = new URL(request.url)
    const teacherId = url.searchParams.get("teacherId")
    const classId = url.searchParams.get("classId")
    const where: Record<string, unknown> = {}
    if (teacherId) where.teacherId = teacherId
    if (classId) where.classId = classId

    const assignments = await prisma.assignment.findMany({
      where: where as any,
      include: {
        teacher: { select: { name: true, email: true } },
        course: { select: { name: true } },
        items: { include: { skill: { select: { name: true } }, question: { select: { stem: true } } } },
        _count: { select: { studentAssignments: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ assignments, total: assignments.length })
  } catch (error) {
    return apiError(error, "Failed to list assignments")
  }
}

export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const data = await request.json() as Record<string, unknown>
    if (!data.title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })

    const assignment = await prisma.assignment.create({
      data: {
        tenantId: user?.tenantId ?? "",
        teacherId: identity.userId,
        title: String(data.title),
        description: data.description ? String(data.description) : null,
        classId: data.classId ? String(data.classId) : null,
        courseId: data.courseId ? String(data.courseId) : null,
        programId: data.programId ? String(data.programId) : null,
        dueAt: data.dueAt ? new Date(String(data.dueAt)) : null,
        totalQuestions: typeof data.totalQuestions === "number" ? data.totalQuestions : 0,
        mode: String(data.mode ?? "independent"),
        status: String(data.status ?? "draft"),
      },
    })
    return NextResponse.json({ assignment }, { status: 201 })
  } catch (error) {
    return apiError(error, "Failed to create assignment")
  }
}
