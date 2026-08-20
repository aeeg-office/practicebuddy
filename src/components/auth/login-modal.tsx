'use client'

import { useState, useEffect, useCallback, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useAuth, getRoleHomePath } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, LogIn, UserPlus, Eye, EyeOff, Loader2 } from "lucide-react"

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

type AuthTab = "login" | "register"

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { login, register, user } = useAuth()
  const router = useRouter()

  const [tab, setTab] = useState<AuthTab>("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Reset form state when modal opens/closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setName("")
        setEmail("")
        setPassword("")
        setError(null)
        setLoading(false)
        setShowPassword(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  const switchTab = useCallback((newTab: AuthTab) => {
    setTab(newTab)
    setError(null)
    setLoading(false)
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setError(null)

      if (tab === "register" && !name.trim()) {
        setError("Please enter your full name.")
        return
      }
      if (!email.trim()) {
        setError("Please enter your email address.")
        return
      }
      if (!password) {
        setError("Please enter your password.")
        return
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.")
        return
      }

      setLoading(true)

      let result: { success: boolean; error?: string }
      if (tab === "login") {
        result = await login(email, password)
      } else {
        result = await register(name, email, password)
      }

      setLoading(false)

      if (!result.success) {
        setError(result.error || "Something went wrong. Please try again.")
      } else {
        onClose()
        router.push(getRoleHomePath(user?.role || "student"))
      }
    },
    [tab, name, email, password, login, register, onClose, router, user],
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-card rounded-2xl shadow-2xl border border-border animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-8 pb-2 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            {tab === "login" ? (
              <LogIn className="h-7 w-7 text-primary" />
            ) : (
              <UserPlus className="h-7 w-7 text-primary" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {tab === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {tab === "login"
              ? "Sign in to continue to your dashboard"
              : "Join AEEG and start your learning journey"}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="px-6 mt-4">
          <div className="flex bg-muted/60 rounded-lg p-1">
            <button
              onClick={() => switchTab("login")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                tab === "login"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab("register")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                tab === "register"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pt-6 pb-8 space-y-4">
          {tab === "register" && (
            <div className="space-y-2">
              <Label htmlFor="modal-name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="modal-name"
                type="text"
                placeholder="Mariam Ahmed"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (error) setError(null)
                }}
                disabled={loading}
                autoComplete="name"
                className="h-11"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="modal-email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="modal-email"
              type="email"
              placeholder="mariam@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError(null)
              }}
              disabled={loading}
              autoComplete="email"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="modal-password"
                type={showPassword ? "text" : "password"}
                placeholder={tab === "login" ? "Enter your password" : "At least 6 characters"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError(null)
                }}
                disabled={loading}
                autoComplete={tab === "login" ? "current-password" : "new-password"}
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {error}
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full h-11 text-sm font-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {tab === "login" ? "Signing in..." : "Creating account..."}
              </>
            ) : tab === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}