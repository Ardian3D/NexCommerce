'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2,
  Check,
  Copy,
  ExternalLink,
  Wallet,
  ArrowRight,
  Mail,
  HelpCircle,
  Clock,
  BadgeCheck,
  ShieldCheck,
  MapPin,
  ClipboardCheck,
  PackageCheck,
} from 'lucide-react'
import { tierStyles, type Product } from '@/lib/products'
import { TrustBar } from '@/components/shared/trust-bar'

const CONFETTI = [
  { left: '6%', top: '18%', color: 'bg-violet-400', rotate: '-18deg' },
  { left: '14%', top: '40%', color: 'bg-blue-400', rotate: '24deg' },
  { left: '22%', top: '12%', color: 'bg-emerald-400', rotate: '12deg' },
  { left: '30%', top: '52%', color: 'bg-amber-400', rotate: '-30deg' },
  { left: '44%', top: '8%', color: 'bg-blue-300', rotate: '40deg' },
  { left: '58%', top: '50%', color: 'bg-violet-300', rotate: '-12deg' },
  { left: '68%', top: '14%', color: 'bg-emerald-300', rotate: '30deg' },
  { left: '78%', top: '44%', color: 'bg-amber-300', rotate: '-22deg' },
  { left: '86%', top: '20%', color: 'bg-blue-400', rotate: '16deg' },
  { left: '92%', top: '38%', color: 'bg-violet-400', rotate: '-36deg' },
]

const timeline = [
  { icon: MapPin, title: 'Order Placed', meta: 'May 24, 2025 · 10:42 AM', confirmed: false },
  { icon: ShieldCheck, title: 'Payment', label: 'Confirmed', meta: 'May 24, 2025 · 10:42 AM', confirmed: true },
  { icon: ClipboardCheck, title: 'Seller Notified', meta: 'May 24, 2025 · 10:43 AM', confirmed: false },
  { icon: PackageCheck, title: 'Preparing Order', meta: 'Estimated shipping soon', confirmed: false },
]

export function SuccessClient({ product, qty }: { product: Product; qty: number }) {
  const [copied, setCopied] = useState(false)

  const subtotal = product.price * qty
  const total = subtotal + 4.99 + 0.75
  const fmt = (n: number) => `$${n.toFixed(2)}`
  const hash = '5xYd...8kLmR2'

  function copyHash() {
    navigator.clipboard?.writeText('5xYdQ8sN2vP9kLmR2WqXcF7bJ3hG4dT6yU1aZ8kLmR2')
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Confetti */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className={`absolute h-2.5 w-2.5 rounded-[2px] ${c.color} opacity-70`}
              style={{ left: c.left, top: c.top, transform: `rotate(${c.rotate})` }}
            />
          ))}
        </div>

        <div className="relative flex flex-col items-center text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" strokeWidth={2.25} />
          </span>
          <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            Payment
            <br />
            <span className="text-emerald-500">Confirmed!</span>
          </h1>
          <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Thank you! Your order has been placed successfully. You will receive an email confirmation
            shortly.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <section className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((t, i) => (
            <div key={t.title} className="relative flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                  <t.icon className="h-4 w-4" />
                </span>
                {i < timeline.length - 1 && (
                  <span className="hidden h-px flex-1 bg-border lg:block" />
                )}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-foreground">
                  {t.title}{' '}
                  {t.label && (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                      {t.label} <BadgeCheck className="h-3.5 w-3.5" />
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Details grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Left: order details + thank you */}
        <div className="space-y-6">
          <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
            <h2 className="text-sm font-black uppercase tracking-wide text-primary">Order Details</h2>

            <div className="mt-4 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row">
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-32 sm:w-32">
                <Image src={product.image || '/placeholder.svg'} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                        {product.category}
                      </span>
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                        {product.subcategory}
                      </span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        Digital Product
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-base font-black text-foreground">{fmt(product.price)}</p>
                    <p className="text-xs text-muted-foreground">Qty: {qty}</p>
                  </div>
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
                    {product.tier} Seller
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Trust Score {product.score}
                  </span>
                </div>
              </div>
            </div>

            <dl className="mt-5 space-y-4 text-sm">
              <DetailRow label="Order ID" value="#NC-2025-05-24-8921" />
              <DetailRow label="Order Date" value="May 24, 2025 · 10:42 AM" />
              <DetailRow
                label="Payment Method"
                value={
                  <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                    <Wallet className="h-4 w-4 text-violet-600" /> Phantom Wallet
                  </span>
                }
              />
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="font-bold text-foreground">Total Amount</span>
                <span className="text-right">
                  <span className="block font-black text-foreground">{total.toFixed(2)} USDC</span>
                  <span className="block text-xs text-muted-foreground">≈ {fmt(total)} USD</span>
                </span>
              </div>
            </dl>

            <Link
              href="/buyer/orders"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              View Order Details <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* Thank you banner */}
          <section className="flex items-center gap-4 rounded-2xl bg-violet-50 p-5 ring-1 ring-violet-100 sm:p-6">
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Thank you for shopping with NexCommerce!</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Your support helps us build a trusted and secure marketplace for everyone.
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <ShieldCheck className="h-7 w-7" />
            </span>
          </section>
        </div>

        {/* Right: transaction details + what's next */}
        <div className="space-y-6">
          <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
            <h2 className="text-sm font-black uppercase tracking-wide text-primary">Transaction Details</h2>

            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Transaction Hash</dt>
                <dd>
                  <button
                    onClick={copyHash}
                    className="inline-flex items-center gap-1.5 font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {hash}
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                </dd>
              </div>
              <DetailRow
                label="Network"
                value={
                  <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                    Solana Mainnet <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                  </span>
                }
              />
              <DetailRow label="Amount" value={`${total.toFixed(2)} USDC`} />
              <div className="flex items-start justify-between">
                <dt className="text-muted-foreground">Transaction Fee</dt>
                <dd className="text-right">
                  <span className="block font-semibold text-foreground">~0.00025 SOL</span>
                  <span className="block text-xs text-muted-foreground">(≈ $0.05 USD)</span>
                </dd>
              </div>
              <DetailRow label="Confirmed At" value="May 24, 2025 · 10:42 AM" />
            </dl>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" />
              <div className="leading-tight">
                <p className="text-sm font-bold text-emerald-700">Transaction Confirmed</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Verified on Solana Explorer <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
            <h2 className="text-sm font-black uppercase tracking-wide text-primary">What&apos;s Next?</h2>
            <div className="mt-4 space-y-4">
              <NextRow
                icon={Clock}
                title="Seller is preparing your order"
                desc="You will receive shipping updates soon"
              />
              <NextRow
                icon={Mail}
                title="You will be notified via email"
                desc="We'll send you updates at every step"
              />
              <NextRow
                icon={HelpCircle}
                title="Need help?"
                desc="Contact our 24/7 support anytime"
              />
            </div>
          </section>
        </div>
      </div>

      <TrustBar className="mt-6" />

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/marketplace"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-violet-600 px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95 sm:w-auto"
        >
          Continue Shopping <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/buyer/dashboard"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary sm:w-auto"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  )
}

function NextRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
        <Icon className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-foreground">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}
