import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { getUserEntitlements } from "@/lib/entitlements";
import { getJwtSecret } from "@/lib/auth-server";

/**
 * GET /api/entitlements?userId=xxx
 * Get the full entitlement snapshot for a user.
 * Requires authentication. The requesting user can only view their own
 * entitlements; admins can view any user's entitlements.
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    let payload: { userId: string; role: string };
    try {
      payload = jwt.verify(authHeader.split(" ")[1], getJwtSecret()) as { userId: string; role: string };
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId query parameter is required" },
        { status: 400 }
      );
    }

    // Enforce access control: users can only see their own entitlements,
    // admins/school_admins can see any user's entitlements.
    const isAdmin = payload.role === "admin" || payload.role === "school_admin";
    if (payload.userId !== userId && !isAdmin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const entitlements = await getUserEntitlements(userId);

    return NextResponse.json({ entitlements });
  } catch (error) {
    console.error("Error fetching entitlements:", error);
    return NextResponse.json(
      { error: "Failed to fetch entitlements" },
      { status: 500 }
    );
  }
}