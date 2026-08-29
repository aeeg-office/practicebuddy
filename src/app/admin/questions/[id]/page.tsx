'use client'

import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Eye, Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout, colors } from "../../_components/admin-layout"
import QuestionPreview from "@/components/admin/question-preview"
import {
  createQuestion,
  fetchQuestionById,
  getDifficultyColor,
  getStatusBadgeVariant,
  getStatusLabel,
  getSubjectLabel,
  updateQuestion,
  archiveQuestion,
  type AdminQuestion,
} from "@/lib/admin-question-client"
import { type SubjectKey } from "@/data/practice-skills"
import { fetchSubjectTaxonomy } from "../../../practice/_hooks/use-taxonomy"
import type { SubjectData } from "@/data/practice-skills"

/* ───────── Form state ───────── */

interface OptionItem {
  id: string
  text: string
}

interface QuestionForm {
  subject: string
  domain: string
  skillId: string
  difficulty: string
  format: string
  passage: string
  stem: string
  options: OptionItem[]
  correctAnswer: string
  explanation: string
  strategy: string
  hint: string
  estimatedTime: string
  calculatorAllowed: string
  qualityStatus: string
  source: string
}

const initialForm: QuestionForm = {
  subject: "sat",
  domain: "",
  skillId: "",
  difficulty: "medium",
  format: "multiple-choice",
  passage: "",
  stem: "",
  options: [{ id: "A", text: "" }, { id: "B", text: "" }, { id: "C", text: "" }, { id: "D", text: "" }],
  correctAnswer: "",
  explanation: "",
  strategy: "",
  hint: "",
  estimatedTime: "90",
  calculatorAllowed: "true",
  qualityStatus: "draft",
  source: "",
}

const subjects: { key: string; label: string }[] = [
  { key: "sat", label: "SAT" },
  { key: "act", label: "ACT" },
  { key: "ielts", label: "IELTS" },
  { key: "toefl", label: "TOEFL" },
]

const statusActions: { status: string; label: string; variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent" }[] = [
  { status: "draft", label: "Save as Draft", variant: "secondary" },
  { status: "ready_for_review", label: "Submit for Review", variant: "accent" },
  { status: "published", label: "Publish", variant: "default" },
  { status: "archived", label: "Archive", variant: "outline" },
]

/* ───────── Add / remove option helpers ───────── */

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"]

function nextOptionId(options: OptionItem[]): string {
  const used = new Set(options.map((o) => o.id))
  for (const label of OPTION_LABELS) {
    if (!used.has(label)) return label
  }
  return String.fromCharCode(65 + options.length) // fallback
}

/* ───────── Page component ───────── */

