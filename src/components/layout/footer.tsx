'use client'

import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

const footerColumns = [
  {
    titleKey: "footer.programs",
    links: [
      { key: "nav.sat", href: "/sat-prep" },
      { key: "nav.subjects", href: "/subjects" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { key: "nav.about", href: "/about" },
      { key: "nav.blog", href: "/blog" },
      { key: "nav.faqs", href: "/faqs" },
      { key: "nav.contact", href: "/contact" },
      { key: "footer.privacy", href: "/privacy" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      { key: "nav.diagnostic", href: "/take-diagnostic" },
      { key: "nav.practice", href: "/practice" },
      { key: "footer.dashboard", href: "/dashboard" },
      { key: "footer.compare", href: "/compare" },
      { key: "footer.pricing", href: "/pricing" },
    ],
  },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-[rgb(30,39,97)] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/practice-buddy-logo.svg" alt="Practice Buddy Logo" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-blue-200 mb-4">
              {t("footer.tagline")}
            </p>
            <div className="text-sm text-blue-200 space-y-1">
              <p>{t("footer.address")}</p>
              <p className="text-white underline underline-offset-2">hello@practicebuddy.app</p>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.titleKey}>
              <h3 className="font-semibold text-sm mb-3">{t(col.titleKey)}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition-colors">
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-blue-800/50 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
