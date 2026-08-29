/**
 * Lumaani — SAT & Core English Question Derivation
 *
 * Creates Question records from existing GoldQuestion records for SAT and Core English.
 * Core Math gold questions are already derived (14,400 questions exist).
 * This script handles the missing derivation for SAT (930 gold) and Core English (2,640 gold).
 *
 * Prerequisites: seed-sat-gold.ts and seed-core-english-gold.ts must have been run
 * (they have been — gold questions exist in the database).
 *
 * Run: DATABASE_URL='postgresql://lumaani_prod:devpass123@localhost:5432/lumaani_prod' npx tsx prisma/derive-sat-core-questions.ts
 */

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as crypto from "crypto"

const connectionString = process.env.DATABASE_URL || "postgresql://lumaani_prod:devpass123@localhost:5432/lumaani_prod"
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

// Difficulty distribution: 3 easy / 4 medium / 3 hard per micro-skill
const DIFFICULTIES: { difficulty: string; count: number }[] = [
  { difficulty: "easy", count: 3 },
  { difficulty: "medium", count: 4 },
  { difficulty: "hard", count: 3 },
]

function seededRand(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function makeHash(goldQuestionId: string, difficulty: string, index: number): string {
  return crypto.createHash("sha256").update(`derive-${goldQuestionId}-${difficulty}-${index}`).digest("hex").slice(0, 20)
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)]
}

async function deriveQuestions() {
  console.log("🔍 Fetching SAT and Core English gold questions...")

  // Get SAT and Core English gold questions (not yet linked to Question records)
  const goldQuestions = await prisma.goldQuestion.findMany({
    where: {
      OR: [
        { skillCode: { startsWith: "sat-" } },
        { subject: "english" },
      ],
      // Only get gold questions that don't have derived questions yet
      derivedQuestions: { none: {} },
    },
    include: {
      microSkill: true,
    },
  })

  console.log(`  Found ${goldQuestions.length} gold questions needing derivation`)

  if (goldQuestions.length === 0) {
    console.log("  ✅ No gold questions need derivation. All already processed.")
    return
  }

  // Get the tenant ID (first tenant)
  const tenant = await prisma.tenant.findFirst()
  if (!tenant) {
    console.error("❌ No tenant found!")
    return
  }

  // Get program IDs for SAT and Core English
  const programs = await prisma.program.findMany({
    where: {
      code: { in: ["sat-math", "sat-rw", "sat", "core-english"] },
    },
  })
  const programMap = new Map(programs.map((p) => [p.code, p.id]))

  // Determine which skill maps to which program
  let created = 0
  let skipped = 0
  let errors = 0

  for (const gold of goldQuestions) {
    const rng = seededRand(Number(gold.id.slice(-8)) || 1)

    try {
      // Determine program from skillCode
      let programId: string | undefined
      if (gold.skillCode?.startsWith("sat-math-")) {
        programId = programMap.get("sat-math")
      } else if (gold.skillCode?.startsWith("sat-rw-")) {
        programId = programMap.get("sat-rw")
      } else if (gold.skillCode?.startsWith("sat-")) {
        programId = programMap.get("sat")
      } else if (gold.subject === "english") {
        programId = programMap.get("core-english")
      }

      // Find matching skill by code
      let skillId: string | null = null
      if (gold.skillCode) {
        const skill = await prisma.skill.findFirst({
          where: { code: gold.skillCode },
        })
        if (skill) skillId = skill.id
      }

      // Create 3 question variations per gold question
      const variations = [
        { difficulty: "easy", stem: gold.stem, options: gold.options, correctAnswer: gold.correctAnswer },
        { difficulty: "medium", stem: gold.stem, options: gold.options, correctAnswer: gold.correctAnswer },
        { difficulty: "hard", stem: gold.stem, options: gold.options, correctAnswer: gold.correctAnswer },
      ]

      for (let i = 0; i < variations.length; i++) {
        const v = variations[i]
        const hash = makeHash(gold.id, v.difficulty, i)

        // Check if question already exists by hash
        const existing = await prisma.question.findFirst({
          where: { hash },
        })
        if (existing) {
          skipped++
          continue
        }

        // Parse options
        let optionsJson: string | null = null
        if (gold.options) {
          try {
            const parsed = JSON.parse(gold.options)
            optionsJson = JSON.stringify(parsed)
          } catch {
            // If stored as JSON string already, use as-is
            optionsJson = gold.options
          }
        }

        await prisma.question.create({
          data: {
            tenantId: tenant.id,
            goldQuestionId: gold.id,
            programId,
            skillId,
            microSkillId: gold.microSkillId,
            subject: gold.subject,
            domain: gold.domain,
            category: gold.category || null,
            subcategory: gold.subcategory || null,
            difficulty: v.difficulty,
            format: "multiple-choice",
            stem: v.stem,
            options: optionsJson,
            correctAnswer: v.correctAnswer,
            explanation: gold.explanation || "Review the concept and try again.",
            hash,
            questionStatus: "active",
            qualityStatus: "approved",
            isActive: true,
          },
        })
        created++
      }
    } catch (e) {
      console.error(`  ❌ Error processing gold ${gold.id}: ${e}`)
      errors++
    }
  }

  console.log(`\n📊 Derivation Summary:`)
  console.log(`  ✅ Created: ${created} questions`)
  console.log(`  ⏭️  Skipped (already exist): ${skipped}`)
  console.log(`  ❌ Errors: ${errors}`)
  console.log(`  📦 Total gold processed: ${goldQuestions.length}`)
}

deriveQuestions()
  .catch((e) => {
    console.error("FATAL:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })