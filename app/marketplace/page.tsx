'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  ShoppingCart,
  Star,
  BadgeCheck,
  SlidersHorizontal,
  ShieldCheck,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  seller: string
  price: number
  rating: number
  reviews: number
  category: string
  image: string
  verified?: boolean
}

const categories = [
  'All',
  'Gaming',
  'E-books',
  'Software',
  'Music & Audio',
  'Templates',
]

const products: Product[] = [
  {
    id: 1,
    name: 'Pro Gaming Mouse',
    seller: 'Aim Labs',
    price: 39,
    rating: 4.5,
    reviews: 2,
    category: 'Gaming',
    image: '/store/product-mouse.png',
    verified: true,
  },
  {
    id: 2,
    name: 'Mechanical Keyboard RGB',
    seller: 'KeyForge',
    price: 89,
    rating: 4.8,
    reviews: 156,
    category: 'Gaming',
    image: '/market/keyboard.png',
    verified: true,
  },
  {
    id: 3,
    name: 'Studio Headphones',
    seller: 'AudioPeak',
    price: 129,
    rating: 4.7,
    reviews: 98,
    category: 'Music & Audio',
    image: '/market/headphones.png',
    verified: true,
  },
  {
    id: 4,
    name: 'The Design Systems Handbook',
    seller: 'PixelPress',
    price: 24,
    rating: 4.9,
    reviews: 412,
    category: 'E-books',
    image: '/market/ebook.png',
  },
  {
    id: 5,
    name: 'Dashboard UI Kit Pro',
    seller: 'Framewerk',
    price: 59,
    rating: 4.6,
    reviews: 233,
    category: 'Templates',
    image: '/market/ui-kit.png',
    verified: true,
  },
  {
    id: 6,
    name: 'Cinematic Sound Pack',
    seller: 'WaveCraft',
    price: 19,
    rating: 4.4,
    reviews: 64,
    category: 'Music & Audio',
    image: '/market/sound-pack.png',
  },
]

export default function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('All')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCat === 'All' || p.category === activeCat
      const matchQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.seller.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQuery
    })
  }, [query, activeCat])

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="8" fill="#1d4ed8" />
              <path d="M11 30V10h4l10 13V10h4v20h-4L15 17v13h-4Z" fill="#fff" />
              <path d="M11 10h6l-6 8V10Z" fill="#93c5fd" />
            </svg>
            <span className="hidden text-lg font-bold tracking-tight sm:inline">
              <span className="text-foreground">Nex</span>
              <span className="text-primary">Commerce</span>
            </span>
          </Link>

          <div className="relative flex-1 sm:max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or sellers..."
              className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              0
            </span>
          </button>

          <Link
            href="/seller/dashboard"
            className="hidden h-10 items-center rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-opacity hover:opacity-95 sm:flex"
          >
            Sell on NexCommerce
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Hero strip */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-8 sm:px-10 sm:py-10">
          <h1 className="text-balance text-2xl font-black tracking-tight text-white sm:text-3xl">
            Discover trusted products
          </h1>
          <p className="mt-2 max-w-lg text-pretty text-sm text-blue-100">
            Shop from verified sellers with on-chain trust scores. Secure
            payments, real reviews, zero fakes.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            <ShieldCheck className="h-4 w-4" />
            Every seller verified on-chain
          </div>
        </div>

        {/* Filters */}
        <div className="mb-5 flex items-center gap-3 overflow-x-auto pb-1">
          <div className="flex items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCat === c
                    ? 'bg-foreground text-background'
                    : 'border border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <button className="ml-auto hidden shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:flex">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </p>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
            <Search className="h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium text-foreground">
              No products found
            </p>
            <p className="text-sm text-muted-foreground">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-bold text-foreground backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <span className="truncate">{product.seller}</span>
          {product.verified && (
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-blue-500" />
          )}
        </div>

        <div className="mt-1.5 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-foreground">
            {product.rating}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-black text-foreground">
            ${product.price}
          </span>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow transition-opacity hover:opacity-90"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
