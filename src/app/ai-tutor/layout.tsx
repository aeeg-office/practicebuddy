import Link from "next/link"
import { Brain, BookOpen, Clock, ChevronRight, Home, GraduationCap, MessageSquareText, Save } from "lucide-react"

const sidebarLinks = [
  { label: "Chat", href: "/ai-tutor", icon: MessageSquareText },
  { label: "Saved Explanations", href: "/ai-tutor/saved", icon: Save },
  { label: "History", href: "/ai-tutor/history", icon: Clock },
]

export default function AITutorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f6f6f6]">
      {/* ─── SIDEBAR ─── */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-white border-r border-gray-200">
        {/* Logo area */}
        <Link href="/ai-tutor" className="flex items-center gap-2.5 px-6 h-16 border-b border-gray-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5a623] text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold leading-tight text-[#0d4f4f]">AI Tutor</div>
            <div className="text-[10px] leading-tight text-gray-500">Lumaani</div>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-[#0d4f4f]/5 hover:text-[#0d4f4f] transition-all duration-200"
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-4 space-y-3 border-t border-gray-200 pt-4">
          <Link
            href="/practice"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-[#0d4f4f] hover:bg-[#0d4f4f]/5 transition-all duration-200"
          >
            <BookOpen className="h-5 w-5 shrink-0" />
            Back to Practice
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <Home className="h-5 w-5 shrink-0" />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Sticky Top Bar with Breadcrumbs ── */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-[#0d4f4f]/5 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Brain className="h-5 w-5 text-gray-500" />
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-sm text-gray-500">
              <Link href="/" className="hover:text-[#0d4f4f] transition-colors">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
              <Link href="/practice" className="hover:text-[#0d4f4f] transition-colors">
                Practice
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
              <span className="font-semibold text-gray-800">AI Tutor</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://mailto:hello@lumaani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.713.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Support
            </a>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}