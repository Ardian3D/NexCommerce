'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { ChevronDown } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartPoint, PlatformOverview } from '@/lib/actions/admin'

const lineConfig = {
  users: { label: 'Users', color: '#7c3aed' },
  orders: { label: 'Orders', color: '#10b981' },
  revenue: { label: 'Revenue (USDC)', color: '#f59e0b' },
} satisfies ChartConfig

export function AdminOverviewChart({ data = [] }: { data?: ChartPoint[] }) {
  const displayData = data.length > 0 ? data : [
    { day: 'No data', users: 0, orders: 0, revenue: 0 },
  ]

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Overview</h3>
        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
          7 Days
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium">
        {Object.entries(lineConfig).map(([key, c]) => (
          <span key={key} className="flex items-center gap-1.5 text-foreground">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
            {c.label}
          </span>
        ))}
      </div>

      <ChartContainer config={lineConfig} className="mt-4 h-[260px] w-full">
        <LineChart data={displayData} margin={{ top: 5, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickFormatter={(v) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {Object.entries(lineConfig).map(([key, c]) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={c.color}
              strokeWidth={2.5}
              dot={{ r: 3, fill: c.color, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
              connectNulls
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  )
}

export function AdminPlatformOverview({ overview }: { overview?: PlatformOverview }) {
  const categories = overview?.categories?.length ? overview.categories : [
    { name: 'No data', value: 0 },
  ]
  const CAT_COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  const maxCat = Math.max(...categories.map(c => c.value), 1)

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
      <h3 className="text-lg font-bold text-foreground">Platform Overview</h3>

      <div className="mt-4 space-y-4">
        {/* Product Categories */}
        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">Products by Category</p>
          {categories.map((c, i) => (
            <div key={c.name} className="mb-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{c.name}</span>
                <span className="font-semibold text-muted-foreground">{c.value}</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(c.value / maxCat) * 100}%`, backgroundColor: CAT_COLORS[i % CAT_COLORS.length] }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Roles */}
        {overview?.roles?.length ? (
          <div className="border-t border-border pt-4">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">Users by Role</p>
            <div className="flex gap-4">
              {overview.roles.map((r) => (
                <div key={r.name} className="flex-1 rounded-xl bg-secondary/60 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{r.value}</p>
                  <p className="text-xs capitalize text-muted-foreground">{r.name}s</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
