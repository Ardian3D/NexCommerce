'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products, tierStyles, type Product } from '@/lib/products'
import {
  LayoutGrid,
  Monitor,
  Gamepad2,
  Shirt,
  Home,
  Watch,
  Sparkles,
  Dumbbell,
  BookOpen,
  MoreHorizontal,
  ShieldCheck,
  Lock,
  SlidersHorizontal,
  ChevronDown,
  List,
  BadgeCheck,
  Flame,
  Heart,
  ShoppingCart,
} from 'lucide-react'

const categories = [
  { label: 'All', icon: LayoutGrid },
  { label: 'Electronics', icon: Monitor },
  { label: 'Gaming', icon: Gamepad2 },
  { label: 'Fashion', icon: Shirt },
  { label: 'Home & Living', icon: Home },
  { label: 'Accessories', icon: Watch },
  { label: 'Beauty', icon: Sparkles },
  { label: 'Sports', icon: Dumbbell },
  { label: 'Books', icon: BookOpen },
  { label: 'More', icon: MoreHorizontal },
]

export function MarketContent() {
  const [activeCat, setActiveCat] = useState('All')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(
    () =>
      activeCat === 'All'
        ? products
        : products.filter((p) => p.category === activeCat),
    [activeCat],
  )

  return (
    <div>
      {/* Heading + info cards */}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Marketplace
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Discover trusted products from verified sellers around the world.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoCard
            icon={ShieldCheck}
            title="Verified Sellers Only"
            desc="All sellers are verified and trusted by NexCommerce."
          />
          <InfoCard
            icon={Lock}
            title="Secure Payments"
            desc="All transactions are secured on the Solana blockchain."
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-10">
        {categories.map((c) => {
          const active = activeCat === c.label
          return (
            <button
              key={c.label}
              onClick={() => setActiveCat(c.label)}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-2 py-3 text-center transition-colors ${
                active
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <c.icon className="h-5 w-5" />
              <span className="text-[11px] font-semibold leading-tight">{c.label}</span>
            </button>
          )
        })}
      </div>

      {/* Filter bar */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <FilterButton icon={SlidersHorizontal}>Filter &amp; Sort</FilterButton>
        <FilterSelect label="Sort by: Featured" />
        <FilterSelect label="Price Range" />
        <FilterSelect label="Condition" />
        <FilterSelect label="Shipping" />

        <div className="ml-auto flex items-center overflow-hidden rounded-lg border border-border bg-card">
          <button
            onClick={() => setView('grid')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors ${
              view === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Grid
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors ${
              view === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <List className="h-4 w-4" /> List
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        <span className="font-bold text-foreground">1,248</span> products found
      </p>

      {/* Product grid */}
      <div
        className={
          view === 'grid'
            ? 'mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
            : 'mt-4 flex flex-col gap-3'
        }
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} view={view} />
        ))}
      </div>
    </div>
  )
}

function InfoCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-card p-3.5 ring-1 ring-border">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-foreground">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

function FilterButton({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted">
      <Icon className="h-4 w-4" />
      {children}
    </button>
  )
}

function FilterSelect({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
      {label}
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  )
}

function badgeClasses(tone: 'hot' | 'new' | 'best') {
  switch (tone) {
    case 'hot':
      return 'bg-orange-100 text-orange-600'
    case 'new':
      return 'bg-emerald-100 text-emerald-600'
    case 'best':
      return 'bg-amber-100 text-amber-700'
  }
}

function ProductCard({ product, view }: { product: Product; view: 'grid' | 'list' }) {
  const isList = view === 'list'
  return (
    <div
      className={`group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-shadow hover:shadow-lg hover:shadow-foreground/5 ${
        isList ? 'flex' : 'flex flex-col'
      }`}
    >
      <Link
        href={`/product/${product.slug}`}
        className={`relative shrink-0 overflow-hidden bg-secondary ${
          isList ? 'h-40 w-40' : 'aspect-[4/3] w-full'
        }`}
      >
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge ? (
          <span
            className={`absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeClasses(
              product.badge.tone,
            )}`}
          >
            {product.badge.tone === 'hot' ? <Flame className="h-3 w-3" /> : null}
            {product.badge.label}
          </span>
        ) : null}
        <button
          aria-label="Add to wishlist"
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-card/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-pink-600"
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <span className="truncate">{product.seller}</span>
          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${tierStyles[product.tier]}`}>
            {product.tier}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
            <BadgeCheck className="h-3.5 w-3.5" />
            {product.score}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-foreground">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            {product.oldPrice ? (
              <span className="text-xs font-medium text-muted-foreground line-through">
                ${product.oldPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            ) : null}
          </div>
          <button
            aria-label={`Add ${product.name} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
