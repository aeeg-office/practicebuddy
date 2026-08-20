import { fetchAdminCollection, type AdminCollection } from "@/lib/admin-client"

export interface AdminQuestion {
  id: string
  skillId: string | null
  skillName: string
  subject: string
  domain: string
  category: string | null
  subcategory: string | null
  difficulty: string
  format: string
  passage: string | null
  stem: string
  options: { id: string; text: string }[]
  correctAnswer: string
  acceptedResponses: string[] | null
  explanation: string | null
  strategy: string | null
  hint: string | null
  estimatedTime: number | null
  calculatorAllowed: boolean | null
  figureUrl: string | null
  source: string | null
  rightsStatus: string | null
  qualityStatus: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type AdminQuestionFilters = {
  search?: string
  page?: number
  limit?: number
  subject?: string
  domain?: string
  skill?: string
  status?: string
  difficulty?: string
}

export async function fetchQuestions(
  filters: AdminQuestionFilters = {},
  fetcher?: typeof fetch,
): Promise<AdminCollection<AdminQuestion>> {
  return fetchAdminCollection<AdminQuestion>("questions", "questions", filters as Record<string, string | number | undefined>, fetcher)
}

export async function fetchQuestionById(id: string): Promise<AdminQuestion> {
  const response = await fetch(`/api/admin/questions?id=${encodeURIComponent(id)}`, {
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  })
  const data = await response.json() as { error?: string; question?: AdminQuestion }
  if (!response.ok) throw new Error(data.error ?? "Unable to load question")
  if (!data.question) throw new Error("Question not found")
  return data.question
}

export async function createQuestion(data: Record<string, unknown>): Promise<AdminQuestion> {
  const response = await fetch("/api/admin/questions", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  })
  const payload = await response.json() as { error?: string; question?: AdminQuestion }
  if (!response.ok) throw new Error(payload.error ?? "Unable to create question")
  return payload.question!
}

export async function updateQuestion(id: string, data: Record<string, unknown>): Promise<AdminQuestion> {
  const response = await fetch("/api/admin/questions", {
    method: "PUT",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ id, ...data }),
  })
  const payload = await response.json() as { error?: string; question?: AdminQuestion }
  if (!response.ok) throw new Error(payload.error ?? "Unable to update question")
  return payload.question!
}

export async function archiveQuestion(id: string): Promise<void> {
  const response = await fetch(`/api/admin/questions?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  })
  const payload = await response.json() as { error?: string }
  if (!response.ok) throw new Error(payload.error ?? "Unable to archive question")
}

export async function fetchQuestionStats(): Promise<{
  total: number
  byStatus: Record<string, number>
  bySubject: Record<string, number>
  byDifficulty: Record<string, number>
}> {
  const response = await fetch("/api/admin/questions?limit=1", {
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  })
  const data = await response.json() as {
    error?: string
    total?: number
    questions?: AdminQuestion[]
  }
  if (!response.ok) throw new Error(data.error ?? "Unable to load question stats")

  return {
    total: data.total ?? 0,
    byStatus: {},
    bySubject: {},
    byDifficulty: {},
  }
}

export function getSubjectLabel(subject: string): string {
  const labels: Record<string, string> = {
    sat: "SAT",
    act: "ACT",
    ielts: "IELTS",
    toefl: "TOEFL",
    english: "English",
    math: "Math",
  }
  return labels[subject] ?? subject
}

export function getStatusBadgeVariant(status: string): "default" | "secondary" | "success" | "destructive" | "outline" | "accent" {
  switch (status) {
    case "published":
      return "success"
    case "draft":
      return "secondary"
    case "ready_for_review":
      return "accent"
    case "archived":
      return "outline"
    case "quarantined":
      return "destructive"
    default:
      return "secondary"
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "published":
      return "Published"
    case "draft":
      return "Draft"
    case "ready_for_review":
      return "Ready for Review"
    case "archived":
      return "Archived"
    case "quarantined":
      return "Quarantined"
    default:
      return status
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "easy":
      return "text-green-600"
    case "medium":
      return "text-yellow-600"
    case "hard":
      return "text-red-600"
    default:
      return "text-muted-foreground"
  }
}