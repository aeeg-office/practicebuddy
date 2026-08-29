'use client'

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  GraduationCap,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { fetchAdminCollection } from "@/lib/admin-client"
import { AdminLayout, colors } from "../_components/admin-layout"

/* ───────── Types ───────── */
interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  department: string
  subjects: string[]
  students: number
  status: "Active" | "Inactive" | "Pending"
  joined: string
}

interface TeacherRecord {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  expertise: unknown
  createdAt: string
}

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
        <GraduationCap className="h-8 w-8" style={{ color: colors.mutedForeground }} />
      </div>
      <h3 className="text-lg font-semibold mb-1" style={{ color: colors.secondary }}>
        {searchTerm ? "No teachers found" : "No teachers yet"}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {searchTerm
          ? `No teachers match "${searchTerm}". Try a different search term.`
          : "Get started by adding your first teacher to the platform."}
      </p>
      {!searchTerm && (
        <Link href="/admin/teachers/add">
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Teacher
          </Button>
        </Link>
      )}
    </div>
  )
}

/* ───────── Teachers Page ───────── */
export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    fetchAdminCollection<TeacherRecord>("teachers", "teachers", { limit: 100 })
      .then(({ items }) => setTeachers(items.map((teacher) => ({
        id: teacher.id,
        name: `${teacher.firstName} ${teacher.lastName}`.trim(),
        email: teacher.email,
        phone: teacher.phone || "—",
        department: "—",
        subjects: Array.isArray(teacher.expertise) ? teacher.expertise.filter((item): item is string => typeof item === "string") : [],
        students: 0,
        status: "Active",
        joined: new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(teacher.createdAt)),
      }))))
      .catch((error: unknown) => setLoadError(error instanceof Error ? error.message : "Unable to load teachers"))
  }, [])

  const filteredTeachers = useMemo(
    () =>
      teachers.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.subjects.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
          t.id.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, teachers],
  )

  const totalTeachers = teachers.length
  const activeTeachers = teachers.filter((t) => t.status === "Active").length
  const pendingTeachers = teachers.filter((t) => t.status === "Pending").length

  return (
    <AdminLayout
      activeSidebar="Teachers"
      pageTitle="Teacher Management"
      pageDescription="Manage all teachers and instructors in Lumaani programs"
      headerRight={
        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-[10px] px-2 py-0.5">
            {activeTeachers} Active
          </Badge>
          <Link href="/admin/teachers/add">
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              Add New Teacher
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
              <GraduationCap className="h-5 w-5" style={{ color: colors.primary }} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Teachers</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>{totalTeachers}</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ borderColor: colors.border }}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <GraduationCap className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>{activeTeachers}</p>
            </div>
          </CardContent>
        </Card>
        <Card style={{ borderColor: colors.border }}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${colors.accent}20` }}>
              <GraduationCap className="h-5 w-5" style={{ color: colors.accent }} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>{pendingTeachers}</p>
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
              All Teachers
            </CardTitle>
            <CardDescription>
              {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? "s" : ""} found
            </CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: colors.mutedForeground }} />
            <input
              type="text"
              placeholder="Search by name, subject, department..."
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
          {filteredTeachers.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/20" style={{ borderColor: colors.border }}>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Teacher</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Email</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 hidden md:table-cell">Department</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Subjects</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 hidden xl:table-cell">Students</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: colors.border }}>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src=""
                            alt={teacher.name}
                            fallback={teacher.name.split(" ").map((n) => n[0]).join("")}
                            className="h-8 w-8 shrink-0"
                          />
                          <div>
                            <span className="text-sm font-medium block" style={{ color: colors.secondary }}>
                              {teacher.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{teacher.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 hidden sm:table-cell">
                        <span className="text-sm text-muted-foreground">{teacher.email}</span>
                      </td>
                      <td className="px-6 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">{teacher.department}</span>
                      </td>
                      <td className="px-6 py-3.5 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.slice(0, 2).map((subject) => (
                            <Badge key={subject} variant="outline" className="text-[9px] px-1.5 py-0">
                              {subject}
                            </Badge>
                          ))}
                          {teacher.subjects.length > 2 && (
                            <span className="text-[10px] text-muted-foreground">+{teacher.subjects.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 hidden xl:table-cell">
                        <span className="text-sm font-medium" style={{ color: colors.secondary }}>
                          {teacher.students}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge variant={statusVariant[teacher.status]} className="text-[10px] px-2 py-0.5">
                          {teacher.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-[rgb(11,79,74)] transition-colors"
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