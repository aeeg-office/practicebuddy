/**
 * AI Question Factory — Async Generation Pipeline
 * 
 * Pipeline: Need Assessment → Generate → Deterministic Validation →
 *           Duplicate Detection → Independent AI Validation → Human Review → Publish
 * 
 * AI is NEVER a runtime dependency for student practice.
 * Generation runs asynchronously, ahead of demand.
 */

import prisma from "@/lib/prisma"
import crypto from "crypto"

// ─── Types ───

export interface GenerationRequest {
  skillId: string
  microSkillId?: string | null
  count: number
  difficulty?: string
  questionType?: string
  tenantId: string
}

export interface GeneratedQuestion {
  stem: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  strategy?: string
  difficulty: string
  domain: string
  subject: string
  format: string
}

export interface ValidationResult {
  passed: boolean
  errors: string[]
  warnings: string[]
}

export interface DedupResult {
  isDuplicate: boolean
  duplicateOfId?: string
  similarity?: number
  method: "exact" | "structural" | "semantic"
}

// ─── Inventory Gap Detection ───

export interface InventoryGap {
  skillId: string
  microSkillId: string | null
  skillName: string
  domain: string
  subject: string
  currentCount: number
  targetCount: number
  deficit: number
  difficulty: string
  questionTypes: string[]
}

/**
 * Assess inventory gaps by skill/micro-skill.
 * Target: 10 gold questions per micro-skill, 50+ total per skill.
 */
export async function assessInventoryGaps(tenantId: string): Promise<InventoryGap[]> {
  const skills = await prisma.skill.findMany({
    where: { isActive: true },
    include: {
      grade: { include: { program: true } },
      microSkills: { where: { isActive: true } },
      _count: { select: { questions: true } },
    },
  })

  const gaps: InventoryGap[] = []

  for (const skill of skills) {
    const currentCount = skill._count.questions
    const targetCount = 50
    const deficit = Math.max(0, targetCount - currentCount)

    if (deficit > 0) {
      gaps.push({
        skillId: skill.id,
        microSkillId: null,
        skillName: skill.name,
        domain: skill.domain,
        subject: skill.subject,
        currentCount,
        targetCount,
        deficit,
        difficulty: skill.difficulty,
        questionTypes: ["multiple-choice", "numeric"],
      })
    }

    // Check micro-skill level (10 per micro-skill)
    for (const ms of skill.microSkills) {
      const msCount = await prisma.question.count({
        where: { microSkillId: ms.id, isActive: true },
      })
      const msDeficit = Math.max(0, 10 - msCount)
      if (msDeficit > 0) {
        gaps.push({
          skillId: skill.id,
          microSkillId: ms.id,
          skillName: `${skill.name} → ${ms.name}`,
          domain: skill.domain,
          subject: skill.subject,
          currentCount: msCount,
          targetCount: 10,
          deficit: msDeficit,
          difficulty: ms.difficulty,
          questionTypes: ["multiple-choice"],
        })
      }
    }
  }

  return gaps.sort((a, b) => b.deficit - a.deficit)
}

// ─── Deterministic Validation ───

