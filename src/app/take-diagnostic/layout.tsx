import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Diagnostic Test — SAT, ACT, IELTS, TOEFL",
  description: "Take a free diagnostic test for SAT, ACT, IELTS, or TOEFL. Assess your current level and get a personalized study plan from AEEG's experts.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
