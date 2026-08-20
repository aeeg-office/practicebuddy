'use client'

import { type ReactNode, useEffect, useMemo, useState } from "react"
import { AlertTriangle, CheckCircle2, Clock, CreditCard, DollarSign, Search, XCircle } from "lucide-react"

import { fetchAdminCollection } from "@/lib/admin-client"
import { toPaymentListItem, type AdminPaymentApi, type PaymentListItem } from "@/lib/admin-payment-client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout, colors } from "../_components/admin-layout"

type PaymentPage = { items: AdminPaymentApi[]; total: number; totalPages: number }
type PaymentStatus = PaymentListItem["status"]

const statusVariant: Record<PaymentStatus, "success" | "accent" | "destructive" | "secondary"> = {
  paid: "success", pending: "accent", failed: "destructive", refunded: "secondary",
}

function formatCurrency(amount: number, currency: string) {
  try { return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount) }
  catch { return `${amount.toFixed(2)} ${currency}` }
}

function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.valueOf()) ? "Not recorded" : new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(date)
}

export default function PaymentsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"all" | PaymentStatus>("all")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<PaymentPage>({ items: [], total: 0, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const payments = useMemo(() => data.items.map(toPaymentListItem), [data.items])
  const totals = useMemo(() => ({
    paid: payments.filter((payment) => payment.status === "paid"),
    pending: payments.filter((payment) => payment.status === "pending").length,
    failed: payments.filter((payment) => payment.status === "failed").length,
  }), [payments])
  const paidRevenue = useMemo(() => totals.paid.reduce((sum, payment) => sum + payment.amount, 0), [totals.paid])

  async function loadPayments() {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchAdminCollection<AdminPaymentApi>("payments", "payments", { search, status: status === "all" ? undefined : status, page, limit: 25 })
      setData(result)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load payments")
    } finally { setLoading(false) }
  }

  useEffect(() => {
    let live = true
    const timer = window.setTimeout(async () => { if (live) await loadPayments() }, search ? 250 : 0)
    return () => { live = false; window.clearTimeout(timer) }
  // loadPayments intentionally reads the current filter state.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, page])

  async function updateStatus(id: string, nextStatus: PaymentStatus) {
    setUpdatingId(id)
    setError(null)
    try {
      const response = await fetch("/api/admin/payments", { method: "PATCH", credentials: "same-origin", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ id, status: nextStatus }) })
      const payload = await response.json() as { error?: string }
      if (!response.ok) throw new Error(payload.error || "Unable to update payment status")
      await loadPayments()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to update payment status")
    } finally { setUpdatingId(null) }
  }

  return <AdminLayout activeSidebar="Payments" pageTitle="Payments" pageDescription="Live payment records and administrator-reviewed payment states">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric icon={<DollarSign className="h-5 w-5" />} label="Paid revenue on this page" value={formatCurrency(paidRevenue, payments[0]?.currency || "USD")} />
      <Metric icon={<CreditCard className="h-5 w-5" />} label="Payment records" value={data.total.toLocaleString()} />
      <Metric icon={<Clock className="h-5 w-5 text-amber-600" />} label="Pending on this page" value={totals.pending.toLocaleString()} />
      <Metric icon={<AlertTriangle className="h-5 w-5 text-red-600" />} label="Failed on this page" value={totals.failed.toLocaleString()} />
    </div>

    {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

    <Card style={{ borderColor: colors.border }}>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 pb-4">
        <div><CardTitle className="text-lg" style={{ color: colors.secondary }}>Payment ledger</CardTitle><CardDescription>Amounts and statuses are sourced from the protected payment ledger.</CardDescription></div>
        <div className="flex flex-wrap gap-2"><label className="relative block"><span className="sr-only">Search payments</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: colors.mutedForeground }} /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Reference, provider, or email" className="h-9 w-64 rounded-lg border bg-muted/30 pl-9 pr-3 text-sm" style={{ borderColor: colors.border }} /></label><select aria-label="Payment status" value={status} onChange={(event) => { setStatus(event.target.value as typeof status); setPage(1) }} className="h-9 rounded-lg border bg-background px-3 text-sm" style={{ borderColor: colors.border }}><option value="all">All statuses</option><option value="paid">Paid</option><option value="pending">Pending</option><option value="failed">Failed</option><option value="refunded">Refunded</option></select><Button variant="outline" size="sm" disabled={loading} onClick={loadPayments}>Refresh</Button></div>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? <p className="p-8 text-sm text-muted-foreground">Loading live payment records…</p> : payments.length === 0 ? <p className="p-8 text-sm text-muted-foreground">{search || status !== "all" ? "No payments match these filters." : "No payment records have been created yet."}</p> : <div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b bg-muted/20 text-left text-[11px] uppercase tracking-wider text-muted-foreground" style={{ borderColor: colors.border }}><th className="px-6 py-3">Payment</th><th className="hidden px-6 py-3 sm:table-cell">Student</th><th className="hidden px-6 py-3 md:table-cell">Plan / provider</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Status</th><th className="hidden px-6 py-3 lg:table-cell">Recorded</th></tr></thead><tbody className="divide-y" style={{ borderColor: colors.border }}>{payments.map((payment) => <tr key={payment.id} className="hover:bg-muted/10"><td className="px-6 py-3.5"><p className="text-sm font-medium" style={{ color: colors.secondary }}>{payment.reference}</p><p className="text-[10px] text-muted-foreground">{payment.id}</p></td><td className="hidden px-6 py-3.5 sm:table-cell"><p className="text-sm">{payment.studentName}</p><p className="text-xs text-muted-foreground">{payment.studentEmail}</p></td><td className="hidden px-6 py-3.5 md:table-cell"><p className="text-sm">{payment.planName}</p><p className="text-xs capitalize text-muted-foreground">{payment.provider}</p></td><td className="px-6 py-3.5 text-sm font-medium">{formatCurrency(payment.amount, payment.currency)}</td><td className="px-6 py-3.5"><select aria-label={`Status for ${payment.reference}`} value={payment.status} disabled={updatingId === payment.id} onChange={(event) => void updateStatus(payment.id, event.target.value as PaymentStatus)} className="h-7 rounded-md border bg-background px-2 text-xs capitalize" style={{ borderColor: colors.border }}><option value="paid">Paid</option><option value="pending">Pending</option><option value="failed">Failed</option><option value="refunded">Refunded</option></select><Badge variant={statusVariant[payment.status]} className="ml-2 text-[10px] capitalize">{updatingId === payment.id ? "Updating…" : payment.status}</Badge></td><td className="hidden px-6 py-3.5 text-xs text-muted-foreground lg:table-cell">{formatDate(payment.occurredAt)}</td></tr>)}</tbody></table></div>}
        <div className="flex items-center justify-between border-t px-6 py-3" style={{ borderColor: colors.border }}><span className="text-xs text-muted-foreground">Page {page} of {data.totalPages}</span><div className="flex gap-2"><Button variant="outline" size="sm" disabled={loading || page <= 1} onClick={() => setPage((current) => current - 1)}>Previous</Button><Button variant="outline" size="sm" disabled={loading || page >= data.totalPages} onClick={() => setPage((current) => current + 1)}>Next</Button></div></div>
      </CardContent>
    </Card>
    <p className="text-xs text-muted-foreground">Payment status changes are restricted to authorized administrators and are audit logged. Create/import payment records through the approved provider reconciliation process.</p>
  </AdminLayout>
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <Card style={{ borderColor: colors.border }}><CardContent className="flex items-center gap-3 p-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/30" style={{ color: colors.primary }}>{icon}</div><div><p className="text-xs text-muted-foreground">{label}</p><p className="text-xl font-bold" style={{ color: colors.secondary }}>{value}</p></div></CardContent></Card>
}
