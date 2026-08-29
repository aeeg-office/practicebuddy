'use client'

import { useState } from "react"
import Link from "next/link"
import {
  Clock,
  ArrowRight,
  BookOpen,
  Calculator,
  Globe,
  PenTool,
  Layers,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Target,
  BarChart3,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { mockExams, subjectMeta, type MockExam } from "@/data/mock-exams-data"

/* ───────── Subject config ───────── */
const subjects = [
  {
    key: "sat" as const,
    title: "Digital SAT",
    description: "College admissions — Evidence-Based Reading & Writing and Math. 2 modules per section, adaptive difficulty.",
    Icon: BookOpen,
    gradient: "from-blue-600 to-blue-700",
    lightBg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderHover: "hover:border-blue-400",
    label: "College Admissions",
    examCount: mockExams.sat.filter((e) => e.active).length,
  },
  {
    key: "act" as const,
    title: "ACT",
    description: "College admissions — English, Math, Reading, Science. 4 sections with timed pacing.",
    Icon: Calculator,
    gradient: "from-emerald-600 to-emerald-700",
    lightBg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-400",
    label: "College Admissions",
    examCount: mockExams.act.filter((e) => e.active).length,
  },
  {
    key: "ielts" as const,
    title: "IELTS Academic",
    description: "English proficiency — Listening, Reading, Writing, Speaking. Study abroad preparation.",
    Icon: Globe,
    gradient: "from-orange-500 to-orange-600",
    lightBg: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    borderHover: "hover:border-orange-400",
    label: "English Proficiency",
    examCount: mockExams.ielts.filter((e) => e.active).length,
  },
  {
    key: "toefl" as const,
    title: "TOEFL iBT",
    description: "Academic English — Reading, Listening, Speaking, Writing. University-ready assessment.",
    Icon: PenTool,
    gradient: "from-teal-500 to-teal-600",
    lightBg: "bg-teal-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    borderHover: "hover:border-teal-400",
    label: "English Proficiency",
    examCount: mockExams.toefl.filter((e) => e.active).length,
  },
]

/* ───────── Duration formatter ───────── */
function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} hr`
  return `${h} hr ${m} min`
}

/* ───────── Difficulty config ───────── */
const difficultyConfig = {
  Easy: { color: "text-emerald-600", bg: "bg-emerald-100" },
  Medium: { color: "text-[#c8785a]", bg: "bg-[#c8785a]/10" },
  Hard: { color: "text-red-500", bg: "bg-red-100" },
}

export default function MockExamsPage() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null)

  const filteredSubjects = activeSubject
    ? subjects.filter((s) => s.key === activeSubject)
    : subjects

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* ── Hero Section ── */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgb(11,79,74)] via-[rgb(11,79,74)] to-[rgb(22,32,34)] p-8 md:p-12">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-[rgb(200,120,90)]/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative">
            <Badge className="mb-4 px-3 py-1 bg-white/20 text-white border-white/20 text-xs tracking-wider uppercase">
              <Sparkles className="h-3 w-3 mr-1" />
              Full-Length Practice
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Mock Examinations
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Preview our mock exam experience with timed pacing, question navigator,
              flagging, and detailed score reports.
            </p>
          </div>
        </div>
      </section>

      {/* ── Demo / Preview notice ── */}
      <section>
        <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold">Preview — not a live exam.</p>
            <p className="mt-0.5">
              This catalog and its question content are a static demo and are not yet connected
              to our question bank. Full mock exams are coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* ── Subject Filter ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={activeSubject === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveSubject(null)}
          className="rounded-full text-xs"
        >
          All Subjects
        </Button>
        {subjects.map((s) => (
          <Button
            key={s.key}
            variant={activeSubject === s.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSubject(s.key)}
            className="rounded-full text-xs gap-1.5"
          >
            <span className="text-xs">{s.Icon === BookOpen ? "📖" : s.Icon === Calculator ? "🔢" : s.Icon === Globe ? "🌍" : "🗽"}</span>
            {s.title}
          </Button>
        ))}
      </div>

      {/* ── Exam Cards by Subject ── */}
      {filteredSubjects.map((subject) => {
        const exams = mockExams[subject.key].filter((e) => e.active)
        if (exams.length === 0) return null

        return (
          <section key={subject.key}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${subject.iconBg} ${subject.iconColor}`}>
                  <subject.Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[rgb(22,32,34)]">{subject.title}</h2>
                  <p className="text-xs text-gray-500">{subject.description}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {exams.length} exams
              </Badge>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {exams.map((exam) => (
                <Card
                  key={exam.id}
                  className="group border-gray-200/70 hover:border-[rgb(11,79,74)]/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Top: Exam name + difficulty */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-[rgb(22,32,34)] leading-tight group-hover:text-[rgb(11,79,74)] transition-colors">
                        {exam.name}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Badge
                          variant="outline"
                          className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 border-amber-300"
                        >
                          Preview
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 py-0.5 ${
                            difficultyConfig[exam.difficulty].bg
                          } ${difficultyConfig[exam.difficulty].color} border-0`}
                        >
                          {exam.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {exam.description}
                    </p>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[rgb(11,79,74)]" />
                        <span>{formatDuration(exam.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Layers className="h-3.5 w-3.5 text-[rgb(200,120,90)]" />
                        <span>{exam.sections.length} sections</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{exam.sections.reduce((sum, s) => sum + s.questionCount, 0)} Q</span>
                      </div>
                    </div>

                    {/* Sections list */}
                    <div className="flex flex-wrap gap-1.5">
                      {exam.sections.map((section) => (
                        <Badge
                          key={section.id}
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5"
                        >
                          {section.name} ({section.questionCount})
                        </Badge>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2 pt-1">
                      {exam.sections.map((section) => (
                        <Link
                          key={section.id}
                          href={`/mock-exams/${exam.id}/${section.id}`}
                          className="w-full"
                        >
                          <Button
                            variant={section.id === exam.sections[0].id ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-between text-xs gap-2"
                          >
                            <span>Start {section.name}</span>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3" />
                              <span>{section.timeLimit} min</span>
                              <ArrowRight className="h-3 w-3" />
                            </div>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )
      })}

      {/* ── WhatsApp CTA ── */}
      <section className="text-center py-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgb(22,32,34)] to-[rgb(11,79,74)] p-8 shadow-xl">
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Need Help With Your Prep?
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-lg mx-auto mb-6 leading-relaxed">
              Our academic advisors are one message away. Get personalized study plans,
              score improvement strategies, and answers to all your questions.
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