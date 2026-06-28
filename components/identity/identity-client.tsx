'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ShieldCheck,
  Share2,
  ArrowLeftRight,
  CircleDollarSign,
  MessageSquareText,
  Star,
  Trophy,
  Crown,
  BadgeCheck,
  Mail,
  Wallet,
  Phone,
  IdCard,
  CheckCircle2,
  Fingerprint,
  Lock,
  Network,
  KeyRound,
  Sparkles,
  Store,
  PackageCheck,
} from 'lucide-react'
import { IdentityCard, type IdentityData } from '@/components/auth/identity-card'

type Role = 'buyer' | 'seller'

type IconType = React.ComponentType<{ className?: string }>

type Stat = { icon: IconType; label: string; value: string; note: string; tone: string }
type Breakdown = { icon: IconType; label: string; score: number; max: number; tone: string }
type Achievement = { icon: IconType; title: string; desc: string; date: string; tone: string }
type Activity = { name: string; counterparty: string; amount: string; date: string; image: string }
type Verification = { icon: IconType; title: string; desc: string; date: string }

type IdentityConfig = {
  subtitle: string
  card: {
    fullName: string
    photo: string
    wallet: string
    country: string
    memberSince: string
    trustScore: number
    tier: 'Elite' | 'Verified' | 'Trusted' | 'Legendary'
  }
  ringScore: number
  stats: Stat[]
  breakdown: Breakdown[]
  breakdownHint: string
  tierProgress: { label: string; note: string; percent: number; pointsText: string }
  achievements: Achievement[]
  activityVerbLabel: string
  activities: Activity[]
  verifications: Verification[]
  reviewsEmpty: { title: string; desc: string }
  disputesEmpty: { title: string; desc: string }
}

const principles = [
  { icon: KeyRound, title: 'You Own Your Identity', desc: 'Your data is encrypted and on-chain', tone: 'text-violet-600 bg-violet-100' },
  { icon: Lock, title: 'Privacy First', desc: 'We never sell your personal data', tone: 'text-blue-600 bg-blue-100' },
  { icon: Network, title: 'Secure & Decentralized', desc: 'Built on Solana blockchain', tone: 'text-teal-600 bg-teal-100' },
  { icon: Fingerprint, title: "You're in Control", desc: 'Share only what you choose', tone: 'text-amber-600 bg-amber-100' },
]

