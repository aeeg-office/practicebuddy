'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, getRoleHomePath } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const { login, register, user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (isAuthenticated && user) {
    router.push(getRoleHomePath(user.role))
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result =
      mode === "login"
        ? await login(email, password)
        : await register(name, email, password)

    if (result.success) {
      router.push(getRoleHomePath(user?.role || "student"))
    } else {
      setError(result.error || "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md rounded-lg border bg-surface p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-primary shrink-0 overflow-hidden">
            <img src="/lumaani-icon-192.svg" alt="Lumaani" className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to continue your practice"
              : "Register to get started"}
          </p>
        </div>

        {/* Mode tabs */}
        <div className="mb-6 grid grid-cols-2 rounded-lg bg-muted/30 p-1">
          <button
            onClick={() => { setMode("login"); setError("") }}
            className={`rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "login" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setMode("register"); setError("") }}
            className={`rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "register" ? "bg-surface shadow-sm text-primary" : "text-muted-foreground"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "register" ? "At least 6 characters" : "Your password"}
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="rounded-md bg-error-light px-3 py-2 text-sm text-error">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </>
            ) : mode === "login" ? (
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