'use client'

import {
  ShoppingBag,
  PlusCircle,
  LayoutGrid,
  ClipboardList,
  Settings,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

export function RecentOrders() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-semibold text-foreground">Recent Orders</h3>

      <div className="mt-4 grid grid-cols-6 gap-2 border-b border-border pb-3 text-xs font-semibold text-muted-foreground">
        <span className="col-span-1">Order ID</span>
        <span className="col-span-1">Product</span>
        <span className="col-span-1">Customer</span>
        <span className="col-span-1">Amount</span>
        <span className="col-span-1">Status</span>
        <span className="col-span-1">Date</span>
      </div>

      <div className="flex flex-col items-center justify-center py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
        </span>
        <p className="mt-4 font-semibold text-foreground">No orders yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Orders will appear here once you start receiving them.
        </p>
        <button className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
          View Orders
        </button>
      </div>
    </div>
  )
}

const quickActions = [
  {
    icon: PlusCircle,
    title: 'Add Product',
    desc: 'Create new listing',
    color: 'text-blue-600',
  },
  {
    icon: LayoutGrid,
    title: 'Manage Products',
    desc: 'View all products',
    color: 'text-violet-600',
  },
  {
    icon: ClipboardList,
    title: 'View Orders',
    desc: 'Manage orders',
    color: 'text-amber-600',
  },
  {
    icon: Settings,
    title: 'Store Settings',
    desc: 'Manage your store',
    color: 'text-emerald-600',
  },
]

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-semibold text-foreground">Quick Actions</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {quickActions.map((a) => (
          <button
            key={a.title}
            className="flex flex-col items-start gap-2 rounded-xl border border-border bg-background p-4 text-left transition-colors hover:border-blue-500/50 hover:bg-muted/50"
          >
            <a.icon className={`h-6 w-6 ${a.color}`} />
            <span className="text-sm font-semibold text-foreground">
              {a.title}
            </span>
            <span className="text-xs text-muted-foreground">{a.desc}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const suggestions = [
  'Generate product description',
  'Suggest product title',
  'Analyze competitors',
]

export function NexAiAssistant() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 p-5">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-foreground">Nex AI Assistant</h3>
        <span className="rounded-full bg-violet-200/70 px-2 py-0.5 text-[10px] font-bold text-violet-700">
          Beta
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold text-foreground">
        Your AI growth partner
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Get help with product descriptions, pricing, SEO, and more.
      </p>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        <Sparkles className="h-4 w-4" />
        Ask Nex AI
      </button>

      <p className="mt-4 text-xs font-semibold text-muted-foreground">
        Popular Suggestions
      </p>
      <ul className="mt-2 space-y-2">
        {suggestions.map((s) => (
          <li key={s}>
            <button className="flex w-full items-center gap-2 text-left text-xs font-medium text-foreground hover:text-blue-600">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              {s}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