export default function QuestionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = id === "new"

  const [form, setForm] = useState<QuestionForm>(initialForm)
  const [original, setOriginal] = useState<AdminQuestion | null>(null)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Load existing question
  useEffect(() => {
    if (isNew) return
    let live = true
    void (async () => {
      setLoading(true)
      setError(null)
      try {
        const question = await fetchQuestionById(id)
        if (!live) return
        setOriginal(question)
        setForm({
          subject: question.subject,
          domain: question.domain,
          skillId: question.skillId ?? "",
          difficulty: question.difficulty,
          format: question.format,
          passage: question.passage ?? "",
          stem: question.stem,
          options: question.options.length > 0 ? question.options : [{ id: "A", text: "" }],
          correctAnswer: question.correctAnswer,
          explanation: question.explanation ?? "",
          strategy: question.strategy ?? "",
          hint: question.hint ?? "",
          estimatedTime: String(question.estimatedTime ?? 90),
          calculatorAllowed: question.calculatorAllowed === null ? "" : String(question.calculatorAllowed),
          qualityStatus: question.qualityStatus ?? "draft",
          source: question.source ?? "",
        })
      } catch (cause) {
        if (live) setError(cause instanceof Error ? cause.message : "Unable to load question")
      } finally {
        if (live) setLoading(false)
      }
    })()
    return () => { live = false }
  }, [id, isNew])

  // Available domains & skills for the selected subject (fetched from API)
  const [subjectMeta, setSubjectMeta] = useState<SubjectData | null>(null)

  useEffect(() => {
    let cancelled = false
    setSubjectMeta(null)
    fetchSubjectTaxonomy(form.subject as SubjectKey).then((data) => {
      if (!cancelled) setSubjectMeta(data)
    })
    return () => { cancelled = true }
  }, [form.subject])

  const domains = useMemo(() => {
    if (!subjectMeta) return []
    return subjectMeta.domains.map((d) => d.name)
  }, [subjectMeta])

  const skillsForDomain = useMemo(() => {
    if (!subjectMeta || !form.domain) return []
    const domain = subjectMeta.domains.find(
      (d) => d.name === form.domain || d.name.replace(" and ", " & ") === form.domain,
    )
    return domain?.skills ?? []
  }, [subjectMeta, form.domain])

  // Form update helper
  function updateField<K extends keyof QuestionForm>(key: K, value: QuestionForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setValidationErrors([])
  }

  function addOption() {
    setForm((prev) => ({
      ...prev,
      options: [...prev.options, { id: nextOptionId(prev.options), text: "" }],
    }))
  }

  function removeOption(index: number) {
    if (form.options.length <= 2) return // minimum 2 options
    setForm((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
      correctAnswer: prev.correctAnswer === prev.options[index].id ? "" : prev.correctAnswer,
    }))
  }

  function updateOption(index: number, text: string) {
    setForm((prev) => {
      const updated = [...prev.options]
      updated[index] = { ...updated[index], text }
      return { ...prev, options: updated }
    })
  }

  // Validation
  function validate(desiredStatus: string): string[] {
    const errors: string[] = []
    if (!form.stem.trim()) errors.push("Stem/question text is required")
    const validOptions = form.options.filter((o) => o.text.trim())
    if (validOptions.length < 2) errors.push("At least 2 non-empty options are required")
    if (!form.correctAnswer.trim()) errors.push("Correct answer must be selected")
    if (!form.domain.trim()) errors.push("Domain is required")

    // Subject-skill matching
    if (form.skillId) {
      const validPrefixes: Record<string, string[]> = {
        sat: ["sat-", "sec-"],
        act: ["act-"],
        ielts: ["ielts-"],
        toefl: ["toefl-"],
      }
      const prefixes = validPrefixes[form.subject]
      if (prefixes) {
        const matches = prefixes.some((p) => form.skillId.startsWith(p))
        if (!matches) {
          errors.push(
            `Skill "${form.skillId}" is not valid for ${form.subject.toUpperCase()}. Allowed prefixes: ${prefixes.join(", ")}`,
          )
        }
      }
    }

    // correctAnswer must match an option ID
    if (form.correctAnswer && validOptions.length > 0) {
      const optionIds = validOptions.map((o) => o.id)
      if (!optionIds.includes(form.correctAnswer)) {
        errors.push(`Correct answer "${form.correctAnswer}" must match one of the option IDs: ${optionIds.join(", ")}`)
      }
    }

    return errors
  }

  // Save
  const save = useCallback(
    async (desiredStatus: string) => {
      const errors = validate(desiredStatus)
      setValidationErrors(errors)
      if (errors.length > 0) return

      setSaving(true)
      setError(null)
      setSuccess(null)

      const validOptions = form.options.filter((o) => o.text.trim())
      const payload: Record<string, unknown> = {
        subject: form.subject,
        domain: form.domain,
        skillId: form.skillId || null,
        difficulty: form.difficulty,
        format: form.format,
        passage: form.passage.trim() || null,
        stem: form.stem.trim(),
        options: validOptions,
        correctAnswer: form.correctAnswer.trim(),
        explanation: form.explanation.trim() || null,
        strategy: form.strategy.trim() || null,
        hint: form.hint.trim() || null,
        estimatedTime: form.estimatedTime ? Number(form.estimatedTime) : null,
        calculatorAllowed: form.calculatorAllowed === "" ? null : form.calculatorAllowed === "true",
        qualityStatus: desiredStatus,
        source: form.source.trim() || null,
      }

      try {
        if (isNew) {
          await createQuestion(payload)
          setSuccess("Question created successfully")
          router.push("/admin/questions")
        } else {
          await updateQuestion(id, payload)
          setSuccess(`Question saved as "${getStatusLabel(desiredStatus)}"`)
          // Reload the question
          const updated = await fetchQuestionById(id)
          setOriginal(updated)
          setForm((prev) => ({ ...prev, qualityStatus: desiredStatus }))
        }
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Unable to save question")
      } finally {
        setSaving(false)
      }
    },
    [form, id, isNew, router],
  )

  // Archive (delete)
  const handleArchive = useCallback(async () => {
    if (!id || isNew) return
    if (!window.confirm("Are you sure you want to archive this question?")) return

    setSaving(true)
    setError(null)
    try {
      await archiveQuestion(id)
      setSuccess("Question archived")
      router.push("/admin/questions")
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to archive question")
    } finally {
      setSaving(false)
    }
  }, [id, isNew, router])

  if (loading) {
    return (
      <AdminLayout activeSidebar="Questions" pageTitle="Loading Question…" pageDescription="">
        <p className="text-sm text-muted-foreground">Loading question data…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout
      activeSidebar="Questions"
      pageTitle={isNew ? "Create New Question" : `Edit Question`}
      pageDescription={isNew ? "Add a new question to the bank" : `ID: ${id}`}
      headerRight={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowPreview(true)} disabled={!form.stem.trim()}>
            <Eye className="mr-1.5 h-4 w-4" />
            Preview as Student
          </Button>
          <Link href="/admin/questions">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      }
    >
      {/* Error / Success alerts */}
      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div role="alert" className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Validation errors */}
      {validationErrors.length > 0 && (
        <div role="alert" className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          <p className="mb-1 font-medium">Please fix the following:</p>
          <ul className="list-inside list-disc space-y-0.5">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main form */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column — main fields */}
        <div className="space-y-6 lg:col-span-2">
          {/* Metadata card */}
          <Card style={{ borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: colors.secondary }}>
                Question Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium">
                  Subject
                  <select
                    value={form.subject}
                    onChange={(e) => {
                      updateField("subject", e.target.value)
                      updateField("domain", "")
                      updateField("skillId", "")
                    }}
                    className="mt-1 h-10 w-full rounded-md border px-3 text-sm"
                    style={{ borderColor: colors.border }}
                  >
                    {subjects.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Difficulty
                  <select
                    value={form.difficulty}
                    onChange={(e) => updateField("difficulty", e.target.value)}
                    className="mt-1 h-10 w-full rounded-md border px-3 text-sm"
                    style={{ borderColor: colors.border }}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium">
                  Domain
                  <select
                    value={form.domain}
                    onChange={(e) => {
                      updateField("domain", e.target.value)
                      updateField("skillId", "")
                    }}
                    className="mt-1 h-10 w-full rounded-md border px-3 text-sm"
                    style={{ borderColor: colors.border }}
                  >
                    <option value="">Select domain…</option>
                    {domains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Skill
                  <select
                    value={form.skillId}
                    onChange={(e) => updateField("skillId", e.target.value)}
                    className="mt-1 h-10 w-full rounded-md border px-3 text-sm"
                    style={{ borderColor: colors.border }}
                    disabled={!form.domain}
                  >
                    <option value="">Select skill…</option>
                    {skillsForDomain.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium">
                  Format
                  <select
                    value={form.format}
                    onChange={(e) => updateField("format", e.target.value)}
                    className="mt-1 h-10 w-full rounded-md border px-3 text-sm"
                    style={{ borderColor: colors.border }}
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="numeric">Numeric / Grid-In</option>
                    <option value="writing">Writing</option>
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Estimated Time (seconds)
                  <input
                    type="number"
                    value={form.estimatedTime}
                    onChange={(e) => updateField("estimatedTime", e.target.value)}
                    min={0}
                    max={600}
                    className="mt-1 h-10 w-full rounded-md border px-3 text-sm"
                    style={{ borderColor: colors.border }}
                  />
                </label>
              </div>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={form.calculatorAllowed === "true"}
                  onChange={(e) => updateField("calculatorAllowed", e.target.checked ? "true" : "false")}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Calculator allowed
              </label>

              <label className="block text-sm font-medium">
                Source
                <input
                  type="text"
                  value={form.source}
                  onChange={(e) => updateField("source", e.target.value)}
                  placeholder="e.g. SAT Reading & Writing"
                  className="mt-1 h-10 w-full rounded-md border px-3 text-sm"
                  style={{ borderColor: colors.border }}
                />
              </label>
            </CardContent>
          </Card>

          {/* Passage card */}
          <Card style={{ borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: colors.secondary }}>
                Passage
              </CardTitle>
              <CardDescription>Leave empty for standalone questions</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={form.passage}
                onChange={(e) => updateField("passage", e.target.value)}
                rows={6}
                placeholder="Paste the reading passage here…"
                className="w-full rounded-md border px-3 py-2 text-sm"
                style={{ borderColor: colors.border }}
              />
            </CardContent>
          </Card>

          {/* Stem card */}
          <Card style={{ borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: colors.secondary }}>
                Question Stem
              </CardTitle>
              <CardDescription>The question text displayed to students</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={form.stem}
                onChange={(e) => updateField("stem", e.target.value)}
                rows={3}
                placeholder="Enter the question text…"
                className="w-full rounded-md border px-3 py-2 text-sm"
                style={{ borderColor: colors.border }}
              />
            </CardContent>
          </Card>

          {/* Options card */}
          <Card style={{ borderColor: colors.border }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base" style={{ color: colors.secondary }}>
                  Answer Options
                </CardTitle>
                <CardDescription>Add at least 2 options</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={addOption}>
                <Plus className="mr-1 h-3 w-3" />
                Add Option
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {form.options.map((option, index) => (
                <div key={option.id} className="flex items-start gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted/20 text-sm font-bold" style={{ borderColor: colors.border }}>
                    {option.id}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${option.id} text…`}
                      className="h-10 w-full rounded-md border px-3 text-sm"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                  <label className="flex shrink-0 items-center gap-1.5 text-sm" title="Mark as correct answer">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={form.correctAnswer === option.id}
                      onChange={() => updateField("correctAnswer", option.id)}
                      className="h-4 w-4"
                    />
                    Correct
                  </label>
                  {form.options.length > 2 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Explanation card */}
          <Card style={{ borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: colors.secondary }}>
                Explanation &amp; Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="block text-sm font-medium">
                Explanation
                <textarea
                  value={form.explanation}
                  onChange={(e) => updateField("explanation", e.target.value)}
                  rows={4}
                  placeholder="Explain why the correct answer is right and others are wrong…"
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  style={{ borderColor: colors.border }}
                />
              </label>
              <label className="block text-sm font-medium">
                Strategy
                <textarea
                  value={form.strategy}
                  onChange={(e) => updateField("strategy", e.target.value)}
                  rows={3}
                  placeholder="Test-taking strategy tips…"
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  style={{ borderColor: colors.border }}
                />
              </label>
              <label className="block text-sm font-medium">
                Hint
                <textarea
                  value={form.hint}
                  onChange={(e) => updateField("hint", e.target.value)}
                  rows={2}
                  placeholder="Optional hint for students…"
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  style={{ borderColor: colors.border }}
                />
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Right column — status & actions */}
        <div className="space-y-6 lg:col-span-1">
          {/* Status card */}
          <Card style={{ borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: colors.secondary }}>
                Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-md bg-muted/20 p-3">
                <span className="text-sm font-medium">Current</span>
                <Badge variant={getStatusBadgeVariant(form.qualityStatus ?? "draft")} className="text-[10px]">
                  {getStatusLabel(form.qualityStatus ?? "draft")}
                </Badge>
              </div>
              {original && (
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(original.createdAt).toLocaleDateString()}
                  <br />
                  Updated: {new Date(original.updatedAt).toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action buttons */}
          <Card style={{ borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: colors.secondary }}>
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {statusActions.map((action) => (
                <Button
                  key={action.status}
                  variant={action.variant}
                  className="w-full justify-start"
                  disabled={saving || form.qualityStatus === action.status}
                  onClick={() => save(action.status)}
                >
                  {saving ? "Saving…" : action.label}
                </Button>
              ))}
              <hr style={{ borderColor: colors.border }} />
              <Button
                variant="destructive"
                className="w-full justify-start"
                disabled={saving || isNew}
                onClick={handleArchive}
              >
                <Trash2 className="mr-1.5 h-4 w-4" />
                Delete / Archive
              </Button>
            </CardContent>
          </Card>

          {/* Summary card */}
          <Card style={{ borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: colors.secondary }}>
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subject</span>
                <span className="font-medium">{getSubjectLabel(form.subject)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Domain</span>
                <span className="font-medium">{form.domain || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <span className={getDifficultyColor(form.difficulty)}>
                  {form.difficulty.charAt(0).toUpperCase() + form.difficulty.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Options</span>
                <span className="font-medium">{form.options.filter((o) => o.text.trim()).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Has passage</span>
                <span className="font-medium">{form.passage.trim() ? "Yes" : "No"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview as Student — interactive modal */}
      <QuestionPreview
        question={{
          stem: form.stem,
          passage: form.passage.trim() || null,
          options: form.options.filter((o) => o.text.trim()),
          correctAnswer: form.correctAnswer,
          explanation: form.explanation.trim() || null,
        }}
        open={showPreview}
        onClose={() => setShowPreview(false)}
        meta={`${getSubjectLabel(form.subject)} · ${form.difficulty.charAt(0).toUpperCase() + form.difficulty.slice(1)}${
          form.domain ? ` · ${form.domain}` : ""
        }${form.estimatedTime ? ` · ${form.estimatedTime}s` : ""}`}
      />
    </AdminLayout>
  )
}

// Need to import Link
import Link from "next/link"