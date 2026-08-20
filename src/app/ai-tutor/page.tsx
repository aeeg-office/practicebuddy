'use client'

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Send,
  Bot,
  User,
  Sparkles,
  Lightbulb,
  BookOpen,
  Target,
  ChevronDown,
  Loader2,
  GraduationCap,
  BookMarked,
  MessageSquare,
  ArrowLeft,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ── Types ──
interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  suggestions?: string[]
  subject?: string
}

type SubjectKey = "sat" | "act" | "ielts" | "toefl" | "english" | "math" | "reading" | "writing" | "science"

interface SubjectOption {
  key: SubjectKey
  label: string
  icon: string
  color: string
}

const subjects: SubjectOption[] = [
  { key: "sat", label: "SAT", icon: "🎯", color: "bg-[#4720b7]/10 text-[#4720b7]" },
  { key: "act", label: "ACT", icon: "📝", color: "bg-[#1e2761]/10 text-[#1e2761]" },
  { key: "ielts", label: "IELTS", icon: "🌍", color: "bg-emerald-500/10 text-emerald-600" },
  { key: "toefl", label: "TOEFL", icon: "🗽", color: "bg-[#f5a623]/10 text-[#f5a623]" },
]

const presetQuestions: { label: string; icon: React.ReactNode; message: string }[] = [
  {
    label: "Explain this concept",
    icon: <BookOpen className="h-3.5 w-3.5" />,
    message: "Can you explain how to approach SAT Reading questions?",
  },
  {
    label: "Give me a hint",
    icon: <Lightbulb className="h-3.5 w-3.5" />,
    message: "Give me a hint for solving math problems",
  },
  {
    label: "Practice question",
    icon: <Sparkles className="h-3.5 w-3.5" />,
    message: "Create a practice question for me",
  },
  {
    label: "What's next?",
    icon: <Target className="h-3.5 w-3.5" />,
    message: "What should I study next?",
  },
]

