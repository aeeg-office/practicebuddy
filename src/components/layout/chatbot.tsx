'use client'

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Bot, User, Cpu, GraduationCap } from "lucide-react"

// ── Scripted Fallback Responses ──
const scriptedResponses: Record<string, string> = {
  "sat": "Our SAT Prep program starts at $25/lesson. We offer group classes, private tutoring, and online sessions. Our tutors have 15+ years of experience. Would you like to take the SAT Comprehensive Diagnostic Assessment?",
  "act": "Our ACT Prep program covers all sections: English, Math, Reading, Science, and the optional Essay. Starting at $25/lesson with flexible scheduling. Ready to take a diagnostic assessment?",
  "ielts": "IELTS prep at AEEG covers Listening, Reading, Writing, and Speaking. We provide tailored instruction for Academic and General Training modules. Start with a diagnostic assessment!",
  "toefl": "Our TOEFL program focuses on all four skills: Reading, Listening, Speaking, and Writing. Native English-speaking tutors with American education backgrounds. Try a diagnostic assessment!",
  "pricing": "Our programs start at $25 per lesson. We offer group sessions, private 1-on-1 tutoring, and online classes. Contact us for package deals and payment plans!",
  "schedule": "We offer sessions 7 days a week. You can book a consultation or diagnostic assessment through our website. Contact us for specific scheduling options.",
  "contact": "You can reach us at +20 1060618899 or email info@americanegyptianedugroup.com. We're located in 5th Settlement, Cairo, Egypt.",
  "diagnostic": "Our SAT Comprehensive Diagnostic Assessment includes 120 questions across Reading & Writing and Math, with instant scoring and skill analysis. Book yours today!",
  "default": "I'm here to help! Ask me about our SAT, ACT, IELTS, and TOEFL prep programs, pricing, scheduling, or anything else about AEEG. You can also book a diagnostic assessment!",
}

// ── Types ──
interface Message {
  text: string
  sender: "user" | "bot"
  source?: "ai" | "scripted" | "error"
}

// ── Component ──
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm AEEG's AI assistant. How can I help you today? Ask me about our programs, pricing, or book a diagnostic assessment!", sender: "bot", source: "scripted" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null) // null = not checked yet
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // ── Try AI first, fall back to scripted ──
  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return
    const userMsg = input.trim()
    setMessages((prev) => [...prev, { text: userMsg, sender: "user" }])
    setInput("")
    setIsLoading(true)

    try {
      // Try the AI API endpoint
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages
            .filter((m) => m.source !== "error")
            .slice(-6) // last 6 messages for context
            .map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setAiAvailable(true)
        setMessages((prev) => [
          ...prev,
          { text: data.reply || "I'm not sure how to respond to that.", sender: "bot", source: "ai" },
        ])
        setIsLoading(false)
        return
      }

      // AI server returned an error — fall through to scripted
      if (res.status === 503) {
        setAiAvailable(false)
      }
    } catch {
      // Network error — fall through to scripted
      setAiAvailable(false)
    }

    // ── Scripted Fallback ──
    const lower = userMsg.toLowerCase()
    let response = scriptedResponses.default
    for (const [key, val] of Object.entries(scriptedResponses)) {
      if (lower.includes(key)) {
        response = val
        break
      }
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: response, sender: "bot", source: "scripted" },
      ])
      setIsLoading(false)
    }, 400)
  }, [input, isLoading, messages])

  return (
    <>
      {/* Chat bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(71,32,183)] text-white shadow-lg hover:bg-[rgb(55,25,150)] transition-all animate-bounce"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-80 sm:w-96 rounded-xl border bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[rgb(71,32,183)] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {aiAvailable === false ? (
                <Bot className="h-5 w-5" />
              ) : (
                <Cpu className="h-5 w-5" />
              )}
              <span className="font-semibold text-sm">
                {aiAvailable === false ? "AEEG Assistant" : "AI Assistant"}
              </span>
            </div>
            {aiAvailable === false && (
              <span className="text-[10px] text-blue-200 bg-blue-800/30 px-2 py-0.5 rounded-full">
                Offline Mode
              </span>
            )}
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-80" style={{ minHeight: "200px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-[rgb(71,32,183)] text-white"
                      : msg.source === "ai"
                        ? "bg-green-50 text-gray-800 border border-green-200"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {msg.sender === "bot" ? (
                      msg.source === "ai" ? (
                        <Cpu className="h-3 w-3 text-green-600" />
                      ) : (
                        <Bot className="h-3 w-3" />
                      )
                    ) : (
                      <User className="h-3 w-3" />
                    )}
                    <span className="text-[10px] opacity-70">
                      {msg.sender === "bot" ? (msg.source === "ai" ? "AI" : "AEEG") : "You"}
                    </span>
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}
            {/* AI Tutor suggestion chip — shown after first bot greeting */}
            {messages.length === 1 && messages[0].sender === "bot" && (
              <div className="flex justify-center pt-1">
                <Link
                  href="/ai-tutor"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4720b7] to-[#1e2761] text-white text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  Try AI Practice Buddy
                </Link>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500">
                  <span className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              placeholder="Ask about programs, pricing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            />
            <Button size="icon" onClick={handleSend} disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}