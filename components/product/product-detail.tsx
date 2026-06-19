'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  Maximize2,
  ChevronDown,
  BadgeCheck,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Bot,
  Minus,
  Plus,
  Zap,
  ShoppingCart,
  Heart,
  Lock,
  Star,
  ArrowRight,
  Store,
  Calendar,
  Clock,
  Package,
  Truck,
  Headphones,
  ShieldEllipsis,
} from 'lucide-react'
import { tierStyles, type Product } from '@/lib/products'

const badgeTone: Record<'hot' | 'new' | 'best', string> = {
  hot: 'bg-orange-100 text-orange-600',
  new: 'bg-emerald-100 text-emerald-600',
  best: 'bg-amber-100 text-amber-700',
}

const tabs = ['Description', 'Specifications', 'Reviews', 'Shipping & Returns'] as const
type Tab = (typeof tabs)[number]

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<Tab>('Description')

  // Build a gallery of at least a few thumbnails using the available image.
  const gallery =
    product.gallery.length > 1
      ? product.gallery
      : Array.from({ length: 5 }, () => product.image)

  const hasDiscount = !!(product.oldPrice && product.oldPrice > product.price)
  const discountLabel =
    product.badge?.tone === 'hot'
      ? product.badge.label
      : hasDiscount
        ? `${Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}% OFF`
        : null

  return (
    <div className="mx-auto max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {['Home', product.category, product.subcategory].map((c) => (
          <span key={c} className="flex items-center gap-1.5">
            <Link href="/marketplace" className="transition-colors hover:text-foreground">
              {c}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        ))}
        <span className="font-semibold text-foreground">{product.name}</span>
      </nav>

      {/* Main grid: content + sticky right rail */}
      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left content: gallery + info + tabs */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[96px_minmax(0,1fr)_minmax(0,340px)]">
        {/* Thumbnails */}
        <div className="order-2 flex gap-3 overflow-x-auto xl:order-1 xl:flex-col xl:overflow-visible">
          {gallery.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary ring-1 transition-all lg:w-full ${
                activeImage === i
                  ? 'ring-2 ring-primary'
                  : 'ring-border hover:ring-primary/40'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src || '/placeholder.svg'} alt="" fill className="object-cover" />
            </button>
          ))}
          <button
            className="flex h-8 w-20 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground lg:w-full"
            aria-label="More images"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Main image */}
        <div className="order-1 xl:order-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary ring-1 ring-border">
            <Image
              src={gallery[activeImage] || product.image || '/placeholder.svg'}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {discountLabel ? (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-600">
                <Sparkles className="h-3.5 w-3.5" />
                {discountLabel}
              </span>
            ) : null}
            <button
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground"
              aria-label="Expand image"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b border-border">
            <div className="flex gap-5 overflow-x-auto">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`relative -mb-px whitespace-nowrap pb-3 text-sm font-semibold transition-colors ${
                    activeTab === t
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t === 'Reviews' ? `Reviews (${product.reviews})` : t}
                  {activeTab === t ? (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6">
            {activeTab === 'Description' ? (
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                {product.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}

            {activeTab === 'Specifications' ? (
              <div className="overflow-hidden rounded-xl ring-1 ring-border">
                {product.specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between px-4 py-3 text-sm ${
                      i % 2 === 0 ? 'bg-card' : 'bg-secondary/50'
                    }`}
                  >
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-semibold text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'Reviews' ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-border">
                  <span className="text-4xl font-black text-foreground">{product.rating}</span>
                  <div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Based on {product.reviews} reviews
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Verified buyers love the quality and fast shipping of this product.
                </p>
              </div>
            ) : null}

            {activeTab === 'Shipping & Returns' ? (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" /> Fast &amp; reliable worldwide shipping,
                  typically 3-7 business days.
                </p>
                <p className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-primary" /> 30-day hassle-free return policy on
                  all eligible orders.
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Buyer protection with full refund
                  if your order is not delivered.
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right info column */}
        <div className="order-3 space-y-5">
          {/* Title + price */}
          <div>
            <h1 className="text-pretty text-2xl font-black leading-tight tracking-tight text-foreground">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{product.subtitle}</p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                {product.category}
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {product.inStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                Sold by
                <span className="font-semibold text-foreground">{product.seller}</span>
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-black text-foreground">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              {product.oldPrice ? (
                <span className="text-base font-medium text-muted-foreground line-through">
                  ${product.oldPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              ) : null}
              {discountLabel ? (
                <span className="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600">
                  {discountLabel}
                </span>
              ) : null}
            </div>
          </div>

          {/* Assurance row */}
          <div className="grid grid-cols-2 overflow-hidden rounded-xl ring-1 ring-border">
            <div className="flex items-center gap-2 bg-card px-4 py-3 text-sm font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> Verified Product
            </div>
            <div className="flex items-center gap-2 border-l border-border bg-card px-4 py-3 text-sm font-medium text-foreground">
              <RefreshCw className="h-4 w-4 text-primary" /> 30 Day Return Policy
            </div>
          </div>

          {/* Key features */}
          <div>
            <h2 className="text-sm font-bold text-foreground">Key Features</h2>
            <ul className="mt-3 space-y-2.5">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI assistant card */}
          <div className="rounded-2xl bg-primary/5 p-4 ring-1 ring-primary/15">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-primary">Nex AI Assistant</span>
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                Beta
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Ask anything about this product.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Is it good for FPS games?', 'How long does the battery last?', 'Compare with similar products'].map(
                (q) => (
                  <button
                    key={q}
                    className="rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground ring-1 ring-border transition-colors hover:ring-primary/40"
                  >
                    {q}
                  </button>
                ),
              )}
            </div>
            <button className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Bot className="h-4 w-4" /> Ask Nex AI
            </button>
          </div>
        </div>
        </div>

        {/* Right rail: seller + buy box */}
        <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <SellerAndBuy product={product} qty={qty} setQty={setQty} />
        </div>
      </div>

      {/* Trust bar */}
      <TrustBar />
    </div>
  )
}