export function validateQuestion(q: GeneratedQuestion): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Schema validity
  if (!q.stem || q.stem.trim().length < 5) {
    errors.push("Stem must be at least 5 characters")
  }
  if (!q.options || q.options.length < 2) {
    errors.push("At least 2 options required")
  }
  if (!q.correctAnswer) {
    errors.push("correctAnswer is required")
  }

  // Check correctAnswer is in options
  if (q.options && q.options.length > 0 && q.correctAnswer) {
    const optionIds = q.options.map(o => o.id)
    if (!optionIds.includes(q.correctAnswer)) {
      errors.push(`correctAnswer "${q.correctAnswer}" must match an option ID: [${optionIds.join(", ")}]`)
    }
  }

  // Option text quality
  if (q.options) {
    const emptyOptions = q.options.filter(o => !o.text || o.text.trim().length < 2)
    if (emptyOptions.length > 0) {
      errors.push(`${emptyOptions.length} option(s) have empty or too-short text`)
    }
    // Check for duplicate option texts
    const texts = q.options.map(o => o.text.trim().toLowerCase())
    const uniqueTexts = new Set(texts)
    if (uniqueTexts.size !== texts.length) {
      errors.push("Duplicate option text detected")
    }
    // Check for answer leakage in options
    if (q.correctAnswer) {
      const correctOption = q.options.find(o => o.id === q.correctAnswer)
      if (correctOption && texts.filter(t => t === correctOption.text.trim().toLowerCase()).length > 1) {
        warnings.push("Correct answer appears in multiple options")
      }
    }
  }

  // Explanation required
  if (!q.explanation || q.explanation.trim().length < 10) {
    warnings.push("Explanation is short or missing")
  }

  // Check supported format
  const supportedFormats = ["multiple-choice", "numeric", "multiple-answer", "typed", "fill-in-blank"]
  if (!supportedFormats.includes(q.format)) {
    errors.push(`Unsupported format: ${q.format}. Supported: ${supportedFormats.join(", ")}`)
  }

  return { passed: errors.length === 0, errors, warnings }
}

// ─── Duplicate Detection ───

export async function checkDuplicates(
  stem: string,
  correctAnswer: string,
  tenantId: string,
): Promise<DedupResult | null> {
  // Layer 1: Exact hash match
  const hash = crypto.createHash("sha256")
    .update(`${stem.trim().toLowerCase()}:${correctAnswer.trim().toLowerCase()}`)
    .digest("hex")

  const exact = await prisma.question.findFirst({
    where: { hash, tenantId, isActive: true },
    select: { id: true },
  })
  if (exact) {
    return { isDuplicate: true, duplicateOfId: exact.id, method: "exact", similarity: 1.0 }
  }

  // Layer 2: Structural (normalized text comparison)
  const normalizedStem = stem.trim().toLowerCase().replace(/\s+/g, " ")
  const allQuestions = await prisma.question.findMany({
    where: { tenantId, isActive: true },
    select: { id: true, stem: true, correctAnswer: true },
    take: 100,
  })

  for (const q of allQuestions) {
    const qNormalized = q.stem.trim().toLowerCase().replace(/\s+/g, " ")
    if (normalizedStem === qNormalized && correctAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
      return { isDuplicate: true, duplicateOfId: q.id, method: "structural", similarity: 1.0 }
    }
    // Check Jaccard similarity for partial matches
    const words1 = new Set(normalizedStem.split(" "))
    const words2 = new Set(qNormalized.split(" "))
    const intersection = new Set([...words1].filter(w => words2.has(w)))
    const union = new Set([...words1, ...words2])
    const similarity = intersection.size / union.size
    if (similarity > 0.85) {
      return { isDuplicate: true, duplicateOfId: q.id, method: "structural", similarity }
    }
  }

  return null
}

// ─── Generate with AI Provider ───

