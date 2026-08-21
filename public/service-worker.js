// Practice Buddy — Service Worker
// Caches static assets for offline-capable PWA experience
// Server-side truth remains authoritative; this is a progressive enhancement

const CACHE_NAME = "practice-buddy-v1"
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/offline",
]

// Install: cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE)
    })
  )
  self.skipWaiting()
})

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    })
  )
  self.clients.claim()
})

// Fetch: network-first with cache fallback for navigation
// API calls and authenticated content always go to network
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)

  // API calls — never cache, always network
  if (url.pathname.startsWith("/api/")) {
    return
  }

  // Static assets — cache-first
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$/)) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    )
    return
  }

  // Navigation — network-first, fallback to cache, then offline page
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          return response
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            return cached || caches.match("/offline")
          })
        })
    )
    return
  }
})