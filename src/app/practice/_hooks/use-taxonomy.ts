'use client'

import { useState, useEffect, useCallback } from "react"
import type { SubjectKey, SubjectData, SubjectMeta } from "@/data/practice-skills"

/**
 * Subject metadata for display (icons, colors, labels).
 * Previously in mockSubjectMeta; now lives here so pages don't import mockSubjectMeta.
 */
export const SUBJECT_META: Record<SubjectKey, SubjectMeta> = {
  math: { key: "math", label: "Math", icon: "🔢", color: "blue", description: "Algebra, Geometry, Data & Statistics" },
  reading: { key: "reading", label: "Reading", icon: "📖", color: "purple", description: "Reading Comprehension, Craft and Structure" },
  writing: { key: "writing", label: "Writing", icon: "✏️", color: "green", description: "Grammar, Standard English Conventions" },
  science: { key: "science", label: "Science", icon: "🔬", color: "amber", description: "General Science" },
  sat: { key: "sat", label: "SAT", icon: "🎯", color: "red", description: "SAT Math, Reading & Writing" },
  act: { key: "act", label: "ACT", icon: "📝", color: "orange", description: "ACT Prep" },
  ielts: { key: "ielts", label: "IELTS", icon: "🌍", color: "teal", description: "IELTS Prep" },
  toefl: { key: "toefl", label: "TOEFL", icon: "🗽", color: "cyan", description: "TOEFL Prep" },
  english: { key: "english", label: "English", icon: "📖", color: "pink", description: "English Language Arts" },
}

/** All subject keys (valid + legacy) */
export const ALL_SUBJECT_KEYS: SubjectKey[] = [
  "math", "reading", "writing", "science", "english",
  "sat", "act", "ielts", "toefl",
]

/** VALID_SUBJECTS keys only */
export const VALID_SUBJECT_KEYS: SubjectKey[] = ["math", "reading", "writing", "science", "english"]

/** Subject icon map (used for quick lookup) */
export const SUBJECT_ICON_MAP: Record<SubjectKey, string> = {
  math: "🔢", reading: "📖", writing: "✏️", science: "🔬",
  sat: "🎯", act: "📝", ielts: "🌍", toefl: "🗽", english: "📖",
}

/**
 * Fetch taxonomy for a single subject from /api/practice/skills.
 * Returns the full SubjectData from the API (enriched with real DB counts).
 */
export async function fetchSubjectTaxonomy(subject: SubjectKey): Promise<SubjectData | null> {
  try {
    const res = await fetch(`/api/practice/skills?subject=${subject}`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/**
 * Fetch taxonomy for multiple subjects in parallel.
 * Returns a map of subject -> SubjectData (null for failures).
 */
export async function fetchAllTaxonomies(
  subjects: SubjectKey[]
): Promise<Map<SubjectKey, SubjectData | null>> {
  const results = await Promise.all(
    subjects.map(async (s) => [s, await fetchSubjectTaxonomy(s)] as const)
  )
  return new Map(results)
}

/**
 * React hook: fetch taxonomy for a single subject.
 * Used by [subject]/page.tsx and [subject]/[skillId]/page.tsx.
 */
export function useSubjectTaxonomy(subject: SubjectKey | undefined) {
  const [data, setData] = useState<SubjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!subject) {
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchSubjectTaxonomy(subject)
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load taxonomy")
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [subject])

  const isValid = data !== null

  return { data, loading, error, isValid }
}

/**
 * React hook: fetch taxonomy for ALL subjects.
 * Used by the practice home page for filtering/display.
 */
export function useAllTaxonomies(subjects: SubjectKey[] = ALL_SUBJECT_KEYS) {
  const [data, setData] = useState<Map<SubjectKey, SubjectData | null>>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchAllTaxonomies(subjects)
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading }
}

/**
 * Count total skills for a subject from API-loaded taxonomy.
 * Returns 0 if data not yet loaded.
 */
export function countTotalSkills(data: SubjectData | null): number {
  if (!data) return 0
  return data.domains.reduce((sum, d) => sum + d.skills.length, 0)
}

/**
 * Count total questions for a subject from API-loaded taxonomy.
 */
export function countTotalQuestions(data: SubjectData | null): number {
  if (!data) return 0
  return data.domains.reduce(
    (sum, d) => sum + d.skills.reduce((s, sk) => s + (sk.questions ?? 0), 0),
    0
  )
}