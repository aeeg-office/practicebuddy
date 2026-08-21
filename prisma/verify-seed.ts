/**
 * Practice Buddy — Verify Seed Script
 * 
 * Counts all seeded records and reports statistics.
 * 
 * Run: npx tsx prisma/verify-seed.ts
 */

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("📊 Practice Buddy — Seed Statistics")
  console.log("=".repeat(60))

  const programs = await prisma.program.findMany({ orderBy: { code: "asc" } })
  console.log(`\nPrograms: ${programs.length}`)
  for (const p of programs) {
    const gradeCount = await prisma.grade.count({ where: { programId: p.id } })
    const skillCount = await prisma.skill.count({ where: { grade: { programId: p.id } } })
    const microSkillCount = await prisma.microSkill.count({ where: { skill: { grade: { programId: p.id } } } })
    const questionCount = await prisma.question.count({ where: { programId: p.id } })
    console.log(`  ${p.code.padEnd(16)} ${p.name.padEnd(30)} ${gradeCount}g/${skillCount}s/${microSkillCount}ms/${questionCount}q`)
  }

  console.log("\n--- Aggregate ---")
  const totals = {
    programs: await prisma.program.count(),
    grades: await prisma.grade.count(),
    skills: await prisma.skill.count(),
    microSkills: await prisma.microSkill.count(),
    goldQuestions: await prisma.goldQuestion.count(),
    questionFamilies: await prisma.questionFamily.count(),
    questions: await prisma.question.count(),
    questionVersions: await prisma.questionVersion.count(),
    attempts: await prisma.studentAttempt.count(),
    mastery: await prisma.userSkillMastery.count(),
  }

  for (const [key, val] of Object.entries(totals)) {
    console.log(`  ${key.padEnd(20)} ${String(val).padStart(6)}`)
  }

  console.log("\n--- Skills by Subject ---")
  const subjects = await prisma.skill.groupBy({
    by: ["subject"],
    _count: { id: true },
    orderBy: { subject: "asc" },
  })
  for (const s of subjects) {
    console.log(`  ${s.subject.padEnd(12)} ${s._count.id} skills`)
  }

  console.log("\n--- Skills by Domain (top 15) ---")
  const domains = await prisma.skill.groupBy({
    by: ["domain"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 15,
  })
  for (const d of domains) {
    console.log(`  ${d.domain.padEnd(40)} ${d._count.id} skills`)
  }

  console.log("\n✅ Verification complete!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())