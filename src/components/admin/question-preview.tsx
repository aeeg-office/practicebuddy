'use client'

import { useEffect, useState } from "react"
import { CheckCircle, Eye, X, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/* ───────── Types ───────── */

export interface PreviewOption {
  id: string
  text: string
}

export interface QuestionPreviewData {
  stem: string
  passage?: string | null
  options: PreviewOption[]
  correctAnswer: string
  explanation?: string | null
}

interface QuestionPreviewProps {
  /** Question data to render exactly as a student would see it */
  question: QuestionPreviewData
  /** When true, the modal overlay is shown */
  open: boolean
  /** Called when the user closes the preview */
  onClose: () => void
  /** Optional context line shown under the title (e.g. subject · difficulty) */
  meta?: string
}

/**
 * Preview-as-Student modal.
 *
 * Renders a single question the same way the student practice player does:
 * passage (if present) in a muted box, stem, options as clickable A/B/C/D
 * buttons, correct/incorrect feedback on click, and the explanation revealed
 * after answering. The correct answer is never revealed up front.
 */
export default function QuestionPreview({ question, open, onClose, meta }: QuestionPreviewProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  // Reset interaction state whenever the preview opens or the question changes
  useEffect(() => {
    if (open) {
      setSelectedIdx(null)
      setAnswered(false)
    }
  }, [open, question.stem, question.options, question.correctAnswer])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const { stem, passage, options, correctAnswer, explanation } = question
  const correctOptionId = correctAnswer
  const correctOption = options.find((o) => o.id === correctOptionId)
  const selected = selectedIdx !== null ? options[selectedIdx] : null
  const isCorrect = answered && selected?.id === correctOptionId

  const handleAnswer = (idx: number) => {
    if (answered) return
    setSelectedIdx(idx)
    setAnswered(true)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Preview as Student"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        // Click on backdrop closes the preview
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl max-h-[90vh]">
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted/50"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a237e]/10">
            <Eye className="h-4 w-4 text-[#1a237e]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground leading-tight">Preview as Student</h2>
            {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
          </div>
        </div>

        {/* Student practice player (mirrors src/app/practice/[subject]/[skillId]/page.tsx) */}
        <Card className="border border-border/50 shadow-sm mb-6">
          <CardContent className="p-6">
            {/* Passage (when present) */}
            {passage && (
              <div className="mb-6 p-4 md:p-5 rounded-xl bg-muted/40 border border-border/50">
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {passage}
                </p>
              </div>
            )}

            {/* Stem */}
            <h2 className="text-lg md:text-xl font-semibold text-foreground mb-6 leading-relaxed">
              {stem || <span className="italic text-muted-foreground">No question text entered yet.</span>}
            </h2>

            {/* Options — clickable A/B/C/D buttons */}
            {options.length > 0 ? (
              <div className="space-y-3">
                {options.map((option, idx) => {
                  const isCorrectOption = option.id === correctOptionId
                  const isSelected = idx === selectedIdx
                  let borderClass = "border-border/60 hover:border-[#1a237e]/30 hover:bg-[#1a237e]/5"
                  if (answered) {
                    if (isCorrectOption) {
                      borderClass = "border-emerald-500 bg-emerald-50"
                    } else if (isSelected) {
                      borderClass = "border-red-500 bg-red-50"
                    } else {
                      borderClass = "border-border/30 opacity-60"
                    }
                  } else if (isSelected) {
                    borderClass = "border-[#1a237e] bg-[#1a237e]/5"
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(idx)}
                      disabled={answered}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer ${borderClass}`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                          answered
                            ? isCorrectOption
                              ? "bg-emerald-500 text-white"
                              : isSelected
                              ? "bg-red-500 text-white"
                              : "bg-muted text-muted-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {answered && isCorrectOption ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : answered && isSelected ? (
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
            ) : (
              <p className="text-sm italic text-muted-foreground">No options entered yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Explanation (shown after answering) */}
        {answered && (
          <Card className="border border-border/50 shadow-sm mb-6 bg-gradient-to-r from-[#1a237e]/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The correct answer is <strong>{correctOptionId}</strong>: {correctOption?.text ?? ""}
                  </p>
                  {explanation ? (
                    <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{explanation}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">
                      No explanation provided for this question.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Answer prompt */}
        {!answered && options.length > 0 && (
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Select an answer to see feedback
          </p>
        )}

        {/* Close */}
        <div className="flex justify-end">
          <Button variant="default" onClick={onClose} className="bg-[#1a237e] hover:bg-[#3a1a9c]">
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  )
}
