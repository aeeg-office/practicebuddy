'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BookOpen,
  Globe,
  Calculator,
  PenTool,
  Flag,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Target,
  Sparkles,
  HelpCircle,
  MessageCircle,
  FileText,
  Layers,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import Timer from "@/components/diagnostics/timer"
import QuestionPalette from "@/components/diagnostics/question-palette"
import QuestionRenderer from "@/components/diagnostics/question-renderer"
import ResultsDashboard from "@/components/diagnostics/results-dashboard"
import type { Question, AnswerOption } from "@/components/diagnostics/question-renderer"
import { satReadingWritingQuestions } from "@/data/sat-reading-writing"
import type { SATQuestion } from "@/data/sat-reading-writing"
import { satMathQuestions } from "@/data/sat-math-questions"
import type { SATMathQuestion } from "@/data/sat-math-questions"
import { useExamMode } from "@/lib/exam-mode-context"

/* ───────── Types ───────── */

type ExamStep = "select" | "section-select" | "info" | "instructions" | "exam" | "results"
type SATSection = "reading-writing" | "math"

interface StudentInfo {
  name: string
  email: string
  phone: string
  grade: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  grade?: string
}

/* ───────── Time limits (seconds) ───────── */

const SAT_RW_MODULE_TIME = 32 * 60 // 32 minutes
const SAT_MATH_MODULE_TIME = 35 * 60 // 35 minutes
const MOCK_EXAM_TIME = 10 * 60 // 10 minutes for 10 questions

/* ───────── Exam Type Definitions ───────── */

const examTypes = [
  {
    id: "sat",
    title: "SAT",
    description: "Digital SAT — Evidence-Based Reading & Writing, Math. 2 modules per section with adaptive difficulty.",
    icon: BookOpen,
    gradient: "from-blue-600 to-blue-700",
    lightBg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderHover: "hover:border-blue-400",
    label: "College Admissions",
  },
  {
    id: "act",
    title: "ACT",
    description: "English, Math, Reading, Science. Evaluate your skills for the American College Test.",
    icon: Calculator,
    gradient: "from-emerald-600 to-emerald-700",
    lightBg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-400",
    label: "College Admissions",
  },
  {
    id: "ielts",
    title: "IELTS",
    description: "Listening, Reading, Writing, Speaking. Measure your English proficiency for study abroad.",
    icon: Globe,
    gradient: "from-orange-500 to-orange-600",
    lightBg: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    borderHover: "hover:border-orange-400",
    label: "English Proficiency",
  },
  {
    id: "toefl",
    title: "TOEFL",
    description: "Reading, Listening, Speaking, Writing. Test your academic English communication skills.",
    icon: PenTool,
    gradient: "from-teal-500 to-teal-600",
    lightBg: "bg-teal-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    borderHover: "hover:border-teal-400",
    label: "English Proficiency",
  },
  {
    id: "english",
    title: "English",
    description: "General English proficiency — grammar, vocabulary, comprehension, and writing fundamentals.",
    icon: Globe,
    gradient: "from-purple-500 to-purple-600",
    lightBg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    borderHover: "hover:border-purple-400",
    label: "Language Skills",
  },
  {
    id: "math",
    title: "Math",
    description: "Algebra, geometry, trigonometry, statistics. Evaluate your quantitative reasoning skills.",
    icon: Calculator,
    gradient: "from-red-500 to-red-600",
    lightBg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    borderHover: "hover:border-red-400",
    label: "Quantitative",
  },
]

/* ───────── Mock Question Data (non-SAT exams) ───────── */

interface MockQuestion extends Question {
  correctAnswer: string
}

const mockQuestions: MockQuestion[] = [
  {
    id: 1, section: "Math", text: "If 3x + 7 = 22, what is the value of x?",
    options: [{ id: "A", text: "3" }, { id: "B", text: "5" }, { id: "C", text: "7" }, { id: "D", text: "15" }],
    correctAnswer: "B",
  },
  {
    id: 2, section: "Math", text: "A rectangle has length 8 cm and width 5 cm. What is its area in square centimeters?",
    options: [{ id: "A", text: "13" }, { id: "B", text: "26" }, { id: "C", text: "40" }, { id: "D", text: "80" }],
    correctAnswer: "C",
  },
  {
    id: 3, section: "Reading", text: "The word 'benevolent' most nearly means:",
    options: [{ id: "A", text: "Hostile" }, { id: "B", text: "Kind-hearted" }, { id: "C", text: "Indifferent" }, { id: "D", text: "Courageous" }],
    correctAnswer: "B",
  },
  {
    id: 4, section: "Reading", text: "Which of the following is the best example of a 'metaphor'?",
    options: [{ id: "A", text: "He runs as fast as the wind" }, { id: "B", text: "The classroom was a zoo" }, { id: "C", text: "She sings beautifully" }, { id: "D", text: "The car is red" }],
    correctAnswer: "B",
  },
  {
    id: 5, section: "Writing", text: "Choose the correct sentence:",
    options: [{ id: "A", text: "Me and John went to the store." }, { id: "B", text: "John and I went to the store." }, { id: "C", text: "John and me went to the store." }, { id: "D", text: "I and John went to the store." }],
    correctAnswer: "B",
  },
  {
    id: 6, section: "Math", text: "What is 15% of 200?",
    options: [{ id: "A", text: "15" }, { id: "B", text: "20" }, { id: "C", text: "25" }, { id: "D", text: "30" }],
    correctAnswer: "D",
  },
  {
    id: 7, section: "Reading", text: "Which of the following sentences contains a 'run-on' error?",
    options: [{ id: "A", text: "I went to the park." }, { id: "B", text: "She likes coffee, and he likes tea." }, { id: "C", text: "The sun was setting we decided to go home." }, { id: "D", text: "After the rain stopped, we went outside." }],
    correctAnswer: "C",
  },
  {
    id: 8, section: "Writing", text: "Which word correctly completes the sentence? 'Neither the teacher nor the students ___ satisfied with the results.'",
    options: [{ id: "A", text: "was" }, { id: "B", text: "were" }, { id: "C", text: "is" }, { id: "D", text: "has been" }],
    correctAnswer: "B",
  },
  {
    id: 9, section: "Math", text: "If a fair six-sided die is rolled, what is the probability of rolling an even number?",
    options: [{ id: "A", text: "1/6" }, { id: "B", text: "1/3" }, { id: "C", text: "1/2" }, { id: "D", text: "2/3" }],
    correctAnswer: "C",
  },
  {
    id: 10, section: "Writing", text: "Which transition best fits the blank? 'The weather was terrible. ___, we decided to go hiking anyway.'",
    options: [{ id: "A", text: "Therefore" }, { id: "B", text: "Moreover" }, { id: "C", text: "However" }, { id: "D", text: "Consequently" }],
    correctAnswer: "C",
  },
]

