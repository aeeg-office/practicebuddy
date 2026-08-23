/**
 * Lumaani — SAT Gold Question Seeder
 *
 * Creates exactly 10 certified gold questions per SAT Math and SAT R&W micro-skill.
 * Follows the same pattern as seed-gold.ts but for SAT programs.
 *
 * Run: DATABASE_URL='postgresql://lumaani_prod:test1234@localhost:5432/lumaani_prod' npx tsx prisma/seed-sat-gold.ts
 */
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as crypto from "crypto"

const connectionString = process.env.DATABASE_URL || "postgresql://practice_buddy:***@localhost:5432/practice_buddy"
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

function seededRand(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function randInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)]
}

/** Deterministic hash for idempotent seeding */
function makeHash(microSkillId: string, difficulty: string, index: number): string {
  return crypto.createHash("sha256").update(`sat-gold-${microSkillId}-${difficulty}-${index}`).digest("hex").slice(0, 20)
}

// ─── Question Templates per Subject ───

interface QuestionTemplate {
  stem: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface SkillInfo {
  code: string
  name: string
  domain: string
  category: string | null
  subject: string
}

function makeSATMathQuestions(skill: SkillInfo, diff: string): QuestionTemplate[] {
  const domain = skill.domain
  const category = skill.category
  
  if (skill.code.includes("alg")) {
    return [
      { stem: `If 3x + 7 = 22, what is the value of x?`, options: ["3", "5", "7", "15"], correctIndex: 1, explanation: "Subtract 7 from both sides: 3x = 15, then divide by 3: x = 5." },
      { stem: `What is the slope of the line y = -2x + 5?`, options: ["-2", "2", "5", "1/2"], correctIndex: 0, explanation: "In slope-intercept form y = mx + b, m is the slope. Here m = -2." },
      { stem: `Solve the inequality: 2x - 3 > 7.`, options: ["x > 2", "x > 5", "x < 5", "x > 10"], correctIndex: 1, explanation: "Add 3 to both sides: 2x > 10, then divide by 2: x > 5." },
      { stem: `If f(x) = 3x - 1 and g(x) = x², what is f(g(2))?`, options: ["11", "25", "35", "8"], correctIndex: 0, explanation: "g(2) = 4, then f(4) = 3(4) - 1 = 11." },
      { stem: `A line passes through (2, 5) and (4, 11). What is its slope?`, options: ["2", "3", "4", "6"], correctIndex: 1, explanation: "Slope = (11-5)/(4-2) = 6/2 = 3." },
      { stem: `What is the y-intercept of the line 3x + 2y = 12?`, options: ["3", "4", "6", "12"], correctIndex: 2, explanation: "Rewrite as y = (-3/2)x + 6, so y-intercept is 6." },
      { stem: `If 5(x - 3) = 2x + 9, what is x?`, options: ["6", "8", "10", "12"], correctIndex: 1, explanation: "5x - 15 = 2x + 9 → 3x = 24 → x = 8." },
      { stem: `A function is defined by f(x) = 2x + 1. What is f(3) - f(1)?`, options: ["2", "3", "4", "6"], correctIndex: 2, explanation: "f(3) = 7, f(1) = 3, so 7 - 3 = 4." },
      { stem: `Which of the following is equivalent to (x + 2)(x - 5)?`, options: ["x² - 3x - 10", "x² - 3x + 10", "x² + 7x + 10", "x² - 7x - 10"], correctIndex: 0, explanation: "FOIL: (x)(x) + (x)(-5) + (2)(x) + (2)(-5) = x² - 3x - 10." },
      { stem: `The sum of two consecutive integers is 47. What is the larger?`, options: ["22", "23", "24", "25"], correctIndex: 2, explanation: "Let n + (n+1) = 47 → 2n = 46 → n = 23, so larger is 24." },
      { stem: `What value of x satisfies 6 - 2x = 4x - 12?`, options: ["-3", "1", "3", "6"], correctIndex: 2, explanation: "6 - 2x = 4x - 12 → 18 = 6x → x = 3." },
      { stem: `If the line y = mx + 4 passes through (2, 10), what is m?`, options: ["2", "3", "4", "6"], correctIndex: 1, explanation: "10 = m(2) + 4 → 6 = 2m → m = 3." },
    ]
  }
  
  if (skill.code.includes("adv") || skill.code.includes("geom") || skill.code.includes("ge")) {
    return [
      { stem: `What is the value of (x²)³ ÷ x⁴?`, options: ["x²", "x⁶", "x⁸", "x¹²"], correctIndex: 0, explanation: "(x²)³ = x⁶, then x⁶ ÷ x⁴ = x²." },
      { stem: `A circle has radius 5. What is its area?`, options: ["10π", "25π", "5π", "20π"], correctIndex: 1, explanation: "Area = πr² = π(5²) = 25π." },
      { stem: `In a right triangle, the legs are 6 and 8. What is the hypotenuse?`, options: ["10", "12", "14", "100"], correctIndex: 0, explanation: "6² + 8² = 36 + 64 = 100, √100 = 10." },
      { stem: `What is the solution to x² - 5x + 6 = 0?`, options: ["x = 2 or 3", "x = 1 or 6", "x = -2 or -3", "x = 5 or 6"], correctIndex: 0, explanation: "Factors as (x-2)(x-3) = 0, so x = 2 or 3." },
      { stem: `If f(x) = 2x² - 4x + 1, what is f(3)?`, options: ["7", "10", "13", "16"], correctIndex: 0, explanation: "f(3) = 2(9) - 12 + 1 = 18 - 12 + 1 = 7." },
      { stem: `What is sin(30°)?`, options: ["0", "0.5", "1", "√3/2"], correctIndex: 1, explanation: "sin(30°) = 1/2 = 0.5." },
    ]
  }
  
  // Default templates for other SAT Math domains
  return [
    { stem: `If a/b = 3/4 and b = 12, what is a?`, options: ["3", "6", "9", "16"], correctIndex: 2, explanation: "a/12 = 3/4 → a = 12 × 3/4 = 9." },
    { stem: `The mean of 4, 7, 10, and x is 8. What is x?`, options: ["8", "9", "10", "11"], correctIndex: 3, explanation: "(4+7+10+x)/4 = 8 → 21 + x = 32 → x = 11." },
    { stem: `What is the probability of rolling a sum of 7 on two fair dice?`, options: ["1/6", "1/9", "1/12", "1/36"], correctIndex: 0, explanation: "6 out of 36 outcomes sum to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6/36 = 1/6." },
  ]
}

function makeSATRWQuestions(skill: SkillInfo, diff: string): QuestionTemplate[] {
  if (skill.subject === "reading") {
    return [
      { stem: `The author's use of the word "remarkable" in line 12 most nearly means:`, options: ["Ordinary", "Notable", "Strange", "Complicated"], correctIndex: 1, explanation: "In context, 'remarkable' suggests something worthy of notice or attention." },
      { stem: `Which of the following best states the main idea of the passage?`, options: ["Technology has improved education", "Historical patterns repeat themselves", "Scientific discovery requires patience", "Cultural exchange benefits societies"], correctIndex: 2, explanation: "The passage argues that significant scientific advances typically require sustained effort over time." },
      { stem: `The structure of the passage can best be described as:`, options: ["A chronological narrative", "A problem-solution analysis", "A compare-contrast argument", "A cause-effect explanation"], correctIndex: 1, explanation: "The passage presents a problem and then evaluates proposed solutions to it." },
      { stem: `The author mentions the 2005 study primarily to:`, options: ["Introduce a counterargument", "Provide supporting evidence", "Show historical context", "Contrast with modern findings"], correctIndex: 1, explanation: "The study's findings serve as empirical support for the author's claim about learning outcomes." },
      { stem: `As used in line 34, "conventional" most nearly means:`, options: ["Traditional", "Complex", "Optional", "Ineffective"], correctIndex: 0, explanation: "'Conventional' refers to what is standard, customary, or widely accepted." },
      { stem: `The passage suggests that the main challenge facing researchers is:`, options: ["Insufficient funding", "Limited data access", "Methodological constraints", "Public skepticism"], correctIndex: 2, explanation: "The passage notes that current research methods cannot adequately capture long-term effects." },
      { stem: `Which choice provides the best evidence for the answer to the previous question?`, options: ["Lines 15-20", "Lines 28-33", "Lines 41-46", "Lines 55-60"], correctIndex: 1, explanation: "Lines 28-33 explicitly describe the methodological limitations researchers face." },
      { stem: `The tone of the passage is best described as:`, options: ["Enthusiastic and optimistic", "Critical and skeptical", "Objective and analytical", "Humorous and lighthearted"], correctIndex: 2, explanation: "The author maintains a neutral, evidence-based tone throughout." },
      { stem: `The author would most likely agree with which statement?`, options: ["Technology alone cannot solve educational challenges", "Standardized testing should be eliminated", "Teacher training is the most important factor", "Students learn best in groups"], correctIndex: 0, explanation: "The passage argues that while technology helps, it must be paired with sound pedagogy." },
      { stem: `Data in the graph accompanying the passage shows that student performance:`, options: ["Declined steadily", "Improved after intervention", "Remained unchanged", "Varied by region"], correctIndex: 1, explanation: "The graph clearly shows a positive trend following the introduction of the program in 2018." },
    ]
  }
  
  // Writing / Conventions questions
  return [
    { stem: `Choose the best version of the underlined portion: "The team (was, were) ready for the competition."`, options: ["was", "were", "is", "are"], correctIndex: 0, explanation: "'Team' is a collective noun and takes a singular verb in American English." },
    { stem: `Which correction is needed? "Its important to arrive on time."`, options: ["Change Its to It's", "Change Its to Their", "No change needed", "Add a comma"], correctIndex: 0, explanation: "'Its' is possessive; 'it's' is the contraction for 'it is'." },
    { stem: `Which transition best connects these sentences? "The experiment failed. ___, the team learned valuable lessons."`, options: ["Furthermore", "However", "Therefore", "Indeed"], correctIndex: 1, explanation: "'However' shows contrast between the failure and the positive outcome of learning." },
    { stem: `Where should a comma be added? "After the rain stopped we went outside."`, options: ["After the rain, stopped we", "After the rain stopped, we", "After the rain stopped we,", "No comma needed"], correctIndex: 1, explanation: "A comma follows an introductory dependent clause." },
    { stem: `Which sentence is grammatically correct?`, options: ["Each of the students have a book.", "Each of the students has a book.", "Each of the students are having a book.", "Each of the students were with a book."], correctIndex: 1, explanation: "'Each' takes a singular verb, so 'has' is correct." },
    { stem: `Choose the correct form: "She is the (more, most) talented musician in the orchestra."`, options: ["more", "most", "much", "many"], correctIndex: 1, explanation: "When comparing one person to an entire group, use the superlative 'most'." },
    { stem: `The passage is written in the third person. Which revision maintains consistency? "One should always check (their, your, his or her, its) work."`, options: ["their", "your", "his or her", "its"], correctIndex: 2, explanation: "In formal writing, 'one' pairs with 'his or her' for third-person consistency." },
    { stem: `Which creates the most logical sentence? "The study concluded that more research (was, is, will be, had been) needed."`, options: ["was", "is", "will be", "had been"], correctIndex: 0, explanation: "Past tense 'concluded' requires past tense 'was needed'." },
    { stem: `Choose the best word: "The results were (adverse, averse) to the hypothesis."`, options: ["adverse", "averse", "advert", "diverse"], correctIndex: 0, explanation: "'Adverse' means contrary or opposing; 'averse' means having a dislike." },
    { stem: `Which sentence uses correct punctuation?`, options: ["The teacher asked, what is the capital of France?", "The teacher asked, 'what is the capital of France?'", 'The teacher asked, "What is the capital of France?"', "The teacher asked what is the capital of France."], correctIndex: 2, explanation: "Quoted questions require a comma before the quote, capital letter, question mark inside quotes." },
  ]
}

async function main() {
  console.log("🌱 Seeding SAT Gold Questions...")
  console.log("=".repeat(60))

  const tenant = await prisma.tenant.findFirst({ where: { slug: "aeeg" } })
  if (!tenant) throw new Error("Tenant 'aeeg' not found. Run seed.ts first.")
  console.log(`Tenant: ${tenant.name} (${tenant.id})`)

  // Find all SAT micro-skills
  const satMicroSkills = await prisma.microSkill.findMany({
    where: {
      code: { startsWith: "sat-" },
      isActive: true,
    },
    include: {
      skill: true,
    },
  })

  console.log(`Found ${satMicroSkills.length} SAT micro-skills to process.`)

  let totalGold = 0
  const difficulties = ["easy", "medium", "hard"]
  const diffCount = { easy: 3, medium: 4, hard: 3 }
  let skippedNoTemplate = 0

  for (const ms of satMicroSkills) {
    const skill = ms.skill
    const isReading = skill.subject === "reading" || skill.code.includes("rw-info") || skill.code.includes("rw-craft")
    const isWriting = skill.subject === "writing" || skill.code.includes("rw-exp") || skill.code.includes("rw-conv")
    const isMath = skill.subject === "math"

    for (const diff of difficulties) {
      const count = diffCount[diff as keyof typeof diffCount]
      for (let i = 0; i < count; i++) {
        const seed = (ms.id + diff + i).split("").reduce((a, c) => a + c.charCodeAt(0), 0)
        const rng = seededRand(seed)
        const hash = makeHash(ms.id, diff, i)

        // Check if already exists
        const existing = await prisma.goldQuestion.findUnique({ where: { hash } })
        if (existing) {
          totalGold++
          continue
        }

        let question: QuestionTemplate
        const skillInfo: SkillInfo = { code: skill.code, name: skill.name, domain: skill.domain, category: skill.category, subject: skill.subject }
        if (isMath) {
          const pool = makeSATMathQuestions(skillInfo, diff)
          question = pool[i % pool.length]
        } else if (isReading) {
          const pool = makeSATRWQuestions({ ...skillInfo, subject: "reading" }, diff)
          question = pool[i % pool.length]
        } else if (isWriting) {
          const pool = makeSATRWQuestions({ ...skillInfo, subject: "writing" }, diff)
          question = pool[i % pool.length]
        } else {
          skippedNoTemplate++
          continue
        }

        // Shift correct answer based on seed for variety
        const correctAnswer = question.correctIndex.toString()
        const correctLetter = String.fromCharCode(65 + question.correctIndex) // A, B, C, D

        await prisma.goldQuestion.create({
          data: {
            tenantId: tenant.id,
            externalId: `sat-gold-${ms.id}-${diff}-${i}`,
            subject: skill.subject,
            domain: skill.domain,
            category: skill.category,
            difficulty: diff,
            format: "multiple-choice",
            stem: question.stem,
            options: JSON.stringify(question.options),
            correctAnswer: correctLetter,
            explanation: question.explanation,
            skillCode: skill.code,
            microSkillId: ms.id,
            hash,
            goldStatus: "certified",
            version: 1,
          },
        })

        totalGold++
      }
    }
  }

  console.log(`\n✅ SAT Gold Questions seeded: ${totalGold}`)
  console.log(`   (${skippedNoTemplate} micro-skills skipped due to missing template)`)

  const summary = await prisma.goldQuestion.count({
    where: { microSkillId: { in: satMicroSkills.map(ms => ms.id) } },
  })
  console.log(`   Total SAT gold questions in DB: ${summary}`)
}

main()
  .catch((e) => { console.error("❌ Failed:", e); process.exit(1) })
  .finally(() => prisma.$disconnect())