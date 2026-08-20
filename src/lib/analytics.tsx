'use client'

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// ===== CONFIG: Replace with your actual tracking IDs =====
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || ""
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || ""

/**
 * Track a custom event manually (call from any component).
 * Usage: trackEvent("diagnostic_start", { exam_type: "sat" })
 */
export function trackEvent(action: string, properties?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    ;(window as any).gtag("event", action, properties)
  }
}

/**
 * Track WhatsApp click.
 */
export function trackWhatsApp(label?: string) {
  trackEvent("whatsapp_click", { label: label || "general" })
}

/**
 * Track diagnostic start.
 */
export function trackDiagnosticStart(examType: string) {
  trackEvent("diagnostic_start", { exam_type: examType })
}

/**
 * Track contact form submit.
 */
export function trackFormSubmit(formName: string) {
  trackEvent("form_submit", { form_name: formName })
}

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Page view tracking
  useEffect(() => {
    if (GA4_MEASUREMENT_ID && typeof (window as any).gtag === "function") {
      ;(window as any).gtag("config", GA4_MEASUREMENT_ID, {
        page_path: pathname,
      })
    }
  }, [pathname])

  return <>{children}</>
}

/**
 * Inject the GA4 and Clarity scripts into the document head.
 * Call this once in the root layout.
 */
export function AnalyticsScripts() {
  if (typeof window !== "undefined") return null // SSR only

  return (
    <>
      {/* Google Analytics 4 */}
      {GA4_MEASUREMENT_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_PROJECT_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", '${CLARITY_PROJECT_ID}');
            `,
          }}
        />
      )}
    </>
  )
}