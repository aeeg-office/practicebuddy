import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Speaking Practice — Build Confidence",
  description: "Practice English speaking skills for IELTS, TOEFL, and academic communication. Build confidence with structured speaking exercises.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
