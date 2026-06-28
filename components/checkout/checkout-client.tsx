'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Lock,
  ShieldCheck,
  Minus,
  Plus,
  BadgeCheck,
  ShieldEllipsis,
  RefreshCw,
  Package,
  Truck,
  MapPin,
  Pencil,
  Info,
  Wallet,
  X,
  Check,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { tierStyles, type Product } from '@/lib/products'
import { Stepper } from '@/components/checkout/stepper'
import { TrustBar } from '@/components/shared/trust-bar'
import { saveShippingAddress, getShippingAddress } from '@/lib/actions/address'
import { useEffect } from 'react'

type AddressData = {
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export function CheckoutClient({ product, initialQty }: { product: Product; initialQty: number }) {
  const [qty, setQty] = useState(Math.min(Math.max(1, initialQty), product.inStock))
  const [editingAddress, setEditingAddress] = useState(false)
  const [savingAddress, setSavingAddress] = useState(false)
  const [addressLoaded, setAddressLoaded] = useState(false)

  const [address, setAddress] = useState<AddressData>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  useEffect(() => {
    getShippingAddress().then((addr) => {
      if (addr) {
        setAddress({
          fullName: addr.fullName,
          address: addr.address,
          city: addr.city,
          state: addr.state,
          zipCode: addr.zipCode,
          country: addr.country,
          phone: addr.phone ?? '',
        })
      }
      setAddressLoaded(true)
    })
  }, [])

  async function handleSaveAddress() {
    setSavingAddress(true)
    await saveShippingAddress(address)
    setSavingAddress(false)
    setEditingAddress(false)
  }

  const subtotal = product.price * qty
  const shippingFee = 4.99
  const transactionFee = 0.75
  const total = subtotal + shippingFee + transactionFee
  const savings = product.oldPrice ? (product.oldPrice - product.price) * qty : 0

  const fmt = (n: number) => `$${n.toFixed(2)}`
  const inputClass =
    'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20'

  const hasAddress =
    address.fullName && address.address && address.city && address.country

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5">
        <Stepper current={1} />
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <Lock className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Checkout</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review your order and complete your secure payment.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-foreground">Secure Checkout</p>
            <p className="text-xs text-muted-foreground">
              Your payment is protected by Solana Devnet blockchain technology.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground ring-1 ring-border">
          Secured by <span className="font-black text-foreground">SOLANA DEVNET</span>
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <OrderItems product={product} qty={qty} setQty={setQty} />

          {/* Editable shipping address */}
          <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
            <h2 className="text-lg font-bold text-foreground">2. Shipping Information</h2>

            {!addressLoaded ? (
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-secondary/60 p-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Loading your address...</p>
              </div>
            ) : editingAddress ? (
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="Full Name"
                    className={inputClass}
                  />
                  <input
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="Phone (optional)"
                    className={inputClass}
                  />
                </div>
                <input
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  placeholder="Address"
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="City" className={inputClass} />
                  <input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="State" className={inputClass} />
                  <input value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} placeholder="ZIP" className={inputClass} />
                  <input value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} placeholder="Country" className={inputClass} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveAddress}
                    disabled={savingAddress}
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60"
                  >
                    {savingAddress ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                    Save Address
                  </button>
                  <button
                    onClick={() => setEditingAddress(false)}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    {hasAddress ? (
                      <>
                        <p className="flex items-center gap-2 font-bold text-foreground">
                          {address.fullName}
                          <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                            Saved
                          </span>
                        </p>
                        <p>{address.address}</p>
                        <p>
                          {address.city}{address.state ? `, ${address.state}` : ''} {address.zipCode}
                        </p>
                        <p>{address.country}</p>
                        {address.phone && <p className="mt-1 text-xs">{address.phone}</p>}
                      </>
                    ) : (
                      <p className="text-muted-foreground">No shipping address saved yet.</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setEditingAddress(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <Pencil className="h-4 w-4" /> {hasAddress ? 'Change Address' : 'Add Address'}
                </button>
              </div>
            )}

            {!editingAddress && hasAddress && (
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-secondary/60 p-4">
                <Truck className="h-5 w-5 shrink-0 text-violet-600" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Standard shipping</span> — estimated 3-5 business days
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <OrderSummary
            qty={qty}
            subtotal={subtotal}
            shippingFee={shippingFee}
            transactionFee={transactionFee}
            total={total}
            savings={savings}
            fmt={fmt}
          />
          <PaymentDetails product={product} qty={qty} total={total} fmt={fmt} />
        </div>
      </div>

      <TrustBar className="mt-6" />
    </div>
  )
}

function OrderItems({
  product,
  qty,
  setQty,
}: {
  product: Product
  qty: number
  setQty: (n: number) => void
}) {
  return (
    <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
      <h2 className="text-lg font-bold text-foreground">1. Order Items</h2>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-44 sm:w-44">
          <Image src={product.image || '/placeholder.svg'} alt={product.name} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.subtitle}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  {product.category}
                </span>
              </div>
            </div>
            <p className="shrink-0 text-lg font-black text-foreground">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Sold by</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-sm font-black text-background">
                  {product.seller.charAt(0)}
                </span>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground">{product.seller}</span>
                    <BadgeCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${tierStyles[product.tier]}`}>
                      <ShieldEllipsis className="h-3 w-3" /> {product.tier} Seller
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      <ShieldCheck className="h-3 w-3" /> Trust Score {product.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
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
              <p className="mt-2 text-xs font-semibold text-red-500">
                Only {product.inStock} left in stock
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl bg-secondary/60 p-4 sm:grid-cols-3">
        <Assurance icon={ShieldCheck} tone="text-blue-600" title="Verified Product" desc="This product is verified" />
        <Assurance icon={RefreshCw} tone="text-violet-600" title="30 Day Returns" desc="Easy returns & refunds" />
        <Assurance icon={Package} tone="text-emerald-600" title="Secure Packaging" desc="Safe & secure delivery" />
      </div>
    </section>
  )
}

function Assurance({
  icon: Icon,
  tone,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  tone: string
  title: string
  desc: string
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className={`h-6 w-6 shrink-0 ${tone}`} />
      <div className="leading-tight">
        <p className="text-sm font-bold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

function OrderSummary({
  qty,
  subtotal,
  shippingFee,
  transactionFee,
  total,
  savings,
  fmt,
}: {
  qty: number
  subtotal: number
  shippingFee: number
  transactionFee: number
  total: number
  savings: number
  fmt: (n: number) => string
}) {
  return (
    <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
      <h2 className="text-lg font-bold text-foreground">3. Order Summary</h2>

      <div className="mt-4 space-y-3 text-sm">
        <Row label={`Subtotal (${qty} item${qty > 1 ? 's' : ''})`} value={fmt(subtotal)} />
        <Row label="Shipping Fee" value={fmt(shippingFee)} info />
        <Row label="Network Fee" value={fmt(transactionFee)} info />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-base font-bold text-foreground">Total</span>
        <span className="flex items-baseline gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">USD</span>
          <span className="text-2xl font-black text-foreground">{fmt(total)}</span>
        </span>
      </div>

      {savings > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          You&apos;re saving {fmt(savings)} with secure blockchain shopping!
        </div>
      )}
    </section>
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

function PaymentDetails({
  product,
  qty,
  total,
  fmt,
}: {
  product: Product
  qty: number
  total: number
  fmt: (n: number) => string
}) {
  return (
    <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
      <h2 className="text-lg font-bold text-foreground">4. Payment Details</h2>
      <p className="mt-3 text-xs font-semibold text-muted-foreground">Pay with</p>

      <div className="mt-2 flex items-center justify-between rounded-xl p-3 ring-1 ring-border">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
            <Wallet className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-foreground">Phantom Wallet</p>
            <p className="text-xs text-muted-foreground">Devnet</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Connected
        </span>
      </div>

      <div className="mt-4 space-y-3 rounded-xl bg-secondary/60 p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Network</span>
          <span className="font-semibold text-foreground">Solana Devnet</span>
        </div>
        <div className="flex items-start justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            Network Fee (Estimated) <Info className="h-3.5 w-3.5" />
          </span>
          <span className="text-right">
            <span className="block font-semibold text-foreground">~0.000005 SOL</span>
            <span className="block text-xs text-muted-foreground">(≈ $0.001)</span>
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/60 p-4">
        <span className="text-sm font-bold text-foreground">Total Payment</span>
        <span className="text-right">
          <span className="block text-lg font-black text-foreground">{total.toFixed(2)} SOL</span>
          <span className="block text-xs text-muted-foreground">≈ {fmt(total)} USD</span>
        </span>
      </div>

      <Link
        href={`/payment?product=${product.slug}&qty=${qty}`}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-violet-600 px-4 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95"
      >
        <Lock className="h-4 w-4" /> Pay with Phantom
      </Link>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        You will be prompted to approve this transaction on Solana Devnet
      </p>
    </section>
  )
}
