'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useSearchParams } from "next/navigation"
import {
  Timer,
  Clock,
  CheckCircle,
  Pen,
  FileText,
  MessageCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  RefreshCw,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

/* ───────── Prompt bank by task type ───────── */
const promptBank: Record<string, { title: string; prompt: string; wordLimit: string }> = {
  essay: {
    title: "Opinion Essay",
    prompt:
      "Some people believe that technological advancements have made our lives more complicated rather than easier. To what extent do you agree or disagree with this statement? Provide specific examples and reasons to support your position.",
    wordLimit: "250-300",
  },
  letter: {
    title: "Formal Letter",
    prompt:
      "You recently attended a training course for your job, but you were not satisfied with the quality of the training. Write a letter to the training manager. In your letter: explain why you took the course, describe what was unsatisfactory about the course, and suggest what improvements could be made.",
    wordLimit: "150-200",
  },
  report: {
    title: "Chart Report",
    prompt:
      "The chart below shows the percentage of households in five different countries with access to the internet from 2010 to 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
    wordLimit: "150-200",
  },
  summary: {
    title: "Academic Summary",
    prompt:
      "Read the following passage and write a summary capturing the main ideas in your own words. 'Climate change poses one of the most significant challenges of our time. Rising global temperatures have led to melting polar ice caps, more frequent extreme weather events, and shifting ecosystems. Scientists emphasize that immediate action is required to reduce carbon emissions and transition to renewable energy sources to mitigate these effects.'",
    wordLimit: "100-150",
  },
}

/* ───────── Timer hook ───────── */
function useTimer(initialMinutes: number, onTimeout: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          onTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, onTimeout])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = (timeLeft / (initialMinutes * 60)) * 100
  const isLow = timeLeft <= 120

  return { timeLeft, minutes, seconds, progress, isLow, setIsRunning }
}

/* ───────── Task labels ───────── */
const taskLabel: Record<string, string> = {
  essay: "Essay",
  letter: "Letter",
  report: "Report",
  summary: "Summary",
}

const subjectLabel: Record<string, string> = {
  "ielts-academic": "IELTS Academic",
  "ielts-general": "IELTS General",
  toefl: "TOEFL iBT",
  "sat-essay": "SAT Essay",
  pte: "PTE Academic",
  cambridge: "Cambridge English",
}

