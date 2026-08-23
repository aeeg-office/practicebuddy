/**
 * Practice Buddy — Full Curriculum Seed Script
 * 
 * Seeds all 6 programs with complete skill hierarchies:
 *   - Core Math (Grades 3-10)
 *   - Core English (Grades 3-10)
 *   - MAP Math (RIT bands 151-280)
 *   - MAP Reading (RIT bands 151-280)
 *   - SAT Math (19 skills)
 *   - SAT Reading & Writing (12 skills)
 * 
 * Run: npx tsx prisma/seed-curriculum.ts
 * Prerequisites: prisma/seed.ts (tenant + admin)
 */

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as crypto from "crypto"

const connectionString = process.env.DATABASE_URL || "postgresql://practice_buddy:***@localhost:5432/practice_buddy"
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

// ─── Types ───

interface ProgramDef {
  code: string
  name: string
  description: string
  grades: GradeDef[]
}

interface GradeDef {
  level: number
  label: string
  skills: SkillDef[]
}

interface SkillDef {
  code: string
  name: string
  subject: string
  domain: string
  category: string
  subcategory: string
  difficulty: string
  order: number
  microSkills: MicroSkillDef[]
}

interface MicroSkillDef {
  code: string
  name: string
  learningObjective: string
  difficulty: string
  order: number
}

// ─── Helper to build micro-skills ───

