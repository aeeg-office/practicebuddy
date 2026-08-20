'use client'

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Clock, Users, BarChart3, Play, Pause, SkipForward, Lightbulb, BookOpen, Send, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { QuestionRenderer, type PracticeState, type QuestionData } from "@/components/question-renderer"

export default function LiveClassroomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>}>
      <LiveClassroomContent />
    </Suspense>
  )
}

function LiveClassroomContent() {
  const searchParams = useSearchParams()
  const role = (searchParams.get("role") || "teacher") as "teacher" | "student"
  const { token } = useAuth()

  // Teacher state
  const [questions, setQuestions] = useState<QuestionData[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [sessionActive, setSessionActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120)
  const [timerRunning, setTimerRunning] = useState(false)
  const [showStrategy, setShowStrategy] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studentResponses, setStudentResponses] = useState<Record<string, { count: number; percent: number }>>({})
  const [studentStatus, setStudentStatus] = useState<{ name: string; status: string; answer?: string }[]>([
    { name: "Student 1", status: "awaiting" },
    { name: "Student 2", status: "answered" },
    { name: "Student 3", status: "awaiting" },
    { name: "Student 4", status: "correct" },
    { name: "Student 5", status: "incorrect" },
  ])

  // Student state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<{ correct: boolean; correctAnswer: string } | null>(null)
  const [state, setState] = useState<PracticeState>("idle")

  // Timer
  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { setTimerRunning(false); return 0 } return t - 1 })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerRunning, timeLeft])

  // Load questions
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/practice/questions?subject=math&limit=8", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        if (res.ok) {
          const data = await res.json()
          setQuestions((data.questions ?? []).map((q: any) => ({
            id: q.id,
            stem: q.stem,
            format: "multiple-choice" as const,
            options: q.options,
            correctAnswer: q.correctAnswer || "",
            explanation: q.explanation,
            strategy: q.strategy,
            passage: q.passage,
            difficulty: q.difficulty,
            skillId: q.skillId,
          })))
        }
      } catch { /* ignore */ }
    }
    load()
  }, [])

  const currentQuestion = questions[currentQ]

  const startSession = () => {
    setSessionActive(true)
    setTimeLeft(120)
    setTimerRunning(true)
    setShowStrategy(false)
    setShowAnswer(false)
    setStudentResponses({})
    setStudentStatus(s => s.map(st => ({ ...st, status: "awaiting" })))
  }

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1)
      setTimeLeft(120)
      setTimerRunning(true)
      setShowStrategy(false)
      setShowAnswer(false)
      setSelectedAnswer(null)
      setSubmitted(false)
      setResult(null)
      setState("idle")
      setStudentStatus(s => s.map(st => ({ ...st, status: "awaiting" })))
    }
  }

  const extendTimer = () => {
    setTimeLeft(t => t + 30)
  }

  const handleStudentSubmit = () => {
    if (!currentQuestion || !selectedAnswer) return
    setSubmitted(true)
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setResult({ correct, correctAnswer: currentQuestion.correctAnswer })
    setState(correct ? "correct_a1" : "incorrect_a1")
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading classroom...</p>
      </div>
    )
  }

  // Teacher View
  if (role === "teacher") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="accent" className="text-xs">LIVE</Badge>
                <Badge variant="outline">Q {currentQ + 1} of {questions.length}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={startSession} disabled={sessionActive}>
                  <Play className="h-4 w-4 mr-1" /> Start
                </Button>
                <Button variant="outline" size="sm" onClick={() => setTimerRunning(!timerRunning)} disabled={!sessionActive}>
                  {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={extendTimer} disabled={!sessionActive}>
                  +30s
                </Button>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <QuestionRenderer
                  question={currentQuestion}
                  questionNumber={currentQ + 1}
                  totalQuestions={questions.length}
                  state={showAnswer ? "complete" : state}
                  selectedAnswer={selectedAnswer}
                  onSelectAnswer={(a) => setSelectedAnswer(a)}
                  onSubmit={() => {}}
                  onNext={() => {}}
                  attemptResult={result ? { correct: result.correct, correctAnswer: result.correctAnswer, explanation: currentQuestion.explanation ?? null, strategy: currentQuestion.strategy ?? null } : null}
                  loading={false}
                />
              </CardContent>
            </Card>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowStrategy(!showStrategy)}>
                <Lightbulb className="h-4 w-4 mr-1" /> Strategy
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAnswer(!showAnswer)}>
                <BookOpen className="h-4 w-4 mr-1" /> Reveal Answer
              </Button>
              <Button variant="default" size="sm" onClick={nextQuestion} disabled={!sessionActive}>
                <SkipForward className="h-4 w-4 mr-1" /> Next Q
              </Button>
            </div>
          </div>

          {/* Teacher Dashboard Sidebar */}
          <div className="space-y-4">
            {/* Timer */}
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`text-4xl font-bold font-mono ${timeLeft < 30 ? "text-red-500" : timeLeft < 60 ? "text-amber-500" : "text-foreground"}`}>
                  {formatTime(timeLeft)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Time Remaining</p>
              </CardContent>
            </Card>

            {/* Response Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Response Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentQuestion.options && JSON.parse(currentQuestion.options).map((opt: any, i: number) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      <span className="text-xs font-mono w-6">{String.fromCharCode(65 + i)}</span>
                      <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${opt.id === currentQuestion.correctAnswer ? "bg-green-500" : "bg-primary/30"}`}
                          style={{ width: `${Math.random() * 60 + 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">0</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Students ({studentStatus.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                {studentStatus.map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-sm py-1">
                    <span className="font-medium">{s.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      s.status === "correct" ? "bg-green-100 text-green-700" :
                      s.status === "incorrect" ? "bg-red-100 text-red-700" :
                      s.status === "answered" ? "bg-blue-100 text-blue-700" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Student View
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 bg-gradient-to-r from-primary to-secondary text-white px-4 h-12 flex items-center">
        <Badge variant="accent" className="text-[10px] mr-3">LIVE</Badge>
        <span className="text-sm font-medium">Follow your teacher</span>
        <span className="ml-auto font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
        </div>
        <QuestionRenderer
          question={currentQuestion}
          questionNumber={currentQ + 1}
          totalQuestions={questions.length}
          state={submitted ? state : "idle"}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
          onSubmit={handleStudentSubmit}
          onNext={() => {}}
          attemptResult={result ? { correct: result.correct, correctAnswer: result.correctAnswer, explanation: currentQuestion.explanation ?? null, strategy: currentQuestion.strategy ?? null } : null}
          loading={false}
        />
      </div>
    </div>
  )
}