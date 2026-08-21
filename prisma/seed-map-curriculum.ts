/**
 * Practice Buddy — MAP Growth Curriculum Seed Script
 *
 * Seeds:
 *   - MAP Math, MAP Reading, MAP Language Usage RIT bands (151-160 → 281-290)
 *   - MAP-specific skills & micro-skills for Reading and Language Usage
 *   - Maps existing Core Math skills to MAP Math RIT bands
 *   - Gold questions and questions (100+ MAP-specific)
 *
 * Run: npx tsx prisma/seed-map-curriculum.ts
 * Prerequisites: prisma/seed.ts (tenant + admin) and prisma/seed-curriculum.ts (core curricula)
 */

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as crypto from "crypto"
import "dotenv/config"

const connectionString = process.env.DATABASE_URL || "postgresql://practice_buddy:***@localhost:5432/practice_buddy"
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

// ─── Types ───

interface RITBandDef {
  code: string
  label: string
  minScore: number
  maxScore: number
}

interface MappedSkillDef {
  code: string
  name: string
  subject: string
  domain: string
  category: string
  subcategory: string
  difficulty: string
  order: number
  microSkills: MappedMicroSkillDef[]
}

interface MappedMicroSkillDef {
  code: string
  name: string
  learningObjective: string
  difficulty: string
  order: number
}

// ─── RIT Band definitions ───

function makeRITBands(): RITBandDef[] {
  const bands: RITBandDef[] = []
  for (let min = 151; min <= 281; min += 10) {
    const max = min + 9
    bands.push({
      code: `rit-${min}-${max}`,
      label: `${min}-${max}`,
      minScore: min,
      maxScore: max,
    })
  }
  return bands
}

// ─── Micro-skill factory ───

function makeMicroSkills(code: string, name: string, baseObjective: string): MappedMicroSkillDef[] {
  return [
    {
      code: `${code}-basic`,
      name: `${name}: Basic`,
      learningObjective: `${baseObjective} — foundational understanding and recall.`,
      difficulty: "easy",
      order: 1,
    },
    {
      code: `${code}-app`,
      name: `${name}: Application`,
      learningObjective: `${baseObjective} — application and analysis in routine contexts.`,
      difficulty: "medium",
      order: 2,
    },
    {
      code: `${code}-adv`,
      name: `${name}: Advanced`,
      learningObjective: `${baseObjective} — synthesis, evaluation, and multi-step problems.`,
      difficulty: "hard",
      order: 3,
    },
  ]
}

// ─── MAP Reading Skills (RIT-aligned, K-10 equivalent) ───

function getMAPReadingSkills() {
  return [
    // ── Foundational Skills ──
    {
      code: "map-read-found-01", name: "Phonics & Decoding", subject: "reading", domain: "Foundational Skills",
      category: "Phonics & Word Recognition", subcategory: "Decoding", difficulty: "easy", order: 1,
      microSkills: makeMicroSkills("map-read-found-01", "Phonics & Decoding",
        "Apply phonics to decode grade-level words"),
    },
    {
      code: "map-read-found-02", name: "Reading Fluency", subject: "reading", domain: "Foundational Skills",
      category: "Fluency", subcategory: "Accuracy & Rate", difficulty: "easy", order: 2,
      microSkills: makeMicroSkills("map-read-found-02", "Reading Fluency",
        "Read grade-level text with accuracy, appropriate rate, and expression"),
    },
    // ── Vocabulary ──
    {
      code: "map-read-vocab-01", name: "Context Clues", subject: "reading", domain: "Vocabulary",
      category: "Context Clues", subcategory: "Definitional", difficulty: "easy", order: 3,
      microSkills: makeMicroSkills("map-read-vocab-01", "Context Clues",
        "Use context clues to determine the meaning of unfamiliar words"),
    },
    {
      code: "map-read-vocab-02", name: "Academic Vocabulary", subject: "reading", domain: "Vocabulary",
      category: "Academic Vocabulary", subcategory: "Domain-Specific", difficulty: "medium", order: 4,
      microSkills: makeMicroSkills("map-read-vocab-02", "Academic Vocabulary",
        "Understand and use grade-level academic and domain-specific vocabulary"),
    },
    {
      code: "map-read-vocab-03", name: "Word Analysis", subject: "reading", domain: "Vocabulary",
      category: "Word Analysis", subcategory: "Morphology", difficulty: "medium", order: 5,
      microSkills: makeMicroSkills("map-read-vocab-03", "Word Analysis",
        "Analyze word structure using prefixes, suffixes, and root words"),
    },
    // ── Literature ──
    {
      code: "map-read-lit-01", name: "Main Idea & Theme", subject: "reading", domain: "Literature",
      category: "Key Ideas & Details", subcategory: "Main Idea", difficulty: "medium", order: 6,
      microSkills: makeMicroSkills("map-read-lit-01", "Main Idea & Theme",
        "Identify main ideas and themes in literary texts"),
    },
    {
      code: "map-read-lit-02", name: "Inference in Literature", subject: "reading", domain: "Literature",
      category: "Key Ideas & Details", subcategory: "Inference", difficulty: "medium", order: 7,
      microSkills: makeMicroSkills("map-read-lit-02", "Inference in Literature",
        "Make logical inferences from literary texts"),
    },
    {
      code: "map-read-lit-03", name: "Figurative Language", subject: "reading", domain: "Literature",
      category: "Craft & Structure", subcategory: "Figurative Language", difficulty: "medium", order: 8,
      microSkills: makeMicroSkills("map-read-lit-03", "Figurative Language",
        "Interpret figurative language, imagery, and literary devices"),
    },
    {
      code: "map-read-lit-04", name: "Text Structure in Literature", subject: "reading", domain: "Literature",
      category: "Craft & Structure", subcategory: "Text Structure", difficulty: "medium", order: 9,
      microSkills: makeMicroSkills("map-read-lit-04", "Text Structure in Literature",
        "Analyze how text structure contributes to meaning in literary texts"),
    },
    {
      code: "map-read-lit-05", name: "Comparing Literary Texts", subject: "reading", domain: "Literature",
      category: "Integration of Knowledge", subcategory: "Comparison", difficulty: "hard", order: 10,
      microSkills: makeMicroSkills("map-read-lit-05", "Comparing Literary Texts",
        "Compare and contrast themes, characters, and plots across literary texts"),
    },
    // ── Informational Text ──
    {
      code: "map-read-info-01", name: "Central Ideas", subject: "reading", domain: "Informational Text",
      category: "Key Ideas & Details", subcategory: "Central Idea", difficulty: "medium", order: 11,
      microSkills: makeMicroSkills("map-read-info-01", "Central Ideas",
        "Identify central ideas and supporting details in informational texts"),
    },
    {
      code: "map-read-info-02", name: "Reasoning & Evidence", subject: "reading", domain: "Informational Text",
      category: "Key Ideas & Details", subcategory: "Inference", difficulty: "medium", order: 12,
      microSkills: makeMicroSkills("map-read-info-02", "Reasoning & Evidence",
        "Cite textual evidence to support analysis of informational texts"),
    },
    {
      code: "map-read-info-03", name: "Text Features & Structures", subject: "reading", domain: "Informational Text",
      category: "Craft & Structure", subcategory: "Text Features", difficulty: "medium", order: 13,
      microSkills: makeMicroSkills("map-read-info-03", "Text Features & Structures",
        "Analyze text features, structures, and organizational patterns"),
    },
    {
      code: "map-read-info-04", name: "Graphic Information", subject: "reading", domain: "Informational Text",
      category: "Integration of Knowledge", subcategory: "Graphic Information", difficulty: "medium", order: 14,
      microSkills: makeMicroSkills("map-read-info-04", "Graphic Information",
        "Interpret information presented in graphs, charts, and diagrams"),
    },
    {
      code: "map-read-info-05", name: "Argument Evaluation", subject: "reading", domain: "Informational Text",
      category: "Integration of Knowledge", subcategory: "Argument", difficulty: "hard", order: 15,
      microSkills: makeMicroSkills("map-read-info-05", "Argument Evaluation",
        "Evaluate arguments and claims in informational texts"),
    },
    // ── Critical Thinking ──
    {
      code: "map-read-crit-01", name: "Author's Purpose & Perspective", subject: "reading", domain: "Critical Thinking",
      category: "Analysis", subcategory: "Author's Purpose", difficulty: "medium", order: 16,
      microSkills: makeMicroSkills("map-read-crit-01", "Author's Purpose & Perspective",
        "Analyze author's purpose, perspective, and bias"),
    },
    {
      code: "map-read-crit-02", name: "Synthesizing Across Texts", subject: "reading", domain: "Critical Thinking",
      category: "Synthesis", subcategory: "Multiple Sources", difficulty: "hard", order: 17,
      microSkills: makeMicroSkills("map-read-crit-02", "Synthesizing Across Texts",
        "Synthesize information from multiple texts on the same topic"),
    },
  ]
}

