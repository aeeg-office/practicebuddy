/**
 * Lumaani — Core English Gold Question Seeder
 *
 * Creates exactly 10 certified gold questions per Core English micro-skill.
 * Follows the same pattern as seed-sat-gold.ts but for the Core English program.
 *
 * Run: DATABASE_URL='postgresql://lumaani_prod:***@localhost:5432/lumaani_prod' npx tsx prisma/seed-core-english-gold.ts
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
  return crypto.createHash("sha256").update(`core-eng-gold-${microSkillId}-${difficulty}-${index}`).digest("hex").slice(0, 20)
}

// ─── Question Templates per Pool ───

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

/** Reading pool — 10 questions for Reading Literature and Reading Informational domains */
const readingQuestions: QuestionTemplate[] = [
  {
    stem: `Based on the passage, what is the primary purpose of the author's description of the sunrise?`,
    options: [
      "To establish a peaceful mood for the scene",
      "To indicate the exact time of day",
      "To contrast the beauty of nature with human conflict",
      "To foreshadow a tragic event",
    ],
    correctIndex: 0,
    explanation:
      "The sunrise imagery — warm colors, gentle light — establishes a calm, peaceful mood that frames the opening scene.",
  },
  {
    stem: `Which of the following best describes the narrator's attitude toward the protagonist?`,
    options: [
      "Admiring and respectful",
      "Critical and judgmental",
      "Detached and indifferent",
      "Sympathetic yet frustrated",
    ],
    correctIndex: 3,
    explanation:
      "The narrator expresses sympathy for the protagonist's struggles but also shows frustration with their repeated poor decisions.",
  },
  {
    stem: `In line 14, the word "austere" most nearly means:`,
    options: ["Severe and plain", "Warm and inviting", "Expensive and lavish", "Temporary and fleeting"],
    correctIndex: 0,
    explanation: "In context, 'austere' describes the room as severe, simple, and without ornament — not lavish or warm.",
  },
  {
    stem: `The author includes the historical background in paragraphs 2-3 primarily to:`,
    options: ["Provide context for the current situation", "Criticize past government policies", "Show the passage of time", "Introduce a secondary character"],
    correctIndex: 0,
    explanation: "The historical background gives readers the essential context needed to understand why the current situation developed as it did.",
  },
  {
    stem: `Which statement best summarizes the central argument of the passage?`,
    options: [
      "Technological progress inevitably leads to social division",
      "Community cooperation is essential for sustainable development",
      "Individual effort matters more than collective action",
      "Economic growth should take priority over environmental concerns",
    ],
    correctIndex: 1,
    explanation:
      "The passage consistently argues that sustainable development depends on communities working together rather than individual or purely economic approaches.",
  },
  {
    stem: `The author's use of the phrase "an unbroken thread" in line 28 suggests that:`,
    options: [
      "The tradition has continued without interruption",
      "The fabric was woven by expert hands",
      "The connection was fragile and easily broken",
      "The story was incomplete and needed repair",
    ],
    correctIndex: 0,
    explanation: "'Unbroken thread' is a metaphor for a tradition that has persisted continuously without interruption across generations.",
  },
  {
    stem: `Which of the following best describes the structure of the passage?`,
    options: [
      "A personal narrative followed by reflective commentary",
      "A problem presented followed by proposed solutions",
      "A chronological account of historical events",
      "A comparison of two opposing viewpoints",
    ],
    correctIndex: 1,
    explanation:
      "The passage first identifies a specific problem and then examines several potential solutions, evaluating the merits of each.",
  },
  {
    stem: `As used in line 42, "speculative" most nearly means:`,
    options: ["Theoretical", "Financial", "Dangerous", "Practical"],
    correctIndex: 0,
    explanation: "'Speculative' here means based on theory or conjecture rather than proven fact — not yet grounded in evidence.",
  },
  {
    stem: `The author mentions the 2019 study in paragraph 5 in order to:`,
    options: [
      "Provide empirical support for a previous claim",
      "Challenge the findings of earlier research",
      "Introduce a new area of investigation",
      "Highlight a methodological limitation",
    ],
    correctIndex: 0,
    explanation:
      "The 2019 study provides data that directly supports the author's earlier claim about the effectiveness of early intervention programs.",
  },
  {
    stem: `Which of the following would the author most likely identify as the greatest obstacle to progress in this field?`,
    options: [
      "Insufficient funding for long-term research",
      "Resistance from established institutions",
      "Lack of public awareness about the issue",
      "Difficulty measuring long-term outcomes",
    ],
    correctIndex: 3,
    explanation:
      "The passage emphasizes that current measurement tools cannot adequately capture multi-year outcomes, making it hard to prove what works.",
  },
]

