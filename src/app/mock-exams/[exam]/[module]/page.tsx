'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { useParams } from "next/navigation"
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
  Award,
  Info,
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
import { getMockExam, type MockExam } from "@/data/mock-exams-data"
import { useExamMode } from "@/lib/exam-mode-context"

// ── Question data imports ──
import { satReadingWritingQuestions } from "@/data/sat-reading-writing"
import type { SATQuestion } from "@/data/sat-reading-writing"
import { satMathQuestions } from "@/data/sat-math-questions"
import type { SATMathQuestion } from "@/data/sat-math-questions"

/* ───────── Types ───────── */
type ExamStep = "info" | "instructions" | "exam" | "results"

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

/* ───────── Subject meta ───────── */
const subjectMeta: Record<string, { Icon: any; gradient: string; color: string }> = {
  sat: { Icon: BookOpen, gradient: "from-blue-600 to-blue-700", color: "text-blue-600" },
  act: { Icon: Calculator, gradient: "from-emerald-600 to-emerald-700", color: "text-emerald-600" },
  ielts: { Icon: Globe, gradient: "from-orange-500 to-orange-600", color: "text-orange-600" },
  toefl: { Icon: PenTool, gradient: "from-teal-500 to-teal-600", color: "text-teal-600" },
}

/* ───────── Fisher-Yates shuffle ───────── */
function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/* ───────── Load questions for a given exam/section ───────── */
function loadQuestions(exam: MockExam, sectionId: string): (Question & { difficulty: string; explanation: string })[] {
  const subject = exam.subject

  // SAT: use dedicated data files
  if (subject === "sat") {
    if (sectionId === "rw") {
      return shuffle(satReadingWritingQuestions).slice(0, exam.sections.find((s) => s.id === "rw")?.questionCount ?? 33)
        .map((q) => ({
          id: q.id,
          section: q.domain,
          text: q.text,
          passage: q.passage,
          options: q.options,
          correctAnswer: q.correctAnswer,
          difficulty: q.difficulty,
          explanation: q.explanation,
        }))
    }
    if (sectionId === "math") {
      return shuffle(satMathQuestions).slice(0, exam.sections.find((s) => s.id === "math")?.questionCount ?? 27)
        .map((q) => ({
          id: q.id,
          section: q.domain,
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
          isGridIn: q.isGridIn,
          difficulty: q.difficulty,
          explanation: q.explanation,
        }))
    }
  }
  // Fallback
  return []
}

/* ───────── Get section display info ───────── */
function getSectionLabel(exam: MockExam, sectionId: string): string {
  const section = exam.sections.find((s) => s.id === sectionId)
  return section?.name ?? sectionId
}

/* ───────── Get recommended course ───────── */
function getRecommendedCourse(subject: string, sectionName: string): string {
  const map: Record<string, string> = {
    sat: "SAT Intensive Prep course — 12 sessions covering Math, Reading & Writing with full-length mock tests.",
    act: "ACT Accelerator program — targeted English, Math, Reading & Science prep with strategy workshops.",
    ielts: "IELTS Mastery course — comprehensive Listening, Reading, Writing & Speaking preparation.",
    toefl: "TOEFL Excellence program — academic English focus with speaking and writing evaluation sessions.",
  }
  return map[subject] || "comprehensive test prep program tailored to your needs."
}

