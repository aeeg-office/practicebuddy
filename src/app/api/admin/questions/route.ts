import crypto from "crypto"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import {
  apiError,
  apiResponseError,
  authenticateAdminApi,
  pagination,
  requireSafeAdminMutationOrigin,
  writeAdminAuditEvent,
} from "@/lib/admin-api"
import { satReadingWritingQuestions, type SATQuestion } from "@/data/sat-reading-writing"
import { satMathQuestions, type SATMathQuestion } from "@/data/sat-math-questions"
import { mockSkills, type SubjectKey } from "@/data/practice-skills"

/* ───────── Shared types ───────── */

export interface AdminQuestion {
  id: string
  skillId: string | null
  subject: string
  domain: string
  category: string | null
  subcategory: string | null
  difficulty: string
  format: string
  passage: string | null
  stem: string
  options: { id: string; text: string }[]
  correctAnswer: string
  acceptedResponses: string[] | null
  explanation: string | null
  strategy: string | null
  hint: string | null
  estimatedTime: number | null
  calculatorAllowed: boolean | null
  figureUrl: string | null
  source: string | null
  rightsStatus: string | null
  qualityStatus: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

/* ───────── Domain → skill lookups ───────── */

const satRWDomainToSkills: Record<string, string[]> = {
  "Craft & Structure": ["sat-cs-words", "sat-cs-text", "sat-cs-cross"],
  "Information & Ideas": ["sat-ii-central", "sat-ii-inference"],
  "Expression of Ideas": ["sat-ei-transitions", "sat-ei-rhetorical"],
  "Standard English Conventions": ["sec-boundaries", "sec-form"],
}

const satMathDomainToSkills: Record<string, string[]> = {
  Algebra: ["sat-alg-linear", "sat-alg-systems", "sat-alg-inequalities"],
  "Advanced Math": ["sat-adv-expressions", "sat-adv-nonlinear"],
  "Problem Solving & Data Analysis": ["sat-ps-ratios", "sat-ps-percentages", "sat-ps-probability"],
  "Geometry & Trigonometry": ["sat-geo-area", "sat-geo-triangles"],
}

/* ───────── Skill name lookup ───────── */

function getSkillName(subject: string, domain: string, skillId: string | null): string {
  if (!skillId) return ""
  const subjectData = mockSkills[subject as SubjectKey]
  if (!subjectData) return ""
  for (const d of subjectData.domains) {
    const skill = d.skills.find((s) => s.id === skillId)
    if (skill) return skill.name
  }
  return ""
}

function getFirstSkillId(subject: string, domain: string): string | null {
  const map = subject === "sat" || subject === "sat-rw" || subject === "sat-math"
    ? { ...satRWDomainToSkills, ...satMathDomainToSkills }
    : {}
  const skills = map[domain] ?? []
  return skills.length > 0 ? skills[0] : null
}

/* ───────── Validation ───────── */

/** Validate a question payload for create/update */
function validateQuestionPayload(
  data: Record<string, unknown>,
  isUpdate: boolean,
): string | null {
  // Subject-based skill ID matching
  const subject = data.subject ? String(data.subject) : null
  const skillId = data.skillId ? String(data.skillId) : null

  if (subject && skillId) {
    const validPrefixes: Record<string, string[]> = {
      sat: ["sat-", "sec-"],
      act: ["act-"],
      ielts: ["ielts-"],
      toefl: ["toefl-"],
    }
    const prefixes = validPrefixes[subject]
    if (prefixes) {
      const matches = prefixes.some((p) => skillId.startsWith(p))
      if (!matches) {
        return `skillId "${skillId}" is not valid for subject "${subject}". Allowed prefixes: ${prefixes.join(", ")}`
      }
    }
  }

  // Stem must be non-empty
  if (data.stem !== undefined) {
    if (typeof data.stem !== "string" || !data.stem.trim()) {
      return "Stem/question text is required and must be non-empty"
    }
  }

  // Options must be non-empty array with non-empty text
  if (data.options !== undefined) {
    if (!Array.isArray(data.options) || data.options.length === 0) {
      return "At least one option is required"
    }
    const validOptions = (data.options as { id: string; text: string }[]).filter(
      (o) => o.text && typeof o.text === "string" && o.text.trim(),
    )
    if (validOptions.length < 2) {
      return "At least 2 non-empty options are required"
    }
  }

  // correctAnswer must match an option ID
  if (data.correctAnswer !== undefined) {
    const correctAnswer = String(data.correctAnswer).trim()
    if (!correctAnswer) {
      return "correctAnswer is required"
    }
    if (data.options !== undefined && Array.isArray(data.options)) {
      const optionIds = (data.options as { id: string; text: string }[]).map((o) => o.id)
      if (!optionIds.includes(correctAnswer)) {
        return `correctAnswer "${correctAnswer}" must match one of the option IDs: ${optionIds.join(", ")}`
      }
    }
  }

  return null
}

/* ───────── Load questions from TS data files ───────── */

function genreFromId(id: number): string {
  // SAT R&W questions are grouped by passage - we use the domain already
  return "sat"
}

let tsQuestionsLoaded = false
let tsQuestionCache: AdminQuestion[] = []

function loadTSQuestions(): AdminQuestion[] {
  if (tsQuestionsLoaded) return tsQuestionCache

  const result: AdminQuestion[] = []

  // SAT Reading & Writing
  for (const q of satReadingWritingQuestions) {
    const skillIds = satRWDomainToSkills[q.domain] ?? []
    const skillId = skillIds.length > 0 ? skillIds[0] : null
    const subjectData = mockSkills.sat
    const domainData = subjectData.domains.find((d) => d.name.replace(" and ", " & ") === q.domain || d.name === q.domain)
    result.push({
      id: `sat-rw-${q.id}`,
      skillId,
      subject: "sat",
      domain: q.domain,
      category: domainData?.skills.find((s) => s.id === skillId)?.name ?? null,
      subcategory: null,
      difficulty: q.difficulty,
      format: "multiple-choice",
      passage: q.passage ?? null,
      stem: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
      acceptedResponses: null,
      explanation: q.explanation,
      strategy: null,
      hint: null,
      estimatedTime: q.difficulty === "easy" ? 60 : q.difficulty === "hard" ? 120 : 90,
      calculatorAllowed: true,
      figureUrl: null,
      source: "SAT Reading & Writing",
      rightsStatus: "original",
      qualityStatus: "published",
      isActive: true,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    })
  }

  // SAT Math
  for (const q of satMathQuestions) {
    const skillIds = satMathDomainToSkills[q.domain] ?? []
    const skillId = skillIds.length > 0 ? skillIds[0] : null
    const subjectData = mockSkills.sat
    const domainData = subjectData.domains.find((d) => d.name === q.domain)
    result.push({
      id: `sat-math-${q.id}`,
      skillId,
      subject: "sat",
      domain: q.domain,
      category: domainData?.skills.find((s) => s.id === skillId)?.name ?? null,
      subcategory: null,
      difficulty: q.difficulty,
      format: q.isGridIn ? "numeric" : "multiple-choice",
      passage: null,
      stem: q.text,
      options: q.options ?? [],
      correctAnswer: q.correctAnswer,
      acceptedResponses: q.isGridIn ? [q.correctAnswer] : null,
      explanation: q.explanation,
      strategy: null,
      hint: null,
      estimatedTime: q.difficulty === "easy" ? 60 : q.difficulty === "hard" ? 120 : 90,
      calculatorAllowed: q.isGridIn ? null : true,
      figureUrl: null,
      source: "SAT Math",
      rightsStatus: "original",
      qualityStatus: "published",
      isActive: true,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    })
  }

  tsQuestionCache = result
  tsQuestionsLoaded = true
  return result
}

/* ───────── Load DB questions ───────── */

async function loadDBQuestions(): Promise<AdminQuestion[]> {
  try {
    const dbQuestions = await prisma.question.findMany({
      where: { isActive: true },
      orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
    })
    return dbQuestions.map((q) => ({
      id: q.id,
      skillId: q.skillId,
      subject: q.subject,
      domain: q.domain,
      category: q.category,
      subcategory: q.subcategory,
      difficulty: q.difficulty,
      format: q.format,
      passage: q.passage,
      stem: q.stem,
      options: (typeof q.options === "string" ? JSON.parse(q.options) : q.options ?? []) as { id: string; text: string }[],
      correctAnswer: q.correctAnswer,
      acceptedResponses: (typeof q.acceptedResponses === "string" ? JSON.parse(q.acceptedResponses) : q.acceptedResponses) as string[] | null,
      explanation: q.explanation,
      strategy: q.strategy,
      hint: q.hint,
      estimatedTime: q.estimatedTime,
      calculatorAllowed: q.calculatorAllowed,
      figureUrl: q.figureUrl,
      source: q.source,
      rightsStatus: q.rightsStatus,
      qualityStatus: q.qualityStatus,
      isActive: q.isActive,
      createdAt: q.createdAt.toISOString(),
      updatedAt: q.updatedAt.toISOString(),
    }))
  } catch {
    return []
  }
}

/* ───────── Filtering & pagination ───────── */

function filterQuestions(
  questions: AdminQuestion[],
  params: URLSearchParams,
): { items: AdminQuestion[]; total: number } {
  const search = params.get("search")?.trim().toLowerCase()
  const subject = params.get("subject")
  const domain = params.get("domain")
  const skill = params.get("skill")
  const status = params.get("status")
  const difficulty = params.get("difficulty")

  let filtered = [...questions]

  if (search) {
    filtered = filtered.filter(
      (q) =>
        q.id.toLowerCase().includes(search) ||
        q.stem.toLowerCase().includes(search) ||
        q.domain.toLowerCase().includes(search) ||
        q.category?.toLowerCase().includes(search) ||
        q.explanation?.toLowerCase().includes(search),
    )
  }

  if (subject) {
    filtered = filtered.filter((q) => q.subject === subject)
  }

  if (domain) {
    filtered = filtered.filter((q) => q.domain.toLowerCase().includes(domain.toLowerCase()))
  }

  if (skill) {
    filtered = filtered.filter((q) => q.skillId === skill || q.category?.toLowerCase().includes(skill.toLowerCase()))
  }

  if (status) {
    filtered = filtered.filter((q) => q.qualityStatus === status)
  }

  if (difficulty) {
    filtered = filtered.filter((q) => q.difficulty === difficulty)
  }

  return { items: filtered, total: filtered.length }
}

/* ───────── GET /api/admin/questions ───────── */

export async function GET(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity

  try {
    const url = new URL(request.url)
    const { page, limit, skip } = pagination(url.searchParams)

    // Load from TS files and DB
    const tsQuestions = loadTSQuestions()
    const dbQuestions = await loadDBQuestions()

    // Merge: DB questions override TS questions with same ID
    const dbIds = new Set(dbQuestions.map((q) => q.id))
    const merged = [...dbQuestions, ...tsQuestions.filter((q) => !dbIds.has(q.id))]

    // Filter
    const { items: filtered, total } = filterQuestions(merged, url.searchParams)

    // Paginate
    const paginated = filtered.slice(skip, skip + limit)

    // Enrich with skill name
    const items = paginated.map((q) => ({
      ...q,
      skillName: getSkillName(q.subject, q.domain, q.skillId),
    }))

    return NextResponse.json({
      questions: items,
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    })
  } catch (error) {
    return apiError(error, "Failed to list questions")
  }
}

/* ───────── POST /api/admin/questions ───────── */

export async function POST(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let data: Record<string, unknown>
  try {
    data = await request.json() as Record<string, unknown>
  } catch {
    return apiResponseError("Invalid JSON body", 400)
  }

  // Validate required fields
  const validationError = validateQuestionPayload(data, false)
  if (validationError) {
    return apiResponseError(validationError, 400)
  }

  // Ensure stem, options, correctAnswer are present (already validated above)
  if (!data.stem || typeof data.stem !== "string" || !data.stem.trim()) {
    return apiResponseError("stem is required", 400)
  }
  if (!data.options || !Array.isArray(data.options) || data.options.length === 0) {
    return apiResponseError("At least one option is required", 400)
  }
  if (!data.correctAnswer || typeof data.correctAnswer !== "string" || !data.correctAnswer.trim()) {
    return apiResponseError("correctAnswer is required", 400)
  }
  if (!data.subject || typeof data.subject !== "string") {
    return apiResponseError("subject is required", 400)
  }
  if (!data.domain || typeof data.domain !== "string") {
    return apiResponseError("domain is required", 400)
  }

  try {
    const hash = crypto.createHash('sha256').update(String(data.stem).trim() + String(data.correctAnswer).trim()).digest('hex')
    const admin = await prisma.user.findUnique({ where: { id: identity.userId }, select: { tenantId: true } })
    const question = await prisma.question.create({
      data: {
        tenantId: admin?.tenantId ?? "",
        hash,
        subject: String(data.subject),
        domain: String(data.domain),
        category: data.category ? String(data.category) : null,
        subcategory: data.subcategory ? String(data.subcategory) : null,
        difficulty: String(data.difficulty ?? "medium"),
        format: String(data.format ?? "multiple-choice"),
        passage: data.passage ? String(data.passage) : null,
        stem: String(data.stem).trim(),
        options: JSON.stringify(data.options),
        correctAnswer: String(data.correctAnswer).trim(),
        acceptedResponses: data.acceptedResponses ? JSON.stringify(data.acceptedResponses) : null,
        explanation: data.explanation ? String(data.explanation) : null,
        strategy: data.strategy ? String(data.strategy) : null,
        hint: data.hint ? String(data.hint) : null,
        estimatedTime: typeof data.estimatedTime === "number" ? data.estimatedTime : null,
        calculatorAllowed: typeof data.calculatorAllowed === "boolean" ? data.calculatorAllowed : null,
        figureUrl: data.figureUrl ? String(data.figureUrl) : null,
        source: data.source ? String(data.source) : null,
        rightsStatus: String(data.rightsStatus ?? "original"),
        qualityStatus: String(data.qualityStatus ?? "draft"),
        skillId: data.skillId ? String(data.skillId) : null,
        isActive: true,
      },
    })

    await writeAdminAuditEvent({
      actorId: identity.userId,
      request,
      action: "create",
      entityType: "question",
      entityId: question.id,
      metadata: { subject: question.subject, domain: question.domain },
    })

    // Auto-create QuestionVersion 1
    const versionHash = crypto.createHash('sha256')
      .update(`${question.stem}:${question.correctAnswer}:${question.options || ''}`)
      .digest('hex')
    await prisma.questionVersion.create({
      data: {
        tenantId: question.tenantId,
        questionId: question.id,
        versionNumber: 1,
        stem: question.stem,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        strategy: question.strategy,
        difficulty: question.difficulty,
        format: question.format,
        passage: question.passage,
        acceptedResponses: question.acceptedResponses,
        questionType: question.format,
        contentHash: versionHash,
        qualityStatus: question.qualityStatus === "published" ? "published" : "draft",
        publishedAt: question.qualityStatus === "published" ? new Date() : null,
        createdBy: identity.userId,
      },
    })

    return NextResponse.json({ question }, { status: 201 })
  } catch (error) {
    return apiError(error, "Failed to create question")
  }
}

/* ───────── PUT /api/admin/questions ───────── */

export async function PUT(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return apiResponseError("Invalid JSON body", 400)
  }