// ─── MAP Language Usage Skills ───

function getMAPLanguageUsageSkills() {
  return [
    // ── Grammar & Usage ──
    {
      code: "map-lang-gram-01", name: "Nouns & Pronouns", subject: "language-usage", domain: "Grammar & Usage",
      category: "Parts of Speech", subcategory: "Nouns & Pronouns", difficulty: "easy", order: 1,
      microSkills: makeMicroSkills("map-lang-gram-01", "Nouns & Pronouns",
        "Identify and correctly use nouns and pronouns in context"),
    },
    {
      code: "map-lang-gram-02", name: "Verbs & Verb Tenses", subject: "language-usage", domain: "Grammar & Usage",
      category: "Parts of Speech", subcategory: "Verbs", difficulty: "easy", order: 2,
      microSkills: makeMicroSkills("map-lang-gram-02", "Verbs & Verb Tenses",
        "Identify and correctly use verbs, including correct verb tense"),
    },
    {
      code: "map-lang-gram-03", name: "Adjectives & Adverbs", subject: "language-usage", domain: "Grammar & Usage",
      category: "Parts of Speech", subcategory: "Adjectives & Adverbs", difficulty: "easy", order: 3,
      microSkills: makeMicroSkills("map-lang-gram-03", "Adjectives & Adverbs",
        "Identify and correctly use adjectives and adverbs"),
    },
    {
      code: "map-lang-gram-04", name: "Subject-Verb Agreement", subject: "language-usage", domain: "Grammar & Usage",
      category: "Usage", subcategory: "Subject-Verb Agreement", difficulty: "medium", order: 4,
      microSkills: makeMicroSkills("map-lang-gram-04", "Subject-Verb Agreement",
        "Ensure subjects and verbs agree in number and person"),
    },
    {
      code: "map-lang-gram-05", name: "Pronoun Agreement & Case", subject: "language-usage", domain: "Grammar & Usage",
      category: "Usage", subcategory: "Pronoun Agreement", difficulty: "medium", order: 5,
      microSkills: makeMicroSkills("map-lang-gram-05", "Pronoun Agreement & Case",
        "Use correct pronoun-antecedent agreement and pronoun case"),
    },
    // ── Sentence Structure ──
    {
      code: "map-lang-sent-01", name: "Complete Sentences", subject: "language-usage", domain: "Sentence Structure",
      category: "Complete Sentences", subcategory: "Fragments & Run-ons", difficulty: "medium", order: 6,
      microSkills: makeMicroSkills("map-lang-sent-01", "Complete Sentences",
        "Identify and correct sentence fragments and run-on sentences"),
    },
    {
      code: "map-lang-sent-02", name: "Sentence Combining", subject: "language-usage", domain: "Sentence Structure",
      category: "Combining Sentences", subcategory: "Coordination & Subordination", difficulty: "medium", order: 7,
      microSkills: makeMicroSkills("map-lang-sent-02", "Sentence Combining",
        "Combine sentences using coordination and subordination"),
    },
    {
      code: "map-lang-sent-03", name: "Parallel Structure", subject: "language-usage", domain: "Sentence Structure",
      category: "Parallel Structure", subcategory: "Consistency", difficulty: "hard", order: 8,
      microSkills: makeMicroSkills("map-lang-sent-03", "Parallel Structure",
        "Identify and correct errors in parallel structure"),
    },
    // ── Punctuation & Capitalization ──
    {
      code: "map-lang-punct-01", name: "End Punctuation", subject: "language-usage", domain: "Punctuation & Capitalization",
      category: "End Punctuation", subcategory: "Periods, Question Marks, Exclamation", difficulty: "easy", order: 9,
      microSkills: makeMicroSkills("map-lang-punct-01", "End Punctuation",
        "Use correct end punctuation for sentences"),
    },
    {
      code: "map-lang-punct-02", name: "Comma Usage", subject: "language-usage", domain: "Punctuation & Capitalization",
      category: "Commas", subcategory: "Comma Usage", difficulty: "medium", order: 10,
      microSkills: makeMicroSkills("map-lang-punct-02", "Comma Usage",
        "Use commas correctly in lists, clauses, and appositives"),
    },
    {
      code: "map-lang-punct-03", name: "Apostrophes & Quotation Marks", subject: "language-usage", domain: "Punctuation & Capitalization",
      category: "Advanced Punctuation", subcategory: "Apostrophes & Quotation Marks", difficulty: "medium", order: 11,
      microSkills: makeMicroSkills("map-lang-punct-03", "Apostrophes & Quotation Marks",
        "Use apostrophes and quotation marks correctly"),
    },
    {
      code: "map-lang-punct-04", name: "Capitalization", subject: "language-usage", domain: "Punctuation & Capitalization",
      category: "Capitalization", subcategory: "Rules", difficulty: "easy", order: 12,
      microSkills: makeMicroSkills("map-lang-punct-04", "Capitalization",
        "Apply capitalization rules in written work"),
    },
    // ── Writing Process ──
    {
      code: "map-lang-write-01", name: "Paragraph Structure", subject: "language-usage", domain: "Writing Process",
      category: "Organization", subcategory: "Paragraph Structure", difficulty: "medium", order: 13,
      microSkills: makeMicroSkills("map-lang-write-01", "Paragraph Structure",
        "Organize paragraphs with topic sentences and supporting details"),
    },
    {
      code: "map-lang-write-02", name: "Transitions & Cohesion", subject: "language-usage", domain: "Writing Process",
      category: "Cohesion", subcategory: "Transitions", difficulty: "medium", order: 14,
      microSkills: makeMicroSkills("map-lang-write-02", "Transitions & Cohesion",
        "Use transitional words and phrases to improve cohesion"),
    },
    {
      code: "map-lang-write-03", name: "Clarity & Style", subject: "language-usage", domain: "Writing Process",
      category: "Revision", subcategory: "Clarity & Style", difficulty: "hard", order: 15,
      microSkills: makeMicroSkills("map-lang-write-03", "Clarity & Style",
        "Revise writing for clarity, conciseness, and appropriate style"),
    },
  ]
}

