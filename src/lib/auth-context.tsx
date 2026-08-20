'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string | null
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem("pb-token")
    const savedUser = localStorage.getItem("pb-user")
    if (saved && savedUser) {
      setToken(saved)
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) return { success: false, error: data.error || "Login failed" }

      localStorage.setItem("pb-token", data.token)
      localStorage.setItem("pb-user", JSON.stringify(data.user))
      setToken(data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: "Network error" }
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) return { success: false, error: data.error || "Registration failed" }

      localStorage.setItem("pb-token", data.token)
      localStorage.setItem("pb-user", JSON.stringify(data.user))
      setToken(data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: "Network error" }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("pb-token")
    localStorage.removeItem("pb-user")
    setToken(null)
    setUser(null)
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {})
    router.push("/")
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

/**
 * Returns the role-appropriate home/dashboard path after login.
 * - Student → /practice
 * - Teacher → /teacher
 * - School admin → /admin
 * - Administrator → /admin
 * - Fallback → /dashboard
 */
export function getRoleHomePath(role: string): string {
  switch (role) {
    case "student":
      return "/practice"
    case "teacher":
      return "/teacher"
    case "school_admin":
      return "/admin"
    case "admin":
      return "/admin"
    default:
      return "/dashboard"
  }
}