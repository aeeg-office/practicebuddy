'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams } from "next/navigation"
import {
  Volume2,
  Play,
  Timer,
  Clock,
  CheckCircle,
  Headphones,
  MessageCircle,
  ArrowRight,
  XCircle,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

/* ───────── Subject Labels ───────── */
const subjectLabel: Record<string, string> = {
  ielts: "IELTS",
  toefl: "TOEFL iBT",
  general: "General English",
  pte: "PTE Academic",
  cambridge: "Cambridge English",
}

const sectionLabel: Record<string, string> = {
  conversation: "Conversation",
  lecture: "Lecture",
  announcement: "Announcement",
  mixed: "Mixed",
}

const difficultyLabel: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
}

/* ───────── Mock Questions ───────── */
const mockQuestions = [
  {
    id: 1,
    question: "What is the main topic of the conversation?",
    options: ["A. University registration", "B. Library hours", "C. Course selection", "D. Scholarship application"],
    correct: 0,
  },
  {
    id: 2,
    question: "When does the registration period end?",
    options: ["A. Friday", "B. Next Monday", "C. Two weeks from now", "D. End of the month"],
    correct: 1,
  },
  {
    id: 3,
    question: "What document does the student need to submit?",
    options: ["A. Passport copy", "B. Transcript", "C. Recommendation letter", "D. Application form"],
    correct: 3,
  },
  {
    id: 4,
    question: "How many credits does the course carry?",
    options: ["A. 3 credits", "B. 4 credits", "C. 5 credits", "D. 6 credits"],
    correct: 1,
  },
  {
    id: 5,
    question: "What is the professor's office hours schedule?",
    options: ["A. Mon & Wed 2-4pm", "B. Tue & Thu 1-3pm", "C. Mon & Fri 10-12pm", "D. Wed & Fri 3-5pm"],
    correct: 0,
  },
]

/* ───────── Timer hook ───────── */
function useTimer(initialMinutes: number) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isLow = timeLeft <= 30

  return { timeLeft, minutes, seconds, isLow, isRunning, setIsRunning }
}