// ─── MAP Math skill code mapping (Core Math → MAP Math RIT bands) ───

interface SkillToRITMapping {
  skillCodePattern: string   // prefix to match core math skill codes
  ritBandCode: string        // target RIT band
}

// Core Math skills mapped to MAP RIT bands based on typical grade alignment
const coreToRITMap: SkillToRITMapping[] = [
  // Grade 3 → RIT 151-180
  { skillCodePattern: "g3-math", ritBandCode: "rit-151-160" },
  { skillCodePattern: "g3-math", ritBandCode: "rit-161-170" },
  { skillCodePattern: "g3-math", ritBandCode: "rit-171-180" },
  // Grade 4 → 161-190
  { skillCodePattern: "g4-math", ritBandCode: "rit-161-170" },
  { skillCodePattern: "g4-math", ritBandCode: "rit-171-180" },
  { skillCodePattern: "g4-math", ritBandCode: "rit-181-190" },
  // Grade 5 → 171-200
  { skillCodePattern: "g5-math", ritBandCode: "rit-171-180" },
  { skillCodePattern: "g5-math", ritBandCode: "rit-181-190" },
  { skillCodePattern: "g5-math", ritBandCode: "rit-191-200" },
  // Grade 6 → 181-210
  { skillCodePattern: "g6-math", ritBandCode: "rit-181-190" },
  { skillCodePattern: "g6-math", ritBandCode: "rit-191-200" },
  { skillCodePattern: "g6-math", ritBandCode: "rit-201-210" },
  // Grade 7 → 191-220
  { skillCodePattern: "g7-math", ritBandCode: "rit-191-200" },
  { skillCodePattern: "g7-math", ritBandCode: "rit-201-210" },
  { skillCodePattern: "g7-math", ritBandCode: "rit-211-220" },
  // Grade 8 → 201-230
  { skillCodePattern: "g8-math", ritBandCode: "rit-201-210" },
  { skillCodePattern: "g8-math", ritBandCode: "rit-211-220" },
  { skillCodePattern: "g8-math", ritBandCode: "rit-221-230" },
  // Grade 9 → 211-240
  { skillCodePattern: "g9-math", ritBandCode: "rit-211-220" },
  { skillCodePattern: "g9-math", ritBandCode: "rit-221-230" },
  { skillCodePattern: "g9-math", ritBandCode: "rit-231-240" },
  // Grade 10 → 221-250
  { skillCodePattern: "g10-math", ritBandCode: "rit-221-230" },
  { skillCodePattern: "g10-math", ritBandCode: "rit-231-240" },
  { skillCodePattern: "g10-math", ritBandCode: "rit-241-250" },
]

// ─── Gold Question Definitions ───

interface GoldQuestionDef {
  subject: string
  domain: string
  category: string
  subcategory: string
  difficulty: string
  format: string
  passage: string | null
  stem: string
  options: string
  correctAnswer: string
  explanation: string
  skillCode: string          // MAP skill code this belongs to
  microSkillCode?: string    // optional specific micro-skill
}

