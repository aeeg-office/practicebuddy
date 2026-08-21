'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"

/**
 * New Question page.
 * Fixes HIGH-004: /admin/questions/new was returning 404.
 */
export default function NewQuestionPage() {
  const router = useRouter()
  const [stem, setStem] = useState("")
  const [subject, setSubject] = useState("sat")
  const [difficulty, setDifficulty] = useState("medium")
  const [options, setOptions] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [explanation, setExplanation] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      const optionsArr = options.split("\n").filter(Boolean)
      const res = await fetch("/api/admin/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          stem,
          subject,
          difficulty,
          options: JSON.stringify(optionsArr.map((opt, i) => ({ id: String.fromCharCode(65 + i), text: opt }))),
          correctAnswer,
          explanation,
          format: "multiple_choice",
          qualityStatus: "draft",
        }),
      })
      if (res.ok) {
        router.push("/admin/questions")
      } else {
        const data = await res.json()
        setError(data.error || "Failed to create question")
      }
    } catch { /* ignore */ }
    finally { setSaving(false) }
  }

  return (
    <AdminLayout
      activeSidebar="Questions"
      pageTitle="New Question"
      pageDescription="Create a new question manually"
    >
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="stem">Question Stem</Label>
              <Textarea id="stem" value={stem} onChange={(e) => setStem(e.target.value)} placeholder="Enter the question text..." required className="mt-1" rows={3} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="sat">SAT</option>
                  <option value="act">ACT</option>
                  <option value="math">Math</option>
                  <option value="reading">Reading</option>
                  <option value="writing">Writing</option>
                  <option value="english">English</option>
                  <option value="science">Science</option>
                </select>
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="options">Options (one per line)</Label>
              <Textarea id="options" value={options} onChange={(e) => setOptions(e.target.value)} placeholder="First option&#10;Second option&#10;Third option&#10;Fourth option" required className="mt-1" rows={4} />
            </div>
            <div>
              <Label htmlFor="correctAnswer">Correct Answer</Label>
              <Input id="correctAnswer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} placeholder="Must match one of the options exactly" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="explanation">Explanation</Label>
              <Textarea id="explanation" value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Explain why the answer is correct..." className="mt-1" rows={3} />
            </div>
            {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving || !stem || !correctAnswer}>
            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : <><FileQuestion className="mr-2 h-4 w-4" /> Create Question</>}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </AdminLayout>
  )
}