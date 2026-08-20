import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Test Prep Blog — SAT, ACT, IELTS & TOEFL Tips",
  description: "Expert test preparation tips, study guides, and strategies for SAT, ACT, IELTS, TOEFL, IB, and more. From Cairo's premier education group since 2011.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
