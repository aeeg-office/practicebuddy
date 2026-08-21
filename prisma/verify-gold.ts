import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = "postgresql://practice_buddy:practice_buddy_dev@localhost:5432/practice_buddy"
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("📊 GOLD QUESTION COVERAGE REPORT")
  console.log("=".repeat(70))

  // === 1. Aggregates ===
  const aggs = {
    goldQuestions: await prisma.goldQuestion.count(),
    questionFamilies: await prisma.questionFamily.count(),
    questions: await prisma.question.count(),
    questionVersions: await prisma.questionVersion.count(),
  }
  console.log("\n=== AGGREGATE COUNTS ===")
  for (const [k, v] of Object.entries(aggs)) console.log(`  ${k.padEnd(20)} ${String(v).padStart(6)}`)

  // === 2. Difficulty Distribution ===
  console.log("\n=== DIFFICULTY DISTRIBUTION ===")
  const byDiff = await prisma.goldQuestion.groupBy({ by: ["difficulty"], _count: { id: true } })
  for (const d of byDiff) {
    const pct = ((d._count.id / aggs.goldQuestions) * 100).toFixed(1)
    console.log(`  ${d.difficulty.padEnd(10)} ${String(d._count.id).padStart(6)} (${pct}%)`)
  }

  // === 3. Program-level counts ===
  console.log("\n=== PROGRAM-LEVEL COVERAGE ===")
  const programs = await prisma.program.findMany({ orderBy: { code: "asc" } })
  for (const p of programs) {
    const gCount = await prisma.grade.count({ where: { programId: p.id } })
    const sCount = await prisma.skill.count({ where: { grade: { programId: p.id } } })
    const msCount = await prisma.microSkill.count({ where: { skill: { grade: { programId: p.id } } } })
    const gqCount = await prisma.goldQuestion.count({ where: { microSkill: { skill: { grade: { programId: p.id } } } } })
    const qCount = await prisma.question.count({ where: { programId: p.id } })
    const target = msCount * 10
    const pct = target > 0 ? ((gqCount / target) * 100).toFixed(1) : "N/A"
    console.log(`  ${p.code.padEnd(12)} ${p.name.padEnd(30)} ${gCount}g/${sCount}s/${msCount}ms | ${gqCount}/${target} gq (${pct}%) | ${qCount}q`)
  }

  // === 4. Domain-level gold question distribution ===
  console.log("\n=== GOLD QUESTIONS BY DOMAIN (Core Math) ===")
  const coreMathProgram = await prisma.program.findFirst({ where: { code: "core-math" } })
  if (coreMathProgram) {
    const domains = await prisma.skill.groupBy({
      by: ["domain"],
      where: { grade: { programId: coreMathProgram.id } },
      _count: { id: true },
    })
    for (const d of domains) {
      const skills = await prisma.skill.findMany({ where: { domain: d.domain, grade: { programId: coreMathProgram.id } } })
      const skillIds = skills.map(s => s.id)
      const msCount = await prisma.microSkill.count({ where: { skillId: { in: skillIds } } })
      const gqCount = await prisma.goldQuestion.count({ where: { microSkill: { skillId: { in: skillIds } } } })
      console.log(`  ${d.domain.padEnd(35)} ${msCount} ms → ${gqCount} gq (${((gqCount / (msCount * 10)) * 100).toFixed(0)}%)`)
    }
  }

  // === 5. Micro-skills with < 10 gold questions ===
  console.log("\n=== MICRO-SKILLS BELOW TARGET (first 20) ===")
  const allMs = await prisma.microSkill.findMany({
    where: { skill: { grade: { programId: coreMathProgram?.id } } },
    orderBy: { code: "asc" },
  })
  let below = 0
  let atTarget = 0
  for (const ms of allMs) {
    const cnt = await prisma.goldQuestion.count({ where: { microSkillId: ms.id } })
    if (cnt < 10) {
      below++
      if (below <= 20) {
        const skill = await prisma.skill.findUnique({ where: { id: ms.skillId } })
        console.log(`  ⚠️  ${ms.code.padEnd(35)} ${cnt}/10 gq (domain: ${skill?.domain || "?"})`)
      }
    } else {
      atTarget++
    }
  }
  console.log(`\n  At target (≥10 gq): ${atTarget}`)
  console.log(`  Below target:       ${below}`)

  // === 6. Sample gold questions ===
  console.log("\n=== SAMPLE GOLD QUESTIONS ===")
  const samples = await prisma.goldQuestion.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { microSkill: { select: { code: true } } },
  })
  for (const gq of samples) {
    console.log(`  [${gq.difficulty.padEnd(6)}] ${gq.stem.slice(0, 65)}...`)
    console.log(`        micro-skill: ${gq.microSkill?.code || "N/A"}, domain: ${gq.domain}`)
  }

  // === 7. Question family and version stats ===
  console.log("\n=== QUESTIONS PER FAMILY ===")
  const familyCounts = await prisma.questionFamily.findMany({
    include: { _count: { select: { questions: true } } },
  })
  const qPerFamily = familyCounts.map(f => f._count.questions)
  const avgQ = qPerFamily.reduce((a, b) => a + b, 0) / qPerFamily.length
  console.log(`  Total families: ${familyCounts.length}`)
  console.log(`  Avg questions/family: ${avgQ.toFixed(1)}`)
  console.log(`  Min: ${Math.min(...qPerFamily)}, Max: ${Math.max(...qPerFamily)}`)

  console.log("\n✅ Verification complete!")
}

main()
  .catch((e) => { console.error("ERROR:", e); process.exit(1) })
  .finally(() => prisma.$disconnect())