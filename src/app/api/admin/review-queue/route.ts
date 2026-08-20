import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { apiError, apiResponseError, authenticateAdminApi, requireSafeAdminMutationOrigin, writeAdminAuditEvent } from "@/lib/admin-api"

/**
 * GET /api/admin/review-queue
 * Returns questions pending review.
 */
export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const url = new URL(request.url)
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20")))
    const skip = (page - 1) * limit

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where: { qualityStatus: "ready_for_review", isActive: true },
        include: { skill: { select: { name: true, domain: true } } },
        orderBy: { createdAt: "asc" },
        skip,
        take: limit,
      }),
      prisma.question.count({ where: { qualityStatus: "ready_for_review", isActive: true } }),
    ])

    return NextResponse.json({
      questions: questions.map(q => ({
        id: q.id,
        stem: q.stem,
        subject: q.subject,
        domain: q.domain,
        difficulty: q.difficulty,
        format: q.format,
        skillName: q.skill?.name ?? null,
        source: q.source,
        createdAt: q.createdAt.toISOString(),
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    return apiError(error, "Failed to load review queue")
  }
}

/**
 * PATCH /api/admin/review-queue
 * Approve or reject a question.
 */
export async function PATCH(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  try {
    const body = await request.json() as { questionId: string; action: "approve" | "reject" | "quarantine" }
    if (!body.questionId || !body.action) {
      return apiResponseError("questionId and action are required", 400)
    }

    const nextStatus = body.action === "approve" ? "published" : body.action === "quarantine" ? "quarantined" : "archived"
    const versionNextStatus = body.action === "approve" ? "published" : "archived"

    await prisma.question.update({
      where: { id: body.questionId },
      data: { qualityStatus: nextStatus },
    })

    // Update all versions for this question
    await prisma.questionVersion.updateMany({
      where: { questionId: body.questionId },
      data: { qualityStatus: versionNextStatus },
    })

    await writeAdminAuditEvent({
      actorId: identity.userId,
      request,
      action: body.action === "approve" ? "publish" : body.action,
      entityType: "question",
      entityId: body.questionId,
    })

    return NextResponse.json({ success: true, newStatus: nextStatus })
  } catch (error) {
    return apiError(error, "Failed to update review status")
  }
}