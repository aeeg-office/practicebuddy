'use client'

import Link from "next/link"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, User } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { useAuth, getRoleHomePath } from "@/lib/auth-context"
import LanguageSwitcher from "@/components/layout/language-switcher"
import { useState } from "react"

export default function Header() {
  const { t } = useLanguage()
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = useMemo(
    () => [
      { label: t("nav.home"), href: "/" },
      { label: t("nav.practice"), href: "/practice" },
      { label: t("nav.sat"), href: "/sat-prep" },
      { label: t("nav.map"), href: "/map-prep" },
      { label: t("nav.subjects"), href: "/subjects" },
    ],
    [t],
  )

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shrink-0">
            L
          </div>
          <span className="text-lg font-bold tracking-tight">Lumaani</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
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
                    Teacher
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
          <button
            className="md:hidden p-2 text-primary-foreground/80 hover:text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2 px-3">
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
                      <Button variant="ghost" className="w-full text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">Admin</Button>
                    </Link>
                  )}
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