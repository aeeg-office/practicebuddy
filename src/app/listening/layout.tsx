import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Listening Practice — Improve Comprehension",
  description: "Practice listening comprehension for IELTS, TOEFL, and academic English. Exercises and assessments to build your listening skills.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
