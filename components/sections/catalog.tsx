'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { Sparkle } from '@/components/sparkle'
import { Reveal } from '@/components/reveal'

const products = [
  {
    image: '/products/smart-watch.png',
    category: 'Tech Gadgets',
    name: 'Smart Watch Series X',
    rating: 4.8,
    reviews: 96,
    price: 109,
    old: 199,
  },
  {
    image: '/products/headphones.png',
    category: 'Electronics',
    name: 'Wireless Noise Cancelling Headphones',
    rating: 4.9,
    reviews: 128,
    price: 129,
    old: null,
  },
  {
    image: '/products/backpack.png',
    category: 'Accessories',
    name: 'Minimalist Backpack',
    rating: 4.7,
    reviews: 72,
    price: 79,
    old: null,
  },
  {
    image: '/products/desk-lamp.png',
    category: 'Home & Living',
    name: 'Smart LED Desk Lamp',
    rating: 4.6,
    reviews: 54,
    price: 49,
    old: 69,
  },
  {
    image: '/products/smart-watch.png',
    category: 'Tech Gadgets',
    name: 'Smart Watch Series X',
    rating: 4.8,
    reviews: 96,
    price: 109,
    old: 199,
  },
]

export function Catalog() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('article')
    const amount = card ? card.clientWidth + 20 : 300
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section
      id="products"
      className="relative px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[300px_1fr] lg:gap-12">
        {/* Left — heading */}
        <Reveal className="lg:pt-4" direction="right">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
            <Sparkle className="h-3.5 w-3.5 text-primary" />
            Our Picks
          </span>

          <h2 className="mt-5 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl">
            Featured
            <br />
            Products
          </h2>

          <p className="mt-5 max-w-xs font-mono text-xs leading-relaxed text-foreground/60">
            Handpicked products from top sellers, powered by intelligent
            recommendations.
          </p>

          <a
            href="#"
            className="group mt-6 inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        {/* Right — product carousel */}
        <Reveal className="relative min-w-0" direction="left" delay={0.1}>
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ProductCard({
  image,
  category,
  name,
  rating,
  reviews,
  price,
  old,
}: {
  image: string
  category: string
  name: string
  rating: number
  reviews: number
  price: number
  old: number | null
}) {
  const discount = old ? Math.round(((old - price) / old) * 100) : null

  return (
    <article className="group relative flex w-[240px] shrink-0 snap-start flex-col rounded-3xl border border-foreground/10 bg-card p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_24px_50px_-24px_rgba(37,99,235,0.45)]">
      {/* Discount badge */}
      {discount && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
          -{discount}%
        </span>
      )}

      {/* Wishlist */}
      <button
        type="button"
        aria-label="Add to wishlist"
        className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-foreground/40 backdrop-blur transition-colors hover:text-primary"
      >
        <Heart className="h-4 w-4" />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.09]">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          fill
          sizes="240px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Meta */}
      <span className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
        {category}
      </span>
      <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-foreground">
        {name}
      </h3>

      {/* Rating */}
      <div className="mt-2 flex items-center gap-1.5 font-mono text-xs">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        <span className="font-bold text-foreground">{rating}</span>
        <span className="text-foreground/40">({reviews})</span>
      </div>

      {/* Price + cart */}
      <div className="mt-3 flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-black text-foreground">
            ${price}
          </span>
          {old && (
            <span className="font-mono text-xs text-foreground/40 line-through">
              ${old}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label="Add to cart"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:scale-105"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