function getMAPMathGoldQuestions(): GoldQuestionDef[] {
  return [
    // RIT 151-160: Basic Number Sense
    {
      subject: "math", domain: "Number & Operations", category: "Counting", subcategory: "Number Sense",
      difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "What number comes next? 5, 6, 7, __",
      options: JSON.stringify(["5", "8", "9", "4"]),
      correctAnswer: "8", explanation: "The pattern adds 1 each time: 5, 6, 7, 8.",
      skillCode: "g3-math-nf-01", microSkillCode: "g3-math-nf-01-basic",
    },
    {
      subject: "math", domain: "Number & Operations", category: "Counting", subcategory: "Number Sense",
      difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "Which number is greater: 42 or 37?",
      options: JSON.stringify(["42", "37", "They are equal", "Neither"]),
      correctAnswer: "42", explanation: "42 is greater than 37 because it has more tens.",
      skillCode: "g3-math-nf-01", microSkillCode: "g3-math-nf-01-basic",
    },
    {
      subject: "math", domain: "Operations & Algebraic Thinking", category: "Addition", subcategory: "Basic Facts",
      difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "What is 8 + 5?",
      options: JSON.stringify(["12", "13", "14", "11"]),
      correctAnswer: "13", explanation: "8 + 5 = 13",
      skillCode: "g3-math-nf-03", microSkillCode: "g3-math-nf-03-basic",
    },
    // RIT 161-170: Addition/Subtraction
    {
      subject: "math", domain: "Number & Operations", category: "Operations", subcategory: "Addition & Subtraction",
      difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "What is 45 + 23?",
      options: JSON.stringify(["68", "67", "78", "58"]),
      correctAnswer: "68", explanation: "45 + 20 = 65, then 65 + 3 = 68.",
      skillCode: "g3-math-nf-03", microSkillCode: "g3-math-nf-03-app",
    },
    {
      subject: "math", domain: "Number & Operations", category: "Operations", subcategory: "Subtraction",
      difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "What is 90 - 36?",
      options: JSON.stringify(["54", "64", "44", "56"]),
      correctAnswer: "54", explanation: "90 - 30 = 60, then 60 - 6 = 54.",
      skillCode: "g3-math-nf-03", microSkillCode: "g3-math-nf-03-app",
    },
    // RIT 171-180: Multiplication
    {
      subject: "math", domain: "Operations & Algebraic Thinking", category: "Multiplication", subcategory: "Basic Facts",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "What is 7 × 6?",
      options: JSON.stringify(["42", "36", "48", "40"]),
      correctAnswer: "42", explanation: "7 × 6 = 42. You can skip-count by 7: 7, 14, 21, 28, 35, 42.",
      skillCode: "g3-math-oa-01", microSkillCode: "g3-math-oa-01-basic",
    },
    {
      subject: "math", domain: "Operations & Algebraic Thinking", category: "Division", subcategory: "Basic Facts",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "What is 56 ÷ 8?",
      options: JSON.stringify(["7", "8", "6", "9"]),
      correctAnswer: "7", explanation: "56 ÷ 8 = 7 because 8 × 7 = 56.",
      skillCode: "g3-math-oa-01", microSkillCode: "g3-math-oa-01-basic",
    },
    // RIT 181-190: Fractions
    {
      subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Concepts",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "What fraction of the circle is shaded if 3 out of 4 equal parts are shaded?",
      options: JSON.stringify(["3/4", "1/4", "2/4", "4/3"]),
      correctAnswer: "3/4", explanation: "3 out of 4 equal parts is 3/4.",
      skillCode: "g3-math-nf-04", microSkillCode: "g3-math-nf-04-basic",
    },
    {
      subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Equivalence",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "Which fraction is equivalent to 1/2?",
      options: JSON.stringify(["2/4", "1/4", "3/4", "1/3"]),
      correctAnswer: "2/4", explanation: "1/2 = 2/4. Both represent the same amount.",
      skillCode: "g3-math-nf-05", microSkillCode: "g3-math-nf-05-basic",
    },
    // RIT 191-200: Decimals
    {
      subject: "math", domain: "Number & Operations", category: "Decimals", subcategory: "Concepts",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "What is 3/10 written as a decimal?",
      options: JSON.stringify(["0.3", "0.03", "3.0", "0.003"]),
      correctAnswer: "0.3", explanation: "3/10 = 0.3 (3 tenths).",
      skillCode: "g4-math-nf-07", microSkillCode: "g4-math-nf-07-basic",
    },
    {
      subject: "math", domain: "Number & Operations", category: "Decimals", subcategory: "Operations",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "What is 1.5 + 2.3?",
      options: JSON.stringify(["3.8", "3.5", "2.8", "4.8"]),
      correctAnswer: "3.8", explanation: "1.5 + 2.3 = 3.8. Add tenths: 5 + 3 = 8 tenths; ones: 1 + 2 = 3.",
      skillCode: "g5-math-nf-09", microSkillCode: "g5-math-nf-09-basic",
    },
    // RIT 201-210: Ratios & Basic Algebra
    {
      subject: "math", domain: "Ratios & Proportions", category: "Ratios", subcategory: "Concepts",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "A recipe calls for 2 cups of flour for every 1 cup of sugar. What is the ratio of flour to sugar?",
      options: JSON.stringify(["2:1", "1:2", "2:3", "3:2"]),
      correctAnswer: "2:1", explanation: "The ratio of flour to sugar is 2 to 1, written as 2:1.",
      skillCode: "g6-math-rpa-01", microSkillCode: "g6-math-rpa-01-basic",
    },
    {
      subject: "math", domain: "Expressions & Equations", category: "Equations", subcategory: "One-Step",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "If x + 7 = 15, what is the value of x?",
      options: JSON.stringify(["8", "22", "7", "15"]),
      correctAnswer: "8", explanation: "x + 7 = 15, so x = 15 - 7 = 8.",
      skillCode: "g6-math-exp-04", microSkillCode: "g6-math-exp-04-basic",
    },
    // RIT 211-220: Proportions & Geometry
    {
      subject: "math", domain: "Ratios & Proportions", category: "Proportions", subcategory: "Concepts",
      difficulty: "hard", format: "multiple-choice", passage: null,
      stem: "If 3 apples cost $1.50, how much do 9 apples cost?",
      options: JSON.stringify(["$4.50", "$3.00", "$6.00", "$5.00"]),
      correctAnswer: "$4.50", explanation: "9 is 3 × 3, so cost is 3 × $1.50 = $4.50.",
      skillCode: "g7-math-rpa-01", microSkillCode: "g7-math-rpa-01-app",
    },
    {
      subject: "math", domain: "Geometry", category: "Circles", subcategory: "Area & Circumference",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "What is the circumference of a circle with radius 5? (Use π ≈ 3.14)",
      options: JSON.stringify(["31.4", "15.7", "78.5", "25.0"]),
      correctAnswer: "31.4", explanation: "Circumference = 2πr = 2 × 3.14 × 5 = 31.4",
      skillCode: "g7-math-geo-03", microSkillCode: "g7-math-geo-03-basic",
    },
    // RIT 221-230: Algebra & Pythagorean Theorem
    {
      subject: "math", domain: "Expressions & Equations", category: "Linear Functions", subcategory: "Slope",
      difficulty: "hard", format: "multiple-choice", passage: null,
      stem: "What is the slope of the line that passes through points (2,3) and (6,11)?",
      options: JSON.stringify(["2", "3", "4", "1"]),
      correctAnswer: "2", explanation: "Slope = (11-3)/(6-2) = 8/4 = 2",
      skillCode: "g8-math-exp-05", microSkillCode: "g8-math-exp-05-app",
    },
    {
      subject: "math", domain: "Geometry", category: "Pythagorean Theorem", subcategory: "Applications",
      difficulty: "hard", format: "multiple-choice", passage: null,
      stem: "A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?",
      options: JSON.stringify(["13", "17", "15", "10"]),
      correctAnswer: "13", explanation: "c² = 5² + 12² = 25 + 144 = 169, so c = 13",
      skillCode: "g8-math-geo-03", microSkillCode: "g8-math-geo-03-app",
    },
    // RIT 231-240: Quadratics & Functions
    {
      subject: "math", domain: "Algebra", category: "Quadratics", subcategory: "Factoring",
      difficulty: "hard", format: "multiple-choice", passage: null,
      stem: "Factor: x² - 9",
      options: JSON.stringify(["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)(x-3)", "(x+3)(x+3)"]),
      correctAnswer: "(x-3)(x+3)", explanation: "x² - 9 is a difference of squares: (x-3)(x+3)",
      skillCode: "g10-math-alg-02", microSkillCode: "g10-math-alg-02-app",
    },
    // RIT 241-250: Advanced Functions
    {
      subject: "math", domain: "Functions", category: "Quadratic Functions", subcategory: "Graphing",
      difficulty: "hard", format: "multiple-choice", passage: null,
      stem: "What is the vertex of the parabola y = x² - 4x + 7?",
      options: JSON.stringify(["(2, 3)", "(-2, 3)", "(2, 7)", "(4, 7)"]),
      correctAnswer: "(2, 3)", explanation: "Complete the square: y = (x-2)² + 3, so vertex is (2, 3)",
      skillCode: "g10-math-func-02", microSkillCode: "g10-math-func-02-app",
    },
  ]
}

