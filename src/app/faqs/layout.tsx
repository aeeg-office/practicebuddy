import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQs — SAT, ACT, IELTS & TOEFL Preparation",
  description: "Frequently asked questions about SAT, ACT, IELTS, and TOEFL preparation at AEEG. Get answers about programs, pricing, schedules, and more.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
