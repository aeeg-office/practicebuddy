'use client'

/**
 * QuestionRenderer — Centralized question rendering for all supported types.
 * Uses a registry pattern: question.format → validated renderer → response → evaluator.
 */

import { useState, useCallback } from "react"
import { CheckCircle2, XCircle, HelpCircle, Lightbulb, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// ─── Types ───

export type QuestionFormat = "multiple-choice" | "multiple-answer" | "numeric" | "typed" | "fill-in-blank" | "matching" | "ordering"

export interface QuestionData {
  id: string
  stem: string
  format: QuestionFormat
  options: string | null
  correctAnswer: string
  explanation?: string | null
  strategy?: string | null
  passage?: string | null
  difficulty?: string
  skillId?: string | null
}

export interface AttemptResult {
  correct: boolean
  correctAnswer: string
  explanation: string | null
  strategy: string | null
}

// ─── Attempt State Machine ───

export type PracticeState =
  | "idle"
  | "selected"
  | "submitted_a1"
  | "correct_a1"
  | "incorrect_a1"
  | "strategy"
  | "selected_a2"
  | "submitted_a2"
  | "correct_a2"
  | "incorrect_a2"
  | "complete"

// ─── Renderer Registry ───

interface RendererProps {
  question: QuestionData
  selectedAnswer: string | null
  onSelect: (answer: string) => void
  disabled: boolean
  feedback: { correct: boolean | null; showResult: boolean }
}

function MultipleChoiceRenderer({ question, selectedAnswer, onSelect, disabled, feedback }: RendererProps) {
  const options = parseOptions(question.options ?? null)
  return (
    <div className="space-y-3">
      {options.map((opt, i) => {
        const isSelected = selectedAnswer === opt.id
        const isCorrect = feedback.showResult && opt.id === question.correctAnswer
        const isWrong = feedback.showResult && isSelected && !feedback.correct
        const isEliminated = feedback.showResult && opt.id !== question.correctAnswer && opt.id !== selectedAnswer

        return (
          <button
            key={opt.id}
            onClick={() => !disabled && onSelect(opt.id)}
            disabled={disabled}
            className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all min-h-[48px] ${
              disabled ? "cursor-default" : "cursor-pointer hover:bg-muted/20"
            } ${
              isCorrect
                ? "border-green-500 bg-green-50"
                : isWrong
                ? "border-red-500 bg-red-50"
                : isSelected
                ? "border-primary bg-primary/5"
                : isEliminated
                ? "border-transparent opacity-40"
                : "border-border bg-white"
            }`}
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
              isCorrect ? "bg-green-500 text-white" :
              isWrong ? "bg-red-500 text-white" :
              isSelected ? "bg-primary text-white" :
              "bg-muted text-muted-foreground"
            }`}>
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1 text-sm">{opt.text}</span>
            {isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />}
            {isWrong && <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
          </button>
        )
      })}
    </div>
  )
}

function NumericRenderer({ question, selectedAnswer, onSelect, disabled }: RendererProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="numeric-input">Your answer</Label>
      <Input
        id="numeric-input"
        type="text"
        inputMode="decimal"
        placeholder="Enter your answer..."
        value={selectedAnswer || ""}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}
        className="max-w-xs"
      />
    </div>
  )
}

function TypedRenderer({ question, selectedAnswer, onSelect, disabled }: RendererProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="typed-input">Your response</Label>
      <Textarea
        id="typed-input"
        placeholder="Type your answer..."
        value={selectedAnswer || ""}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}
        rows={4}
      />
    </div>
  )
}

// ─── Helpers ───

function parseOptions(options: string | null): { id: string; text: string }[] {
  if (!options) return []
  try {
    const parsed = JSON.parse(options)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function rendererFor(format: string): React.ComponentType<RendererProps> {
  switch (format) {
    case "multiple-choice": return MultipleChoiceRenderer
    case "numeric": return NumericRenderer
    case "typed": return TypedRenderer
    default: return MultipleChoiceRenderer
  }
}

// ─── Main Component ───

interface QuestionRendererProps {
  question: QuestionData
  questionNumber: number
  totalQuestions: number
  state: PracticeState
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
  onSubmit: () => void
  onNext: () => void
  attemptResult: AttemptResult | null
  loading: boolean
}

export function QuestionRenderer({
  question,
  questionNumber,
  totalQuestions,
  state,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  onNext,
  attemptResult,
  loading,
}: QuestionRendererProps) {
  const Renderer = rendererFor(question.format)
  const showResult = state === "correct_a1" || state === "incorrect_a1" || state === "correct_a2" || state === "incorrect_a2" || state === "complete"
  const canSubmit = state === "selected" || state === "selected_a2"
  const isAttempt2 = state === "selected_a2" || state === "submitted_a2" || state === "correct_a2" || state === "incorrect_a2"

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Question {questionNumber}</span>
          <span>of {totalQuestions}</span>
          {isAttempt2 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              Attempt 2
            </span>
          )}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                i < questionNumber - 1 ? "bg-primary" :
                i === questionNumber - 1 ? "bg-primary ring-2 ring-primary/30" :
                "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Passage */}
      {question.passage && (
        <Card className="p-5 border-l-4 border-primary bg-muted/20">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{question.passage}</p>
        </Card>
      )}

      {/* Question stem */}
      <div>
        <p className="text-lg font-medium leading-relaxed">{question.stem}</p>
      </div>

      {/* Answer area */}
      <Renderer
        question={question}
        selectedAnswer={selectedAnswer}
        onSelect={onSelectAnswer}
        disabled={showResult || loading}
        feedback={{ correct: attemptResult?.correct ?? null, showResult }}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-3 pt-2">
        {canSubmit && (
          <Button onClick={onSubmit} disabled={loading || !selectedAnswer} size="lg">
            {loading ? "Checking..." : "Submit Answer"}
          </Button>
        )}
        {showResult && (
          <Button onClick={onNext} variant="default" size="lg">
            {questionNumber < totalQuestions ? "Next Question →" : "See Results"}
          </Button>
        )}
      </div>

      {/* Strategy (between attempts) */}
      {state === "strategy" && question.strategy && (
        <Card className="p-5 border-l-4 border-amber-500 bg-amber-50">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            <h4 className="font-semibold text-amber-800">Strategy</h4>
          </div>
          <p className="text-sm text-amber-900">{question.strategy}</p>
        </Card>
      )}

      {/* Feedback */}
      {attemptResult && showResult && (
        <Card className={`p-5 border-l-4 ${
          attemptResult.correct
            ? "border-green-500 bg-green-50"
            : "border-red-500 bg-red-50"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {attemptResult.correct
              ? <CheckCircle2 className="h-5 w-5 text-green-600" />
              : <XCircle className="h-5 w-5 text-red-500" />
            }
            <h4 className={`font-semibold ${
              attemptResult.correct ? "text-green-800" : "text-red-800"
            }`}>
              {attemptResult.correct
                ? isAttempt2 ? "Correct on second attempt!" : "Correct!"
                : isAttempt2 ? "The correct answer was shown above."
                : "Not quite. Try again."
              }
            </h4>
          </div>
          {attemptResult.explanation && (
            <div className="mt-2 p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Explanation</span>
              </div>
              <p className="text-sm text-muted-foreground">{attemptResult.explanation}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}