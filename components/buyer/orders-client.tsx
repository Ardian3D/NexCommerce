'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ClipboardCheck,
  PackageCheck,
  Hourglass,
  XCircle,
  Wallet,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  statusStyles,
  type Order,
  type OrderSummary,
  type OrderStatus,
} from '@/lib/orders'

const TABS: Array<'All Orders' | OrderStatus> = [
  'All Orders',
  'Pending',
  'Paid',
  'Shipped',
  'Delivered',
  'Completed',
  'Cancelled',
]

const STATUS_FILTERS: Array<{ label: 'All Orders' | OrderStatus; dot: string }> = [
  { label: 'All Orders', dot: 'bg-primary' },
  { label: 'Pending', dot: 'bg-amber-500' },
  { label: 'Paid', dot: 'bg-emerald-500' },
  { label: 'Shipped', dot: 'bg-blue-500' },
  { label: 'Delivered', dot: 'bg-green-500' },
  { label: 'Completed', dot: 'bg-violet-500' },
  { label: 'Cancelled', dot: 'bg-red-500' },
]

export function OrdersClient({
  orders: allOrders = [],
  summary: orderSummary = { totalOrders: 0, totalSpent: 0, deliveredOrders: 0, pendingOrders: 0, cancelledOrders: 0 },
}: {
  orders?: Order[]
  summary?: OrderSummary
}) {
  const [activeTab, setActiveTab] = useState<'All Orders' | OrderStatus>('All Orders')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return allOrders.filter((o) => {
      const matchesTab = activeTab === 'All Orders' || o.status === activeTab
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        o.productName.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.seller.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [activeTab, query])

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      {/* Main */}
      <div>
        <header>
          <h1 className="text-3xl font-black tracking-tight text-foreground">My Orders</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage all your orders in one place.
          </p>
        </header>

        {/* Tabs */}
        <div className="mt-6 border-b border-border">
          <div className="flex gap-6 overflow-x-auto">
            {TABS.map((tab) => {
              const active = tab === activeTab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative -mb-px whitespace-nowrap pb-3 text-sm font-semibold transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Search + filters */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search orders by product or order ID..."
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
          <button className="inline-flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            Status <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="inline-flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            Sort by: Newest <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            aria-label="More filters"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Orders list */}
        <div className="mt-5 space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <p className="text-sm font-semibold text-foreground">No orders found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            filtered.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {filtered.length} of {orderSummary.totalOrders} orders
          </p>
          <div className="flex items-center gap-1.5">
            <PageBtn aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </PageBtn>
            <PageBtn active>1</PageBtn>
            <PageBtn>2</PageBtn>
            <PageBtn>3</PageBtn>
            <span className="px-1 text-sm text-muted-foreground">...</span>
            <PageBtn>5</PageBtn>
            <PageBtn aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </PageBtn>
          </div>
        </div>
      </div>

      {/* Right rail */}
      <aside className="space-y-6">
        <OrderSummaryCard summary={orderSummary} />
        <FiltersCard />
      </aside>
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Image */}
        <Link
          href={`/product/${order.productSlug}`}
          className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-24 sm:w-24"
        >
          <Image src={order.image || '/placeholder.svg'} alt={order.productName} fill className="object-cover" />
        </Link>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <Link href={`/product/${order.productSlug}`}>
            <h3 className="font-bold leading-snug text-foreground transition-colors hover:text-primary">
              {order.productName}
            </h3>
          </Link>
          <span className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
            {order.seller}
            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
          </span>
          <p className="mt-2 text-xs text-muted-foreground">Order ID: {order.id}</p>
          <p className="text-xs text-muted-foreground">{order.orderedAt}</p>
        </div>

        {/* Status + fulfillment */}
        <div className="sm:w-48">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[order.status]}`}
          >
            {order.status}
          </span>
          <p className="mt-3 text-xs text-muted-foreground">{order.fulfillment.label}</p>
          <p className="text-sm font-semibold text-foreground">{order.fulfillment.value}</p>
        </div>

        {/* Price + action */}
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end sm:text-right">
          <div>
            <p className="font-black text-foreground">${order.amount.toFixed(2)} USDC</p>
            <p className="text-xs text-muted-foreground">{order.items} item</p>
          </div>
          <Link
            href={`/order/success?product=${order.productSlug}&qty=${order.items}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

function OrderSummaryCard({ summary: orderSummary }: { summary: OrderSummary }) {
  const rows = [
    { icon: CalendarDays, label: 'Total Orders', value: String(orderSummary.totalOrders) },
    { icon: ClipboardCheck, label: 'Total Spent', value: `$${orderSummary.totalSpent.toFixed(2)} USDC` },
    { icon: PackageCheck, label: 'Delivered Orders', value: String(orderSummary.deliveredOrders) },
    { icon: Hourglass, label: 'Pending Orders', value: String(orderSummary.pendingOrders) },
    { icon: XCircle, label: 'Cancelled Orders', value: String(orderSummary.cancelledOrders) },
  ]
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
          <Wallet className="h-5 w-5" />
        </span>
        <h2 className="text-base font-bold text-foreground">Order Summary</h2>
      </div>
      <dl className="mt-4 space-y-3.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-sm text-muted-foreground">
              <r.icon className="h-4 w-4 text-muted-foreground" />
              {r.label}
            </dt>
            <dd className="text-sm font-bold text-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-50 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-violet-100">
        <BarChart3 className="h-4 w-4" /> View Spending Analytics
      </button>
    </section>
  )
}

function FiltersCard() {
  const [selected, setSelected] = useState<'All Orders' | OrderStatus>('All Orders')
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-base font-bold text-foreground">Filters</h2>
        </div>
        <button
          onClick={() => setSelected('All Orders')}
          className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Clear all
        </button>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-foreground">Date Range</p>
        <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" /> All Time
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-foreground">Order Status</p>
        <div className="mt-2 space-y-2.5">
          {STATUS_FILTERS.map((s) => {
            const checked = selected === s.label
            return (
              <button
                key={s.label}
                onClick={() => setSelected(s.label)}
                className="flex w-full items-center gap-2.5 text-left"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                    checked ? 'border-primary bg-primary' : 'border-border bg-card'
                  }`}
                >
                  {checked && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3 text-primary-foreground" fill="none">
                      <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-foreground">
                  <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-foreground">Payment Method</p>
        <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary">
          All Methods
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </section>
  )
}

function PageBtn({
  children,
  active,
  ...props
}: { active?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-semibold transition-colors ${
        active
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-border bg-card text-foreground hover:bg-secondary'
      }`}
    >
      {children}
    </button>
  )
}
