'use client'

import { useLanguage } from "@/lib/i18n"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors rounded-md hover:bg-white/10"
      aria-label={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{lang === "en" ? "العربية" : "English"}</span>
    </button>
  )
}