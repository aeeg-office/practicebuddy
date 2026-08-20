import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { getJwtSecret } from "@/lib/auth-server";

/**
 * POST /api/auth/redeem-code
 * Redeem an access code for the authenticated user.
 * Body: { code: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Get userId from auth token
    const auth = request.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    let payload: { userId: string };
    try {
      payload = jwt.verify(auth.slice(7), getJwtSecret()) as { userId: string };
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { code } = body as { code: string };

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // 1️⃣ Find the access code
    const accessCode = await prisma.accessCode.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (!accessCode) {
      return NextResponse.json({ error: "Invalid access code" }, { status: 404 });
    }

    // 2️⃣ Validate the code
    if (!accessCode.isActive) {
      return NextResponse.json({ error: "This access code has been deactivated" }, { status: 410 });
    }

    if (accessCode.expiresAt && accessCode.expiresAt < new Date()) {
      return NextResponse.json({ error: "This access code has expired" }, { status: 410 });
    }

    if (accessCode.maxUses > 0 && accessCode.useCount >= accessCode.maxUses) {
      return NextResponse.json({ error: "This access code has reached its maximum uses" }, { status: 410 });
    }

    // 3️⃣ Check if user already redeemed this code
    const existingRedemption = await prisma.accessCodeRedemption.findUnique({
      where: { accessCodeId_userId: { accessCodeId: accessCode.id, userId: payload.userId } },
    });

    if (existingRedemption) {
      return NextResponse.json({ error: "You have already redeemed this access code" }, { status: 409 });
    }

    // 4️⃣ Redeem the code
    const [redemption] = await Promise.all([
      prisma.accessCodeRedemption.create({ data: { accessCodeId: accessCode.id, userId: payload.userId } }),
      prisma.accessCode.update({ where: { id: accessCode.id }, data: { useCount: { increment: 1 } } }),
    ]);

    // 5️⃣ Set the user's role based on the code's role
    await prisma.user.update({ where: { id: payload.userId }, data: { role: accessCode.role } });

    return NextResponse.json({ success: true, role: accessCode.role, redemption }, { status: 200 });
  } catch (error) {
    console.error("Error redeeming access code:", error);
    return NextResponse.json({ error: "Failed to redeem access code" }, { status: 500 });
  }
}