/**
 * Simple in-memory rate limiter for API routes.
 */

const store: Record<string, { count: number; resetAt: number }> = {}
let cleanupInterval: ReturnType<typeof setInterval> | null = null

function startCleanup(): void {
  if (cleanupInterval) return
  cleanupInterval = setInterval(() => {
    const now = Date.now()
    const keys = Object.keys(store)
    for (let i = 0; i < keys.length; i++) {
      if (store[keys[i]].resetAt <= now) {
        delete store[keys[i]]
      }
    }
  }, 60000)
}

startCleanup()

export function rateLimit(
  request: Request,
  maxRequests = 20,
  windowMs = 60000,
): { allowed: boolean; remaining: number; resetAt: number } {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"

  const now = Date.now()
  const key = `${ip}:${windowMs}`

  if (!store[key] || store[key].resetAt <= now) {
    store[key] = { count: 0, resetAt: now + windowMs }
  }

  store[key].count++
  return {
    allowed: store[key].count <= maxRequests,
    remaining: Math.max(0, maxRequests - store[key].count),
    resetAt: store[key].resetAt,
  }
}

export function rateLimitMiddleware(
  request: Request,
  maxRequests?: number | { maxRequests?: number; windowMs?: number },
  windowMs?: number,
): Response | null {
  if (typeof maxRequests === "object") {
    windowMs = maxRequests.windowMs ?? windowMs ?? 60000
    maxRequests = maxRequests.maxRequests ?? 20
  }
  const result = rateLimit(request, maxRequests, windowMs)
  if (!result.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((result.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      },
    )
  }
  return null
}