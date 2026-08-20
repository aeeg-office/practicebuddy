import { NextRequest, NextResponse } from "next/server";
import { getUserEntitlements } from "@/lib/entitlements";

/**
 * GET /api/entitlements?userId=xxx
 * Get the full entitlement snapshot for a user.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId query parameter is required" },
        { status: 400 }
      );
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