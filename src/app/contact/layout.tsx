import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact AEEG — Cairo Test Prep Center",
  description: "Get in touch with AEEG. Visit our Cairo center, call us, or message on WhatsApp. Start your test preparation journey today.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