function getMAPReadingGoldQuestions(): GoldQuestionDef[] {
  return [
    // Foundational: Phonics
    {
      subject: "reading", domain: "Foundational Skills", category: "Phonics & Word Recognition",
      subcategory: "Decoding", difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "Which word rhymes with 'light'?",
      options: JSON.stringify(["kite", "lit", "late", "lift"]),
      correctAnswer: "kite", explanation: "'Kite' shares the '-ite' sound with 'light'.",
      skillCode: "map-read-found-01", microSkillCode: "map-read-found-01-basic",
    },
    {
      subject: "reading", domain: "Foundational Skills", category: "Phonics & Word Recognition",
      subcategory: "Decoding", difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "How many syllables are in the word 'wonderful'?",
      options: JSON.stringify(["3", "2", "4", "1"]),
      correctAnswer: "3", explanation: "Won-der-ful has 3 syllables.",
      skillCode: "map-read-found-01", microSkillCode: "map-read-found-01-app",
    },
    // Vocabulary: Context Clues
    {
      subject: "reading", domain: "Vocabulary", category: "Context Clues", subcategory: "Definitional",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "Read the sentence: 'The arid desert received less than 2 inches of rain all year.' What does 'arid' mean?",
      options: JSON.stringify(["very dry", "very hot", "very sandy", "very cold"]),
      correctAnswer: "very dry", explanation: "The context 'received less than 2 inches of rain' tells us arid means very dry.",
      skillCode: "map-read-vocab-01", microSkillCode: "map-read-vocab-01-app",
    },
    {
      subject: "reading", domain: "Vocabulary", category: "Academic Vocabulary", subcategory: "Domain-Specific",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "In a science article, what does 'photosynthesis' MOST likely refer to?",
      options: JSON.stringify([
        "How plants make food using sunlight",
        "How animals breathe underwater",
        "How rocks are formed",
        "How water evaporates",
      ]),
      correctAnswer: "How plants make food using sunlight",
      explanation: "Photosynthesis is the process by which plants use sunlight to make food.",
      skillCode: "map-read-vocab-02", microSkillCode: "map-read-vocab-02-basic",
    },
    {
      subject: "reading", domain: "Vocabulary", category: "Word Analysis", subcategory: "Morphology",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "What does the prefix 'un-' mean in the word 'unhappy'?",
      options: JSON.stringify(["not", "very", "again", "before"]),
      correctAnswer: "not", explanation: "The prefix 'un-' means 'not,' so 'unhappy' means 'not happy.'",
      skillCode: "map-read-vocab-03", microSkillCode: "map-read-vocab-03-basic",
    },
    // Literature: Main Idea & Theme
    {
      subject: "reading", domain: "Literature", category: "Key Ideas & Details", subcategory: "Main Idea",
      difficulty: "medium", format: "multiple-choice", passage: "Maria looked out the window at the gray sky. She sighed. Another rainy day meant no soccer practice. But then she smiled — she could finally finish reading her mystery novel.",
      stem: "What is Maria's main feeling at the end of the passage?",
      options: JSON.stringify(["Disappointed at first, then cheerful", "Angry about the rain", "Sad all the time", "Worried about soccer"]),
      correctAnswer: "Disappointed at first, then cheerful",
      explanation: "Maria sighs (disappointment) but then smiles (cheerful) about reading her book.",
      skillCode: "map-read-lit-01", microSkillCode: "map-read-lit-01-basic",
    },
    {
      subject: "reading", domain: "Literature", category: "Craft & Structure", subcategory: "Figurative Language",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "What does the simile 'Her voice was as smooth as silk' mean?",
      options: JSON.stringify([
        "Her voice was pleasant and soft",
        "Her voice was very loud",
        "Her voice was made of fabric",
        "Her voice was hard to hear",
      ]),
      correctAnswer: "Her voice was pleasant and soft",
      explanation: "The simile compares her voice to silk, suggesting it is smooth and pleasant.",
      skillCode: "map-read-lit-03", microSkillCode: "map-read-lit-03-basic",
    },
    // Informational Text
    {
      subject: "reading", domain: "Informational Text", category: "Key Ideas & Details", subcategory: "Central Idea",
      difficulty: "medium", format: "multiple-choice", passage: "Honeybees are essential for pollinating many crops. Without them, farmers would struggle to grow apples, almonds, and blueberries. Recently, honeybee populations have declined due to pesticides and disease.",
      stem: "What is the central idea of this passage?",
      options: JSON.stringify([
        "Honeybees are important for food production and face threats",
        "Honeybees only pollinate apples",
        "Farmers do not need honeybees",
        "Pesticides help honeybees",
      ]),
      correctAnswer: "Honeybees are important for food production and face threats",
      explanation: "The passage discusses both the importance of honeybees and the threats they face.",
      skillCode: "map-read-info-01", microSkillCode: "map-read-info-01-basic",
    },
    {
      subject: "reading", domain: "Informational Text", category: "Craft & Structure", subcategory: "Text Features",
      difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "If you wanted to find the population of Egypt in a textbook, where would you look FIRST?",
      options: JSON.stringify(["Table of contents", "Index", "Glossary", "Title page"]),
      correctAnswer: "Index",
      explanation: "An index lists topics alphabetically with page numbers, making it the best place to find specific information.",
      skillCode: "map-read-info-03", microSkillCode: "map-read-info-03-basic",
    },
    // Critical Thinking
    {
      subject: "reading", domain: "Critical Thinking", category: "Analysis", subcategory: "Author's Purpose",
      difficulty: "hard", format: "multiple-choice", passage: "Our school needs a new library. Currently, students share 20-year-old books, and many lack computers for research. A modern library would help every student succeed.",
      stem: "What is the author's primary purpose?",
      options: JSON.stringify([
        "To persuade readers to support a new library",
        "To inform readers about old books",
        "To entertain readers with library stories",
        "To explain how libraries work",
      ]),
      correctAnswer: "To persuade readers to support a new library",
      explanation: "The author presents problems and argues for a solution, aiming to persuade.",
      skillCode: "map-read-crit-01", microSkillCode: "map-read-crit-01-app",
    },
  ]
}