export default function ListeningAssessmentPage() {
  const params = useParams()
  const slug = params.slug as string[] || []

  const subject = slug[0] || "ielts"
  const section = slug[1] || "conversation"
  const difficulty = slug[2] || "medium"

  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [audioStarted, setAudioStarted] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)

  const { minutes, seconds, isLow, isRunning, setIsRunning } = useTimer(15)

  const handleAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = () => {
    setIsRunning(false)
    setSubmitted(true)
  }

  // Simulate audio progress
  const handlePlayAudio = () => {
    setAudioStarted(true)
    setIsRunning(true)
    const interval = setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 150)
  }

  // Score
  const correctCount = submitted
    ? mockQuestions.filter((q) => answers[q.id] === q.correct).length
    : 0
  const totalQuestions = mockQuestions.length
  const scorePct = submitted ? Math.round((correctCount / totalQuestions) * 100) : 0

  const scoreColor =
    scorePct >= 80
      ? "text-emerald-600"
      : scorePct >= 60
      ? "text-[rgb(245,166,35)]"
      : "text-red-500"

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* ════════════════════════════════════════ */}
      {/* TOP BAR                                  */}
      {/* ════════════════════════════════════════ */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(71,32,183)]/10">
            <Headphones className="h-5 w-5 text-[rgb(71,32,183)]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[rgb(30,39,97)]">Listening Assessment</h1>
            <p className="text-xs text-gray-500">
              {subjectLabel[subject] || subject} &middot; {sectionLabel[section] || section} &middot;{" "}
              {difficultyLabel[difficulty] || difficulty}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 ${
            isLow ? "text-red-500" : "text-gray-700"
          }`}
        >
          <Clock className="h-4 w-4" />
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </Badge>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* AUDIO PLAYER MOCKUP                      */}
      {/* ════════════════════════════════════════ */}
      <Card className="border-gray-200 overflow-hidden">
        <div
          className={`p-6 md:p-8 text-center transition-all duration-500 ${
            audioStarted ? "bg-gradient-to-b from-[rgb(71,32,183)]/5 to-transparent" : "bg-gray-50"
          }`}
        >
          {!audioStarted ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgb(71,32,183)]/10 animate-pulse">
                  <Headphones className="h-10 w-10 text-[rgb(71,32,183)]" />
                </div>
              </div>
              <div>
                <p className="text-base font-bold text-[rgb(30,39,97)]">Audio Track Ready</p>
                <p className="text-sm text-gray-500 mt-1">
                  Audio track would play here — click play to begin
                </p>
              </div>
              <Button
                size="lg"
                className="gap-2 font-semibold"
                onClick={handlePlayAudio}
              >
                <Play className="h-5 w-5" />
                Start Audio
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Waveform visualization placeholder */}
              <div className="flex items-center justify-center gap-1 h-16">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-[rgb(71,32,183)] transition-all duration-300"
                    style={{
                      height: `${20 + Math.sin((i + audioProgress / 2) * 0.3) * 20 + Math.random() * 10}px`,
                      opacity: i < audioProgress * 0.4 ? 1 : 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[rgb(71,32,183)] to-[rgb(245,166,35)] transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>

              <p className="text-sm text-gray-500">
                {audioProgress < 100 ? "Audio playing..." : "Audio complete"}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* ════════════════════════════════════════ */}
      {/* QUESTIONS                                */}
      {/* ════════════════════════════════════════ */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[rgb(30,39,97)] flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-[rgb(71,32,183)]" />
          Answer the Questions
        </h2>

        {mockQuestions.map((q, idx) => {
          const selected = answers[q.id]
          const isCorrect = submitted && selected === q.correct

          return (
            <Card
              key={q.id}
              className={`border-gray-200 transition-all ${
                submitted
                  ? isCorrect
                    ? "border-emerald-200 bg-emerald-50/30"
                    : "border-red-200 bg-red-50/30"
                  : "bg-white"
              }`}
            >
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-[rgb(30,39,97)] mb-3">
                  {q.id}. {q.question}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selected === optIndex
                    const isThisCorrect = submitted && optIndex === q.correct
                    const isThisWrong = submitted && isSelected && !isThisCorrect

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswer(q.id, optIndex)}
                        disabled={submitted}
                        className={`flex items-center gap-2 p-3 rounded-lg border-2 text-left text-sm transition-all duration-200 ${
                          submitted && isThisCorrect
                            ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                            : submitted && isThisWrong
                            ? "border-red-300 bg-red-50 text-red-700"
                            : isSelected && !submitted
                            ? "border-[rgb(71,32,183)] bg-[rgb(71,32,183)]/5 text-[rgb(30,39,97)]"
                            : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                        }`}
                      >
                        {submitted && isThisCorrect && (
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                        )}
                        {submitted && isThisWrong && (
                          <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                        )}
                        {!submitted && isSelected && (
                          <CheckCircle className="h-4 w-4 text-[rgb(71,32,183)] shrink-0" />
                        )}
                        <span>{opt}</span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ════════════════════════════════════════ */}
      {/* SUBMIT / RESULTS                          */}
      {/* ════════════════════════════════════════ */}
      {!submitted ? (
        <div className="flex justify-center">
          <Button
            size="xl"
            className="font-bold gap-2"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < totalQuestions}
          >
            <CheckCircle className="h-5 w-5" />
            Submit Answers
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Score card */}
          <Card className="bg-gradient-to-r from-[rgb(71,32,183)]/5 to-[rgb(30,39,97)]/5 border-[rgb(71,32,183)]/20">
            <CardContent className="p-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Your Score</p>
              <p className={`text-4xl font-extrabold ${scoreColor}`}>
                {correctCount}/{totalQuestions}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {scorePct}% correct &middot;{" "}
                {scorePct >= 80
                  ? "Excellent work!"
                  : scorePct >= 60
                  ? "Good effort, keep practicing!"
                  : "Review the material and try again"}
              </p>
              <div className="w-full max-w-xs mx-auto mt-4 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    scorePct >= 80
                      ? "bg-emerald-500"
                      : scorePct >= 60
                      ? "bg-[rgb(245,166,35)]"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${scorePct}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Answers summary */}
          <Card className="border-gray-200">
            <CardContent className="p-5">
              <div className="space-y-2">
                {mockQuestions.map((q) => {
                  const selected = answers[q.id]
                  const isCorrect = selected === q.correct
                  return (
                    <div
                      key={q.id}
                      className="flex items-center gap-3 text-sm p-2 rounded-lg"
                    >
                      {isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                      )}
                      <span className="text-gray-700">
                        Q{q.id}:{" "}
                        <span className={isCorrect ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                          {q.options[selected] || "Not answered"}
                        </span>
                        {!isCorrect && (
                          <span className="text-gray-400">
                            {" "}(Correct: {q.options[q.correct]})
                          </span>
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Retry button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => {
                setAnswers({})
                setSubmitted(false)
                setAudioStarted(false)
                setAudioProgress(0)
              }}
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════ */}
      {/* WHATSAPP CTA                             */}
      {/* ════════════════════════════════════════ */}
      <section className="pb-6 pt-4">
        <a
          href="https://wa.me/201060618899"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Get Help on WhatsApp</p>
                <p className="text-xs text-emerald-600">Questions about this section? Chat with us</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-emerald-400" />
          </div>
        </a>
      </section>
    </div>
  )
}