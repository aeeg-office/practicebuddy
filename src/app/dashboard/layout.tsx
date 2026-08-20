import type { Metadata } from "next"
import { AuthGuard } from "@/components/auth/auth-guard"

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Track your test preparation progress, diagnostic results, and practice performance on the AEEG student dashboard.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
