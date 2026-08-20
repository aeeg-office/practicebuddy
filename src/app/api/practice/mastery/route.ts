import { NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { getJwtSecret } from "@/lib/auth-server"
import { recalculateUserMastery, recalculateSkillMastery } from "@/lib/mastery-engine"

/**
 * GET /api/practice/mastery
 * Returns the current student's mastery for all skills they've practiced.
 */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const payload = jwt.verify(authHeader.split(" ")[1], getJwtSecret()) as { userId: string }
    const url = new URL(request.url)
    const skillId = url.searchParams.get("skillId")

    if (skillId) {
      const result = await recalculateSkillMastery(payload.userId, skillId)
      return NextResponse.json({ mastery: result })
    }

    // Return all mastery
    const mastery = await prisma.userSkillMastery.findMany({
      where: { userId: payload.userId },
      include: { skill: { select: { name: true, code: true, domain: true } } },
      orderBy: { lastAttemptAt: "desc" },
    })

    return NextResponse.json({ mastery, total: mastery.length })
  } catch (error) {
    console.error("Mastery API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * POST /api/practice/mastery
 * Triggers recalculation of mastery for the authenticated user.
 * Optionally scoped to a specific skill via { skillId } body param.
 */
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const payload = jwt.verify(authHeader.split(" ")[1], getJwtSecret()) as { userId: string }
    const body = await request.json().catch(() => ({})) as { skillId?: string }

    let result
    if (body.skillId) {
      result = await recalculateSkillMastery(payload.userId, body.skillId)
    } else {
      result = await recalculateUserMastery(payload.userId)
    }

    return NextResponse.json({ recalculated: true, skills: Array.isArray(result) ? result.length : 1 })
  } catch (error) {
    console.error("Mastery recalc error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
