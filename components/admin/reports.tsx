'use client'

import { Flag, Users, Package, CheckCircle2, Clock } from 'lucide-react'

const reportCards = [
  { label: 'Total Reports', value: '0', note: 'No reports yet', icon: Flag, tone: 'bg-violet-100 text-violet-600' },
  { label: 'User Reports', value: '0', note: 'No reports yet', icon: Users, tone: 'bg-blue-100 text-blue-600' },
  { label: 'Product Reports', value: '0', note: 'No reports yet', icon: Package, tone: 'bg-amber-100 text-amber-600' },
  { label: 'Resolved', value: '0', note: 'No reports yet', icon: CheckCircle2, tone: 'bg-emerald-100 text-emerald-600' },
  { label: 'Pending', value: '0', note: 'No reports yet', icon: Clock, tone: 'bg-rose-100 text-rose-600' },
]

export function AdminReportsSummary() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-lg font-bold text-foreground">Reports Summary</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {reportCards.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-background p-4">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs font-medium text-muted-foreground">{s.label}</p>
            <p className="mt-0.5 text-2xl font-bold text-foreground">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminTopReportReasons() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Top Report Reasons</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View All</button>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center py-12 text-center">
        <Flag className="h-10 w-10 text-muted-foreground/40" />
        <p className="mt-3 text-sm font-semibold text-foreground">No reports yet</p>
        <p className="mt-1 text-xs text-muted-foreground">Report data will appear here when users submit reports.</p>
      </div>
    </div>
  )
}
