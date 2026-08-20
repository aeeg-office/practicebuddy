/**
 * Import static question data files into the Practice Buddy PostgreSQL database.
 *
 * For each question in each file:
 *  1. Create a record in the `questions` table
 *  2. Create a corresponding `question_versions` record as version 1
 *  3. Compute SHA-256 hash of stem+correctAnswer for dedup
 *  4. Use the existing tenant (first tenant in DB) as tenantId
 *  5. Skip if hash already exists in DB
 *
 * Run: npx tsx scripts/import-data.ts
 */

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { createHash } from "crypto"

// ── SAT Math ──
import { satMathQuestions } from "../src/data/sat-math-questions"
import { generatedSatMathQuestions } from "../src/data/generated-sat-math-algebra"
import { generatedSatMathQuestions2 } from "../src/data/generated-sat-math-algebra2"
import { generatedSatMathQuestions3 } from "../src/data/generated-sat-math-algebra3"
import { generatedSatMathQuestions4 } from "../src/data/generated-sat-math-algebra4"
import { generatedSatMathQuestions5 } from "../src/data/generated-sat-math-algebra5"
import { generatedSatMathQuestions6 } from "../src/data/generated-sat-math-algebra6"
import { generatedSatMathQuestions7 } from "../src/data/generated-sat-math-algebra7"
import { generatedSatMathQuestions8 } from "../src/data/generated-sat-math-algebra8"
import { generatedSatMathQuestions9 } from "../src/data/generated-sat-math-algebra9"
import { generatedAdvancedMathQuestions } from "../src/data/generated-sat-math-advanced"
import { generatedAdvancedMathQuestions2 } from "../src/data/generated-sat-math-advanced2"
import { generatedAdvancedMathQuestions3 } from "../src/data/generated-sat-math-advanced3"
import { generatedAdvancedMathQuestions4 } from "../src/data/generated-sat-math-advanced4"
import { generatedAdvancedMathQuestions5 } from "../src/data/generated-sat-math-advanced5"
import { generatedAdvancedMathQuestions6 } from "../src/data/generated-sat-math-advanced6"
import { generatedGeometryQuestions } from "../src/data/generated-sat-math-geometry"
import { generatedGeometryQuestions2 } from "../src/data/generated-sat-math-geometry2"
import { generatedGeometryQuestions3 } from "../src/data/generated-sat-math-geometry3"
import { generatedGeometryQuestions4 } from "../src/data/generated-sat-math-geometry4"
import { generatedGeometryQuestions5 } from "../src/data/generated-sat-math-geometry5"
import { generatedGeometryQuestions6 } from "../src/data/generated-sat-math-geometry6"
import { generatedPSDAQuestions } from "../src/data/generated-sat-math-data"
import { generatedPSDAQuestions2 } from "../src/data/generated-sat-math-data2"
import { generatedPSDAQuestions3 } from "../src/data/generated-sat-math-data3"
import { generatedPSDAQuestions4 } from "../src/data/generated-sat-math-data4"
import { generatedPSDAQuestions5 } from "../src/data/generated-sat-math-data5"
import { generatedPSDAQuestions6 } from "../src/data/generated-sat-math-data6"
import { generatedPSDAQuestions7 } from "../src/data/generated-sat-math-data7"
import { generatedPSDAQuestions8 } from "../src/data/generated-sat-math-data8"