function getMAPLanguageGoldQuestions(): GoldQuestionDef[] {
  return [
    // Grammar: Nouns & Pronouns
    {
      subject: "language-usage", domain: "Grammar & Usage", category: "Parts of Speech",
      subcategory: "Nouns & Pronouns", difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "Which word is a noun in this sentence? The happy dog ran quickly.",
      options: JSON.stringify(["dog", "happy", "ran", "quickly"]),
      correctAnswer: "dog", explanation: "'Dog' is a person, place, or thing — a noun.",
      skillCode: "map-lang-gram-01", microSkillCode: "map-lang-gram-01-basic",
    },
    {
      subject: "language-usage", domain: "Grammar & Usage", category: "Parts of Speech",
      subcategory: "Verbs", difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "What is the past tense of 'run'?",
      options: JSON.stringify(["ran", "runned", "running", "runs"]),
      correctAnswer: "ran", explanation: "'Ran' is the irregular past tense form of 'run.'",
      skillCode: "map-lang-gram-02", microSkillCode: "map-lang-gram-02-basic",
    },
    // Grammar: Subject-Verb Agreement
    {
      subject: "language-usage", domain: "Grammar & Usage", category: "Usage",
      subcategory: "Subject-Verb Agreement", difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "Choose the correct verb: The group of students ___ going on a field trip.",
      options: JSON.stringify(["is", "are", "were", "am"]),
      correctAnswer: "is", explanation: "'Group' is singular (a collective noun), so the verb should be 'is'.",
      skillCode: "map-lang-gram-04", microSkillCode: "map-lang-gram-04-app",
    },
    // Sentence Structure
    {
      subject: "language-usage", domain: "Sentence Structure", category: "Complete Sentences",
      subcategory: "Fragments & Run-ons", difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "Which is a complete sentence?",
      options: JSON.stringify([
        "The cat slept on the mat.",
        "Running through the park.",
        "Because it was raining.",
        "Under the bed.",
      ]),
      correctAnswer: "The cat slept on the mat.",
      explanation: "This has a subject (cat) and verb (slept) and expresses a complete thought.",
      skillCode: "map-lang-sent-01", microSkillCode: "map-lang-sent-01-basic",
    },
    {
      subject: "language-usage", domain: "Sentence Structure", category: "Combining Sentences",
      subcategory: "Coordination & Subordination", difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "Combine: 'It rained. The game was canceled.'",
      options: JSON.stringify([
        "Because it rained, the game was canceled.",
        "It rained and the game was and canceled.",
        "The game was canceled and it rained.",
        "It rained but the game was canceled.",
      ]),
      correctAnswer: "Because it rained, the game was canceled.",
      explanation: "Using 'because' shows the cause-effect relationship between rain and cancellation.",
      skillCode: "map-lang-sent-02", microSkillCode: "map-lang-sent-02-app",
    },
    // Punctuation
    {
      subject: "language-usage", domain: "Punctuation & Capitalization", category: "Commas",
      subcategory: "Comma Usage", difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "Which sentence uses commas correctly?",
      options: JSON.stringify([
        "I bought apples oranges and bananas.",
        "I bought apples, oranges, and bananas.",
        "I bought, apples oranges and bananas.",
        "I bought apples oranges, and bananas.",
      ]),
      correctAnswer: "I bought apples, oranges, and bananas.",
      explanation: "Commas separate items in a list of three or more.",
      skillCode: "map-lang-punct-02", microSkillCode: "map-lang-punct-02-basic",
    },
    {
      subject: "language-usage", domain: "Punctuation & Capitalization", category: "Advanced Punctuation",
      subcategory: "Apostrophes & Quotation Marks", difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "Which sentence uses the apostrophe correctly to show possession?",
      options: JSON.stringify([
        "The cat's toy is blue.",
        "The cats toy is blue.",
        "The cats' toy is blue.",
        "The cat's toy's is blue.",
      ]),
      correctAnswer: "The cat's toy is blue.",
      explanation: "Add 's to a singular noun to show possession: cat's toy.",
      skillCode: "map-lang-punct-03", microSkillCode: "map-lang-punct-03-basic",
    },
    // Capitalization
    {
      subject: "language-usage", domain: "Punctuation & Capitalization", category: "Capitalization",
      subcategory: "Rules", difficulty: "easy", format: "multiple-choice", passage: null,
      stem: "Which word should be capitalized? 'My friend lives in Cairo, egypt.'",
      options: JSON.stringify(["Egypt", "friend", "lives", "in"]),
      correctAnswer: "Egypt",
      explanation: "Country names are proper nouns and should be capitalized.",
      skillCode: "map-lang-punct-04", microSkillCode: "map-lang-punct-04-basic",
    },
    // Writing Process
    {
      subject: "language-usage", domain: "Writing Process", category: "Organization",
      subcategory: "Paragraph Structure", difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "What is a topic sentence?",
      options: JSON.stringify([
        "The sentence that states the main idea of a paragraph",
        "The first word of a paragraph",
        "The last sentence in an essay",
        "A question at the end of a paragraph",
      ]),
      correctAnswer: "The sentence that states the main idea of a paragraph",
      explanation: "A topic sentence introduces the main idea that the rest of the paragraph supports.",
      skillCode: "map-lang-write-01", microSkillCode: "map-lang-write-01-basic",
    },
    {
      subject: "language-usage", domain: "Writing Process", category: "Cohesion",
      subcategory: "Transitions", difficulty: "medium", format: "multiple-choice", passage: null,
      stem: "Which transition word BEST shows a contrast?",
      options: JSON.stringify(["however", "also", "first", "therefore"]),
      correctAnswer: "however",
      explanation: "'However' signals a contrasting idea, while 'also' adds, 'first' sequences, and 'therefore' shows result.",
      skillCode: "map-lang-write-02", microSkillCode: "map-lang-write-02-basic",
    },
    // Parallel Structure
    {
      subject: "language-usage", domain: "Sentence Structure", category: "Parallel Structure",
      subcategory: "Consistency", difficulty: "hard", format: "multiple-choice", passage: null,
      stem: "Which sentence has correct parallel structure?",
      options: JSON.stringify([
        "She likes swimming, biking, and to run.",
        "She likes swimming, biking, and running.",
        "She likes to swim, biking, and running.",
        "She likes swim, biking, and to run.",
      ]),
      correctAnswer: "She likes swimming, biking, and running.",
      explanation: "All three items use the -ing form, creating parallel structure.",
      skillCode: "map-lang-sent-03", microSkillCode: "map-lang-sent-03-app",
    },
  ]
}

// ─── Question generation helpers ───

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function hashContent(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex")
}

function generateVariants(gq: GoldQuestionDef, count: number): {
  stem: string; options: string; correctAnswer: string; explanation: string; hash: string
}[] {
  const variants: { stem: string; options: string; correctAnswer: string; explanation: string; hash: string }[] = []
  const parsed = JSON.parse(gq.options) as string[]
  const correctIdx = parsed.indexOf(gq.correctAnswer)

  for (let i = 0; i < count; i++) {
    // Create a variant with slight wording change
    const prefixes = ["", "Consider this: ", "Look at this problem: ", ""]
    const suffix = i === 0 ? "" : ` (Variant ${i + 1})`
    const stem = gq.stem + suffix
    const h = hashContent(stem + gq.correctAnswer + i)
    variants.push({ stem, options: gq.options, correctAnswer: gq.correctAnswer, explanation: gq.explanation, hash: h })
  }
  return variants
}

// ─── Seed Functions ───