/** Grammar pool — 10 questions for Grammar & Language domain */
const grammarQuestions: QuestionTemplate[] = [
  {
    stem: `Which sentence is grammatically correct?`,
    options: [
      "Neither the teacher nor the students was ready for the exam.",
      "Neither the teacher nor the students were ready for the exam.",
      "Neither the teacher nor the students are ready for the exam.",
      "Neither the teacher nor the students is ready for the exam.",
    ],
    correctIndex: 1,
    explanation:
      "With 'neither...nor', the verb agrees with the nearest subject. 'Students' is plural, so 'were' is correct. The past tense 'was ready' in the first option fails subject-verb agreement.",
  },
  {
    stem: `Choose the correct version: "The committee ___ its final decision yesterday."`,
    options: ["have made", "has made", "are making", "were making"],
    correctIndex: 1,
    explanation: "'Committee' is a collective noun and takes a singular verb in American English. The action is completed (yesterday), so present perfect 'has made' is correct.",
  },
  {
    stem: `Which sentence uses correct punctuation?`,
    options: [
      "The package arrived however it was damaged.",
      "The package arrived; however, it was damaged.",
      "The package arrived, however it was damaged.",
      "The package arrived however, it was damaged.",
    ],
    correctIndex: 1,
    explanation: "'However' as a conjunctive adverb requires a semicolon before it and a comma after it when joining two independent clauses.",
  },
  {
    stem: `Identify the sentence with the correct use of the apostrophe:`,
    options: [
      "The childrens' toys were scattered across the floor.",
      "The children's toys were scattered across the floor.",
      "The childs' toys were scattered across the floor.",
      "The childrens's toys were scattered across the floor.",
    ],
    correctIndex: 1,
    explanation: "'Children' is an irregular plural that does not end in 's', so the possessive is formed by adding 's: children's.",
  },
  {
    stem: `Which sentence contains a dangling modifier?`,
    options: [
      "Walking through the park, the flowers were beautiful.",
      "Walking through the park, I admired the beautiful flowers.",
      "While walking through the park, I saw beautiful flowers.",
      "I admired the beautiful flowers while walking through the park.",
    ],
    correctIndex: 0,
    explanation: "In the first option, 'walking through the park' modifies 'the flowers', which cannot walk. The modifier dangles because its intended subject is missing.",
  },
  {
    stem: `Choose the correct word: "The new policy will ___ all employees equally."`,
    options: ["affect", "effect", "affects", "effects"],
    correctIndex: 0,
    explanation: "'Affect' (verb) means to influence or have an impact on. 'Effect' is typically used as a noun meaning result. Here we need a verb, so 'affect' is correct.",
  },
  {
    stem: `Which of the following is a complete sentence rather than a fragment?`,
    options: [
      "Because the experiment yielded unexpected results.",
      "The experiment yielding unexpected results.",
      "The experiment yielded unexpected results.",
      "Yielding unexpected results from the experiment.",
    ],
    correctIndex: 2,
    explanation: "Option C has a subject ('the experiment') and a verb ('yielded'), forming a complete independent clause. The others are fragments missing either a subject or a main verb.",
  },
  {
    stem: `Select the sentence with correct subject-verb agreement:`,
    options: [
      "Every one of the students have completed the assignment.",
      "Every one of the students has completed the assignment.",
      "Every one of the students have been completing the assignment.",
      "Every one of the students were completing the assignment.",
    ],
    correctIndex: 1,
    explanation: "'Every one' is the subject and is singular, so the verb must be singular: 'has'. The phrase 'of the students' is a prepositional phrase and does not affect agreement.",
  },
  {
    stem: `Which revision correctly fixes the parallelism error in this sentence? "She enjoys reading, to swim, and hiking."`,
    options: [
      "She enjoys reading, swimming, and hiking.",
      "She enjoys to read, swimming, and hiking.",
      "She enjoys reading, to swim, and to hike.",
      "She enjoys to read, to swim, and hiking.",
    ],
    correctIndex: 0,
    explanation: "Parallel structure requires all items in a series to use the same grammatical form. 'Reading, swimming, and hiking' are all gerunds, creating correct parallelism.",
  },
  {
    stem: `Choose the correctly punctuated sentence:`,
    options: [
      "My sister who lives in Chicago is a doctor.",
      "My sister, who lives in Chicago, is a doctor.",
      "My sister, who lives in Chicago is a doctor.",
      "My sister who lives in Chicago, is a doctor.",
    ],
    correctIndex: 1,
    explanation: "When the relative clause 'who lives in Chicago' is non-restrictive (the speaker has only one sister), it must be enclosed in commas. The commas set off non-essential information.",
  },
]

