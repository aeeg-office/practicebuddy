'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  BarChart3,
  BookOpen,
  Target,
  Award,
  Loader2,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  mockSkills,
  mockSubjectMeta,
  type SubjectKey,
  type Difficulty,
  type Skill,
} from "@/data/practice-skills"
import { type PracticeQuestion } from "@/lib/question-loader"
import { useAuth } from "@/lib/auth-context"
import {
  saveAttempt,
  saveSessionRecord,
  saveSessionState,
  clearSessionState,
  calculateSkillMastery,
  type AttemptRecord,
  type SessionRecord,
} from "@/lib/progress-tracker"
import type { MasteryLevel } from "@/data/practice-skills"

/* ────── Difficulty Colors ────── */
const diffColors: Record<Difficulty, string> = {
  easy: "text-emerald-600 bg-emerald-100",
  medium: "text-[#f5a623] bg-[#f5a623]/10",
  hard: "text-red-500 bg-red-100",
}

/* ────── Practice Session Component ────── */
export default function SkillPracticePage() {
  const params = useParams()
  const subject = params.subject as SubjectKey
  const skillId = params.skillId as string
  const isPracticeAll = skillId === "practice-all"

  // State
  const [questions, setQuestions] = useState<PracticeQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [results, setResults] = useState<{ qIdx: number; correct: boolean; selected: number }[]>([])
  const [sessionComplete, setSessionComplete] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [sessionId] = useState(() => crypto.randomUUID?.() ?? `session-${Date.now()}`)
  const [saving, setSaving] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { token, isAuthenticated } = useAuth()

  useEffect(() => {
    setIsLoggedIn(isAuthenticated)
  }, [isAuthenticated])

  // Save session results when session completes
  useEffect(() => {
    if (!sessionComplete || results.length === 0) return

    const correct = results.filter((r) => r.correct).length
    const total = results.length
    const elapsed = Math.floor((Date.now() - startTime) / 1000)

    // 1. Save locally (always works, even offline)
    const sessionRecord: SessionRecord = {
      id: sessionId,
      subject,
      skillId: isPracticeAll ? null : skillId,
      skillName,
      startedAt: startTime,
      completedAt: Date.now(),
      questionCount: total,
      correctCount: correct,
      totalTime: elapsed,
      completed: true,
    }
    saveSessionRecord(sessionRecord)
    clearSessionState()

    // 2. Save each attempt locally
    for (const r of results) {
      const q = questions[r.qIdx]
      if (!q) continue
      const attempt: AttemptRecord = {
        questionId: q.id,
        skillId: isPracticeAll ? "practice-all" : skillId,
        subject,
        correct: r.correct,
        answer: q.options ? (JSON.parse(q.options) as any[])[r.selected]?.id ?? "" : "",
        timeSpent: 0, // per-question timing not tracked
        timestamp: Date.now(),
        sessionId,
      }
      saveAttempt(attempt)
    }

    // 3. Save to API (if authenticated)
    if (token) {
      setSaving(true)
      fetch("/api/practice/progress/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          skillId: isPracticeAll ? null : skillId,
          skillName,
          questionCount: total,
          correctCount: correct,
          totalTime: elapsed,
          mode: "targeted",
          difficulty: "mixed",
          completed: true,
        }),
      })
        .catch((err) => console.error("Failed to save session:", err))
        .finally(() => setSaving(false))
    }
  }, [sessionComplete])

  // Fetch real questions from the API
  async function loadQuestions() {
    setLoading(true)
    setError(null)
    try {
      const query = new URLSearchParams({ subject })
      if (!isPracticeAll) query.set("skill", skillId)
      query.set("limit", "10")
      const res = await fetch(`/api/practice/questions?${query.toString()}`)
      if (!res.ok) {
        throw new Error("Failed to load questions. Please try again.")
      }
      const data = await res.json()
      // Only keep multiple-choice questions (grid-ins have no options)
      setQuestions((data.questions ?? []).filter((q: PracticeQuestion) => q.options && JSON.parse(q.options).length > 0))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuestions()
  }, [subject, skillId, isPracticeAll])

  // Validate subject
  if (!mockSkills[subject]) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center py-20">
        <HelpCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Subject Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find &ldquo;{subject}&rdquo; in our practice platform.</p>
        <Link href="/practice"><Button>Back to Practice Home</Button></Link>
      </div>
    )
  }

  const data = mockSkills[subject]
  const meta = mockSubjectMeta[subject]
  const allSkills = data.domains.flatMap((d) => d.skills)

  // Find target skill(s)
  let targetSkills: Skill[] = []
  if (isPracticeAll) {
    targetSkills = allSkills
  } else {
    const found = allSkills.find((s) => s.id === skillId)
    if (!found) {
      return (
        <div className="p-8 max-w-7xl mx-auto text-center py-20">
          <HelpCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Skill Not Found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find that skill in our practice platform.</p>
          <Link href={`/practice/${subject}`}><Button>Back to {data.name} Practice</Button></Link>
        </div>
      )
    }
    targetSkills = [found]
  }

  const skillName = isPracticeAll ? data.name : (targetSkills[0]?.name ?? data.name)

  // Loading state
  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <Loader2 className="h-10 w-10 text-[#1a237e] animate-spin mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-1">Loading questions…</h2>
          <p className="text-sm text-muted-foreground">
            Fetching practice questions for {skillName} from the question bank.
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <Card className="border border-red-200 bg-red-50 shadow-sm">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-[#1a237e] hover:bg-[#3a1a9c] font-semibold shadow-md"
                onClick={loadQuestions}
              >
                <RotateCcw className="h-4 w-4 mr-2" /> Try Again
              </Button>
              <Link href={`/practice/${subject}`}>
                <Button variant="outline" size="lg">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Skills
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQ]
  if (!question) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center py-20">
        <HelpCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Questions Available</h2>
        <p className="text-muted-foreground mb-6">This skill doesn't have questions yet.</p>
        <Link href={`/practice/${subject}`}><Button>Back to {data.name} Practice</Button></Link>
      </div>
    )
  }

  const parsedOptions = question.options ? (JSON.parse(question.options) as { id: string; text: string }[]) : []

  const correctOptionId = question.correctAnswer
  const correctOption = parsedOptions.find((o) => o.id === correctOptionId)

  const handleAnswer = (idx: number) => {
    if (answered) return
    const newResults = [...results, { qIdx: currentQ, correct: parsedOptions[idx]?.id === correctOptionId, selected: idx }]
    setSelectedAnswer(idx)
    setAnswered(true)
    setResults(newResults)
    // Persist session state so a page refresh doesn't lose progress
    saveSessionState({
      currentQuestion: currentQ,
      answers: newResults,
      startedAt: startTime,
      questions: questions.map((q) => ({ id: q.id })),
    })
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setSessionComplete(true)
    }
  }

  // Current mastery level for this skill (from local history)
  const currentMastery = isPracticeAll
    ? null
    : calculateSkillMastery(skillId, targetSkills[0]?.name)
  const masteryPct = currentMastery && currentMastery.attempted > 0
    ? Math.round(currentMastery.accuracy * 100)
    : null

  const masteryColors: Record<MasteryLevel, string> = {
    "not-assessed": "bg-muted",
    beginning: "bg-red-400",
    developing: "bg-[#f5a623]",
    approaching: "bg-yellow-400",
    mastered: "bg-emerald-500",
  }

  if (sessionComplete) {
    const correct = results.filter((r) => r.correct).length
    const total = results.length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    const elapsed = Math.floor((Date.now() - startTime) / 1000)
    const minutes = Math.floor(elapsed / 60)
    const seconds = elapsed % 60

    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#1a237e] to-[#1e2761] text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="relative p-8 md:p-10 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 mb-6">
              <Award className="h-10 w-10 text-[#f5a623]" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Session Complete!</h1>
            <p className="text-white/70 mb-6">You completed {total} questions in {minutes}m {seconds}s</p>
            {saving && (
              <p className="text-sm text-[#f5a623] mb-4 flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving your progress…
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 rounded-xl p-4">
                <BarChart3 className="h-6 w-6 mx-auto mb-2 text-[#f5a623]" />
                <p className="text-2xl font-bold">{pct}%</p>
                <p className="text-xs text-white/60">Score</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-emerald-400" />
                <p className="text-2xl font-bold">{correct}</p>
                <p className="text-xs text-white/60">Correct</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <XCircle className="h-6 w-6 mx-auto mb-2 text-red-400" />
                <p className="text-2xl font-bold">{total - correct}</p>
                <p className="text-xs text-white/60">Incorrect</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <Target className="h-6 w-6 mx-auto mb-2 text-[#f5a623]" />
                <p className="text-2xl font-bold">{isPracticeAll ? allSkills.length : 1}</p>
                <p className="text-xs text-white/60">Skills</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/practice/${subject}`}>
                <Button variant="accent" size="lg" className="font-semibold shadow-lg">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Skills
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                onClick={() => {
                  setCurrentQ(0)
                  setSelectedAnswer(null)
                  setAnswered(false)
                  setResults([])
                  setSessionComplete(false)
                  setStartTime(Date.now())
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" /> Retry Session
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href={`/practice/${subject}`} className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{meta.icon}</span>
              <h1 className="text-xl font-bold text-foreground">{skillName}</h1>
              <Badge className={diffColors[question.difficulty as Difficulty] || ""}>
                {question.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Question {currentQ + 1} of {questions.length}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-[#1a237e]">
            {Math.round((results.filter((r) => r.correct).length / Math.max(results.length, 1)) * 100)}%
          </p>
          <p className="text-xs text-muted-foreground">Current Score</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-muted/60 mb-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#1a237e] to-[#f5a623] transition-all duration-500"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Mastery indicator */}
      {currentMastery && currentMastery.attempted > 0 && (
        <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-muted/30 border border-border/40">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">
                Mastery: {currentMastery.level}
              </span>
              <span className="text-xs font-bold text-foreground">{masteryPct}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${masteryColors[currentMastery.level]}`}
                style={{ width: `${masteryPct}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-muted-foreground shrink-0">
            {currentMastery.correct}/{currentMastery.attempted} correct
          </div>
        </div>
      )}

      {/* Question Card */}
      <Card className="border border-border/50 shadow-sm mb-6">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              {skillName}
            </Badge>
            {results.length > 0 && (
              <Badge variant="outline" className="text-xs">
                <CheckCircle className={`h-3 w-3 mr-1 ${results[results.length - 1]?.correct ? "text-emerald-500" : "text-red-500"}`} />
                {results[results.length - 1]?.correct ? "Previous: Correct" : "Previous: Incorrect"}
              </Badge>
            )}
          </div>

          {/* Passage (when present) */}
          {question.passage && (
            <div className="mb-6 p-4 md:p-5 rounded-xl bg-muted/40 border border-border/50">
              <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {question.passage}
              </p>
            </div>
          )}

          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-6 leading-relaxed">
            {question.stem}
          </h2>

          <div className="space-y-3">
            {parsedOptions.map((option, idx) => {
              const isCorrectOption = option.id === correctOptionId
              let borderClass = "border-border/60 hover:border-[#1a237e]/30 hover:bg-[#1a237e]/5"
              if (answered) {
                if (isCorrectOption) {
                  borderClass = "border-emerald-500 bg-emerald-50"
                } else if (idx === selectedAnswer && !isCorrectOption) {
                  borderClass = "border-red-500 bg-red-50"
                } else {
                  borderClass = "border-border/30 opacity-60"
                }
              } else if (selectedAnswer === idx) {
                borderClass = "border-[#1a237e] bg-[#1a237e]/5"
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(idx)}
                  disabled={answered}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${borderClass}`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    answered
                      ? isCorrectOption
                        ? "bg-emerald-500 text-white"
                        : idx === selectedAnswer
                        ? "bg-red-500 text-white"
                        : "bg-muted text-muted-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {answered && isCorrectOption ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : answered && idx === selectedAnswer && !isCorrectOption ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      option.id
                    )}
                  </div>
                  <span className="text-sm md:text-base font-medium text-foreground">{option.text}</span>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Explanation (shown after answering) */}
      {answered && (
        <Card className="border border-border/50 shadow-sm mb-6 bg-gradient-to-r from-[#1a237e]/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              {selectedAnswer !== null && parsedOptions[selectedAnswer]?.id === correctOptionId ? (
                <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold text-foreground mb-1">
                  {selectedAnswer !== null && parsedOptions[selectedAnswer]?.id === correctOptionId ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm text-muted-foreground">
                  The correct answer is <strong>{correctOptionId}</strong>: {correctOption?.text ?? ""}
                </p>
                {question.explanation ? (
                  <p className="text-sm text-muted-foreground mt-2">{question.explanation}</p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">
                    This question tests your understanding of <strong>{skillName}</strong>. Practice more questions in this skill area to improve your mastery level.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next button */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {results.filter((r) => r.correct).length} / {results.length} correct
        </p>
        {answered && (
          <Button onClick={handleNext} variant="default" size="lg" className="bg-[#1a237e] hover:bg-[#3a1a9c] font-semibold shadow-md">
            {currentQ < questions.length - 1 ? (
              <>Next Question <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              <>View Results <Award className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
