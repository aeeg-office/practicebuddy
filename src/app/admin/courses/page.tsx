'use client'

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Clock,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AdminLayout, colors } from "../_components/admin-layout"
import { fetchAdminCollection } from "@/lib/admin-client"
import { toCourseListItem, type CourseApiRecord, type CourseListItem } from "@/lib/admin-course-client"

const statusVariant: Record<string, "success" | "accent" | "secondary"> = {
  Active: "success",
  Pending: "accent",
  Inactive: "secondary",
}

/* ───────── Empty State ───────── */
function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/30 mb-4">
        <BookOpen className="h-8 w-8" style={{ color: colors.mutedForeground }} />
      </div>
      <h3 className="text-lg font-semibold mb-1" style={{ color: colors.secondary }}>
        {searchTerm ? "No courses found" : "No courses yet"}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {searchTerm
          ? `No courses match "${searchTerm}". Try a different search term.`
          : "Get started by creating your first course or subject offering."}
      </p>
      {!searchTerm && (
        <Link href="/admin/courses/create">
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Create Course
          </Button>
        </Link>
      )}
    </div>
  )
}

/* ───────── Courses Page ───────── */
export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courses, setCourses] = useState<CourseListItem[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    fetchAdminCollection<CourseApiRecord>("courses", "courses", { limit: 100 })
      .then(({ items }) => setCourses(items.map(toCourseListItem)))
      .catch((error: unknown) => setLoadError(error instanceof Error ? error.message : "Unable to load courses"))
  }, [])

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.id.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [courses, searchTerm],
  )

  const totalCourses = courses.length
  const activeCourses = courses.filter((c) => c.status === "Active").length
  const pendingCourses = courses.filter((c) => c.status === "Pending").length

  return (
    <AdminLayout
      activeSidebar="Courses"
      pageTitle="Course Management"
      pageDescription="Manage all courses, subjects, and programs offered by AEEG"
      headerRight={
        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-[10px] px-2 py-0.5">
            {activeCourses} Active
          </Badge>
          <Link href="/admin/courses/create">
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              Create New Course
            </Button>
          </Link>
        </div>
      }
    >
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <Card style={{ borderColor: colors.border }}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${colors.primary}10` }}>
              <BookOpen className="h-5 w-5" style={{ color: colors.primary }} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Courses</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>{totalCourses}</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ borderColor: colors.border }}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>{activeCourses}</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ borderColor: colors.border }}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${colors.accent}20` }}>
              <BookOpen className="h-5 w-5" style={{ color: colors.accent }} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>{pendingCourses}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {loadError && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{loadError}</p>}

      {/* Table Card */}
      <Card style={{ borderColor: colors.border }}>
        <CardHeader className="pb-4 flex flex-row items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle className="text-lg font-semibold" style={{ color: colors.secondary }}>
              All Courses
            </CardTitle>
            <CardDescription>
              {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
            </CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: colors.mutedForeground }} />
            <input
              type="text"
              placeholder="Search by name, code, instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-48 md:w-64 rounded-lg border pl-9 pr-3 text-sm outline-none transition-all bg-muted/30"
              style={{ borderColor: colors.border }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary
                e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.border
                e.currentTarget.style.boxShadow = "none"
              }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredCourses.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/20" style={{ borderColor: colors.border }}>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Course</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Code</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 hidden md:table-cell">Category</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Instructor</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 hidden xl:table-cell">Students</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: colors.border }}>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0 text-white text-xs font-bold"
                            style={{ backgroundColor: colors.primary }}
                          >
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-sm font-medium block" style={{ color: colors.secondary }}>
                              {course.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              <Clock className="h-3 w-3 inline mr-0.5" />
                              {course.duration}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 hidden sm:table-cell">
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {course.code}
                        </Badge>
                      </td>
                      <td className="px-6 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">{course.category}</span>
                      </td>
                      <td className="px-6 py-3.5 hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">{course.instructor}</span>
                      </td>
                      <td className="px-6 py-3.5 hidden xl:table-cell">
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="h-4 w-4" style={{ color: colors.mutedForeground }} />
                          <span className="text-sm font-medium" style={{ color: colors.secondary }}>
                            {course.students}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge variant={statusVariant[course.status]} className="text-[10px] px-2 py-0.5">
                          {course.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-[rgb(71,32,183)] transition-colors"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

/* ───────── Inline UsersIcon (avoids importing full icon set) ───────── */
function UsersIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}