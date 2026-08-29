'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useSearchParams } from "next/navigation"
import {
  Mic,
  Volume2,
  Play,
  Timer,
  Clock,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  BookOpen,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

/* ───────── Task Labels ───────── */
const subjectLabel: Record<string, string> = {
  ielts: "IELTS",
  toefl: "TOEFL iBT",
  general: "General English",
  pte: "PTE Academic",
  cambridge: "Cambridge English",
}

const taskLabel: Record<string, string> = {
  "describe-image": "Describe Image",
  "express-opinion": "Express Opinion",
  "summarize": "Summarize",
  "read-aloud": "Read Aloud",
}

/* ───────── Prompt bank ───────── */
const promptBank: Record<string, { title: string; instructions: string }> = {
  "describe-image": {
    title: "Describe the Image",
    instructions:
      "Look at the following image description and describe what you see in detail. Talk about the main subject, background, colors, actions, and any notable features. Organize your description logically from general to specific.",
  },
  "express-opinion": {
    title: "Express Your Opinion",
    instructions:
      "Some people believe that social media has a positive impact on society, while others think its effects are mostly negative. Discuss both perspectives and give your own opinion with reasons and examples to support your view.",
  },
  summarize: {
    title: "Summarize the Content",
    instructions:
      "Summarize the following passage in your own words: 'Renewable energy sources such as solar, wind, and hydroelectric power are becoming increasingly important as the world seeks to reduce carbon emissions. These clean energy technologies have seen significant cost reductions over the past decade, making them more accessible to developing nations.'",
  },
  "read-aloud": {
    title: "Read the Passage Aloud",
    instructions:
      "Read the following passage clearly and with appropriate intonation: 'The invention of the printing press in the 15th century revolutionized the way information was shared across Europe. For the first time, books could be produced quickly and in large quantities, making knowledge more accessible to the general public. This technological breakthrough laid the foundation for the modern information age.'",
  },
}

/* ───────── Timer hook (countdown) ───────── */
function useCountdown(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setIsComplete(true)
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const reset = useCallback((seconds: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimeLeft(seconds)
    setIsRunning(false)
    setIsComplete(false)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return { timeLeft, minutes, seconds, isRunning, isComplete, setIsRunning, reset }
}

export default function SpeakingAssessmentPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string[] || []

  const subject = slug[0] || "ielts"
  const task = slug[1] || "express-opinion"
  const prepSeconds = parseInt(searchParams.get("prep") || "30", 10)
  const speakSeconds = parseInt(searchParams.get("speak") || "60", 10)

  const promptData = promptBank[task] || promptBank["express-opinion"]

  // Phases: "setup" → "preparation" → "recording" → "complete"
  const [phase, setPhase] = useState<"setup" | "preparation" | "recording" | "complete">("setup")
  const [showFeedback, setShowFeedback] = useState(false)
  const [micGranted, setMicGranted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const prepTimer = useCountdown(prepSeconds)
  const speakTimer = useCountdown(speakSeconds)

  // Handle prep timer completion → start recording
  useEffect(() => {
    if (prepTimer.isComplete && phase === "preparation") {
      setPhase("recording")
      speakTimer.setIsRunning(true)
    }
  }, [prepTimer.isComplete, phase, speakTimer])

  // Handle speak timer completion
  useEffect(() => {
    if (speakTimer.isComplete && phase === "recording") {
      setPhase("complete")
    }
  }, [speakTimer.isComplete, phase])

  const handleStartPrep = () => {
    setPhase("preparation")
    prepTimer.reset(prepSeconds)
    prepTimer.setIsRunning(true)
  }

  const handleRequestMic = () => {
    // Simulate permission request
    setMicGranted(true)
  }

  const endRecording = () => {
    prepTimer.setIsRunning(false)
    speakTimer.setIsRunning(false)
    setPhase("complete")
  }

  // Reset all
  const handleTryAgain = () => {
    setPhase("setup")
    setShowFeedback(false)
    prepTimer.reset(prepSeconds)
    speakTimer.reset(speakSeconds)
  }

  // Feedback data
  const feedbackCategories = [
    {
      label: "Fluency & Coherence",
      score: "7.0",
      comment: "Good flow with logical progression of ideas. Minor hesitations noted.",
      color: "text-[rgb(11,79,74)]",
      bg: "bg-[rgb(11,79,74)]/10",
    },
    {
      label: "Pronunciation",
      score: "6.5",
      comment: "Clear articulation. Work on intonation patterns and word stress.",
      color: "text-[rgb(200,120,90)]",
      bg: "bg-[rgb(200,120,90)]/10",
    },
    {
      label: "Grammar",
      score: "7.0",
      comment: "Good grammatical range with some complex structures used correctly.",
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Vocabulary",
      score: "6.5",
      comment: "Adequate lexical range. Could include more topic-specific terms.",
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
  ]

  const overallScore = "6.8"

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* ════════════════════════════════════════ */}
      {/* TOP BAR                                  */}
      {/* ════════════════════════════════════════ */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(11,79,74)]/10">
            <Mic className="h-5 w-5 text-[rgb(11,79,74)]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[rgb(22,32,34)]">Speaking Assessment</h1>
            <p className="text-xs text-gray-500">
              {subjectLabel[subject] || subject} &middot; {taskLabel[task] || task}
            </p>
          </div>
        </div>

        {/* Phase indicator */}
        <Badge
          variant="outline"
          className={`text-xs font-semibold px-3 py-1.5 ${
            phase === "setup"
              ? "text-gray-500"
              : phase === "preparation"
              ? "text-[rgb(200,120,90)] border-[rgb(200,120,90)]"
              : phase === "recording"
              ? "text-red-500 border-red-300 animate-pulse"
              : "text-emerald-600 border-emerald-300"
          }`}
        >
          {phase === "setup"
            ? "Ready"
            : phase === "preparation"
            ? "Preparing..."
            : phase === "recording"
            ? "Recording..."
            : "Completed"}
        </Badge>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* PROMPT DISPLAY                           */}
      {/* ════════════════════════════════════════ */}
      <Card className="border-[rgb(11,79,74)]/20 bg-gradient-to-r from-[rgb(11,79,74)]/5 to-transparent">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(11,79,74)] text-white text-xs font-bold shrink-0">
              Q
            </div>
            <div>
              <p className="text-sm font-bold text-[rgb(22,32,34)] mb-1">{promptData.title}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{promptData.instructions}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ════════════════════════════════════════ */}
      {/* PHASE-SPECIFIC CONTENT                    */}
      {/* ════════════════════════════════════════ */}

      {/* ── SETUP PHASE ── */}
      {phase === "setup" && (
        <div className="space-y-6">
          {/* Mic permission card */}
          <Card className="border-gray-200">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[rgb(11,79,74)]/10">
                  <Mic className="h-12 w-12 text-[rgb(11,79,74)]" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[rgb(22,32,34)]">Ready to Record?</h2>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                  Recording functionality requires microphone permission. Click the button below
                  to start your preparation countdown.
                </p>
              </div>

              {!micGranted && (
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[rgb(200,120,90)]/10 text-[rgb(200,120,90)] text-sm">
                  <Volume2 className="h-4 w-4" />
                  <span>Microphone access needed — click Start Preparation to request permission</span>
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                <Button
                  size="xl"
                  className="font-bold gap-2 shadow-lg"
                  onClick={handleStartPrep}
                >
                  <Timer className="h-5 w-5" />
                  Start Preparation ({prepSeconds}s)
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>Prep time: {prepSeconds}s</span>
                <span>&middot;</span>
                <span>Speaking time: {speakSeconds}s</span>
              </div>
            </CardContent>
          </Card>

          {/* Recording tips */}
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Find a quiet environment with minimal background noise.",
              "Position your microphone about 6-8 inches from your mouth.",
              "Speak at a moderate pace — clarity matters more than speed.",
              "Don't worry about mistakes — keep speaking naturally.",
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PREPARATION PHASE ── */}
      {phase === "preparation" && (
        <div className="space-y-6">
          <Card className="border-[rgb(200,120,90)]/30 bg-gradient-to-br from-[rgb(200,120,90)]/5 to-transparent">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgb(200,120,90)]/10">
                  <Timer className="h-10 w-10 text-[rgb(200,120,90)]" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-[rgb(200,120,90)]">
                  {prepTimer.minutes > 0 ? `${prepTimer.minutes}:` : ""}
                  {String(prepTimer.seconds).padStart(2, "0")}
                </p>
                <p className="text-sm font-semibold text-[rgb(22,32,34)] mt-2">Preparation Time</p>
                <p className="text-xs text-gray-500 mt-1">Plan your response — outline 2-3 key points</p>
              </div>
              {/* Progress ring */}
              <div className="w-full max-w-xs mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[rgb(200,120,90)] transition-all duration-1000"
                  style={{ width: `${(prepTimer.timeLeft / prepSeconds) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── RECORDING PHASE ── */}
      {phase === "recording" && (
        <div className="space-y-6">
          <Card className="border-red-200 bg-gradient-to-b from-red-50 to-white">
            <CardContent className="p-8 text-center space-y-4">
              {/* Animated mic */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 animate-pulse">
                    <Mic className="h-12 w-12 text-red-500" />
                  </div>
                  {/* Pulse rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping opacity-25" />
                </div>
              </div>

              {/* Timer */}
              <div>
                <p className="text-4xl font-extrabold text-red-500">
                  {speakTimer.minutes > 0 ? `${speakTimer.minutes}:` : ""}
                  {String(speakTimer.seconds).padStart(2, "0")}
                </p>
                <p className="text-sm font-semibold text-red-700 mt-2">Recording in Progress</p>
                <p className="text-xs text-gray-500 mt-1">
                  {isMuted ? "Microphone is muted" : "Speak clearly into your microphone"}
                </p>
              </div>

              {/* Waveform visualization placeholder */}
              <div className="flex items-center justify-center gap-1 h-12">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-red-400"
                    style={{
                      height: `${15 + Math.sin((i + Date.now() * 0.01) * 0.5) * 15 + Math.random() * 10}px`,
                      opacity: 0.6 + Math.random() * 0.4,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsMuted(!isMuted)}
                  className="gap-2"
                >
                  <Volume2 className={`h-4 w-4 ${isMuted ? "text-red-500" : "text-gray-500"}`} />
                  {isMuted ? "Unmute" : "Mute"}
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={endRecording}
                  className="gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  End Recording
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── COMPLETE PHASE ── */}
      {phase === "complete" && (
        <div className="space-y-6">
          {/* Success confirmation */}
          <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-white">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-emerald-800">Recording Complete</h2>
                <p className="text-sm text-emerald-600">
                  {speakSeconds}s response captured &middot; Ready for analysis
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Transcript placeholder */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[rgb(22,32,34)]">
                <BookOpen className="h-4 w-4 text-[rgb(11,79,74)]" />
                Transcript
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-5 text-sm text-gray-500 italic leading-relaxed">
                [Transcript will appear here after processing. In a full implementation, your speech
                would be transcribed using automatic speech recognition.]
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <div className="h-1.5 w-1.5 rounded-full bg-[rgb(200,120,90)] animate-pulse" />
                Processing audio...
              </div>
            </CardContent>
          </Card>

          {/* AI Feedback Toggle */}
          {!showFeedback ? (
            <div className="text-center">
              <Button
                size="xl"
                className="font-bold gap-2 bg-[rgb(200,120,90)] hover:bg-[rgb(200,120,90)] text-white shadow-lg"
                onClick={() => setShowFeedback(true)}
              >
                <Sparkles className="h-5 w-5" />
                View AI-Powered Feedback
              </Button>
            </div>
          ) : (
            <>
              {/* Overall score */}
              <Card className="border-gray-200 bg-gradient-to-br from-[rgb(11,79,74)]/5 to-[rgb(22,32,34)]/5">
                <CardContent className="p-6 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Overall Speaking Score</p>
                  <p className="text-5xl font-extrabold text-[rgb(22,32,34)]">{overallScore}</p>
                  <p className="text-sm text-gray-500 mt-1">Estimate &middot; IELTS equivalent</p>
                  <div className="w-full max-w-xs mx-auto mt-4 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
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
                        <p className="text-sm font-bold text-[rgb(22,32,34)]">{cat.label}</p>
                        <Badge className={`${cat.bg} ${cat.color} border-0`}>{cat.score}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{cat.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Improvement suggestions */}
              <Card className="border-gray-200 bg-gradient-to-r from-[rgb(200,120,90)]/5 to-transparent">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-[rgb(22,32,34)] mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[rgb(200,120,90)]" />
                    Suggested Improvements
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[rgb(200,120,90)] font-bold">&bull;</span>
                      Work on reducing filler words (um, uh, like) for greater fluency.
                    </li>
                    <li className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[rgb(200,120,90)] font-bold">&bull;</span>
                      Practice varying your intonation to sound more engaging and natural.
                    </li>
                    <li className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[rgb(200,120,90)] font-bold">&bull;</span>
                      Expand your vocabulary with topic-specific terms relevant to the task.
                    </li>
                    <li className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[rgb(200,120,90)] font-bold">&bull;</span>
                      Use more complex sentence structures to demonstrate grammatical range.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {/* Teacher review + retry */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar fallback="LU" size="sm" />
              <div>
                <p className="text-sm font-semibold text-[rgb(22,32,34)]">Instructor Review Available</p>
                <p className="text-xs text-gray-500">Responses can be reviewed by Lumaani instructors for detailed feedback</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={handleTryAgain}>
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
          href="mailto:hello@lumaani.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Get Speaking Feedback on WhatsApp</p>
                <p className="text-xs text-emerald-600">Send your recording for expert instructor review</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-emerald-400" />
          </div>
        </a>
      </section>
    </div>
  )
}