/* ───────── Helpers ───────── */

/** Normalise a SATQuestion or SATMathQuestion into the Question shape for the renderer. */
function toRenderableQuestion(q: SATQuestion | SATMathQuestion): Question & { domain: string; difficulty: string; explanation: string } {
  return {
    id: q.id,
    section: q.domain,
    text: q.text,
    passage: "passage" in q ? q.passage : undefined,
    options: q.options,
    correctAnswer: q.correctAnswer,
    isGridIn: "isGridIn" in q ? q.isGridIn : false,
    domain: q.domain,
    difficulty: q.difficulty,
    explanation: q.explanation,
  }
}

/** Get the appropriate time limit for the current SAT section/module. */
function getSatTimeLimit(section: SATSection): number {
  return section === "reading-writing" ? SAT_RW_MODULE_TIME : SAT_MATH_MODULE_TIME
}

/** Get total questions per module. */
function getModuleSize(section: SATSection): number {
  return section === "reading-writing" ? 33 : 27
}

function getSectionDescription(section: SATSection): string {
  return section === "reading-writing"
    ? "Evidence-Based Reading & Writing"
    : "Mathematics"
}

function getSectionIcon(section: SATSection) {
  return section === "reading-writing" ? BookOpen : Calculator
}

/** Recommend a course based on exam type. */
function getRecommendedCourse(examType: string, satSection?: SATSection): string {
  if (examType === "sat" && satSection === "reading-writing") {
    return "SAT Reading & Writing Intensive — 10 sessions covering passage analysis, grammar, and writing conventions with adaptive practice tests."
  }
  if (examType === "sat" && satSection === "math") {
    return "SAT Math Mastery — 10 sessions covering algebra, advanced math, problem solving, and geometry with targeted skill drills."
  }
  const map: Record<string, string> = {
    sat: "SAT Intensive Prep course — 12 sessions covering Math, Reading & Writing with full-length mock tests.",
    act: "ACT Accelerator program — targeted English, Math, Reading & Science prep with strategy workshops.",
    ielts: "IELTS Mastery course — comprehensive Listening, Reading, Writing & Speaking preparation.",
    toefl: "TOEFL Excellence program — academic English focus with speaking and writing evaluation sessions.",
    english: "English Foundations course — grammar, vocabulary, and writing skills for academic success.",
    math: "Math Fundamentals to Advanced program — algebra through pre-calculus with problem-solving drills.",
  }
  return map[examType] || "comprehensive test prep program tailored to your needs."
}

/** Load saved exam state from localStorage. */
function loadSavedState(): {
  answers: Record<number, string>
  flagged: number[]
  currentQuestion: number
  currentModule: 1 | 2
  examStep: ExamStep
  selectedExam: string
  satSection: SATSection | null
} | null {
  try {
    const saved = localStorage.getItem("aeeg-diagnostic-state")
    if (!saved) return null
    const parsed = JSON.parse(saved)
    const now = Date.now()
    // Expire after 24 hours
    if (parsed.timestamp && now - parsed.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("aeeg-diagnostic-state")
      return null
    }
    return {
      answers: parsed.answers ?? {},
      flagged: parsed.flagged ?? [],
      currentQuestion: parsed.currentQuestion ?? 0,
      currentModule: parsed.currentModule ?? 1,
      examStep: parsed.examStep ?? "select",
      selectedExam: parsed.selectedExam ?? "",
      satSection: parsed.satSection ?? null,
    }
  } catch {
    return null
  }
}

/** Save exam state to localStorage. */
function saveState(
  answers: Record<number, string>,
  flagged: number[],
  currentQuestion: number,
  currentModule: 1 | 2,
  examStep: ExamStep,
  selectedExam: string,
  satSection: SATSection | null,
) {
  try {
    localStorage.setItem(
      "aeeg-diagnostic-state",
      JSON.stringify({
        answers,
        flagged,
        currentQuestion,
        currentModule,
        examStep,
        selectedExam,
        satSection,
        timestamp: Date.now(),
      }),
    )
  } catch {
    // localStorage may be full; silently ignore
  }
}

/* ───────── MAIN COMPONENT ───────── */