const buyerConfig: IdentityConfig = {
  subtitle: 'Your on-chain identity and trust reputation across NexCommerce.',
  card: {
    fullName: 'Aim Labs',
    photo: '/phantom-navbar-logo.png',
    wallet: '8XH...K9P',
    country: 'Solana Network',
    memberSince: 'May 2024',
    trustScore: 92,
    tier: 'Elite',
  },
  ringScore: 92,
  stats: [
    { icon: ArrowLeftRight, label: 'Total Transactions', value: '48', note: '+12 this month', tone: 'text-emerald-600 bg-emerald-100' },
    { icon: CircleDollarSign, label: 'Total Spent', value: '$1,115.70', note: 'Across 24 orders', tone: 'text-blue-600 bg-blue-100' },
    { icon: MessageSquareText, label: 'Verified Reviews', value: '18', note: '100% positive', tone: 'text-violet-600 bg-violet-100' },
    { icon: Star, label: 'Member Level', value: 'Elite', note: 'Top 10% of users', tone: 'text-amber-600 bg-amber-100' },
  ],
  breakdown: [
    { icon: ShieldCheck, label: 'Identity Verification', score: 25, max: 25, tone: 'text-violet-600' },
    { icon: ArrowLeftRight, label: 'Transaction History', score: 23, max: 25, tone: 'text-emerald-600' },
    { icon: Star, label: 'Positive Reviews', score: 20, max: 25, tone: 'text-amber-600' },
    { icon: Sparkles, label: 'Account Activity', score: 12, max: 15, tone: 'text-blue-600' },
    { icon: ShieldCheck, label: 'Dispute Record', score: 12, max: 10, tone: 'text-emerald-600' },
  ],
  breakdownHint: 'Keep up the great work! Maintain your positive activity to reach Legendary tier.',
  tierProgress: { label: 'Elite', note: 'Top 10% of users', percent: 78, pointsText: '2,350 / 3,000' },
  achievements: [
    { icon: Sparkles, title: 'Early Adopter', desc: 'Joined NexCommerce early', date: 'May 2024', tone: 'text-violet-600 bg-violet-100' },
    { icon: BadgeCheck, title: 'Trusted Buyer', desc: 'Completed 10+ orders', date: 'Apr 2024', tone: 'text-blue-600 bg-blue-100' },
    { icon: Trophy, title: 'Review Master', desc: 'Left 10+ positive reviews', date: 'Mar 2024', tone: 'text-amber-600 bg-amber-100' },
    { icon: CircleDollarSign, title: 'Top Spender', desc: 'Spent over $1,000', date: 'May 2024', tone: 'text-teal-600 bg-teal-100' },
  ],
  activityVerbLabel: 'From',
  activities: [
    { name: 'Purchased Logitech G Pro X Superlight 2', counterparty: 'Aim Labs Store', amount: '- $155.73 USDC', date: 'May 24, 2025', image: '/store/product-mouse.png' },
    { name: 'Purchased Apple AirPods Pro 2nd Gen', counterparty: 'Tech Haven', amount: '- $189.99 USDC', date: 'May 23, 2025', image: '/market/airpods.png' },
    { name: 'Purchased Keychron K8 Pro Keyboard', counterparty: 'NextGen Store', amount: '- $89.99 USDC', date: 'May 22, 2025', image: '/market/keyboard.png' },
    { name: 'Purchased LG UltraGear 27" Monitor', counterparty: 'Elite Gear Store', amount: '- $229.99 USDC', date: 'May 21, 2025', image: '/market/monitor.png' },
    { name: 'Purchased Secretlab Titan Evo 2022', counterparty: 'Game On Store', amount: '- $449.99 USDC', date: 'May 20, 2025', image: '/market/chair.png' },
  ],
  verifications: [
    { icon: Mail, title: 'Email Verified', desc: 'yourname@email.com', date: 'May 10, 2024' },
    { icon: Wallet, title: 'Wallet Verified', desc: '8XH...K9P (Solana)', date: 'May 10, 2024' },
    { icon: Phone, title: 'Phone Verified', desc: '+1 (•••) •••-1234', date: 'May 11, 2024' },
    { icon: IdCard, title: 'KYC Verified', desc: 'Identity document verified', date: 'May 12, 2024' },
  ],
  reviewsEmpty: { title: '18 verified reviews', desc: 'All your reviews are 100% positive and verified on-chain.' },
  disputesEmpty: { title: 'No active disputes', desc: 'You have a clean dispute record. Keep it up!' },
}

