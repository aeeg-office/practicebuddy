import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Parent Portal — Track Your Child's Progress",
  description: "Monitor your child's test preparation journey with Lumaani. View progress reports, schedules, and teacher feedback.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
