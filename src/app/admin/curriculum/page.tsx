'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookMarked, Layers, Sparkles, Plus, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminLayout, colors } from "@/app/admin/_components/admin-layout"

export default function CurriculumPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/skills", { credentials: "same-origin" })
        if (res.ok) {
          const data = await res.json()
          setSkills(data.skills ?? [])
        }
      } catch { /* ignore */ }
      finally { setLoading(false) }
    })()
  }, [])

  const subjects = [...new Set(skills.map(s => s.subject))]

  return (
    <AdminLayout
      activeSidebar="Curriculum"
      pageTitle="Curriculum Management"
      pageDescription="Manage skills, micro-skills, and gold questions"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Layers className="h-5 w-5" style={{ color: colors.primary }} />
            <div>
              <p className="text-xs text-muted-foreground">Skills</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>{skills.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BookMarked className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-xs text-muted-foreground">Subjects</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>{subjects.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-xs text-muted-foreground">Gold Questions</p>
              <p className="text-xl font-bold" style={{ color: colors.secondary }}>5</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading curriculum...</p>
      ) : (
        <div className="space-y-6">
          {subjects.map(subject => {
            const subjectSkills = skills.filter(s => s.subject === subject)
            return (
              <Card key={subject}>
                <CardHeader>
                  <CardTitle className="text-lg capitalize" style={{ color: colors.secondary }}>{subject}</CardTitle>
                  <CardDescription>{subjectSkills.length} skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {subjectSkills.map(skill => (
                      <div key={skill.id} className="flex items-center justify-between py-2 border-b text-sm" style={{ borderColor: colors.border }}>
                        <div>
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{skill.domain}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{skill.questionCount} questions</span>
                          <span>{skill.microSkillCount} micro-skills</span>
                          <Badge variant="outline" className="text-[10px]">{skill.difficulty}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </AdminLayout>
  )
}