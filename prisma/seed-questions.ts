/**
 * Practice Buddy — Seed Gold Questions & Question Variations
 * 
 * Generates gold questions for each micro-skill using the AI Question Factory
 * or predefined question templates. This script creates the full question pipeline:
 *   GoldQuestion → QuestionFamily → Question → QuestionVersion
 * 
 * Run: npx tsx prisma/seed-questions.ts
 * Prerequisites: prisma/seed.ts + prisma/seed-curriculum.ts
 */

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as crypto from "crypto"

const connectionString = process.env.DATABASE_URL || "postgresql://practice_buddy:***@localhost:5432/practice_buddy"
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

// ─── Question Templates ───
// These are sample question templates for each domain.
// In production, the AI Question Factory generates these.

interface QuestionTemplate {
  domain: string
  category: string
  difficulty: string
  format: string
  stem: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  // Template variables for generating variations
  parameters: Record<string, string[]>
}

// Operations & Algebraic Thinking templates
const oaTemplates: QuestionTemplate[] = [
  {
    domain: "Operations & Algebraic Thinking",
    category: "Multiplication & Division",
    difficulty: "easy",
    format: "multiple-choice",
    stem: "What is {{a}} × {{b}}?",
    options: [
      { id: "A", text: "{{opt1}}" },
      { id: "B", text: "{{opt2}}" },
      { id: "C", text: "{{opt3}}" },
      { id: "D", text: "{{opt4}}" },
    ],
    correctAnswer: "{{correct}}",
    explanation: "{{a}} × {{b}} = {{product}}. Multiplication is repeated addition: {{a}} added {{b}} times equals {{product}}.",
    parameters: {
      a: ["3", "4", "5", "6", "7", "8", "9"],
      b: ["2", "3", "4", "5", "6", "7", "8"],
    },
  },
]

// Number & Operations templates
const noTemplates: QuestionTemplate[] = [
  {
    domain: "Number & Operations",
    category: "Place Value",
    difficulty: "easy",
    format: "multiple-choice",
    stem: "What is the value of the digit {{digit}} in the number {{number}}?",
    options: [
      { id: "A", text: "{{opt1}}" },
      { id: "B", text: "{{opt2}}" },
      { id: "C", text: "{{opt3}}" },
      { id: "D", text: "{{opt4}}" },
    ],
    correctAnswer: "{{correct}}",
    explanation: "In {{number}}, the digit {{digit}} is in the {{place}} place, so its value is {{value}}.",
    parameters: {
      number: ["3,456", "7,892", "45,123", "98,765", "123,456"],
      digit: ["4", "8", "5", "7", "3"],
    },
  },
]

// Algebra templates
const algebraTemplates: QuestionTemplate[] = [
  {
    domain: "Algebra",
    category: "Linear Equations",
    difficulty: "medium",
    format: "multiple-choice",
    stem: "If {{a}}x + {{b}} = {{c}}, what is the value of x?",
    options: [
      { id: "A", text: "{{opt1}}" },
      { id: "B", text: "{{opt2}}" },
      { id: "C", text: "{{opt3}}" },
      { id: "D", text: "{{opt4}}" },
    ],
    correctAnswer: "{{correct}}",
    explanation: "Subtract {{b}} from both sides: {{a}}x = {{c-minus-b}}. Then divide by {{a}}: x = {{x-value}}.",
    parameters: {
      a: ["2", "3", "4", "5", "6"],
      b: ["3", "5", "7", "9", "11"],
      c: ["15", "22", "31", "44", "51"],
    },
  },
  {
    domain: "Algebra",
    category: "Systems",
    difficulty: "hard",
    format: "multiple-choice",
    stem: "If {{a}}x + y = {{c}} and x - y = {{d}}, what is the value of x?",
    options: [
      { id: "A", text: "{{opt1}}" },
      { id: "B", text: "{{opt2}}" },
      { id: "C", text: "{{opt3}}" },
      { id: "D", text: "{{opt4}}" },
    ],
    correctAnswer: "{{correct}}",
    explanation: "Add the equations: {{a-plus-1}}x = {{c-plus-d}}, so x = {{x-value}}.",
    parameters: {
      a: ["2", "3", "4"],
      c: ["10", "14", "18"],
      d: ["2", "4", "6"],
    },
  },
]

// Reading templates
const readingTemplates: QuestionTemplate[] = [
  {
    domain: "Information and Ideas",
    category: "Central Ideas",
    difficulty: "medium",
    format: "multiple-choice",
    stem: "Which of the following best states the central idea of the passage?",
    options: [
      { id: "A", text: "{{opt1}}" },
      { id: "B", text: "{{opt2}}" },
      { id: "C", text: "{{opt3}}" },
      { id: "D", text: "{{opt4}}" },
    ],
    correctAnswer: "{{correct}}",
    explanation: "The passage primarily focuses on {{topic}}. The other options are details or supporting points, not the main idea.",
    parameters: {
      topic: ["the importance of biodiversity", "the impact of technology on society", "the process of scientific discovery"],
    },
  },
]

