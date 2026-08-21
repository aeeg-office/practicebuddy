'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"

/**
 * Add Teacher page.
 * Fixes HIGH-004: /admin/teachers/add was returning 404.
 */
export default function AddTeacherPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        // Promote to teacher role
        await fetch("/api/admin/teachers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ userId: data.user.id }),
        })
        router.push("/admin/teachers")
      } else {
        setError(data.error || "Failed to add teacher")
      }
    } catch { /* ignore */ }
    finally { setSaving(false) }
  }

  return (
    <AdminLayout
      activeSidebar="Teachers"
      pageTitle="Add Teacher"
      pageDescription="Create a new teacher account"
    >
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Teacher's name" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="teacher@example.com" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required minLength={6} className="mt-1" />
            </div>
            {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving || !name || !email || !password}>
            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...</> : <><UserPlus className="mr-2 h-4 w-4" /> Add Teacher</>}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </AdminLayout>
  )
}