import crypto from "crypto"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import {
  apiError,
  apiResponseError,
  authenticateAdminApi,
  requireSafeAdminMutationOrigin,
  writeAdminAuditEvent,
} from "@/lib/admin-api"

/* ───────── Types ───────── */

interface ImportQuestion {
  stem: string
  options: { id: string; text: string }[]
  correctAnswer: string
  subject: string
  domain: string
  category?: string
  subcategory?: string
  difficulty?: string
  format?: string
  passage?: string | null
  explanation?: string | null
  strategy?: string | null
  hint?: string | null
  estimatedTime?: number | null
  calculatorAllowed?: boolean | null
  figureUrl?: string | null
  source?: string | null
  rightsStatus?: string | null
  qualityStatus?: string | null
  skillId?: string | null
  acceptedResponses?: string[] | null
}

interface ValidationIssue {
  index: number
  field: string
  reason: string
}

const REQUIRED_FIELDS = ["stem", "options", "correctAnswer", "subject", "domain"] as const

/* ───────── Validation ───────── */

function validateQuestion(question: unknown, index: number): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  if (!question || typeof question !== "object") {
    return [{ index, field: "root", reason: "Question must be an object" }]
  }

  const q = question as Record<string, unknown>

  for (const field of REQUIRED_FIELDS) {
    const value = q[field]
    if (value === undefined || value === null) {
      issues.push({ index, field, reason: `${field} is required` })
      continue
    }

    switch (field) {
      case "stem":
        if (typeof value !== "string" || !String(value).trim()) {
          issues.push({ index, field, reason: "stem must be a non-empty string" })
        }
        break
      case "options":
        if (!Array.isArray(value) || value.length === 0) {
          issues.push({ index, field, reason: "options must be a non-empty array" })
        } else {
          for (let i = 0; i < value.length; i++) {
            const opt = value[i]
            if (!opt || typeof opt !== "object" || typeof opt.id !== "string" || typeof opt.text !== "string") {
              issues.push({ index, field: `options[${i}]`, reason: "Each option must have an id (string) and text (string)" })
            }
          }
        }
        break
      case "correctAnswer":
        if (typeof value !== "string" || !String(value).trim()) {
          issues.push({ index, field, reason: "correctAnswer must be a non-empty string" })
        }
        break
      case "subject":
        if (typeof value !== "string" || !String(value).trim()) {
          issues.push({ index, field, reason: "subject must be a non-empty string" })
        }
        break
      case "domain":
        if (typeof value !== "string" || !String(value).trim()) {
          issues.push({ index, field, reason: "domain must be a non-empty string" })
        }
        break
    }
  }

  // correctAnswer must reference one of the option ids
  if (
    q.options &&
    Array.isArray(q.options) &&
    q.options.length > 0 &&
    typeof q.correctAnswer === "string"
  ) {
    const optionIds = q.options.map((o: { id: string }) => o.id)
    if (!optionIds.includes(q.correctAnswer)) {
      issues.push({
        index,
        field: "correctAnswer",
        reason: `correctAnswer "${q.correctAnswer}" does not match any option id: [${optionIds.join(", ")}]`,
      })
    }
  }

  return issues
}

function normalizeQuestion(q: ImportQuestion, tenantId: string) {
  const hash = crypto.createHash('sha256').update(String(q.stem).trim() + String(q.correctAnswer).trim()).digest('hex')
  return {
    tenantId,
    hash,
    subject: String(q.subject).trim(),
    domain: String(q.domain).trim(),
    category: q.category ? String(q.category) : null,
    subcategory: q.subcategory ? String(q.subcategory) : null,
    difficulty: String(q.difficulty ?? "medium"),
    format: String(q.format ?? "multiple-choice"),
    passage: q.passage ? String(q.passage) : null,
    stem: String(q.stem).trim(),
    options: JSON.stringify(q.options),
    correctAnswer: String(q.correctAnswer).trim(),
    acceptedResponses: q.acceptedResponses && q.acceptedResponses.length > 0 ? JSON.stringify(q.acceptedResponses) : null,
    explanation: q.explanation ? String(q.explanation) : null,
    strategy: q.strategy ? String(q.strategy) : null,
    hint: q.hint ? String(q.hint) : null,
    estimatedTime: typeof q.estimatedTime === "number" ? q.estimatedTime : null,
    calculatorAllowed: typeof q.calculatorAllowed === "boolean" ? q.calculatorAllowed : null,
    figureUrl: q.figureUrl ? String(q.figureUrl) : null,
    source: q.source ? String(q.source) : null,
    rightsStatus: String(q.rightsStatus ?? "original"),
    qualityStatus: String(q.qualityStatus ?? "draft"),
    skillId: q.skillId ? String(q.skillId) : null,
    isActive: true,
  }
}

/* ───────── POST /api/admin/questions/import ───────── */

export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return apiResponseError("Invalid JSON body", 400)
  }

  if (!Array.isArray(body)) {
    return apiResponseError("Request body must be a JSON array of questions", 400)
  }

  if (body.length === 0) {
    return apiResponseError("No questions provided — the array is empty", 400)
  }

  // Validate every question first
  const issues: ValidationIssue[] = []
  const validQuestions: ImportQuestion[] = []

  for (let i = 0; i < body.length; i++) {
    const itemIssues = validateQuestion(body[i], i)
    if (itemIssues.length > 0) {
      issues.push(...itemIssues)
    } else {
      validQuestions.push(body[i] as ImportQuestion)
    }
  }

  const importedIds: string[] = []

  // Import only the valid questions
  try {
    const admin = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const tenantId = admin?.tenantId
    if (!tenantId) return apiResponseError("Admin has no tenant", 403)
    for (const q of validQuestions) {
      const created = await prisma.question.create({ data: normalizeQuestion(q, tenantId) })
      importedIds.push(created.id)
    }
  } catch (error) {
    // If a mid-batch insert fails, surface what we know and the failure
    return apiError(error, `Failed to import questions (${importedIds.length} imported before failure)`)
  }

  await writeAdminAuditEvent({
    actorId: identity.userId,
    request,
    action: "bulk-import",
    entityType: "question",
    metadata: {
      submitted: body.length,
      imported: importedIds.length,
      rejected: issues.length > 0 ? body.length - importedIds.length : 0,
      importedIds,
    },
  })

  return NextResponse.json(
    {
      imported: importedIds.length,
      rejected: issues.length > 0 ? body.length - importedIds.length : 0,
      errors: issues,
      importedIds,
    },
    { status: importedIds.length > 0 ? 201 : 200 },
  )
}