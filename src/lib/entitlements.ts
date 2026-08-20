import prisma from '@/lib/prisma'

export async function isFeatureEnabled(featureCode: string, userId?: string, planId?: string): Promise<boolean> {
  // 1) If a specific planId is provided, check plan features
  if (planId) {
    const plan = await prisma.subscriptionPlan.findUnique({ where: { id: planId } })
    if (plan?.features) {
      const features = JSON.parse(plan.features) as string[]
      if (features.includes(featureCode)) return true
    }
  }

  // 2) If userId is provided, look up their active subscription
  if (userId) {
    const subscription = await prisma.userSubscription.findFirst({
      where: { userId, status: "active" },
      include: { plan: true },
      orderBy: { currentPeriodStart: "desc" },
    })
    if (subscription?.plan.features) {
      const features = JSON.parse(subscription.plan.features) as string[]
      if (features.includes(featureCode)) return true
    }
  }

  // 3) Fall back to the global FeatureFlag default
  const flag = await prisma.featureFlag.findUnique({ where: { key: featureCode } })
  return flag?.isActive ?? false
}

export interface UserEntitlements {
  plan: { id: string; name: string; description: string | null; isActive: boolean } | null
  features: string[]
  activeCodes: { code: string; role: string; redeemedAt: Date }[]
}

export async function getUserEntitlements(userId: string): Promise<UserEntitlements> {
  const subscription = await prisma.userSubscription.findFirst({
    where: { userId, status: "active" },
    include: { plan: true },
    orderBy: { currentPeriodStart: "desc" },
  })

  const plan = subscription
    ? { id: subscription.plan.id, name: subscription.plan.name, description: subscription.plan.description, isActive: subscription.plan.isActive }
    : null

  const features = subscription?.plan.features ? (JSON.parse(subscription.plan.features) as string[]) : []

  const redemptions = await prisma.accessCodeRedemption.findMany({
    where: { userId },
    include: { accessCode: true },
    orderBy: { redeemedAt: 'desc' },
  })

  const activeCodes = redemptions.map((r) => ({
    code: r.accessCode.code,
    role: r.accessCode.role,
    redeemedAt: r.redeemedAt,
  }))

  return { plan, features, activeCodes }
}

export interface RedeemResult {
  success: boolean
  error?: string
  plan?: { id: string; name: string }
}

export async function redeemAccessCode(userId: string, code: string): Promise<RedeemResult> {
  const accessCode = await prisma.accessCode.findUnique({
    where: { code },
    include: { redemptions: true },
  })

  if (!accessCode) return { success: false, error: 'Access code not found' }
  if (!accessCode.isActive) return { success: false, error: 'Access code is no longer active' }
  if (accessCode.expiresAt && accessCode.expiresAt < new Date()) return { success: false, error: 'Access code has expired' }
  if (accessCode.maxUses > 0 && accessCode.useCount >= accessCode.maxUses) return { success: false, error: 'Access code has reached maximum uses' }

  const alreadyRedeemed = accessCode.redemptions.some((r) => r.userId === userId)
  if (alreadyRedeemed) return { success: false, error: 'You have already redeemed this access code' }

  const plan = await prisma.subscriptionPlan.findFirst({ where: { name: { contains: accessCode.role, mode: "insensitive" } } })

  await prisma.$transaction([
    prisma.accessCodeRedemption.create({ data: { accessCodeId: accessCode.id, userId } }),
    prisma.accessCode.update({ where: { id: accessCode.id }, data: { useCount: { increment: 1 } } }),
    ...(plan ? [
      prisma.userSubscription.upsert({
        where: { userId_planId: { userId, planId: plan.id } },
        create: { userId, planId: plan.id, status: "active", currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
        update: { status: "active", currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
      }),
    ] : []),
  ])

  return { success: true, plan: plan ? { id: plan.id, name: plan.name } : undefined }
}