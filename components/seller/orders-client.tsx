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
  Copy,
  Check,
  CalendarDays,
  Package,
  DollarSign,
  Hourglass,
  Truck,
  ClipboardCheck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  statusStyles,
  type SellerOrder,
  type SellerOverview,
  type OrderStatus,
} from '@/lib/seller-orders'

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
  { label: 'All Orders', dot: 'bg-blue-600' },
  { label: 'Pending', dot: 'bg-amber-500' },
  { label: 'Paid', dot: 'bg-emerald-500' },
  { label: 'Shipped', dot: 'bg-blue-500' },
  { label: 'Delivered', dot: 'bg-green-500' },
  { label: 'Completed', dot: 'bg-violet-500' },
  { label: 'Cancelled', dot: 'bg-red-500' },
]

const defaultTabCounts: Record<'All Orders' | OrderStatus, number> = {
  'All Orders': 0, Pending: 0, Paid: 0, Shipped: 0, Delivered: 0, Completed: 0, Cancelled: 0,
}
const defaultOverview: SellerOverview = {
  totalOrders: 0, totalRevenue: 0, pendingOrders: 0, awaitingShipment: 0, completedOrders: 0,
}

export function SellerOrdersClient({
  orders: sellerOrders = [],
  tabCounts: sellerTabCounts = defaultTabCounts,
  overview: sellerOrderOverview = defaultOverview,
}: {
  orders?: SellerOrder[]
  tabCounts?: Record<'All Orders' | OrderStatus, number>
  overview?: SellerOverview
}) {
  const [activeTab, setActiveTab] = useState<'All Orders' | OrderStatus>('All Orders')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return sellerOrders.filter((o) => {
      const matchesTab = activeTab === 'All Orders' || o.status === activeTab
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        o.productName.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.buyer.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [activeTab, query])

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      {/* Main */}
      <div>
        <header>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Orders</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and fulfill customer orders from your store.
          </p>
        </header>

        {/* Tabs */}
        <div className="mt-6 border-b border-slate-200">
          <div className="flex gap-6 overflow-x-auto">
            {TABS.map((tab) => {
              const active = tab === activeTab
              const count = sellerTabCounts[tab]
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative -mb-px flex items-center gap-2 whitespace-nowrap pb-3 text-sm font-semibold transition-colors ${
                    active ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                      active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                  {active && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-blue-600" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Search + filters */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order ID, product or buyer..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500"
            />
          </div>
          <button className="inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
            Status <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          <button className="inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
            Sort: Newest <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          <button
            aria-label="More filters"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Orders list */}
        <div className="mt-5 space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-slate-900">No orders found</p>
              <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            filtered.map((order) => <SellerOrderCard key={order.id} order={order} />)
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            Showing 1 to {filtered.length} of {sellerOrderOverview.totalOrders} orders
          </p>
          <div className="flex items-center gap-1.5">
            <PageBtn aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </PageBtn>
            <PageBtn active>1</PageBtn>
            <PageBtn>2</PageBtn>
            <PageBtn>3</PageBtn>
            <span className="px-1 text-sm text-slate-400">...</span>
            <PageBtn>5</PageBtn>
            <PageBtn aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </PageBtn>
          </div>
        </div>
      </div>

      {/* Right rail */}
      <aside className="space-y-6">
        <OrderOverviewCard overview={sellerOrderOverview} />
        <FiltersCard />
      </aside>
    </div>
  )
}

function SellerOrderCard({ order }: { order: SellerOrder }) {
  const [copied, setCopied] = useState(false)
  const total = order.unitPrice * order.qty

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(order.id.replace(/^#/, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Image */}
        <Link
          href={`/product/${order.productSlug}`}
          className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24"
        >
          <Image src={order.image || '/placeholder.svg'} alt={order.productName} fill className="object-cover" />
        </Link>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-blue-600">Order {order.id}</span>
            <button
              onClick={copyId}
              aria-label="Copy order ID"
              className="text-slate-400 transition-colors hover:text-slate-600"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
          <Link href={`/product/${order.productSlug}`}>
            <h3 className="mt-0.5 font-bold leading-snug text-slate-900 transition-colors hover:text-blue-600">
              {order.productName}
            </h3>
          </Link>
          <p className="mt-0.5 text-xs text-slate-500">
            {order.qty} x ${order.unitPrice.toFixed(2)} USDC
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full">
              <Image src="/phantom-navbar-logo.png" alt="" width={22} height={22} />
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-700">
              Buyer: {order.buyer}
              <BadgeCheck className="h-3.5 w-3.5 text-blue-500" />
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-400">{order.orderedAt}</p>
        </div>

        {/* Status + meta */}
        <div className="sm:w-44">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[order.status]}`}
          >
            {order.status}
          </span>
          <p className="mt-3 text-xs text-slate-500">{order.meta.label}</p>
          {order.meta.chip === 'solana' ? (
            <span className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              <Image src="/solana-logo.jpg" alt="" width={16} height={16} />
              Solana
            </span>
          ) : order.meta.value ? (
            <p className="mt-0.5 text-sm font-semibold text-slate-900">{order.meta.value}</p>
          ) : null}
        </div>

        {/* Total + action */}
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end sm:text-right">
          <div>
            <p className="font-black text-slate-900">${total.toFixed(2)} USDC</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
          <Link
            href={`/order/success?product=${order.productSlug}&qty=${order.qty}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

function OrderOverviewCard({ overview: sellerOrderOverview }: { overview: SellerOverview }) {
  const rows = [
    { icon: CalendarDays, label: 'Total Orders', value: String(sellerOrderOverview.totalOrders) },
    { icon: DollarSign, label: 'Total Revenue', value: `$${sellerOrderOverview.totalRevenue.toFixed(2)} USDC` },
    { icon: Hourglass, label: 'Pending Orders', value: String(sellerOrderOverview.pendingOrders) },
    { icon: Truck, label: 'Awaiting Shipment', value: String(sellerOrderOverview.awaitingShipment) },
    { icon: ClipboardCheck, label: 'Completed Orders', value: String(sellerOrderOverview.completedOrders) },
  ]
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <Package className="h-5 w-5" />
        </span>
        <h2 className="text-base font-bold text-slate-900">Order Overview</h2>
      </div>
      <dl className="mt-4 space-y-3.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-sm text-slate-500">
              <r.icon className="h-4 w-4 text-slate-400" />
              {r.label}
            </dt>
            <dd className="text-sm font-bold text-slate-900">{r.value}</dd>
          </div>
        ))}
      </dl>
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100">
        <BarChart3 className="h-4 w-4" /> View Sales Analytics
      </button>
    </section>
  )
}

function FiltersCard() {
  const [selected, setSelected] = useState<'All Orders' | OrderStatus>('All Orders')
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-slate-400" />
          <h2 className="text-base font-bold text-slate-900">Filters</h2>
        </div>
        <button
          onClick={() => setSelected('All Orders')}
          className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500"
        >
          Clear all
        </button>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-900">Date Range</p>
        <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-slate-400" /> All Time
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-900">Order Status</p>
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
                    checked ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                  }`}
                >
                  {checked && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none">
                      <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-700">
                  <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-900">Payment Method</p>
        <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50">
          All Methods
          <ChevronDown className="h-4 w-4 text-slate-400" />
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
          ? 'border-blue-600 bg-blue-50 text-blue-600'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}
