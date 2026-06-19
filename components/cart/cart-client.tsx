'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  BadgeCheck,
  ShieldCheck,
  ShieldEllipsis,
  ArrowRight,
  Tag,
  Info,
} from 'lucide-react'
import { tierStyles, type Product } from '@/lib/products'
import { Stepper } from '@/components/checkout/stepper'
import { TrustBar } from '@/components/shared/trust-bar'

export function CartClient({ product, initialQty }: { product: Product; initialQty: number }) {
  const [qty, setQty] = useState(Math.min(Math.max(1, initialQty), product.inStock))
  const [removed, setRemoved] = useState(false)

  const subtotal = product.price * qty
  const shippingFee = 4.99
  const transactionFee = 0.75
  const total = removed ? 0 : subtotal + shippingFee + transactionFee
  const savings = product.oldPrice ? (product.oldPrice - product.price) * qty : 0
  const fmt = (n: number) => `$${n.toFixed(2)}`

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header + stepper */}
      <div className="flex flex-col gap-5">
        <Stepper current={0} />
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <ShoppingCart className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Your Cart</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review the items in your cart before checking out.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left: cart items */}
        <div className="space-y-6">
          <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                Cart Items {!removed && <span className="text-muted-foreground">(1)</span>}
              </h2>
            </div>

            {removed ? (
              <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl bg-secondary/60 py-14 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                  <ShoppingCart className="h-6 w-6" />
                </span>
                <p className="text-sm font-bold text-foreground">Your cart is empty</p>
                <Link
                  href="/marketplace"
                  className="mt-1 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-4 rounded-xl ring-1 ring-border sm:flex-row sm:items-stretch">
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-l-xl bg-secondary sm:h-40 sm:w-40">
                  <Image src={product.image || '/placeholder.svg'} alt={product.name} fill className="object-cover" />
                </div>

                <div className="flex-1 p-4 sm:py-4 sm:pr-4 sm:pl-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="text-base font-bold text-foreground transition-colors hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          {product.category}
                        </span>
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          {product.subcategory}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-black text-background">
                          {product.seller.charAt(0)}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-foreground">
                          {product.seller}
                          <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                        </span>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${tierStyles[product.tier]}`}>
                          <ShieldEllipsis className="h-3 w-3" /> {product.tier}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-foreground">{fmt(product.price)}</p>
                      {product.oldPrice && (
                        <p className="text-xs text-muted-foreground line-through">{fmt(product.oldPrice)}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg ring-1 ring-border">
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
                    <button
                      onClick={() => setRemoved(true)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 transition-colors hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {!removed && (
            <section className="flex flex-wrap items-center gap-3 rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                <Tag className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">Have a promo code?</p>
                <p className="text-xs text-muted-foreground">Apply it at checkout to save more.</p>
              </div>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 focus:ring-2 sm:w-44"
                />
                <button className="h-10 rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
                  Apply
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Right: order summary */}
        <div className="space-y-6">
          <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

            <div className="mt-4 space-y-3 text-sm">
              <Row label={`Subtotal (${removed ? 0 : qty} item${qty > 1 && !removed ? 's' : ''})`} value={fmt(removed ? 0 : subtotal)} />
              <Row label="Shipping Fee" value={fmt(removed ? 0 : shippingFee)} info />
              <Row label="Transaction Fee" value={fmt(removed ? 0 : transactionFee)} info />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-base font-bold text-foreground">Total</span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">USD</span>
                <span className="text-2xl font-black text-foreground">{fmt(total)}</span>
              </span>
            </div>

            {savings > 0 && !removed && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                You&apos;re saving {fmt(savings)} with secure blockchain shopping!
              </div>
            )}

            <Link
              href={removed ? '/marketplace' : `/checkout?product=${product.slug}&qty=${qty}`}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-opacity hover:opacity-95 ${
                removed
                  ? 'bg-secondary text-foreground'
                  : 'bg-gradient-to-r from-primary to-violet-600 text-primary-foreground'
              }`}
            >
              {removed ? 'Continue Shopping' : 'Proceed to Checkout'}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/marketplace"
              className="mt-3 block text-center text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              or continue shopping
            </Link>
          </section>
        </div>
      </div>

      <TrustBar className="mt-6" />
    </div>
  )
}

function Row({ label, value, info }: { label: string; value: string; info?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {label}
        {info && <Info className="h-3.5 w-3.5" />}
      </span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  )
}
