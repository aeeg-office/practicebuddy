'use client'

import { useState } from "react"
import {
  CheckCircle2,
  XCircle,
  BarChart3,
  Target,
  Sparkles,
  Download,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Question } from "./question-renderer"

interface SectionScore {
  name: string
  score: number
  total: number
}

interface ResultsDashboardProps {
  score: number
  totalQuestions: number
  sectionScores: SectionScore[]
  /** Estimated SAT/ACT score range */
  estimatedScore?: number
  answers: Record<number, string>
  questions: Question[]
  weakAreas: string[]
  recommendations: string[]
  timeTaken: number
  examType: string
}

/* ───────── Circular progress indicator ───────── */
function CircularProgress({ percentage, size = 140 }: { percentage: number; size?: number }) {
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const color =
    percentage >= 80
      ? "#10b981"
      : percentage >= 60
        ? "#c8785a"
        : "#ef4444"

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
}

/* ───────── Per-question review row ───────── */
function QuestionReviewRow({
  question,
  studentAnswer,
  isExpanded,
  onToggle,
}: {
  question: Question
  studentAnswer: string | undefined
  isExpanded: boolean
  onToggle: () => void
}) {
  const isCorrect = studentAnswer === question.correctAnswer

  return (
    <div className="border rounded-lg overflow-hidden transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full shrink-0",
            isCorrect ? "bg-green-100" : "bg-red-100",
          )}
        >
          {isCorrect ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
        </span>
        <span className="text-sm font-medium text-[rgb(22,32,34)] flex-1 truncate">
          Question {question.id}
        </span>
        <span className="text-xs text-muted-foreground shrink-0">
          {isCorrect ? "Correct" : "Incorrect"}
        </span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 border-t pt-3 space-y-2">
          <p className="text-sm text-[rgb(22,32,34)]">{question.text}</p>

          {question.options && (
            <div className="space-y-1.5">
              {question.options.map((opt) => {
                const isOptCorrect = opt.id === question.correctAnswer
                const isOptSelected = studentAnswer === opt.id
                return (
                  <div
                    key={opt.id}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
                      isOptCorrect && "bg-green-50 text-green-800",
                      isOptSelected && !isOptCorrect && "bg-red-50 text-red-800",
                      !isOptCorrect && !isOptSelected && "text-muted-foreground",
                    )}
                  >
                    <span className="font-bold w-5">{opt.id}</span>
                    <span>{opt.text}</span>
                    {isOptCorrect && <CheckCircle2 className="h-3.5 w-3.5 text-green-600 ml-auto shrink-0" />}
                    {isOptSelected && !isOptCorrect && <XCircle className="h-3.5 w-3.5 text-red-500 ml-auto shrink-0" />}
                  </div>
                )
              })}
            </div>
          )}

          {!isCorrect && (
            <p className="text-xs text-muted-foreground">
              Your answer:{" "}
              <span className="font-medium text-red-600">{studentAnswer || "No answer"}</span>
              {" | "}
              Correct:{" "}
              <span className="font-medium text-green-600">{question.correctAnswer}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/* ───────── Format time helper ───────── */
function formatTimeTaken(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m >= 60) {
    const h = Math.floor(m / 60)
    const remM = m % 60
    return `${h}h ${remM}m ${s}s`
  }
  return `${m}m ${s}s`
}

/* ───────── Main component ───────── */
export default function ResultsDashboard({
  score,
  totalQuestions,
  sectionScores,
  estimatedScore,
  answers,
  questions,
  weakAreas,
  recommendations,
  timeTaken,
  examType,
}: ResultsDashboardProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())
  const [showAllQuestions, setShowAllQuestions] = useState(false)

  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0
  const incorrectCount = totalQuestions - score
  const visibleQuestions = showAllQuestions ? questions : questions.slice(0, 5)

  const toggleQuestion = (qId: number) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev)
      if (next.has(qId)) next.delete(qId)
      else next.add(qId)
      return next
    })
  }

  const handleDownloadReport = () => {
    // Placeholder — will integrate with PDF generation later
    alert("PDF report download will be available soon.")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ── Header ── */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-[rgb(22,32,34)] mb-2">Exam Complete!</h1>
        <p className="text-muted-foreground">
          Here is your personalized diagnostic report for{" "}
          <span className="font-semibold text-[rgb(11,79,74)]">{examType}</span>.
        </p>
      </div>

      {/* ── Score overview card ── */}
      <Card className="bg-gradient-to-br from-[rgb(11,79,74)] to-[rgb(22,32,34)] border-0">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Circular progress */}
            <div className="shrink-0">
              <CircularProgress percentage={percentage} size={140} />
            </div>

            {/* Score details */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    {score}/{totalQuestions}
                  </p>
                  <p className="text-white/70 text-xs">Correct</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{incorrectCount}</p>
                  <p className="text-white/70 text-xs">Incorrect</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-[rgb(200,120,90)]">
                    {Math.round(percentage)}%
                  </p>
                  <p className="text-white/70 text-xs">Accuracy</p>
                </div>
              </div>

              {/* Estimated score */}
              {estimatedScore !== undefined && (
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm">
                  <TrendingUp className="h-4 w-4 text-[rgb(200,120,90)]" />
                  <span className="text-white font-medium">
                    Estimated Score:{" "}
                    <span className="text-[rgb(200,120,90)] font-bold">{estimatedScore}</span>
                  </span>
                </div>
              )}

              {/* Time taken */}
              <div className="mt-2 flex items-center gap-2 text-white/60 text-xs">
                <Clock className="h-3.5 w-3.5" />
                Time taken: {formatTimeTaken(timeTaken)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Section scores + Weak areas grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[rgb(22,32,34)] flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[rgb(11,79,74)]" />
              Section Breakdown
            </CardTitle>
            <CardDescription>Performance by subject area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {sectionScores.map((section) => {
              const sectionPct = section.total > 0 ? (section.score / section.total) * 100 : 0
              const barColor =
                sectionPct >= 80
                  ? "bg-green-500"
                  : sectionPct >= 60
                    ? "bg-[rgb(200,120,90)]"
                    : "bg-red-400"

              return (
                <div key={section.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-[rgb(22,32,34)]">{section.name}</span>
                    <span className="font-bold text-[rgb(22,32,34)]">
                      {section.score}/{section.total}
                      <span className="text-muted-foreground font-normal ml-1">
                        ({Math.round(sectionPct)}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-700", barColor)}
                      style={{ width: `${sectionPct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Weak areas + Recommendations */}
        <div className="space-y-6">
          {/* Weak areas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[rgb(22,32,34)] flex items-center gap-2">
                <Target className="h-5 w-5 text-[rgb(200,120,90)]" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Topics that need the most attention</CardDescription>
            </CardHeader>
            <CardContent>
              {weakAreas.length > 0 ? (
                <ul className="space-y-2">
                  {weakAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-[rgb(200,120,90)] shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No significant weak areas identified. Great job!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[rgb(22,32,34)] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[rgb(11,79,74)]" />
                Study Recommendations
              </CardTitle>
              <CardDescription>Personalized next steps</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recommendations.map((rec, i) => (
                  <li key={i}>
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal text-left whitespace-normal h-auto py-1.5 px-3 w-full"
                    >
                      {rec}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Per-question review ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[rgb(22,32,34)] flex items-center gap-2">
            <Award className="h-5 w-5 text-[rgb(11,79,74)]" />
            Question Review
          </CardTitle>
          <CardDescription>Review each question and your answers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {visibleQuestions.map((q) => (
            <QuestionReviewRow
              key={q.id}
              question={q}
              studentAnswer={answers[q.id]}
              isExpanded={expandedQuestions.has(q.id)}
              onToggle={() => toggleQuestion(q.id)}
            />
          ))}

          {questions.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllQuestions(!showAllQuestions)}
              className="w-full text-xs mt-2"
            >
              {showAllQuestions
                ? "Show less"
                : `Show all ${questions.length} questions`}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* ── Action buttons ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-8">
        <Button
          variant="default"
          size="xl"
          className="bg-[rgb(11,79,74)] hover:bg-[rgb(11,79,74)] min-w-[200px]"
          asChild
        >
          <a href={`/dashboard?exam=${examType.toLowerCase()}`}>
            <FileText className="mr-2 h-4 w-4" />
            View Detailed Report
          </a>
        </Button>
        <Button
          variant="accent"
          size="xl"
          className="min-w-[200px]"
          asChild
        >
          <a href={`/contact?reason=consultation&exam=${examType.toLowerCase()}`}>
            <BookOpen className="mr-2 h-4 w-4" />
            Book a Consultation
          </a>
        </Button>
        <Button
          variant="outline"
          size="xl"
          className="min-w-[200px]"
          onClick={handleDownloadReport}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF Report
        </Button>
      </div>
    </div>
  )
}

export type { ResultsDashboardProps, SectionScore }