function makeMicroSkills(code: string, name: string, baseObjective: string): MicroSkillDef[] {
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

// ─── Program Definitions ───

function getCoreMathProgram(): ProgramDef {
  const grades: GradeDef[] = []
  const gradeConfigs = [
    { level: 3, label: "Grade 3" },
    { level: 4, label: "Grade 4" },
    { level: 5, label: "Grade 5" },
    { level: 6, label: "Grade 6" },
    { level: 7, label: "Grade 7" },
    { level: 8, label: "Grade 8" },
    { level: 9, label: "Grade 9" },
    { level: 10, label: "Grade 10" },
  ]

  const gradeSkills: Record<number, SkillDef[]> = {
    // ── Grade 3 ──
    3: [
      { code: "g3-math-oa-01", name: "Multiplication & Division Concepts", subject: "math", domain: "Operations & Algebraic Thinking", category: "Multiplication & Division", subcategory: "Concepts", difficulty: "easy", order: 1, microSkills: makeMicroSkills("g3-math-oa-01", "Multiplication & Division Concepts", "Understand multiplication as repeated addition and division as sharing") },
      { code: "g3-math-oa-02", name: "Properties of Multiplication", subject: "math", domain: "Operations & Algebraic Thinking", category: "Multiplication & Division", subcategory: "Properties", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g3-math-oa-02", "Properties of Multiplication", "Apply commutative, associative, and distributive properties of multiplication") },
      { code: "g3-math-oa-03", name: "Multiplication & Division Word Problems", subject: "math", domain: "Operations & Algebraic Thinking", category: "Word Problems", subcategory: "Multiplication & Division", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g3-math-oa-03", "Multiplication & Division Word Problems", "Solve one-step multiplication and division word problems") },
      { code: "g3-math-oa-04", name: "Two-Step Word Problems", subject: "math", domain: "Operations & Algebraic Thinking", category: "Word Problems", subcategory: "Multi-Step", difficulty: "hard", order: 4, microSkills: makeMicroSkills("g3-math-oa-04", "Two-Step Word Problems", "Solve two-step word problems using the four operations") },
      { code: "g3-math-oa-05", name: "Patterns in Arithmetic", subject: "math", domain: "Operations & Algebraic Thinking", category: "Patterns", subcategory: "Arithmetic Patterns", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g3-math-oa-05", "Patterns in Arithmetic", "Identify and extend arithmetic patterns in addition and multiplication tables") },
      { code: "g3-math-nf-01", name: "Place Value to 10,000", subject: "math", domain: "Number & Operations", category: "Place Value", subcategory: "Whole Numbers", difficulty: "easy", order: 6, microSkills: makeMicroSkills("g3-math-nf-01", "Place Value to 10,000", "Understand place value for numbers up to 10,000") },
      { code: "g3-math-nf-02", name: "Rounding Numbers", subject: "math", domain: "Number & Operations", category: "Place Value", subcategory: "Rounding", difficulty: "easy", order: 7, microSkills: makeMicroSkills("g3-math-nf-02", "Rounding Numbers", "Round numbers to the nearest 10, 100, and 1,000") },
      { code: "g3-math-nf-03", name: "Addition & Subtraction within 1,000", subject: "math", domain: "Number & Operations", category: "Operations", subcategory: "Addition & Subtraction", difficulty: "easy", order: 8, microSkills: makeMicroSkills("g3-math-nf-03", "Addition & Subtraction within 1,000", "Fluently add and subtract within 1,000 using algorithms") },
      { code: "g3-math-nf-04", name: "Understanding Fractions", subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Concepts", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g3-math-nf-04", "Understanding Fractions", "Understand fractions as equal parts of a whole") },
      { code: "g3-math-nf-05", name: "Equivalent Fractions", subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Equivalence", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g3-math-nf-05", "Equivalent Fractions", "Recognize and generate simple equivalent fractions") },
      { code: "g3-math-nf-06", name: "Comparing Fractions", subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Comparison", difficulty: "medium", order: 11, microSkills: makeMicroSkills("g3-math-nf-06", "Comparing Fractions", "Compare fractions with the same numerator or denominator") },
      { code: "g3-math-mdg-01", name: "Telling Time & Elapsed Time", subject: "math", domain: "Measurement & Data", category: "Time", subcategory: "Elapsed Time", difficulty: "easy", order: 12, microSkills: makeMicroSkills("g3-math-mdg-01", "Telling Time & Elapsed Time", "Tell time to the nearest minute and solve elapsed time problems") },
      { code: "g3-math-mdg-02", name: "Mass & Volume Measurement", subject: "math", domain: "Measurement & Data", category: "Measurement", subcategory: "Mass & Volume", difficulty: "easy", order: 13, microSkills: makeMicroSkills("g3-math-mdg-02", "Mass & Volume Measurement", "Measure and estimate mass and volume using standard units") },
      { code: "g3-math-mdg-03", name: "Picture Graphs & Bar Graphs", subject: "math", domain: "Measurement & Data", category: "Data", subcategory: "Graphs", difficulty: "easy", order: 14, microSkills: makeMicroSkills("g3-math-mdg-03", "Picture Graphs & Bar Graphs", "Draw and interpret scaled picture and bar graphs") },
      { code: "g3-math-mdg-04", name: "Area Concepts", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Area", difficulty: "medium", order: 15, microSkills: makeMicroSkills("g3-math-mdg-04", "Area Concepts", "Understand area as the number of square units covering a plane figure") },
      { code: "g3-math-mdg-05", name: "Perimeter", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Perimeter", difficulty: "medium", order: 16, microSkills: makeMicroSkills("g3-math-mdg-05", "Perimeter", "Find the perimeter of polygons in various contexts") },
      { code: "g3-math-mdg-06", name: "Classifying Shapes", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Shapes", difficulty: "medium", order: 17, microSkills: makeMicroSkills("g3-math-mdg-06", "Classifying Shapes", "Classify shapes by their attributes (sides, angles)") },
      { code: "g3-math-rpa-01", name: "Understanding Unit Fractions", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Fractions Foundation", subcategory: "Unit Fractions", difficulty: "easy", order: 18, microSkills: makeMicroSkills("g3-math-rpa-01", "Understanding Unit Fractions", "Understand unit fractions as the building blocks of all fractions") },
      { code: "g3-math-rpa-02", name: "Fractions on a Number Line", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Fractions Foundation", subcategory: "Number Line", difficulty: "medium", order: 19, microSkills: makeMicroSkills("g3-math-rpa-02", "Fractions on a Number Line", "Represent fractions on a number line") },
      { code: "g3-math-rpa-03", name: "Intro to Area as Multiplication", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Algebraic Foundations", subcategory: "Area Model", difficulty: "medium", order: 20, microSkills: makeMicroSkills("g3-math-rpa-03", "Intro to Area as Multiplication", "Relate area to multiplication and addition") },
    ],

    // ── Grade 4 ──
    4: [
      { code: "g4-math-oa-01", name: "Multiplicative Comparisons", subject: "math", domain: "Operations & Algebraic Thinking", category: "Comparisons", subcategory: "Multiplicative", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g4-math-oa-01", "Multiplicative Comparisons", "Interpret multiplication as a comparison (e.g., 35 = 5 × 7)") },
      { code: "g4-math-oa-02", name: "Multi-Step Word Problems", subject: "math", domain: "Operations & Algebraic Thinking", category: "Word Problems", subcategory: "Multi-Step", difficulty: "hard", order: 2, microSkills: makeMicroSkills("g4-math-oa-02", "Multi-Step Word Problems", "Solve multi-step word problems with whole numbers using the four operations") },
      { code: "g4-math-oa-03", name: "Factors & Multiples", subject: "math", domain: "Operations & Algebraic Thinking", category: "Number Theory", subcategory: "Factors & Multiples", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g4-math-oa-03", "Factors & Multiples", "Find all factor pairs for whole numbers 1-100 and identify multiples") },
      { code: "g4-math-oa-04", name: "Prime & Composite Numbers", subject: "math", domain: "Operations & Algebraic Thinking", category: "Number Theory", subcategory: "Prime Numbers", difficulty: "medium", order: 4, microSkills: makeMicroSkills("g4-math-oa-04", "Prime & Composite Numbers", "Determine whether a number 1-100 is prime or composite") },
      { code: "g4-math-oa-05", name: "Number & Shape Patterns", subject: "math", domain: "Operations & Algebraic Thinking", category: "Patterns", subcategory: "Patterns", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g4-math-oa-05", "Number & Shape Patterns", "Generate and analyze number and shape patterns") },
      { code: "g4-math-nf-01", name: "Place Value to 1,000,000", subject: "math", domain: "Number & Operations", category: "Place Value", subcategory: "Whole Numbers", difficulty: "easy", order: 6, microSkills: makeMicroSkills("g4-math-nf-01", "Place Value to 1,000,000", "Read, write, and compare numbers up to 1,000,000") },
      { code: "g4-math-nf-02", name: "Multi-Digit Addition & Subtraction", subject: "math", domain: "Number & Operations", category: "Operations", subcategory: "Addition & Subtraction", difficulty: "easy", order: 7, microSkills: makeMicroSkills("g4-math-nf-02", "Multi-Digit Addition & Subtraction", "Fluently add and subtract multi-digit whole numbers") },
      { code: "g4-math-nf-03", name: "Multi-Digit Multiplication", subject: "math", domain: "Number & Operations", category: "Operations", subcategory: "Multiplication", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g4-math-nf-03", "Multi-Digit Multiplication", "Multiply multi-digit numbers by one-digit numbers") },
      { code: "g4-math-nf-04", name: "Long Division", subject: "math", domain: "Number & Operations", category: "Operations", subcategory: "Division", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g4-math-nf-04", "Long Division", "Divide multi-digit numbers by one-digit divisors") },
      { code: "g4-math-nf-05", name: "Addition & Subtraction of Fractions", subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Addition & Subtraction", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g4-math-nf-05", "Addition & Subtraction of Fractions", "Add and subtract fractions with like denominators") },
      { code: "g4-math-nf-06", name: "Multiplying Fractions by Whole Numbers", subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Multiplication", difficulty: "medium", order: 11, microSkills: makeMicroSkills("g4-math-nf-06", "Multiplying Fractions by Whole Numbers", "Multiply a fraction by a whole number") },
      { code: "g4-math-nf-07", name: "Decimal Notation for Fractions", subject: "math", domain: "Number & Operations", category: "Decimals", subcategory: "Concepts", difficulty: "medium", order: 12, microSkills: makeMicroSkills("g4-math-nf-07", "Decimal Notation for Fractions", "Express fractions with denominators 10 or 100 as decimals") },
      { code: "g4-math-nf-08", name: "Comparing Decimals", subject: "math", domain: "Number & Operations", category: "Decimals", subcategory: "Comparison", difficulty: "medium", order: 13, microSkills: makeMicroSkills("g4-math-nf-08", "Comparing Decimals", "Compare decimals to hundredths") },
      { code: "g4-math-mdg-01", name: "Measurement Conversion", subject: "math", domain: "Measurement & Data", category: "Measurement", subcategory: "Conversions", difficulty: "easy", order: 14, microSkills: makeMicroSkills("g4-math-mdg-01", "Measurement Conversion", "Convert units within a measurement system (km/m, kg/g, lb/oz)") },
      { code: "g4-math-mdg-02", name: "Area & Perimeter Problems", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Area & Perimeter", difficulty: "medium", order: 15, microSkills: makeMicroSkills("g4-math-mdg-02", "Area & Perimeter Problems", "Solve problems involving area and perimeter of rectangles") },
      { code: "g4-math-mdg-03", name: "Line Plots with Fractions", subject: "math", domain: "Measurement & Data", category: "Data", subcategory: "Line Plots", difficulty: "medium", order: 16, microSkills: makeMicroSkills("g4-math-mdg-03", "Line Plots with Fractions", "Make and interpret line plots with fractional data") },
      { code: "g4-math-mdg-04", name: "Angles", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Angles", difficulty: "medium", order: 17, microSkills: makeMicroSkills("g4-math-mdg-04", "Angles", "Measure and draw angles; understand angle measure as additive") },
      { code: "g4-math-mdg-05", name: "Classifying 2D Shapes", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Shapes", difficulty: "medium", order: 18, microSkills: makeMicroSkills("g4-math-mdg-05", "Classifying 2D Shapes", "Classify two-dimensional figures based on lines and angles") },
      { code: "g4-math-mdg-06", name: "Symmetry", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Symmetry", difficulty: "medium", order: 19, microSkills: makeMicroSkills("g4-math-mdg-06", "Symmetry", "Recognize and draw lines of symmetry") },
      { code: "g4-math-rpa-01", name: "Equivalent Fractions (Advanced)", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Fractions Foundation", subcategory: "Equivalence", difficulty: "hard", order: 20, microSkills: makeMicroSkills("g4-math-rpa-01", "Equivalent Fractions (Advanced)", "Explain why fractions are equivalent using visual fraction models") },
    ],

    // ── Grade 5 ──
    5: [
      { code: "g5-math-oa-01", name: "Order of Operations", subject: "math", domain: "Operations & Algebraic Thinking", category: "Expressions", subcategory: "Order of Operations", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g5-math-oa-01", "Order of Operations", "Use parentheses, brackets, and braces in numerical expressions") },
      { code: "g5-math-oa-02", name: "Numerical Expressions", subject: "math", domain: "Operations & Algebraic Thinking", category: "Expressions", subcategory: "Writing Expressions", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g5-math-oa-02", "Numerical Expressions", "Write and interpret simple numerical expressions") },
      { code: "g5-math-oa-03", name: "Patterns & Relationships", subject: "math", domain: "Operations & Algebraic Thinking", category: "Patterns", subcategory: "Coordinate Patterns", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g5-math-oa-03", "Patterns & Relationships", "Generate numerical patterns and graph ordered pairs") },
      { code: "g5-math-nf-01", name: "Place Value to Billions", subject: "math", domain: "Number & Operations", category: "Place Value", subcategory: "Whole Numbers", difficulty: "easy", order: 4, microSkills: makeMicroSkills("g5-math-nf-01", "Place Value to Billions", "Understand place value for numbers up to billions") },
      { code: "g5-math-nf-02", name: "Multi-Digit Multiplication (Advanced)", subject: "math", domain: "Number & Operations", category: "Operations", subcategory: "Multiplication", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g5-math-nf-02", "Multi-Digit Multiplication (Advanced)", "Fluently multiply multi-digit numbers using standard algorithms") },
      { code: "g5-math-nf-03", name: "Multi-Digit Division", subject: "math", domain: "Number & Operations", category: "Operations", subcategory: "Division", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g5-math-nf-03", "Multi-Digit Division", "Divide multi-digit numbers by two-digit divisors") },
      { code: "g5-math-nf-04", name: "Adding & Subtracting Fractions (Unlike Denominators)", subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Addition & Subtraction", difficulty: "medium", order: 7, microSkills: makeMicroSkills("g5-math-nf-04", "Adding & Subtracting Fractions (Unlike Denominators)", "Add and subtract fractions with unlike denominators") },
      { code: "g5-math-nf-05", name: "Multiplying Fractions", subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Multiplication", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g5-math-nf-05", "Multiplying Fractions", "Multiply fractions and mixed numbers") },
      { code: "g5-math-nf-06", name: "Dividing Fractions", subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Division", difficulty: "hard", order: 9, microSkills: makeMicroSkills("g5-math-nf-06", "Dividing Fractions", "Divide unit fractions by whole numbers and vice versa") },
      { code: "g5-math-nf-07", name: "Fractions as Division", subject: "math", domain: "Number & Operations", category: "Fractions", subcategory: "Concepts", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g5-math-nf-07", "Fractions as Division", "Interpret fractions as division of the numerator by the denominator") },
      { code: "g5-math-nf-08", name: "Decimal Place Value", subject: "math", domain: "Number & Operations", category: "Decimals", subcategory: "Place Value", difficulty: "easy", order: 11, microSkills: makeMicroSkills("g5-math-nf-08", "Decimal Place Value", "Understand decimal place value to thousandths") },
      { code: "g5-math-nf-09", name: "Operations with Decimals", subject: "math", domain: "Number & Operations", category: "Decimals", subcategory: "Operations", difficulty: "medium", order: 12, microSkills: makeMicroSkills("g5-math-nf-09", "Operations with Decimals", "Add, subtract, multiply, and divide decimals to hundredths") },
      { code: "g5-math-mdg-01", name: "Measurement Conversions (Customary & Metric)", subject: "math", domain: "Measurement & Data", category: "Measurement", subcategory: "Conversions", difficulty: "easy", order: 13, microSkills: makeMicroSkills("g5-math-mdg-01", "Measurement Conversions (Customary & Metric)", "Convert among different-sized standard measurement units") },
      { code: "g5-math-mdg-02", name: "Volume Concepts", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Volume", difficulty: "medium", order: 14, microSkills: makeMicroSkills("g5-math-mdg-02", "Volume Concepts", "Understand volume as an attribute of three-dimensional space") },
      { code: "g5-math-mdg-03", name: "Volume of Rectangular Prisms", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Volume", difficulty: "medium", order: 15, microSkills: makeMicroSkills("g5-math-mdg-03", "Volume of Rectangular Prisms", "Find the volume of rectangular prisms using formulas") },
      { code: "g5-math-mdg-04", name: "Line Plots & Data", subject: "math", domain: "Measurement & Data", category: "Data", subcategory: "Line Plots", difficulty: "medium", order: 16, microSkills: makeMicroSkills("g5-math-mdg-04", "Line Plots & Data", "Make and interpret line plots with fractional measurements") },
      { code: "g5-math-mdg-05", name: "Coordinate Plane (First Quadrant)", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Coordinate Plane", difficulty: "medium", order: 17, microSkills: makeMicroSkills("g5-math-mdg-05", "Coordinate Plane (First Quadrant)", "Graph points in the first quadrant of the coordinate plane") },
      { code: "g5-math-mdg-06", name: "Classifying 2D Figures", subject: "math", domain: "Measurement & Data", category: "Geometry", subcategory: "Shapes", difficulty: "medium", order: 18, microSkills: makeMicroSkills("g5-math-mdg-06", "Classifying 2D Figures", "Classify two-dimensional figures in a hierarchy based on properties") },
      { code: "g5-math-rpa-01", name: "Understanding Ratios", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Ratios", subcategory: "Concepts", difficulty: "medium", order: 19, microSkills: makeMicroSkills("g5-math-rpa-01", "Understanding Ratios", "Understand ratio concepts and use ratio language") },
      { code: "g5-math-rpa-02", name: "Intro to Expressions & Variables", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Algebraic Foundations", subcategory: "Expressions", difficulty: "medium", order: 20, microSkills: makeMicroSkills("g5-math-rpa-02", "Intro to Expressions & Variables", "Write simple algebraic expressions with variables") },
    ],

    // ── Grade 6 ──
    6: [
      { code: "g6-math-rpa-01", name: "Ratios & Rates", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Ratios", subcategory: "Concepts", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g6-math-rpa-01", "Ratios & Rates", "Understand ratio concepts and use ratio reasoning to solve problems") },
      { code: "g6-math-rpa-02", name: "Unit Rates", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Ratios", subcategory: "Unit Rates", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g6-math-rpa-02", "Unit Rates", "Understand and compute unit rates") },
      { code: "g6-math-rpa-03", name: "Percent Concepts", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Percentages", subcategory: "Concepts", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g6-math-rpa-03", "Percent Concepts", "Understand percent as a rate per 100 and solve percent problems") },
      { code: "g6-math-rpa-04", name: "Equivalent Ratios & Tables", subject: "math", domain: "Ratios, Proportions & Algebra", category: "Ratios", subcategory: "Tables", difficulty: "medium", order: 4, microSkills: makeMicroSkills("g6-math-rpa-04", "Equivalent Ratios & Tables", "Use ratio tables to find equivalent ratios") },
      { code: "g6-math-ns-01", name: "Dividing Fractions (Advanced)", subject: "math", domain: "Number Systems", category: "Fractions", subcategory: "Division", difficulty: "hard", order: 5, microSkills: makeMicroSkills("g6-math-ns-01", "Dividing Fractions (Advanced)", "Divide fractions by fractions and mixed numbers") },
      { code: "g6-math-ns-02", name: "Multi-Digit Decimal Operations", subject: "math", domain: "Number Systems", category: "Decimals", subcategory: "Operations", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g6-math-ns-02", "Multi-Digit Decimal Operations", "Fluently perform all operations with multi-digit decimals") },
      { code: "g6-math-ns-03", name: "Greatest Common Factor & Least Common Multiple", subject: "math", domain: "Number Systems", category: "Number Theory", subcategory: "GCF & LCM", difficulty: "medium", order: 7, microSkills: makeMicroSkills("g6-math-ns-03", "Greatest Common Factor & Least Common Multiple", "Find GCF and LCM of two numbers") },
      { code: "g6-math-ns-04", name: "Positive & Negative Numbers", subject: "math", domain: "Number Systems", category: "Integers", subcategory: "Concepts", difficulty: "easy", order: 8, microSkills: makeMicroSkills("g6-math-ns-04", "Positive & Negative Numbers", "Understand positive and negative numbers in real-world contexts") },
      { code: "g6-math-ns-05", name: "Absolute Value", subject: "math", domain: "Number Systems", category: "Integers", subcategory: "Absolute Value", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g6-math-ns-05", "Absolute Value", "Understand absolute value as distance from zero") },
      { code: "g6-math-ns-06", name: "Coordinate Plane (All Quadrants)", subject: "math", domain: "Number Systems", category: "Coordinate Geometry", subcategory: "Graphing", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g6-math-ns-06", "Coordinate Plane (All Quadrants)", "Graph points in all four quadrants of the coordinate plane") },
      { code: "g6-math-exp-01", name: "Exponents & Order of Operations", subject: "math", domain: "Expressions & Equations", category: "Exponents", subcategory: "Order of Operations", difficulty: "medium", order: 11, microSkills: makeMicroSkills("g6-math-exp-01", "Exponents & Order of Operations", "Write and evaluate numerical expressions with exponents") },
      { code: "g6-math-exp-02", name: "Writing Algebraic Expressions", subject: "math", domain: "Expressions & Equations", category: "Expressions", subcategory: "Writing", difficulty: "medium", order: 12, microSkills: makeMicroSkills("g6-math-exp-02", "Writing Algebraic Expressions", "Write algebraic expressions from verbal descriptions") },
      { code: "g6-math-exp-03", name: "Evaluating Expressions", subject: "math", domain: "Expressions & Equations", category: "Expressions", subcategory: "Evaluation", difficulty: "medium", order: 13, microSkills: makeMicroSkills("g6-math-exp-03", "Evaluating Expressions", "Evaluate algebraic expressions for given variable values") },
      { code: "g6-math-exp-04", name: "Solving One-Step Equations", subject: "math", domain: "Expressions & Equations", category: "Equations", subcategory: "One-Step", difficulty: "medium", order: 14, microSkills: makeMicroSkills("g6-math-exp-04", "Solving One-Step Equations", "Solve one-step equations with addition, subtraction, multiplication, division") },
      { code: "g6-math-exp-05", name: "Solving One-Step Inequalities", subject: "math", domain: "Expressions & Equations", category: "Inequalities", subcategory: "One-Step", difficulty: "medium", order: 15, microSkills: makeMicroSkills("g6-math-exp-05", "Solving One-Step Inequalities", "Solve and graph one-step inequalities") },
      { code: "g6-math-exp-06", name: "Independent & Dependent Variables", subject: "math", domain: "Expressions & Equations", category: "Functions", subcategory: "Variables", difficulty: "medium", order: 16, microSkills: makeMicroSkills("g6-math-exp-06", "Independent & Dependent Variables", "Represent and analyze relationships between dependent and independent variables") },
      { code: "g6-math-geo-01", name: "Area of Triangles & Polygons", subject: "math", domain: "Geometry", category: "Area", subcategory: "Polygons", difficulty: "medium", order: 17, microSkills: makeMicroSkills("g6-math-geo-01", "Area of Triangles & Polygons", "Find the area of right triangles, other triangles, and polygons") },
      { code: "g6-math-geo-02", name: "Volume & Surface Area", subject: "math", domain: "Geometry", category: "Volume", subcategory: "Surface Area", difficulty: "medium", order: 18, microSkills: makeMicroSkills("g6-math-geo-02", "Volume & Surface Area", "Find volume and surface area of three-dimensional figures") },
      { code: "g6-math-stat-01", name: "Statistical Questions & Data Distribution", subject: "math", domain: "Statistics & Probability", category: "Data", subcategory: "Statistical Questions", difficulty: "easy", order: 19, microSkills: makeMicroSkills("g6-math-stat-01", "Statistical Questions & Data Distribution", "Recognize statistical questions and describe data distributions") },
      { code: "g6-math-stat-02", name: "Measures of Center (Mean, Median, Mode)", subject: "math", domain: "Statistics & Probability", category: "Statistics", subcategory: "Central Tendency", difficulty: "medium", order: 20, microSkills: makeMicroSkills("g6-math-stat-02", "Measures of Center (Mean, Median, Mode)", "Find and interpret measures of center") },
    ],

    // ── Grade 7 ──
    7: [
      { code: "g7-math-rpa-01", name: "Proportional Relationships", subject: "math", domain: "Ratios & Proportions", category: "Proportions", subcategory: "Concepts", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g7-math-rpa-01", "Proportional Relationships", "Identify and represent proportional relationships") },
      { code: "g7-math-rpa-02", name: "Constant of Proportionality", subject: "math", domain: "Ratios & Proportions", category: "Proportions", subcategory: "Constant", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g7-math-rpa-02", "Constant of Proportionality", "Find the constant of proportionality in tables, graphs, and equations") },
      { code: "g7-math-rpa-03", name: "Percent Applications (Tax, Tip, Discount)", subject: "math", domain: "Ratios & Proportions", category: "Percentages", subcategory: "Applications", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g7-math-rpa-03", "Percent Applications (Tax, Tip, Discount)", "Solve real-world percent problems involving tax, tip, and discount") },
      { code: "g7-math-rpa-04", name: "Scale Drawings", subject: "math", domain: "Ratios & Proportions", category: "Scale", subcategory: "Drawings", difficulty: "medium", order: 4, microSkills: makeMicroSkills("g7-math-rpa-04", "Scale Drawings", "Solve problems involving scale drawings of geometric figures") },
      { code: "g7-math-ns-01", name: "Adding & Subtracting Rational Numbers", subject: "math", domain: "Number Systems", category: "Rational Numbers", subcategory: "Addition & Subtraction", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g7-math-ns-01", "Adding & Subtracting Rational Numbers", "Add and subtract rational numbers (positive and negative)") },
      { code: "g7-math-ns-02", name: "Multiplying & Dividing Rational Numbers", subject: "math", domain: "Number Systems", category: "Rational Numbers", subcategory: "Multiplication & Division", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g7-math-ns-02", "Multiplying & Dividing Rational Numbers", "Multiply and divide rational numbers") },
      { code: "g7-math-ns-03", name: "Operations with Fractions & Decimals", subject: "math", domain: "Number Systems", category: "Rational Numbers", subcategory: "Mixed Operations", difficulty: "hard", order: 7, microSkills: makeMicroSkills("g7-math-ns-03", "Operations with Fractions & Decimals", "Perform all operations with positive and negative fractions and decimals") },
      { code: "g7-math-exp-01", name: "Equivalent Expressions", subject: "math", domain: "Expressions & Equations", category: "Expressions", subcategory: "Equivalence", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g7-math-exp-01", "Equivalent Expressions", "Generate equivalent expressions using properties of operations") },
      { code: "g7-math-exp-02", name: "Solving Two-Step Equations", subject: "math", domain: "Expressions & Equations", category: "Equations", subcategory: "Two-Step", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g7-math-exp-02", "Solving Two-Step Equations", "Solve two-step equations with rational coefficients") },
      { code: "g7-math-exp-03", name: "Solving Two-Step Inequalities", subject: "math", domain: "Expressions & Equations", category: "Inequalities", subcategory: "Two-Step", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g7-math-exp-03", "Solving Two-Step Inequalities", "Solve and graph two-step inequalities") },
      { code: "g7-math-exp-04", name: "Multi-Step Equations with Rational Numbers", subject: "math", domain: "Expressions & Equations", category: "Equations", subcategory: "Multi-Step", difficulty: "hard", order: 11, microSkills: makeMicroSkills("g7-math-exp-04", "Multi-Step Equations with Rational Numbers", "Solve multi-step equations with rational numbers") },
      { code: "g7-math-geo-01", name: "Scale Drawings & Constructions", subject: "math", domain: "Geometry", category: "Scale", subcategory: "Drawings", difficulty: "medium", order: 12, microSkills: makeMicroSkills("g7-math-geo-01", "Scale Drawings & Constructions", "Solve problems involving scale drawings and geometric constructions") },
      { code: "g7-math-geo-02", name: "Angles & Angle Relationships", subject: "math", domain: "Geometry", category: "Angles", subcategory: "Relationships", difficulty: "medium", order: 13, microSkills: makeMicroSkills("g7-math-geo-02", "Angles & Angle Relationships", "Use angle relationships (complementary, supplementary, vertical, adjacent)") },
      { code: "g7-math-geo-03", name: "Circles: Area & Circumference", subject: "math", domain: "Geometry", category: "Circles", subcategory: "Area & Circumference", difficulty: "medium", order: 14, microSkills: makeMicroSkills("g7-math-geo-03", "Circles: Area & Circumference", "Find the area and circumference of circles") },
      { code: "g7-math-geo-04", name: "3D Shapes: Volume & Surface Area", subject: "math", domain: "Geometry", category: "Volume", subcategory: "3D Shapes", difficulty: "medium", order: 15, microSkills: makeMicroSkills("g7-math-geo-04", "3D Shapes: Volume & Surface Area", "Solve problems involving volume and surface area of 3D figures") },
      { code: "g7-math-geo-05", name: "Cross-Sections of 3D Figures", subject: "math", domain: "Geometry", category: "3D Geometry", subcategory: "Cross-Sections", difficulty: "hard", order: 16, microSkills: makeMicroSkills("g7-math-geo-05", "Cross-Sections of 3D Figures", "Describe the two-dimensional figures that result from slicing 3D figures") },
      { code: "g7-math-stat-01", name: "Sampling & Populations", subject: "math", domain: "Statistics & Probability", category: "Data", subcategory: "Sampling", difficulty: "medium", order: 17, microSkills: makeMicroSkills("g7-math-stat-01", "Sampling & Populations", "Understand sampling and draw inferences about populations") },
      { code: "g7-math-stat-02", name: "Comparing Data Sets", subject: "math", domain: "Statistics & Probability", category: "Statistics", subcategory: "Comparison", difficulty: "medium", order: 18, microSkills: makeMicroSkills("g7-math-stat-02", "Comparing Data Sets", "Compare two data sets using measures of center and variability") },
      { code: "g7-math-stat-03", name: "Probability Concepts", subject: "math", domain: "Statistics & Probability", category: "Probability", subcategory: "Concepts", difficulty: "medium", order: 19, microSkills: makeMicroSkills("g7-math-stat-03", "Probability Concepts", "Understand probability of chance events and simple probabilities") },
      { code: "g7-math-stat-04", name: "Compound Probability", subject: "math", domain: "Statistics & Probability", category: "Probability", subcategory: "Compound", difficulty: "hard", order: 20, microSkills: makeMicroSkills("g7-math-stat-04", "Compound Probability", "Find probabilities of compound events using sample spaces") },
    ],

    // ── Grade 8 ──
    8: [
      { code: "g8-math-ns-01", name: "Rational & Irrational Numbers", subject: "math", domain: "Number Systems", category: "Real Numbers", subcategory: "Rational vs Irrational", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g8-math-ns-01", "Rational & Irrational Numbers", "Distinguish between rational and irrational numbers") },
      { code: "g8-math-ns-02", name: "Square Roots & Cube Roots", subject: "math", domain: "Number Systems", category: "Roots", subcategory: "Square & Cube Roots", difficulty: "easy", order: 2, microSkills: makeMicroSkills("g8-math-ns-02", "Square Roots & Cube Roots", "Evaluate square roots and cube roots of perfect squares and cubes") },
      { code: "g8-math-ns-03", name: "Approximating Irrational Numbers", subject: "math", domain: "Number Systems", category: "Real Numbers", subcategory: "Approximation", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g8-math-ns-03", "Approximating Irrational Numbers", "Estimate the value of irrational numbers") },
      { code: "g8-math-exp-01", name: "Integer Exponents", subject: "math", domain: "Expressions & Equations", category: "Exponents", subcategory: "Integer Exponents", difficulty: "medium", order: 4, microSkills: makeMicroSkills("g8-math-exp-01", "Integer Exponents", "Work with integer exponents and the properties of exponents") },
      { code: "g8-math-exp-02", name: "Scientific Notation", subject: "math", domain: "Expressions & Equations", category: "Scientific Notation", subcategory: "Concepts", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g8-math-exp-02", "Scientific Notation", "Express numbers in scientific notation and perform operations") },
      { code: "g8-math-exp-03", name: "Solving Linear Equations", subject: "math", domain: "Expressions & Equations", category: "Equations", subcategory: "Linear", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g8-math-exp-03", "Solving Linear Equations", "Solve multi-step linear equations with variables on both sides") },
      { code: "g8-math-exp-04", name: "Solving Special Cases (No Solution, Identity)", subject: "math", domain: "Expressions & Equations", category: "Equations", subcategory: "Special Cases", difficulty: "medium", order: 7, microSkills: makeMicroSkills("g8-math-exp-04", "Solving Special Cases (No Solution, Identity)", "Identify equations with no solution, one solution, or infinitely many solutions") },
      { code: "g8-math-exp-05", name: "Slope & Rate of Change", subject: "math", domain: "Expressions & Equations", category: "Linear Functions", subcategory: "Slope", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g8-math-exp-05", "Slope & Rate of Change", "Understand slope as rate of change") },
      { code: "g8-math-exp-06", name: "Graphing Linear Equations", subject: "math", domain: "Expressions & Equations", category: "Linear Functions", subcategory: "Graphing", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g8-math-exp-06", "Graphing Linear Equations", "Graph linear equations using slope-intercept form") },
      { code: "g8-math-exp-07", name: "Writing Linear Equations", subject: "math", domain: "Expressions & Equations", category: "Linear Functions", subcategory: "Writing Equations", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g8-math-exp-07", "Writing Linear Equations", "Write linear equations from tables, graphs, and word problems") },
      { code: "g8-math-exp-08", name: "Systems of Linear Equations", subject: "math", domain: "Expressions & Equations", category: "Systems", subcategory: "Concepts", difficulty: "hard", order: 11, microSkills: makeMicroSkills("g8-math-exp-08", "Systems of Linear Equations", "Understand that solutions to systems are points of intersection") },
      { code: "g8-math-exp-09", name: "Solving Systems by Graphing", subject: "math", domain: "Expressions & Equations", category: "Systems", subcategory: "Graphing", difficulty: "medium", order: 12, microSkills: makeMicroSkills("g8-math-exp-09", "Solving Systems by Graphing", "Solve systems of equations by graphing") },
      { code: "g8-math-exp-10", name: "Solving Systems by Substitution/Elimination", subject: "math", domain: "Expressions & Equations", category: "Systems", subcategory: "Algebraic Methods", difficulty: "hard", order: 13, microSkills: makeMicroSkills("g8-math-exp-10", "Solving Systems by Substitution/Elimination", "Solve systems of equations using substitution and elimination") },
      { code: "g8-math-exp-11", name: "Functions: Inputs & Outputs", subject: "math", domain: "Expressions & Equations", category: "Functions", subcategory: "Concepts", difficulty: "medium", order: 14, microSkills: makeMicroSkills("g8-math-exp-11", "Functions: Inputs & Outputs", "Understand that a function assigns exactly one output to each input") },
      { code: "g8-math-exp-12", name: "Comparing Functions", subject: "math", domain: "Expressions & Equations", category: "Functions", subcategory: "Comparison", difficulty: "hard", order: 15, microSkills: makeMicroSkills("g8-math-exp-12", "Comparing Functions", "Compare properties of two functions represented in different ways") },
      { code: "g8-math-geo-01", name: "Transformations (Translations, Reflections, Rotations)", subject: "math", domain: "Geometry", category: "Transformations", subcategory: "Rigid Motions", difficulty: "medium", order: 16, microSkills: makeMicroSkills("g8-math-geo-01", "Transformations (Translations, Reflections, Rotations)", "Perform and describe rigid transformations on the coordinate plane") },
      { code: "g8-math-geo-02", name: "Congruence & Similarity", subject: "math", domain: "Geometry", category: "Congruence", subcategory: "Concepts", difficulty: "medium", order: 17, microSkills: makeMicroSkills("g8-math-geo-02", "Congruence & Similarity", "Understand congruence and similarity using transformations") },
      { code: "g8-math-geo-03", name: "Pythagorean Theorem", subject: "math", domain: "Geometry", category: "Pythagorean Theorem", subcategory: "Applications", difficulty: "medium", order: 18, microSkills: makeMicroSkills("g8-math-geo-03", "Pythagorean Theorem", "Apply the Pythagorean theorem to find distances and side lengths") },
      { code: "g8-math-geo-04", name: "Distance Between Points", subject: "math", domain: "Geometry", category: "Coordinate Geometry", subcategory: "Distance", difficulty: "medium", order: 19, microSkills: makeMicroSkills("g8-math-geo-04", "Distance Between Points", "Find the distance between two points on the coordinate plane") },
      { code: "g8-math-stat-01", name: "Scatter Plots & Association", subject: "math", domain: "Statistics & Probability", category: "Data", subcategory: "Scatter Plots", difficulty: "medium", order: 20, microSkills: makeMicroSkills("g8-math-stat-01", "Scatter Plots & Association", "Construct and interpret scatter plots for bivariate data") },
    ],

    // ── Grade 9 ──
    9: [
      { code: "g9-math-alg-01", name: "Solving Multi-Step Linear Equations", subject: "math", domain: "Algebra", category: "Equations", subcategory: "Multi-Step", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g9-math-alg-01", "Solving Multi-Step Linear Equations", "Solve multi-step linear equations with variables on both sides") },
      { code: "g9-math-alg-02", name: "Linear Inequalities", subject: "math", domain: "Algebra", category: "Inequalities", subcategory: "Linear", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g9-math-alg-02", "Linear Inequalities", "Solve and graph linear inequalities") },
      { code: "g9-math-alg-03", name: "Compound Inequalities", subject: "math", domain: "Algebra", category: "Inequalities", subcategory: "Compound", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g9-math-alg-03", "Compound Inequalities", "Solve compound inequalities (and/or)") },
      { code: "g9-math-alg-04", name: "Absolute Value Equations & Inequalities", subject: "math", domain: "Algebra", category: "Absolute Value", subcategory: "Equations & Inequalities", difficulty: "hard", order: 4, microSkills: makeMicroSkills("g9-math-alg-04", "Absolute Value Equations & Inequalities", "Solve absolute value equations and inequalities") },
      { code: "g9-math-alg-05", name: "Systems of Linear Inequalities", subject: "math", domain: "Algebra", category: "Systems", subcategory: "Inequalities", difficulty: "hard", order: 5, microSkills: makeMicroSkills("g9-math-alg-05", "Systems of Linear Inequalities", "Solve systems of linear inequalities by graphing") },
      { code: "g9-math-alg-06", name: "Direct & Inverse Variation", subject: "math", domain: "Algebra", category: "Variation", subcategory: "Direct & Inverse", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g9-math-alg-06", "Direct & Inverse Variation", "Model relationships using direct and inverse variation") },
      { code: "g9-math-func-01", name: "Function Notation & Evaluation", subject: "math", domain: "Functions", category: "Function Concepts", subcategory: "Notation", difficulty: "easy", order: 7, microSkills: makeMicroSkills("g9-math-func-01", "Function Notation & Evaluation", "Use function notation and evaluate functions for given inputs") },
      { code: "g9-math-func-02", name: "Domain & Range", subject: "math", domain: "Functions", category: "Function Concepts", subcategory: "Domain & Range", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g9-math-func-02", "Domain & Range", "Find the domain and range of functions") },
      { code: "g9-math-func-03", name: "Linear Functions & Slope-Intercept Form", subject: "math", domain: "Functions", category: "Linear Functions", subcategory: "Slope-Intercept", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g9-math-func-03", "Linear Functions & Slope-Intercept Form", "Graph linear functions in slope-intercept form") },
      { code: "g9-math-func-04", name: "Point-Slope & Standard Forms", subject: "math", domain: "Functions", category: "Linear Functions", subcategory: "Forms", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g9-math-func-04", "Point-Slope & Standard Forms", "Write linear equations in point-slope and standard form") },
      { code: "g9-math-func-05", name: "Parallel & Perpendicular Lines", subject: "math", domain: "Functions", category: "Linear Functions", subcategory: "Parallel & Perpendicular", difficulty: "medium", order: 11, microSkills: makeMicroSkills("g9-math-func-05", "Parallel & Perpendicular Lines", "Write equations of parallel and perpendicular lines") },
      { code: "g9-math-func-06", name: "Intro to Exponential Functions", subject: "math", domain: "Functions", category: "Exponential Functions", subcategory: "Concepts", difficulty: "medium", order: 12, microSkills: makeMicroSkills("g9-math-func-06", "Intro to Exponential Functions", "Graph and evaluate exponential functions") },
      { code: "g9-math-geo-01", name: "Congruent Triangles & Proofs", subject: "math", domain: "Geometry", category: "Triangles", subcategory: "Congruence", difficulty: "hard", order: 13, microSkills: makeMicroSkills("g9-math-geo-01", "Congruent Triangles & Proofs", "Prove triangles congruent using SSS, SAS, ASA, AAS, HL") },
      { code: "g9-math-geo-02", name: "Similar Triangles", subject: "math", domain: "Geometry", category: "Triangles", subcategory: "Similarity", difficulty: "medium", order: 14, microSkills: makeMicroSkills("g9-math-geo-02", "Similar Triangles", "Use similarity criteria to solve problems with similar triangles") },
      { code: "g9-math-geo-03", name: "Right Triangle Trigonometry", subject: "math", domain: "Geometry", category: "Trigonometry", subcategory: "Right Triangles", difficulty: "medium", order: 15, microSkills: makeMicroSkills("g9-math-geo-03", "Right Triangle Trigonometry", "Use sine, cosine, and tangent ratios to solve right triangles") },
      { code: "g9-math-geo-04", name: "Quadrilaterals & Polygons", subject: "math", domain: "Geometry", category: "Polygons", subcategory: "Quadrilaterals", difficulty: "medium", order: 16, microSkills: makeMicroSkills("g9-math-geo-04", "Quadrilaterals & Polygons", "Classify and solve problems with quadrilaterals and polygons") },
      { code: "g9-math-geo-05", name: "Circles: Tangents, Chords, Arcs", subject: "math", domain: "Geometry", category: "Circles", subcategory: "Properties", difficulty: "hard", order: 17, microSkills: makeMicroSkills("g9-math-geo-05", "Circles: Tangents, Chords, Arcs", "Understand and apply properties of circles, tangents, chords, and arcs") },
      { code: "g9-math-stat-01", name: "Two-Way Tables & Relative Frequencies", subject: "math", domain: "Statistics & Probability", category: "Data", subcategory: "Two-Way Tables", difficulty: "medium", order: 18, microSkills: makeMicroSkills("g9-math-stat-01", "Two-Way Tables & Relative Frequencies", "Interpret two-way tables and calculate relative frequencies") },
      { code: "g9-math-stat-02", name: "Scatter Plots & Line of Best Fit", subject: "math", domain: "Statistics & Probability", category: "Data", subcategory: "Regression", difficulty: "medium", order: 19, microSkills: makeMicroSkills("g9-math-stat-02", "Scatter Plots & Line of Best Fit", "Fit a linear function to bivariate data") },
      { code: "g9-math-stat-03", name: "Interpreting Linear Models", subject: "math", domain: "Statistics & Probability", category: "Data", subcategory: "Modeling", difficulty: "hard", order: 20, microSkills: makeMicroSkills("g9-math-stat-03", "Interpreting Linear Models", "Interpret slope and y-intercept in context of linear models") },
    ],

    // ── Grade 10 ──
    10: [
      { code: "g10-math-alg-01", name: "Polynomial Operations", subject: "math", domain: "Algebra", category: "Polynomials", subcategory: "Operations", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g10-math-alg-01", "Polynomial Operations", "Add, subtract, and multiply polynomials") },
      { code: "g10-math-alg-02", name: "Factoring Polynomials", subject: "math", domain: "Algebra", category: "Polynomials", subcategory: "Factoring", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g10-math-alg-02", "Factoring Polynomials", "Factor polynomials using GCF, grouping, and special patterns") },
      { code: "g10-math-alg-03", name: "Solving Quadratic Equations (Factoring)", subject: "math", domain: "Algebra", category: "Quadratics", subcategory: "Factoring", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g10-math-alg-03", "Solving Quadratic Equations (Factoring)", "Solve quadratic equations by factoring") },
      { code: "g10-math-alg-04", name: "Completing the Square", subject: "math", domain: "Algebra", category: "Quadratics", subcategory: "Completing the Square", difficulty: "hard", order: 4, microSkills: makeMicroSkills("g10-math-alg-04", "Completing the Square", "Solve quadratic equations by completing the square") },
      { code: "g10-math-alg-05", name: "Quadratic Formula", subject: "math", domain: "Algebra", category: "Quadratics", subcategory: "Quadratic Formula", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g10-math-alg-05", "Quadratic Formula", "Solve quadratic equations using the quadratic formula") },
      { code: "g10-math-alg-06", name: "Complex Numbers", subject: "math", domain: "Algebra", category: "Complex Numbers", subcategory: "Operations", difficulty: "hard", order: 6, microSkills: makeMicroSkills("g10-math-alg-06", "Complex Numbers", "Perform operations with complex numbers") },
      { code: "g10-math-func-01", name: "Quadratic Functions & Graphs", subject: "math", domain: "Functions", category: "Quadratic Functions", subcategory: "Graphing", difficulty: "medium", order: 7, microSkills: makeMicroSkills("g10-math-func-01", "Quadratic Functions & Graphs", "Graph quadratic functions and identify key features") },
      { code: "g10-math-func-02", name: "Vertex Form & Transformations", subject: "math", domain: "Functions", category: "Quadratic Functions", subcategory: "Transformations", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g10-math-func-02", "Vertex Form & Transformations", "Rewrite quadratics in vertex form and describe transformations") },
      { code: "g10-math-func-03", name: "Exponential Growth & Decay", subject: "math", domain: "Functions", category: "Exponential Functions", subcategory: "Growth & Decay", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g10-math-func-03", "Exponential Growth & Decay", "Model exponential growth and decay scenarios") },
      { code: "g10-math-func-04", name: "Sequences (Arithmetic & Geometric)", subject: "math", domain: "Functions", category: "Sequences", subcategory: "Arithmetic & Geometric", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g10-math-func-04", "Sequences (Arithmetic & Geometric)", "Identify and write formulas for arithmetic and geometric sequences") },
      { code: "g10-math-func-05", name: "Piecewise Functions", subject: "math", domain: "Functions", category: "Piecewise Functions", subcategory: "Graphing", difficulty: "hard", order: 11, microSkills: makeMicroSkills("g10-math-func-05", "Piecewise Functions", "Graph and evaluate piecewise functions") },
      { code: "g10-math-func-06", name: "Inverse Functions", subject: "math", domain: "Functions", category: "Function Concepts", subcategory: "Inverses", difficulty: "hard", order: 12, microSkills: makeMicroSkills("g10-math-func-06", "Inverse Functions", "Find and verify inverse functions") },
      { code: "g10-math-geo-01", name: "Coordinate Geometry Proofs", subject: "math", domain: "Geometry", category: "Coordinate Geometry", subcategory: "Proofs", difficulty: "hard", order: 13, microSkills: makeMicroSkills("g10-math-geo-01", "Coordinate Geometry Proofs", "Use coordinate geometry to prove geometric theorems") },
      { code: "g10-math-geo-02", name: "Trigonometric Ratios & Applications", subject: "math", domain: "Geometry", category: "Trigonometry", subcategory: "Applications", difficulty: "medium", order: 14, microSkills: makeMicroSkills("g10-math-geo-02", "Trigonometric Ratios & Applications", "Apply trigonometric ratios to solve real-world problems") },
      { code: "g10-math-geo-03", name: "Law of Sines & Cosines", subject: "math", domain: "Geometry", category: "Trigonometry", subcategory: "Law of Sines & Cosines", difficulty: "hard", order: 15, microSkills: makeMicroSkills("g10-math-geo-03", "Law of Sines & Cosines", "Use the Law of Sines and Law of Cosines to solve triangles") },
      { code: "g10-math-geo-04", name: "Arc Length & Sector Area", subject: "math", domain: "Geometry", category: "Circles", subcategory: "Arcs & Sectors", difficulty: "medium", order: 16, microSkills: makeMicroSkills("g10-math-geo-04", "Arc Length & Sector Area", "Find arc lengths and sector areas of circles") },
      { code: "g10-math-stat-01", name: "Probability & Conditional Probability", subject: "math", domain: "Statistics & Probability", category: "Probability", subcategory: "Conditional", difficulty: "medium", order: 17, microSkills: makeMicroSkills("g10-math-stat-01", "Probability & Conditional Probability", "Calculate conditional probabilities and interpret independence") },
      { code: "g10-math-stat-02", name: "Independent & Dependent Events", subject: "math", domain: "Statistics & Probability", category: "Probability", subcategory: "Independent & Dependent", difficulty: "medium", order: 18, microSkills: makeMicroSkills("g10-math-stat-02", "Independent & Dependent Events", "Determine if events are independent and compute probabilities") },
      { code: "g10-math-stat-03", name: "Data Collection & Experimental Design", subject: "math", domain: "Statistics & Probability", category: "Data", subcategory: "Study Design", difficulty: "medium", order: 19, microSkills: makeMicroSkills("g10-math-stat-03", "Data Collection & Experimental Design", "Identify different data collection methods and study designs") },
      { code: "g10-math-stat-04", name: "Normal Distribution", subject: "math", domain: "Statistics & Probability", category: "Statistics", subcategory: "Normal Distribution", difficulty: "hard", order: 20, microSkills: makeMicroSkills("g10-math-stat-04", "Normal Distribution", "Understand and apply properties of the normal distribution") },
    ],
  }

  for (const config of gradeConfigs) {
    grades.push({
      level: config.level,
      label: config.label,
      skills: gradeSkills[config.level] || [],
    })
  }

  return {
    code: "core-math",
    name: "Core Math",
    description: "Grades 3-10 Mathematics — Common Core aligned",
    grades,
  }
}

function getCoreEnglishProgram(): ProgramDef {
  const grades: GradeDef[] = []
  const gradeConfigs = [
    { level: 3, label: "Grade 3" },
    { level: 4, label: "Grade 4" },
    { level: 5, label: "Grade 5" },
    { level: 6, label: "Grade 6" },
    { level: 7, label: "Grade 7" },
    { level: 8, label: "Grade 8" },
    { level: 9, label: "Grade 9" },
    { level: 10, label: "Grade 10" },
  ]

  const gradeSkills: Record<number, SkillDef[]> = {
    // ── Grade 3 ──
    3: [
      { code: "g3-eng-rl-01", name: "Reading Literature: Key Details", subject: "english", domain: "Reading Literature", category: "Comprehension", subcategory: "Key Ideas", difficulty: "easy", order: 1, microSkills: makeMicroSkills("g3-eng-rl-01", "Reading Literature: Key Details", "Ask and answer questions about key details in literary texts") },
      { code: "g3-eng-rl-02", name: "Reading Literature: Character & Setting", subject: "english", domain: "Reading Literature", category: "Literary Elements", subcategory: "Characters & Setting", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g3-eng-rl-02", "Reading Literature: Character & Setting", "Describe characters, settings, and major events in stories") },
      { code: "g3-eng-ri-01", name: "Reading Informational: Main Idea", subject: "english", domain: "Reading Informational", category: "Comprehension", subcategory: "Main Idea", difficulty: "easy", order: 3, microSkills: makeMicroSkills("g3-eng-ri-01", "Reading Informational: Main Idea", "Determine the main idea of informational texts and explain how details support it") },
      { code: "g3-eng-ri-02", name: "Reading Informational: Text Features", subject: "english", domain: "Reading Informational", category: "Text Structure", subcategory: "Text Features", difficulty: "medium", order: 4, microSkills: makeMicroSkills("g3-eng-ri-02", "Reading Informational: Text Features", "Use text features (headings, captions, charts) to locate information") },
      { code: "g3-eng-w-01", name: "Writing: Opinion Pieces", subject: "english", domain: "Writing", category: "Opinion Writing", subcategory: "Structure", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g3-eng-w-01", "Writing: Opinion Pieces", "Write opinion pieces introducing a topic, stating an opinion, and providing reasons") },
      { code: "g3-eng-w-02", name: "Writing: Narratives", subject: "english", domain: "Writing", category: "Narrative Writing", subcategory: "Story Elements", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g3-eng-w-02", "Writing: Narratives", "Write narratives with sequenced events, descriptive details, and closure") },
      { code: "g3-eng-l-01", name: "Grammar: Parts of Speech", subject: "english", domain: "Language", category: "Grammar", subcategory: "Parts of Speech", difficulty: "easy", order: 7, microSkills: makeMicroSkills("g3-eng-l-01", "Grammar: Parts of Speech", "Identify and use nouns, pronouns, verbs, adjectives, and adverbs correctly") },
      { code: "g3-eng-l-02", name: "Grammar: Sentence Types", subject: "english", domain: "Language", category: "Grammar", subcategory: "Sentence Structure", difficulty: "easy", order: 8, microSkills: makeMicroSkills("g3-eng-l-02", "Grammar: Sentence Types", "Identify and write declarative, interrogative, imperative, and exclamatory sentences") },
      { code: "g3-eng-v-01", name: "Vocabulary: Context Clues", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Context Clues", difficulty: "easy", order: 9, microSkills: makeMicroSkills("g3-eng-v-01", "Vocabulary: Context Clues", "Use sentence-level context clues to determine word meanings") },
      { code: "g3-eng-v-02", name: "Vocabulary: Word Relationships", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Word Relationships", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g3-eng-v-02", "Vocabulary: Word Relationships", "Understand synonyms, antonyms, and shades of meaning among related words") },
      { code: "g3-eng-sl-01", name: "Speaking & Listening: Collaborative Discussion", subject: "english", domain: "Speaking & Listening", category: "Collaboration", subcategory: "Discussion", difficulty: "easy", order: 11, microSkills: makeMicroSkills("g3-eng-sl-01", "Speaking & Listening: Collaborative Discussion", "Engage effectively in collaborative discussions, building on others' ideas") },
    ],

    // ── Grade 4 ──
    4: [
      { code: "g4-eng-rl-01", name: "Reading Literature: Theme & Summary", subject: "english", domain: "Reading Literature", category: "Comprehension", subcategory: "Theme", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g4-eng-rl-01", "Reading Literature: Theme & Summary", "Determine theme and summarize literary texts from details in the text") },
      { code: "g4-eng-rl-02", name: "Reading Literature: Characters & Events", subject: "english", domain: "Reading Literature", category: "Literary Elements", subcategory: "Character Analysis", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g4-eng-rl-02", "Reading Literature: Characters & Events", "Describe characters, settings, and events using specific textual details") },
      { code: "g4-eng-ri-01", name: "Reading Informational: Main Idea & Details", subject: "english", domain: "Reading Informational", category: "Comprehension", subcategory: "Main Idea", difficulty: "easy", order: 3, microSkills: makeMicroSkills("g4-eng-ri-01", "Reading Informational: Main Idea & Details", "Determine main idea and explain how supporting details relate to it") },
      { code: "g4-eng-ri-02", name: "Reading Informational: Cause & Effect", subject: "english", domain: "Reading Informational", category: "Text Structure", subcategory: "Cause & Effect", difficulty: "medium", order: 4, microSkills: makeMicroSkills("g4-eng-ri-02", "Reading Informational: Cause & Effect", "Explain cause-and-effect relationships in informational texts") },
      { code: "g4-eng-w-01", name: "Writing: Informative/Explanatory", subject: "english", domain: "Writing", category: "Informative Writing", subcategory: "Exposition", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g4-eng-w-01", "Writing: Informative/Explanatory", "Write informative texts to examine a topic and convey ideas clearly") },
      { code: "g4-eng-w-02", name: "Writing: Opinion with Reasons", subject: "english", domain: "Writing", category: "Opinion Writing", subcategory: "Argumentation", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g4-eng-w-02", "Writing: Opinion with Reasons", "Write opinion pieces supported by facts, reasons, and organized structure") },
      { code: "g4-eng-l-01", name: "Grammar: Verb Tenses", subject: "english", domain: "Language", category: "Grammar", subcategory: "Verbs", difficulty: "easy", order: 7, microSkills: makeMicroSkills("g4-eng-l-01", "Grammar: Verb Tenses", "Use progressive, perfect, and modal auxiliaries to convey time and mood") },
      { code: "g4-eng-l-02", name: "Grammar: Capitalization & Punctuation", subject: "english", domain: "Language", category: "Grammar", subcategory: "Mechanics", difficulty: "easy", order: 8, microSkills: makeMicroSkills("g4-eng-l-02", "Grammar: Capitalization & Punctuation", "Use correct capitalization, commas, and quotation marks in writing") },
      { code: "g4-eng-v-01", name: "Vocabulary: Greek & Latin Roots", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Word Origins", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g4-eng-v-01", "Vocabulary: Greek & Latin Roots", "Use common Greek and Latin affixes and roots to determine word meanings") },
      { code: "g4-eng-v-02", name: "Vocabulary: Figurative Language", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Figurative Language", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g4-eng-v-02", "Vocabulary: Figurative Language", "Identify and explain simple similes, metaphors, and idioms in context") },
      { code: "g4-eng-sl-01", name: "Speaking & Listening: Paraphrasing", subject: "english", domain: "Speaking & Listening", category: "Comprehension", subcategory: "Paraphrasing", difficulty: "easy", order: 11, microSkills: makeMicroSkills("g4-eng-sl-01", "Speaking & Listening: Paraphrasing", "Paraphrase portions of read-aloud texts and information presented orally") },
    ],

    // ── Grade 5 ──
    5: [
      { code: "g5-eng-rl-01", name: "Reading Literature: Compare & Contrast", subject: "english", domain: "Reading Literature", category: "Comprehension", subcategory: "Compare & Contrast", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g5-eng-rl-01", "Reading Literature: Compare & Contrast", "Compare and contrast characters, settings, and events across stories") },
      { code: "g5-eng-rl-02", name: "Reading Literature: Figurative Language", subject: "english", domain: "Reading Literature", category: "Craft & Structure", subcategory: "Figurative Language", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g5-eng-rl-02", "Reading Literature: Figurative Language", "Interpret figurative language including metaphors, similes, and personification") },
      { code: "g5-eng-ri-01", name: "Reading Informational: Compare Structures", subject: "english", domain: "Reading Informational", category: "Text Structure", subcategory: "Comparison", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g5-eng-ri-01", "Reading Informational: Compare Structures", "Compare and contrast the structure of multiple informational texts on the same topic") },
      { code: "g5-eng-ri-02", name: "Reading Informational: Author's Point of View", subject: "english", domain: "Reading Informational", category: "Craft & Structure", subcategory: "Point of View", difficulty: "medium", order: 4, microSkills: makeMicroSkills("g5-eng-ri-02", "Reading Informational: Author's Point of View", "Analyze how the author's point of view shapes informational text") },
      { code: "g5-eng-w-01", name: "Writing: Narrative Craft", subject: "english", domain: "Writing", category: "Narrative Writing", subcategory: "Craft", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g5-eng-w-01", "Writing: Narrative Craft", "Write narratives with vivid descriptions, dialogue, and controlled pacing") },
      { code: "g5-eng-w-02", name: "Writing: Research & Note-Taking", subject: "english", domain: "Writing", category: "Research", subcategory: "Note-Taking", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g5-eng-w-02", "Writing: Research & Note-Taking", "Conduct short research projects using multiple sources and take organized notes") },
      { code: "g5-eng-l-01", name: "Grammar: Conjunctions & Sentence Combining", subject: "english", domain: "Language", category: "Grammar", subcategory: "Sentence Combining", difficulty: "easy", order: 7, microSkills: makeMicroSkills("g5-eng-l-01", "Grammar: Conjunctions & Sentence Combining", "Use coordinating, subordinating, and correlative conjunctions effectively") },
      { code: "g5-eng-l-02", name: "Grammar: Punctuation for Clarity", subject: "english", domain: "Language", category: "Grammar", subcategory: "Punctuation", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g5-eng-l-02", "Grammar: Punctuation for Clarity", "Use commas, parentheses, and dashes to set off nonrestrictive elements") },
      { code: "g5-eng-v-01", name: "Vocabulary: Academic Words", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Academic Vocabulary", difficulty: "easy", order: 9, microSkills: makeMicroSkills("g5-eng-v-01", "Vocabulary: Academic Words", "Acquire and use grade-appropriate general academic and domain-specific words") },
      { code: "g5-eng-v-02", name: "Vocabulary: Word Analysis", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Word Analysis", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g5-eng-v-02", "Vocabulary: Word Analysis", "Use affixes, roots, and word families to determine the meaning of unfamiliar words") },
      { code: "g5-eng-sl-01", name: "Speaking & Listening: Oral Presentations", subject: "english", domain: "Speaking & Listening", category: "Presentation", subcategory: "Delivery", difficulty: "medium", order: 11, microSkills: makeMicroSkills("g5-eng-sl-01", "Speaking & Listening: Oral Presentations", "Deliver clear, coherent oral presentations with appropriate volume and pacing") },
    ],

    // ── Grade 6 ──
    6: [
      { code: "g6-eng-rl-01", name: "Reading Literature: Plot & Structure", subject: "english", domain: "Reading Literature", category: "Literary Elements", subcategory: "Plot", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g6-eng-rl-01", "Reading Literature: Plot & Structure", "Analyze plot development, conflict types, and story structure in literary texts") },
      { code: "g6-eng-rl-02", name: "Reading Literature: Point of View", subject: "english", domain: "Reading Literature", category: "Craft & Structure", subcategory: "Point of View", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g6-eng-rl-02", "Reading Literature: Point of View", "Analyze how point of view and narrator type shape the reader's experience") },
      { code: "g6-eng-ri-01", name: "Reading Informational: Central Ideas", subject: "english", domain: "Reading Informational", category: "Comprehension", subcategory: "Central Ideas", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g6-eng-ri-01", "Reading Informational: Central Ideas", "Determine central ideas and provide objective summaries of informational texts") },
      { code: "g6-eng-ri-02", name: "Reading Informational: Argument & Claims", subject: "english", domain: "Reading Informational", category: "Analysis", subcategory: "Arguments", difficulty: "hard", order: 4, microSkills: makeMicroSkills("g6-eng-ri-02", "Reading Informational: Argument & Claims", "Trace and evaluate arguments and specific claims in informational texts") },
      { code: "g6-eng-w-01", name: "Writing: Argumentative", subject: "english", domain: "Writing", category: "Argumentative Writing", subcategory: "Claims & Evidence", difficulty: "medium", order: 5, microSkills: makeMicroSkills("g6-eng-w-01", "Writing: Argumentative", "Write arguments with clear claims, supporting evidence, and logical reasoning") },
      { code: "g6-eng-w-02", name: "Writing: Informative/Explanatory", subject: "english", domain: "Writing", category: "Informative Writing", subcategory: "Analysis", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g6-eng-w-02", "Writing: Informative/Explanatory", "Write informative texts that examine a topic with supporting details and analysis") },
      { code: "g6-eng-l-01", name: "Grammar: Pronoun Usage", subject: "english", domain: "Language", category: "Grammar", subcategory: "Pronouns", difficulty: "easy", order: 7, microSkills: makeMicroSkills("g6-eng-l-01", "Grammar: Pronoun Usage", "Use pronoun case, number, and person correctly with clear antecedent reference") },
      { code: "g6-eng-l-02", name: "Grammar: Sentence Variety", subject: "english", domain: "Language", category: "Grammar", subcategory: "Sentence Variety", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g6-eng-l-02", "Grammar: Sentence Variety", "Vary sentence patterns for meaning, reader interest, and style") },
      { code: "g6-eng-v-01", name: "Vocabulary: Context & Denotation", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Context Clues", difficulty: "easy", order: 9, microSkills: makeMicroSkills("g6-eng-v-01", "Vocabulary: Context & Denotation", "Determine word meanings using context clues, denotation, and connotation") },
      { code: "g6-eng-v-02", name: "Vocabulary: Figures of Speech", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Figures of Speech", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g6-eng-v-02", "Vocabulary: Figures of Speech", "Interpret figures of speech such as personification, hyperbole, and oxymoron") },
      { code: "g6-eng-sl-01", name: "Speaking & Listening: Discussion Roles", subject: "english", domain: "Speaking & Listening", category: "Collaboration", subcategory: "Discussion", difficulty: "easy", order: 11, microSkills: makeMicroSkills("g6-eng-sl-01", "Speaking & Listening: Discussion Roles", "Participate in collaborative discussions, setting goals and taking defined roles") },
    ],

    // ── Grade 7 ──
    7: [
      { code: "g7-eng-rl-01", name: "Reading Literature: Theme Development", subject: "english", domain: "Reading Literature", category: "Comprehension", subcategory: "Theme", difficulty: "medium", order: 1, microSkills: makeMicroSkills("g7-eng-rl-01", "Reading Literature: Theme Development", "Analyze how themes develop over the course of a literary text") },
      { code: "g7-eng-rl-02", name: "Reading Literature: Literary Devices", subject: "english", domain: "Reading Literature", category: "Craft & Structure", subcategory: "Literary Devices", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g7-eng-rl-02", "Reading Literature: Literary Devices", "Analyze how literary devices such as irony, symbolism, and allegory convey meaning") },
      { code: "g7-eng-ri-01", name: "Reading Informational: Text Structure Analysis", subject: "english", domain: "Reading Informational", category: "Text Structure", subcategory: "Analysis", difficulty: "medium", order: 3, microSkills: makeMicroSkills("g7-eng-ri-01", "Reading Informational: Text Structure Analysis", "Analyze how informational text structures organize and present ideas") },
      { code: "g7-eng-ri-02", name: "Reading Informational: Author's Purpose & Rhetoric", subject: "english", domain: "Reading Informational", category: "Craft & Structure", subcategory: "Rhetoric", difficulty: "hard", order: 4, microSkills: makeMicroSkills("g7-eng-ri-02", "Reading Informational: Author's Purpose & Rhetoric", "Analyze how authors use rhetorical appeals and language to achieve purpose") },
      { code: "g7-eng-w-01", name: "Writing: Argument with Research", subject: "english", domain: "Writing", category: "Argumentative Writing", subcategory: "Research", difficulty: "hard", order: 5, microSkills: makeMicroSkills("g7-eng-w-01", "Writing: Argument with Research", "Write arguments supported by evidence from credible print and digital sources") },
      { code: "g7-eng-w-02", name: "Writing: Narrative Techniques", subject: "english", domain: "Writing", category: "Narrative Writing", subcategory: "Techniques", difficulty: "medium", order: 6, microSkills: makeMicroSkills("g7-eng-w-02", "Writing: Narrative Techniques", "Use narrative techniques such as dialogue, pacing, and description to develop experiences") },
      { code: "g7-eng-l-01", name: "Grammar: Phrases & Clauses", subject: "english", domain: "Language", category: "Grammar", subcategory: "Phrases & Clauses", difficulty: "medium", order: 7, microSkills: makeMicroSkills("g7-eng-l-01", "Grammar: Phrases & Clauses", "Explain the function of phrases and clauses and use them in writing") },
      { code: "g7-eng-l-02", name: "Grammar: Modifiers & Placement", subject: "english", domain: "Language", category: "Grammar", subcategory: "Modifiers", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g7-eng-l-02", "Grammar: Modifiers & Placement", "Use modifiers correctly and avoid dangling and misplaced modifiers") },
      { code: "g7-eng-v-01", name: "Vocabulary: Connotation & Nuance", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Connotation", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g7-eng-v-01", "Vocabulary: Connotation & Nuance", "Distinguish among connotations, nuances, and shades of meaning in related words") },
      { code: "g7-eng-v-02", name: "Vocabulary: Domain-Specific Terms", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Domain-Specific", difficulty: "easy", order: 10, microSkills: makeMicroSkills("g7-eng-v-02", "Vocabulary: Domain-Specific Terms", "Acquire and use grade-appropriate domain-specific vocabulary across subjects") },
      { code: "g7-eng-sl-01", name: "Speaking & Listening: Evaluating Sources", subject: "english", domain: "Speaking & Listening", category: "Comprehension", subcategory: "Evaluation", difficulty: "hard", order: 11, microSkills: makeMicroSkills("g7-eng-sl-01", "Speaking & Listening: Evaluating Sources", "Evaluate the credibility, accuracy, and relevance of information presented orally") },
    ],

    // ── Grade 8 ──
    8: [
      { code: "g8-eng-rl-01", name: "Reading Literature: Comparing Texts", subject: "english", domain: "Reading Literature", category: "Comprehension", subcategory: "Comparison", difficulty: "hard", order: 1, microSkills: makeMicroSkills("g8-eng-rl-01", "Reading Literature: Comparing Texts", "Compare and contrast texts from different genres that address similar themes") },
      { code: "g8-eng-rl-02", name: "Reading Literature: Structure & Meaning", subject: "english", domain: "Reading Literature", category: "Craft & Structure", subcategory: "Structure", difficulty: "medium", order: 2, microSkills: makeMicroSkills("g8-eng-rl-02", "Reading Literature: Structure & Meaning", "Analyze how the structure of a text contributes to its meaning and aesthetic effect") },
      { code: "g8-eng-ri-01", name: "Reading Informational: Conflicting Evidence", subject: "english", domain: "Reading Informational", category: "Analysis", subcategory: "Evidence", difficulty: "hard", order: 3, microSkills: makeMicroSkills("g8-eng-ri-01", "Reading Informational: Conflicting Evidence", "Evaluate the reasoning and evidence presented in arguments across texts") },
      { code: "g8-eng-ri-02", name: "Reading Informational: Synthesis Across Texts", subject: "english", domain: "Reading Informational", category: "Synthesis", subcategory: "Multiple Sources", difficulty: "hard", order: 4, microSkills: makeMicroSkills("g8-eng-ri-02", "Reading Informational: Synthesis Across Texts", "Synthesize information from multiple texts to support analysis and research") },
      { code: "g8-eng-w-01", name: "Writing: Research Papers", subject: "english", domain: "Writing", category: "Research Writing", subcategory: "Citations", difficulty: "hard", order: 5, microSkills: makeMicroSkills("g8-eng-w-01", "Writing: Research Papers", "Write research papers using proper citation, quotations, and source integration") },
      { code: "g8-eng-w-02", name: "Writing: Argumentative with Counterclaims", subject: "english", domain: "Writing", category: "Argumentative Writing", subcategory: "Counterclaims", difficulty: "hard", order: 6, microSkills: makeMicroSkills("g8-eng-w-02", "Writing: Argumentative with Counterclaims", "Write arguments acknowledging and addressing counterclaims with evidence") },
      { code: "g8-eng-l-01", name: "Grammar: Active & Passive Voice", subject: "english", domain: "Language", category: "Grammar", subcategory: "Voice", difficulty: "medium", order: 7, microSkills: makeMicroSkills("g8-eng-l-01", "Grammar: Active & Passive Voice", "Recognize and use active and passive voice effectively for different purposes") },
      { code: "g8-eng-l-02", name: "Grammar: Verb Moods", subject: "english", domain: "Language", category: "Grammar", subcategory: "Verb Mood", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g8-eng-l-02", "Grammar: Verb Moods", "Use indicative, imperative, interrogative, conditional, and subjunctive moods correctly") },
      { code: "g8-eng-v-01", name: "Vocabulary: Word Relationships & Etymology", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Etymology", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g8-eng-v-01", "Vocabulary: Word Relationships & Etymology", "Analyze word origins, derivations, and relationships to deepen vocabulary knowledge") },
      { code: "g8-eng-v-02", name: "Vocabulary: Verbal Irony & Wordplay", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Wordplay", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g8-eng-v-02", "Vocabulary: Verbal Irony & Wordplay", "Interpret verbal irony, puns, and wordplay in literary and informational contexts") },
      { code: "g8-eng-sl-01", name: "Speaking & Listening: Multimedia Presentations", subject: "english", domain: "Speaking & Listening", category: "Presentation", subcategory: "Multimedia", difficulty: "medium", order: 11, microSkills: makeMicroSkills("g8-eng-sl-01", "Speaking & Listening: Multimedia Presentations", "Integrate multimedia elements into presentations to clarify and enhance information") },
    ],

    // ── Grade 9 ──
    9: [
      { code: "g9-eng-rl-01", name: "Reading Literature: Close Reading Analysis", subject: "english", domain: "Reading Literature", category: "Comprehension", subcategory: "Close Reading", difficulty: "hard", order: 1, microSkills: makeMicroSkills("g9-eng-rl-01", "Reading Literature: Close Reading Analysis", "Perform close reading analysis of literature, citing textual evidence to support claims") },
      { code: "g9-eng-rl-02", name: "Reading Literature: Archetypes & Allusions", subject: "english", domain: "Reading Literature", category: "Craft & Structure", subcategory: "Archetypes", difficulty: "hard", order: 2, microSkills: makeMicroSkills("g9-eng-rl-02", "Reading Literature: Archetypes & Allusions", "Analyze archetypal patterns, allusions, and cross-cultural literary references") },
      { code: "g9-eng-ri-01", name: "Reading Informational: Rhetorical Analysis", subject: "english", domain: "Reading Informational", category: "Analysis", subcategory: "Rhetorical Analysis", difficulty: "hard", order: 3, microSkills: makeMicroSkills("g9-eng-ri-01", "Reading Informational: Rhetorical Analysis", "Analyze how authors use rhetorical appeals, diction, and syntax to persuade") },
      { code: "g9-eng-ri-02", name: "Reading Informational: Bias & Perspective", subject: "english", domain: "Reading Informational", category: "Analysis", subcategory: "Bias", difficulty: "hard", order: 4, microSkills: makeMicroSkills("g9-eng-ri-02", "Reading Informational: Bias & Perspective", "Identify bias, perspective, and reliability in informational and argumentative texts") },
      { code: "g9-eng-w-01", name: "Writing: Literary Analysis", subject: "english", domain: "Writing", category: "Analytical Writing", subcategory: "Literary Analysis", difficulty: "hard", order: 5, microSkills: makeMicroSkills("g9-eng-w-01", "Writing: Literary Analysis", "Write analytical essays examining themes, literary devices, and author's craft") },
      { code: "g9-eng-w-02", name: "Writing: Persuasive Argument", subject: "english", domain: "Writing", category: "Argumentative Writing", subcategory: "Persuasion", difficulty: "hard", order: 6, microSkills: makeMicroSkills("g9-eng-w-02", "Writing: Persuasive Argument", "Write persuasive arguments integrating ethos, pathos, logos, and sophisticated evidence") },
      { code: "g9-eng-l-01", name: "Grammar: Sentence Style & Clarity", subject: "english", domain: "Language", category: "Grammar", subcategory: "Style", difficulty: "medium", order: 7, microSkills: makeMicroSkills("g9-eng-l-01", "Grammar: Sentence Style & Clarity", "Revise sentences for clarity, conciseness, and stylistic effectiveness") },
      { code: "g9-eng-l-02", name: "Grammar: Parallel Structure & Coordination", subject: "english", domain: "Language", category: "Grammar", subcategory: "Parallelism", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g9-eng-l-02", "Grammar: Parallel Structure & Coordination", "Use parallel structure, coordination, and subordination for clear expression") },
      { code: "g9-eng-v-01", name: "Vocabulary: Academic Language & Tone", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Academic Language", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g9-eng-v-01", "Vocabulary: Academic Language & Tone", "Acquire and use sophisticated academic language to establish appropriate tone") },
      { code: "g9-eng-v-02", name: "Vocabulary: Etymological Analysis", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Etymology", difficulty: "medium", order: 10, microSkills: makeMicroSkills("g9-eng-v-02", "Vocabulary: Etymological Analysis", "Trace the etymology of words through Latin, Greek, and Anglo-Saxon roots") },
      { code: "g9-eng-sl-01", name: "Speaking & Listening: Debate & Discussion", subject: "english", domain: "Speaking & Listening", category: "Collaboration", subcategory: "Debate", difficulty: "medium", order: 11, microSkills: makeMicroSkills("g9-eng-sl-01", "Speaking & Listening: Debate & Discussion", "Engage in structured debates and discussions using valid reasoning and evidence") },
    ],

    // ── Grade 10 ──
    10: [
      { code: "g10-eng-rl-01", name: "Reading Literature: Critical Perspectives", subject: "english", domain: "Reading Literature", category: "Comprehension", subcategory: "Critical Analysis", difficulty: "hard", order: 1, microSkills: makeMicroSkills("g10-eng-rl-01", "Reading Literature: Critical Perspectives", "Analyze literature from multiple critical perspectives with textual support") },
      { code: "g10-eng-rl-02", name: "Reading Literature: Intertextuality", subject: "english", domain: "Reading Literature", category: "Craft & Structure", subcategory: "Intertextuality", difficulty: "hard", order: 2, microSkills: makeMicroSkills("g10-eng-rl-02", "Reading Literature: Intertextuality", "Analyze intertextual connections and how texts reference or transform earlier works") },
      { code: "g10-eng-ri-01", name: "Reading Informational: Complex Argument Analysis", subject: "english", domain: "Reading Informational", category: "Analysis", subcategory: "Complex Arguments", difficulty: "hard", order: 3, microSkills: makeMicroSkills("g10-eng-ri-01", "Reading Informational: Complex Argument Analysis", "Analyze complex arguments with multiple claims, sub-arguments, and evidence types") },
      { code: "g10-eng-ri-02", name: "Reading Informational: Synthesis of Sources", subject: "english", domain: "Reading Informational", category: "Synthesis", subcategory: "Multi-Source Synthesis", difficulty: "hard", order: 4, microSkills: makeMicroSkills("g10-eng-ri-02", "Reading Informational: Synthesis of Sources", "Synthesize multiple authoritative sources to support complex arguments and research") },
      { code: "g10-eng-w-01", name: "Writing: Research & MLA/APA Citation", subject: "english", domain: "Writing", category: "Research Writing", subcategory: "Citation", difficulty: "hard", order: 5, microSkills: makeMicroSkills("g10-eng-w-01", "Writing: Research & MLA/APA Citation", "Write research papers using MLA or APA citation with integrated quotations and paraphrases") },
      { code: "g10-eng-w-02", name: "Writing: Rhetorical Analysis", subject: "english", domain: "Writing", category: "Analytical Writing", subcategory: "Rhetorical Analysis", difficulty: "hard", order: 6, microSkills: makeMicroSkills("g10-eng-w-02", "Writing: Rhetorical Analysis", "Write rhetorical analysis essays examining author's choices, audience, and purpose") },
      { code: "g10-eng-l-01", name: "Grammar: Diction & Syntax for Effect", subject: "english", domain: "Language", category: "Grammar", subcategory: "Rhetorical Grammar", difficulty: "hard", order: 7, microSkills: makeMicroSkills("g10-eng-l-01", "Grammar: Diction & Syntax for Effect", "Analyze and manipulate diction and syntax to achieve specific rhetorical effects") },
      { code: "g10-eng-l-02", name: "Grammar: Consistency & Cohesion", subject: "english", domain: "Language", category: "Grammar", subcategory: "Cohesion", difficulty: "medium", order: 8, microSkills: makeMicroSkills("g10-eng-l-02", "Grammar: Consistency & Cohesion", "Maintain consistency in tense, voice, and style to create cohesive multi-paragraph texts") },
      { code: "g10-eng-v-01", name: "Vocabulary: Domain-Specific & Technical", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Technical Vocabulary", difficulty: "medium", order: 9, microSkills: makeMicroSkills("g10-eng-v-01", "Vocabulary: Domain-Specific & Technical", "Acquire and use domain-specific and technical vocabulary across academic disciplines") },
      { code: "g10-eng-v-02", name: "Vocabulary: Stylistic Word Choice", subject: "english", domain: "Language", category: "Vocabulary", subcategory: "Stylistic Choice", difficulty: "hard", order: 10, microSkills: makeMicroSkills("g10-eng-v-02", "Vocabulary: Stylistic Word Choice", "Analyze and evaluate author's word choices for tone, mood, and rhetorical impact") },
      { code: "g10-eng-sl-01", name: "Speaking & Listening: Research Presentation", subject: "english", domain: "Speaking & Listening", category: "Presentation", subcategory: "Research Presentation", difficulty: "hard", order: 11, microSkills: makeMicroSkills("g10-eng-sl-01", "Speaking & Listening: Research Presentation", "Deliver well-organized research presentations with clear arguments and multimedia support") },
    ],
  }

  for (const config of gradeConfigs) {
    grades.push({
      level: config.level,
      label: config.label,
      skills: gradeSkills[config.level] || [],
    })
  }

  return {
    code: "core-english",
    name: "Core English",
    description: "Grades 3-10 English Language Arts — Reading, Writing, Language",
    grades,
  }
}

function getSATMathProgram(): ProgramDef {
  const skills: SkillDef[] = [
    {
      code: "sat-math-alg-01", name: "Linear Equations in One Variable",
      subject: "math", domain: "Algebra", category: "Linear Equations", subcategory: "Solving", difficulty: "medium", order: 1,
      microSkills: [
        { code: "sat-math-alg-01-basic", name: "Solving Basic Linear Equations", learningObjective: "Solve one-variable linear equations with integer coefficients.", difficulty: "easy", order: 1 },
        { code: "sat-math-alg-01-app", name: "Linear Equations in Context", learningObjective: "Set up and solve linear equations from word problems.", difficulty: "medium", order: 2 },
        { code: "sat-math-alg-01-adv", name: "Equations with Rational Coefficients", learningObjective: "Solve linear equations with fractional and decimal coefficients.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-alg-02", name: "Linear Functions",
      subject: "math", domain: "Algebra", category: "Linear Functions", subcategory: "Graphing", difficulty: "medium", order: 2,
      microSkills: [
        { code: "sat-math-alg-02-basic", name: "Linear Function Concepts", learningObjective: "Understand and interpret linear functions in various forms.", difficulty: "easy", order: 1 },
        { code: "sat-math-alg-02-app", name: "Linear Function Applications", learningObjective: "Model real-world situations using linear functions.", difficulty: "medium", order: 2 },
        { code: "sat-math-alg-02-adv", name: "Graphical Analysis of Linear Functions", learningObjective: "Analyze linear functions from graphs, tables, and equations.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-alg-03", name: "Linear Inequalities",
      subject: "math", domain: "Algebra", category: "Linear Inequalities", subcategory: "Solving", difficulty: "medium", order: 3,
      microSkills: [
        { code: "sat-math-alg-03-basic", name: "Solving Linear Inequalities", learningObjective: "Solve one-variable linear inequalities.", difficulty: "easy", order: 1 },
        { code: "sat-math-alg-03-app", name: "Inequalities in Context", learningObjective: "Interpret and solve inequality word problems.", difficulty: "medium", order: 2 },
        { code: "sat-math-alg-03-adv", name: "Compound Inequalities", learningObjective: "Solve and graph compound inequalities.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-alg-04", name: "Systems of Linear Equations",
      subject: "math", domain: "Algebra", category: "Systems", subcategory: "Linear", difficulty: "hard", order: 4,
      microSkills: [
        { code: "sat-math-alg-04-basic", name: "Solving Systems by Substitution", learningObjective: "Solve systems of equations using substitution.", difficulty: "easy", order: 1 },
        { code: "sat-math-alg-04-app", name: "Solving Systems by Elimination", learningObjective: "Solve systems of equations using elimination.", difficulty: "medium", order: 2 },
        { code: "sat-math-alg-04-adv", name: "Systems in Context", learningObjective: "Set up and solve systems from word problems.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-alg-05", name: "Systems of Linear Inequalities",
      subject: "math", domain: "Algebra", category: "Systems", subcategory: "Inequalities", difficulty: "hard", order: 5,
      microSkills: [
        { code: "sat-math-alg-05-basic", name: "Graphing Linear Inequalities", learningObjective: "Graph linear inequalities in two variables.", difficulty: "easy", order: 1 },
        { code: "sat-math-alg-05-app", name: "Systems of Inequalities", learningObjective: "Graph and interpret systems of linear inequalities.", difficulty: "medium", order: 2 },
        { code: "sat-math-alg-05-adv", name: "Systems of Inequalities Applications", learningObjective: "Model constraints using systems of inequalities.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-adv-01", name: "Equivalent Expressions",
      subject: "math", domain: "Advanced Math", category: "Expressions", subcategory: "Equivalence", difficulty: "medium", order: 6,
      microSkills: [
        { code: "sat-math-adv-01-basic", name: "Basic Expression Manipulation", learningObjective: "Simplify and rewrite algebraic expressions.", difficulty: "easy", order: 1 },
        { code: "sat-math-adv-01-app", name: "Factoring and Expanding", learningObjective: "Factor and expand polynomial expressions.", difficulty: "medium", order: 2 },
        { code: "sat-math-adv-01-adv", name: "Advanced Expression Strategies", learningObjective: "Rewrite complex expressions to reveal structure.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-adv-02", name: "Nonlinear Equations in One Variable",
      subject: "math", domain: "Advanced Math", category: "Equations", subcategory: "Nonlinear", difficulty: "medium", order: 7,
      microSkills: [
        { code: "sat-math-adv-02-basic", name: "Quadratic Equations", learningObjective: "Solve quadratic equations in one variable.", difficulty: "easy", order: 1 },
        { code: "sat-math-adv-02-app", name: "Radical and Rational Equations", learningObjective: "Solve equations involving radicals and rational expressions.", difficulty: "medium", order: 2 },
        { code: "sat-math-adv-02-adv", name: "Higher-Degree Equations", learningObjective: "Solve polynomial equations of degree 3 or higher.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-adv-03", name: "Systems of Nonlinear Equations",
      subject: "math", domain: "Advanced Math", category: "Systems", subcategory: "Nonlinear", difficulty: "hard", order: 8,
      microSkills: [
        { code: "sat-math-adv-03-basic", name: "Linear-Quadratic Systems", learningObjective: "Solve systems with one linear and one quadratic equation.", difficulty: "easy", order: 1 },
        { code: "sat-math-adv-03-app", name: "Quadratic-Quadratic Systems", learningObjective: "Solve systems of two quadratic equations.", difficulty: "medium", order: 2 },
        { code: "sat-math-adv-03-adv", name: "Nonlinear Systems in Context", learningObjective: "Model and solve real-world problems with nonlinear systems.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-adv-04", name: "Quadratic Functions",
      subject: "math", domain: "Advanced Math", category: "Quadratics", subcategory: "Functions", difficulty: "medium", order: 9,
      microSkills: [
        { code: "sat-math-adv-04-basic", name: "Quadratic Function Forms", learningObjective: "Interpret quadratic functions in standard, vertex, and factored forms.", difficulty: "easy", order: 1 },
        { code: "sat-math-adv-04-app", name: "Quadratic Graphs and Features", learningObjective: "Identify key features of quadratic graphs.", difficulty: "medium", order: 2 },
        { code: "sat-math-adv-04-adv", name: "Quadratic Applications", learningObjective: "Model projectile motion and optimization problems.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-adv-05", name: "Exponential Functions",
      subject: "math", domain: "Advanced Math", category: "Exponentials", subcategory: "Functions", difficulty: "medium", order: 10,
      microSkills: [
        { code: "sat-math-adv-05-basic", name: "Exponential Function Concepts", learningObjective: "Evaluate and graph exponential functions.", difficulty: "easy", order: 1 },
        { code: "sat-math-adv-05-app", name: "Exponential Growth and Decay", learningObjective: "Model growth and decay using exponential functions.", difficulty: "medium", order: 2 },
        { code: "sat-math-adv-05-adv", name: "Comparing Exponential and Linear", learningObjective: "Compare and contrast exponential and linear models.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-psda-01", name: "Ratios, Rates & Proportional Relationships",
      subject: "math", domain: "Problem-Solving and Data Analysis", category: "Ratios", subcategory: "Proportionality", difficulty: "medium", order: 11,
      microSkills: [
        { code: "sat-math-psda-01-basic", name: "Ratio and Rate Problems", learningObjective: "Solve problems involving ratios and rates.", difficulty: "easy", order: 1 },
        { code: "sat-math-psda-01-app", name: "Proportional Relationships", learningObjective: "Set up and solve proportions in context.", difficulty: "medium", order: 2 },
        { code: "sat-math-psda-01-adv", name: "Unit Conversions and Scaling", learningObjective: "Use ratios for unit conversions and scale factors.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-psda-02", name: "Percentages",
      subject: "math", domain: "Problem-Solving and Data Analysis", category: "Percentages", subcategory: "Applications", difficulty: "medium", order: 12,
      microSkills: [
        { code: "sat-math-psda-02-basic", name: "Basic Percent Calculations", learningObjective: "Calculate percentages, percent change, and markups.", difficulty: "easy", order: 1 },
        { code: "sat-math-psda-02-app", name: "Percent Word Problems", learningObjective: "Solve percent problems involving tax, tip, discount, and interest.", difficulty: "medium", order: 2 },
        { code: "sat-math-psda-02-adv", name: "Percentages in Data", learningObjective: "Interpret percentages in tables, charts, and surveys.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-psda-03", name: "Data Analysis & Distributions",
      subject: "math", domain: "Problem-Solving and Data Analysis", category: "Data", subcategory: "Analysis", difficulty: "medium", order: 13,
      microSkills: [
        { code: "sat-math-psda-03-basic", name: "Data Representations", learningObjective: "Read and interpret tables, graphs, and charts.", difficulty: "easy", order: 1 },
        { code: "sat-math-psda-03-app", name: "Measures of Center and Spread", learningObjective: "Calculate and interpret mean, median, mode, range, and standard deviation.", difficulty: "medium", order: 2 },
        { code: "sat-math-psda-03-adv", name: "Data Distributions", learningObjective: "Analyze and compare distributions of data sets.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-psda-04", name: "Probability & Conditional Probability",
      subject: "math", domain: "Problem-Solving and Data Analysis", category: "Probability", subcategory: "Conditional", difficulty: "medium", order: 14,
      microSkills: [
        { code: "sat-math-psda-04-basic", name: "Basic Probability", learningObjective: "Calculate simple probabilities of events.", difficulty: "easy", order: 1 },
        { code: "sat-math-psda-04-app", name: "Compound Probability", learningObjective: "Find probabilities of compound events.", difficulty: "medium", order: 2 },
        { code: "sat-math-psda-04-adv", name: "Conditional Probability and Independence", learningObjective: "Calculate conditional probabilities and determine independence.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-psda-05", name: "Statistical Inference & Sampling",
      subject: "math", domain: "Problem-Solving and Data Analysis", category: "Statistics", subcategory: "Inference", difficulty: "hard", order: 15,
      microSkills: [
        { code: "sat-math-psda-05-basic", name: "Sampling Methods", learningObjective: "Identify different sampling methods and their biases.", difficulty: "easy", order: 1 },
        { code: "sat-math-psda-05-app", name: "Drawing Conclusions from Data", learningObjective: "Make inferences about populations from sample data.", difficulty: "medium", order: 2 },
        { code: "sat-math-psda-05-adv", name: "Experimental Design", learningObjective: "Evaluate experimental designs and statistical studies.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-geo-01", name: "Area & Volume",
      subject: "math", domain: "Geometry and Trigonometry", category: "Area & Volume", subcategory: "Formulas", difficulty: "medium", order: 16,
      microSkills: [
        { code: "sat-math-geo-01-basic", name: "Area of 2D Figures", learningObjective: "Calculate areas of triangles, quadrilaterals, and circles.", difficulty: "easy", order: 1 },
        { code: "sat-math-geo-01-app", name: "Volume of 3D Figures", learningObjective: "Calculate volumes of prisms, cylinders, pyramids, cones, and spheres.", difficulty: "medium", order: 2 },
        { code: "sat-math-geo-01-adv", name: "Composite Figures", learningObjective: "Find areas and volumes of composite figures.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-geo-02", name: "Lines, Angles & Triangles",
      subject: "math", domain: "Geometry and Trigonometry", category: "Lines & Angles", subcategory: "Triangles", difficulty: "medium", order: 17,
      microSkills: [
        { code: "sat-math-geo-02-basic", name: "Angle Relationships", learningObjective: "Identify and use angle relationships (parallel lines, transversals).", difficulty: "easy", order: 1 },
        { code: "sat-math-geo-02-app", name: "Triangle Properties", learningObjective: "Apply properties of triangles including congruence and similarity.", difficulty: "medium", order: 2 },
        { code: "sat-math-geo-02-adv", name: "Triangle Theorems", learningObjective: "Use triangle inequality and angle-side relationships.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-geo-03", name: "Right Triangles & Trigonometry",
      subject: "math", domain: "Geometry and Trigonometry", category: "Trigonometry", subcategory: "Right Triangles", difficulty: "medium", order: 18,
      microSkills: [
        { code: "sat-math-geo-03-basic", name: "Pythagorean Theorem", learningObjective: "Apply the Pythagorean theorem to find missing side lengths.", difficulty: "easy", order: 1 },
        { code: "sat-math-geo-03-app", name: "Basic Trig Ratios", learningObjective: "Use sine, cosine, and tangent ratios to solve right triangles.", difficulty: "medium", order: 2 },
        { code: "sat-math-geo-03-adv", name: "Trigonometry Applications", learningObjective: "Solve real-world problems using right triangle trigonometry.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-math-geo-04", name: "Circles",
      subject: "math", domain: "Geometry and Trigonometry", category: "Circles", subcategory: "Properties", difficulty: "medium", order: 19,
      microSkills: [
        { code: "sat-math-geo-04-basic", name: "Circle Basics", learningObjective: "Understand circle terminology and basic properties.", difficulty: "easy", order: 1 },
        { code: "sat-math-geo-04-app", name: "Circle Equations", learningObjective: "Write and interpret equations of circles.", difficulty: "medium", order: 2 },
        { code: "sat-math-geo-04-adv", name: "Circle Theorems", learningObjective: "Apply theorems about circles, arcs, and inscribed angles.", difficulty: "hard", order: 3 },
      ],
    },
  ]

  return {
    code: "sat-math",
    name: "SAT Math",
    description: "Digital SAT Math — Algebra, Advanced Math, PSDA, Geometry & Trigonometry",
    grades: [
      { level: 0, label: "SAT Math", skills },
    ],
  }
}

function getSATRWProgram(): ProgramDef {
  const skills: SkillDef[] = [
    {
      code: "sat-rw-info-01", name: "Central Ideas & Details",
      subject: "reading", domain: "Information and Ideas", category: "Reading Comprehension", subcategory: "Central Ideas", difficulty: "medium", order: 1,
      microSkills: [
        { code: "sat-rw-info-01-basic", name: "Identifying Central Ideas", learningObjective: "Identify the main idea or central theme of a passage.", difficulty: "easy", order: 1 },
        { code: "sat-rw-info-01-app", name: "Supporting Details", learningObjective: "Identify details that support the central idea.", difficulty: "medium", order: 2 },
        { code: "sat-rw-info-01-adv", name: "Summarizing Complex Texts", learningObjective: "Summarize complex passages concisely and accurately.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-info-02", name: "Inferences",
      subject: "reading", domain: "Information and Ideas", category: "Reading Comprehension", subcategory: "Inferences", difficulty: "medium", order: 2,
      microSkills: [
        { code: "sat-rw-info-02-basic", name: "Simple Inferences", learningObjective: "Draw basic inferences from stated information.", difficulty: "easy", order: 1 },
        { code: "sat-rw-info-02-app", name: "Complex Inferences", learningObjective: "Make inferences from implicit information and tone.", difficulty: "medium", order: 2 },
        { code: "sat-rw-info-02-adv", name: "Evidence-Based Inferences", learningObjective: "Support inferences with specific textual evidence.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-info-03", name: "Command of Evidence",
      subject: "reading", domain: "Information and Ideas", category: "Reading Comprehension", subcategory: "Evidence", difficulty: "medium", order: 3,
      microSkills: [
        { code: "sat-rw-info-03-basic", name: "Textual Evidence", learningObjective: "Identify the best textual evidence for a claim.", difficulty: "easy", order: 1 },
        { code: "sat-rw-info-03-app", name: "Quantitative Evidence", learningObjective: "Interpret data from tables, graphs, and charts.", difficulty: "medium", order: 2 },
        { code: "sat-rw-info-03-adv", name: "Integrated Evidence", learningObjective: "Combine textual and quantitative evidence to support a conclusion.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-craft-01", name: "Words in Context",
      subject: "reading", domain: "Craft and Structure", category: "Vocabulary", subcategory: "Context Clues", difficulty: "medium", order: 4,
      microSkills: [
        { code: "sat-rw-craft-01-basic", name: "High-Frequency Academic Vocabulary", learningObjective: "Determine the meaning of common academic words in context.", difficulty: "easy", order: 1 },
        { code: "sat-rw-craft-01-app", name: "Contextual Meaning", learningObjective: "Use context clues to determine word meaning.", difficulty: "medium", order: 2 },
        { code: "sat-rw-craft-01-adv", name: "Nuanced Word Meanings", learningObjective: "Distinguish between subtle shades of meaning in context.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-craft-02", name: "Text Structure & Purpose",
      subject: "reading", domain: "Craft and Structure", category: "Text Analysis", subcategory: "Structure", difficulty: "medium", order: 5,
      microSkills: [
        { code: "sat-rw-craft-02-basic", name: "Identifying Text Structure", learningObjective: "Identify the overall structure of a passage.", difficulty: "easy", order: 1 },
        { code: "sat-rw-craft-02-app", name: "Analyzing Purpose", learningObjective: "Determine the author's purpose for a passage or section.", difficulty: "medium", order: 2 },
        { code: "sat-rw-craft-02-adv", name: "Rhetorical Analysis", learningObjective: "Analyze how structure contributes to meaning and effect.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-craft-03", name: "Cross-Text Connections",
      subject: "reading", domain: "Craft and Structure", category: "Text Analysis", subcategory: "Cross-Text", difficulty: "hard", order: 6,
      microSkills: [
        { code: "sat-rw-craft-03-basic", name: "Compare Two Texts", learningObjective: "Identify similarities and differences between two passages.", difficulty: "easy", order: 1 },
        { code: "sat-rw-craft-03-app", name: "Analyzing Perspectives", learningObjective: "Analyze how authors with different perspectives address the same topic.", difficulty: "medium", order: 2 },
        { code: "sat-rw-craft-03-adv", name: "Synthesizing Multiple Texts", learningObjective: "Synthesize information from multiple texts to answer questions.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-expr-01", name: "Transitions",
      subject: "writing", domain: "Expression of Ideas", category: "Writing", subcategory: "Transitions", difficulty: "medium", order: 7,
      microSkills: [
        { code: "sat-rw-expr-01-basic", name: "Basic Transition Words", learningObjective: "Select appropriate transition words to connect ideas.", difficulty: "easy", order: 1 },
        { code: "sat-rw-expr-01-app", name: "Transition Logic", learningObjective: "Choose transitions that reflect logical relationships.", difficulty: "medium", order: 2 },
        { code: "sat-rw-expr-01-adv", name: "Strategic Transitions", learningObjective: "Use transitions to improve coherence and flow in complex passages.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-expr-02", name: "Rhetorical Synthesis",
      subject: "writing", domain: "Expression of Ideas", category: "Writing", subcategory: "Synthesis", difficulty: "hard", order: 8,
      microSkills: [
        { code: "sat-rw-expr-02-basic", name: "Combining Sentences", learningObjective: "Combine sentences effectively for clarity and concision.", difficulty: "easy", order: 1 },
        { code: "sat-rw-expr-02-app", name: "Rhetorical Purpose", learningObjective: "Select text that best achieves a specific rhetorical goal.", difficulty: "medium", order: 2 },
        { code: "sat-rw-expr-02-adv", name: "Complex Synthesis", learningObjective: "Synthesize information from multiple sources in a single text.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-conv-01", name: "Boundaries",
      subject: "writing", domain: "Standard English Conventions", category: "Grammar", subcategory: "Sentence Boundaries", difficulty: "medium", order: 9,
      microSkills: [
        { code: "sat-rw-conv-01-basic", name: "Sentence Fragments", learningObjective: "Identify and correct sentence fragments.", difficulty: "easy", order: 1 },
        { code: "sat-rw-conv-01-app", name: "Run-on Sentences", learningObjective: "Identify and correct run-on sentences and comma splices.", difficulty: "medium", order: 2 },
        { code: "sat-rw-conv-01-adv", name: "Boundary Punctuation", learningObjective: "Use punctuation correctly to mark sentence boundaries.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-conv-02", name: "Form, Structure & Sense",
      subject: "writing", domain: "Standard English Conventions", category: "Grammar", subcategory: "Usage", difficulty: "medium", order: 10,
      microSkills: [
        { code: "sat-rw-conv-02-basic", name: "Subject-Verb Agreement", learningObjective: "Ensure subjects and verbs agree in number and person.", difficulty: "easy", order: 1 },
        { code: "sat-rw-conv-02-app", name: "Pronoun Agreement", learningObjective: "Ensure pronouns agree with their antecedents.", difficulty: "medium", order: 2 },
        { code: "sat-rw-conv-02-adv", name: "Parallel Structure", learningObjective: "Identify and correct errors in parallel structure.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-conv-03", name: "Pronoun-Antecedent Agreement",
      subject: "writing", domain: "Standard English Conventions", category: "Grammar", subcategory: "Pronouns", difficulty: "medium", order: 11,
      microSkills: [
        { code: "sat-rw-conv-03-basic", name: "Pronoun Case", learningObjective: "Use correct pronoun case (subject, object, possessive).", difficulty: "easy", order: 1 },
        { code: "sat-rw-conv-03-app", name: "Pronoun Reference", learningObjective: "Ensure pronouns clearly refer to their antecedents.", difficulty: "medium", order: 2 },
        { code: "sat-rw-conv-03-adv", name: "Ambiguous Pronouns", learningObjective: "Identify and correct ambiguous pronoun references.", difficulty: "hard", order: 3 },
      ],
    },
    {
      code: "sat-rw-conv-04", name: "Verb Tense & Agreement",
      subject: "writing", domain: "Standard English Conventions", category: "Grammar", subcategory: "Verbs", difficulty: "medium", order: 12,
      microSkills: [
        { code: "sat-rw-conv-04-basic", name: "Verb Tense Consistency", learningObjective: "Maintain consistent verb tense within a passage.", difficulty: "easy", order: 1 },
        { code: "sat-rw-conv-04-app", name: "Verb Forms", learningObjective: "Use correct verb forms including irregular verbs.", difficulty: "medium", order: 2 },
        { code: "sat-rw-conv-04-adv", name: "Mood and Voice", learningObjective: "Use correct verb mood and active/passive voice.", difficulty: "hard", order: 3 },
      ],
    },
  ]

  return {
    code: "sat-rw",
    name: "SAT Reading & Writing",
    description: "Digital SAT Reading & Writing — Information & Ideas, Craft & Structure, Expression of Ideas, Conventions",
    grades: [
      { level: 0, label: "SAT Reading & Writing", skills },
    ],
  }
}

// ─── Seed Runner ───

async function seedProgram(tenantId: string, program: ProgramDef) {
  const gradeCount = program.grades.length
  if (gradeCount === 0) {
    console.log(`  ⏭️  ${program.name}: 0 grades (skipping — add grade definitions)`)
    return
  }

  console.log(`\n📦 Program: ${program.name} (${program.code})`)

  const dbProgram = await prisma.program.upsert({
    where: { tenantId_code: { tenantId, code: program.code } },
    create: { tenantId, code: program.code, name: program.name, description: program.description, isActive: true },
    update: { name: program.name, description: program.description },
  })

  let totalSkills = 0
  let totalMicroSkills = 0

  for (const grade of program.grades) {
    if (grade.skills.length === 0) continue

    const dbGrade = await prisma.grade.upsert({
      where: { programId_level: { programId: dbProgram.id, level: grade.level } },
      create: { programId: dbProgram.id, level: grade.level, label: grade.label, order: grade.level },
      update: { label: grade.label },
    })

    for (const skill of grade.skills) {
      const dbSkill = await prisma.skill.upsert({
        where: { gradeId_code: { gradeId: dbGrade.id, code: skill.code } },
        create: {
          gradeId: dbGrade.id,
          code: skill.code,
          name: skill.name,
          subject: skill.subject,
          domain: skill.domain,
          category: skill.category,
          subcategory: skill.subcategory,
          difficulty: skill.difficulty,
          order: skill.order,
          isActive: true,
        },
        update: { name: skill.name, domain: skill.domain, category: skill.category, subcategory: skill.subcategory },
      })
      totalSkills++

      for (const ms of skill.microSkills) {
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
          update: { name: ms.name, learningObjective: ms.learningObjective },
        })
        totalMicroSkills++
      }
    }
  }

  console.log(`  ${gradeCount} grades, ${totalSkills} skills, ${totalMicroSkills} micro-skills`)
}

async function main() {
  console.log("🌱 Seeding Practice Buddy Curriculum...")
  console.log("=".repeat(60))

  // Find the base tenant
  const tenant = await prisma.tenant.findFirst({ where: { slug: "aeeg" } })
  if (!tenant) {
    throw new Error("Tenant 'aeeg' not found. Run `npx tsx prisma/seed.ts` first.")
  }
  console.log(`\n✓ Tenant: ${tenant.name} (${tenant.id})`)

  // Phase 1: SAT Math
  console.log("\n" + "─".repeat(40))
  console.log("PHASE 1: SAT Programs")
  await seedProgram(tenant.id, getSATMathProgram())
  await seedProgram(tenant.id, getSATRWProgram())

  // Phase 2: Core Math (Grades 3-10)
  console.log("\n" + "─".repeat(40))
  console.log("PHASE 2: Core Math (Grades 3-10)")
  await seedProgram(tenant.id, getCoreMathProgram())

  // Phase 3: Core English (Grades 3-10)
  console.log("\n" + "─".repeat(40))
  console.log("PHASE 3: Core English (Grades 3-10)")
  await seedProgram(tenant.id, getCoreEnglishProgram())

  // Phase 4-5: MAP (placeholder — add RIT band definitions)
  console.log("\n" + "─".repeat(40))
  console.log("PHASE 4: MAP Math (RIT 151-280)")
  console.log("  ⏭️  Add MAP RIT band definitions to seedCurriculum()")

  console.log("\n" + "─".repeat(40))
  console.log("PHASE 5: MAP Reading (RIT 151-280)")
  console.log("  ⏭️  Add MAP RIT band definitions to seedCurriculum()")

  // ─── Summary ───
  console.log("\n" + "=".repeat(60))
  const programs = await prisma.program.count()
  const grades = await prisma.grade.count()
  const skills = await prisma.skill.count()
  const microSkills = await prisma.microSkill.count()
  console.log("\n📊 Seed Summary:")
  console.log(`  Programs:      ${programs}`)
  console.log(`  Grades:        ${grades}`)
  console.log(`  Skills:        ${skills}`)
  console.log(`  Micro-Skills:  ${microSkills}`)
  console.log("\n✅ Curriculum seed complete!")
  console.log("   Next: Run `npx tsx prisma/seed-questions.ts` to generate gold questions")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())