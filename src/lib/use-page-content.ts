'use client'

import { useLanguage } from "@/lib/i18n"
import { content as enHome } from "@/content/en/home"
import { content as enAbout } from "@/content/en/about"
import { content as enSatPrep } from "@/content/en/sat-prep"
import { content as enSubjects } from "@/content/en/subjects"
import { content as enFaqs } from "@/content/en/faqs"
import { content as enContact } from "@/content/en/contact"
import { content as enCompare } from "@/content/en/compare"
import { content as enPricing } from "@/content/en/pricing"
import { content as enTeacher } from "@/content/en/teacher"
import { content as enParent } from "@/content/en/parent"
import { content as enBlog } from "@/content/en/blog"
import { content as enPrivacy } from "@/content/en/privacy"

// Arabic imports
import { content as arHome } from "@/content/ar/home"
import { content as arAbout } from "@/content/ar/about"
import { content as arSatPrep } from "@/content/ar/sat-prep"
import { content as arSubjects } from "@/content/ar/subjects"
import { content as arFaqs } from "@/content/ar/faqs"
import { content as arContact } from "@/content/ar/contact"
import { content as arCompare } from "@/content/ar/compare"
import { content as arPricing } from "@/content/ar/pricing"
import { content as arTeacher } from "@/content/ar/teacher"
import { content as arParent } from "@/content/ar/parent"
import { content as arBlog } from "@/content/ar/blog"
import { content as arPrivacy } from "@/content/ar/privacy"

const contentMap: Record<string, Record<string, any>> = {
  home: { en: enHome, ar: arHome },
  about: { en: enAbout, ar: arAbout },
  "sat-prep": { en: enSatPrep, ar: arSatPrep },
  subjects: { en: enSubjects, ar: arSubjects },
  faqs: { en: enFaqs, ar: arFaqs },
  contact: { en: enContact, ar: arContact },
  compare: { en: enCompare, ar: arCompare },
  pricing: { en: enPricing, ar: arPricing },
  teacher: { en: enTeacher, ar: arTeacher },
  parent: { en: enParent, ar: arParent },
  blog: { en: enBlog, ar: arBlog },
  privacy: { en: enPrivacy, ar: arPrivacy },
}

export function usePageContent(pageKey: string) {
  const { lang } = useLanguage()
  const pageContent = contentMap[pageKey]
  if (!pageContent) return {}
  return pageContent[lang] ?? pageContent.en
}