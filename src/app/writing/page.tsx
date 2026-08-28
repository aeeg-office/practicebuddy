'use client'

import { useState } from "react"
import Link from "next/link"
import {
  Pen,
  Timer,
  FileText,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Clock,
  Edit,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

/* ───────── Subject & Task Config ───────── */
const subjects = [
  { key: "ielts-academic", label: "IELTS Academic", description: "Essay writing for academic contexts", icon: "📚" },
  { key: "ielts-general", label: "IELTS General", description: "Letter writing for everyday contexts", icon: "✉️" },
  { key: "toefl", label: "TOEFL", description: "Academic essay and integrated writing", icon: "🗽" },
  { key: "sat-essay", label: "SAT Essay", description: "Evidence-based argument analysis", icon: "🎯" },
  { key: "pte", label: "PTE Academic", description: "Summarize written text & essay", icon: "📝" },
  { key: "cambridge", label: "Cambridge English", description: "Advanced writing for first & proficiency", icon: "🎓" },
]

const taskTypes = [
  { key: "essay", label: "Essay", description: "Structured argument or opinion piece" },
  { key: "letter", label: "Letter", description: "Formal or informal letter writing" },
  { key: "report", label: "Report", description: "Chart, graph, or data analysis report" },
  { key: "summary", label: "Summary", description: "Summarize written or spoken text" },
]

const timerOptions = [
  { value: 20, label: "20 min" },
  { value: 30, label: "30 min" },
  { value: 40, label: "40 min" },
  { value: 60, label: "60 min" },
]

const tipsList = [
  "Read the prompt carefully and identify key requirements before you start writing.",
  "Spend 2-3 minutes planning your structure — introduction, body paragraphs, conclusion.",
  "Leave 5 minutes at the end to review and edit your work.",
  "Use clear topic sentences and specific examples to support your arguments.",
  "Write neatly (or type clearly) — legibility matters in scored tests.",
  "Stay within the word limit — every test has specific range requirements.",
]

export default function WritingPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("ielts-academic")
  const [selectedTask, setSelectedTask] = useState<string>("essay")
  const [selectedTimer, setSelectedTimer] = useState<number>(30)

  const selectedSubjectData = subjects.find((s) => s.key === selectedSubject)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* ════════════════════════════════════════ */}
      {/* HERO                                     */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgb(26,35,126)] via-[rgb(60,25,160)] to-[rgb(13,33,55)] p-8 md:p-12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-[rgb(245,166,35)]/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative">
            <Badge className="mb-4 px-3 py-1 bg-white/20 text-white border-white/20 text-xs tracking-wider uppercase">
              <Pen className="h-3 w-3 mr-1.5 inline-block" />
              Writing Assessment
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Writing Practice
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Build your writing skills with timed practice sessions. Choose your exam type,
              select a task, and get real-time feedback with AI-powered evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* SUBJECT SELECTOR                         */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-lg font-bold text-[rgb(13,33,55)] mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[rgb(26,35,126)]" />
          Select Exam Type
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {subjects.map((subject) => (
            <button
              key={subject.key}
              onClick={() => setSelectedSubject(subject.key)}
              className={`relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-300 ${
                selectedSubject === subject.key
                  ? "border-[rgb(26,35,126)] bg-[rgb(26,35,126)]/5 shadow-md"
                  : "border-gray-200 bg-white hover:border-[rgb(26,35,126)]/30 hover:shadow-sm"
              }`}
            >
              <div className="text-2xl mb-2">{subject.icon}</div>
              <h3
                className={`text-sm font-bold ${
                  selectedSubject === subject.key ? "text-[rgb(26,35,126)]" : "text-[rgb(13,33,55)]"
                }`}
              >
                {subject.label}
              </h3>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{subject.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* TASK TYPE + TIMER                        */}
      {/* ════════════════════════════════════════ */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Task Type */}
        <div>
          <h2 className="text-lg font-bold text-[rgb(13,33,55)] mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-[rgb(26,35,126)]" />
            Task Type
          </h2>
          <div className="space-y-2">
            {taskTypes.map((task) => (
              <button
                key={task.key}
                onClick={() => setSelectedTask(task.key)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedTask === task.key
                    ? "border-[rgb(26,35,126)] bg-[rgb(26,35,126)]/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                    selectedTask === task.key
                      ? "bg-[rgb(26,35,126)] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {task.label[0]}
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      selectedTask === task.key ? "text-[rgb(26,35,126)]" : "text-gray-800"
                    }`}
                  >
                    {task.label}
                  </p>
                  <p className="text-xs text-gray-500">{task.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Timer Options + Quick Info */}
        <div>
          <h2 className="text-lg font-bold text-[rgb(13,33,55)] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[rgb(245,166,35)]" />
            Time Limit
          </h2>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {timerOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedTimer(opt.value)}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                  selectedTimer === opt.value
                    ? "border-[rgb(245,166,35)] bg-[rgb(245,166,35)]/10 text-[rgb(13,33,55)]"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <Timer className="h-4 w-4" />
                {opt.label}
              </button>
            ))}
          </div>

          {/* Subject quick info */}
          {selectedSubjectData && (
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(26,35,126)]/10 text-lg shrink-0">
                    {selectedSubjectData.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[rgb(13,33,55)]">{selectedSubjectData.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {selectedSubjectData.description} — {selectedTimer} min, {selectedTask} format
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* START WRITING BUTTON                     */}
      {/* ════════════════════════════════════════ */}
      <section>
        <Link href={`/writing/${selectedTask}?subject=${selectedSubject}&timer=${selectedTimer}`}>
          <Button
            size="xl"
            className="w-full md:w-auto font-bold text-base gap-2 shadow-lg shadow-[rgb(26,35,126)]/20"
          >
            <Edit className="h-5 w-5" />
            Start Writing
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* TIPS & INSTRUCTIONS                      */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[rgb(13,33,55)]">
                <Sparkles className="h-4 w-4 text-[rgb(245,166,35)]" />
                Writing Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {tipsList.map((tip, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[rgb(13,33,55)]">
                <HelpCircle className="h-4 w-4 text-[rgb(26,35,126)]" />
                What to Expect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(26,35,126)]/10 shrink-0">
                  <Pen className="h-4 w-4 text-[rgb(26,35,126)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[rgb(13,33,55)]">AI-Powered Feedback</p>
                  <p className="text-xs text-gray-500">Get instant analysis of structure, grammar, vocabulary, and coherence</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(245,166,35)]/10 shrink-0">
                  <Timer className="h-4 w-4 text-[rgb(245,166,35)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[rgb(13,33,55)]">Timed Practice</p>
                  <p className="text-xs text-gray-500">Simulate real test conditions with countdown and auto-submit</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 shrink-0">
                  <FileText className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[rgb(13,33,55)]">Score Report</p>
                  <p className="text-xs text-gray-500">Detailed breakdown by criteria with band scores and suggestions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* WHATSAPP CTA                              */}
      {/* ════════════════════════════════════════ */}
      <section className="pb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgb(13,33,55)] to-[rgb(26,35,126)] p-8 md:p-10 text-center shadow-xl">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[rgb(245,166,35)]/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Get Expert Writing Feedback
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mt-2 mb-6 leading-relaxed">
              Our experienced IELTS/TOEFL instructors can review your writing on WhatsApp
              with detailed corrections and score estimates.
            </p>
            <a
              href="https://mailto:hello@lumaani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="accent"
                size="xl"
                className="font-semibold shadow-lg shadow-black/20 gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Us on WhatsApp
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}