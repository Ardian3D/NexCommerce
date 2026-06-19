'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star,
  ImagePlus,
  X,
  Copy,
  Check,
  ExternalLink,
  BadgeCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { tierStyles, type Product } from '@/lib/products'
import type { Order } from '@/lib/orders'

const RATING_LABELS: Record<number, { label: string; tone: string }> = {
  1: { label: 'Poor', tone: 'text-red-500' },
  2: { label: 'Fair', tone: 'text-orange-500' },
  3: { label: 'Good', tone: 'text-amber-500' },
  4: { label: 'Great', tone: 'text-lime-600' },
  5: { label: 'Amazing', tone: 'text-emerald-600' },
}

const HOW_IT_WORKS = [
  {
    title: 'Share your experience',
    desc: 'Help others make better buying decisions.',
  },
  {
    title: 'Earn Trust Points',
    desc: 'Your review contributes to your trust score.',
  },
  {
    title: 'Build a better community',
    desc: 'Honest reviews make NexCommerce safer for everyone.',
  },
]

export function ReviewClient({ product, order }: { product: Product; order: Order }) {
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [title, setTitle] = useState("Best Gaming Mouse I've Ever Used!")
  const [review, setReview] = useState(
    'Incredible performance and super lightweight! The tracking is perfect and the battery life is outstanding. Totally worth it. Highly recommended for competitive gamers!',
  )
  const [photos, setPhotos] = useState<string[]>([product.image, product.image, product.image])
  const [copied, setCopied] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const displayRating = hover || rating
  const ratingInfo = RATING_LABELS[displayRating]

  function copyOrderId() {
    navigator.clipboard?.writeText(order.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  function onAddPhotos(files: FileList | null) {
    if (!files) return
    const urls = Array.from(files).map((f) => URL.createObjectURL(f))
    setPhotos((prev) => [...prev, ...urls])
  }

  function removePhoto(i: number) {
    setPhotos((prev) => prev.filter((_, idx) => idx !== i))
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header + breadcrumb */}
      <header>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Write a Review</h1>
        <nav aria-label="Breadcrumb" className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/buyer/orders" className="transition-colors hover:text-foreground">
            Orders
          </Link>
          <span aria-hidden>›</span>
          <Link
            href={`/order/success?product=${product.slug}&qty=${order.items}`}
            className="transition-colors hover:text-foreground"
          >
            Order Details
          </Link>
          <span aria-hidden>›</span>
          <span className="font-medium text-foreground">Write a Review</span>
        </nav>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main column */}
        <div className="space-y-6">
          {/* Product you purchased */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="text-base font-bold text-foreground">Product You Purchased</h2>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-28 sm:w-28">
                <Image src={product.image || '/placeholder.svg'} alt={product.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold leading-snug text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                  </div>
                  <Link
                    href="/seller/store"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    View Store <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">Sold by</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-black text-background">
                    {product.seller.charAt(0)}
                  </span>
                  <span className="text-sm font-bold text-foreground">{product.seller}</span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${tierStyles[product.tier]}`}>
                    {product.tier} Seller
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    Trust Score {product.score}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <p className="text-base font-black text-foreground">${product.price.toFixed(2)} USD</p>
                  <p className="text-sm text-muted-foreground">Qty: {order.items}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Review form */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            {/* Rating */}
            <h2 className="text-base font-bold text-foreground">Rate this product</h2>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-9 w-9 ${
                        n <= displayRating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="leading-tight">
                <p className={`text-sm font-bold ${ratingInfo.tone}`}>{ratingInfo.label}</p>
                <p className="text-xs text-muted-foreground">{displayRating} / 5</p>
              </div>
            </div>

            {/* Title */}
            <div className="mt-6">
              <label htmlFor="review-title" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                Review Title <span className="text-xs font-normal text-muted-foreground">(optional)</span>
              </label>
              <div className="relative mt-2">
                <input
                  id="review-title"
                  value={title}
                  maxLength={80}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Sum up your experience in a few words"
                  className="w-full rounded-xl border border-border bg-card py-2.5 pl-4 pr-16 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {title.length} / 80
                </span>
              </div>
            </div>

            {/* Review body */}
            <div className="mt-5">
              <label htmlFor="review-body" className="text-sm font-semibold text-foreground">
                Your Review
              </label>
              <div className="relative mt-2">
                <textarea
                  id="review-body"
                  value={review}
                  maxLength={1000}
                  rows={5}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="What did you like or dislike? How was the quality and the seller experience?"
                  className="w-full resize-none rounded-xl border border-border bg-card p-4 pb-8 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
                <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {review.length} / 1000
                </span>
              </div>
            </div>

            {/* Photos */}
            <div className="mt-5">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                Add Photos <span className="text-xs font-normal text-muted-foreground">(optional)</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                {photos.map((src, i) => (
                  <div key={i} className="relative h-24 w-24 overflow-hidden rounded-xl border border-border bg-secondary">
                    <Image src={src || '/placeholder.svg'} alt={`Review photo ${i + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label="Remove photo"
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/80 text-background transition-colors hover:bg-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ImagePlus className="h-5 w-5" />
                  <span className="text-[11px] font-semibold leading-tight">Add Photo</span>
                  <span className="text-[10px] leading-tight">or drag and drop</span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => onAddPhotos(e.target.files)}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-primary to-violet-600 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95"
            >
              Submit Review
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Your review will be public and help other buyers. Please be honest and fair.
            </p>
          </section>
        </div>

        {/* Right rail */}
        <aside className="space-y-6">
          {/* Order summary */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-bold text-foreground">Order Summary</h2>
            <dl className="mt-4 space-y-3.5 text-sm">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Order ID</dt>
                <dd>
                  <button
                    onClick={copyOrderId}
                    className="inline-flex items-center gap-1.5 font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {order.id}
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Order Date</dt>
                <dd className="font-semibold text-foreground">{order.orderedAt.split(' · ')[0]}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Payment</dt>
                <dd className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-black text-white">
                    P
                  </span>
                  {order.amount.toFixed(2)} USDC
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Order Status</dt>
                <dd>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                    Delivered
                  </span>
                </dd>
              </div>
            </dl>
            <Link
              href={`/order/success?product=${product.slug}&qty=${order.items}`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              View Order Details <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* About the seller */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-bold text-foreground">About the Seller</h2>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-base font-black text-background">
                {product.seller.charAt(0)}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-bold text-foreground">{product.seller}</span>
                  <BadgeCheck className="h-4 w-4 shrink-0 text-blue-500" />
                </div>
                <span className={`mt-0.5 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${tierStyles[product.tier]}`}>
                  {product.tier} Seller
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Trust Score</span>
              </div>
              <div className="mt-1 flex items-center gap-3">
                <span className="text-sm font-bold text-foreground">{product.score} / 100</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${product.score}%` }} />
                </div>
              </div>
            </div>

            <Link
              href="/seller/store"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              View Store <ExternalLink className="h-4 w-4" />
            </Link>
          </section>

          {/* How reviews work */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-bold text-foreground">How Reviews Work</h2>
            <ol className="mt-4 space-y-4">
              {HOW_IT_WORKS.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-foreground">
                      {i + 1}. {s.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-violet-50 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-sm font-black text-primary">
                +2
              </span>
              <div className="leading-tight">
                <p className="flex items-center gap-1 text-sm font-bold text-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Trust Points
                </p>
                <p className="text-xs text-muted-foreground">for submitting a review</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