const sellerConfig: IdentityConfig = {
  subtitle: 'Your on-chain seller identity and trust reputation across NexCommerce.',
  card: {
    fullName: 'Aim Labs Store',
    photo: '/phantom-navbar-logo.png',
    wallet: '8XH...K9P',
    country: 'Solana Network',
    memberSince: 'May 2024',
    trustScore: 96,
    tier: 'Elite',
  },
  ringScore: 96,
  stats: [
    { icon: PackageCheck, label: 'Total Sales', value: '248', note: '+18 this month', tone: 'text-emerald-600 bg-emerald-100' },
    { icon: CircleDollarSign, label: 'Total Revenue', value: '$5,689.70', note: 'Across 24 orders', tone: 'text-blue-600 bg-blue-100' },
    { icon: Star, label: 'Seller Rating', value: '4.9', note: '320 verified reviews', tone: 'text-violet-600 bg-violet-100' },
    { icon: Trophy, label: 'Seller Level', value: 'Elite', note: 'Top 10% of sellers', tone: 'text-amber-600 bg-amber-100' },
  ],
  breakdown: [
    { icon: ShieldCheck, label: 'Identity Verification', score: 25, max: 25, tone: 'text-violet-600' },
    { icon: PackageCheck, label: 'Order Fulfillment', score: 24, max: 25, tone: 'text-emerald-600' },
    { icon: Star, label: 'Positive Reviews', score: 22, max: 25, tone: 'text-amber-600' },
    { icon: Store, label: 'Store Activity', score: 13, max: 15, tone: 'text-blue-600' },
    { icon: ShieldCheck, label: 'Dispute Record', score: 12, max: 10, tone: 'text-emerald-600' },
  ],
  breakdownHint: 'Excellent seller reputation! Keep fulfilling orders on time to reach Legendary tier.',
  tierProgress: { label: 'Elite', note: 'Top 10% of sellers', percent: 90, pointsText: '2,700 / 3,000' },
  achievements: [
    { icon: Sparkles, title: 'Early Seller', desc: 'Among the first stores on NexCommerce', date: 'May 2024', tone: 'text-violet-600 bg-violet-100' },
    { icon: BadgeCheck, title: 'Verified Seller', desc: 'Identity & business verified', date: 'Apr 2024', tone: 'text-blue-600 bg-blue-100' },
    { icon: Trophy, title: 'Top Seller', desc: 'Ranked top 10% by sales', date: 'Mar 2024', tone: 'text-amber-600 bg-amber-100' },
    { icon: CircleDollarSign, title: 'Revenue Milestone', desc: 'Earned over $5,000', date: 'May 2024', tone: 'text-teal-600 bg-teal-100' },
  ],
  activityVerbLabel: 'To',
  activities: [
    { name: 'Sold Logitech G Pro X Superlight 2', counterparty: 'PhantomUser', amount: '+ $149.99 USDC', date: 'May 24, 2025', image: '/store/product-mouse.png' },
    { name: 'Sold Apple AirPods Pro 2nd Gen', counterparty: 'SolanaTrader', amount: '+ $189.99 USDC', date: 'May 23, 2025', image: '/market/airpods.png' },
    { name: 'Sold Keychron K8 Pro Keyboard', counterparty: 'Web3Gamer', amount: '+ $89.99 USDC', date: 'May 22, 2025', image: '/market/keyboard.png' },
    { name: 'Sold LG UltraGear 27" Monitor', counterparty: 'DefiHunter', amount: '+ $229.99 USDC', date: 'May 21, 2025', image: '/market/monitor.png' },
    { name: 'Sold Secretlab Titan Evo 2022', counterparty: 'NFTCollector', amount: '+ $449.99 USDC', date: 'May 20, 2025', image: '/market/chair.png' },
  ],
  verifications: [
    { icon: Mail, title: 'Email Verified', desc: 'store@aimlabs.io', date: 'May 10, 2024' },
    { icon: Wallet, title: 'Wallet Verified', desc: '8XH...K9P (Solana)', date: 'May 10, 2024' },
    { icon: Phone, title: 'Phone Verified', desc: '+1 (•••) •••-1234', date: 'May 11, 2024' },
    { icon: IdCard, title: 'Business KYC Verified', desc: 'Business documents verified', date: 'May 12, 2024' },
  ],
  reviewsEmpty: { title: '320 verified reviews', desc: 'Your store maintains a 4.9 rating from verified buyers.' },
  disputesEmpty: { title: 'No active disputes', desc: 'Your store has a clean dispute record. Keep it up!' },
}

const activityTabs = ['Transactions', 'Reviews', 'Disputes', 'Verifications'] as const
type ActivityTab = (typeof activityTabs)[number]