// Writing/Grammar templates
const writingTemplates: QuestionTemplate[] = [
  {
    domain: "Standard English Conventions",
    category: "Grammar",
    difficulty: "medium",
    format: "multiple-choice",
    stem: "Choose the correct form: {{sentence}}",
    options: [
      { id: "A", text: "{{opt1}}" },
      { id: "B", text: "{{opt2}}" },
      { id: "C", text: "{{opt3}}" },
      { id: "D", text: "{{opt4}}" },
    ],
    correctAnswer: "{{correct}}",
    explanation: "{{explanation_text}}",
    parameters: {
      sentence: [
        "Neither the teacher nor the students ___ satisfied with the results.",
        "Each of the students ___ completed the assignment.",
        "The team of researchers ___ presenting their findings today.",
      ],
    },
  },
]

// Geometry templates
const geometryTemplates: QuestionTemplate[] = [
  {
    domain: "Geometry",
    category: "Area",
    difficulty: "medium",
    format: "multiple-choice",
    stem: "A rectangle has a length of {{length}} units and a width of {{width}} units. What is its area?",
    options: [
      { id: "A", text: "{{opt1}}" },
      { id: "B", text: "{{opt2}}" },
      { id: "C", text: "{{opt3}}" },
      { id: "D", text: "{{opt4}}" },
    ],
    correctAnswer: "{{correct}}",
    explanation: "Area = length × width = {{length}} × {{width}} = {{area}} square units.",
    parameters: {
      length: ["5", "7", "8", "10", "12"],
      width: ["3", "4", "6", "9", "15"],
    },
  },
]

// ─── Helpers ───

function interpolateTemplate(template: string, params: Record<string, string>): string {
  let result = template
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value)
  }
  return result
}

function generateQuestionVariations(
  template: QuestionTemplate,
  skillCode: string,
  count: number = 10,
): { stem: string; options: string; correctAnswer: string; explanation: string; difficulty: string }[] {
  const variations: { stem: string; options: string; correctAnswer: string; explanation: string; difficulty: string }[] = []

  // Generate parameter combinations
  for (let i = 0; i < count; i++) {
    const params: Record<string, string> = {}
    for (const [key, values] of Object.entries(template.parameters)) {
      params[key] = values[i % values.length]
    }

    // Compute derived values based on the template type
    if (template.parameters.a && template.parameters.b) {
      const a = parseInt(params.a || "0")
      const b = parseInt(params.b || "0")
      const product = a * b
      params.product = String(product)
      params.opt1 = String(product - 1)
      params.opt2 = String(product)
      params.opt3 = String(product + 1)
      params.opt4 = String(product + a)
      params.correct = "B" // For these templates, B is correct
    }

    if (template.parameters.a && template.parameters.b && template.parameters.c) {
      const a = parseInt(params.a || "0")
      const b = parseInt(params.b || "0")
      const c = parseInt(params.c || "0")
      const cMinusB = c - b
      const xValue = cMinusB / a
      params["c-minus-b"] = String(cMinusB)
      params["x-value"] = String(xValue)
      params.opt1 = String(xValue - 1)
      params.opt2 = String(xValue)
      params.opt3 = String(xValue + 1)
      params.opt4 = String(xValue + 2)
      params.correct = "B"
    }

    if (template.parameters.a && template.parameters.c && template.parameters.d) {
      const a = parseInt(params.a || "0")
      const c = parseInt(params.c || "0")
      const d = parseInt(params.d || "0")
      const aPlus1 = a + 1
      const cPlusD = c + d
      const xValue = cPlusD / aPlus1
      params["a-plus-1"] = String(aPlus1)
      params["c-plus-d"] = String(cPlusD)
      params["x-value"] = String(xValue)
      params.opt1 = String(xValue - 1)
      params.opt2 = String(xValue)
      params.opt3 = String(xValue + 1)
      params.opt4 = String(xValue + 2)
      params.correct = "B"
    }

    // Geometry - area
    if (template.parameters.length && template.parameters.width) {
      const length = parseInt(params.length || "0")
      const width = parseInt(params.width || "0")
      const area = length * width
      params.area = String(area)
      params.opt1 = String(length + width)
      params.opt2 = String(2 * (length + width))
      params.opt3 = String(area)
      params.opt4 = String(length * width * 2)
      params.correct = "C"
    }

    // Reading / Writing - no computation needed
    if (template.parameters.topic) {
      params.opt1 = "The author's personal experience with the subject"
      params.opt2 = `A detailed analysis of ${params.topic}`
      params.opt3 = `The main argument that ${params.topic} is overrated`
      params.opt4 = "A historical overview of the field"
      params.correct = "B"
    }

    if (template.parameters.sentence) {
      params.opt1 = "was"
      params.opt2 = "were"
      params.opt3 = "is"
      params.opt4 = "are"
      params.correct = "B"
      params.explanation_text = "The subject closest to the verb is 'students', which is plural, so the plural verb 'were' is correct."
    }

    const stem = interpolateTemplate(template.stem, params)
    const options = JSON.stringify(
      template.options.map((o) => ({
        id: o.id,
        text: interpolateTemplate(o.text, params),
      }))
    )
    const correctAnswer = interpolateTemplate(template.correctAnswer, params)
    const explanation = interpolateTemplate(template.explanation, params)
    const difficulty = params.difficulty || template.difficulty

    variations.push({ stem, options, correctAnswer, explanation, difficulty })
  }

  return variations
}

