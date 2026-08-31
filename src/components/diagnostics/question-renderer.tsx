'use client'

import { useState, useEffect, useRef } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface AnswerOption {
  id: string
  text: string
}

export interface Question {
  id: number
  section: string
  text: string
  passage?: string
  options?: AnswerOption[]
  correctAnswer: string
  /** If true, render a text input instead of multiple choice */
  isGridIn?: boolean
  /** Student's answer (only used when showing results) */
  studentAnswer?: string
}

interface QuestionRendererProps {
  question: Question
  selectedAnswer: string | null
  onAnswer: (answer: string) => void
  /** Show results mode (correct/incorrect indicators) */
  showResults?: boolean
  /** Correct answer override (defaults to question.correctAnswer) */
  correctAnswer?: string
}

function EntranceAnimation({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setVisible(false)
    timerRef.current = setTimeout(() => setVisible(true), 30)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [children])

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      )}
    >
      {children}
    </div>
  )
}

export default function QuestionRenderer({
  question,
  selectedAnswer,
  onAnswer,
  showResults = false,
  correctAnswer,
}: QuestionRendererProps) {
  const effectiveCorrect = correctAnswer ?? question.correctAnswer

  return (
    <EntranceAnimation key={question.id}>
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Section badge */}
          <Badge variant="secondary" className="text-xs">
            {question.section}
          </Badge>

          {/* Passage block */}
          {question.passage && (
            <div className="rounded-lg border-l-4 border-[rgb(11,79,74)] bg-[rgb(11,79,74)]/5 p-4 text-sm leading-relaxed text-[rgb(22,32,34)]">
              <p className="font-semibold text-xs uppercase tracking-wider text-[rgb(11,79,74)] mb-2">
                Passage
              </p>
              <p className="italic">{question.passage}</p>
            </div>
          )}

          {/* Question text */}
          <h2 className="text-lg md:text-xl font-semibold text-[rgb(22,32,34)]">
            {question.text}
          </h2>

          {/* Grid-in input */}
          {question.isGridIn ? (
            <div className="space-y-2">
              <Input
                type="text"
                inputMode="decimal"
                placeholder="Type your answer..."
                value={selectedAnswer ?? ""}
                onChange={(e) => onAnswer(e.target.value)}
                disabled={showResults}
                className={cn(
                  "max-w-[200px] text-center text-lg font-bold",
                  showResults &&
                    selectedAnswer === effectiveCorrect &&
                    "border-emerald-500 ring-emerald-500",
                  showResults &&
                    selectedAnswer !== effectiveCorrect &&
                    "border-red-500 ring-red-500",
                )}
              />
              {showResults && (
                <p className="text-sm text-muted-foreground">
                  Correct answer:{" "}
                  <span className="font-bold text-emerald-600">{effectiveCorrect}</span>
                </p>
              )}
            </div>
          ) : (
            /* Multiple choice options */
            <div className="space-y-3">
              {question.options?.map((option) => {
                const isSelected = selectedAnswer === option.id
                const isCorrect = option.id === effectiveCorrect
                const isWrongSelection = showResults && isSelected && !isCorrect

                return (
                  <button
                    key={option.id}
                    onClick={() => !showResults && onAnswer(option.id)}
                    disabled={showResults}
                    className={cn(
                      "w-full text-left flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-150",
                      // Selected state
                      isSelected && !showResults && "border-[rgb(11,79,74)] bg-[rgb(11,79,74)]/5 shadow-sm",
                      // Default state
                      !isSelected && !showResults && "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",
                      // Results: correct answer highlighted green
                      showResults && isCorrect && "border-emerald-500 bg-emerald-50",
                      // Results: wrong selection highlighted red
                      showResults && isWrongSelection && "border-red-500 bg-red-50",
                      // Results: unselected options
                      showResults && !isCorrect && !isWrongSelection && "border-gray-200 bg-white opacity-70",
                    )}
                  >
                    {/* Letter badge */}
                    <span
                      className={cn(
                        "flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0 transition-colors",
                        // Selected
                        isSelected && !showResults && "bg-[rgb(11,79,74)] text-white",
                        // Default
                        !isSelected && !showResults && "bg-muted text-muted-foreground",
                        // Results: correct
                        showResults && isCorrect && "bg-emerald-500 text-white",
                        // Results: wrong
                        showResults && isWrongSelection && "bg-red-500 text-white",
                        // Results: unselected
                        showResults && !isCorrect && !isWrongSelection && "bg-gray-200 text-gray-400",
                      )}
                    >
                      {option.id}
                    </span>

                    {/* Option text */}
                    <span
                      className={cn(
                        "text-sm md:text-base pt-1.5",
                        showResults && isCorrect && "text-emerald-800 font-medium",
                        showResults && isWrongSelection && "text-red-800",
                        !showResults && "text-[rgb(22,32,34)]",
                      )}
                    >
                      {option.text}
                    </span>

                    {/* Correct / Incorrect icon */}
                    {showResults && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1.5 ml-auto shrink-0" />
                    )}
                    {showResults && isWrongSelection && (
                      <XCircle className="h-5 w-5 text-red-500 mt-1.5 ml-auto shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </EntranceAnimation>
  )
}

export type { QuestionRendererProps }