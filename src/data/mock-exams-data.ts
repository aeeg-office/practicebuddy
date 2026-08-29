// Mock Examination Data
// 5 mock exams per subject — SAT, ACT, IELTS, TOEFL
// ⚠️ DEMO/PREVIEW ONLY: These are static catalog entries. Questions are drawn
// from hardcoded data files (SAT only) or return empty (ACT/IELTS/TOEFL).
// No DB backing exists yet — exams table is empty (0 rows).
// Set `live: true` only after wiring to a real question bank.

export interface MockExam {
  id: string
  name: string
  description: string
  duration: number // minutes
  sections: { id: string; name: string; questionCount: number; timeLimit: number }[]
  difficulty: "Easy" | "Medium" | "Hard"
  subject: "sat" | "act" | "ielts" | "toefl"
  active: boolean
  /** Whether this exam is backed by real DB question data. false = static demo only. */
  live: boolean
}

export const mockExams: Record<string, MockExam[]> = {
  sat: [
    {
      id: "sat-1",
      name: "Digital SAT Practice Test 1",
      description: "Full-length digital SAT simulation with adaptive modules. Covers Reading & Writing and Math with official-style timing.",
      duration: 134,
      sections: [
        { id: "rw", name: "Reading & Writing", questionCount: 33, timeLimit: 32 },
        { id: "math", name: "Math", questionCount: 27, timeLimit: 35 },
      ],
      difficulty: "Medium",
      subject: "sat",
      active: true,
      live: false,
    },
    {
      id: "sat-2",
      name: "Digital SAT Practice Test 2",
      description: "Full-length digital SAT simulation with a fresh set of questions across all domains.",
      duration: 134,
      sections: [
        { id: "rw", name: "Reading & Writing", questionCount: 33, timeLimit: 32 },
        { id: "math", name: "Math", questionCount: 27, timeLimit: 35 },
      ],
      difficulty: "Medium",
      subject: "sat",
      active: true,
      live: false,
    },
    {
      id: "sat-3",
      name: "Digital SAT Practice Test 3",
      description: "Advanced digital SAT practice with harder passages and multi-step math problems.",
      duration: 134,
      sections: [
        { id: "rw", name: "Reading & Writing", questionCount: 33, timeLimit: 32 },
        { id: "math", name: "Math", questionCount: 27, timeLimit: 35 },
      ],
      difficulty: "Hard",
      subject: "sat",
      active: true,
      live: false,
    },
    {
      id: "sat-4",
      name: "Digital SAT Practice Test 4",
      description: "Comprehensive SAT practice covering all domains with detailed answer explanations.",
      duration: 134,
      sections: [
        { id: "rw", name: "Reading & Writing", questionCount: 33, timeLimit: 32 },
        { id: "math", name: "Math", questionCount: 27, timeLimit: 35 },
      ],
      difficulty: "Medium",
      subject: "sat",
      active: true,
      live: false,
    },
    {
      id: "sat-5",
      name: "Digital SAT Practice Test 5",
      description: "Final practice test with high-difficulty modules to push your score higher.",
      duration: 134,
      sections: [
        { id: "rw", name: "Reading & Writing", questionCount: 33, timeLimit: 32 },
        { id: "math", name: "Math", questionCount: 27, timeLimit: 35 },
      ],
      difficulty: "Hard",
      subject: "sat",
      active: true,
      live: false,
    },
  ],

  act: [
    {
      id: "act-1",
      name: "ACT Practice Test 1",
      description: "Full-length ACT simulation covering English, Math, Reading, and Science sections.",
      duration: 175,
      sections: [
        { id: "english", name: "English", questionCount: 15, timeLimit: 45 },
        { id: "math", name: "Math", questionCount: 15, timeLimit: 60 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 35 },
        { id: "science", name: "Science", questionCount: 10, timeLimit: 35 },
      ],
      difficulty: "Medium",
      subject: "act",
      active: true,
      live: false,
    },
    {
      id: "act-2",
      name: "ACT Practice Test 2",
      description: "Second full-length ACT practice with varied question sets across all sections.",
      duration: 175,
      sections: [
        { id: "english", name: "English", questionCount: 15, timeLimit: 45 },
        { id: "math", name: "Math", questionCount: 15, timeLimit: 60 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 35 },
        { id: "science", name: "Science", questionCount: 10, timeLimit: 35 },
      ],
      difficulty: "Medium",
      subject: "act",
      active: true,
      live: false,
    },
    {
      id: "act-3",
      name: "ACT Practice Test 3",
      description: "Advanced ACT practice with challenging passages and complex math problems.",
      duration: 175,
      sections: [
        { id: "english", name: "English", questionCount: 15, timeLimit: 45 },
        { id: "math", name: "Math", questionCount: 15, timeLimit: 60 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 35 },
        { id: "science", name: "Science", questionCount: 10, timeLimit: 35 },
      ],
      difficulty: "Hard",
      subject: "act",
      active: true,
      live: false,
    },
    {
      id: "act-4",
      name: "ACT Practice Test 4",
      description: "Timed full-length ACT practice to build endurance and accuracy.",
      duration: 175,
      sections: [
        { id: "english", name: "English", questionCount: 15, timeLimit: 45 },
        { id: "math", name: "Math", questionCount: 15, timeLimit: 60 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 35 },
        { id: "science", name: "Science", questionCount: 10, timeLimit: 35 },
      ],
      difficulty: "Medium",
      subject: "act",
      active: true,
      live: false,
    },
    {
      id: "act-5",
      name: "ACT Practice Test 5",
      description: "Final ACT practice with enhanced difficulty for top-score preparation.",
      duration: 175,
      sections: [
        { id: "english", name: "English", questionCount: 15, timeLimit: 45 },
        { id: "math", name: "Math", questionCount: 15, timeLimit: 60 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 35 },
        { id: "science", name: "Science", questionCount: 10, timeLimit: 35 },
      ],
      difficulty: "Hard",
      subject: "act",
      active: true,
      live: false,
    },
  ],

  ielts: [
    {
      id: "ielts-1",
      name: "IELTS Academic Practice Test 1",
      description: "Full IELTS Academic simulation covering Listening, Reading, Writing, and Speaking.",
      duration: 175,
      sections: [
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 40 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 60 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 60 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 15 },
      ],
      difficulty: "Medium",
      subject: "ielts",
      active: true,
      live: false,
    },
    {
      id: "ielts-2",
      name: "IELTS Academic Practice Test 2",
      description: "Second full IELTS Academic practice with diverse topics and task types.",
      duration: 175,
      sections: [
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 40 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 60 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 60 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 15 },
      ],
      difficulty: "Medium",
      subject: "ielts",
      active: true,
      live: false,
    },
    {
      id: "ielts-3",
      name: "IELTS Academic Practice Test 3",
      description: "Advanced IELTS practice with complex academic passages and tasks.",
      duration: 175,
      sections: [
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 40 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 60 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 60 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 15 },
      ],
      difficulty: "Hard",
      subject: "ielts",
      active: true,
      live: false,
    },
    {
      id: "ielts-4",
      name: "IELTS Academic Practice Test 4",
      description: "Timed full IELTS practice to build exam stamina and accuracy.",
      duration: 175,
      sections: [
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 40 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 60 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 60 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 15 },
      ],
      difficulty: "Medium",
      subject: "ielts",
      active: true,
      live: false,
    },
    {
      id: "ielts-5",
      name: "IELTS Academic Practice Test 5",
      description: "Final IELTS practice with enhanced difficulty for Band 7+ preparation.",
      duration: 175,
      sections: [
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 40 },
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 60 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 60 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 15 },
      ],
      difficulty: "Hard",
      subject: "ielts",
      active: true,
      live: false,
    },
  ],

  toefl: [
    {
      id: "toefl-1",
      name: "TOEFL iBT Practice Test 1",
      description: "Full TOEFL iBT simulation covering Reading, Listening, Speaking, and Writing.",
      duration: 180,
      sections: [
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 54 },
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 41 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 17 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 50 },
      ],
      difficulty: "Medium",
      subject: "toefl",
      active: true,
      live: false,
    },
    {
      id: "toefl-2",
      name: "TOEFL iBT Practice Test 2",
      description: "Second full TOEFL iBT practice with varied academic topics.",
      duration: 180,
      sections: [
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 54 },
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 41 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 17 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 50 },
      ],
      difficulty: "Medium",
      subject: "toefl",
      active: true,
      live: false,
    },
    {
      id: "toefl-3",
      name: "TOEFL iBT Practice Test 3",
      description: "Advanced TOEFL practice with complex academic lectures and essays.",
      duration: 180,
      sections: [
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 54 },
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 41 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 17 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 50 },
      ],
      difficulty: "Hard",
      subject: "toefl",
      active: true,
      live: false,
    },
    {
      id: "toefl-4",
      name: "TOEFL iBT Practice Test 4",
      description: "Timed full TOEFL practice to build test-taking stamina.",
      duration: 180,
      sections: [
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 54 },
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 41 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 17 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 50 },
      ],
      difficulty: "Medium",
      subject: "toefl",
      active: true,
      live: false,
    },
    {
      id: "toefl-5",
      name: "TOEFL iBT Practice Test 5",
      description: "Final TOEFL practice with enhanced difficulty for top-score preparation.",
      duration: 180,
      sections: [
        { id: "reading", name: "Reading", questionCount: 10, timeLimit: 54 },
        { id: "listening", name: "Listening", questionCount: 10, timeLimit: 41 },
        { id: "speaking", name: "Speaking", questionCount: 10, timeLimit: 17 },
        { id: "writing", name: "Writing", questionCount: 10, timeLimit: 50 },
      ],
      difficulty: "Hard",
      subject: "toefl",
      active: true,
      live: false,
    },
  ],
}

