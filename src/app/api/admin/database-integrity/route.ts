import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import {
  apiError,
  apiResponseError,
  authenticateAdminApi,
  requireSafeAdminMutationOrigin,
  writeAdminAuditEvent,
} from "@/lib/admin-api"

/* ───────── GET /api/admin/database-integrity ───────── */

export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const [
      questionCountByStatus,
      missingStem,
      missingOptions,
      missingCorrectAnswer,
      missingExplanation,
      placeholderQuestions,
      orphanQuestions,
      attemptsWithNoValidQuestion,
      duplicateCandidates,
      userCount,
      attemptCount,
      skillCount,
      orphanSkills,
    ] = await Promise.all([
      // Question count by status
      prisma.question.groupBy({
        by: ["qualityStatus"],
        _count: { id: true },
        where: { isActive: true },
      }),

      // Missing stems
      prisma.question.count({
        where: { isActive: true, stem: "" },
      }),

      // Missing options (null or empty array)
      prisma.question.count({
        where: {
          isActive: true,
          OR: [
            { options: null },
            { options: "[]" },
            { options: '""' },
          ],
        },
      }),

      // Missing correctAnswer
      prisma.question.count({
        where: { isActive: true, correctAnswer: "" },
      }),

      // Missing explanation
      prisma.question.count({
        where: { isActive: true, explanation: null },
      }),

      // Placeholder content detection
      prisma.question.findMany({
        where: {
          isActive: true,
          OR: [
            { stem: { startsWith: "[PLACEHOLDER]" } },
            { stem: { contains: "[PLACEHOLDER]" } },
            { stem: { contains: "placeholder" } },
            { stem: { contains: "TODO" } },
            { stem: { contains: "lorem ipsum" } },
          ],
        },
        select: {
          id: true,
          stem: true,
          subject: true,
          domain: true,
          qualityStatus: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),

      // Orphan questions (no skillId)
      prisma.question.count({
        where: { isActive: true, skillId: null },
      }),

      // Attempts with no valid question reference
      prisma.studentAttempt.count({
        where: { questionId: "" },
      }),

      // Duplicate question candidates (same stem + subject)
      prisma.$queryRawUnsafe(
        `SELECT stem, subject, COUNT(*)::int as count, ARRAY_AGG(id::text) as ids
         FROM "questions"
         WHERE "questionStatus" = 'active' AND stem != ''
         GROUP BY stem, subject
         HAVING COUNT(*) > 1
         ORDER BY count DESC
         LIMIT 50`,
      ),
      prisma.user.count({ where: { isActive: true } }),

      // Attempt count
      prisma.studentAttempt.count(),

      // Skill count
      prisma.skill.count({ where: { isActive: true } }),

      // Orphan skills (no questions)
      prisma.skill.count({
        where: {
          isActive: true,
          questions: { none: { isActive: true } },
        },
      }),
    ])

    // Build status map with all expected keys
    const statusMap: Record<string, number> = {
      draft: 0,
      review: 0,
      published: 0,
      archived: 0,
      quarantined: 0,
    }
    for (const row of questionCountByStatus) {
      const key = row.qualityStatus ?? "unknown"
      statusMap[key] = row._count.id
    }

    // Parse duplicate candidates into serializable form
    const duplicates = (duplicateCandidates as unknown as { stem: string; subject: string; count: bigint; ids: string[] }[]).map(
      (row) => ({
        stem: row.stem.slice(0, 200),
        subject: row.subject,
        count: Number(row.count),
        ids: row.ids,
      })
    )

    return NextResponse.json({
      questionCountByStatus: statusMap,
      integrityIssues: {
        missingStem,
        missingOptions,
        missingCorrectAnswer,
        missingExplanation,
        placeholderCount: placeholderQuestions.length,
      },
      placeholderQuestions: placeholderQuestions.map((q) => ({
        id: q.id,
        stem: q.stem.slice(0, 200),
        subject: q.subject,
        domain: q.domain,
        qualityStatus: q.qualityStatus,
        createdAt: q.createdAt.toISOString(),
      })),
      orphans: {
        questionsWithNoSkill: orphanQuestions,
        attemptsWithNoQuestion: attemptsWithNoValidQuestion,
        orphanSkills,
      },
      duplicates,
      counts: {
        activeUsers: userCount,
        totalAttempts: attemptCount,
        totalSkills: skillCount,
      },
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    return apiError(error, "Failed to load database integrity metrics")
  }
}

/* ───────── POST /api/admin/database-integrity ───────── */

export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let body: { action?: string; questionIds?: string[] }
  try {
    body = (await request.json()) as { action?: string; questionIds?: string[] }
  } catch {
    return apiResponseError("Invalid JSON body", 400)
  }

  if (body.action !== "quarantine") {
    return apiResponseError("Unknown action. Use action: 'quarantine'", 400)
  }

  if (!body.questionIds || !Array.isArray(body.questionIds) || body.questionIds.length === 0) {
    return apiResponseError("questionIds array is required", 400)
  }

  try {
    const result = await prisma.question.updateMany({
      where: { id: { in: body.questionIds } },
      data: { qualityStatus: "quarantined" },
    })

    await writeAdminAuditEvent({
      actorId: identity.userId,
      request,
      action: "bulk_quarantine",
      entityType: "question",
      metadata: { count: result.count, ids: body.questionIds },
    })

    return NextResponse.json({
      quarantined: result.count,
      message: `Successfully quarantined ${result.count} question(s)`,
    })
  } catch (error) {
    return apiError(error, "Failed to quarantine questions")
  }
}