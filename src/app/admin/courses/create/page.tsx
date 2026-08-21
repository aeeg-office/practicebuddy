'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"

/**
 * Create Course page.
 * Fixes HIGH-004: /admin/courses/create was returning 404.
 */
export default function CreateCoursePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("sat")
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ title, description, subject }),
      })
      if (res.ok) {
        router.push("/admin/courses")
      }
    } catch { /* ignore */ }
    finally { setSaving(false) }
  }

  return (
    <AdminLayout
      activeSidebar="Courses"
      pageTitle="Create Course"
      pageDescription="Add a new course to the platform"
    >
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. SAT Math Intensive" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the course..." className="mt-1" rows={3} />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="sat">SAT</option>
                <option value="act">ACT</option>
                <option value="ielts">IELTS</option>
                <option value="toefl">TOEFL</option>
                <option value="math">Math</option>
                <option value="english">English</option>
                <option value="reading">Reading</option>
                <option value="science">Science</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving || !title}>
            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : <><Save className="mr-2 h-4 w-4" /> Create Course</>}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </AdminLayout>
  )
}