  if (typeof body.id !== "string" || !body.id.trim()) {
    return apiResponseError("id is required", 400)
  }

  const id = body.id.trim()

  // Validate payload for all saves
  const validationError = validateQuestionPayload(body, true)
  if (validationError) {
    return apiResponseError(validationError, 400)
  }

  // Validate required fields for publishing
  if (body.qualityStatus === "published") {
    if (!body.stem || typeof body.stem !== "string" || !String(body.stem).trim()) {
      return apiResponseError("Cannot publish: stem is required", 400)
    }
    if (!body.options || !Array.isArray(body.options) || body.options.length === 0) {
      return apiResponseError("Cannot publish: at least one option is required", 400)
    }
    if (!body.correctAnswer || typeof body.correctAnswer !== "string" || !String(body.correctAnswer).trim()) {
      return apiResponseError("Cannot publish: correctAnswer is required", 400)
    }
  }

  try {
    const existing = await prisma.question.findUnique({ where: { id } })
    if (!existing) {
      return apiResponseError("Question not found", 404)
    }

    const updateData: Record<string, unknown> = {}

    if (body.subject !== undefined) updateData.subject = String(body.subject)
    if (body.domain !== undefined) updateData.domain = String(body.domain)
    if (body.category !== undefined) updateData.category = body.category ? String(body.category) : null
    if (body.subcategory !== undefined) updateData.subcategory = body.subcategory ? String(body.subcategory) : null
    if (body.difficulty !== undefined) updateData.difficulty = String(body.difficulty)
    if (body.format !== undefined) updateData.format = String(body.format)
    if (body.passage !== undefined) updateData.passage = body.passage ? String(body.passage) : null
    if (body.stem !== undefined) updateData.stem = String(body.stem).trim()
    if (body.options !== undefined) updateData.options = JSON.stringify(body.options)
    if (body.correctAnswer !== undefined) updateData.correctAnswer = String(body.correctAnswer).trim()
    if (body.acceptedResponses !== undefined) {
      updateData.acceptedResponses = body.acceptedResponses ? JSON.stringify(body.acceptedResponses) : null
    }
    if (body.explanation !== undefined) updateData.explanation = body.explanation ? String(body.explanation) : null
    if (body.strategy !== undefined) updateData.strategy = body.strategy ? String(body.strategy) : null
    if (body.hint !== undefined) updateData.hint = body.hint ? String(body.hint) : null
    if (body.estimatedTime !== undefined) updateData.estimatedTime = typeof body.estimatedTime === "number" ? body.estimatedTime : null
    if (body.calculatorAllowed !== undefined) updateData.calculatorAllowed = typeof body.calculatorAllowed === "boolean" ? body.calculatorAllowed : null
    if (body.figureUrl !== undefined) updateData.figureUrl = body.figureUrl ? String(body.figureUrl) : null
    if (body.source !== undefined) updateData.source = body.source ? String(body.source) : null
    if (body.rightsStatus !== undefined) updateData.rightsStatus = String(body.rightsStatus)
    if (body.qualityStatus !== undefined) updateData.qualityStatus = String(body.qualityStatus)
    if (body.skillId !== undefined) updateData.skillId = body.skillId ? String(body.skillId) : null
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive)

