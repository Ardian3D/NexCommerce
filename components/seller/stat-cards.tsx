'use client'

import {
  ShieldCheck,
  Award,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Info,
} from 'lucide-react'

type Stat = {
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
  label: string
  value: React.ReactNode
  sub: React.ReactNode
}

const stats: Stat[] = [
  {
    icon: ShieldCheck,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    label: 'Trust Score',
    value: (
      <>
        60 <span className="text-base font-medium text-muted-foreground">/ 100</span>
      </>
    ),
    sub: (
      <span className="flex items-center gap-1 text-emerald-600">
        <TrendingUp className="h-3.5 w-3.5" /> 5 this week
      </span>
    ),
  },
  {
    icon: Award,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    label: 'Current Tier',
    value: 'Starter',
    sub: (
      <span className="flex items-center gap-1 text-muted-foreground">
        Next: Ascent (80) <Info className="h-3.5 w-3.5" />
      </span>
    ),
  },
  {
    icon: Package,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    label: 'Total Products',
    value: '0',
    sub: '0 active listings',
  },
  {
    icon: ShoppingBag,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    label: 'Total Orders',
    value: '0',
    sub: '0 pending',
  },
  {
    icon: DollarSign,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    label: 'Total Revenue',
    value: '$0.00',
    sub: '0% from last 7 days',
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <div className="flex items-center gap-2">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.iconBg}`}
            >
              <s.icon className={`h-5 w-5 ${s.iconColor}`} />
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {s.label}
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-foreground">{s.value}</p>
          <div className="mt-1 text-xs font-medium">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}