export async function generateQuestionsWithAI(
  request: GenerationRequest,
  goldQuestions: { stem: string; options: string; correctAnswer: string; explanation: string }[],
): Promise<GeneratedQuestion[]> {
  const openRouterKey = process.env.OPENROUTER_API_KEY
  if (!openRouterKey) {
    throw new Error("OPENROUTER_API_KEY not configured")
  }

  const skill = await prisma.skill.findUnique({
    where: { id: request.skillId },
    include: { grade: { include: { program: true } } },
  })
  if (!skill) throw new Error(`Skill ${request.skillId} not found`)

  const goldExamples = goldQuestions.slice(0, 3).map(gq => ({
    stem: gq.stem,
    options: typeof gq.options === "string" ? JSON.parse(gq.options) : gq.options,
    correctAnswer: gq.correctAnswer,
    explanation: gq.explanation,
  }))

  const prompt = `Generate ${request.count} multiple-choice practice questions for the following educational skill.

Skill: ${skill.name}
Subject: ${skill.subject}
Domain: ${skill.domain}
Difficulty: ${request.difficulty || skill.difficulty}
Grade Level: ${skill.grade?.label || "Not specified"}

${goldExamples.length > 0 ? `Style examples (use these as quality anchors):\n${JSON.stringify(goldExamples, null, 2)}` : ""}

For each question, return a JSON object with:
- stem: the question text
- options: array of {id: string, text: string} objects (4 options)
- correctAnswer: the id of the correct option
- explanation: detailed explanation of the answer
- strategy: hint for solving (optional)
- difficulty: "${request.difficulty || skill.difficulty}"
- domain: "${skill.domain}"
- subject: "${skill.subject}"
- format: "multiple-choice"

Return ONLY a JSON array. No markdown, no code blocks, no other text.`

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openRouterKey}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-v4-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error("Empty response from AI provider")

  // Parse the JSON from response (handle markdown code blocks)
  const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
  const questions: GeneratedQuestion[] = JSON.parse(jsonStr)

  // Validate and sanitize
  return questions.map(q => ({
    ...q,
    difficulty: q.difficulty || request.difficulty || "medium",
    domain: q.domain || skill.domain,
    subject: q.subject || skill.subject,
    format: q.format || "multiple-choice",
  }))
}

// ─── Full Pipeline ───

export async function runGenerationPipeline(
  request: GenerationRequest,
): Promise<{ created: number; rejected: number; errors: string[] }> {
  const results = { created: 0, rejected: 0, errors: [] as string[] }

  try {
    // 1. Get gold questions for style reference
    const goldQuestions = await prisma.goldQuestion.findMany({
      where: { 
        skillCode: request.skillId,
        goldStatus: "certified",
      },
      take: 5,
      orderBy: { version: "desc" },
    })

    // 2. Generate
    const generated = await generateQuestionsWithAI(request, goldQuestions.map(gq => ({
      stem: gq.stem,
      options: gq.options || "[]",
      correctAnswer: gq.correctAnswer,
      explanation: gq.explanation || "",
    })))
    
    // 3 & 4. Validate and dedup each question
    for (const q of generated) {
      // Deterministic validation
      const validation = validateQuestion(q)
      if (!validation.passed) {
        results.rejected++
        results.errors.push(`Validation failed: ${validation.errors.join("; ")}`)
        continue
      }

      // Duplicate check
      const dup = await checkDuplicates(q.stem, q.correctAnswer, request.tenantId)
      if (dup && dup.isDuplicate) {
        results.rejected++
        continue
      }

      // Create question + version
      const hash = crypto.createHash("sha256")
        .update(`${q.stem.trim()}:${q.correctAnswer.trim()}`)
        .digest("hex")

      const question = await prisma.question.create({
        data: {
          tenantId: request.tenantId,
          skillId: request.skillId,
          microSkillId: request.microSkillId ?? null,
          subject: q.subject,
          domain: q.domain,
          difficulty: q.difficulty,
          format: q.format,
          stem: q.stem,
          options: JSON.stringify(q.options),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          strategy: q.strategy || null,
          hash,
          source: "ai-generated",
          qualityStatus: "ready_for_review",
          questionStatus: "active",
          isActive: true,
          version: 1,
        },
      })

      // Create version 1
      const versionHash = crypto.createHash("sha256")
        .update(`${q.stem}:${q.correctAnswer}:${JSON.stringify(q.options)}`)
        .digest("hex")

      await prisma.questionVersion.create({
        data: {
          tenantId: request.tenantId,
          questionId: question.id,
          versionNumber: 1,
          stem: q.stem,
          options: JSON.stringify(q.options),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          strategy: q.strategy || null,
          difficulty: q.difficulty,
          format: q.format,
          questionType: q.format,
          contentHash: versionHash,
          qualityStatus: "draft",
          createdBy: "ai-factory",
        },
      })

      results.created++
    }
  } catch (error) {
    results.errors.push(`Pipeline error: ${error instanceof Error ? error.message : String(error)}`)
  }

  return results
}
