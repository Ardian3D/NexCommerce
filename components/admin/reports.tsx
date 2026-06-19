'use client'

import { Flag, Users, Package, CheckCircle2, Clock, ArrowUp, ArrowDown } from 'lucide-react'

const summary = [
  { label: 'Total Reports', value: '48', note: '12 this week', trend: 'up', icon: Flag, tone: 'bg-violet-100 text-violet-600' },
  { label: 'User Reports', value: '21', note: '6 this week', trend: 'up', icon: Users, tone: 'bg-blue-100 text-blue-600' },
  { label: 'Product Reports', value: '19', note: '4 this week', trend: 'up', icon: Package, tone: 'bg-amber-100 text-amber-600' },
  { label: 'Resolved Reports', value: '35', note: '9 this week', trend: 'up', icon: CheckCircle2, tone: 'bg-emerald-100 text-emerald-600' },
  { label: 'Pending Reports', value: '13', note: '3 this week', trend: 'down', icon: Clock, tone: 'bg-rose-100 text-rose-600' },
]

export function AdminReportsSummary() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-lg font-bold text-foreground">Reports Summary</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {summary.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-background p-4">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs font-medium text-muted-foreground">{s.label}</p>
            <p className="mt-0.5 text-2xl font-bold text-foreground">{s.value}</p>
            <p
              className={`mt-1 flex items-center gap-1 text-xs font-medium ${
                s.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {s.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {s.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const reasons = [
  { label: 'Spam / Scams', count: 18, pct: 37.5 },
  { label: 'Inappropriate Content', count: 12, pct: 25.0 },
  { label: 'Fake Product', count: 9, pct: 18.8 },
  { label: 'Other', count: 9, pct: 18.8 },
]

export function AdminTopReportReasons() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Top Report Reasons</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View All</button>
      </div>
      <ul className="mt-4 space-y-4">
        {reasons.map((r) => (
          <li key={r.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{r.label}</span>
              <span className="text-muted-foreground">
                {r.count} ({r.pct}%)
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
