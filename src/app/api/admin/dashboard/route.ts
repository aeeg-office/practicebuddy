import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { authenticateAdminApi, apiError } from "@/lib/admin-api"

/**
 * GET /api/admin/dashboard
 * Returns real admin dashboard KPIs from the database, tenant-scoped to the
 * authenticated administrator. Replaces the previously-missing route (404).
 */
export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const adminUser = await prisma.user.findUnique({
      where: { id: identity.userId },
      select: { tenantId: true },
    })
    const tenantId = adminUser?.tenantId ?? ""

    const [
      totalUsers,
      totalStudents,
      totalTeachers,
      totalQuestions,
      totalSkills,
      totalCourses,
      totalExams,
      totalAttempts,
      pendingReview,
      totalPayments,
      paidAmount,
    ] = await Promise.all([
      prisma.user.count({ where: { tenantId } }),
      prisma.user.count({ where: { tenantId, role: "student" } }),
      prisma.teacher.count({ where: { tenantId } }),
      prisma.question.count({ where: { tenantId, isActive: true } }),
      prisma.skill.count({ where: { grade: { program: { tenantId } } } }),
      prisma.course.count({ where: { tenantId } }),
      prisma.exam.count({ where: { tenantId } }),
      prisma.studentAttempt.count({ where: { tenantId } }),
      prisma.question.count({ where: { tenantId, qualityStatus: "review" } }),
      prisma.payment.count({ where: { user: { tenantId } } }),
      prisma.payment.aggregate({ where: { user: { tenantId }, status: "paid" }, _sum: { amount: true } }),
    ])

    return NextResponse.json({
      ok: true,
      dashboard: {
        users: { total: totalUsers, students: totalStudents, teachers: totalTeachers },
        content: { questions: totalQuestions, skills: totalSkills, courses: totalCourses, exams: totalExams },
        activity: { attempts: totalAttempts },
        review: { pending: pendingReview },
        payments: { count: totalPayments, paidAmount: paidAmount._sum?.amount?.toString() ?? "0" },
      },
    })
  } catch (error) {
    return apiError(error, "Failed to load admin dashboard")
  }
}