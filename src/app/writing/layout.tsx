import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Writing Practice — Academic & Essay Writing",
  description: "Practice academic writing skills for SAT, ACT, IELTS, TOEFL, and university. Essay writing, grammar, and structured writing exercises.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
