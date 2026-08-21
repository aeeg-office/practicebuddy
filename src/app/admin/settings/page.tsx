'use client'

import { useEffect, useState } from "react"
import { CheckCircle2, RefreshCw, Save, ShieldAlert } from "lucide-react"

import { AdminLayout } from "@/app/admin/_components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type PlatformSetting = { id: string; key: string; value: unknown; description: string | null; isPublic: boolean; updatedAt: string }
type FeatureFlag = { id: string; code: string; name: string; description: string | null; defaultValue: boolean; category: string }

type FormValues = Record<string, string>
const fields = [
  ["platform.name", "Platform name", "Practice Buddy Platform"],
  ["platform.support-email", "Support email", "hello@practicebuddy.app"],
  ["platform.support-phone", "Support phone", ""],
  ["platform.timezone", "Timezone", "UTC"],
  ["platform.locale", "Default language", "en"],
] as const

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback
}

export default function SettingsPage() {
  const [values, setValues] = useState<FormValues>(() => Object.fromEntries(fields.map(([key, , fallback]) => [key, fallback])))
  const [features, setFeatures] = useState<FeatureFlag[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const [settingsResponse, flagsResponse] = await Promise.all([
        fetch("/api/admin/platform-settings", { credentials: "same-origin", headers: { Accept: "application/json" } }),
        fetch("/api/admin/feature-flags", { credentials: "same-origin", headers: { Accept: "application/json" } }),
      ])
      const settingsPayload = await settingsResponse.json() as { settings?: PlatformSetting[]; error?: string }
      const flagsPayload = await flagsResponse.json() as { flags?: FeatureFlag[]; error?: string }
      if (!settingsResponse.ok) throw new Error(settingsPayload.error ?? "Unable to load platform settings")
      if (!flagsResponse.ok) throw new Error(flagsPayload.error ?? "Unable to load feature flags")
      const loaded = new Map((settingsPayload.settings ?? []).map((setting) => [setting.key, setting.value]))
      setValues(Object.fromEntries(fields.map(([key, , fallback]) => [key, stringValue(loaded.get(key), fallback)])))
      setFeatures(flagsPayload.flags ?? [])
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to load settings") }
    finally { setLoading(false) }
  }

  useEffect(() => { void load() }, [])

  const save = async () => {
    setSaving(true); setMessage(null); setError(null)
    try {
      for (const [key, label] of fields) {
        const response = await fetch("/api/admin/platform-settings", { method: "PUT", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ key, value: values[key], description: label, isPublic: false }) })
        const payload = await response.json() as { error?: string }
        if (!response.ok) throw new Error(payload.error ?? `Unable to save ${label}`)
      }
      setMessage("Platform settings saved and audited.")
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save settings") }
    finally { setSaving(false) }
  }

  const toggleFeature = async (feature: FeatureFlag) => {
    setError(null)
    try {
      const response = await fetch("/api/admin/feature-flags", { method: "PATCH", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: feature.id, defaultValue: !feature.defaultValue }) })
      const payload = await response.json() as { flag?: FeatureFlag; error?: string }
      if (!response.ok || !payload.flag) throw new Error(payload.error ?? "Unable to update feature flag")
      setFeatures((current) => current.map((item) => item.id === feature.id ? payload.flag! : item))
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to update feature flag") }
  }

  return <AdminLayout activeSidebar="Settings" pageTitle="Settings" pageDescription="Durable platform configuration and controlled feature rollout" headerRight={<Button onClick={() => void save()} disabled={saving || loading}><Save className="mr-2 h-4 w-4" />{saving ? "Saving…" : "Save changes"}</Button>}>
    {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {message && <p role="status" className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700"><CheckCircle2 className="h-4 w-4" />{message}</p>}
    <Card><CardHeader><CardTitle>Platform configuration</CardTitle><CardDescription>Only non-secret operational settings are stored here. API credentials and passwords stay in environment configuration.</CardDescription></CardHeader><CardContent className="grid gap-4 md:grid-cols-2">{fields.map(([key, label]) => <label key={key} className="grid gap-2 text-sm font-medium">{label}<Input value={values[key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} disabled={loading || saving} /></label>)}</CardContent></Card>
    <Card><CardHeader><div className="flex items-center justify-between gap-4"><div><CardTitle>Feature flags</CardTitle><CardDescription>Changes apply globally and are recorded in the administrative audit log.</CardDescription></div><Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}><RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />Refresh</Button></div></CardHeader><CardContent className="space-y-3">{!loading && !features.length && <p className="text-sm text-muted-foreground">No feature flags have been configured.</p>}{features.map((feature) => <div key={feature.id} className="flex items-center justify-between gap-4 rounded-md border p-4"><div><p className="font-medium">{feature.name}</p><p className="text-sm text-muted-foreground">{feature.description ?? feature.code}</p></div><button type="button" role="switch" aria-checked={feature.defaultValue} aria-label={`Toggle ${feature.name}`} onClick={() => void toggleFeature(feature)} className={`rounded-full px-3 py-1 text-sm font-medium ${feature.defaultValue ? "bg-[rgb(26,35,126)] text-white" : "bg-muted text-muted-foreground"}`}>{feature.defaultValue ? "Enabled" : "Disabled"}</button></div>)}</CardContent></Card>
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><ShieldAlert className="h-5 w-5" />Integration security</CardTitle><CardDescription>Payment, messaging, AI, and analytics credentials are deliberately not editable or displayed in the dashboard. Manage them only through the deployment environment and rotate them through the provider.</CardDescription></CardHeader></Card>
  </AdminLayout>
}
