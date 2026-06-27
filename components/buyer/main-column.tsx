'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  Send,
  Gamepad2,
  Headphones,
  Laptop,
  Heart,
  BadgeCheck,
  ShieldCheck,
  Package,
} from 'lucide-react'
import type { RecommendedProduct } from '@/lib/actions/buyer-dashboard'

const suggestions = [
  { icon: Gamepad2, label: 'Gaming setup under $1000' },
  { icon: Headphones, label: 'Best wireless headphones' },
  { icon: Laptop, label: 'Laptop for content creators' },
]

type Props = {
  products?: RecommendedProduct[]
}

export function BuyerMainColumn({ products = [] }: Props) {
  return (
    <div className="space-y-6">
      {/* AI Shopping Assistant */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0e1a] via-[#1a1147] to-[#0a0e1a] p-6 text-white ring-1 ring-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <h2 className="text-lg font-bold">Nex AI Shopping Assistant</h2>
          <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-300">
            Beta
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-300">
          Ask anything. Get personalized product recommendations.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white p-1.5">
          <input
            type="text"
            placeholder="What are you looking for today?"
            className="flex-1 bg-transparent px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            <Send className="h-4 w-4" />
            Ask Nex AI
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {suggestions.map((s) => (
            <button
              key={s.label}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5 text-sm text-slate-200 ring-1 ring-white/10 transition-colors hover:bg-white/10"
            >
              <s.icon className="h-4 w-4 text-slate-400" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended For You */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Recommended For You</h2>
          <Link href="/marketplace" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-card py-12 text-center ring-1 ring-border">
            <Package className="h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-semibold text-foreground">No products yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back soon for new listings.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-square bg-[#eef0f3]">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Package className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition-colors hover:text-pink-600"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-foreground">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-base font-bold text-foreground">{p.price}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="truncate">{p.sellerName}</span>
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      {p.tier}
                    </span>
                    {p.score != null && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {p.score}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
