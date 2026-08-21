'use client'

import { useLanguage } from "@/lib/i18n"
import { content as enHome } from "@/content/en/home"
import { content as enSatPrep } from "@/content/en/sat-prep"
import { content as enSubjects } from "@/content/en/subjects"

// Arabic imports
import { content as arHome } from "@/content/ar/home"
import { content as arSatPrep } from "@/content/ar/sat-prep"
import { content as arSubjects } from "@/content/ar/subjects"

const contentMap: Record<string, Record<string, any>> = {
  home: { en: enHome, ar: arHome },
  "sat-prep": { en: enSatPrep, ar: arSatPrep },
  subjects: { en: enSubjects, ar: arSubjects },
}

export function usePageContent(pageKey: string) {
  const { lang } = useLanguage()
  const pageContent = contentMap[pageKey]
  if (!pageContent) return {}
  return pageContent[lang] ?? pageContent.en
}