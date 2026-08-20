import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About AEEG — Cairo's Premier Test Prep Since 2011",
  description: "Learn about AEEG, Cairo's premier test prep center since 2011. Expert SAT, ACT, IELTS, TOEFL preparation with in-center and online options.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
