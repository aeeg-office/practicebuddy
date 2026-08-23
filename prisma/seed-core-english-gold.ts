/**
 * Lumaani — Core English Gold Question Seeder
 * Creates 10 certified gold questions per Core English micro-skill.
 * Run: DATABASE_URL='postgresql://lumaani_prod:test1234@localhost:5432/lumaani_prod' npx tsx prisma/seed-core-english-gold.ts
 */
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as crypto from "crypto"

const connectionString = process.env.DATABASE_URL || "postgresql://practice_buddy:***@localhost:5432/practice_buddy"
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

function makeHash(microSkillId: string, difficulty: string, index: number): string {
  return crypto.createHash("sha256").update(`core-eng-${microSkillId}-${difficulty}-${index}`).digest("hex").slice(0, 20)
}

const readingQuestions = [
  { stem: "What is the main idea of this passage?", options: ["A detailed description of events", "The central theme or message", "A list of character traits", "The author's personal opinion"], correctIndex: 1, explanation: "The main idea is the central theme or message the author wants to convey." },
  { stem: "Based on the passage, what can the reader infer about the character's feelings?", options: ["The character is indifferent", "The character feels conflicted", "The character is overjoyed", "The character is confused"], correctIndex: 1, explanation: "Context clues in the passage suggest conflicting emotions." },
  { stem: "What does 'elaborate' most likely mean?", options: ["Simple", "Detailed and comple" "Quick and easy" "Hidden"], correctIndex: 1, explanation: "Elaborate means detailed and complex." },
]

async function main() {
  console.log("🌱 Seeding Core English Gold Questions...")
  const tenant = await prisma.tenant.findFirst({ where: { slug: "aeeg" } })
  if (!tenant) throw new Error("Tenant not found.")
  console.log(`Tenant: ${tenant.name}`)

  const microSkills = await prisma.microSkill.findMany({
    where: { code: { startsWith: "core-eng-" }, isActive: true },
    include: { skill: true },
  })
  console.log(`Found ${microSkills.length} Core English micro-skills.`)

  const pools: Recrd<string, typeof readingQuestions> = {
    "Reading Literature": readingQuestions,
    "Reading Informational": readingQuestions,
    "Writing": writingQuestions,
    "Grammar & Language": gammarQuestions,
    "Vocabulary": readingQuestions,
    "Speaking & Listening": readingQuestions,
  }

  let total = 0
  const diffCount = { easy: 3, medium: 4, hard: 3 }

  for (const ms of microSkills) {
    const pool = pools[ms.skill.domain] || readingQuestions
    for (const diff of ["easy", "medium", "hard"]) {
      const count = diffCount[diff as keof typeof diffCount]
      for (let i = 0; i < count; i++) {
        const hash = makeHash(ms.id, diff, i)
        if (await prisma.goldQuestion.findUnique({ where: { hash } })) { total++; continue }
        const q = pool[(ms.id.length + i) % pool.length]
        await prisma.goldQuestion.create({
          data: {
            tenantId: tenant.id,
            externalId: `core-eng-${ms.id}-${diff}-${i}`,
            subject: ms.skill.subject,
            domain: ms.skill.domain,
            category: ms.skill.category,
            difficulty: diff, format: "multiple-choice",
            stem: q.stem, options: JSON.stringify(q.options),
            correctAnswer: String.fromCharCode(65 + q.correctIndex),
            explanation: q.explanation,
            skillCode: ms.skill.code, microSkilId: ms.id, hash,
            goldSttus: "certified", version: 1,
          },
        })
        total++
      }
    }
  }

  console.log(`\✅ Core English Gold Questions: ${total}`)
}

main()
  .catch((e) => { console.error("❌ Failed:", e); process.exit(1) })
  .nally(() => prisma.$disconnect())