export default function TakeDiagnosticPage() {
  const { setExamMode } = useExamMode()
  const [step, setStep] = useState<ExamStep>("select")
  const [selectedExam, setSelectedExam] = useState<string>("")
  const [satSection, setSatSection] = useState<SATSection | null>(null)
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({ name: "", email: "", phone: "", grade: "" })
  const [errors, setErrors] = useState<FormErrors>({})

  // Exam state
  const [currentModule, setCurrentModule] = useState<1 | 2>(1)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [flagged, setFlagged] = useState<Set<number>>(new Set())
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [moduleComplete, setModuleComplete] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [examStartTime, setExamStartTime] = useState<number>(0)
  const [isRestored, setIsRestored] = useState(false)

  // Persistent timer key to force re-mount on module change
  const [timerKey, setTimerKey] = useState<number>(0)

  const answersRef = useRef(answers)
  answersRef.current = answers

  const flaggedRef = useRef(flagged)
  flaggedRef.current = flagged

  /* ─── Compute question data ─── */

  const { allQuestions, module1Questions, module2Questions } = useMemo(() => {
    if (selectedExam !== "sat" || !satSection) {
      return { allQuestions: mockQuestions, module1Questions: mockQuestions, module2Questions: [] }
    }

    const raw: (SATQuestion | SATMathQuestion)[] =
      satSection === "reading-writing" ? satReadingWritingQuestions : satMathQuestions

    const m1 = raw.filter((q) => q.module === 1).map(toRenderableQuestion)
    const m2 = raw.filter((q) => q.module === 2).map(toRenderableQuestion)

    return {
      allQuestions: [...m1, ...m2],
      module1Questions: m1,
      module2Questions: m2,
    }
  }, [selectedExam, satSection])

  /** The current set of questions for the active module. */
  const currentQuestions = useMemo(() => {
    if (selectedExam !== "sat" || !satSection) return mockQuestions
    if (currentModule === 1) return module1Questions
    return getAdaptedModule2Questions(module2Questions, answers, module1Questions.length)
  }, [currentModule, module1Questions, module2Questions, answers, selectedExam, satSection])

  const totalQuestions = currentQuestions.length
  const isLastQuestion = currentQuestion >= totalQuestions - 1

  /* ─── Restore saved state (once) ─── */
  useEffect(() => {
    const saved = loadSavedState()
    if (saved && saved.examStep !== "select" && saved.examStep !== "results") {
      setAnswers(saved.answers)
      setFlagged(new Set(saved.flagged))
      setCurrentQuestion(saved.currentQuestion)
      setCurrentModule(saved.currentModule as 1 | 2)
      setSelectedExam(saved.selectedExam)
      setSatSection(saved.satSection)
      setStep(saved.examStep)
      setIsRestored(true)
      if (saved.examStep === "exam") {
        setExamStartTime(Date.now())
      }
    }
  }, [])

  /* ─── Auto-save every 10 seconds during exam ─── */
  useEffect(() => {
    if (step !== "exam" || examSubmitted) return
    const id = setInterval(() => {
      saveState(
        answersRef.current,
        Array.from(flaggedRef.current),
        currentQuestion,
        currentModule,
        step,
        selectedExam,
        satSection,
      )
    }, 10000)
    return () => clearInterval(id)
  }, [step, examSubmitted, currentQuestion, currentModule, selectedExam, satSection])

  /* ─── Sync exam mode with step ─── */
  useEffect(() => {
    if (step === "exam" && !examSubmitted) {
      setExamMode(true)
    } else {
      setExamMode(false)
    }
  }, [step, examSubmitted, setExamMode])

  /* ─── Compute module 1 performance for adaptive Module 2 ─── */
  const module1Percent = useMemo(() => {
    if (selectedExam !== "sat" || !satSection || module1Questions.length === 0) return 0
    const correct = module1Questions.filter((q) => answers[q.id] === q.correctAnswer).length
    return correct / module1Questions.length
  }, [selectedExam, satSection, module1Questions, answers])

  /* ─── Computed results (after submission) ─── */
  const totalCorrect = useMemo(() => {
    if (!examSubmitted) return 0
    return allQuestions.filter((q) => answers[q.id] === q.correctAnswer).length
  }, [examSubmitted, answers, allQuestions])

  const m1Correct = useMemo(() => {
    if (!examSubmitted || selectedExam !== "sat") return 0
    return module1Questions.filter((q) => answers[q.id] === q.correctAnswer).length
  }, [examSubmitted, selectedExam, module1Questions, answers])

  const m2Correct = useMemo(() => {
    if (!examSubmitted || selectedExam !== "sat") return 0
    return module2Questions.filter((q) => answers[q.id] === q.correctAnswer).length
  }, [examSubmitted, selectedExam, module2Questions, answers])

  const sectionScores = useMemo(() => {
    if (!examSubmitted) return []
    if (selectedExam === "sat" && satSection) {
      const m1Total = module1Questions.length
      const m2Total = module2Questions.length
      return [
        { name: `Module 1 (${getSectionDescription(satSection)})`, score: m1Correct, total: m1Total },
        { name: `Module 2 (${getSectionDescription(satSection)})`, score: m2Correct, total: m2Total },
        { name: getSectionDescription(satSection), score: m1Correct + m2Correct, total: m1Total + m2Total },
      ]
    }
    // Non-SAT: group by section
    const sections = [...new Set(allQuestions.map((q) => q.section))]
    return sections.map((name) => {
      const secQs = allQuestions.filter((q) => q.section === name)
      const correct = secQs.filter((q) => answers[q.id] === q.correctAnswer).length
      return { name, score: correct, total: secQs.length }
    })
  }, [examSubmitted, allQuestions, answers, selectedExam, satSection, m1Correct, m2Correct, module1Questions, module2Questions])

  const estimatedSatScore = useMemo(() => {
    if (!examSubmitted || selectedExam !== "sat" || !satSection) return undefined
    const sectionTotal = module1Questions.length + module2Questions.length
    const sectionCorrect = m1Correct + m2Correct
    // Map correct count to 200-800 scale
    const raw = Math.round((sectionCorrect / sectionTotal) * 600 + 200)
    return Math.max(200, Math.min(800, raw))
  }, [examSubmitted, selectedExam, satSection, m1Correct, m2Correct, module1Questions, module2Questions])

  const weakAreas = useMemo(() => {
    if (!examSubmitted) return []
    const wrongByDomain: Record<string, number> = {}
    allQuestions.forEach((q) => {
      if (answers[q.id] !== q.correctAnswer) {
        const domain = (q as any).domain || q.section
        wrongByDomain[domain] = (wrongByDomain[domain] || 0) + 1
      }
    })
    return Object.entries(wrongByDomain)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([domain, count]) => `${domain} (${count} incorrect)`)
  }, [examSubmitted, allQuestions, answers])

  const recommendations = useMemo(() => {
    if (!examSubmitted) return []
    const recs: string[] = [getRecommendedCourse(selectedExam, satSection ?? undefined)]

    if (selectedExam === "sat" && satSection) {
      const pct = (sectionScores.find((s) => s.name === getSectionDescription(satSection))?.score ?? 0) /
        (sectionScores.find((s) => s.name === getSectionDescription(satSection))?.total ?? 1)
      if (pct < 0.5) {
        recs.push("Foundation Building: Consider our fundamentals course to strengthen core concepts before test-specific prep.")
      } else if (pct < 0.7) {
        recs.push("Skill Drills: Targeted practice in your weaker domains will significantly boost your score.")
      } else {
        recs.push("Advanced Practice: You're close to mastery — focused work on remaining gaps will push you over 700+.")
      }
    }
    return recs
  }, [examSubmitted, selectedExam, satSection, sectionScores])

  const timeTaken = useMemo(() => {
    if (!examSubmitted) return 0
    return Math.floor((Date.now() - examStartTime) / 1000)
  }, [examSubmitted, examStartTime])

  const selectedExamType = examTypes.find((e) => e.id === selectedExam)

  /* ─── Handlers ─── */

  const handleSelectExam = (id: string) => {
    setSelectedExam(id)
    if (id === "sat") {
      setStep("section-select")
    } else {
      setStep("info")
    }
  }

  const handleSelectSection = (section: SATSection) => {
    setSatSection(section)
    setStep("info")
  }

  const validateInfo = (): boolean => {
    const newErrors: FormErrors = {}
    if (!studentInfo.name.trim()) newErrors.name = "Name is required"
    if (!studentInfo.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(studentInfo.email)) newErrors.email = "Invalid email format"
    if (!studentInfo.phone.trim()) newErrors.phone = "Phone is required"
    if (!studentInfo.grade.trim()) newErrors.grade = "Grade is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInfoSubmit = () => {
    if (validateInfo()) setStep("instructions")
  }

  const handleStartExam = () => {
    setCurrentQuestion(0)
    setCurrentModule(1)
    setModuleComplete(false)
    setShowCompletionModal(false)
    setExamSubmitted(false)
    setExamStartTime(Date.now())
    setTimerKey((k) => k + 1)
    // Clear any stale state
    if (selectedExam !== "sat") {
      const initialAnswers: Record<number, string> = {}
      mockQuestions.forEach((q) => {
        if (answers[q.id]) initialAnswers[q.id] = answers[q.id]
      })
      setAnswers(initialAnswers)
    }
    setStep("exam")
  }

  const handleSelectAnswer = (questionId: number, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }

  const handleFlagToggle = (questionId: number) => {
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(questionId)) next.delete(questionId)
      else next.add(questionId)
      return next
    })
  }

  const handleGoToQuestion = (questionNumber: number) => {
    const idx = currentQuestions.findIndex((q) => q.id === questionNumber)
    if (idx !== -1) setCurrentQuestion(idx)
  }

  const handleTimeUp = useCallback(() => {
    if (selectedExam !== "sat" || !satSection) {
      // Non-SAT: auto-submit
      setExamSubmitted(true)
      setStep("results")
      return
    }
    // SAT: auto-complete current module
    setShowCompletionModal(true)
    setModuleComplete(true)
  }, [selectedExam, satSection])

  const handleModuleComplete = () => {
    setShowCompletionModal(true)
    setModuleComplete(true)
  }

  const handleProceedToModule2 = () => {
    setCurrentModule(2)
    setCurrentQuestion(0)
    setModuleComplete(false)
    setShowCompletionModal(false)
    setTimerKey((k) => k + 1)
    // Pre-fill any existing answers for module 2 if resuming
  }

  const handleSubmitExam = useCallback(() => {
    setExamSubmitted(true)
    setStep("results")
    // Clear saved state
    localStorage.removeItem("aeeg-diagnostic-state")
  }, [])

  const handleRestart = () => {
    setStep("select")
    setSelectedExam("")
    setSatSection(null)
    setCurrentQuestion(0)
    setCurrentModule(1)
    setAnswers({})
    setFlagged(new Set())
    setExamSubmitted(false)
    setModuleComplete(false)
    setShowCompletionModal(false)
    setExamStartTime(0)
    localStorage.removeItem("aeeg-diagnostic-state")
  }

  const getTimerLimit = (): number => {
    if (selectedExam !== "sat" || !satSection) return MOCK_EXAM_TIME
    return getSatTimeLimit(satSection)
  }

  /* ================================================================
     RENDER
     ================================================================ */

  const stepNumber = useMemo(() => {
    const map: Record<ExamStep, number> = {
      select: 1,
      "section-select": 1,
      info: 2,
      instructions: 3,
      exam: 4,
      results: 5,
    }
    return map[step] ?? 1
  }, [step])

  const totalSteps = 4

  return (
    <div className="min-h-screen bg-background">
      {/* ── Progress Bar Header ── */}
      {step !== "exam" && (
        <div className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold transition-transform group-hover:scale-105">
                A
              </div>
              <span className="text-sm font-bold text-primary">AEEG Diagnostic</span>
            </Link>
            {step !== "results" && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                        stepNumber === s
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30 scale-110"
                          : stepNumber > s
                            ? "bg-emerald-500 text-white shadow-sm shadow-emerald-300"
                            : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {stepNumber > s ? <CheckCircle2 className="h-3.5 w-3.5" /> : s}
                    </div>
                    <span className="hidden sm:inline font-medium">
                      {s === 1 ? "Select Exam" : s === 2 ? "Information" : s === 3 ? "Instructions" : "Exam"}
                    </span>
                    {s < totalSteps && <ChevronRight className="h-3 w-3 text-muted-foreground/40" />}
                  </div>
                ))}
              </div>
            )}
            {step === "results" && (
              <div className="flex items-center gap-3">
                <Badge variant="success" className="text-xs gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Completed
                </Badge>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* STEP "select": Exam Type Selector */}
      {/* ─────────────────────────────────────────────────────────────── */}
      {step === "select" && (
        <div className="container mx-auto px-4 py-16 md:py-20">
          {/* Hero section */}
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-5 px-4 py-1.5 text-xs tracking-wider uppercase">
              Step 1 of 4 — Choose Your Exam
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4 tracking-tight">
              Start Your{" "}
              <span className="bg-gradient-to-r from-primary to-[rgb(90,50,220)] bg-clip-text text-transparent">
                Diagnostic
              </span>{" "}
              Journey
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
              Pick the exam you want to be assessed on. We&apos;ll generate a personalized
              diagnostic test to evaluate your current skill level and identify areas for improvement.
            </p>
          </div>

          {/* Exam type cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {examTypes.map((exam) => {
              const Icon = exam.icon
              return (
                <button
                  key={exam.id}
                  onClick={() => handleSelectExam(exam.id)}
                  className={`group relative text-left rounded-2xl border-2 p-6 transition-all duration-300 ${
                    selectedExam === exam.id
                      ? `${exam.lightBg} border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/30`
                      : "border-border bg-card hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-6 right-6 h-1 rounded-full bg-gradient-to-r ${exam.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${selectedExam === exam.id ? "opacity-100" : ""}`} />

                  {/* Icon */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${exam.iconBg} ${exam.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title + Label */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-lg font-bold ${exam.iconColor}`}>{exam.title}</h3>
                    <Badge variant="outline" className="text-[10px] px-2 py-0 border-current text-muted-foreground">
                      {exam.label}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exam.description}
                  </p>

                  {/* CTA arrow hint */}
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Select {exam.title}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* STEP "section-select": SAT Section Selection */}
      {/* ─────────────────────────────────────────────────────────────── */}
      {step === "section-select" && (
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
          <div className="text-center mb-10">
            <Badge variant="default" className="mb-5 px-4 py-1.5 text-xs tracking-wider uppercase">
              Step 1 of 4 — SAT Setup
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4 tracking-tight">
              Choose SAT Section
            </h1>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              The digital SAT has two sections. Pick the one you want to diagnose today.
              Each section has 2 adaptive modules that adjust to your skill level.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <button
              onClick={() => handleSelectSection("reading-writing")}
              className="group relative text-left rounded-2xl border-2 border-blue-200 bg-blue-50/60 p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-blue-400"
            >
              <div className="absolute top-0 left-6 right-6 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">Reading & Writing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                2 modules × 33 questions · 32 minutes each
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-[10px]">Information & Ideas</Badge>
                <Badge variant="secondary" className="text-[10px]">Craft & Structure</Badge>
                <Badge variant="secondary" className="text-[10px]">Expression of Ideas</Badge>
                <Badge variant="secondary" className="text-[10px]">Conventions</Badge>
              </div>
            </button>

            <button
              onClick={() => handleSelectSection("math")}
              className="group relative text-left rounded-2xl border-2 border-red-200 bg-red-50/60 p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-red-400"
            >
              <div className="absolute top-0 left-6 right-6 h-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-red-100 text-red-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Calculator className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-red-700 mb-2">Mathematics</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                2 modules × 27 questions · 35 minutes each
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-[10px]">Algebra</Badge>
                <Badge variant="secondary" className="text-[10px]">Advanced Math</Badge>
                <Badge variant="secondary" className="text-[10px]">Problem Solving</Badge>
                <Badge variant="secondary" className="text-[10px]">Geometry & Trig</Badge>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-start mt-8">
            <Button
              variant="outline"
              onClick={() => setStep("select")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Exams
            </Button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* STEP "info": Student Info */}
      {/* ─────────────────────────────────────────────────────────────── */}
      {step === "info" && (
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-lg">
          <div className="text-center mb-10">
            <Badge variant="default" className="mb-5 px-4 py-1.5 text-xs tracking-wider uppercase">
              Step 2 of 4 — Your Details
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3 tracking-tight">
              Student Information
            </h1>
            <p className="text-muted-foreground text-base">
              Tell us a bit about yourself so we can personalize your experience.
            </p>
          </div>

          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-7 space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-secondary block">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={studentInfo.name}
                  onChange={(e) => {
                    setStudentInfo({ ...studentInfo, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: undefined })
                  }}
                  className={errors.name ? "border-destructive ring-destructive/20" : ""}
                />
                {errors.name && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-secondary block">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={studentInfo.email}
                  onChange={(e) => {
                    setStudentInfo({ ...studentInfo, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: undefined })
                  }}
                  className={errors.email ? "border-destructive ring-destructive/20" : ""}
                />
                {errors.email && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-secondary block">
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <Input
                  id="phone"
                  placeholder="+20 100 000 0000"
                  value={studentInfo.phone}
                  onChange={(e) => {
                    setStudentInfo({ ...studentInfo, phone: e.target.value })
                    if (errors.phone) setErrors({ ...errors, phone: undefined })
                  }}
                  className={errors.phone ? "border-destructive ring-destructive/20" : ""}
                />
                {errors.phone && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="grade" className="text-sm font-semibold text-secondary block">
                  Grade / Year <span className="text-destructive">*</span>
                </label>
                <Input
                  id="grade"
                  placeholder="e.g., Grade 11, Year 12, University"
                  value={studentInfo.grade}
                  onChange={(e) => {
                    setStudentInfo({ ...studentInfo, grade: e.target.value })
                    if (errors.grade) setErrors({ ...errors, grade: undefined })
                  }}
                  className={errors.grade ? "border-destructive ring-destructive/20" : ""}
                />
                {errors.grade && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.grade}</p>}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(selectedExam === "sat" ? "section-select" : "select")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handleInfoSubmit}
              className="gap-2 shadow-sm shadow-primary/20"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* STEP "instructions": Exam Instructions */}
      {/* ─────────────────────────────────────────────────────────────── */}
      {step === "instructions" && (
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-2xl">
          <div className="text-center mb-10">
            <Badge variant="default" className="mb-5 px-4 py-1.5 text-xs tracking-wider uppercase">
              Step 3 of 4 — Get Ready
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3 tracking-tight">
              Exam Instructions
            </h1>
            <p className="text-muted-foreground text-base">
              Review the guidelines before starting your diagnostic exam.
            </p>
          </div>

          <Card className="border-border/60 shadow-sm overflow-hidden">
            {/* Header banner */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/40 px-7 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {selectedExamType && <selectedExamType.icon className="h-5 w-5" />}
                </div>
                <div>
                  <CardTitle className="text-lg text-primary">
                    {selectedExamType?.title || "Diagnostic"}
                    {selectedExam === "sat" && satSection ? ` — ${getSectionDescription(satSection)}` : ""}
                  </CardTitle>
                  <CardDescription>Exam Overview &amp; Rules</CardDescription>
                </div>
              </div>
            </div>

            <CardContent className="p-7 space-y-6">
              {/* Key info boxes */}
              <div className={`grid ${selectedExam === "sat" && satSection ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2"} gap-4`}>
                {selectedExam === "sat" && satSection ? (
                  <>
                    <div className="rounded-xl bg-primary/5 border border-primary/10 p-5 text-center">
                      <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-secondary">{getModuleSize(satSection)}</p>
                      <p className="text-xs text-muted-foreground">Questions per Module</p>
                    </div>
                    <div className="rounded-xl bg-accent/10 border border-accent/20 p-5 text-center">
                      <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-secondary">{formatMinutes(getSatTimeLimit(satSection))}</p>
                      <p className="text-xs text-muted-foreground">Per Module</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center">
                      <Layers className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-secondary">{getModuleSize(satSection) * 2}</p>
                      <p className="text-xs text-muted-foreground">Total Questions</p>
                    </div>
                    <div className="rounded-xl bg-purple-50 border border-purple-200 p-5 text-center">
                      <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-bold text-secondary">2 Modules</p>
                      <p className="text-xs text-muted-foreground">Adaptive Format</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-xl bg-primary/5 border border-primary/10 p-5 text-center">
                      <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-secondary">10</p>
                      <p className="text-xs text-muted-foreground">Questions</p>
                    </div>
                    <div className="rounded-xl bg-accent/10 border border-accent/20 p-5 text-center">
                      <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-secondary">10:00</p>
                      <p className="text-xs text-muted-foreground">Time Limit</p>
                    </div>
                  </>
                )}
              </div>

              {/* Module info for SAT */}
              {selectedExam === "sat" && satSection && (
                <div className="rounded-xl bg-amber-50 border border-amber-200/70 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-amber-800 mb-1">Adaptive Testing</h3>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        This exam uses a 2-module adaptive format. Module 1 establishes your baseline.
                        Module 2 adapts in difficulty based on your Module 1 performance. You cannot
                        return to Module 1 after completing it. Each module has its own timer.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Rules */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-secondary flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  Exam Rules
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <span>Read each question carefully before selecting your answer.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <span>You may flag questions to review later and navigate freely between them.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <span>Answers are automatically saved every 10 seconds. You can resume if your session is interrupted.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <span>The exam auto-submits when the timer reaches zero.</span>
                  </li>
                  {selectedExam === "sat" && satSection && (
                    <li className="flex items-start gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-600 shrink-0 mt-0.5">
                        <AlertTriangle className="h-3 w-3" />
                      </div>
                      <span>Module 2 difficulty adapts based on your Module 1 score. Do your best on every question!</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Selected exam summary */}
              {selectedExamType && (
                <div className="rounded-xl bg-muted/30 border border-border/50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Target className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary mb-0.5">
                        You selected: {selectedExamType.title}
                        {selectedExam === "sat" && satSection ? ` — ${getSectionDescription(satSection)}` : ""}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{selectedExamType.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep("info")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handleStartExam}
              size="lg"
              className="gap-2 shadow-sm shadow-primary/20"
            >
              {selectedExam === "sat" && satSection
                ? "Start Module 1"
                : "Start Exam"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* STEP "exam": The Exam Screen */}
      {/* ─────────────────────────────────────────────────────────────── */}
      {step === "exam" && (
        <div className="min-h-screen bg-background flex flex-col">
          {/* ── Fixed Header ── */}
          <div className="bg-white/90 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm">
            <div className="px-4 py-2.5 flex items-center justify-between max-w-screen-2xl mx-auto">
              {/* Left: Exam name + progress */}
              <div className="flex items-center gap-3 min-w-0">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-[10px] font-bold">
                    A
                  </div>
                </Link>
                <div className="hidden sm:block">
                  <span className="text-sm font-bold text-secondary">
                    {selectedExamType?.title}
                    {selectedExam === "sat" && satSection ? ` ${getSectionDescription(satSection)}` : ""}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Module {currentModule}{selectedExam === "sat" ? " of 2" : ""}
                  </span>
                </div>
                <div className="h-5 w-px bg-border hidden sm:block" />
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap bg-muted/30 px-2.5 py-1 rounded-full">
                  Q{currentQuestion + 1}/{totalQuestions}
                </span>
              </div>

              {/* Center: Timer */}
              <div className="flex-1 max-w-xs mx-4 hidden md:block">
                <Timer
                  key={timerKey}
                  timeLimit={getTimerLimit()}
                  onTimeUp={handleTimeUp}
                  paused={moduleComplete}
                />
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {/* Mobile timer */}
                <div className="md:hidden">
                  <Timer
                    key={`mobile-${timerKey}`}
                    timeLimit={getTimerLimit()}
                    onTimeUp={handleTimeUp}
                    paused={moduleComplete}
                  />
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90 text-xs gap-1.5"
                  onClick={() => {
                    if (selectedExam !== "sat" || !satSection) {
                      if (window.confirm("Are you sure you want to submit your exam?")) {
                        handleSubmitExam()
                      }
                    } else {
                      handleModuleComplete()
                    }
                  }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {selectedExam === "sat" && satSection ? "Finish Module" : "Submit"}
                </Button>
              </div>
            </div>
          </div>

          {/* ── Main exam body ── */}
          <div className="flex-1 px-4 py-5 max-w-screen-2xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* ── Question Area (4/5 on desktop) ── */}
              <div className="lg:col-span-4 space-y-4">
                {currentQuestions[currentQuestion] && (
                  <QuestionRenderer
                    key={`q-${currentModule}-${currentQuestions[currentQuestion].id}`}
                    question={currentQuestions[currentQuestion]}
                    selectedAnswer={answers[currentQuestions[currentQuestion].id] ?? null}
                    onAnswer={(answer) => handleSelectAnswer(currentQuestions[currentQuestion].id, answer)}
                  />
                )}

                {/* ── Navigation bar ── */}
                <div className="bg-card rounded-xl border border-border/60 p-3.5 flex items-center justify-between gap-2 shadow-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))}
                    className="gap-1.5"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFlagToggle(currentQuestions[currentQuestion].id)}
                      className={`gap-1.5 transition-all ${
                        flagged.has(currentQuestions[currentQuestion].id)
                          ? "text-accent bg-accent/10 hover:bg-accent/15"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {flagged.has(currentQuestions[currentQuestion].id) ? (
                        <Flag className="h-4 w-4 fill-accent" />
                      ) : (
                        <Flag className="h-4 w-4" />
                      )}
                      {flagged.has(currentQuestions[currentQuestion].id) ? "Flagged" : "Flag"}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isLastQuestion ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentQuestion((p) => Math.min(totalQuestions - 1, p + 1))}
                        className="gap-1.5"
                      >
                        Next <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 gap-1.5"
                        onClick={handleModuleComplete}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {selectedExam === "sat" && satSection && currentModule === 1
                          ? "Complete Module 1"
                          : "Submit Exam"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Question Palette Sidebar (1/5 on desktop) ── */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-[76px]">
                  <QuestionPalette
                    totalQuestions={totalQuestions}
                    currentQuestion={currentQuestions[currentQuestion]?.id ?? 1}
                    answers={answers}
                    flagged={flagged}
                    onNavigate={handleGoToQuestion}
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Module Completion Modal ── */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-md w-full animate-in fade-in zoom-in-95 duration-200 shadow-xl border-border/60">
            <CardContent className="p-8 text-center">
              {currentModule === 1 && selectedExam === "sat" && satSection ? (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-5">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary mb-2">Module 1 Complete!</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    You answered{" "}
                    <span className="font-bold text-primary">
                      {module1Questions.filter((q) => answers[q.id] === q.correctAnswer).length}
                    </span>{" "}
                    of {module1Questions.length} correctly in this module.
                  </p>
                  <div className="bg-amber-50 border border-amber-200/70 rounded-xl p-5 mb-6 text-left">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-4 w-4 text-amber-700 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-amber-800 font-semibold mb-1">What happens next?</p>
                        <p className="text-xs text-amber-700 leading-relaxed">
                          Module 2 will adapt to your Module 1 performance. You will not be able to
                          return to Module 1 questions. Take a moment to rest, then proceed when ready.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowCompletionModal(false)}
                    >
                      Review Answers
                    </Button>
                    <Button
                      className="gap-2 shadow-sm shadow-primary/20"
                      onClick={handleProceedToModule2}
                    >
                      Start Module 2 <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-5">
                    <div className="relative">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                      <Sparkles className="h-3.5 w-3.5 text-accent absolute -top-1 -right-1" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-secondary mb-2">Exam Complete!</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    You answered{" "}
                    <span className="font-bold text-primary">{totalCorrect}</span> of{" "}
                    {allQuestions.length} questions correctly.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowCompletionModal(false)}
                    >
                      Review Answers
                    </Button>
                    <Button
                      className="gap-2 shadow-sm shadow-primary/20"
                      onClick={handleSubmitExam}
                    >
                      View Results <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* STEP "results": Score Report */}
      {/* ─────────────────────────────────────────────────────────────── */}
      {step === "results" && (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <ResultsDashboard
            score={totalCorrect}
            totalQuestions={allQuestions.length}
            sectionScores={sectionScores.map((s) => ({ name: s.name, score: s.score, total: s.total }))}
            estimatedScore={estimatedSatScore}
            answers={answers}
            questions={allQuestions}
            weakAreas={weakAreas}
            recommendations={recommendations}
            timeTaken={timeTaken}
            examType={selectedExamType?.title ?? "Diagnostic"}
          />

          {/* ── CTA Section ── */}
          <div className="mt-10 space-y-5">
            {/* Main CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-[rgb(80,40,200)] to-secondary p-1 shadow-xl">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyOHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
              <div className="relative rounded-2xl bg-gradient-to-br from-primary/95 via-[rgb(80,40,200)/95] to-secondary/95 px-8 py-10 md:py-12 md:px-12">
                <div className="text-center">
                  <Sparkles className="h-8 w-8 text-accent mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                    Ready to take the next step?
                  </h2>
                  <p className="text-white/70 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
                    Schedule a free consultation with our academic advisors to discuss your results and
                    create a personalized study plan tailored to your goals.
                  </p>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact">
                      <Button
                        variant="accent"
                        size="xl"
                        className="font-semibold shadow-lg shadow-black/20 gap-2"
                      >
                        Book a Consultation
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>

                    {/* WhatsApp Button */}
                    <a
                      href="https://wa.me/201060618899"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button
                        variant="outline"
                        size="xl"
                        className="border-white/30 text-white hover:bg-white/15 hover:text-white gap-2 group"
                      >
                        <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                        Chat on WhatsApp
                      </Button>
                    </a>

                    <Button
                      variant="ghost"
                      size="xl"
                      className="text-white/60 hover:text-white hover:bg-white/10 gap-2"
                      onClick={handleRestart}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Take Another Exam
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom links */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Have questions? Reach out to us on{" "}
                <a
                  href="https://wa.me/201060618899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium underline underline-offset-2"
                >
                  WhatsApp
                </a>{" "}
                or visit our{" "}
                <Link href="/contact" className="text-primary hover:text-primary/80 font-medium underline underline-offset-2">
                  Contact page
                </Link>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───────── Standalone icon components (avoids import name conflicts) ───────── */

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function GraduationIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}

/* ───────── Helpers ───────── */

function formatMinutes(seconds: number): string {
  const m = Math.floor(seconds / 60)
  return `${m}:00`
}

/** Filter Module 2 questions based on Module 1 performance. */
function getAdaptedModule2Questions(
  module2Questions: Question[],
  answers: Record<number, string>,
  module1Size: number,
): Question[] {
  if (module2Questions.length === 0) return []

  const answeredModule1Count = Object.keys(answers).filter((id) => {
    const numId = Number(id)
    return module2Questions.every((q) => q.id !== numId) // only count module 1 answers
  }).length

  // Estimate Module 1 correctness by counting answers in module 1 range
  // A simple heuristic: look at all answers that are NOT in module 2
  const module1Correct = Object.entries(answers).filter(([id, ans]) => {
    const numId = Number(id)
    // Not in module 2 → module 1
    return !module2Questions.some((q) => q.id === numId)
  }).length

  // Estimate: assume about half of unanswered module 1 questions might be answered
  const estimatedModule1Correct = Math.min(module1Correct, module1Size)
  const performance = module1Size > 0 ? estimatedModule1Correct / module1Size : 0
  const isHighPerformer = performance > 0.6

  if (isHighPerformer) {
    // Show harder questions first: sort by difficulty (hard > medium > easy)
    const sorted = [...module2Questions].sort((a, b) => {
      const diffOrder: Record<string, number> = { hard: 3, medium: 2, easy: 1 }
      return (diffOrder[(b as any).difficulty] || 0) - (diffOrder[(a as any).difficulty] || 0)
    })
    // Keep the full set but reordered so harder questions appear first
    return sorted
  }

  // Standard: show easier questions first, interleaved with medium
  const sorted = [...module2Questions].sort((a, b) => {
    const diffOrder: Record<string, number> = { easy: 1, medium: 2, hard: 3 }
    return (diffOrder[(a as any).difficulty] || 0) - (diffOrder[(b as any).difficulty] || 0)
  })
  return sorted
}