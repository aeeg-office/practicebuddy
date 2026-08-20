/**
 * Practice Buddy skill definitions
 *
 * Maps subjects → domains → skills for the practice system.
 * Primary subjects: math, reading, writing, science
 * Legacy subjects (admin backward compat): sat, act, ielts, toefl, english
 */

export type SubjectKey = "math" | "reading" | "writing" | "science" | "sat" | "act" | "ielts" | "toefl" | "english"
export type Difficulty = "easy" | "medium" | "hard"
export type MasteryLevel = "mastered" | "approaching" | "developing" | "beginning" | "not-assessed"

export interface Skill {
  id: string
  name: string
  difficulty: Difficulty
  mastery: MasteryLevel
  questions: number
}

export interface Domain {
  name: string
  skills: Skill[]
}

export interface SubjectData {
  name: string
  domains: Domain[]
}

export interface SubjectMeta {
  key: SubjectKey
  label: string
  icon: string
  color: string
  description: string
}

export const VALID_SUBJECTS: SubjectKey[] = ["math", "reading", "writing", "science"]

/** Legacy subject keys for backward compatibility with admin code */
export const LEGACY_SUBJECTS: SubjectKey[] = ["sat", "act", "ielts", "toefl", "english"]

export const mockSkills: Record<SubjectKey, SubjectData> = {
  math: {
    name: "Math",
    domains: [
      {
        name: "Algebra",
        skills: [
          { id: "g8-math-alg", name: "Linear Equations", difficulty: "medium", mastery: "not-assessed", questions: 0 },
          { id: "sat-alg", name: "Algebra (SAT)", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
      {
        name: "Geometry",
        skills: [
          { id: "g8-math-geo", name: "Geometry Basics", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
      {
        name: "Advanced Math",
        skills: [
          { id: "sat-adv", name: "Advanced Math", difficulty: "hard", mastery: "not-assessed", questions: 0 },
        ],
      },
      {
        name: "Data & Statistics",
        skills: [
          { id: "sat-data", name: "Data Analysis", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
    ],
  },
  reading: {
    name: "Reading",
    domains: [
      {
        name: "Information and Ideas",
        skills: [
          { id: "sat-rw-info", name: "Information and Ideas", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
      {
        name: "Craft and Structure",
        skills: [
          { id: "g8-reading", name: "Reading Comprehension", difficulty: "medium", mastery: "not-assessed", questions: 0 },
          { id: "sat-rw-craft", name: "Craft and Structure", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
    ],
  },
  writing: {
    name: "Writing",
    domains: [
      {
        name: "Grammar",
        skills: [
          { id: "sat-rw-grammar", name: "Standard English Conventions", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
    ],
  },
  science: {
    name: "Science",
    domains: [
      {
        name: "General Science",
        skills: [
          { id: "g8-science", name: "Science Basics", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
    ],
  },
  // ── Legacy backward-compat subjects ──
  sat: {
    name: "SAT",
    domains: [
      {
        name: "Math",
        skills: [
          { id: "sat-math", name: "SAT Math", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
      {
        name: "Reading & Writing",
        skills: [
          { id: "sat-rw", name: "SAT Reading & Writing", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
    ],
  },
  act: {
    name: "ACT",
    domains: [
      {
        name: "General",
        skills: [
          { id: "act-general", name: "ACT Prep", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
    ],
  },
  ielts: {
    name: "IELTS",
    domains: [
      {
        name: "General",
        skills: [
          { id: "ielts-general", name: "IELTS Prep", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
    ],
  },
  toefl: {
    name: "TOEFL",
    domains: [
      {
        name: "General",
        skills: [
          { id: "toefl-general", name: "TOEFL Prep", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
    ],
  },
  english: {
    name: "English",
    domains: [
      {
        name: "General",
        skills: [
          { id: "eng-general", name: "English Language Arts", difficulty: "medium", mastery: "not-assessed", questions: 0 },
        ],
      },
    ],
  },
}

/** Legacy subject list for backward compatibility with old UI code */
export const subjectList: SubjectKey[] = [...VALID_SUBJECTS, ...LEGACY_SUBJECTS]

/** Subject metadata for display (icons, colors, labels) */
export const mockSubjectMeta: Record<SubjectKey, SubjectMeta> = {
  math: { key: "math", label: "Math", icon: "🔢", color: "blue", description: "Algebra, Geometry, Data & Statistics" },
  reading: { key: "reading", label: "Reading", icon: "📖", color: "purple", description: "Reading Comprehension, Craft and Structure" },
  writing: { key: "writing", label: "Writing", icon: "✏️", color: "green", description: "Grammar, Standard English Conventions" },
  science: { key: "science", label: "Science", icon: "🔬", color: "amber", description: "General Science" },
  sat: { key: "sat", label: "SAT", icon: "🎯", color: "red", description: "SAT Math, Reading & Writing" },
  act: { key: "act", label: "ACT", icon: "📝", color: "orange", description: "ACT Prep" },
  ielts: { key: "ielts", label: "IELTS", icon: "🌍", color: "teal", description: "IELTS Prep" },
  toefl: { key: "toefl", label: "TOEFL", icon: "🗽", color: "cyan", description: "TOEFL Prep" },
  english: { key: "english", label: "English", icon: "📖", color: "pink", description: "English Language Arts" },
}

/** Get total skill count across all subjects (or a specific subject) */
export function getTotalSkillCount(subject?: SubjectKey): number {
  if (subject) {
    return mockSkills[subject].domains.reduce((sum, d) => sum + d.skills.length, 0)
  }
  return Object.values(mockSkills).reduce(
    (total, subject) => total + subject.domains.reduce((sum, d) => sum + d.skills.length, 0),
    0
  )
}