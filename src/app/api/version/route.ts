import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import { join } from "path"

export const dynamic = "force-dynamic"

function getVersionInfo() {
  // Try to read version.json from public directory
  try {
    const v = JSON.parse(readFileSync(join(process.cwd(), "public", "version.json"), "utf-8"))
    return v
  } catch {
    return {
      commit: process.env.BUILD_COMMIT || "unknown",
      builtAt: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
      buildId: process.env.BUILD_ID || "local",
    }
  }
}

export async function GET() {
  const v = getVersionInfo()
  return NextResponse.json(
    {
      app: "Lumaani",
      version: "1.0.0",
      commit: v.commit,
      builtAt: v.builtAt,
      buildId: v.buildId,
      environment: process.env.NODE_ENV || "development",
      apiVersion: "1",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  )
}
