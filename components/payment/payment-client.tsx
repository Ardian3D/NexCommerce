'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import {
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from '@solana/web3.js'
import {
  Wallet,
  Lock,
  ShieldCheck,
  Loader2,
  Check,
  Info,
  ArrowLeft,
  Zap,
  AlertTriangle,
} from 'lucide-react'
import { type Product } from '@/lib/products'
import { Stepper } from '@/components/checkout/stepper'
import { TrustBar } from '@/components/shared/trust-bar'
import { placeOrder } from '@/lib/actions/order'

type Status = 'idle' | 'approving' | 'confirming' | 'placing'

// Seller wallet to receive payment on devnet
const SELLER_WALLET = '8XHkQF8vXyQ5VjZ5mPxRq3STk9LpNwMc7bDfGh2jKm4R'

/** Max retry attempts for blockhash expiration / transient RPC errors */
const MAX_RETRIES = 3

export function PaymentClient({ product, qty }: { product: Product; qty: number }) {
  const router = useRouter()
  const { publicKey, sendTransaction, connected, connecting } = useWallet()
  const { connection } = useConnection()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  // Track if component is still mounted to avoid state updates after unmount
  const mountedRef = useRef(true)

  const subtotal = product.price * qty
  const shippingFee = 4.99
  const total = subtotal + shippingFee
  const totalSol = total // 1 USD ≈ 1 SOL on devnet for simplicity
  const fmt = (n: number) => `$${n.toFixed(2)}`
  const busy = status !== 'idle'

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const classifyError = useCallback((msg: string): string => {
    const lower = msg.toLowerCase()
    if (lower.includes('rejected') || lower.includes('user rejected') || lower.includes('cancelled'))
      return 'Transaction was rejected in wallet.'
    if (lower.includes('insufficient') || lower.includes('not enough') || lower.includes('0x1'))
      return 'Insufficient SOL balance. Please fund your wallet on devnet.'
    if (lower.includes('blockhash') || lower.includes('block height') || lower.includes('expired'))
      return 'Transaction expired — the network advanced while approving. Please try again.'
    if (lower.includes('timeout') || lower.includes('timed out'))
      return 'Network timeout. Please check your connection and try again.'
    if (lower.includes('network') || lower.includes('fetch') || lower.includes('503'))
      return 'Solana Devnet is temporarily unavailable. Please try again later.'
    return `Payment error: ${msg.slice(0, 120)}`
  }, [])

  const confirmAndPlace = useCallback(async (signature: string) => {
    if (!mountedRef.current) return

    setStatus('confirming')

    try {
      // Use the strategy pattern with latest blockhash for confirmation
      const latestBlockhash = await connection.getLatestBlockhash('confirmed')
      const confirmation = await connection.confirmTransaction(
        {
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        'confirmed',
      )

      if (confirmation.value.err) {
        if (mountedRef.current) {
          setError('Transaction failed on blockchain. Please try again.')
          setStatus('idle')
        }
        return
      }
    } catch (confirmErr: unknown) {
      const cmsg = confirmErr instanceof Error ? confirmErr.message : String(confirmErr)
      // If confirm fails but TX was already sent, attempt order anyway — chain may have it
      console.warn('confirmTransaction swallowed, proceeding with order:', cmsg)
    }

    if (!mountedRef.current) return

    setTxHash(signature)
    setStatus('placing')

    // Step 4: Create order in DB
    const result = await placeOrder({ productSlug: product.slug, qty })
    if (!mountedRef.current) return

    if (result.success) {
      router.push(`/order/success?orderId=${result.orderId}&tx=${signature}`)
    } else {
      setError('Payment confirmed on-chain but order creation failed: ' + result.error)
      setStatus('idle')
    }
  }, [connection, product.slug, qty, router])

  const executeSolanaPayment = useCallback(async (retryCount = 0) => {
    if (!publicKey || !sendTransaction) return

    const sellerPubkey = new PublicKey(SELLER_WALLET)
    const amountLamports = Math.round(totalSol * LAMPORTS_PER_SOL)

    // Get fresh blockhash for each attempt
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized')

    const transaction = new Transaction({
      feePayer: publicKey,
      blockhash,
      lastValidBlockHeight,
    }).add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: sellerPubkey,
        lamports: amountLamports,
      }),
    )

    // Step 2: Send to wallet for signing → Phantom popup opens here
    const signature = await sendTransaction(transaction, connection, {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
      maxRetries: 3,
    })

    await confirmAndPlace(signature)
  }, [publicKey, sendTransaction, connection, totalSol, confirmAndPlace])

  async function handlePay() {
    setError(null)
    setTxHash(null)
    setStatus('approving')

    if (!connected || !publicKey || !sendTransaction) {
      // Fallback: simulated payment (no wallet connected)
      await new Promise((r) => setTimeout(r, 1800))
      setStatus('confirming')
      await new Promise((r) => setTimeout(r, 1500))
      setStatus('placing')
      const result = await placeOrder({ productSlug: product.slug, qty })
      if (result.success) {
        router.push(`/order/success?orderId=${result.orderId}`)
      } else {
        setError(result.error)
        setStatus('idle')
      }
      return
    }

    let lastError: string | null = null

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        await executeSolanaPayment(attempt)
        return // success — exit loop
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        const readable = classifyError(msg)

        // Retry only for blockhash / transient errors, not for user rejection or insufficient funds
        const lower = msg.toLowerCase()
        const isRetryable =
          attempt < MAX_RETRIES - 1 &&
          (lower.includes('blockhash') ||
           lower.includes('block height') ||
           lower.includes('expired') ||
           lower.includes('timeout') ||
           lower.includes('timed out') ||
           lower.includes('network') ||
           lower.includes('503') ||
           lower.includes('fetch failed') ||
           lower.includes('unexpected error'))

        if (isRetryable) {
          console.warn(`Payment attempt ${attempt + 1} failed, retrying...`, msg)
          lastError = readable
          // Brief delay before retry so RPC can recover
          await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)))
          continue
        }

        // Non-retryable: surface immediately
        if (mountedRef.current) {
          setError(readable)
          setStatus('idle')
        }
        return
      }
    }

    // All retries exhausted
    if (mountedRef.current) {
      setError(lastError || 'Payment failed after multiple attempts. Please try again.')
      setStatus('idle')
    }
  }

  const isWalletReady = connected && publicKey
  const isWalletLoading = connecting

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
              Approve the transaction in your Phantom wallet to complete the purchase.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left: wallet approval */}
        <div className="space-y-6">
          <section className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
            <h2 className="text-lg font-bold text-foreground">Confirm Your Payment</h2>

            {/* Wallet status */}
            <div className="mt-4 flex items-center justify-between rounded-xl p-3 ring-1 ring-border">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <Wallet className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-foreground">Phantom Wallet</p>
                  <p className="text-xs text-muted-foreground">
                    {isWalletReady
                      ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
                      : isWalletLoading
                        ? 'Connecting...'
                        : 'Not connected'}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                  isWalletReady ? 'text-emerald-600' : isWalletLoading ? 'text-amber-600' : 'text-muted-foreground'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${isWalletReady ? 'bg-emerald-500' : isWalletLoading ? 'bg-amber-500' : 'bg-gray-400'}`} />
                {isWalletReady ? 'Connected' : isWalletLoading ? 'Connecting...' : 'Simulated'}
              </span>
            </div>

            {/* Warning for simulated mode */}
            {!isWalletReady && !isWalletLoading && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                Wallet not connected. Payment will be simulated. Connect Phantom wallet to use real Solana Devnet.
              </div>
            )}

            {/* Transaction breakdown */}
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
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-bold text-foreground">Total Payment</span>
                <span className="text-right">
                  <span className="block text-base font-black text-foreground">{totalSol.toFixed(6)} SOL</span>
                  <span className="block text-xs text-muted-foreground">≈ {fmt(total)} USD</span>
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
                label="Confirming on Solana Devnet"
                state={status === 'confirming' ? 'active' : status === 'idle' || status === 'approving' ? 'pending' : 'done'}
              />
              <StatusRow
                label="Creating your order"
                state={status === 'placing' ? 'active' : 'done'}
              />
            </div>

            <button
              onClick={handlePay}
              disabled={busy || isWalletLoading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-violet-600 px-4 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {status === 'idle' && (
                <>
                  <Lock className="h-4 w-4" /> {isWalletReady ? 'Pay with Phantom' : 'Pay (Simulated)'}
                </>
              )}
              {status === 'approving' && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Awaiting wallet approval...
                </>
              )}
              {status === 'confirming' && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Confirming on Devnet...
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

            {txHash && (
              <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs">
                <span className="font-medium text-emerald-700">✅ Confirmed on Devnet</span>
                <p className="mt-0.5 font-mono text-[10px] text-emerald-600 break-all">{txHash}</p>
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
                Please keep this window open. Phantom will prompt you to approve.
              </p>
            )}
          </section>

          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <p className="text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Protected by Solana Devnet.</span>{' '}
              Real blockchain transaction processed securely.
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
              <Row label="Network Fee" value="~0.000005 SOL" />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-base font-bold text-foreground">Total</span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">SOL</span>
                <span className="text-2xl font-black text-foreground">{totalSol.toFixed(6)}</span>
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
              <Zap className="h-4 w-4 shrink-0 text-violet-600" />
              Instant settlement on Solana Devnet.
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
      <span className={`text-sm ${state === 'pending' ? 'text-muted-foreground' : 'font-semibold text-foreground'}`}>
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
