'use client'

import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { Users, Package, ClipboardList, DollarSign, ShieldCheck, TrendingUp } from 'lucide-react'

type Stat = {
  label: string
  value: string
  change: string
  icon: React.ComponentType<{ className?: string }>
  iconTone: string
  color: string
  data: { v: number }[]
}

function spark(values: number[]) {
  return values.map((v) => ({ v }))
}

const stats: Stat[] = [
  {
    label: 'Total Users',
    value: '12,846',
    change: '18.6% vs last week',
    icon: Users,
    iconTone: 'bg-violet-100 text-violet-600',
    color: '#8b5cf6',
    data: spark([10, 14, 11, 18, 15, 22, 26]),
  },
  {
    label: 'Total Products',
    value: '8,721',
    change: '14.3% vs last week',
    icon: Package,
    iconTone: 'bg-blue-100 text-blue-600',
    color: '#3b82f6',
    data: spark([8, 12, 10, 14, 13, 17, 19]),
  },
  {
    label: 'Total Orders',
    value: '3,542',
    change: '22.7% vs last week',
    icon: ClipboardList,
    iconTone: 'bg-emerald-100 text-emerald-600',
    color: '#10b981',
    data: spark([6, 9, 8, 13, 12, 16, 21]),
  },
  {
    label: 'Total Revenue',
    value: '$67,890.45',
    change: '31.5% vs last week',
    icon: DollarSign,
    iconTone: 'bg-amber-100 text-amber-600',
    color: '#f59e0b',
    data: spark([5, 8, 9, 11, 14, 18, 24]),
  },
  {
    label: 'Trust Score (Avg.)',
    value: '85 / 100',
    change: '6.2% vs last week',
    icon: ShieldCheck,
    iconTone: 'bg-violet-100 text-violet-600',
    color: '#8b5cf6',
    data: spark([70, 74, 76, 78, 80, 83, 85]),
  },
]

export function AdminStatCards({
  totalUsers,
  totalProducts,
  totalOrders,
  totalRevenue,
  avgTrustScore,
}: {
  totalUsers?: number
  totalProducts?: number
  totalOrders?: number
  totalRevenue?: number
  avgTrustScore?: number
}) {
  const live = [
    { ...stats[0], value: totalUsers !== undefined ? totalUsers.toLocaleString() : stats[0].value },
    { ...stats[1], value: totalProducts !== undefined ? totalProducts.toLocaleString() : stats[1].value },
    { ...stats[2], value: totalOrders !== undefined ? totalOrders.toLocaleString() : stats[2].value },
    { ...stats[3], value: totalRevenue !== undefined ? `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : stats[3].value },
    { ...stats[4], value: avgTrustScore !== undefined ? `${avgTrustScore} / 100` : stats[4].value },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      {live.map((s) => {
        const gradId = `spark-${s.label.replace(/[^a-z]/gi, '')}`
        return (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-2.5">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.iconTone}`}>
                <s.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium leading-tight text-muted-foreground">{s.label}</p>
                <p className="mt-0.5 text-lg font-bold leading-tight text-foreground">{s.value}</p>
              </div>
            </div>
            <p className="mt-2.5 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              {s.change}
            </p>
            <div className="mt-2 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={s.data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={s.color}
                    strokeWidth={2}
                    fill={`url(#${gradId})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      })}
    </div>
  )
}
