'use client'

import Link from "next/link"
import { useState, useRef, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { useAuth, getRoleHomePath } from "@/lib/auth-context"
import LanguageSwitcher from "@/components/layout/language-switcher"

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
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setDropdownOpen(label)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(null)
    }, 300)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, label: string) => {
      if (e.key === "Escape" && dropdownOpen === label) {
        setDropdownOpen(null)
        const trigger = (e.target as HTMLElement)
          .closest(".dropdown-group")
          ?.querySelector<HTMLButtonElement>(".dropdown-trigger")
        trigger?.focus()
      }
    },
    [dropdownOpen],
  )

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/practice-buddy-logo.svg" alt="Practice Buddy Logo" className="h-11 w-auto brightness-0 invert" />
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
                  className="dropdown-trigger flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-white/10 transition-colors"
                  aria-expanded={dropdownOpen === item.label}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${dir === "rtl" ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </Link>
              )}
              {item.children && dropdownOpen === item.label && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 rounded-md border bg-white shadow-lg"
                  onKeyDown={(e) => handleKeyDown(e, item.label)}
                >
                  <div className="p-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
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
          <Link href="/take-diagnostic">
            <Button variant="accent" size="sm" className="hidden sm:inline-flex text-xs px-3">
              {t("nav.diagnostic")}
            </Button>
          </Link>
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              {user?.role === "student" && (
                <Link href="/practice">
                  <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                    My Practice
                  </Button>
                </Link>
              )}
              {user?.role === "teacher" && (
                <Link href="/teacher">
                  <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                    Teacher Dashboard
                  </Button>
                </Link>
              )}
              {(user?.role === "admin" || user?.role === "school_admin") && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                    Admin
                  </Button>
                </Link>
              )}
              <Link href={getRoleHomePath(user?.role || "student")}>
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                  <User className="mr-1 h-3.5 w-3.5" />
                  {user?.name?.split(" ")[0] || "Dashboard"}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white hover:text-primary"
                onClick={logout}
              >
                <LogOut className="mr-1 h-3.5 w-3.5" />
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white hover:text-primary">
                {t("nav.login")}
              </Button>
            </Link>
          )}
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-primary-foreground/80 hover:text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <div className="px-3 py-2 text-sm font-semibold text-primary-foreground/80">{item.label}</div>
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-6 py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground rounded-md"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2 space-y-2 px-3">
              <Link href="/take-diagnostic" onClick={() => setMobileOpen(false)}>
                <Button variant="accent" className="w-full text-xs">{t("nav.diagnostic")}</Button>
              </Link>
              {isAuthenticated ? (
                <>
                  {user?.role === "student" && (
                    <Link href="/practice" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">My Practice</Button>
                    </Link>
                  )}
                  {user?.role === "teacher" && (
                    <Link href="/teacher" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">Teacher Dashboard</Button>
                    </Link>
                  )}
                  {(user?.role === "admin" || user?.role === "school_admin") && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">Admin Dashboard</Button>
                    </Link>
                  )}
                  <Link href={getRoleHomePath(user?.role || "student")} onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
                      <User className="mr-1 h-3.5 w-3.5" />
                      {user?.name?.split(" ")[0] || "Dashboard"}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full text-xs border-white/30 text-white hover:bg-white hover:text-primary"
                    onClick={() => { logout(); setMobileOpen(false); }}
                  >
                    <LogOut className="mr-1 h-3.5 w-3.5" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white hover:text-primary">{t("nav.login")}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}