// ── SAT Reading & Writing ──
import { satReadingWritingQuestions } from "../src/data/sat-reading-writing"
import { generatedCraftQuestions } from "../src/data/generated-sat-rw-craft"
import { generatedCraft2Questions } from "../src/data/generated-sat-rw-craft2"
import { generatedCraft3Questions } from "../src/data/generated-sat-rw-craft3"
import { generatedCraft4Questions } from "../src/data/generated-sat-rw-craft4"
import { generatedCraft5Questions } from "../src/data/generated-sat-rw-craft5"
import { generatedCraft6Questions } from "../src/data/generated-sat-rw-craft6"
import { generatedCraft7Questions } from "../src/data/generated-sat-rw-craft7"
import { generatedCraft8Questions } from "../src/data/generated-sat-rw-craft8"
import { generatedCraft9Questions } from "../src/data/generated-sat-rw-craft9"
import { generatedExpressionQuestions } from "../src/data/generated-sat-rw-expression"
import { generatedExpression2Questions } from "../src/data/generated-sat-rw-expression2"
import { generatedExpression3Questions } from "../src/data/generated-sat-rw-expression3"
import { generatedExpression4Questions } from "../src/data/generated-sat-rw-expression4"
import { generatedExpression5Questions } from "../src/data/generated-sat-rw-expression5"
import { generatedExpression6Questions } from "../src/data/generated-sat-rw-expression6"
import { generatedInformationQuestions } from "../src/data/generated-sat-rw-information"
import { generatedInformation2Questions } from "../src/data/generated-sat-rw-information2"
import { generatedInformation3Questions } from "../src/data/generated-sat-rw-information3"
import { generatedInformation4Questions } from "../src/data/generated-sat-rw-information4"
import { generatedInformation5Questions } from "../src/data/generated-sat-rw-information5"
import { generatedInformation6Questions } from "../src/data/generated-sat-rw-information6"
import { generatedConventionsQuestions } from "../src/data/generated-sat-rw-conventions"
import { generatedConventionsQuestions2 } from "../src/data/generated-sat-rw-conventions2"
import { generatedConventionsQuestions3 } from "../src/data/generated-sat-rw-conventions3"
import { generatedConventionsQuestions4 } from "../src/data/generated-sat-rw-conventions4"
import { generatedConventionsQuestions5 } from "../src/data/generated-sat-rw-conventions5"
import { generatedConventionsQuestions6 } from "../src/data/generated-sat-rw-conventions6"

// ── Core / Other ──
import { mathQuestions } from "../src/data/math-questions"
import { englishQuestions } from "../src/data/english-questions"
import { actQuestions } from "../src/data/act-questions"
import { ieltsQuestions } from "../src/data/ielts-questions"
import { toeflQuestions } from "../src/data/toefl-questions"

// ── Types ──
interface SATMathQuestion {
  id: number
  module: 1 | 2
  domain: string
  text: string
  options?: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: string
  isGridIn: boolean
}

interface SATQuestion {
  id: number
  module: 1 | 2
  domain: string
  passage?: string
  text: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: string
}

interface MathQuestion {
  id: number
  skill: string
  domain: string
  text: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: string
}

interface EnglishQuestion {
  id: number
  skill: string
  domain: string
  passage?: string
  text: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: string
}

interface OtherQuestion {
  id: number
  section: string
  text: string
  passage?: string
  options?: { id: string; text: string }[]
  correctAnswer?: string
  prompt?: string
  difficulty: string
}

// ── Helpers ──

function hashStemAnswer(stem: string, correctAnswer: string): string {
  return createHash("sha256").update(stem + correctAnswer).digest("hex")
}

function quote(val: unknown): string | undefined {
  if (val === null || val === undefined) return undefined
  return JSON.stringify(val)
}

// ── Main ──

