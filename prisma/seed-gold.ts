/**
 * Practice Buddy — Gold Question Seeder (v2, hash-fixed)
 *
 * Ensures exactly 10 certified gold questions per Core Math micro-skill.
 * Uses microSkillId in hash to prevent cross-micro-skill collisions.
 *
 * Run: npx tsx prisma/seed-gold.ts
 */

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as crypto from "crypto"

const connectionString = process.env.DATABASE_URL || "postgresql://practice_buddy:practice_buddy_dev@localhost:5432/practice_buddy"
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

// ════════════════════════════════════════════════════════════════
// RANDOM HELPERS
// ════════════════════════════════════════════════════════════════

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

function shuffle<T>(rng: () => number, arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ════════════════════════════════════════════════════════════════
// QUESTION GENERATORS — unique per (seed, difficulty, index)
// ════════════════════════════════════════════════════════════════

type Difficulty = "easy" | "medium" | "hard"
type GeneratedQ = {
  stem: string
  options: string
  correctAnswer: string
  explanation: string
  difficulty: Difficulty
}

const DIFFICULTIES: Difficulty[] = ["easy", "easy", "easy", "medium", "medium", "medium", "medium", "hard", "hard", "hard"]

// Each generator receives (rng, difficulty) and returns a GeneratedQ
type Generator = (rng: () => number, difficulty: Difficulty) => GeneratedQ

// ── 1. Number & Operations ──
const numberOpsGens: Generator[] = [
  (rng, diff) => {
    const n = randInt(rng, 100, 9999)
    const s = String(n)
    const di = randInt(rng, 0, s.length - 1)
    const digit = parseInt(s[di])
    const pn = ["ones", "tens", "hundreds", "thousands"]
    const place = pn[s.length - 1 - di]
    const val = digit * Math.pow(10, s.length - 1 - di)
    const opts = shuffle(rng, [val, val - 1, val + 10, val * 2].filter(v => v > 0)).slice(0, 4)
    return {
      stem: `What is the value of the digit ${digit} in ${n.toLocaleString()}?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(val),
      explanation: `The digit ${digit} is in the ${place} place → value = ${val}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 12, 99)
    const b = randInt(rng, 2, 12)
    const op = pick(rng, ["+", "-", "×"])
    const correct = op === "+" ? a + b : op === "-" ? a - b : a * b
    const sym = op
    const wrongs = shuffle(rng, [correct + 1, correct - 1, correct + 10, correct - 10].filter(v => v > 0 && v !== correct)).slice(0, 3)
    const opts = shuffle(rng, [correct, ...wrongs])
    return {
      stem: `What is ${a} ${sym} ${b}?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(correct),
      explanation: `${a} ${sym} ${b} = ${correct}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const num = randInt(rng, 1, 9)
    const den = pick(rng, [2, 3, 4, 5, 6, 8, 10, 12])
    const factor = randInt(rng, 2, 5)
    const eqNum = num * factor
    const eqDen = den * factor
    const correct = `${num}/${den}`
    const wrongs = shuffle(rng, [`${num+1}/${den}`, `${num}/${den+1}`, `${num}/${den-1}`, `${Math.max(1,num-1)}/${den}`].filter(w => {
      const [n, d] = w.split("/").map(Number); return n > 0 && d > 0 && w !== correct
    })).slice(0, 3)
    return {
      stem: `Which fraction is equivalent to ${eqNum}/${eqDen}?`,
      options: JSON.stringify([correct, ...wrongs].sort(() => rng() - 0.5).map((v, i) => ({ id: String.fromCharCode(65 + i), text: v }))),
      correctAnswer: correct,
      explanation: `Simplify: divide numerator and denominator by ${factor} → ${correct}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 10, 99)
    const b = randInt(rng, 10, 99)
    const correct = a + b
    const wrongs = shuffle(rng, [correct + 1, correct - 1, a - b, b - a].filter(v => v !== correct && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [correct, ...wrongs])
    return {
      stem: `What is ${a} + ${b}?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(correct),
      explanation: `${a} + ${b} = ${correct}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 2, 12)
    const b = randInt(rng, 3, 12)
    const correct = a * b
    const wrongs = shuffle(rng, [correct + a, correct - a, correct + b, correct - b, a + b].filter(v => v !== correct && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [correct, ...wrongs])
    return {
      stem: `What is ${a} × ${b}?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(correct),
      explanation: `${a} × ${b} = ${correct}.`,
      difficulty: diff,
    }
  },
]

// ── 2. Expressions & Equations ──
const exprEqGens: Generator[] = [
  (rng, diff) => {
    const a = randInt(rng, 2, 12)
    const b = randInt(rng, 2, 15)
    const x = randInt(rng, 2, 12)
    const c = a * x + b
    const wrongs = shuffle(rng, [x + 1, x - 1, x + a, c].filter(v => v !== x && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [x, ...wrongs])
    return {
      stem: `If ${a}x + ${b} = ${c}, what is x?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(x),
      explanation: `Subtract ${b}: ${a}x = ${c - b}. Divide by ${a}: x = ${x}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 2, 5)
    const b = randInt(rng, 1, 6)
    const x = randInt(rng, 3, 10)
    const c = a * (x - b)
    const wrongs = shuffle(rng, [x + 1, x - 1, b, x - b].filter(v => v !== x && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [x, ...wrongs])
    return {
      stem: `Solve: ${a}(x - ${b}) = ${c}`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(x),
      explanation: `Expand: ${a}x - ${a * b} = ${c}. Add ${a * b}: ${a}x = ${a * x}. Divide by ${a}: x = ${x}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 2, 6)
    const b = randInt(rng, 1, 8)
    const x = randInt(rng, 2, 8)
    const c = a * x + b
    const wrongs = shuffle(rng, [x * a, c - b, x + 1, x * b].filter(v => v !== x && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [x, ...wrongs])
    return {
      stem: `If f(x) = ${a}x + ${b}, find x when f(x) = ${c}.`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(x),
      explanation: `Set ${a}x + ${b} = ${c}. Subtract ${b}: ${a}x = ${c - b}. Divide: x = ${x}.`,
      difficulty: diff,
    }
  },
]

// ── 3. Geometry ──
const geometryGens: Generator[] = [
  (rng, diff) => {
    const l = randInt(rng, 3, 15)
    const w = randInt(rng, 2, 12)
    const area = l * w
    const wrongs = shuffle(rng, [l + w, 2 * (l + w), area + 1, area - 1, area * 2].filter(v => v !== area && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [area, ...wrongs])
    return {
      stem: `A rectangle has length ${l} and width ${w}. What is its area?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: `${v} sq units` }))),
      correctAnswer: String(area),
      explanation: `Area = ${l} × ${w} = ${area} square units.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const r = randInt(rng, 2, 10)
    const area = Math.round(Math.PI * r * r * 100) / 100
    const wrongs = shuffle(rng, [
      Math.round(Math.PI * r * 100) / 100,
      Math.round(2 * Math.PI * r * 100) / 100,
      r * r,
      Math.round(Math.PI * r * r * 2 * 100) / 100,
    ].filter(v => v !== area && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [area, ...wrongs])
    return {
      stem: `A circle has radius ${r}. What is its area? (π ≈ 3.14)`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(area),
      explanation: `Area = πr² = 3.14 × ${r}² = 3.14 × ${r * r} = ${area}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 3, 12)
    const b = randInt(rng, 3, 12)
    const cSq = a * a + b * b
    const c = Math.round(Math.sqrt(cSq) * 100) / 100
    const wrongs = shuffle(rng, [a + b, Math.round(Math.sqrt(cSq + 1) * 100) / 100, a * b].filter(v => v !== c && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [c, ...wrongs])
    return {
      stem: `A right triangle has legs ${a} and ${b}. Find the hypotenuse.`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(c),
      explanation: `By Pythagoras: c² = ${a}² + ${b}² = ${cSq} → c = √${cSq} = ${c}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const l = randInt(rng, 2, 10)
    const w = randInt(rng, 2, 8)
    const h = randInt(rng, 2, 6)
    const vol = l * w * h
    const wrongs = shuffle(rng, [l + w + h, 2 * (l * w + w * h + l * h), l * w + h, vol + 1].filter(v => v !== vol && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [vol, ...wrongs])
    return {
      stem: `A rectangular prism has dimensions ${l} × ${w} × ${h}. What is its volume?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) + " cubic units" }))),
      correctAnswer: String(vol),
      explanation: `Volume = ${l} × ${w} × ${h} = ${vol} cubic units.`,
      difficulty: diff,
    }
  },
]

