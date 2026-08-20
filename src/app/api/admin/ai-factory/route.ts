import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { apiError, authenticateAdminApi } from "@/lib/admin-api"
import { assessInventoryGaps, runGenerationPipeline } from "@/lib/ai-factory"

/**
 * GET /api/admin/ai-factory
 * Returns inventory gaps and factory status.
 */
export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const user = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const url = new URL(request.url)
    const action = url.searchParams.get("action")

    if (action === "gaps") {
      const gaps = await assessInventoryGaps(user.tenantId)
      return NextResponse.json({ gaps, total: gaps.length })
    }

    // Return factory status
    const pendingReview = await prisma.question.count({
      where: { tenantId: user.tenantId, qualityStatus: "ready_for_review", isActive: true },
    })
    const published = await prisma.question.count({
      where: { tenantId: user.tenantId, qualityStatus: "published", isActive: true },
    })
    const draft = await prisma.question.count({
      where: { tenantId: user.tenantId, qualityStatus: "draft", isActive: true },
    })
    const goldCount = await prisma.goldQuestion.count({
      where: { tenantId: user.tenantId, goldStatus: "certified" },
    })

    return NextResponse.json({
      stats: { pendingReview, published, draft, goldCount, total: pendingReview + published + draft },
      status: "idle",
    })
  } catch (error) {
    return apiError(error, "Failed to load AI Factory status")
  }
}

/**
 * POST /api/admin/ai-factory
 * Triggers generation pipeline.
 */
export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const user = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const body = await request.json() as { skillId?: string; microSkillId?: string; count?: number; difficulty?: string }
    if (!body.skillId) {
      return NextResponse.json({ error: "skillId is required" }, { status: 400 })
    }

    // Run generation pipeline (synchronous for now; async with queue in production)
    const result = await runGenerationPipeline({
      skillId: body.skillId,
      microSkillId: body.microSkillId ?? null,
      count: body.count || 10,
      difficulty: body.difficulty,
      tenantId: user.tenantId,
    })

    return NextResponse.json({
      message: `Generated ${result.created} questions, ${result.rejected} rejected`,
      created: result.created,
      rejected: result.rejected,
      errors: result.errors.slice(0, 10),
    })
  } catch (error) {
    return apiError(error, "AI Factory generation failed")
  }
}