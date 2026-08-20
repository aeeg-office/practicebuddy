/**
 * Progress Tracker — Client-side attempt history, skill mastery,
 * and session persistence for the practice platform.
 *
 * Uses localStorage for anonymous/offline persistence and provides
 * the same data shapes as the API so the two can be swapped.
 */

import type { MasteryLevel } from "@/data/practice-skills"

/* ─────────────── Types ─────────────── */

export interface AttemptRecord {
  questionId: string
  skillId: string
  subject: string
  correct: boolean
  answer: string
  timeSpent: number
  timestamp: number
  sessionId: string
}

export interface SessionRecord {
  id: string
  subject: string
  skillId: string | null
  skillName: string
  startedAt: number
  completedAt: number | null
  questionCount: number
  correctCount: number
  totalTime: number
  completed: boolean
}

export interface SkillMastery {
  skillId: string
  skillName: string
  attempted: number
  correct: number
  accuracy: number
  level: MasteryLevel
  lastPracticed: number | null
}

export interface SubjectProgress {
  subject: string
  totalAttempts: number
  totalCorrect: number
  accuracy: number
  skills: SkillMastery[]
  todayAttempts: number
  streak: number
  lastActiveDate: string | null
}

export interface SessionState {
  currentQuestion: number
  answers: { qIdx: number; correct: boolean; selected: number }[]
  startedAt: number
  questions: { id: string }[]
}

/* ─────────────── Storage keys ─────────────── */

const KEYS = {
  attempts: "pb-progress-attempts",
  sessions: "pb-progress-sessions",
  sessionState: "pb-progress-session-state",
  streak: "pb-progress-streak",
} as const

/* ─────────────── Attempt History ─────────────── */

export function saveAttempt(attempt: AttemptRecord): void {
  if (typeof window === "undefined") return
  const attempts = loadAllAttempts()
  attempts.push(attempt)
  localStorage.setItem(KEYS.attempts, JSON.stringify(attempts))
  updateStreak(attempt.timestamp)
}

export function loadAllAttempts(): AttemptRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEYS.attempts)
    return raw ? (JSON.parse(raw) as AttemptRecord[]) : []
  } catch {
    return []
  }
}

export function loadAttemptsBySkill(skillId: string): AttemptRecord[] {
  return loadAllAttempts().filter((a) => a.skillId === skillId)
}

export function loadAttemptsBySubject(subject: string): AttemptRecord[] {
  return loadAllAttempts().filter((a) => a.subject === subject)
}

export function loadAttemptsBySession(sessionId: string): AttemptRecord[] {
  return loadAllAttempts().filter((a) => a.sessionId === sessionId)
}

export function clearAttempts(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEYS.attempts)
}

/* ─────────────── Skill Mastery Calculation ─────────────── */

/**
 * Determine mastery level based on accuracy.
 *  0-39%  → beginning
 *  40-59% → developing
 *  60-79% → approaching
 *  80-100% → mastered
 */
export function calculateMasteryLevel(accuracy: number): MasteryLevel {
  if (accuracy >= 0.8) return "mastered"
  if (accuracy >= 0.6) return "approaching"
  if (accuracy >= 0.4) return "developing"
  return "beginning"
}

export function calculateSkillMastery(skillId: string, skillName?: string): SkillMastery {
  const attempts = loadAttemptsBySkill(skillId)
  const attempted = attempts.length
  const correct = attempts.filter((a) => a.correct).length
  const accuracy = attempted > 0 ? correct / attempted : 0
  const lastPracticed = attempted > 0
    ? Math.max(...attempts.map((a) => a.timestamp))
    : null

  return {
    skillId,
    skillName: skillName ?? skillId,
    attempted,
    correct,
    accuracy,
    level: attempted > 0 ? calculateMasteryLevel(accuracy) : "not-assessed",
    lastPracticed,
  }
}

export function calculateSubjectProgress(subject: string): SubjectProgress {
  const attempts = loadAttemptsBySubject(subject)
  const totalAttempts = attempts.length
  const totalCorrect = attempts.filter((a) => a.correct).length
  const accuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : 0

  // Unique skill IDs from attempts
  const skillIds = [...new Set(attempts.map((a) => a.skillId))]

  // Today's attempts
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayAttempts = attempts.filter((a) => a.timestamp >= today.getTime()).length

  // Streak tracking
  const streak = getStreak()
  const lastActiveDate = streak > 0 ? getLastActiveDate() : null

  return {
    subject,
    totalAttempts,
    totalCorrect,
    accuracy,
    skills: skillIds.map((sid) => calculateSkillMastery(sid)),
    todayAttempts,
    streak,
    lastActiveDate,
  }
}

/* ─────────────── Streak Tracking ─────────────── */

function getStreakDates(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEYS.streak)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function saveStreakDates(dates: string[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(KEYS.streak, JSON.stringify(dates))
}

function updateStreak(timestamp: number): void {
  const dateStr = new Date(timestamp).toISOString().split("T")[0] // YYYY-MM-DD
  const dates = getStreakDates()
  if (dates.includes(dateStr)) return // already counted today
  dates.push(dateStr)
  saveStreakDates(dates)
}

export function getStreak(): number {
  const dates = getStreakDates().sort().reverse()
  if (dates.length === 0) return 0

  let streak = 1
  const today = new Date().toISOString().split("T")[0]

  // If most recent activity is not today or yesterday, streak is broken
  const mostRecent = dates[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
  if (mostRecent !== today && mostRecent !== yesterday) return 0

  for (let i = 1; i < dates.length; i++) {
    const curr = new Date(dates[i])
    const prev = new Date(dates[i - 1])
    const diffDays = Math.round((prev.getTime() - curr.getTime()) / 86400000)
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }
  return streak
}

function getLastActiveDate(): string | null {
  const dates = getStreakDates().sort().reverse()
  return dates.length > 0 ? dates[0] : null
}

/* ─────────────── Session Persistence ─────────────── */

export function saveSessionRecord(session: SessionRecord): void {
  if (typeof window === "undefined") return
  const sessions = loadAllSessions()
  const idx = sessions.findIndex((s) => s.id === session.id)
  if (idx >= 0) {
    sessions[idx] = session
  } else {
    sessions.push(session)
  }
  localStorage.setItem(KEYS.sessions, JSON.stringify(sessions))
}

export function loadAllSessions(): SessionRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEYS.sessions)
    return raw ? (JSON.parse(raw) as SessionRecord[]) : []
  } catch {
    return []
  }
}

export function loadSessionRecord(id: string): SessionRecord | undefined {
  return loadAllSessions().find((s) => s.id === id)
}

export function loadSessionsBySubject(subject: string): SessionRecord[] {
  return loadAllSessions().filter((s) => s.subject === subject)
}

export function clearSessions(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEYS.sessions)
}

/* ─────────────── Session State (in-progress, survives refresh) ─────────────── */

export function saveSessionState(state: SessionState): void {
  if (typeof window === "undefined") return
  localStorage.setItem(KEYS.sessionState, JSON.stringify(state))
}

export function loadSessionState(): SessionState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(KEYS.sessionState)
    return raw ? (JSON.parse(raw) as SessionState) : null
  } catch {
    return null
  }
}

export function clearSessionState(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEYS.sessionState)
}

/* ─────────────── Clear All ─────────────── */

export function clearAllProgress(): void {
  if (typeof window === "undefined") return
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
}