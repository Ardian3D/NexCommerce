'use client'

import { Users, Package, ClipboardList, DollarSign, ShieldCheck } from 'lucide-react'

type Props = {
  totalUsers?: number
  totalProducts?: number
  totalOrders?: number
  totalRevenue?: number
  avgTrustScore?: number
}

const cardConfig = [
  { label: 'Total Users', icon: Users, tone: 'bg-violet-100 text-violet-600' },
  { label: 'Total Products', icon: Package, tone: 'bg-blue-100 text-blue-600' },
  { label: 'Total Orders', icon: ClipboardList, tone: 'bg-emerald-100 text-emerald-600' },
  { label: 'Total Revenue', icon: DollarSign, tone: 'bg-amber-100 text-amber-600' },
  { label: 'Trust Score (Avg.)', icon: ShieldCheck, tone: 'bg-violet-100 text-violet-600' },
]

export function AdminStatCards({
  totalUsers,
  totalProducts,
  totalOrders,
  totalRevenue,
  avgTrustScore,
}: Props) {
  const values = [
    totalUsers?.toLocaleString() ?? '—',
    totalProducts?.toLocaleString() ?? '—',
    totalOrders?.toLocaleString() ?? '—',
    totalRevenue != null
      ? `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : '—',
    avgTrustScore != null ? `${avgTrustScore} / 100` : '—',
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      {cardConfig.map((c, i) => (
        <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.tone}`}>
              <c.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
              <p className="mt-0.5 text-2xl font-bold text-foreground">{values[i]}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
