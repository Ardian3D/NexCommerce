'use client'

import { useState } from 'react'
import {
  UserPlus,
  Users,
  Package,
  CheckCircle2,
  ShieldCheck,
  Star,
  Check,
  X,
  Boxes,
  Database,
  Server,
  HardDrive,
  Activity,
  Loader2,
} from 'lucide-react'
import { approveUser, rejectUser, type PendingUser, type AdminOrderRow, type ActivityItem, type SystemHealth as SystemHealthType } from '@/lib/actions/admin'

/* ---------------- Recent Activity ---------------- */

const iconMap = {
  user: { icon: UserPlus, tone: 'bg-violet-100 text-violet-600' },
  package: { icon: Package, tone: 'bg-blue-100 text-blue-600' },
  order: { icon: CheckCircle2, tone: 'bg-emerald-100 text-emerald-600' },
  kyc: { icon: ShieldCheck, tone: 'bg-amber-100 text-amber-600' },
} as const

export function AdminRecentActivity({ items = [] }: { items?: ActivityItem[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View All</button>
      </div>
      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">No recent activity yet</p>
      ) : (
        <ul className="space-y-3">
          {items.map((a, i) => {
            const { icon: Icon, tone } = iconMap[a.icon] || iconMap.order
            return (
              <li key={i} className="flex items-start gap-2.5">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/* ---------------- Verification Queue ---------------- */

const dotColors = [
  'from-violet-500 to-purple-600',
  'from-rose-500 to-orange-500',
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-cyan-500',
  'from-fuchsia-500 to-violet-600',
]

function shortenWallet(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

function statusTone(status: string) {
  switch (status) {
    case 'Paid': return 'bg-emerald-100 text-emerald-700'
    case 'Shipped': return 'bg-blue-100 text-blue-700'
    case 'Delivered': return 'bg-violet-100 text-violet-700'
    case 'Completed': return 'bg-emerald-100 text-emerald-700'
    case 'Cancelled': return 'bg-rose-100 text-rose-700'
    default: return 'bg-amber-100 text-amber-700'
  }
}

export function AdminVerificationQueue({ queue = [] }: { queue?: PendingUser[] }) {
  const [items, setItems] = useState(queue)
  const [loading, setLoading] = useState<string | null>(null)

  async function handleApprove(id: string) {
    setLoading(id + '-approve')
    await approveUser(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    setLoading(null)
  }

  async function handleReject(id: string) {
    setLoading(id + '-reject')
    await rejectUser(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    setLoading(null)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-lg font-bold text-foreground">Verification Queue</h3>
        <a href="/admin/verification" className="text-xs font-semibold text-primary hover:underline">
          View All ({items.length})
        </a>
      </div>

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">No pending verifications</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                <th className="py-2 pr-2 font-medium">User</th>
                <th className="py-2 pr-2 font-medium">Type</th>
                <th className="py-2 pr-2 font-medium">Submitted</th>
                <th className="py-2 pr-2 font-medium">Status</th>
                <th className="py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((q, i) => {
                const isLoadingApprove = loading === q.id + '-approve'
                const isLoadingReject = loading === q.id + '-reject'
                return (
                  <tr key={q.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`h-7 w-7 shrink-0 rounded-full bg-gradient-to-br ${dotColors[i % dotColors.length]}`} />
                        <div className="min-w-0 leading-tight">
                          <p className="text-xs font-semibold text-foreground">
                            {shortenWallet(q.walletAddress)}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {q.email ?? q.fullName ?? '—'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 pr-2 text-xs text-foreground">
                      {q.role === 'seller' ? 'Business Verification' : 'KYC Verification'}
                    </td>
                    <td className="py-2.5 pr-2 text-xs text-muted-foreground">
                      <p className="text-foreground">
                        {new Date(q.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-xs">
                        {new Date(q.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    <td className="py-2.5 pr-2">
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        Pending
                      </span>
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1">
                        <button
                          aria-label="Approve"
                          onClick={() => handleApprove(q.id)}
                          disabled={!!loading}
                          className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-600 transition-colors hover:bg-emerald-200 disabled:opacity-50"
                        >
                          {isLoadingApprove ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          aria-label="Reject"
                          onClick={() => handleReject(q.id)}
                          disabled={!!loading}
                          className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-100 text-rose-600 transition-colors hover:bg-rose-200 disabled:opacity-50"
                        >
                          {isLoadingReject ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ---------------- Recent Orders ---------------- */

export function AdminRecentOrders({ orders = [] }: { orders?: AdminOrderRow[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-lg font-bold text-foreground">Recent Orders</h3>
        <a href="/admin/orders" className="text-xs font-semibold text-primary hover:underline">View All</a>
      </div>

      {orders.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">No orders yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                <th className="py-2 pr-2 font-medium">Order ID</th>
                <th className="py-2 pr-2 font-medium">Buyer</th>
                <th className="py-2 pr-2 font-medium">Amount</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5 pr-2 text-xs font-semibold text-foreground">{o.id}</td>
                  <td className="py-2.5 pr-2 text-xs text-muted-foreground">
                    {shortenWallet(o.buyerWallet)}
                  </td>
                  <td className="py-2.5 pr-2 text-xs text-foreground">
                    ${o.amount.toFixed(2)} USDC
                  </td>
                  <td className="py-2.5">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ---------------- System Health ---------------- */

export function AdminSystemHealth({ health }: { health?: SystemHealthType }) {
  const items = [
    { label: 'Total Users', value: health ? health.totalUsers.toLocaleString() : '—', icon: Users },
    { label: 'Total Products', value: health ? health.totalProducts.toLocaleString() : '—', icon: Package },
    { label: 'Total Orders', value: health ? health.totalOrders.toLocaleString() : '—', icon: CheckCircle2 },
    { label: 'Database', value: health?.dbStatus ?? 'Unknown', icon: Database },
    { label: 'Cache', value: 'Connected', icon: Activity },
  ]
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-lg font-bold text-foreground">System Health</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View All</button>
      </div>
      <ul className="space-y-2.5">
        {items.map((h) => (
          <li key={h.label} className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
              <h.icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-medium text-foreground">{h.label}</span>
            <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-emerald-600">
              {h.value}
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
