'use client'

import { createContext, useContext, useState, useEffect, useCallback } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  lang: Language
  dir: "ltr" | "rtl"
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  dir: "ltr",
  setLang: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("pb-lang") as Language | null
    if (saved === "ar" || saved === "en") setLangState(saved)
  }, [])

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem("pb-lang", newLang)
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = newLang
  }, [])

  const dir = lang === "ar" ? "rtl" : "ltr"

  const t = useCallback((key: string): string => {
    return translations[lang]?.[key] ?? translations.en?.[key] ?? key
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

const translations: Record<Language, Record<string, string>> = {
  en: {
    /* Navigation */
    "nav.home": "Home",
    "nav.sat": "SAT Prep",
    "nav.map": "MAP Test Prep",
    "nav.subjects": "English & Math",
    "nav.practice": "Practice",
    "nav.login": "Login",

    /* Practice */
    "practice.title": "Practice Platform",
    "practice.subtitle": "Master every skill with targeted practice.",
    "practice.search": "Search skills...",
    "practice.quick.5min": "5-Min Warmup",
    "practice.quick.daily": "Daily Challenge",
    "practice.quick.mixed": "Mixed Drill",
    "practice.quick.weakest": "Weakest Skill",

    /* Mock Exams */
    "mock.title": "Mock Examinations",
    "mock.subtitle": "Simulate the real test experience.",

    /* AI Tutor */
    "ai.title": "AI Lumaani",
    "ai.subtitle": "Get help with hints, explanations, and practice questions.",

    /* Writing */
    "writing.title": "Writing Assessment",
    "writing.subtitle": "Practice essays, letters, and reports.",

    /* Listening */
    "listening.title": "Listening Practice",
    "listening.subtitle": "Improve your listening comprehension.",

    /* Speaking */
    "speaking.title": "Speaking Practice",
    "speaking.subtitle": "Build your speaking confidence.",

    /* Footer */
    "footer.tagline": "Practice smarter. Track your progress. Master every skill.",
    "footer.address": "Online — Worldwide",
    "footer.programs": "Platform",
    "footer.resources": "Resources",
    "footer.dashboard": "Student Dashboard",
    "footer.copyright": "Lumaani. All rights reserved.",

    /* General */
    "general.learnMore": "Learn More",
    "general.getStarted": "Get Started",
    "general.loading": "Loading...",
    "general.error": "Something went wrong.",
    "general.back": "Back",
    "general.next": "Next",
    "general.submit": "Submit",
    "general.cancel": "Cancel",
    "general.save": "Save",
    "general.search": "Search",
    "general.all": "All",
    "general.easy": "Easy",
    "general.medium": "Medium",
    "general.hard": "Hard",
    "general.mixed": "Mixed",
    "general.random": "Random",
    "general.timed": "Timed",
    "general.untimed": "Untimed",
    "general.questions": "Questions",
    "general.accuracy": "Accuracy",
    "general.streak": "Streak",
    "general.progress": "Progress",
    "general.mastery": "Mastery",
    "general.score": "Score",
    "general.duration": "Duration",
    "general.format": "Format",
    "general.start": "Start",
    "general.stop": "Stop",
    "general.continue": "Continue",
    "general.complete": "Complete",
    "general.retry": "Try Again",

    /* Language */
    "lang.switch": "العربية",
    "lang.english": "English",
    "lang.arabic": "العربية",
  },

  ar: {
    /* Navigation */
    "nav.home": "الرئيسية",
    "nav.sat": "SAT",
    "nav.map": "MAP",
    "nav.subjects": "الإنجليزية والرياضيات",
    "nav.practice": "التدريب",
    "nav.login": "تسجيل الدخول",

    /* Practice */
    "practice.title": "منصة التدريب",
    "practice.subtitle": "أتقن كل مهارة من خلال التدريب الموجه.",
    "practice.search": "ابحث عن مهارة...",
    "practice.quick.5min": "تمرين 5 دقائق",
    "practice.quick.daily": "التحدي اليومي",
    "practice.quick.mixed": "تمارين متنوعة",
    "practice.quick.weakest": "أضعف المهارات",

    /* Mock Exams */
    "mock.title": "الاختبارات التجريبية",
    "mock.subtitle": "محاكاة تجربة الاختبار الحقيقية.",

    /* AI Tutor */
    "ai.title": "المساعد الذكي",
    "ai.subtitle": "احصل على مساعدة في التلميحات والشروحات والتمارين.",

    /* Writing */
    "writing.title": "تقييم الكتابة",
    "writing.subtitle": "تدرب على المقالات والرسائل والتقارير.",

    /* Listening */
    "listening.title": "تدريب الاستماع",
    "listening.subtitle": "حسّن مهارات الاستماع لديك.",

    /* Speaking */
    "speaking.title": "تدريب التحدث",
    "speaking.subtitle": "ابنِ ثقتك في التحدث.",

    /* Footer */
    "footer.tagline": "تدرب بذكاء. تابع تقدمك. أتقن كل مهارة.",
    "footer.address": "عبر الإنترنت — في جميع أنحاء العالم",
    "footer.programs": "المنصة",
    "footer.resources": "الموارد",
    "footer.dashboard": "لوحة الطالب",
    "footer.copyright": "Lumaani. جميع الحقوق محفوظة.",

    /* General */
    "general.learnMore": "اعرف المزيد",
    "general.getStarted": "ابدأ الآن",
    "general.loading": "جارٍ التحميل...",
    "general.error": "حدث خطأ ما.",
    "general.back": "رجوع",
    "general.next": "التالي",
    "general.submit": "إرسال",
    "general.cancel": "إلغاء",
    "general.save": "حفظ",
    "general.search": "بحث",
    "general.all": "الكل",
    "general.easy": "سهل",
    "general.medium": "متوسط",
    "general.hard": "صعب",
    "general.mixed": "متنوع",
    "general.random": "عشوائي",
    "general.timed": "مؤقت",
    "general.untimed": "بدون مؤقت",
    "general.questions": "أسئلة",
    "general.accuracy": "الدقة",
    "general.streak": "التتابع",
    "general.progress": "التقدم",
    "general.mastery": "الإتقان",
    "general.score": "النتيجة",
    "general.duration": "المدة",
    "general.format": "الصيغة",
    "general.start": "ابدأ",
    "general.stop": "توقف",
    "general.continue": "استمر",
    "general.complete": "اكتمل",
    "general.retry": "حاول مرة أخرى",

    /* Language */
    "lang.switch": "English",
    "lang.english": "English",
    "lang.arabic": "العربية",
  },
}