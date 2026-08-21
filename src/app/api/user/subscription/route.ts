import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { getJwtSecret } from "@/lib/auth-server";

/**
 * GET /api/user/subscription?userId=xxx
 * Get the current subscription details for a user.
 * Requires authentication. Users can only view their own subscription.
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
      return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 });
    }

    // Enforce access control: users can only see their own subscription.
    const isAdmin = payload.role === "admin" || payload.role === "school_admin";
    if (payload.userId !== userId && !isAdmin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Find the most recent active subscription for this user
    const subscription = await prisma.userSubscription.findFirst({
      where: { userId, status: "active" },
      include: { plan: true },
      orderBy: { currentPeriodStart: "desc" },
    });

    if (!subscription) {
      const freePlan = await prisma.subscriptionPlan.findUnique({ where: { name: "Free" } });
      return NextResponse.json({
        subscription: null,
        activePlan: freePlan ? { name: freePlan.name, price: Number(freePlan.price), features: freePlan.features } : null,
      });
    }

    const isExpired = subscription.currentPeriodEnd && subscription.currentPeriodEnd < new Date();

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        startDate: subscription.currentPeriodStart,
        endDate: subscription.currentPeriodEnd,
        status: subscription.status,
        isExpired,
      },
      activePlan: {
        name: subscription.plan.name,
        price: Number(subscription.plan.price),
        currency: subscription.plan.currency,
        interval: subscription.plan.interval,
        features: subscription.plan.features,
      },
    });
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 });
  }
}

/**
 * POST /api/user/subscription
 * Create or change a user's subscription plan.
 * Body: { userId, planName }
 * Requires authentication. Users can only change their own subscription.
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { userId, planName } = body as { userId: string; planName: string };

    if (!userId || !planName) {
      return NextResponse.json({ error: "userId and planName are required" }, { status: 400 });
    }

    // Enforce access control: users can only change their own subscription.
    const isAdmin = payload.role === "admin" || payload.role === "school_admin";
    if (payload.userId !== userId && !isAdmin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const plan = await prisma.subscriptionPlan.findUnique({ where: { name: planName } });
    if (!plan) {
      return NextResponse.json({ error: `Plan "${planName}" not found` }, { status: 404 });
    }
    if (!plan.isActive) {
      return NextResponse.json({ error: "This plan is not currently available" }, { status: 410 });
    }

    // Get user's tenant
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { tenantId: true } });
    if (!user?.tenantId) return NextResponse.json({ error: "User has no tenant" }, { status: 403 });

    // Upsert by userId_planId compound unique
    const existing = await prisma.userSubscription.findFirst({
      where: { userId, planId: plan.id },
    });

    const subscription = existing
      ? await prisma.userSubscription.update({
          where: { id: existing.id },
          data: { status: "active", currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
          include: { plan: true },
        })
      : await prisma.userSubscription.create({
          data: {
            userId,
            planId: plan.id,
            status: "active",
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
          include: { plan: true },
        });

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        startDate: subscription.currentPeriodStart,
        endDate: subscription.currentPeriodEnd,
        status: subscription.status,
      },
      activePlan: {
        name: subscription.plan.name,
        price: Number(subscription.plan.price),
        features: subscription.plan.features,
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Error changing subscription:", error);
    return NextResponse.json({ error: "Failed to change subscription" }, { status: 500 });
  }
}