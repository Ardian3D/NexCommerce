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

const lineData = [
  { day: 'May 18', users: 900, orders: 480, revenue: 180 },
  { day: 'May 19', users: 1050, orders: 560, revenue: 230 },
  { day: 'May 20', users: 1000, orders: 640, revenue: 320 },
  { day: 'May 21', users: 1380, orders: 1020, revenue: 400 },
  { day: 'May 22', users: 1450, orders: 1080, revenue: 470 },
  { day: 'May 23', users: 1420, orders: 1180, revenue: 540 },
  { day: 'May 24', users: 1850, orders: 1300, revenue: 640 },
]

const lineConfig = {
  users: { label: 'Users', color: '#7c3aed' },
  orders: { label: 'Orders', color: '#10b981' },
  revenue: { label: 'Revenue (USDC)', color: '#f59e0b' },
} satisfies ChartConfig

export function AdminOverviewChart() {
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
        <LineChart data={lineData} margin={{ top: 5, right: 12, left: -12, bottom: 0 }}>
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

const donutData = [
  { name: 'Completed', value: 2245, pct: '63.4%', color: '#22c55e' },
  { name: 'Pending', value: 742, pct: '20.9%', color: '#f59e0b' },
  { name: 'Shipped', value: 348, pct: '9.8%', color: '#3b82f6' },
  { name: 'Cancelled', value: 207, pct: '5.9%', color: '#ef4444' },
]

const donutConfig = {
  Completed: { label: 'Completed', color: '#22c55e' },
  Pending: { label: 'Pending', color: '#f59e0b' },
  Shipped: { label: 'Shipped', color: '#3b82f6' },
  Cancelled: { label: 'Cancelled', color: '#ef4444' },
} satisfies ChartConfig

export function AdminPlatformOverview() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
      <h3 className="text-lg font-bold text-foreground">Platform Overview</h3>

      <div className="mt-2 flex flex-1 flex-col items-center justify-center gap-4">
        <div className="relative h-40 w-40 shrink-0">
          <ChartContainer config={donutConfig} className="h-40 w-40">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
                stroke="none"
              >
                {donutData.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total Orders</span>
            <span className="text-2xl font-bold text-foreground">3,542</span>
          </div>
        </div>

        <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-3">
          {donutData.map((d) => (
            <li key={d.name} className="flex min-w-0 flex-col gap-0.5">
              <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-foreground">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="truncate">{d.name}</span>
              </span>
              <span className="pl-4 text-xs text-muted-foreground">
                {d.value.toLocaleString()} ({d.pct})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