    if (Object.keys(updateData).length === 0) {
      return apiResponseError("At least one field to update is required", 400)
    }

    const question = await prisma.question.update({ where: { id }, data: updateData })

    // If content changed, create a new QuestionVersion
    const contentFields = ['stem', 'options', 'correctAnswer', 'explanation', 'strategy', 'passage', 'difficulty', 'format', 'acceptedResponses']
    const hasContentChange = contentFields.some(f => f in updateData)
    if (hasContentChange) {
      const newVersion = (existing.version || 1) + 1
      await prisma.question.update({ where: { id }, data: { version: newVersion } })
      const versionHash = crypto.createHash('sha256')
        .update(`${updateData.stem ?? existing.stem}:${updateData.correctAnswer ?? existing.correctAnswer}:${JSON.stringify(updateData.options ?? (existing.options ? JSON.parse(existing.options) : ''))}`)
        .digest('hex')
      await prisma.questionVersion.create({
        data: {
          tenantId: existing.tenantId,
          questionId: id,
          versionNumber: newVersion,
          stem: String(updateData.stem ?? existing.stem),
          options: JSON.stringify(updateData.options ?? (existing.options ? JSON.parse(existing.options) : [])),
          correctAnswer: String(updateData.correctAnswer ?? existing.correctAnswer),
          explanation: updateData.explanation !== undefined ? String(updateData.explanation) : existing.explanation,
          strategy: updateData.strategy !== undefined ? String(updateData.strategy) : existing.strategy,
          difficulty: String(updateData.difficulty ?? existing.difficulty),
          format: String(updateData.format ?? existing.format),
          passage: updateData.passage !== undefined ? String(updateData.passage) : existing.passage,
          acceptedResponses: updateData.acceptedResponses !== undefined ? String(updateData.acceptedResponses) : existing.acceptedResponses,
          questionType: String(updateData.format ?? existing.format),
          contentHash: versionHash,
          qualityStatus: String(updateData.qualityStatus ?? existing.qualityStatus) === "published" ? "published" : "draft",
          publishedAt: String(updateData.qualityStatus ?? existing.qualityStatus) === "published" ? new Date() : null,
          createdBy: identity.userId,
        },
      })
    }

