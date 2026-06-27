'use client'

import { ShieldCheck, Award, ShoppingBag, Heart, TrendingUp, Info } from 'lucide-react'
import { nextTierLabel } from '@/lib/tier-utils'

type Props = {
  trustScore: number
  tier: string
  totalOrders: number
  deliveredOrders: number
  pendingOrders: number
  wishlistCount: number
}

export function BuyerStatCards({
  trustScore,
  tier,
  totalOrders,
  deliveredOrders,
  pendingOrders,
  wishlistCount,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* Trust Score */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Trust Score</span>
        </div>
        <p className="mt-4 text-3xl font-bold text-foreground">
          {trustScore}{' '}
          <span className="text-base font-medium text-muted-foreground">/ 100</span>
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
          <TrendingUp className="h-3.5 w-3.5" /> Active member
        </p>
      </div>

      {/* Current Tier */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <Award className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Current Tier</span>
        </div>
        <p className="mt-4 text-3xl font-bold text-foreground">{tier}</p>
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
          {nextTierLabel(tier)} <Info className="h-3.5 w-3.5" />
        </p>
      </div>

      {/* Total Orders */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Total Orders</span>
        </div>
        <p className="mt-4 text-3xl font-bold text-foreground">{totalOrders}</p>
        <p className="mt-2 text-xs font-medium text-muted-foreground">
          {deliveredOrders} delivered &bull; {pendingOrders} pending
        </p>
      </div>

      {/* Wishlist Items */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
            <Heart className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Wishlist Items</span>
        </div>
        <p className="mt-4 text-3xl font-bold text-foreground">{wishlistCount}</p>
        <p className="mt-2 text-xs font-medium text-muted-foreground">Saved for later</p>
      </div>
    </div>
  )
}