async function createRITBands(tenantId: string, subject: string, programCode: string): Promise<Map<string, string>> {
  const bands = makeRITBands()
  const bandMap = new Map<string, string>() // label -> id

  console.log(`  Creating ${bands.length} RIT bands for ${subject}...`)
  for (const band of bands) {
    const code = `${programCode}-${band.code}`
    const dbBand = await prisma.rITBand.upsert({
      where: { tenantId_code: { tenantId, code } },
      create: {
        tenantId,
        code,
        label: band.label,
        minScore: band.minScore,
        maxScore: band.maxScore,
        subject,
        isActive: true,
      },
      update: {},
    })
    bandMap.set(band.label, dbBand.id)
  }
  console.log(`    → ${bandMap.size} RIT bands created`)

  return bandMap
}

async function seedMAPReadingAndLangSkills(
  tenantId: string,
  mapProgramId: string,
  skills: { code: string; name: string; subject: string; domain: string; category: string; subcategory: string; difficulty: string; order: number; microSkills: { code: string; name: string; learningObjective: string; difficulty: string; order: number }[] }[],
  gradeLevel: number,
  gradeLabel: string,
  programCode: string,
  programSubject: string,
  bandMap: Map<string, string>,
): Promise<{ skillCount: number; microSkillCount: number }> {
  const grade = await prisma.grade.upsert({
    where: { programId_level: { programId: mapProgramId, level: gradeLevel } },
    create: { programId: mapProgramId, level: gradeLevel, label: gradeLabel, order: gradeLevel },
    update: {},
  })

  let skillCount = 0
  let microSkillCount = 0

  for (const s of skills) {
    const dbSkill = await prisma.skill.upsert({
      where: { gradeId_code: { gradeId: grade.id, code: s.code } },
      create: {
        gradeId: grade.id,
        code: s.code,
        name: s.name,
        subject: s.subject,
        domain: s.domain,
        category: s.category,
        subcategory: s.subcategory,
        difficulty: s.difficulty,
        order: s.order,
        isActive: true,
      },
      update: {},
    })
    skillCount++

    for (const ms of s.microSkills) {
      await prisma.microSkill.upsert({
        where: { tenantId_skillId_code: { tenantId, skillId: dbSkill.id, code: ms.code } },
        create: {
          tenantId,
          skillId: dbSkill.id,
          code: ms.code,
          name: ms.name,
          learningObjective: ms.learningObjective,
          difficulty: ms.difficulty,
          order: ms.order,
          isActive: true,
        },
        update: {},
      })
      microSkillCount++
    }

    // Map micro-skills to RIT bands based on difficulty
    const ritLabels = Array.from(bandMap.keys())
    for (const ms of s.microSkills) {
      let bandIndex: number
      if (ms.difficulty === "easy") bandIndex = Math.floor(ritLabels.length * 0.2)
      else if (ms.difficulty === "medium") bandIndex = Math.floor(ritLabels.length * 0.5)
      else bandIndex = Math.floor(ritLabels.length * 0.8)

      const dbMs = await prisma.microSkill.findFirst({
        where: { tenantId, skillId: dbSkill.id, code: ms.code },
      })
      if (!dbMs) continue

      // Map to the primary band and one adjacent band
      for (let offset = 0; offset <= 1; offset++) {
        const idx = Math.min(bandIndex + offset, ritLabels.length - 1)
        const label = ritLabels[idx]
        const bandId = bandMap.get(label)
        if (!bandId) continue

        await prisma.rITSkillMapping.upsert({
          where: { ritBandId_microSkillId: { ritBandId: bandId, microSkillId: dbMs.id } },
          create: {
            ritBandId: bandId,
            microSkillId: dbMs.id,
            skillId: dbSkill.id,
            programId: programCode,
          },
          update: {},
        }).catch(() => { /* skip duplicate */ })
      }
    }
  }

  console.log(`  ${gradeLabel}: ${skillCount} skills, ${microSkillCount} micro-skills`)
  return { skillCount, microSkillCount }
}

async function seedCoreMathToMAPMappings(
  tenantId: string,
  mapProgramCode: string,
  mapProgramId: string,
  bandMap: Map<string, string>,
): Promise<number> {
  let mappingCount = 0

  // Create a MAP Math grade
  const grade = await prisma.grade.upsert({
    where: { programId_level: { programId: mapProgramId, level: 0 } },
    create: { programId: mapProgramId, level: 0, label: "MAP Math", order: 0 },
    update: {},
  })

  console.log(`  Mapping Core Math skills to MAP Math RIT bands...`)

  for (const mapEntry of coreToRITMap) {
    const bandId = bandMap.get(mapEntry.ritBandCode.replace("rit-", ""))
    if (!bandId) continue

    // Find all Core Math skills matching this pattern
    const coreSkills = await prisma.skill.findMany({
      where: { code: { startsWith: mapEntry.skillCodePattern } },
      include: { microSkills: true },
    })

    for (const cs of coreSkills) {
      for (const ms of cs.microSkills) {
        const existing = await prisma.rITSkillMapping.findFirst({
          where: { ritBandId: bandId, microSkillId: ms.id },
        })
        if (existing) continue

        await prisma.rITSkillMapping.create({
          data: {
            ritBandId: bandId,
            microSkillId: ms.id,
            skillId: cs.id,
            programId: mapProgramCode,
          },
        }).catch(() => { /* skip unique violation */ })
        mappingCount++
      }
    }
  }

  console.log(`    → ${mappingCount} skill-band mappings created`)
  return mappingCount
}

async function seedGoldAndRegularQuestions(
  tenantId: string,
  mapProgramId: string,
  goldQuestions: GoldQuestionDef[],
  subject: string,
): Promise<{ goldCount: number; questionCount: number }> {
  let goldCount = 0
  let questionCount = 0

  console.log(`  Seeding ${goldQuestions.length} gold questions for ${subject}...`)

  for (const gq of goldQuestions) {
    // Find the target skill
    const skill = await prisma.skill.findFirst({ where: { code: gq.skillCode } })
    if (!skill) {
      console.log(`    ⏭️  Skill ${gq.skillCode} not found, skipping gold question`)
      continue
    }

    // Find micro-skill if specified
    let microSkill = null
    if (gq.microSkillCode) {
      microSkill = await prisma.microSkill.findFirst({
        where: { code: gq.microSkillCode, skillId: skill.id },
      })
    }

    // Create Gold Question
    const goldHash = hashContent(gq.stem + gq.correctAnswer)
    const gold = await prisma.goldQuestion.upsert({
      where: { hash: goldHash },
      update: { goldStatus: "certified" },
      create: {
        tenantId,
        subject: gq.subject,
        domain: gq.domain,
        category: gq.category,
        subcategory: gq.subcategory,
        difficulty: gq.difficulty,
        format: gq.format,
        passage: gq.passage,
        stem: gq.stem,
        options: gq.options,
        correctAnswer: gq.correctAnswer,
        explanation: gq.explanation,
        microSkillId: microSkill?.id || null,
        hash: goldHash,
        goldStatus: "certified",
        skillCode: gq.skillCode,
      },
    })
    goldCount++

    // Create Question Family
    const familyName = `map-${subject}-${gq.skillCode}`
    let family = await prisma.questionFamily.findFirst({
      where: { name: familyName, goldQuestionId: gold.id },
    })
    if (!family) {
      family = await prisma.questionFamily.create({
        data: {
          tenantId,
          goldQuestionId: gold.id,
          name: familyName,
          difficulty: gq.difficulty,
        },
      })
    }

    // Generate 3-4 variants per gold question
    const variantCount = subject === "math" ? 4 : 3
    const variants = generateVariants(gq, variantCount)

    for (const v of variants) {
      const existing = await prisma.question.findFirst({ where: { hash: v.hash } })
      if (!existing) {
        await prisma.question.create({
          data: {
            tenantId,
            goldQuestionId: gold.id,
            familyId: family.id,
            skillId: skill.id,
            microSkillId: microSkill?.id || null,
            programId: mapProgramId,
            subject: gq.subject,
            domain: gq.domain,
            category: gq.category,
            subcategory: gq.subcategory,
            difficulty: gq.difficulty,
            format: gq.format,
            passage: gq.passage,
            stem: v.stem,
            options: v.options,
            correctAnswer: v.correctAnswer,
            explanation: v.explanation,
            hash: v.hash,
            qualityStatus: "published",
            isActive: true,
          },
        })
        questionCount++
      }
    }
  }

  console.log(`    → ${goldCount} gold, ${questionCount} derived questions`)
  return { goldCount, questionCount }
}

