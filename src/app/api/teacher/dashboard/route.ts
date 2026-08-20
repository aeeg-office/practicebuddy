import { NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { getJwtSecret } from "@/lib/auth-server"

/**
 * GET /api/teacher/dashboard
 * Returns real teacher dashboard data from the database.
 */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    const payload = jwt.verify(authHeader.split(" ")[1], getJwtSecret()) as { userId: string; role: string }
    if (payload.role !== "teacher" && payload.role !== "admin" && payload.role !== "school_admin") {
      return NextResponse.json({ error: "Teacher or admin access required" }, { status: 403 })
    }

    // Get courses the teacher teaches via enrollment
    const teacherUser = await prisma.user.findUnique({ where: { id: payload.userId } })
    if (!teacherUser) return NextResponse.json({ error: "User not found" }, { status: 404 })

    // Get courses
    const courses = await prisma.course.findMany({
      where: { tenantId: teacherUser.tenantId, isActive: true },
    })

    // Get enrollments for these courses
    const courseIds = courses.map(c => c.id)
    const enrollments = await prisma.enrollment.findMany({
      where: { courseId: { in: courseIds }, isActive: true },
      include: { user: { select: { id: true, name: true, email: true } } },
    })

    // Get assignments created by this teacher
    const assignments = await prisma.assignment.findMany({
      where: { teacherId: payload.userId },
      include: {
        course: { select: { name: true } },
        _count: { select: { studentAssignments: true, items: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    })

    // Calculate stats
    const totalStudents = enrollments.length
    const activeAssignments = assignments.filter(a => a.status === "published").length
    const totalAssignments = assignments.length

    return NextResponse.json({
      stats: {
        totalStudents,
        activeAssignments,
        totalAssignments,
        totalCourses: courses.length,
      },
      courses: courses.map(c => ({
        id: c.id,
        name: c.name,
        code: c.code,
        enrollmentCount: enrollments.filter(e => e.courseId === c.id).length,
      })),
      recentAssignments: assignments.map(a => ({
        id: a.id,
        title: a.title,
        courseName: a.course?.name ?? null,
        status: a.status,
        studentCount: a._count.studentAssignments,
        itemCount: a._count.items,
        dueAt: a.dueAt?.toISOString() ?? null,
        createdAt: a.createdAt.toISOString(),
      })),
      students: enrollments.map(e => ({
        id: e.user.id,
        name: e.user.name || e.user.email,
        email: e.user.email,
        courseId: e.courseId,
      })),
    })
  } catch (error) {
    console.error("Teacher API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}