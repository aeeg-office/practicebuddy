import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "@/components/layout/client-layout"
import Script from "next/script"

export const metadata: Metadata = {
  title: {
    default: "Lumaani — Practice. Learn. Master.",
    template: "%s | Lumaani",
  },
  description: "Practice, learn, and master English, Math, MAP, and SAT preparation. Personalized learning for Grades 3–10.",
  metadataBase: new URL("https://lumaani.com"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Lumaani",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/lumaani-icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/lumaani-icon.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/lumaani-icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Lumaani",
    title: "Lumaani — Practice. Learn. Master.",
    description: "Personalized learning platform for Grades 3–10 English, Math, MAP, and SAT preparation.",
    url: "https://lumaani.com",
    images: [{ url: "/lumaani-icon.svg", width: 512, height: 512 }],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://lumaani.com",
    languages: {
      "en": "https://lumaani.com",
      "ar": "https://lumaani.com/ar",
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
        <meta name="theme-color" content="#0b4f4a" />
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