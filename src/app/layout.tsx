import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "@/components/layout/client-layout"
import { AnalyticsScripts } from "@/lib/analytics"
import Script from "next/script"

export const metadata: Metadata = {
  title: {
    default: "Practice Buddy — Practice Platform",
    template: "%s | Practice Buddy",
  },
  description: "Practice platform for Grades 3-10 English, Math, MAP, and SAT preparation.",
  metadataBase: new URL("https://practicebuddy.app"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Practice Buddy",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Practice Buddy",
    title: "Practice Buddy — Practice Platform",
    description: "Practice platform for Grades 3-10 English, Math, MAP, and SAT preparation.",
    url: "https://practicebuddy.app",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="theme-color" content="#1a237e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-sans">
        <ClientLayout>{children}</ClientLayout>
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ("serviceWorker" in navigator) {
                window.addEventListener("load", () => {
                  navigator.serviceWorker.register("/service-worker.js").catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}