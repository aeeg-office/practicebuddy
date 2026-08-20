'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push("/login")
    } else {
      setChecked(true)
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[rgb(71,32,183)]" />
          <p className="text-sm text-muted-foreground">Checking session...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
