import { NextResponse } from "next/server"
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { getJwtSecret } from "@/lib/auth-server"


export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    // Use default tenant for all registrations (stand-alone platform)
    const tenantSlug = 'default'
    let tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } })
    if (!tenant) {
      tenant = await prisma.tenant.create({ data: { name: 'Default', slug: tenantSlug } })
    }

    // Check for existing user in this tenant
    const existing = await prisma.user.findFirst({ where: { email, tenantId: tenant.id } })
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const user = await prisma.user.create({
      data: {
        tenantId: tenant.id,
        name: name || null,
        email,
        passwordHash,
        role: "student",
      },
    })

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      getJwtSecret(),
      { expiresIn: "7d" }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}