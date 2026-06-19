'use client'

import Image from 'next/image'
import { BadgeCheck, ShieldCheck, CreditCard, Globe } from 'lucide-react'

type Seller = {
  rank: number
  name: string
  tier: 'Elite' | 'Ascent' | 'Titanium'
  products: string
  score: number
  initials: string
}

const tierStyles: Record<Seller['tier'], string> = {
  Elite: 'bg-violet-100 text-violet-700',
  Ascent: 'bg-blue-100 text-blue-700',
  Titanium: 'bg-slate-200 text-slate-700',
}

const sellers: Seller[] = [
  { rank: 1, name: 'Elite Gear Store', tier: 'Elite', products: '1,234 Products', score: 96, initials: 'A' },
  { rank: 2, name: 'Tech Haven', tier: 'Ascent', products: '856 Products', score: 85, initials: 'THE' },
  { rank: 3, name: 'NextGen Store', tier: 'Ascent', products: '1,102 Products', score: 88, initials: 'N' },
  { rank: 4, name: 'SoundSphere', tier: 'Elite', products: '654 Products', score: 93, initials: 'S' },
  { rank: 5, name: 'PhotoWorld', tier: 'Titanium', products: '432 Products', score: 98, initials: 'PW' },
]

const protections = [
  { icon: ShieldCheck, title: 'Buyer Protection', desc: 'Get full refund for eligible orders.' },
  { icon: CreditCard, title: 'Secure Payments', desc: 'All payments are secured by Solana.' },
  { icon: Globe, title: 'Global Shipping', desc: 'Fast & reliable worldwide delivery.' },
]

export function MarketAside() {
  return (
    <div className="space-y-5">
      {/* Gaming promo */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0a0e1a] p-5">
        <Image
          src="/market/gaming-banner.png"
          alt=""
          fill
          className="object-cover opacity-60"
        />
        <div className="relative">
          <p className="text-xs font-bold text-primary">Game On!</p>
          <h3 className="mt-1 text-lg font-black leading-tight text-white">
            Level Up Your Gear
          </h3>
          <p className="mt-1.5 max-w-[14rem] text-xs leading-relaxed text-slate-300">
            Explore premium gaming products from trusted sellers.
          </p>
          <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90">
            Explore Gaming
          </button>
        </div>
      </div>

      {/* Top rated sellers */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Top Rated Sellers</h3>
          <button className="text-xs font-semibold text-primary hover:underline">
            View all
          </button>
        </div>
        <ul className="mt-4 space-y-4">
          {sellers.map((s) => (
            <li key={s.rank} className="flex items-center gap-3">
              <span className="w-3 shrink-0 text-xs font-bold text-muted-foreground">
                {s.rank}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
                {s.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {s.name}
                  </span>
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${tierStyles[s.tier]}`}>
                    {s.tier}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{s.products}</span>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-600">
                <BadgeCheck className="h-3.5 w-3.5" />
                {s.score}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Protections */}
      <div className="space-y-4 rounded-2xl bg-card p-5 ring-1 ring-border">
        {protections.map((p) => (
          <div key={p.title} className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <p.icon className="h-4.5 w-4.5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-foreground">{p.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
