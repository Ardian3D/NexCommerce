'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletNavbar } from '@/components/wallet-navbar'
import { Footer } from '@/components/footer'
import { getUserByWallet } from '@/lib/actions/auth'

const gridBackground = {
  backgroundImage:
    'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

const EASE = [0.22, 1, 0.36, 1] as const
const timeline = [
  { label: 'Submitted', done: true },
  { label: 'Pending Review', done: true, active: true },
  { label: 'Verified', done: false },
  { label: 'Identity Activated', done: false },
]

export default function PendingReviewPage() {
  const router = useRouter()
  const { publicKey } = useWallet()
  const [dots, setDots] = useState(1)

  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d % 3) + 1), 500)
    return () => clearInterval(id)
  }, [])

  // Poll setiap 10 detik — jika admin sudah approve, redirect ke identity-activated
  useEffect(() => {
    if (!publicKey) return
    const id = setInterval(async () => {
      const user = await getUserByWallet(publicKey.toBase58())
      if (user?.verificationStatus === 'approved') {
        clearInterval(id)
        router.push(`/identity-activated?role=${user.role}`)
      }
    }, 10000)
    return () => clearInterval(id)
  }, [publicKey, router])

  return (
    <div className="min-h-screen bg-foreground p-2 sm:p-3">
      <main className="relative overflow-hidden rounded-lg bg-background">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={gridBackground}
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-[calc(100vh-1rem)] flex-col">
          <WalletNavbar />

          <section className="relative flex flex-1 items-center justify-center px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="w-full max-w-xl text-center"
            >
              {/* Pulsing icon */}
              <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
                <motion.span
                  className="absolute inset-0 rounded-full bg-primary/15"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Clock className="h-9 w-9" />
                </span>
              </div>

              <span className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-primary">
                Verification In Progress
              </span>
              <h1 className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl">
                Pending
                <br />
                Review
              </h1>
              <p className="mx-auto mt-5 max-w-md font-mono text-sm leading-relaxed text-foreground/60">
                Your identity has been submitted and is now under review
                {'.'.repeat(dots)}
                <br />
                We&apos;ll notify you on-chain once your NexCommerce identity is
                verified and activated.
              </p>

              {/* Timeline */}
              <div className="mx-auto mt-10 flex max-w-lg items-center justify-between">
                {timeline.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex items-center ${i === timeline.length - 1 ? '' : 'flex-1'}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          item.active
                            ? 'bg-primary text-primary-foreground'
                            : item.done
                              ? 'bg-emerald-500 text-white'
                              : 'bg-foreground/10 text-foreground/40'
                        }`}
                      >
                        {item.done && !item.active ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : item.active ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <ShieldCheck className="h-4 w-4" />
                        )}
                      </span>
                      <span
                        className={`whitespace-nowrap text-[11px] font-semibold ${
                          item.active
                            ? 'text-primary'
                            : item.done
                              ? 'text-foreground/70'
                              : 'text-foreground/40'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {i !== timeline.length - 1 && (
                      <span
                        className={`mx-2 mb-5 h-px flex-1 ${item.done ? 'bg-emerald-500/50' : 'bg-foreground/15'}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => router.push('/')}
                className="group mx-auto mt-12 inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-foreground px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-background shadow-[5px_5px_0_0_var(--color-primary)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_var(--color-primary)]"
              >
                Back to Home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
