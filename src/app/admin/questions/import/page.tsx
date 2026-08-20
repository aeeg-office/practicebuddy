"use client"

import { useCallback, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileUp, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout, colors } from "../../_components/admin-layout"
import {
  IMPORT_TEMPLATE_JSON,
  importQuestions,
  validateImportPayload,
  type ImportApiResponse,
  type ImportQuestion,
  type ImportValidationError,
} from "@/lib/admin-question-import"

/* ───────── Helpers ───────── */

function formatErrorCount(total: number): string {
  if (total === 0) return "0 errors"
  return `${total} error${total === 1 ? "" : "s"}`
}

/* ───────── State ───────── */

type PageState =
  | { phase: "idle" }
  | { phase: "parsing"; raw: string }
  | { phase: "preview"; raw: string; valid: ImportQuestion[]; errors: ImportValidationError[] }
  | { phase: "importing" }
  | { phase: "done"; result: ImportApiResponse }

/* ───────── Page ───────── */

export default function AdminQuestionsImportPage() {
  const [state, setState] = useState<PageState>({ phase: "idle" })
  const [rawJson, setRawJson] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleParse = useCallback(() => {
    const trimmed = rawJson.trim()
    if (!trimmed) return

    let parsed: unknown
    try {
      parsed = JSON.parse(trimmed)
    } catch {
      setState({
        phase: "preview",
        raw: trimmed,
        valid: [],
        errors: [{ index: -1, field: "root", reason: "Invalid JSON syntax — check for trailing commas, unquoted keys, or mismatched brackets" }],
      })
      return
    }

    const { valid, errors } = validateImportPayload(parsed)
    setState({ phase: "preview", raw: trimmed, valid, errors })
  }, [rawJson])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      setRawJson(text)
      let parsed: unknown
      try {
        parsed = JSON.parse(text)
      } catch {
        setState({
          phase: "preview",
          raw: text,
          valid: [],
          errors: [{ index: -1, field: "root", reason: "Invalid JSON syntax in file" }],
        })
        return
      }
      const { valid, errors } = validateImportPayload(parsed)
      setState({ phase: "preview", raw: text, valid, errors })
    }
    reader.readAsText(file)
  }, [])

  const handleImport = useCallback(async () => {
    if (state.phase !== "preview" || state.valid.length === 0) return

    setState({ phase: "importing" })

    try {
      const result = await importQuestions(state.valid)
      setState({ phase: "done", result })
    } catch (cause) {
      setState({
        phase: "preview",
        raw: state.raw,
        valid: state.valid,
        errors: [...state.errors, { index: -1, field: "api", reason: cause instanceof Error ? cause.message : "Import API request failed" }],
      })
    }
  }, [state])

  const handleReset = useCallback(() => {
    setState({ phase: "idle" })
    setRawJson("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  /* ───────── Render ───────── */

  return (
    <AdminLayout
      activeSidebar="Questions"
      pageTitle="Bulk Import Questions"
      pageDescription="Import multiple questions at once from a JSON array"
      headerRight={
        <Link href="/admin/questions">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to Question Bank
          </Button>
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input panel */}
        <div className="lg:col-span-2">
          <Card style={{ borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: colors.secondary }}>
                {state.phase === "done" ? "Import Complete" : "Import Questions"}
              </CardTitle>
              <CardDescription>
                {state.phase === "done"
                  ? "Review the results below"
                  : "Paste a JSON array of questions or upload a .json file"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.phase === "done" ? (
                <ImportResultSummary result={state.result} onReset={handleReset} />
              ) : (
                <>
                  {/* File upload */}
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="json-file-input"
                    />
                    <label
                      htmlFor="json-file-input"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted/20"
                      style={{ borderColor: colors.border }}
                    >
                      <FileUp className="h-4 w-4" />
                      Upload .json file
                    </label>
                    <span className="text-xs text-muted-foreground">or paste below</span>
                  </div>

                  {/* JSON textarea */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      JSON array of questions
                    </label>
                    <textarea
                      value={rawJson}
                      onChange={(e) => setRawJson(e.target.value)}
                      placeholder={IMPORT_TEMPLATE_JSON}
                      rows={14}
                      className="w-full rounded-lg border bg-muted/10 p-3 font-mono text-xs leading-relaxed"
                      style={{ borderColor: colors.border }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleParse}
                      disabled={!rawJson.trim() || state.phase === "importing"}
                    >
                      <Upload className="mr-1.5 h-4 w-4" />
                      Parse & Preview
                    </Button>
                    {rawJson && (
                      <Button variant="outline" onClick={handleReset}>
                        <X className="mr-1.5 h-4 w-4" />
                        Clear
                      </Button>
                    )}
                  </div>

                  {/* Preview results */}
                  {state.phase === "preview" && (
                    <PreviewResults
                      valid={state.valid}
                      errors={state.errors}
                      onImport={handleImport}
                      importing={false}
                    />
                  )}
                  {state.phase === "importing" && (
                    <p className="text-sm text-muted-foreground">Importing questions…</p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: template */}
        <div>
          <Card style={{ borderColor: colors.border }}>
            <CardHeader>
              <CardTitle className="text-sm" style={{ color: colors.secondary }}>
                Expected Format
              </CardTitle>
              <CardDescription>
                Each question requires: stem, options, correctAnswer, subject, domain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded bg-muted/20 p-3 text-[10px] leading-relaxed">
                {IMPORT_TEMPLATE_JSON}
              </pre>
              <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                <p>
                  <strong style={{ color: colors.secondary }}>stem</strong> — The question text
                </p>
                <p>
                  <strong style={{ color: colors.secondary }}>options</strong> — Array of {"{id, text}"} objects
                </p>
                <p>
                  <strong style={{ color: colors.secondary }}>correctAnswer</strong> — ID of the correct option
                </p>
                <p>
                  <strong style={{ color: colors.secondary }}>subject</strong> — e.g. "sat", "act", "ielts"
                </p>
                <p>
                  <strong style={{ color: colors.secondary }}>domain</strong> — e.g. "Algebra", "Craft &amp; Structure"
                </p>
                <p className="mt-2">
                  <strong>Optional:</strong> difficulty, format, passage, explanation, strategy, hint, source, qualityStatus, category, subcategory, skillId, estimatedTime, calculatorAllowed, figureUrl, rightsStatus, acceptedResponses
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

/* ───────── Preview Results ───────── */

function PreviewResults({
  valid,
  errors,
  onImport,
  importing,
}: {
  valid: ImportQuestion[]
  errors: ImportValidationError[]
  onImport: () => void
  importing: boolean
}) {
  const total = valid.length + errors.length

  return (
    <div className="space-y-3 rounded-lg border p-4" style={{ borderColor: colors.border }}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: colors.secondary }}>
          Preview — {total} question{total === 1 ? "" : ""}
        </p>
        <div className="flex gap-2 text-xs">
          {valid.length > 0 && (
            <span className="text-green-600">
              {valid.length} valid
            </span>
          )}
          {errors.length > 0 && (
            <span className="text-red-600">
              {errors.length} invalid
            </span>
          )}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="max-h-48 overflow-y-auto space-y-1">
          {errors.map((err, i) => (
            <p key={i} className="rounded bg-red-50 px-2 py-1 text-[11px] text-red-700">
              {err.index >= 0 ? `[#${err.index + 1}] ` : ""}
              {err.field}: {err.reason}
            </p>
          ))}
        </div>
      )}

      {valid.length > 0 && (
        <div className="max-h-48 overflow-y-auto space-y-1">
          {valid.map((q, i) => (
            <p key={i} className="truncate rounded bg-green-50 px-2 py-1 text-[11px] text-green-700">
              [#{i + 1}] {q.stem.slice(0, 80)}{q.stem.length > 80 ? "…" : ""}
            </p>
          ))}
        </div>
      )}

      <Button
        onClick={onImport}
        disabled={valid.length === 0 || importing}
        className="w-full"
      >
        {importing ? "Importing…" : `Import ${valid.length} valid question${valid.length === 1 ? "" : "s"}`}
      </Button>
    </div>
  )
}

/* ───────── Import Result Summary ───────── */

function ImportResultSummary({
  result,
  onReset,
}: {
  result: ImportApiResponse
  onReset: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{result.imported}</p>
            <p className="text-xs text-green-600">Imported</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{result.rejected}</p>
            <p className="text-xs text-red-600">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {result.errors.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-medium text-red-700">
            Rejection Details ({formatErrorCount(result.errors.length)})
          </h4>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {result.errors.map((err, i) => (
              <p
                key={i}
                className="rounded bg-red-50 px-3 py-1.5 text-[11px] text-red-700"
              >
                {err.index >= 0 ? `Question #${err.index + 1}: ` : ""}
                <strong>{err.field}</strong> — {err.reason}
              </p>
            ))}
          </div>
        </div>
      )}

      {result.importedIds.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-medium text-green-700">Imported IDs</h4>
          <div className="max-h-32 overflow-y-auto rounded bg-muted/20 p-2 font-mono text-[10px]">
            {result.importedIds.join(", ")}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={onReset} variant="outline">
          Import Another Batch
        </Button>
        <Link href="/admin/questions">
          <Button variant="outline">Back to Question Bank</Button>
        </Link>
      </div>
    </div>
  )
}