export function IdentityClient({
  role = 'buyer',
  cardData,
}: {
  role?: Role
  cardData?: Partial<IdentityData>
}) {
  const [tab, setTab] = useState<ActivityTab>('Transactions')
  const cfg = role === 'seller' ? sellerConfig : buyerConfig

  // Merge card data: props override > hardcoded config
  const card = { ...cfg.card, ...cardData }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">My Identity</h1>
            <p className="mt-1 text-sm text-muted-foreground">{cfg.subtitle}</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary">
          <Share2 className="h-4 w-4" /> Share Identity
        </button>
      </div>

      {/* Identity card (reused component) */}
      <div className="mt-5 w-full max-w-xl rounded-2xl border border-border bg-card p-4 sm:p-5">
        <IdentityCard
          role={role}
          fullName={card.fullName}
          photo={card.photo}
          wallet={card.wallet}
          country={card.country}
          memberSince={card.memberSince}
          trustScore={card.trustScore}
          tier={card.tier}
        />
      </div>

      {/* Stat cards */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cfg.stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${s.tone}`}>
              <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <p className="mt-3 text-xs font-medium text-muted-foreground">{s.label}</p>
            <p className="mt-0.5 text-xl font-bold text-foreground sm:text-2xl">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Trust score + tier/achievements/verification */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Trust Score Breakdown */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">Trust Score Breakdown</h2>
          <p className="text-sm text-muted-foreground">Learn how your score is calculated</p>

          <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <ScoreRing score={cfg.ringScore} />
            <div className="flex-1 space-y-3">
              {cfg.breakdown.map((b) => (
                <div key={b.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <b.icon className={`h-4 w-4 ${b.tone}`} />
                      {b.label}
                    </span>
                    <span className="font-semibold text-muted-foreground">
                      {b.score} / {b.max}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                      style={{ width: `${Math.min(100, (b.score / b.max) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-xl bg-violet-50 p-4 text-sm text-violet-700">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{cfg.breakdownHint}</p>
          </div>
        </div>

        {/* Right stack: tier progress + achievements + verification */}
        <div className="space-y-5">
          {/* Tier Progress */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-foreground">Tier Progress</h2>
            <p className="text-sm text-muted-foreground">Your progress to the next tier</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 text-white">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <p className="text-base font-bold text-foreground">{cfg.tierProgress.label}</p>
                <p className="text-xs text-muted-foreground">{cfg.tierProgress.note}</p>
              </div>
            </div>
            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                style={{ width: `${cfg.tierProgress.percent}%` }}
              />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{cfg.tierProgress.pointsText}</span> points to Legendary
              <Crown className="h-4 w-4 text-amber-500" />
            </p>
          </div>

          {/* Achievements */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Achievements</h2>
                <p className="text-sm text-muted-foreground">Badges you&apos;ve earned</p>
              </div>
              <button className="text-sm font-semibold text-primary hover:underline">View All</button>
            </div>
            <div className="mt-4 space-y-3">
              {cfg.achievements.map((a) => (
                <div key={a.title} className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.tone}`}>
                    <a.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {a.date}
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Status */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-foreground">Verification Status</h2>
              <span className="text-xs font-medium text-emerald-600">All verifications completed</span>
            </div>
            <div className="mt-4 space-y-4">
              {cfg.verifications.map((v) => (
                <div key={v.title} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{v.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{v.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{v.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity & History */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Activity &amp; History</h2>
          <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary">
            View All
          </button>
        </div>

        <div className="mt-4 flex gap-5 overflow-x-auto border-b border-border">
          {activityTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative -mb-px whitespace-nowrap pb-3 text-sm font-semibold transition-colors ${
                tab === t ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
              {tab === t ? (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {tab === 'Transactions' && (
            <ul className="divide-y divide-border">
              {cfg.activities.map((t) => (
                <li key={t.name} className="flex items-center gap-3 py-3">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image src={t.image || '/placeholder.svg'} alt={t.name} fill className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                      {cfg.activityVerbLabel} {t.counterparty} <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="whitespace-nowrap text-xs font-semibold text-foreground sm:text-sm">{t.amount}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                  <span className="ml-2 hidden rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 lg:inline">
                    Completed
                  </span>
                </li>
              ))}
            </ul>
          )}

          {tab === 'Reviews' && (
            <EmptyState icon={Star} title={cfg.reviewsEmpty.title} desc={cfg.reviewsEmpty.desc} />
          )}
          {tab === 'Disputes' && (
            <EmptyState icon={ShieldCheck} title={cfg.disputesEmpty.title} desc={cfg.disputesEmpty.desc} />
          )}
          {tab === 'Verifications' && (
            <ul className="divide-y divide-border">
              {cfg.verifications.map((v) => (
                <li key={v.title} className="flex items-center gap-3 py-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{v.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{v.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{v.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Principles / trust bar */}
      <div className="mt-6 grid grid-cols-1 gap-5 rounded-2xl bg-secondary/40 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p) => (
          <div key={p.title} className="flex items-start gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${p.tone}`}>
              <p.icon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-foreground">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--secondary)" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{score}</span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}

function EmptyState({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="max-w-xs text-xs text-muted-foreground">{desc}</p>
    </div>
  )
}
