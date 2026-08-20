'use client'

import { LanguageProvider } from "@/lib/i18n"
import { ExamModeProvider, useExamMode } from "@/lib/exam-mode-context"
import { AuthProvider } from "@/lib/auth-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Chatbot from "@/components/layout/chatbot"
import WhatsAppButton from "@/components/layout/whatsapp-button"
import AnalyticsProvider from "@/lib/analytics"

function LayoutChrome({ children }: { children: React.ReactNode }) {
  const { isExamMode } = useExamMode()

  return (
    <div className="flex min-h-screen flex-col">
      {!isExamMode && <Header />}
      <main className="flex-1">{children}</main>
      {!isExamMode && <Footer />}
      {!isExamMode && <Chatbot />}
      {!isExamMode && <WhatsAppButton />}
    </div>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ExamModeProvider>
          <AnalyticsProvider>
            <LayoutChrome>{children}</LayoutChrome>
          </AnalyticsProvider>
        </ExamModeProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}