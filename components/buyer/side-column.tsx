'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Store,
  ClipboardCheck,
  Heart,
  Send,
  ChevronRight,
  BadgeCheck,
  ShoppingBag,
} from 'lucide-react'
import type { RecentOrderItem, WishlistItem } from '@/lib/actions/buyer-dashboard'

const STATUS_COLOR: Record<string, string> = {
  Pending: 'text-amber-600',
  Paid: 'text-blue-600',
  Shipped: 'text-sky-600',
  Delivered: 'text-emerald-600',
  Completed: 'text-green-600',
  Cancelled: 'text-red-500',
}

const quickActions = [
  { icon: Store, label: 'Browse Marketplace', desc: 'Explore products from verified sellers', color: 'text-blue-600 bg-blue-100', href: '/marketplace' },
  { icon: ClipboardCheck, label: 'Track Orders', desc: 'Check your orders and delivery status', color: 'text-violet-600 bg-violet-100', href: '/buyer/orders' },
  { icon: Heart, label: 'View Wishlist', desc: "See items you've saved", color: 'text-pink-600 bg-pink-100', href: '/buyer/wishlist' },
  { icon: Send, label: 'Ask Nex AI', desc: 'Get help finding the perfect products', color: 'text-blue-600 bg-blue-100', href: '/buyer/ai' },
]

type Props = {
  recentOrders?: RecentOrderItem[]
  wishlistItems?: WishlistItem[]
  wishlistCount?: number
}

export function BuyerSideColumn({
  recentOrders = [],
  wishlistItems = [],
  wishlistCount = 0,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Quick Actions</h2>
        </div>
        <div className="mt-4 space-y-1">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-muted"
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${a.color}`}>
                <a.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">{a.label}</span>
                <span className="block truncate text-xs text-muted-foreground">{a.desc}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Recent Orders</h2>
          <Link href="/buyer/orders" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center py-6 text-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-muted-foreground">No orders yet</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#eef0f3]">
                  {o.image ? (
                    <Image src={o.image} alt={o.productName} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-1 text-sm font-semibold text-foreground">
                      {o.productName}
                    </span>
                    <span className={`shrink-0 text-xs font-semibold ${STATUS_COLOR[o.status] ?? 'text-muted-foreground'}`}>
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    {o.sellerName}
                    <BadgeCheck className="h-3 w-3 text-blue-500" />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">#{o.id.slice(0, 8)}</span>
                    <span className="font-bold text-foreground">{o.amount}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{o.orderedAt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wishlist */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">
            Wishlist{' '}
            {wishlistCount > 0 && (
              <span className="ml-1 rounded-full bg-pink-100 px-2 py-0.5 text-xs font-bold text-pink-600">
                {wishlistCount}
              </span>
            )}
          </h2>
          <Link href="/buyer/wishlist" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>
        {wishlistItems.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center py-6 text-center">
            <Heart className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-muted-foreground">No saved items</p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {wishlistItems.map((w, i) => (
              <div key={i} className="overflow-hidden rounded-xl ring-1 ring-border">
                <div className="relative aspect-square bg-[#eef0f3]">
                  {w.image ? (
                    <Image src={w.image} alt="Wishlist item" fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Heart className="h-5 w-5 text-pink-300" />
                    </div>
                  )}
                  <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-pink-600 shadow-sm">
                    <Heart className="h-3.5 w-3.5 fill-pink-600" />
                  </span>
                </div>
                <p className="px-2 py-1.5 text-center text-xs font-bold text-foreground">
                  {w.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