function generateId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export default function AITutorPage() {
  const [subject, setSubject] = useState<SubjectKey>("sat")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `👋 Welcome to SAT Practice! I'm your AI tutor. Ask me to explain a concept, give you a hint, create a practice question, or recommend your next skill. What subject area are you working on?`,
      sender: "bot",
      suggestions: ["Explain a concept", "Give me a hint", "Create a practice question", "What should I study next?"],
      subject: "sat",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Handle subject change — reset chat with new greeting
  const handleSubjectChange = useCallback((newSubject: SubjectKey) => {
    setSubject(newSubject)
    const greetings: Record<SubjectKey, string> = {
      sat: "👋 Welcome to SAT Practice! I'm your AI tutor. Ask me to explain a concept, give you a hint, create a practice question, or recommend your next skill. What subject area are you working on?",
      act: "👋 Welcome to ACT Practice! I'm your AI tutor. Whether you need concept explanations, strategy hints, practice questions, or skill recommendations — I'm ready to help!",
      ielts: "👋 Welcome to IELTS Practice! I'm your AI tutor. Let's work on Writing, Speaking, Reading, or Listening skills together. What would you like to focus on?",
      toefl: "👋 Welcome to TOEFL Practice! I'm your AI tutor. I can help with integrated tasks, speaking strategies, writing templates, and skill recommendations. Let's get started!",
      english: "👋 Welcome to English Practice! I'm your AI tutor. Let's work on reading comprehension, grammar, and writing skills together.",
      math: "👋 Welcome to Math Practice! I'm your AI tutor. I can help explain concepts, give hints, or create practice problems for you.",
      reading: "👋 Welcome to Reading Practice! I'm your AI tutor. Let's work on comprehension, vocabulary, and analysis skills together.",
      writing: "👋 Welcome to Writing Practice! I'm your AI tutor. I can help with grammar, style, and written expression.",
      science: "👋 Welcome to Science Practice! I'm your AI tutor. Let's explore scientific concepts and data analysis together.",
    }
    setMessages([
      {
        id: generateId(),
        text: greetings[newSubject],
        sender: "bot",
        suggestions: ["Explain a concept", "Give me a hint", "Create a practice question", "What should I study next?"],
        subject: newSubject,
      },
    ])
    setShowSubjectDropdown(false)
  }, [])

  // Handle sending a message
  const handleSend = useCallback(
    async (text?: string) => {
      const messageText = (text || input).trim()
      if (!messageText || isLoading) return

      // Add user message
      const userMsg: Message = { id: generateId(), text: messageText, sender: "user" }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsLoading(true)

      try {
        const res = await fetch("/api/ai-tutor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject,
            message: messageText,
            history: messages.slice(-10).map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
          }),
        })

        if (!res.ok) throw new Error(`API error: ${res.status}`)

        const data = await res.json()
        const botMsg: Message = {
          id: generateId(),
          text: data.reply || "I'm not sure how to respond to that.",
          sender: "bot",
          suggestions: data.suggestions || [],
          subject: data.subject,
        }
        setMessages((prev) => [...prev, botMsg])
      } catch {
        // Simple fallback
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            text: "I'm having trouble reaching my knowledge base right now. Please try again in a moment!",
            sender: "bot",
            suggestions: ["Explain a concept", "Give me a hint", "Create a practice question"],
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [input, isLoading, messages, subject]
  )

  // Handle key press (Enter to send, Shift+Enter for newline)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  // Handle suggestion click
  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      handleSend(suggestion)
    },
    [handleSend]
  )

  // Handle preset button click
  const handlePresetClick = useCallback(
    (message: string) => {
      handleSend(message)
    },
    [handleSend]
  )

  // Auto-resize textarea
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = "auto"
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
  }, [])

  const currentSubject = subjects.find((s) => s.key === subject)!

  return (
    <div className="flex flex-col min-h-full bg-[#f6f6f6]">
      {/* ── Top subject selector bar ── */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Subject selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border border-gray-200 hover:border-[#4720b7]/30 transition-colors ${
                currentSubject.color
              }`}
            >
              <span>{currentSubject.icon}</span>
              <span>{currentSubject.label}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showSubjectDropdown ? "rotate-180" : ""}`}
              />
            </button>
            {showSubjectDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSubjectDropdown(false)} />
                <div className="absolute left-0 top-full mt-1 z-20 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {subjects.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => handleSubjectChange(s.key)}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-colors hover:bg-[#4720b7]/5 ${
                        subject === s.key ? "bg-[#4720b7]/5 text-[#4720b7]" : "text-gray-700"
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                      <span className="text-[10px] text-gray-400 ml-auto">
                        {s.key === subject ? "Active" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Subject badge */}
          <Badge
            variant="outline"
            className="text-xs font-medium border-[#4720b7]/20 text-[#4720b7] bg-[#4720b7]/5"
          >
            <GraduationCap className="h-3 w-3 mr-1" />
            {currentSubject.label} Practice Buddy
          </Badge>
        </div>
      </div>

      {/* ── Chat messages ── */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                    msg.sender === "user"
                      ? "bg-[#4720b7] text-white"
                      : "bg-[#f5a623] text-white"
                  }`}
                >
                  {msg.sender === "user" ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                </div>

                {/* Bubble */}
                <div className="space-y-2">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-[#4720b7] text-white rounded-tr-md"
                        : "bg-white border border-gray-200 text-gray-800 rounded-tl-md shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider ${
                          msg.sender === "user" ? "text-white/70" : "text-gray-400"
                        }`}
                      >
                        {msg.sender === "user" ? "You" : "AI Tutor"}
                      </span>
                      {msg.subject && msg.sender === "bot" && (
                        <span className="text-[9px] uppercase tracking-wider text-[#f5a623]/70">
                          · {msg.subject.toUpperCase()}
                        </span>
                      )}
                    </div>
                    {msg.text}
                  </div>

                  {/* Follow-up suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && msg.sender === "bot" && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs px-2.5 py-1.5 rounded-full bg-[#4720b7]/5 text-[#4720b7] border border-[#4720b7]/15 hover:bg-[#4720b7]/10 hover:border-[#4720b7]/30 transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#f5a623] text-white flex items-center justify-center">
                  <Brain className="h-4 w-4" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin text-[#4720b7]" />
                    Thinking...
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Preset questions bar ── */}
      {messages.length <= 2 && (
        <div className="px-4 md:px-8 py-3 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-gray-500 mb-2 font-medium">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {presetQuestions.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset.message)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 hover:bg-[#4720b7]/5 hover:border-[#4720b7]/20 hover:text-[#4720b7] transition-all"
                  disabled={isLoading}
                >
                  {preset.icon}
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Input bar ── */}
      <div className="border-t border-gray-200 bg-white px-4 md:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={`Ask your ${currentSubject.label} tutor anything...`}
                rows={1}
                disabled={isLoading}
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4720b7]/30 focus:border-[#4720b7] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{ minHeight: "44px", maxHeight: "120px" }}
              />
            </div>
            <Button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="h-11 w-11 rounded-xl bg-[#4720b7] hover:bg-[#3a1a9c] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            AI Tutor provides educational guidance based on pre-built templates. Press Enter to send, Shift+Enter for new line.
          </p>
        </div>
      </div>

      {/* ── WhatsApp CTA (bottom of chat, only after scrolling down) ── */}
      {messages.length >= 6 && (
        <div className="px-4 md:px-8 py-4 bg-gradient-to-r from-[#1e2761] to-[#4720b7]">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-semibold">Need more personalized help?</p>
              <p className="text-white/60 text-xs">Chat with a live tutor on WhatsApp</p>
            </div>
            <a
              href="https://wa.me/201060618899"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.713.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}