'use client'

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Lightbulb, BookOpen, ChevronRight, ChevronLeft, Users, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { QuestionRenderer, type PracticeState, type QuestionData } from "@/components/question-renderer"

type GuidedRole = "teacher" | "student"

export default function GuidedInstructionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>}>
      <GuidedInstructionContent />
    </Suspense>
  )
}

function GuidedInstructionContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, token } = useAuth()
  const roleParam = searchParams.get("role") as GuidedRole | null
  const [role, setRole] = useState<GuidedRole>(roleParam || "teacher")

  // Teacher state
  const [questions, setQuestions] = useState<QuestionData[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [showStrategy, setShowStrategy] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [allowAttempt2, setAllowAttempt2] = useState(false)
  const [revealAnswer, setRevealAnswer] = useState(false)
  const [studentAnswer, setStudentAnswer] = useState<string | null>(null)
  const [studentSubmitted, setStudentSubmitted] = useState(false)

  // Student state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [state, setState] = useState<PracticeState>("idle")
  const [attemptResult, setAttemptResult] = useState<{ correct: boolean; correctAnswer: string; explanation: string | null; strategy: string | null } | null>(null)

  const loadQuestions = async () => {
    try {
      const res = await fetch("/api/practice/questions?subject=math&limit=10", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (res.ok) {
        const data = await res.json()
        setQuestions((data.questions ?? []).map((q: any) => ({
          id: q.id,
          stem: q.stem,
          format: "multiple-choice",
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

  useEffect(() => { loadQuestions() }, [])

  const currentQuestion = questions[currentQ]

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setState("selected")
  }

  const handleStudentSubmit = () => {
    if (!currentQuestion || !selectedAnswer) return
    setStudentSubmitted(true)
    setStudentAnswer(selectedAnswer)
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
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1)
      setState("idle")
      setSelectedAnswer(null)
      setAttemptResult(null)
      setShowStrategy(false)
      setShowExplanation(false)
      setAllowAttempt2(false)
      setRevealAnswer(false)
      setStudentAnswer(null)
      setStudentSubmitted(false)
    }
  }

  // Role selector
  if (!roleParam) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <BookOpen className="h-16 w-16 mx-auto mb-4" style={{ color: "rgb(11,79,74)" }} />
              <h1 className="text-2xl font-bold text-foreground mb-2">Guided Instruction</h1>
              <p className="text-muted-foreground">Teacher-led 1:1 practice with controlled pacing</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRole("teacher")}
                className="p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-center"
              >
                <UserCheck className="h-10 w-10 mx-auto mb-3" style={{ color: "rgb(11,79,74)" }} />
                <p className="font-semibold text-foreground">Teacher</p>
                <p className="text-xs text-muted-foreground mt-1">Control the lesson</p>
              </button>
              <button
                onClick={() => setRole("student")}
                className="p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-center"
              >
                <Users className="h-10 w-10 mx-auto mb-3" style={{ color: "rgb(11,79,74)" }} />
                <p className="font-semibold text-foreground">Student</p>
                <p className="text-xs text-muted-foreground mt-1">Follow the teacher</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    )
  }

  // Teacher View
  if (role === "teacher") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Preview */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Question {currentQ + 1} of {questions.length}</Badge>
                <Badge variant="outline">{currentQuestion.difficulty}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={currentQ === 0} onClick={() => handleNext()}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button variant="outline" size="sm" disabled={currentQ >= questions.length - 1} onClick={() => handleNext()}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <QuestionRenderer
                  question={currentQuestion}
                  questionNumber={currentQ + 1}
                  totalQuestions={questions.length}
                  state={revealAnswer ? "complete" : state}
                  selectedAnswer={selectedAnswer}
                  onSelectAnswer={handleSelectAnswer}
                  onSubmit={handleStudentSubmit}
                  onNext={() => {}}
                  attemptResult={attemptResult}
                  loading={false}
                />
              </CardContent>
            </Card>
          </div>

          {/* Teacher Controls */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm" style={{ color: "rgb(11,79,74)" }}>
                  Teacher Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg text-sm">
                  <p className="font-medium text-blue-800 mb-1">Correct Answer</p>
                  <p className="text-blue-600">{currentQuestion.correctAnswer}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowStrategy(!showStrategy)}
                >
                  <Lightbulb className={`h-4 w-4 mr-2 ${showStrategy ? "text-amber-500" : ""}`} />
                  {showStrategy ? "Hide" : "Show"} Strategy
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowExplanation(!showExplanation)}
                >
                  <BookOpen className={`h-4 w-4 mr-2 ${showExplanation ? "text-blue-500" : ""}`} />
                  {showExplanation ? "Hide" : "Show"} Explanation
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setAllowAttempt2(!allowAttempt2)}
                >
                  <UserCheck className={`h-4 w-4 mr-2 ${allowAttempt2 ? "text-emerald-500" : ""}`} />
                  {allowAttempt2 ? "Allow" : "Block"} Attempt 2
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setRevealAnswer(!revealAnswer)}
                >
                  <BookOpen className={`h-4 w-4 mr-2 ${revealAnswer ? "text-red-500" : ""}`} />
                  {revealAnswer ? "Hide" : "Reveal"} Answer
                </Button>
              </CardContent>
            </Card>

            {showStrategy && currentQuestion.strategy && (
              <Card className="border-l-4 border-amber-500">
                <CardContent className="p-4">
                  <h4 className="text-sm font-semibold text-amber-800 mb-1">Strategy</h4>
                  <p className="text-xs text-amber-700">{currentQuestion.strategy}</p>
                </CardContent>
              </Card>
            )}

            {showExplanation && currentQuestion.explanation && (
              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-1">Explanation</h4>
                  <p className="text-xs text-blue-700">{currentQuestion.explanation}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Student View
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 bg-white border-b shadow-sm px-4 h-12 flex items-center">
        <Badge variant="outline" className="text-xs">Guided Practice</Badge>
        <span className="ml-auto text-xs text-muted-foreground">Follow your teacher&apos;s direction</span>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
        </div>
        <QuestionRenderer
          question={currentQuestion}
          questionNumber={currentQ + 1}
          totalQuestions={questions.length}
          state={state}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          onSubmit={handleStudentSubmit}
          onNext={handleNext}
          attemptResult={attemptResult}
          loading={false}
        />
      </div>
    </div>
  )
}