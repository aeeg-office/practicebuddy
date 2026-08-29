'use client'

import { useState } from "react"
import Link from "next/link"
import {
  Mic,
  Camera,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Clock,
  Volume2,
  Timer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

/* ───────── Subject Config ───────── */
const subjects = [
  { key: "ielts", label: "IELTS", description: "Face-to-face speaking test (Parts 1, 2 & 3)", icon: "🌍" },
  { key: "toefl", label: "TOEFL iBT", description: "Independent & integrated speaking tasks", icon: "🗽" },
  { key: "general", label: "General English", description: "Everyday spoken English practice", icon: "📖" },
  { key: "pte", label: "PTE Academic", description: "Read aloud, repeat sentence & describe image", icon: "📝" },
  { key: "cambridge", label: "Cambridge English", description: "FCE, CAE & CPE speaking tasks", icon: "🎓" },
]

/* ───────── Task Types ───────── */
const taskTypes = [
  { key: "describe-image", label: "Describe Image", description: "Describe a picture, graph, or diagram in detail" },
  { key: "express-opinion", label: "Express Opinion", description: "Share and justify your view on a given topic" },
  { key: "summarize", label: "Summarize", description: "Summarize spoken or written content concisely" },
  { key: "read-aloud", label: "Read Aloud", description: "Read a passage with correct pronunciation and intonation" },
]

/* ───────── Prep Time Options ───────── */
const prepTimeOptions = [
  { value: 15, label: "15 sec", description: "Quick preparation" },
  { value: 30, label: "30 sec", description: "Standard preparation" },
  { value: 60, label: "1 min", description: "Extended preparation" },
]

/* ───────── Speaking Time Options ───────── */
const speakingTimeOptions = [
  { value: 30, label: "30 sec", description: "Short response" },
  { value: 60, label: "1 min", description: "Standard response" },
  { value: 90, label: "1.5 min", description: "Extended response" },
  { value: 120, label: "2 min", description: "Full-length response" },
]

export default function SpeakingPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("ielts")
  const [selectedTask, setSelectedTask] = useState<string>("express-opinion")
  const [selectedPrepTime, setSelectedPrepTime] = useState<number>(30)
  const [selectedSpeakingTime, setSelectedSpeakingTime] = useState<number>(60)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* ════════════════════════════════════════ */}
      {/* HERO                                     */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgb(11,79,74)] via-[rgb(11,79,74)] to-[rgb(22,32,34)] p-8 md:p-12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-[rgb(200,120,90)]/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative">
            <Badge className="mb-4 px-3 py-1 bg-white/20 text-white border-white/20 text-xs tracking-wider uppercase">
              <Mic className="h-3 w-3 mr-1.5 inline-block" />
              Speaking Assessment
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Speaking Practice
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Improve your spoken English with timed speaking tasks. Practice describing images,
              expressing opinions, summarizing content, and reading aloud with AI-powered analysis.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* SUBJECT SELECTOR                         */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-lg font-bold text-[rgb(22,32,34)] mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[rgb(11,79,74)]" />
          Select Exam Type
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {subjects.map((subject) => (
            <button
              key={subject.key}
              onClick={() => setSelectedSubject(subject.key)}
              className={`relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-300 ${
                selectedSubject === subject.key
                  ? "border-[rgb(11,79,74)] bg-[rgb(11,79,74)]/5 shadow-md"
                  : "border-gray-200 bg-white hover:border-[rgb(11,79,74)]/30 hover:shadow-sm"
              }`}
            >
              <div className="text-2xl mb-2">{subject.icon}</div>
              <h3
                className={`text-sm font-bold ${
                  selectedSubject === subject.key ? "text-[rgb(11,79,74)]" : "text-[rgb(22,32,34)]"
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
      {/* TASK TYPE                                 */}
      {/* ════════════════════════════════════════ */}
      <section>
        <h2 className="text-lg font-bold text-[rgb(22,32,34)] mb-4 flex items-center gap-2">
          <Camera className="h-5 w-5 text-[rgb(11,79,74)]" />
          Task Type
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {taskTypes.map((task) => (
            <button
              key={task.key}
              onClick={() => setSelectedTask(task.key)}
              className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                selectedTask === task.key
                  ? "border-[rgb(11,79,74)] bg-[rgb(11,79,74)]/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  selectedTask === task.key ? "text-[rgb(11,79,74)]" : "text-[rgb(22,32,34)]"
                }`}
              >
                {task.label}
              </p>
              <p className="text-xs text-gray-500 mt-1">{task.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* PREP TIME + SPEAKING TIME                 */}
      {/* ════════════════════════════════════════ */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Preparation Time */}
        <div>
          <h2 className="text-lg font-bold text-[rgb(22,32,34)] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[rgb(200,120,90)]" />
            Preparation Time
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {prepTimeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedPrepTime(opt.value)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                  selectedPrepTime === opt.value
                    ? "border-[rgb(200,120,90)] bg-[rgb(200,120,90)]/10"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <Timer className={`h-5 w-5 mb-1 ${
                  selectedPrepTime === opt.value ? "text-[rgb(200,120,90)]" : "text-gray-400"
                }`} />
                <p className={`text-sm font-bold ${
                  selectedPrepTime === opt.value ? "text-[rgb(22,32,34)]" : "text-gray-700"
                }`}>
                  {opt.label}
                </p>
                <p className="text-[10px] text-gray-500">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Speaking Time */}
        <div>
          <h2 className="text-lg font-bold text-[rgb(22,32,34)] mb-4 flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-[rgb(11,79,74)]" />
            Speaking Time
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {speakingTimeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedSpeakingTime(opt.value)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                  selectedSpeakingTime === opt.value
                    ? "border-[rgb(11,79,74)] bg-[rgb(11,79,74)]/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <Mic className={`h-5 w-5 mb-1 ${
                  selectedSpeakingTime === opt.value ? "text-[rgb(11,79,74)]" : "text-gray-400"
                }`} />
                <p className={`text-sm font-bold ${
                  selectedSpeakingTime === opt.value ? "text-[rgb(11,79,74)]" : "text-gray-700"
                }`}>
                  {opt.label}
                </p>
                <p className="text-[10px] text-gray-500">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* START RECORDING BUTTON                   */}
      {/* ════════════════════════════════════════ */}
      <section>
        <Link
          href={`/speaking/${selectedSubject}/${selectedTask}?prep=${selectedPrepTime}&speak=${selectedSpeakingTime}`}
        >
          <Button
            size="xl"
            className="w-full md:w-auto font-bold text-base gap-2 shadow-lg shadow-[rgb(11,79,74)]/20"
          >
            <Mic className="h-5 w-5" />
            Start Recording
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* INSTRUCTIONS & TIPS                      */}
      {/* ════════════════════════════════════════ */}
      <section>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[rgb(22,32,34)]">
                <Sparkles className="h-4 w-4 text-[rgb(200,120,90)]" />
                Speaking Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {[
                  "Speak clearly and at a natural pace — don't rush through your response.",
                  "Use the preparation time to outline 2-3 key points you want to cover.",
                  "Vary your vocabulary and sentence structures to show range.",
                  "If you make a mistake, don't stop — keep speaking and correct yourself naturally.",
                  "Use discourse markers (firstly, moreover, in conclusion) for better coherence.",
                  "Record yourself and listen back to identify areas for improvement.",
                ].map((tip, i) => (
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
              <CardTitle className="text-base flex items-center gap-2 text-[rgb(22,32,34)]">
                <HelpCircle className="h-4 w-4 text-[rgb(11,79,74)]" />
                Assessment Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Fluency & Coherence", desc: "Natural flow of speech with logical progression of ideas" },
                { label: "Pronunciation", desc: "Clarity of speech, intonation, and word stress patterns" },
                { label: "Grammar", desc: "Grammatical accuracy and range of sentence structures" },
                { label: "Vocabulary", desc: "Lexical range and appropriateness for the task" },
              ].map((criterion, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                      i === 0
                        ? "bg-[rgb(11,79,74)]/10"
                        : i === 1
                        ? "bg-[rgb(200,120,90)]/10"
                        : i === 2
                        ? "bg-emerald-500/10"
                        : "bg-blue-500/10"
                    }`}
                  >
                    <span className={`text-xs font-bold ${
                      i === 0
                        ? "text-[rgb(11,79,74)]"
                        : i === 1
                        ? "text-[rgb(200,120,90)]"
                        : i === 2
                        ? "text-emerald-600"
                        : "text-blue-600"
                    }`}>
                      {criterion.label[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[rgb(22,32,34)]">{criterion.label}</p>
                    <p className="text-xs text-gray-500">{criterion.desc}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-400 mt-2 italic">
                Responses can be reviewed by Lumaani instructors for personalized feedback
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* WHATSAPP CTA                              */}
      {/* ════════════════════════════════════════ */}
      <section className="pb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgb(22,32,34)] to-[rgb(11,79,74)] p-8 md:p-10 text-center shadow-xl">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[rgb(200,120,90)]/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Practice Speaking with a Coach
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mt-2 mb-6 leading-relaxed">
              Get one-on-one speaking practice and real-time feedback from our experienced instructors on WhatsApp.
            </p>
            <a
              href="mailto:hello@lumaani.com"
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
                Book a Speaking Session
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}