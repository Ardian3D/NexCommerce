'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  CheckCircle2,
  ArrowRight,
  Store,
  Package,
  TrendingUp,
  Bot,
  ShieldCheck,
  IdCard,
} from 'lucide-react'
import { WalletNavbar } from '@/components/wallet-navbar'
import { Footer } from '@/components/footer'
import { IdentityCard } from '@/components/auth/identity-card'
import { ConfettiBurst } from '@/components/auth/confetti-burst'

const gridBackground = {
  backgroundImage:
    'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

const EASE = [0.22, 1, 0.36, 1] as const
const WALLET = '8XH...K9P'

const timeline = [
  { label: 'Submitted', date: '10 May 2025', state: 'done' as const },
  { label: 'Under Review', date: '12 May 2025', state: 'done' as const },
  { label: 'Verified', date: '13 May 2025', state: 'current' as const },
  { label: 'Marketplace Access', date: '', state: 'next' as const, badge: '4' },
]

export default function IdentityActivatedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ActivatedContent />
    </Suspense>
  )
}

function ActivatedContent() {
  const params = useSearchParams()
  const role = params.get('role') === 'seller' ? 'seller' : 'buyer'
  const isSeller = role === 'seller'
  const dashboardLabel = isSeller ? 'Go to Seller Dashboard' : 'Go to Buyer Dashboard'

  return (
    <div className="min-h-screen bg-foreground p-2 sm:p-3">
      <main className="relative overflow-hidden rounded-lg bg-background">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={gridBackground}
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-[calc(100vh-1rem)] flex-col">
          <WalletNavbar address={WALLET} />

          <section className="relative px-6 pb-16 pt-8 md:px-10">
            <ConfettiBurst />

            <div className="relative mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Left column */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  <BadgeCheck className="h-4 w-4" />
                  Verification Complete
                </span>

                <h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl">
                  Congratulations!
                  <br />
                  <span className="text-primary">You Are Verified</span>
                </h1>

                <p className="mt-5 max-w-md text-pretty font-mono text-sm leading-relaxed text-foreground/60">
                  Your identity has been verified. You are now part of the
                  NexCommerce community. Start building your store, list your
                  products, and grow your reputation.
                </p>

                {/* Timeline */}
                <div className="mt-8 rounded-2xl border border-border bg-card/60 p-6">
                  <div className="flex items-start justify-between">
                    {timeline.map((item, i) => (
                      <div
                        key={item.label}
                        className={`flex items-start ${i === timeline.length - 1 ? '' : 'flex-1'}`}
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                              item.state === 'current'
                                ? 'bg-primary text-primary-foreground'
                                : item.state === 'done'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-foreground/10 text-foreground/40'
                            }`}
                          >
                            {item.state === 'next' ? (
                              item.badge
                            ) : (
                              <CheckCircle2 className="h-5 w-5" />
                            )}
                          </span>
                          <span className="text-xs font-bold text-foreground">
                            {item.label}
                          </span>
                          {item.date ? (
                            <span
                              className={`text-[11px] font-medium ${item.state === 'current' ? 'text-primary' : 'text-foreground/45'}`}
                            >
                              {item.date}
                            </span>
                          ) : null}
                        </div>
                        {i !== timeline.length - 1 && (
                          <ArrowRight className="mt-2.5 h-4 w-4 shrink-0 text-foreground/25" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 space-y-3">
                  <Link
                    href={isSeller ? '/seller/dashboard' : '/buyer/dashboard'}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-200 hover:brightness-110"
                  >
                    {dashboardLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href={isSeller ? '/seller/identity' : '/identity'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-border bg-card px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary/50"
                  >
                    View My Identity Card
                    <IdCard className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Right column */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
                className="lg:pt-2"
              >
                <IdentityCard
                  role={role}
                  fullName={isSeller ? 'Aim Labs' : 'Jessica Hartono'}
                  photo={null}
                  wallet="3xTc...RLp2"
                  country="Indonesia"
                  memberSince="May 13, 2025"
                  trustScore={60}
                  tier="Starter"
                />

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-5">
                  <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-foreground/70">
                    Your identity is now active on NexCommerce.{' '}
                    {isSeller
                      ? 'You can start listing products and selling to verified buyers.'
                      : 'You can start shopping and trading with verified sellers.'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* What's next */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="relative mx-auto mt-16 max-w-7xl"
            >
              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
                What&apos;s Next?
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {whatsNext(isSeller).map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${card.tint}1a`, color: card.tint }}
                    >
                      <card.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                      {card.desc}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      {card.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                ))}
              </div>

              {/* Security banner */}
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-6 py-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-foreground/70">
                  <span className="font-bold text-foreground">Security First:</span>{' '}
                  Your funds and transactions are always secured on-chain.
                  NexCommerce never holds your assets.
                </p>
              </div>
            </motion.div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}

function whatsNext(isSeller: boolean) {
  return [
    {
      icon: Store,
      tint: '#7c3aed',
      title: isSeller ? 'Set Up Your Store' : 'Complete Your Profile',
      desc: isSeller
        ? 'Create your store profile and upload your brand assets.'
        : 'Add your details and personalize your buyer profile.',
      cta: isSeller ? 'Go to Store Settings' : 'Go to Profile',
    },
    {
      icon: Package,
      tint: '#22c55e',
      title: isSeller ? 'List Your Products' : 'Explore Products',
      desc: isSeller
        ? 'Add your products and let AI help you optimize them.'
        : 'Browse verified listings from trusted sellers.',
      cta: isSeller ? 'Create a Listing' : 'Browse Marketplace',
    },
    {
      icon: TrendingUp,
      tint: '#f59e0b',
      title: 'Boost Your Reputation',
      desc: isSeller
        ? 'Deliver great products and grow your Trust Score.'
        : 'Trade safely and grow your Trust Score.',
      cta: 'Learn More',
    },
    {
      icon: Bot,
      tint: '#2563eb',
      title: 'Try Nex AI Assistant',
      desc: 'Get AI-powered suggestions to grow your business.',
      cta: 'Ask Nex AI',
    },
  ]
}
