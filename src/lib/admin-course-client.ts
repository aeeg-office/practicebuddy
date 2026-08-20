export interface CourseApiRecord {
  id: string
  code: string
  title: string
  subject: string | null
  level: string | null
  isActive: boolean
  createdAt: string
  startsAt: string | null
  endsAt: string | null
  teacher: { user: { name: string | null } | null } | null
  _count: { enrollments: number; exams: number }
}

export interface CourseListItem {
  id: string
  name: string
  code: string
  category: string
  instructor: string
  students: number
  sessions: number
  duration: string
  status: "Active" | "Inactive" | "Pending"
  created: string
}

function monthYear(date: string): string {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(date))
}

function schedule(startsAt: string | null, endsAt: string | null): string {
  if (!startsAt || !endsAt) return "Schedule not set"
  return `${monthYear(startsAt)} – ${monthYear(endsAt)}`
}

export function toCourseListItem(course: CourseApiRecord): CourseListItem {
  return {
    id: course.id,
    name: course.title,
    code: course.code.toUpperCase(),
    category: course.subject || "Uncategorized",
    instructor: course.teacher?.user?.name || "Unassigned",
    students: course._count.enrollments,
    sessions: course._count.exams,
    duration: schedule(course.startsAt, course.endsAt),
    status: course.isActive ? "Active" : "Inactive",
    created: monthYear(course.createdAt),
  }
}
