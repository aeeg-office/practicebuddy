export interface ExamApiRecord {
  id: string
  code: string
  title: string
  subject: string | null
  status: "draft" | "published" | "archived"
  durationMins: number | null
  scheduledAt: string | null
  course: { id: string; code: string; title: string } | null
  createdAt: string
}

export interface ExamListItem {
  id: string
  code: string
  title: string
  subject: string
  status: "Draft" | "Published" | "Archived"
  duration: string
  schedule: string
  course: string
}

const statusLabels = { draft: "Draft", published: "Published", archived: "Archived" } as const

export function toExamListItem(exam: ExamApiRecord): ExamListItem {
  return {
    id: exam.id,
    code: exam.code,
    title: exam.title,
    subject: exam.subject || "—",
    status: statusLabels[exam.status],
    duration: exam.durationMins === null ? "—" : `${exam.durationMins} min`,
    schedule: exam.scheduledAt ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(exam.scheduledAt)) : "Not scheduled",
    course: exam.course ? `${exam.course.title} (${exam.course.code})` : "—",
  }
}
