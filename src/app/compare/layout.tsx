import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SAT vs ACT vs IELTS vs TOEFL — Compare Exams",
  description: "Compare standardized tests: SAT, ACT, IELTS, TOEFL. Find the right exam for your academic goals with expert guidance from AEEG.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
