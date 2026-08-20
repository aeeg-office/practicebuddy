import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "@/components/layout/client-layout"
import { AnalyticsScripts } from "@/lib/analytics"

export const metadata: Metadata = {
  title: {
    default: "Practice Buddy — AI-Powered Multi-Tenant Practice Platform",
    template: "%s | Practice Buddy",
  },
  description: "Practice Buddy is a multi-tenant, AI-powered practice platform with gold-certified question banks. Mock exams, skills practice, and progress analytics for students and teachers.",
  metadataBase: new URL("https://practicebuddy.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Practice Buddy",
    title: "Practice Buddy — AI-Powered Practice Platform",
    description: "Multi-tenant practice platform with AI-powered question generation, mock exams, and detailed analytics.",
    url: "https://practicebuddy.app",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Practice Buddy",
    description: "Multi-tenant, AI-powered practice platform with gold-certified question banks.",
    images: { url: "/images/og-default.jpg" },
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://practicebuddy.app",
    languages: {
      "en": "https://practicebuddy.app",
      "ar": "https://practicebuddy.app/ar",
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Practice Buddy",
  applicationCategory: "EducationalApplication",
  description: "Multi-tenant, AI-powered practice platform with gold-certified question banks, mock exams, and skills practice.",
  url: "https://practicebuddy.app",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AnalyticsScripts />
      </head>
      <body className="font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}