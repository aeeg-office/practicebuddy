'use client'

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Clock, ArrowRight, ArrowLeft, Flag, BookOpen, BarChart3, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { QuestionRenderer, type PracticeState, type QuestionData } from "@/components/question-renderer"

// SAT Module definitions
const SAT_MODULES = [
  { id: "rw-m1", name: "Reading & Writing Module 1", time: 32, questions: 27 },
  { id: "rw-m2", name: "Reading & Writing Module 2", time: 32, questions: 27 },
  { id: "math-m1", name: "Math Module 1", time: 35, questions: 22, calculator: true },
  { id: "math-m2", name: "Math Module 2", time: 35, questions: 22, calculator: true },
]

export default function SATSimulationPage() {
  const { token, isAuthenticated } = useAuth()
  const router = useRouter()
  const [phase, setPhase] = useState<"intro" | "running" | "break_rw" | "break_math" | "complete">("intro")
  const [currentModule, setCurrentModule] = useState(0)
  const [currentQ, setCurrentQ] = useState(0)
  const [questions, setQuestions] = useState<QuestionData[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [results, setResults] = useState<Record<string, { correct: boolean; answer: string }>>({})
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [state, setState] = useState<PracticeState>("idle")
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [attemptResult, setAttemptResult] = useState<{ correct: boolean; correctAnswer: string; explanation: string | null; strategy: string | null } | null>(null)
  const [flagged, setFlagged] = useState<Set<number>>(new Set())

  const module = SAT_MODULES[currentModule]
  const totalQuestions = questions.length
  const currentQuestion = questions[currentQ]

  // Timer
  useEffect(() => {
    if (phase !== "running" || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer)
          handleModuleComplete()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [phase, timeLeft, currentModule])

  // Load questions when module changes
  useEffect(() => {
    if (phase !== "running") return
    loadModuleQuestions()
  }, [currentModule, phase])

  const loadModuleQuestions = useCallback(async () => {
    setLoading(true)
    setCurrentQ(0)
    setAnswers({})
    setResults({})
    setState("idle")
    setSelectedAnswer(null)
    setAttemptResult(null)
    setFlagged(new Set())
    setTimeLeft(module.time * 60)

    try {
      const subject = module.id.startsWith("rw") ? "reading" : "math"
      const res = await fetch(`/api/practice/questions?subject=${subject}&limit=${module.questions}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (res.ok) {
        const data = await res.json()
        const qs = (data.questions ?? []).map((q: any) => ({
          id: q.id,
          stem: q.stem,
          format: q.format === "numeric" ? "numeric" : "multiple-choice" as any,
          options: q.options,
          correctAnswer: q.correctAnswer || "",
          explanation: q.explanation,
          strategy: q.strategy,
          passage: q.passage,
          difficulty: q.difficulty,
          skillId: q.skillId,
        }))
        setQuestions(qs)
      }
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [currentModule, module, token])

  const handleSelectAnswer = (answer: string) => {
    if (state === "idle" || state === "selected") {
      setSelectedAnswer(answer)
      setState("selected")
    } else if (state === "incorrect_a1" || state === "strategy") {
      setSelectedAnswer(answer)
      setState("selected_a2")
    }
  }

  const handleSubmit = async () => {
    if (!currentQuestion || !selectedAnswer) return
    if (state === "selected") {
      setState("submitted_a1")
      const correct = selectedAnswer === currentQuestion.correctAnswer
      if (correct) {
        setState("correct_a1")
      } else {
        setState("incorrect_a1")
      }
      setAttemptResult({
        correct,
        correctAnswer: currentQuestion.correctAnswer,
        explanation: currentQuestion.explanation ?? null,
        strategy: currentQuestion.strategy ?? null,
      })
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswer }))
      setResults(prev => ({ ...prev, [currentQuestion.id]: { correct, answer: selectedAnswer } }))
    } else if (state === "selected_a2") {
      setState("submitted_a2")
      const correct = selectedAnswer === currentQuestion.correctAnswer
      setState(correct ? "correct_a2" : "incorrect_a2")
      setAttemptResult({
        correct,
        correctAnswer: currentQuestion.correctAnswer,
        explanation: currentQuestion.explanation ?? null,
        strategy: currentQuestion.strategy ?? null,
      })
    }
  }

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ(q => q + 1)
      setState("idle")
      setSelectedAnswer(null)
      setAttemptResult(null)
    } else {
      handleModuleComplete()
    }
  }

  const handleModuleComplete = () => {
    if (currentModule < SAT_MODULES.length - 1) {
      setCurrentModule(m => m + 1)
      if (currentModule === 0) {
        setPhase("break_rw")
      } else if (currentModule === 2) {
        setPhase("break_math")
      }
    } else {
      setPhase("complete")
    }
  }

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(currentQ)) next.delete(currentQ)
      else next.add(currentQ)
      return next
    })
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  // Intro phase
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <BookOpen className="h-16 w-16 mx-auto mb-4" style={{ color: "rgb(71,32,183)" }} />
              <h1 className="text-3xl font-bold text-foreground mb-2">SAT Full-Length Simulation</h1>
              <p className="text-muted-foreground">A complete Digital SAT practice test with real timing</p>
            </div>

            <div className="space-y-3 bg-muted/30 rounded-lg p-5">
              <h3 className="font-semibold text-foreground">Test Structure</h3>
              {SAT_MODULES.map((m, i) => (
                <div key={m.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="font-medium">{m.questions} questions · {m.time} min</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>98 questions · 134 minutes</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                size="lg"
                onClick={() => { setPhase("running"); loadModuleQuestions() }}
              >
                Begin Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Break phase
  if (phase === "break_rw" || phase === "break_math") {
    const nextModule = SAT_MODULES[currentModule]
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardContent className="p-8 text-center space-y-4">
            <Clock className="h-16 w-16 mx-auto mb-2" style={{ color: "rgb(71,32,183)" }} />
            <h2 className="text-2xl font-bold text-foreground">Break Time</h2>
            <p className="text-muted-foreground">You&apos;ve completed the {phase === "break_rw" ? "Reading & Writing" : "Math"} section.</p>
            <p className="text-sm text-muted-foreground">Take a short break. The next section will begin when you&apos;re ready.</p>
            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="font-semibold text-foreground">Up Next: {nextModule.name}</p>
              <p className="text-sm text-muted-foreground">{nextModule.questions} questions · {nextModule.time} minutes</p>
            </div>
            <Button size="lg" className="mt-4" onClick={() => { setPhase("running"); loadModuleQuestions() }}>
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Results phase
  if (phase === "complete") {
    const total = Object.keys(results).length
    const correct = Object.values(results).filter(r => r.correct).length
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 text-center space-y-6">
            <BarChart3 className="h-16 w-16 mx-auto mb-2" style={{ color: "rgb(71,32,183)" }} />
            <h1 className="text-3xl font-bold text-foreground">Test Complete</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-3xl font-bold" style={{ color: "rgb(71,32,183)" }}>{correct}/{total}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-3xl font-bold" style={{ color: "rgb(245,166,35)" }}>{accuracy}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-3xl font-bold" style={{ color: "rgb(30,39,97)" }}>{total - correct}</p>
                <p className="text-xs text-muted-foreground">Incorrect</p>
              </div>
            </div>
            <Button variant="default" size="lg" onClick={() => router.push("/practice")}>
              Continue Practicing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Running phase
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "rgb(71,32,183)" }} />
        <p className="ml-3 text-muted-foreground">Loading questions...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs font-mono">
              {module.name}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Q {currentQ + 1} of {totalQuestions}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleFlag}
              className={`p-2 rounded-lg transition-colors ${flagged.has(currentQ) ? "text-amber-500 bg-amber-50" : "text-muted-foreground hover:bg-muted/50"}`}
              title="Flag for review"
            >
              <Flag className="h-5 w-5" />
            </button>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${
              timeLeft < 120 ? "bg-red-50 text-red-600" : timeLeft < 300 ? "bg-amber-50 text-amber-600" : "bg-muted/30 text-muted-foreground"
            }`}>
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </header>

      {/* Question Navigator */}
      <div className="max-w-5xl mx-auto px-4 py-2 flex gap-1 overflow-x-auto">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentQ(i); setState("idle"); setSelectedAnswer(null); setAttemptResult(null) }}
            className={`w-8 h-8 rounded text-xs font-medium transition-colors shrink-0 border ${
              i === currentQ
                ? "bg-primary text-white border-primary"
                : results[questions[i]?.id]
                ? results[questions[i]?.id].correct
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-red-100 text-red-700 border-red-300"
                : flagged.has(i)
                ? "bg-amber-100 text-amber-700 border-amber-300"
                : "bg-white text-muted-foreground border-border hover:bg-muted/50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {currentQuestion && (
            <QuestionRenderer
              question={currentQuestion}
              questionNumber={currentQ + 1}
              totalQuestions={totalQuestions}
              state={state}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              onSubmit={handleSubmit}
              onNext={handleNext}
              attemptResult={attemptResult}
              loading={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}