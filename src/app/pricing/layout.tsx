import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing & Plans — Test Prep Programs Cairo",
  description: "View AEEG's test preparation program pricing and plans. Flexible options for SAT, ACT, IELTS, and TOEFL prep in Cairo and online.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
