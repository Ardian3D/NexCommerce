'use client'

import {
  UserPlus,
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
} from 'lucide-react'

/* ---------------- Recent Activity ---------------- */

const activity = [
  { icon: UserPlus, tone: 'bg-violet-100 text-violet-600', title: 'New user registered', desc: '0x8a7f...3d2e', time: '2m ago' },
  { icon: Package, tone: 'bg-blue-100 text-blue-600', title: 'Product added', desc: 'Logitech G Pro X Superlight 2', time: '5m ago' },
  { icon: CheckCircle2, tone: 'bg-emerald-100 text-emerald-600', title: 'Order completed', desc: 'Order #NC-2025-05-24-8921', time: '12m ago' },
  { icon: ShieldCheck, tone: 'bg-amber-100 text-amber-600', title: 'KYC verification submitted', desc: 'User: 0x7b8e...9f1a', time: '15m ago' },
  { icon: Star, tone: 'bg-rose-100 text-rose-600', title: 'New review received', desc: 'Product: Apple AirPods Pro 2', time: '22m ago' },
]

export function AdminRecentActivity() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View All</button>
      </div>
      <ul className="space-y-3">
        {activity.map((a, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${a.tone}`}>
              <a.icon className="h-3.5 w-3.5" />
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
        ))}
      </ul>
    </div>
  )
}

/* ---------------- Verification Queue ---------------- */

const queue = [
  { user: '0x8a7f...3d2e', email: 'john.doe@email.com', type: 'KYC Verification', date: 'May 24, 2025', time: '10:42 AM', dot: 'from-violet-500 to-purple-600' },
  { user: '0x7b8e...9f1a', email: 'sarah.wilson@email.com', type: 'KYC Verification', date: 'May 24, 2025', time: '09:15 AM', dot: 'from-rose-500 to-orange-500' },
  { user: '0x3c2d...1a4b', email: 'mike@example.com', type: 'Business Verification', date: 'May 24, 2025', time: '08:33 AM', dot: 'from-emerald-500 to-teal-600' },
  { user: '0x6d5e...7f8a', email: 'aim.labs@store.com', type: 'Business Verification', date: 'May 23, 2025', time: '11:20 PM', dot: 'from-blue-500 to-cyan-500' },
  { user: '0x9f8e...2b3c', email: 'alex@example.com', type: 'KYC Verification', date: 'May 23, 2025', time: '09:05 PM', dot: 'from-fuchsia-500 to-violet-600' },
]

export function AdminVerificationQueue() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-lg font-bold text-foreground">Verification Queue</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View All (12)</button>
      </div>

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
            {queue.map((q) => (
              <tr key={q.user} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-7 w-7 shrink-0 rounded-full bg-gradient-to-br ${q.dot}`} />
                    <div className="min-w-0 leading-tight">
                      <p className="text-xs font-semibold text-foreground">{q.user}</p>
                      <p className="truncate text-xs text-muted-foreground">{q.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 pr-2 text-xs text-foreground">{q.type}</td>
                <td className="py-2.5 pr-2 text-xs text-muted-foreground">
                  <p className="text-foreground">{q.date}</p>
                  <p className="text-xs">{q.time}</p>
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
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-600 transition-colors hover:bg-emerald-200"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button
                      aria-label="Reject"
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-100 text-rose-600 transition-colors hover:bg-rose-200"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------------- Recent Orders ---------------- */

const orders = [
  { id: '#NC-2025-05-24-8921', buyer: '0x8a7f...3d2e', amount: '155.73 USDC', status: 'Paid', tone: 'bg-emerald-100 text-emerald-700' },
  { id: '#NC-2025-05-24-8812', buyer: '0x7b8e...9f1a', amount: '189.99 USDC', status: 'Shipped', tone: 'bg-blue-100 text-blue-700' },
  { id: '#NC-2025-05-23-7754', buyer: '0x3c2d...1a4b', amount: '89.99 USDC', status: 'Delivered', tone: 'bg-violet-100 text-violet-700' },
  { id: '#NC-2025-05-23-6621', buyer: '0x6d5e...7f8a', amount: '229.99 USDC', status: 'Completed', tone: 'bg-emerald-100 text-emerald-700' },
  { id: '#NC-2025-05-22-5532', buyer: '0x9f8e...2b3c', amount: '449.99 USDC', status: 'Cancelled', tone: 'bg-rose-100 text-rose-700' },
]

export function AdminRecentOrders() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-lg font-bold text-foreground">Recent Orders</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View All</button>
      </div>

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
                <td className="py-2.5 pr-2 text-xs text-muted-foreground">{o.buyer}</td>
                <td className="py-2.5 pr-2 text-xs text-foreground">{o.amount}</td>
                <td className="py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${o.tone}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------------- System Health ---------------- */

const health = [
  { label: 'Blockchain (Solana)', icon: Boxes },
  { label: 'Database', icon: Database },
  { label: 'API Services', icon: Server },
  { label: 'Storage', icon: HardDrive },
  { label: 'Real-time Indexer', icon: Activity },
]

export function AdminSystemHealth() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-lg font-bold text-foreground">System Health</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View All</button>
      </div>
      <ul className="space-y-2.5">
        {health.map((h) => (
          <li key={h.label} className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
              <h.icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-medium text-foreground">{h.label}</span>
            <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-emerald-600">
              Healthy
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
