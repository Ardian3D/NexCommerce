'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChevronDown } from 'lucide-react'
import type { ChartPoint } from '@/lib/actions/seller-dashboard'

type Props = {
  data?: ChartPoint[]
}

export function OverviewChart({ data = [] }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          Overview{' '}
          <span className="text-sm font-normal text-muted-foreground">(Last 7 days)</span>
        </h3>
        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
          Last 7 days
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs font-medium">
        <span className="flex items-center gap-1.5 text-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Revenue ($)
        </span>
        <span className="flex items-center gap-1.5 text-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-500" /> Orders
        </span>
      </div>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis yAxisId="right" orientation="right" hide />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }}
              formatter={(value, name) =>
                name === 'revenue' ? [`$${value}`, 'Revenue'] : [value, 'Orders']
              }
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#revGrad)"
              dot={{ r: 3, fill: '#3b82f6' }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#ordGrad)"
              dot={{ r: 3, fill: '#8b5cf6' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