async function main() {
  const connectionString = process.env.DATABASE_URL ||
    "postgresql://practice_buddy:practice_buddy_dev@localhost:5432/practice_buddy"

  const adapter = new PrismaPg({ connectionString })
  const prisma = new PrismaClient({ adapter })
  await prisma.$connect()

  console.log("Connected to database.")

  // Get first tenant
  const tenant = await prisma.tenant.findFirst({ orderBy: { createdAt: "asc" } })
  if (!tenant) {
    console.error("No tenant found in database. Aborting.")
    await prisma.$disconnect()
    process.exit(1)
  }
  console.log(`Using tenant: ${tenant.name} (${tenant.id})`)

  // Get program IDs
  const satProgram = await prisma.program.findUnique({ where: { tenantId_code: { tenantId: tenant.id, code: "sat" } } })
  const coreProgram = await prisma.program.findUnique({ where: { tenantId_code: { tenantId: tenant.id, code: "core" } } })

  console.log(`SAT program: ${satProgram?.id ?? "NOT FOUND"}`)
  console.log(`Core program: ${coreProgram?.id ?? "NOT FOUND"}`)

  // ── Stats ──
  const stats: Record<string, { total: number; imported: number; skipped: number }> = {}

  function track(file: string, total: number, imported: number, skipped: number) {
    stats[file] = { total, imported, skipped }
  }

  // ── Process function ──
  async function importQuestions(
    fileLabel: string,
    questions: any[],
    mapFn: (q: any) => {
      stem: string
      correctAnswer: string
      options: string | null
      explanation: string | null
      difficulty: string
      domain: string
      subject: string
      passage: string | null
      format: string
    }
  ) {
    let imported = 0
    let skipped = 0
    const total = questions.length

    for (const q of questions) {
      if (!q.correctAnswer && q.correctAnswer !== "") {
        // Skip questions without a correct answer
        skipped++
        continue
      }

      const mapped = mapFn(q)
      const h = hashStemAnswer(mapped.stem, mapped.correctAnswer)

      // Check if hash already exists
      const existing = await prisma.question.findFirst({ where: { hash: h } })
      if (existing) {
        skipped++
        continue
      }

      // Determine programId
      let programId: string | null = null
      if (mapped.subject === "sat-math" || mapped.subject === "sat-rw") {
        programId = satProgram?.id ?? null
      } else if (mapped.subject === "math" || mapped.subject === "english") {
        programId = coreProgram?.id ?? null
      }

      // Map subject to a cleaner value
      let subject = mapped.subject
      if (subject === "sat-math") subject = "math"
      if (subject === "sat-rw") subject = "reading"

      const question = await prisma.question.create({
        data: {
          tenantId: tenant.id,
          programId,
          subject,
          domain: mapped.domain,
          difficulty: mapped.difficulty,
          format: mapped.format,
          passage: mapped.passage,
          stem: mapped.stem,
          options: mapped.options,
          correctAnswer: mapped.correctAnswer,
          explanation: mapped.explanation,
          hash: h,
          questionStatus: "active",
          qualityStatus: "published",
          isActive: true,
          version: 1,
          source: "static-file",
        },
      })

      // Create question version
      await prisma.questionVersion.create({
        data: {
          tenantId: tenant.id,
          questionId: question.id,
          versionNumber: 1,
          stem: mapped.stem,
          options: mapped.options,
          correctAnswer: mapped.correctAnswer,
          explanation: mapped.explanation,
          questionType: mapped.format,
          difficulty: mapped.difficulty,
          format: mapped.format,
          passage: mapped.passage,
          contentHash: h,
          qualityStatus: "published",
        },
      })

      imported++
    }

    track(fileLabel, total, imported, skipped)
    console.log(`  ${fileLabel}: ${total} total, ${imported} imported, ${skipped} skipped`)
  }

  // ── 1. SAT Math ──
  console.log("\n=== SAT Math ===")

  // sat-math-questions.ts
  await importQuestions("sat-math-questions.ts", satMathQuestions, (q: SATMathQuestion) => ({
    stem: q.text,
    correctAnswer: q.correctAnswer,
    options: q.options ? quote(q.options) : null,
    explanation: q.explanation,
    difficulty: q.difficulty,
    domain: q.domain,
    subject: "sat-math",
    passage: null,
    format: q.isGridIn ? "numeric" : "multiple-choice",
  }))

  // Generated SAT Math files
  const satMathGeneratedFiles: [string, SATMathQuestion[]][] = [
    ["generated-sat-math-algebra.ts", generatedSatMathQuestions],
    ["generated-sat-math-algebra2.ts", generatedSatMathQuestions2],
    ["generated-sat-math-algebra3.ts", generatedSatMathQuestions3],
    ["generated-sat-math-algebra4.ts", generatedSatMathQuestions4],
    ["generated-sat-math-algebra5.ts", generatedSatMathQuestions5],
    ["generated-sat-math-algebra6.ts", generatedSatMathQuestions6],
    ["generated-sat-math-algebra7.ts", generatedSatMathQuestions7],
    ["generated-sat-math-algebra8.ts", generatedSatMathQuestions8],
    ["generated-sat-math-algebra9.ts", generatedSatMathQuestions9],
    ["generated-sat-math-advanced.ts", generatedAdvancedMathQuestions],
    ["generated-sat-math-advanced2.ts", generatedAdvancedMathQuestions2],
    ["generated-sat-math-advanced3.ts", generatedAdvancedMathQuestions3],
    ["generated-sat-math-advanced4.ts", generatedAdvancedMathQuestions4],
    ["generated-sat-math-advanced5.ts", generatedAdvancedMathQuestions5],
    ["generated-sat-math-advanced6.ts", generatedAdvancedMathQuestions6],
    ["generated-sat-math-geometry.ts", generatedGeometryQuestions],
    ["generated-sat-math-geometry2.ts", generatedGeometryQuestions2],
    ["generated-sat-math-geometry3.ts", generatedGeometryQuestions3],
    ["generated-sat-math-geometry4.ts", generatedGeometryQuestions4],
    ["generated-sat-math-geometry5.ts", generatedGeometryQuestions5],
    ["generated-sat-math-geometry6.ts", generatedGeometryQuestions6],
    ["generated-sat-math-data.ts", generatedPSDAQuestions],
    ["generated-sat-math-data2.ts", generatedPSDAQuestions2],
    ["generated-sat-math-data3.ts", generatedPSDAQuestions3],
    ["generated-sat-math-data4.ts", generatedPSDAQuestions4],
    ["generated-sat-math-data5.ts", generatedPSDAQuestions5],
    ["generated-sat-math-data6.ts", generatedPSDAQuestions6],
    ["generated-sat-math-data7.ts", generatedPSDAQuestions7],
    ["generated-sat-math-data8.ts", generatedPSDAQuestions8],
  ]

  for (const [file, questions] of satMathGeneratedFiles) {
    await importQuestions(file, questions, (q: SATMathQuestion) => ({
      stem: q.text,
      correctAnswer: q.correctAnswer,
      options: q.options ? quote(q.options) : null,
      explanation: q.explanation,
      difficulty: q.difficulty,
      domain: q.domain,
      subject: "sat-math",
      passage: null,
      format: q.isGridIn ? "numeric" : "multiple-choice",
    }))
  }

  // ── 2. SAT Reading & Writing ──
  console.log("\n=== SAT Reading & Writing ===")

  await importQuestions("sat-reading-writing.ts", satReadingWritingQuestions, (q: SATQuestion) => ({
    stem: q.text,
    correctAnswer: q.correctAnswer,
    options: q.options ? quote(q.options) : null,
    explanation: q.explanation,
    difficulty: q.difficulty,
    domain: q.domain,
    subject: "sat-rw",
    passage: q.passage ?? null,
    format: "multiple-choice",
  }))

  const satRwGeneratedFiles: [string, SATQuestion[]][] = [
    ["generated-sat-rw-craft.ts", generatedCraftQuestions],
    ["generated-sat-rw-craft2.ts", generatedCraft2Questions],
    ["generated-sat-rw-craft3.ts", generatedCraft3Questions],
    ["generated-sat-rw-craft4.ts", generatedCraft4Questions],
    ["generated-sat-rw-craft5.ts", generatedCraft5Questions],
    ["generated-sat-rw-craft6.ts", generatedCraft6Questions],
    ["generated-sat-rw-craft7.ts", generatedCraft7Questions],
    ["generated-sat-rw-craft8.ts", generatedCraft8Questions],
    ["generated-sat-rw-craft9.ts", generatedCraft9Questions],
    ["generated-sat-rw-expression.ts", generatedExpressionQuestions],
    ["generated-sat-rw-expression2.ts", generatedExpression2Questions],
    ["generated-sat-rw-expression3.ts", generatedExpression3Questions],
    ["generated-sat-rw-expression4.ts", generatedExpression4Questions],
    ["generated-sat-rw-expression5.ts", generatedExpression5Questions],
    ["generated-sat-rw-expression6.ts", generatedExpression6Questions],
    ["generated-sat-rw-information.ts", generatedInformationQuestions],
    ["generated-sat-rw-information2.ts", generatedInformation2Questions],
    ["generated-sat-rw-information3.ts", generatedInformation3Questions],
    ["generated-sat-rw-information4.ts", generatedInformation4Questions],
    ["generated-sat-rw-information5.ts", generatedInformation5Questions],
    ["generated-sat-rw-information6.ts", generatedInformation6Questions],
    ["generated-sat-rw-conventions.ts", generatedConventionsQuestions],
    ["generated-sat-rw-conventions2.ts", generatedConventionsQuestions2],
    ["generated-sat-rw-conventions3.ts", generatedConventionsQuestions3],
    ["generated-sat-rw-conventions4.ts", generatedConventionsQuestions4],
    ["generated-sat-rw-conventions5.ts", generatedConventionsQuestions5],
    ["generated-sat-rw-conventions6.ts", generatedConventionsQuestions6],
  ]

  for (const [file, questions] of satRwGeneratedFiles) {
    await importQuestions(file, questions, (q: SATQuestion) => ({
      stem: q.text,
      correctAnswer: q.correctAnswer,
      options: q.options ? quote(q.options) : null,
      explanation: q.explanation,
      difficulty: q.difficulty,
      domain: q.domain,
      subject: "sat-rw",
      passage: q.passage ?? null,
      format: "multiple-choice",
    }))
  }

  // ── 3. Core Math ──
  console.log("\n=== Core Program ===")

  await importQuestions("math-questions.ts", mathQuestions, (q: MathQuestion) => ({
    stem: q.text,
    correctAnswer: q.correctAnswer,
    options: q.options ? quote(q.options) : null,
    explanation: q.explanation,
    difficulty: q.difficulty,
    domain: q.domain,
    subject: "math",
    passage: null,
    format: "multiple-choice",
  }))

  // ── 4. English ──
  await importQuestions("english-questions.ts", englishQuestions, (q: EnglishQuestion) => ({
    stem: q.text,
    correctAnswer: q.correctAnswer,
    options: q.options ? quote(q.options) : null,
    explanation: q.explanation,
    difficulty: q.difficulty,
    domain: q.domain,
    subject: "english",
    passage: q.passage ?? null,
    format: "multiple-choice",
  }))

  // ── 5. ACT ──
  console.log("\n=== ACT ===")
  await importQuestions("act-questions.ts", actQuestions, (q: OtherQuestion) => ({
    stem: q.text,
    correctAnswer: q.correctAnswer ?? "",
    options: q.options ? quote(q.options) : null,
    explanation: null,
    difficulty: q.difficulty,
    domain: q.section,
    subject: "act",
    passage: q.passage ?? null,
    format: "multiple-choice",
  }))

  // ── 6. IELTS ──
  console.log("\n=== IELTS ===")
  await importQuestions("ielts-questions.ts", ieltsQuestions, (q: OtherQuestion) => ({
    stem: q.text,
    correctAnswer: q.correctAnswer ?? "",
    options: q.options ? quote(q.options) : null,
    explanation: null,
    difficulty: q.difficulty,
    domain: q.section,
    subject: "ielts",
    passage: q.passage ?? null,
    format: "multiple-choice",
  }))

  // ── 7. TOEFL ──
  console.log("\n=== TOEFL ===")
  await importQuestions("toefl-questions.ts", toeflQuestions, (q: OtherQuestion) => ({
    stem: q.text,
    correctAnswer: q.correctAnswer ?? "",
    options: q.options ? quote(q.options) : null,
    explanation: null,
    difficulty: q.difficulty,
    domain: q.section,
    subject: "toefl",
    passage: q.passage ?? null,
    format: "multiple-choice",
  }))

  // ── Summary ──
  console.log("\n" + "=".repeat(70))
  console.log("IMPORT SUMMARY")
  console.log("=".repeat(70))

  let totalAll = 0
  let importedAll = 0
  let skippedAll = 0

  for (const [file, s] of Object.entries(stats)) {
    totalAll += s.total
    importedAll += s.imported
    skippedAll += s.skipped
    console.log(`  ${file.padEnd(40)} ${s.total.toString().padStart(4)} total  →  ${s.imported.toString().padStart(4)} imported  ${s.skipped.toString().padStart(4)} skipped`)
  }

  console.log("-".repeat(70))
  console.log(`  TOTAL`.padEnd(40) + ` ${totalAll.toString().padStart(4)} total  →  ${importedAll.toString().padStart(4)} imported  ${skippedAll.toString().padStart(4)} skipped`)

  const totalQuestions = await prisma.question.count()
  const totalVersions = await prisma.questionVersion.count()
  console.log(`\nDatabase now has ${totalQuestions} questions and ${totalVersions} question versions.`)

  await prisma.$disconnect()
}

main().catch((err) => {
  console.error("Import failed:", err)
  process.exit(1)
})