// ── 4. Measurement & Data ──
const measureGens: Generator[] = [
  (rng, diff) => {
    const cm = randInt(rng, 50, 500)
    const m = cm / 100
    const wrongs = shuffle(rng, [cm * 100, cm, cm / 1000, cm * 10].filter(v => v !== m && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [m, ...wrongs])
    return {
      stem: `Convert ${cm} centimeters to meters.`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) + " m" }))),
      correctAnswer: String(m),
      explanation: `${cm} ÷ 100 = ${m} m (100 cm = 1 m).`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const vals = Array.from({ length: 5 }, () => randInt(rng, 10, 100))
    const sum = vals.reduce((a, b) => a + b, 0)
    const mean = Math.round((sum / vals.length) * 100) / 100
    const wrongs = shuffle(rng, [Math.round((sum + 5) / vals.length * 100) / 100, Math.round((sum - 5) / vals.length * 100) / 100, sum, Math.round(sum / (vals.length + 1) * 100) / 100].filter(v => v !== mean && v > 0)).slice(0, 3)
    return {
      stem: `Find the mean: ${vals.join(", ")}.`,
      options: JSON.stringify([mean, ...wrongs].sort(() => rng() - 0.5).map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(mean),
      explanation: `Sum = ${sum}, count = ${vals.length}, mean = ${sum} ÷ ${vals.length} = ${mean}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const hrs = randInt(rng, 60, 300)
    const h = Math.floor(hrs / 60)
    const m = hrs % 60
    const correct = `${h}h ${m}m`
    const wrongs = [`${h + 1}h ${m}m`, `${h}h ${m + 1}m`, `${Math.floor(hrs / 100)}h ${hrs % 100}m`, `${h - 1}h ${m}m`]
    const opts = shuffle(rng, [correct, ...wrongs.slice(0, 3)])
    return {
      stem: `Convert ${hrs} minutes to hours and minutes.`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: v }))),
      correctAnswer: correct,
      explanation: `${hrs} ÷ 60 = ${h} R${m} → ${correct}.`,
      difficulty: diff,
    }
  },
]

// ── 5. Statistics & Probability ──
const statsGens: Generator[] = [
  (rng, diff) => {
    const n = 7
    const vals = Array.from({ length: n }, () => randInt(rng, 5, 50)).sort((a, b) => a - b)
    const median = vals[Math.floor(n / 2)]
    const wrongs = shuffle(rng, [vals[0], vals[n - 1], Math.round(vals.reduce((a, b) => a + b, 0) / n)].filter(v => v !== median)).slice(0, 3)
    const opts = shuffle(rng, [median, ...wrongs])
    return {
      stem: `Find the median: ${vals.join(", ")}.`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(median),
      explanation: `Sorted: ${vals.join(", ")}. Middle (4th of 7) = ${median}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const f = randInt(rng, 1, 5)
    const t = randInt(rng, 6, 15)
    const frac = `${f}/${t}`
    const wrongs = shuffle(rng, [`${t}/${f}`, `${f + 1}/${t}`, `${f}/${t + 1}`].filter(w => w !== frac)).slice(0, 3)
    const opts = shuffle(rng, [frac, ...wrongs])
    return {
      stem: `A bag has ${t} marbles (${f} red, rest blue). Probability of drawing a red marble?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: v }))),
      correctAnswer: frac,
      explanation: `P(red) = ${f}/${t}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const vals = Array.from({ length: 6 }, () => randInt(rng, 5, 40)).sort((a, b) => a - b)
    const mode = pick(rng, vals)
    const wrongs = shuffle(rng, vals.filter(v => v !== mode)).slice(0, 3)
    const opts = shuffle(rng, [mode, ...wrongs])
    return {
      stem: `What is the mode of: ${vals.join(", ")}?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(mode),
      explanation: `The mode (most frequent value) is ${mode}.`,
      difficulty: diff,
    }
  },
]

// ── 6. Operations & Algebraic Thinking ──
const oaGens: Generator[] = [
  (rng, diff) => {
    const a = randInt(rng, 3, 12)
    const b = randInt(rng, 2, 9)
    const p = a * b
    const wrongs = shuffle(rng, [p - 1, p + 1, a + b, a * (b + 1)].filter(v => v !== p && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [p, ...wrongs])
    return {
      stem: `${a} × ${b} = ?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(p),
      explanation: `${a} × ${b} = ${p}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const start = randInt(rng, 2, 10)
    const step = randInt(rng, 2, 6)
    const terms = Array.from({ length: 4 }, (_, i) => start + i * step)
    const next = terms[terms.length - 1] + step
    const wrongs = shuffle(rng, [next + 1, next - 1, terms[0], terms[1]].filter(v => v !== next && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [next, ...wrongs])
    return {
      stem: `Find the next term: ${terms.join(", ")}, ___.`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(next),
      explanation: `Add ${step} each time. Next: ${terms[terms.length - 1]} + ${step} = ${next}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 2, 8)
    const b = randInt(rng, 3, 12)
    const x = randInt(rng, 2, 10)
    const c = a * x
    const wrongs = shuffle(rng, [x + 1, x - 1, a, c].filter(v => v !== x && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [x, ...wrongs])
    return {
      stem: `If ${a}x = ${c}, what is x?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(x),
      explanation: `x = ${c} ÷ ${a} = ${x}.`,
      difficulty: diff,
    }
  },
]

// ── 7. Algebra ──
const algebraGens: Generator[] = [
  (rng, diff) => {
    const m = randInt(rng, 2, 5)
    const b = randInt(rng, 1, 10)
    const x = randInt(rng, 2, 8)
    const y = m * x + b
    const wrongs = shuffle(rng, [y + 1, y - 1, m * x, y + m].filter(v => v !== y && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [y, ...wrongs])
    return {
      stem: `If f(x) = ${m}x + ${b}, find f(${x}).`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(y),
      explanation: `f(${x}) = ${m}(${x}) + ${b} = ${m * x} + ${b} = ${y}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 2, 4)
    const b = randInt(rng, -4, 4)
    const x = randInt(rng, 1, 6)
    const y = a * x + b
    const wrongs = shuffle(rng, [y + 1, y - 1, a * x, b].filter(v => v !== y)).slice(0, 3)
    const opts = shuffle(rng, [y, ...wrongs])
    return {
      stem: `Point (${x}, y) lies on the line y = ${a}x ${b >= 0 ? "+" : ""} ${b}. Find y.`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(y),
      explanation: `y = ${a}(${x}) ${b >= 0 ? "+" : ""} ${b} = ${a * x} ${b >= 0 ? "+" : ""} ${b} = ${y}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 2, 4)
    const b = randInt(rng, 1, 4)
    const c = randInt(rng, 1, 4)
    const x = randInt(rng, 1, 5)
    const y = a * x + b
    const z = c * x + b
    const wrongs = shuffle(rng, [y + z, y - z, z - y, x].filter(v => v !== z)).slice(0, 3)
    const opts = shuffle(rng, [z, ...wrongs])
    return {
      stem: `If f(x) = ${a}x + ${b} and g(x) = ${c}x + ${b}, find g(${x}).`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(z),
      explanation: `g(${x}) = ${c}(${x}) + ${b} = ${c * x} + ${b} = ${z}.`,
      difficulty: diff,
    }
  },
]

// ── 8. Functions ──
const funcGens: Generator[] = [
  (rng, diff) => {
    const k = randInt(rng, 2, 6)
    const x = randInt(rng, 2, 8)
    const y = k * x
    const wrongs = shuffle(rng, [y + 1, y - 1, k + x, x / k].filter(v => v !== y && v > 0 && Number.isInteger(v))).slice(0, 3)
    const opts = shuffle(rng, [y, ...wrongs])
    return {
      stem: `y varies directly as x. When x = ${randInt(rng, 2, 5)}, y = ${k * randInt(rng, 2, 5)}. Find y when x = ${x}.`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(y),
      explanation: `k = ${k}. y = ${k} × ${x} = ${y}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const init = randInt(rng, 10, 100)
    const rate = randInt(rng, 5, 25)
    const x = randInt(rng, 2, 6)
    const y = init + rate * x
    const wrongs = shuffle(rng, [init + rate * (x - 1), init * rate * x, init * (1 + rate / 100) ** x].filter(v => Math.abs(v - y) > 0.01 && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [y, ...wrongs])
    return {
      stem: `Linear function: initial value ${init}, increases by ${rate}/unit. Value at ${x}?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(Math.round(v)) }))),
      correctAnswer: String(y),
      explanation: `f(${x}) = ${init} + ${rate}(${x}) = ${y}.`,
      difficulty: diff,
    }
  },
]

// ── 9. Number Systems ──
const numSysGens: Generator[] = [
  (rng, diff) => {
    const a = randInt(rng, -10, -2)
    const b = randInt(rng, 2, 10)
    const correct = a + b
    const wrongs = shuffle(rng, [a - b, b - a, -(a + b), a * b].filter(v => v !== correct)).slice(0, 3)
    const opts = shuffle(rng, [correct, ...wrongs])
    return {
      stem: `${a} + ${b} = ?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(correct),
      explanation: `${a} + ${b} = ${correct}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 2, 10)
    const b = randInt(rng, 2, 5)
    const correct = Math.pow(a, b)
    const wrongs = shuffle(rng, [a * b, Math.pow(a + 1, b), Math.pow(a, b + 1)].filter(v => v !== correct)).slice(0, 3)
    const opts = shuffle(rng, [correct, ...wrongs])
    return {
      stem: `${a}^${b} = ?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(correct),
      explanation: `${a}^${b} = ${Array.from({length: b}, () => String(a)).join(" × ")} = ${correct}.`,
      difficulty: diff,
    }
  },
]

// ── 10. Ratios, Proportions & Algebra ──
const rpaGens: Generator[] = [
  (rng, diff) => {
    const pct = pick(rng, [10, 15, 20, 25, 30, 50])
    const whole = randInt(rng, 20, 200)
    const part = Math.round(whole * pct / 100)
    const wrongs = shuffle(rng, [whole - part, part + 5, Math.round(whole * (100 - pct) / 100)].filter(v => v !== part && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [part, ...wrongs])
    return {
      stem: `What is ${pct}% of ${whole}?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(part),
      explanation: `${pct}% of ${whole} = ${pct}/100 × ${whole} = ${part}.`,
      difficulty: diff,
    }
  },
  (rng, diff) => {
    const a = randInt(rng, 2, 8)
    const b = randInt(rng, 2, 9)
    const factor = randInt(rng, 2, 5)
    const correct = `${a * factor}:${b * factor}`
    const wrongs = shuffle(rng, [`${a*factor+1}:${b*factor}`, `${a*factor}:${b*factor+1}`, `${a}:${b*factor}`].filter(w => w !== correct)).slice(0, 3)
    const opts = shuffle(rng, [correct, ...wrongs])
    return {
      stem: `Which ratio is equivalent to ${a}:${b}?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: v }))),
      correctAnswer: correct,
      explanation: `Multiply both parts by ${factor}: ${a*factor}:${b*factor}.`,
      difficulty: diff,
    }
  },
]

// ── 11. Ratios & Proportions ──
const ratioGens: Generator[] = [
  (rng, diff) => {
    const a = randInt(rng, 1, 6)
    const b = randInt(rng, 2, 8)
    const x = randInt(rng, 2, 10)
    const y = Math.round((a * x) / b)
    const wrongs = shuffle(rng, [y + 1, y - 1, x * a, x * b].filter(v => v !== y && v > 0)).slice(0, 3)
    const opts = shuffle(rng, [y, ...wrongs])
    return {
      stem: `Solve: ${a}/${b} = ${x}/n. What is n?`,
      options: JSON.stringify(opts.map((v, i) => ({ id: String.fromCharCode(65 + i), text: String(v) }))),
      correctAnswer: String(y),
      explanation: `Cross-multiply: ${a}n = ${b}×${x} → n = ${b * x}÷${a} = ${y}.`,
      difficulty: diff,
    }
  },
]

// ════════════════════════════════════════════════════════════════
// DOMAIN MAPPING
// ════════════════════════════════════════════════════════════════

const domainGenMap: Record<string, Generator[]> = {
  "Number & Operations": numberOpsGens,
  "Expressions & Equations": exprEqGens,
  "Geometry": geometryGens,
  "Measurement & Data": measureGens,
  "Statistics & Probability": statsGens,
  "Operations & Algebraic Thinking": oaGens,
  "Algebra": algebraGens,
  "Functions": funcGens,
  "Number Systems": numSysGens,
  "Ratios, Proportions & Algebra": rpaGens,
  "Ratios & Proportions": ratioGens,
}

const fallbackGens: Generator[] = numberOpsGens

// ════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════

async function main() {
  console.log("📝 Seeding Gold Questions (v2 — hash-fixed)")
  console.log("=".repeat(60))

  const tenant = await prisma.tenant.findFirst({ where: { slug: "aeeg" } })
  if (!tenant) throw new Error("Tenant not found. Run seed.ts first.")
  const program = await prisma.program.findFirst({ where: { code: "core-math" } })
  if (!program) throw new Error("core-math program not found.")

  // Load all core-math micro-skills
  const microSkills = await prisma.microSkill.findMany({
    where: { skill: { grade: { programId: program.id } } },
    include: { skill: true },
    orderBy: [{ skill: { code: "asc" } }, { order: "asc" }],
  })
  console.log(`\nLoaded ${microSkills.length} core-math micro-skills`)

  let totalGq = 0
  let totalFam = 0
  let totalQ = 0
  let totalV = 0

  for (const ms of microSkills) {
    const skill = ms.skill
    const existing = await prisma.goldQuestion.findMany({ where: { microSkillId: ms.id } })
    const existingCount = existing.length
    const needed = 10 - existingCount
    if (needed <= 0) continue

    // Seeded RNG unique per micro-skill
    const seedBase = ms.code.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
    const generators = domainGenMap[skill.domain] || fallbackGens
    const difficulties = [...DIFFICULTIES]

    // Remove difficulties already covered
    const coveredDiffs: Record<string, number> = {}
    for (const e of existing) {
      coveredDiffs[e.difficulty] = (coveredDiffs[e.difficulty] || 0) + 1
    }

    // Generate questions prioritizing missing difficulties
    const qsToCreate: GeneratedQ[] = []
    const diffPool: Difficulty[] = []
    for (const d of ["easy", "medium", "hard"] as Difficulty[]) {
      const have = coveredDiffs[d] || 0
      const want = d === "easy" ? 3 : d === "medium" ? 4 : 3
      for (let i = 0; i < want - have; i++) diffPool.push(d)
    }

    while (qsToCreate.length < needed && diffPool.length > 0) {
      const diff = diffPool.shift()!
      const idx = qsToCreate.length
      const rng = seededRand(seedBase * 1000 + idx * 7 + 13)
      const gen = generators[idx % generators.length]
      const q = gen(rng, diff)

      // Include ms.code + diff in hash to avoid cross-ms collisions
      const hash = crypto.createHash("sha256")
        .update(ms.code + "|" + q.stem + "|" + q.correctAnswer + "|" + diff)
        .digest("hex")

      // Check if this exact hash already exists (from a prior run)
      const exists = await prisma.goldQuestion.findUnique({ where: { hash } })
      if (exists) continue // skip duplicate

      qsToCreate.push(q)
    }

    // --- Upsert gold questions ---
    for (let i = 0; i < qsToCreate.length; i++) {
      const q = qsToCreate[i]
      const rng = seededRand(seedBase * 1000 + (existingCount + i) * 7 + 13)

      // Re-derive hash the same way
      const hash = crypto.createHash("sha256")
        .update(ms.code + "|" + q.stem + "|" + q.correctAnswer + "|" + q.difficulty)
        .digest("hex")

      // GoldQuestion
      const gold = await prisma.goldQuestion.upsert({
        where: { hash },
        update: { goldStatus: "certified" },
        create: {
          tenantId: tenant.id,
          microSkillId: ms.id,
          subject: "math",
          domain: skill.domain,
          category: skill.category || undefined,
          subcategory: skill.subcategory || undefined,
          difficulty: q.difficulty,
          format: "multiple-choice",
          stem: q.stem,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          hash,
          goldStatus: "certified",
          skillCode: skill.code,
        },
      })
      totalGq++

      // QuestionFamily
      const familyName = `${ms.code}-${skill.domain.substring(0, 3).toUpperCase()}`
      let family = await prisma.questionFamily.findFirst({ where: { name: familyName, goldQuestionId: gold.id } })
      if (!family) {
        family = await prisma.questionFamily.create({
          data: {
            tenantId: tenant.id,
            goldQuestionId: gold.id,
            name: familyName,
            difficulty: q.difficulty,
            variationCount: 3,
          },
        })
        totalFam++
      }

      // 3 Question variations
      for (let vIdx = 0; vIdx < 3; vIdx++) {
        const qHash = crypto.createHash("sha256")
          .update(ms.code + "|" + q.stem + "|" + q.correctAnswer + "|" + q.difficulty + "|q" + vIdx)
          .digest("hex")
        const existingQ = await prisma.question.findFirst({ where: { hash: qHash } })
        if (!existingQ) {
          const question = await prisma.question.create({
            data: {
              tenantId: tenant.id,
              goldQuestionId: gold.id,
              familyId: family.id,
              skillId: skill.id,
              microSkillId: ms.id,
              programId: program.id,
              subject: "math",
              domain: skill.domain,
              category: skill.category || undefined,
              subcategory: skill.subcategory || undefined,
              difficulty: q.difficulty,
              format: "multiple-choice",
              stem: q.stem + (vIdx > 0 ? ` (Variant ${vIdx + 1})` : ""),
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              hash: qHash,
              qualityStatus: "published",
              isActive: true,
              questionStatus: "active",
              version: 1,
            },
          })
          totalQ++

          // QuestionVersion
          const vHash = crypto.createHash("sha256")
            .update(question.stem + question.correctAnswer)
            .digest("hex")
          await prisma.questionVersion.create({
            data: {
              tenantId: tenant.id,
              questionId: question.id,
              versionNumber: 1,
              stem: question.stem,
              options: question.options,
              correctAnswer: question.correctAnswer,
              explanation: question.explanation,
              questionType: "multiple-choice",
              difficulty: q.difficulty,
              format: "multiple-choice",
              contentHash: vHash,
              qualityStatus: "published",
              publishedAt: new Date(),
            },
          })
          totalV++
        }
      }
    }

    if (totalGq % 100 === 0) {
      console.log(`  ${ms.code.padEnd(35)} → +${qsToCreate.length} gq (total created: ${totalGq})`)
    }
  }

  // Final summary
  console.log(`\n✅ Seed complete!`)
  console.log(`  GoldQuestions seeded:    ${totalGq}`)
  console.log(`  QuestionFamilies seeded: ${totalFam}`)
  console.log(`  Questions seeded:        ${totalQ}`)
  console.log(`  QuestionVersions seeded: ${totalV}`)

  // Verify
  const finalGq = await prisma.goldQuestion.count({ where: { microSkill: { skill: { grade: { programId: program.id } } } } })
  const msAt10 = await prisma.microSkill.count({
    where: { skill: { grade: { programId: program.id } }, goldQuestions: { some: {} } },
  })
  console.log(`  Final core-math gold questions: ${finalGq}`)
  console.log(`  Core-math micro-skills with any gold questions: ${msAt10}`)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())