/* ───────── MAIN COMPONENT ───────── */
export default function MockExamPage() {
  const params = useParams()
  const examId = params?.exam as string
  const sectionId = params?.module as string
  const { setExamMode } = useExamMode()

  const exam = useMemo(() => getMockExam(examId), [examId])
  const section = useMemo(
    () => exam?.sections.find((s) => s.id === sectionId),
    [exam, sectionId],
  )

  const [step, setStep] = useState<ExamStep>("info")
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: "",
    email: "",
    phone: "",
    grade: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  // Exam state
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [flagged, setFlagged] = useState<Set<number>>(new Set())
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [examStartTime, setExamStartTime] = useState<number>(0)

  // Persistent timer key
  const [timerKey, setTimerKey] = useState<number>(0)

  const answersRef = useRef(answers)
  answersRef.current = answers
  const flaggedRef = useRef(flagged)
  flaggedRef.current = flagged

  /* ─── Load and shuffle questions ─── */
  const currentQuestions = useMemo<(Question & { difficulty: string; explanation: string })[]>(() => {
    if (!exam || !section) return []
    return loadQuestions(exam, sectionId)
  }, [exam, section, sectionId])

  const totalQuestions = currentQuestions.length
  const isLastQuestion = currentQuestion >= totalQuestions - 1

  /* ─── Redirect if invalid exam/section ─── */
  useEffect(() => {
    if (!exam || !section) {
      // Will render an error state below
    }
  }, [exam, section])

  /* ─── Auto-save every 10 seconds ─── */
  useEffect(() => {
    if (step !== "exam" || examSubmitted) return
    const id = setInterval(() => {
      try {
        localStorage.setItem(
          `pb-mock-${examId}-${sectionId}`,
          JSON.stringify({
            answers: answersRef.current,
            flagged: Array.from(flaggedRef.current),
            currentQuestion,
            timestamp: Date.now(),
          }),
        )
      } catch {
        // silently ignore
      }
    }, 10000)
    return () => clearInterval(id)
  }, [step, examSubmitted, currentQuestion, examId, sectionId])

  /* ─── Sync exam mode with step ─── */
  useEffect(() => {
    if (step === "exam" && !examSubmitted) {
      setExamMode(true)
    } else {
      setExamMode(false)
    }
  }, [step, examSubmitted, setExamMode])

  /* ─── Computed results ─── */
  const totalCorrect = useMemo(() => {
    if (!examSubmitted) return 0
    return currentQuestions.filter((q) => answers[q.id] === q.correctAnswer).length
  }, [examSubmitted, answers, currentQuestions])

  const sectionScores = useMemo(() => {
    if (!examSubmitted) return []
    return [
      { name: getSectionLabel(exam!, sectionId), score: totalCorrect, total: totalQuestions },
    ]
  }, [examSubmitted, totalCorrect, totalQuestions, exam, sectionId])

  const weakAreas = useMemo(() => {
    if (!examSubmitted) return []
    const wrongByDomain: Record<string, number> = {}
    currentQuestions.forEach((q) => {
      if (answers[q.id] !== q.correctAnswer) {
        const domain = (q as any).domain || q.section
        wrongByDomain[domain] = (wrongByDomain[domain] || 0) + 1
      }
    })
    return Object.entries(wrongByDomain)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([domain, count]) => `${domain} (${count} incorrect)`)
  }, [examSubmitted, currentQuestions, answers])

  const recommendations = useMemo(() => {
    if (!examSubmitted) return []
    const recs: string[] = [getRecommendedCourse(exam?.subject ?? "", getSectionLabel(exam!, sectionId))]
    const pct = totalCorrect / totalQuestions
    if (pct < 0.5) {
      recs.push("Foundation Building: Consider our fundamentals course to strengthen core concepts before test-specific prep.")
    } else if (pct < 0.7) {
      recs.push("Skill Drills: Targeted practice in your weaker domains will significantly boost your score.")
    } else {
      recs.push("Advanced Practice: You're close to mastery — focused work on remaining gaps will push you higher.")
    }
    return recs
  }, [examSubmitted, exam, sectionId, totalCorrect, totalQuestions])

  const timeTaken = useMemo(() => {
    if (!examSubmitted) return 0
    return Math.floor((Date.now() - examStartTime) / 1000)
  }, [examSubmitted, examStartTime])

  const subjectKey = exam?.subject ?? "sat"
  const subjectInfo = subjectMeta[subjectKey] || subjectMeta.sat

  /* ─── Handlers ─── */
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
    setExamSubmitted(false)
    setExamStartTime(Date.now())
    setTimerKey((k) => k + 1)
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
    setExamSubmitted(true)
    setStep("results")
    localStorage.removeItem(`pb-mock-${examId}-${sectionId}`)
  }, [examId, sectionId])

  const handleSubmitExam = useCallback(() => {
    setExamSubmitted(true)
    setStep("results")
    localStorage.removeItem(`pb-mock-${examId}-${sectionId}`)
  }, [examId, sectionId])

  const handleRestart = () => {
    setStep("info")
    setCurrentQuestion(0)
    setAnswers({})
    setFlagged(new Set())
    setExamSubmitted(false)
    setExamStartTime(0)
    localStorage.removeItem(`pb-mock-${examId}-${sectionId}`)
  }

  const timeLimit = section ? section.timeLimit * 60 : 0

  /* ─── Error state ─── */
  if (!exam || !section) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-5">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[rgb(22,32,34)] mb-3">Exam Not Found</h1>
        <p className="text-gray-500 mb-6">
          The mock exam or section you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/mock-exams">
          <Button variant="default" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Mock Exams
          </Button>
        </Link>
      </div>
    )
  }

  /* ─── "Coming soon" state: section has no question data yet ─── */
  if (totalQuestions === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-5">
          <Clock className="h-8 w-8 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold text-[rgb(22,32,34)] mb-3">
          {exam.name} — {getSectionLabel(exam, sectionId)} is coming soon
        </h1>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Question content for this section isn&apos;t available yet. Only Digital SAT
          Reading &amp; Writing and Math sections currently include sample questions.
        </p>
        <Link href="/mock-exams">
          <Button variant="default" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Mock Exams
          </Button>
        </Link>
      </div>
    )
  }

  const sectionName = getSectionLabel(exam, sectionId)
  const Icon = subjectInfo.Icon

  /* ─── Step number for progress ─── */
  const stepNumberMap: Record<ExamStep, number> = {
    info: 1,
    instructions: 2,
    exam: 3,
    results: 4,
  }
  const stepNumber = stepNumberMap[step] ?? 1
  const totalSteps = 3 // info, instructions, exam (results is separate)

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <div className="min-h-screen bg-background">
      {/* ── Progress Bar Header ── */}
      {step !== "exam" && (
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link href="/mock-exams" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(11,79,74)] text-white text-xs font-bold transition-transform group-hover:scale-105">
                A
              </div>
              <span className="text-sm font-bold text-[rgb(11,79,74)]">Mock Exam</span>
            </Link>
            {step !== "results" && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                        stepNumber === s
                          ? "bg-[rgb(11,79,74)] text-white shadow-sm shadow-[rgb(11,79,74)]/30 scale-110"
                          : stepNumber > s
                            ? "bg-emerald-500 text-white shadow-sm shadow-emerald-300"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {stepNumber > s ? <CheckCircle2 className="h-3.5 w-3.5" /> : s}
                    </div>
                    <span className="hidden sm:inline font-medium">
                      {s === 1 ? "Information" : s === 2 ? "Instructions" : "Exam"}
                    </span>
                    {s < totalSteps && <ChevronRight className="h-3 w-3 text-gray-300" />}
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

      {/* ──────────────────────────────────────────────────────────── */}
      {/* STEP "info": Student Information */}
      {/* ──────────────────────────────────────────────────────────── */}
      {step === "info" && (
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <Badge className="mb-5 px-4 py-1.5 text-xs tracking-wider uppercase bg-[rgb(11,79,74)] text-white">
              {exam.name} — {sectionName}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-[rgb(22,32,34)] mb-3 tracking-tight">
              Student Information
            </h1>
            <p className="text-gray-500 text-base">
              Tell us a bit about yourself before starting the exam.
            </p>
          </div>

          {/* Demo notice */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 mb-6">
            <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold">Demo assessment — not a live exam.</p>
              <p className="mt-0.5">
                This is a static preview and your results are not saved or scored against a real
                question bank. Full mock exams are coming soon.
              </p>
            </div>
          </div>

          <Card className="border-gray-200/60 shadow-sm">
            <CardContent className="p-7 space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-[rgb(22,32,34)] block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={studentInfo.name}
                  onChange={(e) => {
                    setStudentInfo({ ...studentInfo, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: undefined })
                  }}
                  className={errors.name ? "border-red-500 ring-red-500/20" : ""}
                />
                {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[rgb(22,32,34)] block">
                  Email Address <span className="text-red-500">*</span>
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
                  className={errors.email ? "border-red-500 ring-red-500/20" : ""}
                />
                {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-[rgb(22,32,34)] block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  placeholder="+20 100 000 0000"
                  value={studentInfo.phone}
                  onChange={(e) => {
                    setStudentInfo({ ...studentInfo, phone: e.target.value })
                    if (errors.phone) setErrors({ ...errors, phone: undefined })
                  }}
                  className={errors.phone ? "border-red-500 ring-red-500/20" : ""}
                />
                {errors.phone && <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="grade" className="text-sm font-semibold text-[rgb(22,32,34)] block">
                  Grade / Year <span className="text-red-500">*</span>
                </label>
                <Input
                  id="grade"
                  placeholder="e.g., Grade 11, Year 12, University"
                  value={studentInfo.grade}
                  onChange={(e) => {
                    setStudentInfo({ ...studentInfo, grade: e.target.value })
                    if (errors.grade) setErrors({ ...errors, grade: undefined })
                  }}
                  className={errors.grade ? "border-red-500 ring-red-500/20" : ""}
                />
                {errors.grade && <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.grade}</p>}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-8">
            <Link href="/mock-exams">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </Link>
            <Button onClick={handleInfoSubmit} className="gap-2 shadow-sm shadow-[rgb(11,79,74)]/20">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* STEP "instructions": Exam Instructions */}
      {/* ──────────────────────────────────────────────────────────── */}
      {step === "instructions" && (
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <Badge className="mb-5 px-4 py-1.5 text-xs tracking-wider uppercase bg-[rgb(11,79,74)] text-white">
              Step 2 of {totalSteps} — Get Ready
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-[rgb(22,32,34)] mb-3 tracking-tight">
              Exam Instructions
            </h1>
            <p className="text-gray-500 text-base">
              Review the guidelines before starting your mock exam.
            </p>
          </div>

          <Card className="border-gray-200/60 shadow-sm overflow-hidden">
            {/* Header banner */}
            <div className="bg-gradient-to-r from-[rgb(11,79,74)]/5 to-[rgb(11,79,74)]/10 border-b border-gray-200/40 px-7 py-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${subjectInfo.color === "text-blue-600" ? "bg-blue-100" : subjectInfo.color === "text-emerald-600" ? "bg-emerald-100" : subjectInfo.color === "text-orange-600" ? "bg-orange-100" : "bg-teal-100"} shrink-0`}>
                  <Icon className={`h-5 w-5 ${subjectInfo.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg text-[rgb(11,79,74)]">
                    {exam.name}
                  </CardTitle>
                  <CardDescription>{sectionName} Section</CardDescription>
                </div>
              </div>
            </div>

            <CardContent className="p-7 space-y-6">
              {/* Key info boxes */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl bg-[rgb(11,79,74)]/5 border border-[rgb(11,79,74)]/10 p-5 text-center">
                  <FileText className={`h-6 w-6 ${subjectInfo.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-[rgb(22,32,34)]">{totalQuestions}</p>
                  <p className="text-xs text-gray-500">Questions</p>
                </div>
                <div className="rounded-xl bg-[rgb(200,120,90)]/10 border border-[rgb(200,120,90)]/20 p-5 text-center">
                  <Clock className="h-6 w-6 text-[rgb(200,120,90)] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[rgb(22,32,34)]">{section.timeLimit}:00</p>
                  <p className="text-xs text-gray-500">Time Limit</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center">
                  <Layers className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[rgb(22,32,34)]">{section.name}</p>
                  <p className="text-xs text-gray-500">Section</p>
                </div>
                <div className="rounded-xl bg-purple-50 border border-purple-200 p-5 text-center">
                  <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-[rgb(22,32,34)]">{exam.difficulty}</p>
                  <p className="text-xs text-gray-500">Difficulty</p>
                </div>
              </div>

              {/* Rules */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[rgb(22,32,34)] flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[rgb(200,120,90)]/10 text-[rgb(200,120,90)]">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  Exam Rules
                </h3>
                <ul className="space-y-3 text-sm text-gray-500">
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
                </ul>
              </div>

              {/* Summary */}
              <div className="rounded-xl bg-gray-50 border border-gray-200/70 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(11,79,74)]/10 text-[rgb(11,79,74)] shrink-0 mt-0.5">
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[rgb(22,32,34)] mb-0.5">
                      You selected: {exam.name} — {sectionName}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {totalQuestions} questions · {section.timeLimit} minutes · {exam.difficulty} difficulty
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" onClick={() => setStep("info")} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handleStartExam}
              size="lg"
              className="gap-2 shadow-sm shadow-[rgb(11,79,74)]/20"
            >
              Start Exam <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* STEP "exam": The Exam Screen */}
      {/* ──────────────────────────────────────────────────────────── */}
      {step === "exam" && (
        <div className="min-h-screen bg-[#f6f6f6] flex flex-col">
          {/* ── Fixed Header ── */}
          <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
            <div className="px-4 py-2.5 flex items-center justify-between max-w-screen-2xl mx-auto">
              {/* Left: Exam name + progress */}
              <div className="flex items-center gap-3 min-w-0">
                <Link href="/mock-exams" className="flex items-center gap-2 shrink-0">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgb(11,79,74)] text-white text-[10px] font-bold">
                    A
                  </div>
                </Link>
                <div className="hidden sm:block">
                  <span className="text-sm font-bold text-[rgb(22,32,34)]">
                    {exam.name}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{sectionName}</span>
                  <Badge
                    variant="outline"
                    className="ml-2 text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 border-amber-300"
                  >
                    Demo
                  </Badge>
                </div>
                <div className="h-5 w-px bg-gray-200 hidden sm:block" />
                <span className="text-xs font-medium text-gray-500 whitespace-nowrap bg-gray-100 px-2.5 py-1 rounded-full">
                  Q{currentQuestion + 1}/{totalQuestions}
                </span>
              </div>

              {/* Center: Timer */}
              <div className="flex-1 max-w-xs mx-4 hidden md:block">
                <Timer
                  key={timerKey}
                  timeLimit={timeLimit}
                  onTimeUp={handleTimeUp}
                />
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {/* Mobile timer */}
                <div className="md:hidden">
                  <Timer
                    key={`mobile-${timerKey}`}
                    timeLimit={timeLimit}
                    onTimeUp={handleTimeUp}
                  />
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-xs gap-1.5"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to submit your exam?")) {
                      handleSubmitExam()
                    }
                  }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Submit
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
                    key={`q-${currentQuestions[currentQuestion].id}`}
                    question={currentQuestions[currentQuestion]}
                    selectedAnswer={answers[currentQuestions[currentQuestion].id] ?? null}
                    onAnswer={(answer) => handleSelectAnswer(currentQuestions[currentQuestion].id, answer)}
                  />
                )}

                {/* ── Navigation bar ── */}
                <div className="bg-card rounded-xl border border-gray-200/60 p-3.5 flex items-center justify-between gap-2 shadow-sm">
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
                          ? "text-[rgb(200,120,90)] bg-[rgb(200,120,90)]/10"
                          : "text-gray-400"
                      }`}
                    >
                      {flagged.has(currentQuestions[currentQuestion].id) ? (
                        <Flag className="h-4 w-4 fill-[rgb(200,120,90)]" />
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
                        onClick={() => {
                          if (window.confirm("Are you sure you want to submit your exam?")) {
                            handleSubmitExam()
                          }
                        }}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Submit Exam
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

      {/* ──────────────────────────────────────────────────────────── */}
      {/* STEP "results": Score Report */}
      {/* ──────────────────────────────────────────────────────────── */}
      {step === "results" && (
        <div className="max-w-4xl mx-auto px-6 py-10">
          <ResultsDashboard
            score={totalCorrect}
            totalQuestions={totalQuestions}
            sectionScores={sectionScores.map((s) => ({ name: s.name, score: s.score, total: s.total }))}
            answers={answers}
            questions={currentQuestions}
            weakAreas={weakAreas}
            recommendations={recommendations}
            timeTaken={timeTaken}
            examType={`${exam.name} — ${sectionName}`}
          />

          {/* ── CTA Section ── */}
          <div className="mt-10 space-y-5">
            {/* Main CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgb(11,79,74)] via-[rgb(11,79,74)] to-[rgb(22,32,34)] p-1 shadow-xl">
              <div className="relative rounded-2xl bg-gradient-to-br from-[rgb(11,79,74)]/95 via-[rgb(11,79,74)/95] to-[rgb(22,32,34)/95] px-8 py-10 md:py-12 md:px-12">
                <div className="text-center">
                  <Sparkles className="h-8 w-8 text-[rgb(200,120,90)] mx-auto mb-4" />
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
                      href="mailto:hello@lumaani.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button
                        variant="outline"
                        size="xl"
                        className="border-white/30 bg-transparent text-white hover:bg-white/15 hover:text-white gap-2 group"
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
              <p className="text-xs text-gray-500">
                Have questions? Reach out to us on{" "}
                <a
                  href="mailto:hello@lumaani.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(11,79,74)] hover:text-[rgb(11,79,74)] font-medium underline underline-offset-2"
                >
                  WhatsApp
                </a>{" "}
                or visit our{" "}
                <Link href="/contact" className="text-[rgb(11,79,74)] hover:text-[rgb(11,79,74)] font-medium underline underline-offset-2">
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