// ─── Main ───

async function main() {
  console.log("📝 Seeding Gold Questions...")
  console.log("=".repeat(60))

  const tenant = await prisma.tenant.findFirst({ where: { slug: "aeeg" } })
  if (!tenant) {
    throw new Error("Tenant 'aeeg' not found. Run `npx tsx prisma/seed.ts` first.")
  }

  // Get all micro-skills
  const microSkills = await prisma.microSkill.findMany({
    include: {
      skill: {
        include: { grade: { include: { program: true } } },
      },
    },
    orderBy: [{ skill: { grade: { programId: "asc" } } }, { skill: { code: "asc" } }, { order: "asc" }],
  })

  console.log(`\nFound ${microSkills.length} micro-skills to seed questions for`)

  // Map domain to templates
  const templateMap: Record<string, QuestionTemplate[]> = {
    "Operations & Algebraic Thinking": oaTemplates,
    "Number & Operations": noTemplates,
    "Algebra": algebraTemplates,
    "Advanced Math": algebraTemplates,
    "Geometry": geometryTemplates,
    "Information and Ideas": readingTemplates,
    "Craft and Structure": readingTemplates,
    "Standard English Conventions": writingTemplates,
    "Expression of Ideas": writingTemplates,
  }

  let totalGoldQuestions = 0
  let totalQuestions = 0

  for (const ms of microSkills) {
    const skill = ms.skill
    const templates = templateMap[skill.domain] || oaTemplates // fallback to OA templates

    // Generate 10 gold questions per micro-skill
    const variations = generateQuestionVariations(templates[0], skill.code, 10)

    for (const v of variations) {
      // Create hash
      const hash = crypto.createHash("sha256").update(v.stem + v.correctAnswer).digest("hex")

      // Create Gold Question (upsert to handle existing data)
      const gold = await prisma.goldQuestion.upsert({
        where: { hash },
        update: { goldStatus: "certified" },
        create: {
          tenantId: tenant.id,
          microSkillId: ms.id,
          subject: skill.subject,
          domain: skill.domain,
          category: skill.category,
          subcategory: skill.subcategory,
          difficulty: v.difficulty,
          format: "multiple-choice",
          stem: v.stem,
          options: v.options,
          correctAnswer: v.correctAnswer,
          explanation: v.explanation,
          hash,
          goldStatus: "certified",
          skillCode: skill.code,
        },
      })
      totalGoldQuestions++

      // Create Question Family (idempotent)
      const familyName = `${skill.code}-${skill.domain.substring(0, 3).toUpperCase()}`
      let family = await prisma.questionFamily.findFirst({ where: { name: familyName, goldQuestionId: gold.id } })
      if (!family) {
        family = await prisma.questionFamily.create({
          data: {
            tenantId: tenant.id,
            goldQuestionId: gold.id,
            name: familyName,
            difficulty: v.difficulty,
            variationCount: 3,
          },
        })
      }

      // Create 3 question variations (idempotent)
      for (let vIdx = 0; vIdx < 3; vIdx++) {
        const qHash = crypto.createHash("sha256").update(v.stem + v.correctAnswer + vIdx).digest("hex")
        let question = await prisma.question.findFirst({ where: { hash: qHash } })
        if (!question) {
          question = await prisma.question.create({
            data: {
              tenantId: tenant.id,
              goldQuestionId: gold.id,
              familyId: family.id,
              skillId: skill.id,
              microSkillId: ms.id,
              programId: skill.grade?.programId ?? "",
              category: skill.category,
              subcategory: skill.subcategory,
              difficulty: v.difficulty,
              format: "multiple-choice",
              stem: v.stem + (vIdx > 0 ? ` (Variant ${vIdx + 1})` : ""),
              options: v.options,
              correctAnswer: v.correctAnswer,
              explanation: v.explanation,
              hash: qHash,
              qualityStatus: "published",
              isActive: true,
              questionStatus: "active",
              version: 1,
            },
          })
          totalQuestions++

        // Create QuestionVersion
        const vHash = crypto.createHash("sha256")
          .update(question.stem + question.correctAnswer + (question.options || ""))
          .digest("hex")

        await prisma.questionVersion.create({
          data: {
            tenantId: tenant.id,
            questionId: question.id,
            versionNumber: 1,
            stem: question.stem,
            options: question.options,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            questionType: "multiple-choice",
            difficulty: v.difficulty,
            format: "multiple-choice",
            contentHash: vHash,
            qualityStatus: "published",
            publishedAt: new Date(),
          },
        })
      }
    }
  }

  console.log(`\n✅ Gold Questions:  ${totalGoldQuestions}`)
  console.log(`✅ Total Questions: ${totalQuestions}`)
  console.log("\n   Run `npx tsx prisma/verify-seed.ts` to verify.") 
}

main()
  .catch((e) => {
    console.error("❌ Question seed failed:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())