export function getMockExam(examId: string): MockExam | undefined {
  for (const subject of Object.values(mockExams)) {
    const found = subject.find((e) => e.id === examId)
    if (found) return found
  }
  return undefined
}

export function getMockExamSection(
  examId: string,
  sectionId: string,
): { exam: MockExam; section: MockExam["sections"][0] } | undefined {
  const exam = getMockExam(examId)
  if (!exam) return undefined
  const section = exam.sections.find((s) => s.id === sectionId)
  if (!section) return undefined
  return { exam, section }
}

export const subjectMeta: Record<string, { name: string; icon: string; gradient: string; color: string; lightBg: string; iconBg: string; label: string }> = {
  sat: {
    name: "SAT",
    icon: "🎯",
    gradient: "from-blue-600 to-blue-700",
    color: "text-blue-600",
    lightBg: "bg-blue-50",
    iconBg: "bg-blue-100",
    label: "College Admissions",
  },
  act: {
    name: "ACT",
    icon: "📝",
    gradient: "from-emerald-600 to-emerald-700",
    color: "text-emerald-600",
    lightBg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    label: "College Admissions",
  },
  ielts: {
    name: "IELTS",
    icon: "🌍",
    gradient: "from-orange-500 to-orange-600",
    color: "text-orange-600",
    lightBg: "bg-orange-50",
    iconBg: "bg-orange-100",
    label: "English Proficiency",
  },
  toefl: {
    name: "TOEFL",
    icon: "🗽",
    gradient: "from-teal-500 to-teal-600",
    color: "text-teal-600",
    lightBg: "bg-teal-50",
    iconBg: "bg-teal-100",
    label: "English Proficiency",
  },
}