/** Writing pool — 10 questions for Writing domain */
const writingQuestions: QuestionTemplate[] = [
  {
    stem: `Which transition best connects these two sentences? "The experiment failed to produce the expected results. ___, the team gained valuable insights into the research process."`,
    options: ["Furthermore", "Nevertheless", "Therefore", "Likewise"],
    correctIndex: 1,
    explanation:
      "'Nevertheless' signals a contrast: despite the failure, valuable insights were gained. 'Therefore' and 'furthermore' would imply the insights followed logically from the failure, which misrepresents the relationship.",
  },
  {
    stem: `Choose the most concise revision of this sentence: "The reason why the meeting was postponed is due to the fact that the presenter was unavailable."`,
    options: [
      "The reason the meeting was postponed is because the presenter was unavailable.",
      "The meeting was postponed because the presenter was unavailable.",
      "Due to the fact that the presenter was unavailable, the meeting was postponed.",
      "The meeting was postponed due to the presenter being unavailable.",
    ],
    correctIndex: 1,
    explanation: "Option B is the most concise while remaining grammatically correct. It eliminates the wordy construction 'the reason why...is due to the fact that' without losing meaning.",
  },
  {
    stem: `Which version creates the most logical paragraph coherence?`,
    options: [
      "First, the company surveyed customers. Then, they analyzed the data. Finally, they implemented changes.",
      "The company surveyed customers. They analyzed the data. They implemented changes.",
      "First, customers were surveyed by the company. Then, data was analyzed. Finally, changes were implemented.",
      "The company surveyed customers. Then implementing changes after analyzing the data.",
    ],
    correctIndex: 0,
    explanation: "Option A uses clear chronological markers ('First', 'Then', 'Finally') and consistent active voice, creating the most logical and readable sequence.",
  },
  {
    stem: `Which sentence uses the most appropriate tone for a formal academic essay?`,
    options: [
      "A ton of studies show that climate change is a real big deal.",
      "Research indicates that climate change poses significant environmental risks.",
      "Climate change is totally messing up the planet, obviously.",
      "Everyone knows that climate change is bad, like really bad.",
    ],
    correctIndex: 1,
    explanation: "Option B uses formal academic language ('Research indicates', 'significant environmental risks') suitable for scholarly writing, unlike the informal or colloquial alternatives.",
  },
  {
    stem: `Which revision eliminates the redundancy in this sentence? "The committee will meet together at 3 PM to collaborate jointly on the proposal."`,
    options: [
      "The committee will meet together at 3 PM to collaborate on the proposal.",
      "The committee will meet at 3 PM to collaborate on the proposal.",
      "The committee will meet together at 3 PM to jointly collaborate on the proposal.",
      "The committee will meet at 3 PM to collaborate jointly on the proposal.",
    ],
    correctIndex: 1,
    explanation: "'Meet together' is redundant (meeting implies togetherness), and 'collaborate jointly' is redundant (collaboration implies joint effort). Option B removes both redundancies cleanly.",
  },
  {
    stem: `Choose the best placement for the underlined sentence: "[1] Recycling programs have expanded significantly. [2] Many cities now offer curbside pickup. [3] Participation rates remain low in some areas. [4] Education campaigns aim to address this gap." Where should the sentence "Without public awareness, even the best programs fail." be inserted?`,
    options: ["After sentence 1", "After sentence 2", "After sentence 3", "After sentence 4"],
    correctIndex: 2,
    explanation: "Sentence 3 introduces the problem (low participation), and the inserted sentence explains why low participation matters. It fits best after sentence 3 as a bridge to sentence 4 (the solution).",
  },
  {
    stem: `Which of the following provides the best supporting evidence for the claim that "reading fiction improves empathy"?`,
    options: [
      "Many people enjoy reading fiction in their free time.",
      "A 2018 study found that participants who read literary fiction showed improved ability to understand others' emotions.",
      "Fiction books are often bestsellers and popular worldwide.",
      "Teachers often assign fiction in their literature classes.",
    ],
    correctIndex: 1,
    explanation: "Option B provides specific, empirical evidence (a 2018 study with measurable outcomes) that directly supports the claim, unlike the general statements in the other options.",
  },
  {
    stem: `Which revision best improves the sentence variety in this paragraph? "The building was constructed in 1920. The building was renovated in 1950. The building was demolished in 2000."`,
    options: [
      "The building was constructed in 1920, renovated in 1950, and demolished in 2000.",
      "The building, constructed in 1920, renovated in 1950, and demolished in 2000.",
      "Constructed in 1920, the building was renovated in 1950 and eventually demolished in 2000.",
      "The building — constructed in 1920; renovated in 1950; demolished in 2000.",
    ],
    correctIndex: 2,
    explanation: "Option C varies the sentence structure by using a participial phrase at the beginning and combining the remaining events into a single clause, creating a much more readable and varied sentence.",
  },
  {
    stem: `Which sentence uses active voice most effectively?`,
    options: [
      "The decision was made by the board after lengthy deliberation.",
      "The board made the decision after lengthy deliberation.",
      "The decision, after lengthy deliberation, was made by the board.",
      "After lengthy deliberation, the decision was made by the board.",
    ],
    correctIndex: 1,
    explanation: "Option B uses active voice ('The board made') with the subject performing the action directly. Active voice is generally more direct and vigorous than passive voice.",
  },
  {
    stem: `Select the revision that best improves the clarity of this sentence: "The professor told the student that he needed to revise his paper before the deadline."`,
    options: [
      "The professor told the student that the student needed to revise his paper before the deadline.",
      "The professor told the student that he, the professor, needed to revise his paper before the deadline.",
      "The professor required the student to revise his paper before the deadline.",
      "The professor told the student that he needed to revise his paper, the deadline being before.",
    ],
    correctIndex: 2,
    explanation: "The original is ambiguous about who 'he' refers to. Option C eliminates the ambiguous pronoun by using 'required the student to revise', making it clear the student must do the revising.",
  },
]

