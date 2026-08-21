'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login")
    } else {
      setChecked(true)
    }
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading || !checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f6f6]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[rgb(26,35,126)]" />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
