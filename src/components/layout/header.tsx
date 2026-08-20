'use client'

import Link from "next/link"
import { useState, useRef, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { useAuth, getRoleHomePath } from "@/lib/auth-context"
import LanguageSwitcher from "@/components/layout/language-switcher"
import { trackWhatsApp } from "@/lib/analytics"

export default function Header() {
  const { t, dir } = useLanguage()
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navItems = useMemo(
    () => [
      { label: t("nav.home"), href: "/" },
      {
        label: t("nav.programs"),
        href: "#",
        children: [
          { label: t("nav.sat"), href: "/sat-prep" },
          { label: t("nav.subjects"), href: "/subjects" },
        ],
      },
      { label: t("nav.practice"), href: "/practice" },
      { label: t("nav.blog"), href: "/blog" },
      { label: t("nav.faqs"), href: "/faqs" },
      { label: t("nav.contact"), href: "/contact" },
    ],
    [t],
  )

  const handleMouseEnter = useCallback((label: string) => {
    // Cancel any pending close
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setDropdownOpen(label)
  }, [])

  const handleMouseLeave = useCallback(() => {
    // Wait 300ms before closing — gives user time to move from button to panel
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(null)
    }, 300)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, label: string) => {
      if (e.key === "Escape" && dropdownOpen === label) {
        setDropdownOpen(null)
        // Focus the trigger button
        const trigger = (e.target as HTMLElement)
          .closest(".dropdown-group")
          ?.querySelector<HTMLButtonElement>(".dropdown-trigger")
        trigger?.focus()
      }
    },
    [dropdownOpen],
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/practice-buddy-logo.svg" alt="Practice Buddy Logo" className="h-11 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative dropdown-group"
              onMouseEnter={() => item.children && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.children ? (
                <button
                  className="dropdown-trigger flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-[rgb(71,32,183)] rounded-md hover:bg-muted/50 transition-colors"
                  aria-expanded={dropdownOpen === item.label}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${
                      dir === "rtl" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-[rgb(71,32,183)] rounded-md hover:bg-muted/50 transition-colors"
                >
                  {item.label}
                </Link>
              )}
              {item.children && dropdownOpen === item.label && (
                <div
                  className="absolute top-full left-0 mt-0 pt-1 w-52 rounded-md border bg-white shadow-lg animate-in fade-in slide-in-from-top-1 duration-200 max-h-80 overflow-y-auto"
                  onKeyDown={(e) => handleKeyDown(e, item.label)}
                >
                  <div className="p-1.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-[rgb(71,32,183)] hover:bg-muted/50 rounded-md transition-colors"
                        tabIndex={0}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {/* WhatsApp — Desktop */}
          <a
            href="https://wa.me/201060618899"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp("header_desktop")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#25D366] hover:text-[#1ebe5c] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("nav.whatsapp")}
          </a>
          <Link href="/take-diagnostic">
            <Button variant="accent" size="sm" className="hidden sm:inline-flex text-xs whitespace-nowrap px-3">
              {t("nav.diagnostic")}
            </Button>
          </Link>
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              {/* Role-specific link */}
              {user?.role === "student" && (
                <Link href="/practice">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-xs">
                    My Practice
                  </Button>
                </Link>
              )}
              {user?.role === "teacher" && (
                <Link href="/teacher">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-xs">
                    Teacher Dashboard
                  </Button>
                </Link>
              )}
              {(user?.role === "admin" || user?.role === "school_admin") && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-xs">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Link href={getRoleHomePath(user?.role || "student")}>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-xs">
                  <User className="mr-1 h-3.5 w-3.5" />
                  {user?.name?.split(" ")[0] || "Dashboard"}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex text-xs"
                onClick={logout}
              >
                <LogOut className="mr-1 h-3.5 w-3.5" />
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm" className="hidden sm:inline-flex">
                {t("nav.login")}
              </Button>
            </Link>
          )}
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-[rgb(71,32,183)]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <div className="px-3 py-2 text-sm font-semibold text-[rgb(71,32,183)]">{item.label}</div>
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-6 py-2 text-sm text-muted-foreground hover:text-[rgb(71,32,183)] rounded-md"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-[rgb(71,32,183)] rounded-md"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2 space-y-2 px-3">
              <a
                href="https://wa.me/201060618899"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ebe5c] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("nav.whatsapp")}
              </a>
              <Link href="/take-diagnostic" onClick={() => setMobileOpen(false)}>
                <Button variant="accent" className="w-full text-xs">{t("nav.diagnostic")}</Button>
              </Link>
              {isAuthenticated ? (
                <>
                  {/* Role-specific link — mobile */}
                  {user?.role === "student" && (
                    <Link href="/practice" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-xs">My Practice</Button>
                    </Link>
                  )}
                  {user?.role === "teacher" && (
                    <Link href="/teacher" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-xs">Teacher Dashboard</Button>
                    </Link>
                  )}
                  {(user?.role === "admin" || user?.role === "school_admin") && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-xs">Admin Dashboard</Button>
                    </Link>
                  )}
                  <Link href={getRoleHomePath(user?.role || "student")} onClick={() => setMobileOpen(false)}>
                    <Button variant="default" className="w-full text-xs">
                      <User className="mr-1 h-3.5 w-3.5" />
                      {user?.name?.split(" ")[0] || "Dashboard"}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => { logout(); setMobileOpen(false); }}
                  >
                    <LogOut className="mr-1 h-3.5 w-3.5" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="default" className="w-full">{t("nav.login")}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}