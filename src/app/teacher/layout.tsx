import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Teacher Dashboard",
  description: "Teacher portal for Lumaani instructors. Manage student progress, schedules, and lesson plans for test preparation programs.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
