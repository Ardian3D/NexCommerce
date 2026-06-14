'use client'

import { ShieldCheck, Award, ShoppingBag, Heart, TrendingUp, Info } from 'lucide-react'

export function BuyerStatCards() {
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
          60 <span className="text-base font-medium text-muted-foreground">/ 100</span>
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
          <TrendingUp className="h-3.5 w-3.5" />5 this week
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
        <p className="mt-4 text-3xl font-bold text-foreground">Starter</p>
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
          Next: Ascent (80) <Info className="h-3.5 w-3.5" />
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
        <p className="mt-4 text-3xl font-bold text-foreground">2</p>
        <p className="mt-2 text-xs font-medium text-muted-foreground">
          1 delivered • 1 pending
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
        <p className="mt-4 text-3xl font-bold text-foreground">3</p>
        <p className="mt-2 text-xs font-medium text-muted-foreground">Saved for later</p>
      </div>
    </div>
  )
}
