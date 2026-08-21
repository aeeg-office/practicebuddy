'use client'

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuestionPaletteProps {
  totalQuestions: number
  currentQuestion: number
  answers: Record<number, string>
  flagged: Set<number>
  onNavigate: (q: number) => void
  /** Compact mode for smaller screens */
  compact?: boolean
}

type QuestionState = "answered" | "flagged" | "unanswered" | "current"

function getQuestionState(
  questionNumber: number,
  currentQuestion: number,
  answers: Record<number, string>,
  flagged: Set<number>,
): QuestionState {
  if (questionNumber === currentQuestion) return "current"
  if (flagged.has(questionNumber)) return "flagged"
  if (answers[questionNumber] !== undefined && answers[questionNumber] !== "") return "answered"
  return "unanswered"
}

function stateStyles(state: QuestionState): string {
  switch (state) {
    case "current":
      return "bg-[rgb(26,35,126)] text-white ring-2 ring-[rgb(26,35,126)] ring-offset-1"
    case "answered":
      return "bg-green-500 text-white hover:bg-green-600"
    case "flagged":
      return "bg-[rgb(245,166,35)] text-white hover:bg-[rgb(220,150,30)]"
    case "unanswered":
      return "bg-gray-100 text-gray-500 hover:bg-gray-200"
  }
}

export default function QuestionPalette({
  totalQuestions,
  currentQuestion,
  answers,
  flagged,
  onNavigate,
  compact = false,
}: QuestionPaletteProps) {
  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== undefined && v !== "").length,
    [answers],
  )

  const questions = useMemo(() => {
    return Array.from({ length: totalQuestions }, (_, i) => {
      const qNum = i + 1
      return {
        number: qNum,
        state: getQuestionState(qNum, currentQuestion, answers, flagged),
      }
    })
  }, [totalQuestions, currentQuestion, answers, flagged])

  return (
    <Card>
      <CardHeader className={cn("pb-3", compact && "px-4 py-3")}>
        <CardTitle
          className={cn(
            "font-semibold text-[rgb(13,33,55)]",
            compact ? "text-xs" : "text-sm",
          )}
        >
          Question Palette
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(compact && "px-4 pb-4")}>
        {/* Legend */}
        <div
          className={cn(
            "flex flex-wrap gap-3 mb-4 text-muted-foreground",
            compact ? "gap-2 text-[10px]" : "text-[10px]",
          )}
        >
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-green-500" />
            Answered
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-[rgb(245,166,35)]" />
            Flagged
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-200" />
            Unanswered
          </div>
        </div>

        {/* Grid of question numbers */}
        <div className={cn("grid grid-cols-5 gap-2", compact && "gap-1.5")}>
          {questions.map((q) => (
            <button
              key={q.number}
              onClick={() => onNavigate(q.number)}
              className={cn(
                "w-full rounded-md text-xs font-bold transition-colors",
                compact ? "aspect-square text-[10px]" : "aspect-square",
                stateStyles(q.state),
              )}
              aria-label={`Go to question ${q.number}${
                q.state === "answered"
                  ? " (answered)"
                  : q.state === "flagged"
                    ? " (flagged)"
                    : ""
              }`}
            >
              {q.number}
            </button>
          ))}
        </div>

        {/* Summary counts */}
        <div
          className={cn(
            "mt-4 pt-3 border-t text-muted-foreground space-y-1",
            compact ? "text-[10px]" : "text-xs",
          )}
        >
          <div className="flex justify-between">
            <span>Answered</span>
            <span className="font-bold text-green-600">
              {answeredCount}/{totalQuestions}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Flagged</span>
            <span className="font-bold text-[rgb(245,166,35)]">{flagged.size}</span>
          </div>
          <div className="flex justify-between">
            <span>Remaining</span>
            <span className="font-bold text-gray-500">
              {totalQuestions - answeredCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}