'use client'

import {
  ShieldCheck,
  Award,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Info,
} from 'lucide-react'
import { nextTierLabel } from '@/lib/tier-utils'

type Props = {
  trustScore: number
  tier: string
  totalProducts: number
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
}

export function StatCards({
  trustScore,
  tier,
  totalProducts,
  totalOrders,
  pendingOrders,
  totalRevenue,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {/* Trust Score */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Trust Score</span>
        </div>
        <p className="mt-3 text-2xl font-bold text-foreground">
          {trustScore}{' '}
          <span className="text-base font-medium text-muted-foreground">/ 100</span>
        </p>
        <div className="mt-1 text-xs font-medium">
          <span className="flex items-center gap-1 text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" /> Active seller
          </span>
        </div>
      </div>

      {/* Current Tier */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
            <Award className="h-5 w-5 text-violet-600" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Current Tier</span>
        </div>
        <p className="mt-3 text-2xl font-bold text-foreground">{tier}</p>
        <div className="mt-1 text-xs font-medium">
          <span className="flex items-center gap-1 text-muted-foreground">
            {nextTierLabel(tier)} <Info className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Total Products */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
            <Package className="h-5 w-5 text-amber-600" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Total Products</span>
        </div>
        <p className="mt-3 text-2xl font-bold text-foreground">{totalProducts}</p>
        <div className="mt-1 text-xs font-medium text-muted-foreground">
          {totalProducts} active listings
        </div>
      </div>

      {/* Total Orders */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100">
            <ShoppingBag className="h-5 w-5 text-rose-600" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Total Orders</span>
        </div>
        <p className="mt-3 text-2xl font-bold text-foreground">{totalOrders}</p>
        <div className="mt-1 text-xs font-medium text-muted-foreground">
          {pendingOrders} pending
        </div>
      </div>

      {/* Total Revenue */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </span>
          <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
        </div>
        <p className="mt-3 text-2xl font-bold text-foreground">
          ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className="mt-1 text-xs font-medium text-muted-foreground">All time</div>
      </div>
    </div>
  )
}
