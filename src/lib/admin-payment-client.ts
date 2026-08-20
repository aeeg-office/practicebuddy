export type AdminPaymentApi = {
  id: string
  provider: string
  providerReference: string | null
  amount: string | number
  currency: string
  status: "pending" | "paid" | "failed" | "refunded"
  paidAt: string | null
  createdAt: string
  user: { id: string; name: string | null; email: string }
  subscriptionPlan: { id: string; name: string } | null
}

export type PaymentListItem = {
  id: string
  reference: string
  studentName: string
  studentEmail: string
  planName: string
  provider: string
  amount: number
  currency: string
  status: AdminPaymentApi["status"]
  occurredAt: string
}

export function toPaymentListItem(payment: AdminPaymentApi): PaymentListItem {
  const amount = Number(payment.amount)
  return {
    id: payment.id,
    reference: payment.providerReference || payment.id,
    studentName: payment.user.name?.trim() || "Unnamed student",
    studentEmail: payment.user.email,
    planName: payment.subscriptionPlan?.name || "No subscription plan",
    provider: payment.provider,
    amount: Number.isFinite(amount) ? amount : 0,
    currency: payment.currency,
    status: payment.status,
    occurredAt: payment.paidAt || payment.createdAt,
  }
}