    await writeAdminAuditEvent({
      actorId: identity.userId,
      request,
      action: "update",
      entityType: "question",
      entityId: question.id,
      metadata: { fields: Object.keys(updateData) },
    })

    return NextResponse.json({ question })
  } catch (error) {
    return apiError(error, "Failed to update question")
  }
}

/* ───────── DELETE /api/admin/questions ───────── */

export async function DELETE(request: Request) {
  const identity = await authenticateAdminApi(request)
  if (identity instanceof NextResponse) return identity
  const originFailure = requireSafeAdminMutationOrigin(request)
  if (originFailure) return originFailure

  const url = new URL(request.url)
  const id = url.searchParams.get("id")

  if (!id || !id.trim()) {
    return apiResponseError("id query parameter is required", 400)
  }

  try {
    const existing = await prisma.question.findUnique({ where: { id: id.trim() } })
    if (!existing) {
      return apiResponseError("Question not found", 404)
    }

    // Soft-delete: set isActive to false and qualityStatus to "archived"
    const question = await prisma.question.update({
      where: { id: id.trim() },
      data: { isActive: false, qualityStatus: "archived" },
    })

    await writeAdminAuditEvent({
      actorId: identity.userId,
      request,
      action: "archive",
      entityType: "question",
      entityId: question.id,
    })

    return NextResponse.json({ question })
  } catch (error) {
    return apiError(error, "Failed to archive question")
  }
}