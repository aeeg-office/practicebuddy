'use client'

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/lib/auth-context"

export interface DashboardStats {
  totalAttempts: number
  correctAttempts: number
  accuracy: number
  firstAttemptAccuracy: number
  secondAttemptRecovery: number
  sessionsCompleted: number
  streak: number
  pendingAssignments: number
}

export interface MasterySkill {
  skillId: string
  skillName: string | null
  domain: string | null
  level: string
  confidence: number | null
  attemptsCount: number
  correctCount: number
  lastPracticed: string | null
}

export interface DashboardData {
  user: {
    name: string | null
    email: string
    role: string
    memberSince: string
  }
  stats: DashboardStats
  mastery: {
    total: number
    mastered: number
    proficient: number
    approaching: number
    needsSupport: number
    skills: MasterySkill[]
  }
  recentSessions: {
    id: string
    type: string
    status: string
    questions: number
    correct: number
    accuracy: number
    startedAt: string
    completedAt: string | null
  }[]
  assignments: {
    id: string
    title: string
    dueAt: string | null
    status: string
    score: number | null
    totalQuestions: number
    correctCount: number
  }[]
}

export function useDashboard() {
  const { token } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = useCallback(async () => {
    if (!token) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to load dashboard")
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard")
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { fetchDashboard() }, [fetchDashboard])

  return { data, loading, error, refresh: fetchDashboard }
}