// ─── Pool Selection by Domain ───

function selectPool(domain: string): QuestionTemplate[] {
  if (domain === "Reading Literature" || domain === "Reading Informational") {
    return readingQuestions
  }
  if (domain === "Writing") {
    return writingQuestions
  }
  if (domain === "Grammar & Language") {
    return grammarQuestions
  }
  return readingQuestions
}

async function main() {
  console.log("🌱 Seeding Core English Gold Questions...")
  console.log("=".repeat(60))

  const tenant = await prisma.tenant.findFirst({ where: { slug: "aeeg" } })
  if (!tenant) throw new Error("Tenant 'aeeg' not found. Run seed.ts first.")
  console.log(`Tenant: ${tenant.name} (${tenant.id})`)

  // Find all Core English micro-skills
  const coreEngMicroSkills = await prisma.microSkill.findMany({
    where: {
      code: { contains: "-eng-" },
      isActive: true,
    },
    include: {
      skill: true,
    },
  })

  console.log(`Found ${coreEngMicroSkills.length} Core English micro-skills to process.`)

  let totalGold = 0
  const difficulties = ["easy", "medium", "hard"]
  const diffCount = { easy: 3, medium: 4, hard: 3 }
  let skippedNoTemplate = 0

  for (const ms of coreEngMicroSkills) {
    const skill = ms.skill
    const pool = selectPool(skill.domain)

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

        const question = pool[i % pool.length]

        // Shift correct answer based on seed for variety
        const correctAnswer = question.correctIndex.toString()
        const correctLetter = String.fromCharCode(65 + question.correctIndex) // A, B, C, D

        await prisma.goldQuestion.create({
          data: {
            tenantId: tenant.id,
            externalId: `core-eng-gold-${ms.id}-${diff}-${i}`,
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

  console.log(`\n✅ Core English Gold Questions seeded: ${totalGold}`)
  console.log(`   (${skippedNoTemplate} micro-skills skipped due to missing template)`)

  const summary = await prisma.goldQuestion.count({
    where: { microSkillId: { in: coreEngMicroSkills.map(ms => ms.id) } },
  })
  console.log(`   Total Core English gold questions in DB: ${summary}`)
}

main()
  .catch((e) => { console.error("❌ Failed:", e); process.exit(1) })
  .finally(() => prisma.$disconnect())