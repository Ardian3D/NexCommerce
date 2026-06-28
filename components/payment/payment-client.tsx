'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Wallet,
  Lock,
  ShieldCheck,
  Loader2,
  Check,
  Info,
  ArrowLeft,
  Zap,
} from 'lucide-react'
import { type Product } from '@/lib/products'
import { Stepper } from '@/components/checkout/stepper'
import { TrustBar } from '@/components/shared/trust-bar'
import { placeOrder } from '@/lib/actions/order'

type Status = 'idle' | 'approving' | 'confirming' | 'placing'

export function PaymentClient({ product, qty }: { product: Product; qty: number }) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const subtotal = product.price * qty
  const shippingFee = 4.99
  const transactionFee = 0.75
  const total = subtotal + shippingFee + transactionFee
  const fmt = (n: number) => `$${n.toFixed(2)}`
  const busy = status !== 'idle'

  async function handlePay() {
    setError(null)
    setStatus('approving')
    
    // Simulate wallet approval
    await new Promise((r) => setTimeout(r, 1800))
    setStatus('confirming')
    
    // Simulate blockchain confirmation
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('placing')
    
    // Actually create the order in the database
    const result = await placeOrder({ productSlug: product.slug, qty })
    
    if (result.success) {
      router.push(`/order/success?orderId=${result.orderId}`)
    } else {
      setError(result.error)
      setStatus('idle')
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header + stepper */}
      <div className="flex flex-col gap-5">
        <Stepper current={2} />
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <Wallet className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Payment</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Approve the transaction in your wallet to complete the purchase.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left: wallet approval */}
        <div className="space-y-6">
          <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
            <h2 className="text-lg font-bold text-foreground">Confirm Your Payment</h2>

            {/* Wallet */}
            <div className="mt-4 flex items-center justify-between rounded-xl p-3 ring-1 ring-border">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <Wallet className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-foreground">Phantom Wallet</p>
                  <p className="text-xs text-muted-foreground">8XH...K9P</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Connected
              </span>
            </div>

            {/* Transaction breakdown */}
            <div className="mt-4 space-y-3 rounded-xl bg-secondary/60 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Network</span>
                <span className="font-semibold text-foreground">Solana Mainnet</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  Network Fee (Estimated) <Info className="h-3.5 w-3.5" />
                </span>
                <span className="text-right">
                  <span className="block font-semibold text-foreground">~0.00025 SOL</span>
                  <span className="block text-xs text-muted-foreground">(≈ $0.05)</span>
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-bold text-foreground">Total Payment</span>
                <span className="text-right">
                  <span className="block text-base font-black text-foreground">{total.toFixed(2)} USDC</span>
                  <span className="block text-xs text-muted-foreground">≈ 0.0xxx SOL</span>
                </span>
              </div>
            </div>

            {/* Status timeline */}
            <div className="mt-4 space-y-2.5 rounded-xl border border-border p-4">
              <StatusRow
                label="Awaiting wallet approval"
                state={status === 'idle' ? 'pending' : status === 'approving' ? 'active' : 'done'}
              />
              <StatusRow
                label="Confirming on Solana blockchain"
                state={status === 'confirming' ? 'active' : status === 'idle' || status === 'approving' ? 'pending' : 'done'}
              />
              <StatusRow label="Finalizing your order" state="pending" />
            </div>

            <button
              onClick={handlePay}
              disabled={busy}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-violet-600 px-4 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {status === 'idle' && (
                <>
                  <Lock className="h-4 w-4" /> Confirm Payment
                </>
              )}
              {status === 'approving' && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Waiting for approval...
                </>
              )}
              {status === 'confirming' && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Confirming transaction...
                </>
              )}
              {status === 'placing' && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Creating your order...
                </>
              )}
            </button>

            {error && (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                {error}
              </div>
            )}

            {!busy ? (
              <Link
                href={`/checkout?product=${product.slug}&qty=${qty}`}
                className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Checkout
              </Link>
            ) : (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Please keep this window open while we process your payment.
              </p>
            )}
          </section>

          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <p className="text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Protected by Solana.</span> Your funds are held
              securely until the order is confirmed by escrow.
            </p>
          </div>
        </div>

        {/* Right: order recap */}
        <div className="space-y-6">
          <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                <Image src={product.image || '/placeholder.svg'} alt={product.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-bold text-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {qty}</p>
              </div>
              <p className="text-sm font-black text-foreground">{fmt(subtotal)}</p>
            </div>

            <div className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
              <Row label="Shipping Fee" value={fmt(shippingFee)} />
              <Row label="Transaction Fee" value={fmt(transactionFee)} />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-base font-bold text-foreground">Total</span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">USD</span>
                <span className="text-2xl font-black text-foreground">{fmt(total)}</span>
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
              <Zap className="h-4 w-4 shrink-0 text-violet-600" />
              Instant settlement on the Solana network.
            </div>
          </section>
        </div>
      </div>

      <TrustBar className="mt-6" />
    </div>
  )
}

function StatusRow({ label, state }: { label: string; state: 'pending' | 'active' | 'done' }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          state === 'done'
            ? 'bg-emerald-100 text-emerald-600'
            : state === 'active'
              ? 'bg-violet-100 text-violet-600'
              : 'bg-secondary text-muted-foreground'
        }`}
      >
        {state === 'done' ? (
          <Check className="h-3.5 w-3.5" />
        ) : state === 'active' ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}
      </span>
      <span
        className={`text-sm ${
          state === 'pending' ? 'text-muted-foreground' : 'font-semibold text-foreground'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  )
}