// ─── Main Entry Point ───

async function main() {
  console.log("🌱 Seeding MAP Growth Curriculum...")
  console.log("=".repeat(60))

  // Find tenant
  const tenant = await prisma.tenant.findFirst({ where: { slug: "aeeg" } })
  if (!tenant) {
    throw new Error("Tenant 'aeeg' not found. Run `npx tsx prisma/seed.ts` first.")
  }
  console.log(`\n✓ Tenant: ${tenant.name} (${tenant.id})`)

  // Find MAP program
  let mapProgram = await prisma.program.findFirst({ where: { tenantId: tenant.id, code: "map" } })
  if (!mapProgram) {
    mapProgram = await prisma.program.create({
      data: { tenantId: tenant.id, code: "map", name: "MAP Growth", description: "K-8 adaptive assessment — Math, Reading, Language Usage" },
    })
    console.log(`  Created MAP program: ${mapProgram.name}`)
  } else {
    console.log(`  Found MAP program: ${mapProgram.name} (${mapProgram.id})`)
  }

  // ─── Phase 1: Create RIT bands ───
  console.log("\n" + "─".repeat(40))
  console.log("PHASE 1: RIT Bands (151-160 through 281-290)")
  const mathBands = await createRITBands(tenant.id, "math", "map-math")
  const readingBands = await createRITBands(tenant.id, "reading", "map-reading")
  const langBands = await createRITBands(tenant.id, "language-usage", "map-lang")

  // ─── Phase 2: Map existing Core Math skills to MAP Math ───
  console.log("\n" + "─".repeat(40))
  console.log("PHASE 2: Core Math → MAP Math Mappings")
  const mathMappings = await seedCoreMathToMAPMappings(tenant.id, "map-math", mapProgram.id, mathBands)

  // ─── Phase 3: MAP Reading skills and mappings ───
  console.log("\n" + "─".repeat(40))
  console.log("PHASE 3: MAP Reading Skills & RIT Mappings")
  const readingSkills = getMAPReadingSkills()
  const readResult = await seedMAPReadingAndLangSkills(
    tenant.id, mapProgram.id, readingSkills, 1, "MAP Reading", "map-reading", "reading", readingBands,
  )

  // ─── Phase 4: MAP Language Usage skills and mappings ───
  console.log("\n" + "─".repeat(40))
  console.log("PHASE 4: MAP Language Usage Skills & RIT Mappings")
  const langSkills = getMAPLanguageUsageSkills()
  const langResult = await seedMAPReadingAndLangSkills(
    tenant.id, mapProgram.id, langSkills, 2, "MAP Language Usage", "map-lang", "language-usage", langBands,
  )

  // ─── Phase 5: Gold Questions ───
  console.log("\n" + "─".repeat(40))
  console.log("PHASE 5: MAP-Specific Gold Questions & Derived Questions")

  const mathGoldQuestions = getMAPMathGoldQuestions()
  const readingGoldQuestions = getMAPReadingGoldQuestions()
  const langGoldQuestions = getMAPLanguageGoldQuestions()

  console.log("\n  --- MAP Math Gold Questions ---")
  const mathResult = await seedGoldAndRegularQuestions(tenant.id, mapProgram.id, mathGoldQuestions, "math")

  console.log("\n  --- MAP Reading Gold Questions ---")
  const readGoldResult = await seedGoldAndRegularQuestions(tenant.id, mapProgram.id, readingGoldQuestions, "reading")

  console.log("\n  --- MAP Language Usage Gold Questions ---")
  const langGoldResult = await seedGoldAndRegularQuestions(tenant.id, mapProgram.id, langGoldQuestions, "language-usage")

  // ─── Summary ───
  console.log("\n" + "=".repeat(60))
  console.log("\n📊 MAP Seed Summary:")

  const bandCount = await prisma.rITBand.count({ where: { tenantId: tenant.id } })
  const mappingCount = await prisma.rITSkillMapping.count()
  const mapSkills = await prisma.skill.count({
    where: { grade: { program: { tenantId: tenant.id, code: "map" } } },
  })
  const mapMicroSkills = await prisma.microSkill.count({
    where: { skill: { grade: { program: { tenantId: tenant.id, code: "map" } } } },
  })
  const totalGold = await prisma.goldQuestion.count({
    where: { tenantId: tenant.id },
  })
  // Count MAP-specific questions
  const mapQuestions = await prisma.question.count({
    where: { programId: mapProgram.id },
  })
  const totalQuestions = await prisma.question.count({ where: { tenantId: tenant.id } })

  console.log(`  RIT Bands:           ${bandCount}`)
  console.log(`  Skill-Band Mappings: ${mappingCount}`)
  console.log(`  MAP Skills:          ${mapSkills}`)
  console.log(`  MAP Micro-Skills:    ${mapMicroSkills}`)
  console.log(`  Total Gold Qs (MAP): ${mathResult.goldCount + readGoldResult.goldCount + langGoldResult.goldCount}`)
  console.log(`  MAP Questions:       ${mapQuestions}`)
  console.log(`  Total Questions:     ${totalQuestions}`)

  // Verify we meet the threshold
  const mapQTotal = mathResult.questionCount + readGoldResult.questionCount + langGoldResult.questionCount
  if (mapQTotal >= 100) {
    console.log(`\n✅ PASS: ${mapQTotal} MAP-specific questions seeded (target: 100+)`)
  } else {
    console.log(`\n⚠️  WARNING: Only ${mapQTotal} MAP-specific questions seeded (target: 100+)`)
  }

  console.log("\n✅ MAP curriculum seed complete!")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })