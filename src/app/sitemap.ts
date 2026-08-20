import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aeeg.com"

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/sat-prep", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/act-prep", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/ielts-prep", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/toefl-prep", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/subjects", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/take-diagnostic", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mock-exams", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/practice", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/compare", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/faqs", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.5, changeFrequency: "weekly" as const },
    { path: "/writing", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/listening", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/speaking", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  ]

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}