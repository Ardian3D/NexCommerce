'use client'

import Image from 'next/image'
import {
  Store,
  ClipboardCheck,
  Heart,
  Send,
  ChevronRight,
  BadgeCheck,
} from 'lucide-react'

const quickActions = [
  { icon: Store, label: 'Browse Marketplace', desc: 'Explore products from verified sellers', color: 'text-blue-600 bg-blue-100' },
  { icon: ClipboardCheck, label: 'Track Orders', desc: 'Check your orders and delivery status', color: 'text-violet-600 bg-violet-100' },
  { icon: Heart, label: 'View Wishlist', desc: "See items you've saved", color: 'text-pink-600 bg-pink-100' },
  { icon: Send, label: 'Ask Nex AI', desc: 'Get help finding the perfect products', color: 'text-blue-600 bg-blue-100' },
]

const orders = [
  {
    name: 'Logitech G Pro X Superlight 2',
    image: '/store/product-mouse.png',
    seller: 'Elite Gear Store',
    price: '$149.99',
    id: 'NEX12345',
    status: 'Delivered',
    statusColor: 'text-emerald-600',
    date: '12 May 2025',
  },
  {
    name: 'Keychron K8 Pro Keyboard',
    image: '/market/keyboard.png',
    seller: 'Tech Haven',
    price: '$89.99',
    id: 'NEX12346',
    status: 'Processing',
    statusColor: 'text-amber-600',
    date: '13 May 2025',
  },
]

const wishlist = [
  { image: '/market/gamepad.png', price: '$69.99' },
  { image: '/market/chair.png', price: '$199.99' },
  { image: '/market/mic.png', price: '$129.99' },
]

export function BuyerSideColumn() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Quick Actions</h2>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>
        <div className="mt-4 space-y-1">
          {quickActions.map((a) => (
            <button
              key={a.label}
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
            </button>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Recent Orders</h2>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="flex gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#eef0f3]">
                <Image src={o.image} alt={o.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="line-clamp-1 text-sm font-semibold text-foreground">
                    {o.name}
                  </span>
                  <span className={`shrink-0 text-xs font-semibold ${o.statusColor}`}>
                    {o.status}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  {o.seller}
                  <BadgeCheck className="h-3 w-3 text-blue-500" />
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Order #{o.id}</span>
                  <span className="font-bold text-foreground">{o.price}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{o.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Wishlist</h2>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {wishlist.map((w, i) => (
            <div key={i} className="overflow-hidden rounded-xl ring-1 ring-border">
              <div className="relative aspect-square bg-[#eef0f3]">
                <Image src={w.image} alt="Wishlist item" fill className="object-cover" />
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
      </div>
    </div>
  )
}
