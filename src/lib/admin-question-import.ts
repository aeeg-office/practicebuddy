/* ───────── Types ───────── */

export interface ImportQuestion {
  stem: string
  options: { id: string; text: string }[]
  correctAnswer: string
  subject: string
  domain: string
  /** Optional fields */
  category?: string
  subcategory?: string
  difficulty?: string
  format?: string
  passage?: string | null
  explanation?: string | null
  strategy?: string | null
  hint?: string | null
  estimatedTime?: number | null
  calculatorAllowed?: boolean | null
  figureUrl?: string | null
  source?: string | null
  rightsStatus?: string | null
  qualityStatus?: string | null
  skillId?: string | null
  acceptedResponses?: string[] | null
}

export interface ImportValidationError {
  index: number
  field: string
  reason: string
}

export interface ImportResult {
  imported: number
  rejected: number
  errors: ImportValidationError[]
  importedIds: string[]
}

/* ───────── Schema validation ───────── */

const REQUIRED_FIELDS = ["stem", "options", "correctAnswer", "subject", "domain"] as const

type ValidationError = { field: string; reason: string }

function validateQuestion(question: unknown, index: number): ValidationError[] {
  const errors: ValidationError[] = []

  if (!question || typeof question !== "object") {
    return [{ field: "root", reason: "Question must be an object" }]
  }

  const q = question as Record<string, unknown>

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    const value = q[field]
    if (value === undefined || value === null) {
      errors.push({ field, reason: `${field} is required` })
      continue
    }

    switch (field) {
      case "stem":
        if (typeof value !== "string" || !String(value).trim()) {
          errors.push({ field, reason: "stem must be a non-empty string" })
        }
        break
      case "options":
        if (!Array.isArray(value) || value.length === 0) {
          errors.push({ field, reason: "options must be a non-empty array" })
        } else {
          for (let i = 0; i < value.length; i++) {
            const opt = value[i]
            if (!opt || typeof opt !== "object" || typeof opt.id !== "string" || typeof opt.text !== "string") {
              errors.push({ field: `options[${i}]`, reason: "Each option must have an id (string) and text (string)" })
            }
          }
        }
        break
      case "correctAnswer":
        if (typeof value !== "string" || !String(value).trim()) {
          errors.push({ field, reason: "correctAnswer must be a non-empty string" })
        }
        break
      case "subject":
        if (typeof value !== "string" || !String(value).trim()) {
          errors.push({ field, reason: "subject must be a non-empty string" })
        }
        break
      case "domain":
        if (typeof value !== "string" || !String(value).trim()) {
          errors.push({ field, reason: "domain must be a non-empty string" })
        }
        break
    }
  }

  // Validate correctAnswer is among options when options are present
  if (q.options && Array.isArray(q.options) && q.options.length > 0 && q.correctAnswer && typeof q.correctAnswer === "string") {
    const optionIds = q.options.map((o: { id: string }) => o.id)
    if (!optionIds.includes(q.correctAnswer)) {
      errors.push({ field: "correctAnswer", reason: `correctAnswer "${q.correctAnswer}" does not match any option id: [${optionIds.join(", ")}]` })
    }
  }

  return errors
}

export function validateImportPayload(data: unknown): {
  valid: ImportQuestion[]
  errors: ImportValidationError[]
} {
  const valid: ImportQuestion[] = []
  const errors: ImportValidationError[] = []

  if (!Array.isArray(data)) {
    errors.push({ index: -1, field: "root", reason: "Payload must be a JSON array of questions" })
    return { valid, errors }
  }

  if (data.length === 0) {
    errors.push({ index: -1, field: "root", reason: "Array is empty — no questions to import" })
    return { valid, errors }
  }

  for (let i = 0; i < data.length; i++) {
    const itemErrors = validateQuestion(data[i], i)
    if (itemErrors.length > 0) {
      for (const e of itemErrors) {
        errors.push({ index: i, field: e.field, reason: e.reason })
      }
    } else {
      valid.push(data[i] as ImportQuestion)
    }
  }

  return { valid, errors }
}

/* ───────── Template ───────── */

export const IMPORT_TEMPLATE: ImportQuestion = {
  stem: "What is the capital of France?",
  options: [
    { id: "A", text: "London" },
    { id: "B", text: "Paris" },
    { id: "C", text: "Berlin" },
    { id: "D", text: "Madrid" },
  ],
  correctAnswer: "B",
  subject: "sat",
  domain: "Craft & Structure",
  difficulty: "easy",
  format: "multiple-choice",
  explanation: "Paris is the capital of France.",
  source: "General Knowledge",
  qualityStatus: "draft",
}

export const IMPORT_TEMPLATE_JSON = JSON.stringify(IMPORT_TEMPLATE, null, 2)

/* ───────── API helper ───────── */

export interface ImportApiResponse {
  imported: number
  rejected: number
  errors: ImportValidationError[]
  importedIds: string[]
}

export async function importQuestions(
  questions: ImportQuestion[],
): Promise<ImportApiResponse> {
  const response = await fetch("/api/admin/questions/import", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(questions),
  })

  const data = await response.json() as { error?: string } & ImportApiResponse
  if (!response.ok) {
    throw new Error(data.error ?? "Import failed")
  }

  return {
    imported: data.imported ?? 0,
    rejected: data.rejected ?? 0,
    errors: data.errors ?? [],
    importedIds: data.importedIds ?? [],
  }
}