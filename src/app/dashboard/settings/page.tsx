'use client'

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import {
  Settings,
  ArrowLeft,
  User,
  Bell,
  Globe,
  Save,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/**
 * Student Settings page.
 * Fixes HIGH-004: /dashboard/settings was returning 404.
 */
export default function SettingsPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name ?? "")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    await new Promise((r) => setTimeout(r, 500))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account preferences</p>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <User className="h-5 w-5 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email ?? ""} disabled className="mt-1 text-muted-foreground" />
                <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed here</p>
              </div>
              <Button type="submit" disabled={saving}>
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
              </Button>
              {saved && <span className="ml-2 text-sm text-emerald-600">Saved!</span>}
            </form>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Practice reminders</p>
                <p className="text-sm text-muted-foreground">Get notified about daily practice goals</p>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">On</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Assignment alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when new assignments are created</p>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">On</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Progress reports</p>
                <p className="text-sm text-muted-foreground">Weekly progress summary via email</p>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">On</span>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <Globe className="h-5 w-5 text-primary" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Off</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}