// Seed script for Practice Buddy
// Run: npx tsx prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as bcrypt from "bcryptjs"

const connectionString = process.env.DATABASE_URL || "postgresql://practice_buddy:practice_buddy_dev@localhost:5432/practice_buddy"
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding Practice Buddy...")

  // ── Tenants ──
  const aeeg = await prisma.tenant.upsert({
    where: { slug: "aeeg" },
    create: { name: "American Egyptian Education Group", slug: "aeeg", domain: "aeeg.com", isActive: true },
    update: {},
  })
  const fidelis = await prisma.tenant.upsert({
    where: { slug: "fidelis" },
    create: { name: "Fidelis Consulting", slug: "fidelis", isActive: true },
    update: {},
  })
  console.log(`  Tenants: ${aeeg.name}, ${fidelis.name}`)

  // ── Admin User ──
  const adminPw = await bcrypt.hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@aeeg.com" },
    create: { tenantId: aeeg.id, email: "admin@aeeg.com", name: "Admin", passwordHash: adminPw, role: "admin" },
    update: {},
  })
  console.log(`  Admin: ${admin.email}`)

  // ── Programs ──
  const coreCode = "core"
  let coreProgram = await prisma.program.findFirst({ where: { tenantId: aeeg.id, code: coreCode } })
  if (!coreProgram) {
    coreProgram = await prisma.program.create({ data: { tenantId: aeeg.id, code: coreCode, name: "Core Program", description: "Grades 3-10 Math & English" } })
  }
  const satCode = "sat"
  let satProgram = await prisma.program.findFirst({ where: { tenantId: aeeg.id, code: satCode } })
  if (!satProgram) {
    satProgram = await prisma.program.create({ data: { tenantId: aeeg.id, code: satCode, name: "SAT Preparation", description: "Digital SAT Math, Reading & Writing" } })
  }
  const mapCode = "map"
  let mapProgram = await prisma.program.findFirst({ where: { tenantId: aeeg.id, code: mapCode } })
  if (!mapProgram) {
    mapProgram = await prisma.program.create({ data: { tenantId: aeeg.id, code: mapCode, name: "MAP Growth", description: "K-8 adaptive assessment" } })
  }
  console.log(`  Programs: ${coreProgram.name}, ${satProgram.name}, ${mapProgram.name}`)

  // ── Grades ──
  const grade8 = await prisma.grade.upsert({
    where: { programId_level: { programId: coreProgram.id, level: 8 } },
    create: { programId: coreProgram.id, level: 8, label: "Grade 8" },
    update: {},
  })
  const satMath = await prisma.grade.upsert({
    where: { programId_level: { programId: satProgram.id, level: 0 } },
    create: { programId: satProgram.id, level: 0, label: "SAT Math" },
    update: {},
  })
  const satReading = await prisma.grade.upsert({
    where: { programId_level: { programId: satProgram.id, level: 1 } },
    create: { programId: satProgram.id, level: 1, label: "SAT Reading & Writing" },
    update: {},
  })
  console.log(`  Grades created`)

  // ── Skills ──
  const skills = [
    { gradeId: grade8.id, code: "g8-math-alg", name: "Linear Equations", subject: "math", domain: "Algebra" },
    { gradeId: grade8.id, code: "g8-math-geo", name: "Geometry Basics", subject: "math", domain: "Geometry" },
    { gradeId: grade8.id, code: "g8-reading", name: "Reading Comprehension", subject: "reading", domain: "Craft & Structure" },
    { gradeId: satMath.id, code: "sat-alg", name: "Algebra", subject: "math", domain: "Algebra" },
    { gradeId: satMath.id, code: "sat-adv", name: "Advanced Math", subject: "math", domain: "Advanced Math" },
    { gradeId: satMath.id, code: "sat-data", name: "Data Analysis", subject: "math", domain: "Data & Statistics" },
    { gradeId: satReading.id, code: "sat-rw-info", name: "Information & Ideas", subject: "reading", domain: "Information & Ideas" },
    { gradeId: satReading.id, code: "sat-rw-craft", name: "Craft & Structure", subject: "reading", domain: "Craft & Structure" },
    { gradeId: satReading.id, code: "sat-rw-grammar", name: "Standard English Conventions", subject: "writing", domain: "Grammar" },
  ]
  for (const s of skills) {
    await prisma.skill.upsert({
      where: { gradeId_code: { gradeId: s.gradeId, code: s.code } },
      create: s,
      update: {},
    })
  }
  console.log(`  Skills: ${skills.length}`)

  // ── Gold Questions ──
  const goldQuestions = [
    {
      subject: "math", domain: "Algebra", category: "Linear Equations", subcategory: "Solving for x",
      difficulty: "medium", format: "multiple-choice", stem: "If 3x + 7 = 22, what is the value of x?",
      options: JSON.stringify(["3", "5", "6", "7"]), correctAnswer: "5", explanation: "Subtract 7 from both sides: 3x = 15, then divide by 3: x = 5",
      skillCode: "sat-alg",
    },
    {
      subject: "math", domain: "Algebra", category: "Systems of Equations", subcategory: "Two variables",
      difficulty: "hard", format: "multiple-choice", stem: "If 2x + y = 10 and x - y = 2, what is the value of x?",
      options: JSON.stringify(["2", "3", "4", "5"]), correctAnswer: "4", explanation: "Add the equations: 3x = 12, so x = 4",
      skillCode: "sat-alg",
    },
    {
      subject: "reading", domain: "Information & Ideas", category: "Main Idea",
      difficulty: "medium", format: "multiple-choice",
      stem: "The author uses the example of marine fossils in the Himalayas primarily to:",
      options: JSON.stringify([
        "Illustrate the diversity of ancient marine life",
        "Challenge the theory of continental drift",
        "Support the idea of a dynamic Earth's surface",
        "Demonstrate the effects of climate change",
      ]),
      correctAnswer: "Support the idea of a dynamic Earth's surface",
      explanation: "The passage states fossils provided evidence that the Earth's surface was not static.",
      skillCode: "sat-rw-info",
    },
    {
      subject: "math", domain: "Advanced Math", category: "Quadratic Functions",
      difficulty: "hard", format: "multiple-choice",
      stem: "What are the solutions to x² - 5x + 6 = 0?",
      options: JSON.stringify(["x = 2, x = 3", "x = -2, x = -3", "x = 1, x = 6", "x = -1, x = -6"]),
      correctAnswer: "x = 2, x = 3",
      explanation: "Factor the equation: (x - 2)(x - 3) = 0, so x = 2 or x = 3",
      skillCode: "sat-adv",
    },
    {
      subject: "writing", domain: "Grammar", category: "Standard English Conventions",
      difficulty: "medium", format: "multiple-choice",
      stem: "Choose the correct form: Neither the teacher nor the students ___ satisfied with the results.",
      options: JSON.stringify(["was", "were", "is", "has been"]),
      correctAnswer: "were",
      explanation: "When subjects are joined by 'nor', the verb agrees with the closer subject (students → were).",
      skillCode: "sat-rw-grammar",
    },
  ]

  for (const gq of goldQuestions) {
    const skill = await prisma.skill.findFirst({ where: { code: gq.skillCode, gradeId: { not: undefined } } })
    if (!skill) continue

    // Create Gold Question
    const goldHash = require("crypto").createHash("sha256").update(gq.stem + gq.correctAnswer).digest("hex")
    const gold = await prisma.goldQuestion.create({
      data: {
        tenantId: aeeg.id, subject: gq.subject, domain: gq.domain, category: gq.category, subcategory: gq.subcategory,
        difficulty: gq.difficulty, format: gq.format, stem: gq.stem, options: gq.options,
        correctAnswer: gq.correctAnswer, explanation: gq.explanation,
        hash: goldHash, goldStatus: "certified",
      },
    })

    // Create Question Family
    const family = await prisma.questionFamily.create({
      data: {
        tenantId: aeeg.id, goldQuestionId: gold.id,
        name: `${gq.skillCode}-${gq.domain.substring(0, 3).toUpperCase()}`,
        difficulty: gq.difficulty,
      },
    })

    // Create the actual Question
    const hash = require("crypto").createHash("sha256").update(gq.stem + gq.correctAnswer).digest("hex")
    await prisma.question.create({
      data: {
        tenantId: aeeg.id, goldQuestionId: gold.id, familyId: family.id,
        skillId: skill.id, programId: satProgram.id,
        subject: gq.subject, domain: gq.domain, category: gq.category, subcategory: gq.subcategory,
        difficulty: gq.difficulty, format: gq.format, stem: gq.stem, options: gq.options,
        correctAnswer: gq.correctAnswer, explanation: gq.explanation,
        hash, qualityStatus: "published", isActive: true,
      },
    })
  }
  console.log(`  Gold Questions: ${goldQuestions.length} created with families`)

  // ── Feature Flags (defaults) ──
  const flags = [
    { key: "practice_platform", label: "Practice Platform", isActive: true },
    { key: "mock_exams", label: "Mock Exams", isActive: true },
    { key: "ai_question_factory", label: "AI Question Factory", isActive: true },
    { key: "teacher_dashboard", label: "Teacher Dashboard", isActive: true },
    { key: "parent_portal", label: "Parent Portal", isActive: false },
    { key: "advanced_analytics", label: "Advanced Analytics", isActive: false },
  ]
  for (const f of flags) {
    await prisma.featureFlag.upsert({
      where: { key: f.key },
      create: { key: f.key, label: f.label, isActive: f.isActive },
      update: { label: f.label, isActive: f.isActive },
    })
  }
  console.log(`  Feature Flags: ${flags.length}`)

  // ── Subscription Plans ──
  const plans = [
    { name: "Free", description: "Basic access", price: 0, interval: "monthly" },
    { name: "Premium", description: "Full access to all practice content", price: 29.99, interval: "monthly" },
    { name: "Premium Yearly", description: "Full access at a discount", price: 249.99, interval: "yearly" },
    { name: "School", description: "Multi-student management", price: 499.99, interval: "monthly" },
    { name: "Enterprise", description: "Custom integration and support", price: 999.99, interval: "monthly" },
  ]
  for (const p of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { name: p.name },
      create: { name: p.name, description: p.description, price: p.price, interval: p.interval, isActive: true },
      update: {},
    })
  }
  console.log(`  Subscription Plans: ${plans.length}`)

  console.log("✅ Seed complete!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())