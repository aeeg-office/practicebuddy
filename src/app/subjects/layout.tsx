import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "English & Math Tutoring Cairo — Academic Support",
  description: "Expert English and Mathematics tutoring in Cairo. Common Core, IGCSE, IB support. In-center and online sessions with qualified instructors.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