export default function WritingEditorPage() {
  const params = useParams()
  const searchParams = useSearchParams()

  const type = params.type as string
  const subject = searchParams.get("subject") || "ielts-academic"
  const timerMinutes = parseInt(searchParams.get("timer") || "30", 10)

  const promptData = promptBank[type] || promptBank.essay

  const [content, setContent] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [spellCheck, setSpellCheck] = useState(true)
  const [showFeedback, setShowFeedback] = useState(false)

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length

  const handleTimeout = useCallback(() => {
    setSubmitted(true)
  }, [])

  const { minutes, seconds, progress, isLow, setIsRunning } = useTimer(timerMinutes, handleTimeout)

  // Auto-save to localStorage every 30 seconds
  useEffect(() => {
    if (submitted) return
    const autoSaveKey = `writing_${type}_${subject}`
    const interval = setInterval(() => {
      localStorage.setItem(autoSaveKey, content)
    }, 30000)
    return () => clearInterval(interval)
  }, [content, type, subject, submitted])

  // Restore auto-saved content on mount
  useEffect(() => {
    const autoSaveKey = `writing_${type}_${subject}`
    const saved = localStorage.getItem(autoSaveKey)
    if (saved) {
      setContent(saved)
    }
  }, [type, subject])

  // Copy/paste disabled
  const handleCopy = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
  }, [])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
  }, [])

  // Submit handler
  const handleSubmit = () => {
    setIsRunning(false)
    setSubmitted(true)
    const autoSaveKey = `writing_${type}_${subject}`
    localStorage.removeItem(autoSaveKey)
  }

  // Show AI feedback
  const handleShowFeedback = () => {
    setShowFeedback(true)
  }

  // Feedback data
  const feedbackCategories = [
    {
      label: "Task Achievement",
      score: "6.5",
      comment: "Addresses the prompt but could develop ideas more fully. Consider adding specific examples.",
      color: "text-[rgb(245,166,35)]",
      bg: "bg-[rgb(245,166,35)]/10",
    },
    {
      label: "Coherence & Cohesion",
      score: "7.0",
      comment: "Good logical flow and paragraph structure. Transition words used effectively.",
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Lexical Resource",
      score: "6.5",
      comment: "Adequate vocabulary range with some good choices. Could include more academic terms.",
      color: "text-[rgb(245,166,35)]",
      bg: "bg-[rgb(245,166,35)]/10",
    },
    {
      label: "Grammatical Range",
      score: "7.0",
      comment: "Good mix of sentence structures. Minor errors in subject-verb agreement.",
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
  ]

  const overallScore = "6.8"

  // Score bar color
  const scoreColor =
    parseFloat(overallScore) >= 7.0
      ? "from-emerald-500 to-green-500"
      : parseFloat(overallScore) >= 6.0
      ? "from-[rgb(245,166,35)] to-yellow-500"
      : "from-red-400 to-orange-500"

  const timerColor = isLow ? "text-red-500" : "text-gray-700"

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* ════════════════════════════════════════ */}
      {/* TOP BAR                                  */}
      {/* ════════════════════════════════════════ */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(71,32,183)]/10">
            <Pen className="h-5 w-5 text-[rgb(71,32,183)]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[rgb(30,39,97)]">
              {taskLabel[type] || "Writing"} Practice
            </h1>
            <p className="text-xs text-gray-500">
              {subjectLabel[subject] || subject} &middot; {timerMinutes} min
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!submitted && (
            <div className="flex items-center gap-2">
              <Label htmlFor="spellcheck" className="text-xs text-gray-500 cursor-pointer">
                Spell Check
              </Label>
              <div
                className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${
                  spellCheck ? "bg-[rgb(71,32,183)]" : "bg-gray-300"
                }`}
                onClick={() => setSpellCheck(!spellCheck)}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    spellCheck ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </div>
          )}
          <Badge
            variant="outline"
            className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 ${timerColor}`}
          >
            <Clock className="h-4 w-4" />
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </Badge>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* TIMER BAR                                */}
      {/* ════════════════════════════════════════ */}
      {!submitted && (
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isLow ? "bg-red-500" : "bg-gradient-to-r from-[rgb(71,32,183)] to-[rgb(245,166,35)]"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* ════════════════════════════════════════ */}
      {/* PROMPT DISPLAY                           */}
      {/* ════════════════════════════════════════ */}
      <Card className="border-[rgb(71,32,183)]/20 bg-gradient-to-r from-[rgb(71,32,183)]/5 to-transparent">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(71,32,183)] text-white text-xs font-bold shrink-0">
              Q
            </div>
            <div>
              <p className="text-sm font-bold text-[rgb(30,39,97)] mb-1">{promptData.title}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{promptData.prompt}</p>
              <p className="text-xs text-gray-500 mt-2">
                Word limit: <span className="font-semibold">{promptData.wordLimit} words</span>
                &nbsp;&middot;&nbsp; Current: <span className="font-semibold">{wordCount} words</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ════════════════════════════════════════ */}
      {/* MAIN: EDITOR / RESULTS                   */}
      {/* ════════════════════════════════════════ */}
      {!submitted ? (
        <>
          <div className="relative">
            <Textarea
              placeholder="Start writing here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onCopy={handleCopy}
              onPaste={handlePaste}
              spellCheck={spellCheck}
              className="min-h-[400px] md:min-h-[500px] text-base leading-relaxed p-5 resize-y bg-white border-gray-200 focus-visible:ring-[rgb(71,32,183)]"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-gray-400 bg-white/90 px-2 py-1 rounded-md">
              <FileText className="h-3.5 w-3.5" />
              {wordCount} words
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Auto-saved every 30s
              </span>
              &nbsp;&middot;&nbsp; Copy/paste disabled for test security
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setContent("")
                  const autoSaveKey = `writing_${type}_${subject}`
                  localStorage.removeItem(autoSaveKey)
                }}
              >
                Clear
              </Button>
              <Button
                size="lg"
                className="font-semibold gap-2"
                onClick={handleSubmit}
                disabled={wordCount < 50}
              >
                <CheckCircle className="h-4 w-4" />
                Submit Writing
              </Button>
            </div>
          </div>
        </>
      ) : (
        /* ════════════════════════════════════════ */
        /* RESULTS & FEEDBACK                       */
        /* ════════════════════════════════════════ */
        <div className="space-y-6">
          {/* Submitted confirmation */}
          <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-white">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-emerald-800">Writing Submitted Successfully</h2>
                <p className="text-sm text-emerald-600">
                  {wordCount} words written in {timerMinutes} minutes
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Read-only writing review */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[rgb(30,39,97)]">
                <FileText className="h-4 w-4 text-[rgb(71,32,183)]" />
                Your Writing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {content || "(No content written)"}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                <span className="font-semibold">{wordCount}</span> words
              </p>
            </CardContent>
          </Card>

          {/* AI Feedback toggle */}
          {!showFeedback ? (
            <div className="text-center">
              <Button
                size="xl"
                className="font-bold gap-2 bg-[rgb(245,166,35)] hover:bg-[rgb(220,150,30)] text-white shadow-lg"
                onClick={handleShowFeedback}
              >
                <Sparkles className="h-5 w-5" />
                View AI-Powered Feedback
              </Button>
            </div>
          ) : (
            <>
              {/* Overall score */}
              <Card className="border-gray-200 bg-gradient-to-br from-[rgb(71,32,183)]/5 to-[rgb(30,39,97)]/5">
                <CardContent className="p-6 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Overall Band Score</p>
                  <p className="text-5xl font-extrabold text-[rgb(30,39,97)]">{overallScore}</p>
                  <p className="text-sm text-gray-500 mt-1">Estimate &middot; IELTS equivalent</p>
                  <div className="w-full max-w-xs mx-auto mt-4 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${scoreColor}`}
                      style={{ width: `${(parseFloat(overallScore) / 9) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Category scores */}
              <div className="grid sm:grid-cols-2 gap-4">
                {feedbackCategories.map((cat) => (
                  <Card key={cat.label} className="border-gray-200">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-[rgb(30,39,97)]">{cat.label}</p>
                        <Badge className={`${cat.bg} ${cat.color} border-0`}>{cat.score}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{cat.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Improvement suggestions */}
              <Card className="border-gray-200 bg-gradient-to-r from-[rgb(245,166,35)]/5 to-transparent">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-[rgb(30,39,97)] mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[rgb(245,166,35)]" />
                    Suggested Improvements
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[rgb(245,166,35)] font-bold">&bull;</span>
                      Expand your introduction with a clearer thesis statement outlining your main arguments.
                    </li>
                    <li className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[rgb(245,166,35)] font-bold">&bull;</span>
                      Add specific examples or data to strengthen your body paragraphs.
                    </li>
                    <li className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[rgb(245,166,35)] font-bold">&bull;</span>
                      Use more academic vocabulary — consider synonyms for commonly used words.
                    </li>
                    <li className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[rgb(245,166,35)] font-bold">&bull;</span>
                      Vary your sentence structures (simple, compound, complex) for a higher grammar score.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {/* Download + Teacher review */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(71,32,183)]/10">
                <BookOpen className="h-4 w-4 text-[rgb(71,32,183)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[rgb(30,39,97)]">Teacher Review Available</p>
                <p className="text-xs text-gray-500">Responses can be reviewed by AEEG instructors for detailed feedback</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
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
                <p className="text-sm font-semibold text-emerald-800">Get Instructor Feedback on WhatsApp</p>
                <p className="text-xs text-emerald-600">Send your writing for expert review</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-emerald-400" />
          </div>
        </a>
      </section>
    </div>
  )
}