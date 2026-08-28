'use client'

import { useState } from "react"
import Link from "next/link"
import {
  Headphones,
  Volume2,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Clock,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

/* ───────── Subject Config ───────── */
const subjects = [
  { key: "ielts", label: "IELTS", description: "Academic & General Training Listening", icon: "🌍" },
  { key: "toefl", label: "TOEFL iBT", description: "Academic lectures & campus conversations", icon: "🗽" },
  { key: "general", label: "General English", description: "Everyday conversations & announcements", icon: "📖" },
  { key: "pte", label: "PTE Academic", description: "Summarize spoken text & fill blanks", icon: "📝" },
  { key: "cambridge", label: "Cambridge English", description: "FCE, CAE & CPE listening tasks", icon: "🎓" },
]

/* ───────── Section Types ───────── */
const sections = [
  { key: "conversation", label: "Conversation", description: "Two or more speakers in a social/academic context" },
  { key: "lecture", label: "Lecture", description: "Academic lecture or presentation" },
  { key: "announcement", label: "Announcement", description: "Public or institutional announcements" },
  { key: "mixed", label: "Mixed", description: "Combination of conversation, lecture, and announcements" },
]

/* ───────── Difficulty Options ───────── */
const difficultyOptions = [
  {
    key: "easy",
    label: "Easy",
    description: "Slower speech, simpler vocabulary, shorter passages",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
  },
  {
    key: "medium",
    label: "Medium",
    description: "Natural pace, moderate vocabulary, standard length",
    color: "text-[rgb(245,166,35)]",
    bg: "bg-[rgb(245,166,35)]/10",
    border: "border-[rgb(245,166,35)]/30",
  },
  {
    key: "hard",
    label: "Hard",
    description: "Fast speech, academic vocabulary, longer passages",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-300",
  },
]

/* ───────── Mock Questions ───────── */
const mockQuestions = [
  {
    id: 1,
    question: "What is the main topic of the conversation?",
    options: ["A. University registration", "B. Library hours", "C. Course selection", "D. Scholarship application"],
  },
  {
    id: 2,
    question: "When does the registration period end?",
    options: ["A. Friday", "B. Next Monday", "C. Two weeks from now", "D. End of the month"],
  },
  {
    id: 3,
    question: "What document does the student need to submit?",
    options: ["A. Passport copy", "B. Transcript", "C. Recommendation letter", "D. Application form"],
  },
]

export default function ListeningPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("ielts")
  const [selectedSection, setSelectedSection] = useState<string>("conversation")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("medium")
  const [showQuestions, setShowQuestions] = useState(false)

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
              <Headphones className="h-3 w-3 mr-1.5 inline-block" />
              Listening Assessment
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Listening Practice
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Sharpen your listening skills with realistic audio passages. Practice with
              conversations, lectures, and announcements designed for IELTS, TOEFL, and more.
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
      {/* SECTION + DIFFICULTY                      */}
      {/* ════════════════════════════════════════ */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Section selector */}
        <div>
          <h2 className="text-lg font-bold text-[rgb(13,33,55)] mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-[rgb(26,35,126)]" />
            Section Type
          </h2>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setSelectedSection(section.key)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedSection === section.key
                    ? "border-[rgb(26,35,126)] bg-[rgb(26,35,126)]/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                    selectedSection === section.key
                      ? "bg-[rgb(26,35,126)] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {section.label[0]}
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      selectedSection === section.key ? "text-[rgb(26,35,126)]" : "text-gray-800"
                    }`}
                  >
                    {section.label}
                  </p>
                  <p className="text-xs text-gray-500">{section.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty selector */}
        <div>
          <h2 className="text-lg font-bold text-[rgb(13,33,55)] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[rgb(245,166,35)]" />
            Difficulty
          </h2>
          <div className="space-y-2">
            {difficultyOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedDifficulty(opt.key)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedDifficulty === opt.key
                    ? `${opt.border} ${opt.bg}`
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                    selectedDifficulty === opt.key ? `${opt.bg} ${opt.color}` : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {opt.key === "easy" ? "E" : opt.key === "medium" ? "M" : "H"}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${selectedDifficulty === opt.key ? opt.color : "text-gray-800"}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-gray-500">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* START LISTENING + AUDIO NOTE             */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <Volume2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-600">Audio Preview</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                Audio content will play here — questions appear below. Press start to begin.
              </p>
            </div>
            <div className="mt-4">
              <Link href={`/listening/${selectedSubject}/${selectedSection}/${selectedDifficulty}`}>
                <Button
                  size="xl"
                  className="w-full font-bold text-base gap-2 shadow-lg shadow-[rgb(26,35,126)]/20"
                >
                  <Headphones className="h-5 w-5" />
                  Start Listening
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mock Questions Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[rgb(13,33,55)] flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-[rgb(26,35,126)]" />
                Sample Questions
              </h3>
              <button
                onClick={() => setShowQuestions(!showQuestions)}
                className="text-xs text-[rgb(26,35,126)] font-medium hover:underline"
              >
                {showQuestions ? "Hide" : "Show"}
              </button>
            </div>
            {showQuestions && (
              <div className="space-y-3">
                {mockQuestions.map((q) => (
                  <Card key={q.id} className="border-gray-200 bg-white">
                    <CardContent className="p-3">
                      <p className="text-sm font-medium text-[rgb(13,33,55)] mb-2">
                        {q.id}. {q.question}
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            className="text-xs text-gray-600 px-2 py-1 rounded bg-gray-50 border border-gray-100"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* TIPS                                     */}
      {/* ════════════════════════════════════════ */}
      <section>
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[rgb(13,33,55)]">
              <Sparkles className="h-4 w-4 text-[rgb(245,166,35)]" />
              Listening Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Read the questions before the audio starts to know what to listen for.",
                "Focus on keywords and signposts (first, next, finally) to track the passage flow.",
                "Don't get stuck on one question — move on and come back if time permits.",
                "Pay attention to speaker tone and emphasis — they often signal the correct answer.",
                "Practice with different accents (British, American, Australian) for IELTS.",
                "Take notes while listening — use abbreviations for faster writing.",
              ].map((tip, i) => (
                <div key={i} className="flex gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
              Need Help With Listening?
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mt-2 mb-6 leading-relaxed">
              Get personalized listening practice strategies and tips from our expert instructors.
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
                Chat on WhatsApp
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}