function SellerAndBuy({
  product,
  qty,
  setQty,
}: {
  product: Product
  qty: number
  setQty: (n: number) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
      {/* Seller card */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <p className="text-xs text-muted-foreground">Sold by</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-lg font-black text-background">
            {product.seller.charAt(0)}
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-foreground">{product.seller}</span>
              <BadgeCheck className="h-4 w-4 text-primary" />
            </div>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
              <ShieldEllipsis className="h-3 w-3" /> {product.tier} Seller
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Trust Score</p>
            <p className="mt-1 text-lg font-black text-foreground">{product.score} / 100</p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${product.score}%` }}
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tier</p>
            <p className="mt-1 flex items-center gap-1.5 text-lg font-black text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> {product.tier}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
          <SellerStat icon={Package} label="Products" value={product.seller_info.products.toLocaleString()} />
          <SellerStat icon={Calendar} label="Member Since" value={product.seller_info.memberSince} />
          <SellerStat icon={Clock} label="Response Time" value={product.seller_info.responseTime} />
          <SellerStat
            icon={Star}
            label="Ratings"
            value={`${product.rating} (${product.reviews})`}
          />
        </div>

        <Link
          href="/seller/store"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          View Store <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Buy box */}
      <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">Quantity</span>
          <div className="flex items-center rounded-lg ring-1 ring-border">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm font-bold text-foreground">{qty}</span>
            <button
              onClick={() => setQty(Math.min(product.inStock, qty + 1))}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          Only <span className="font-bold text-foreground">{product.inStock}</span> left in stock
        </p>

        <Link
          href={`/checkout?product=${product.slug}&qty=${qty}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-violet-600 px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95"
        >
          <Zap className="h-4 w-4" /> Buy Now
        </Link>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/5">
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted">
          <Heart className="h-4 w-4" /> Add to Wishlist
        </button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5" /> Secure payment on Solana
        </p>
      </div>
    </div>
  )
}

function SellerStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" /> {label}
      </span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  )
}

function TrustBar() {
  const items = [
    { icon: Lock, title: 'Secure Payments', desc: 'All payments are secured on Solana blockchain', tone: 'text-violet-600 bg-violet-100' },
    { icon: ShieldCheck, title: 'Buyer Protection', desc: 'Get full refund if your order is not delivered', tone: 'text-blue-600 bg-blue-100' },
    { icon: Truck, title: 'Global Shipping', desc: 'Fast & reliable shipping worldwide', tone: 'text-emerald-600 bg-emerald-100' },
    { icon: BadgeCheck, title: 'Verified Sellers', desc: 'All sellers are verified by NexCommerce', tone: 'text-amber-600 bg-amber-100' },
    { icon: Headphones, title: '24/7 Support', desc: "We're here to help you anytime", tone: 'text-pink-600 bg-pink-100' },
  ]
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 rounded-2xl bg-card p-6 ring-1 ring-border sm:grid-cols-2 lg:grid-cols-5">
      {items.map((it) => (
        <div key={it.title} className="flex items-start gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${it.tone}`}>
            <it.icon className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-foreground">{it.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{it.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
