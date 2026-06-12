'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { ShoppingCart, Store, BadgeCheck, ArrowRight, Check } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

type Role = {
  id: 'buyer' | 'seller'
  icon: typeof ShoppingCart
  title: string
  description: string
  features: string[]
  cta: string
  href: string
  accent: 'primary' | 'seller'
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.15 + i * 0.12 },
  }),
}

export function RoleCard({ role, index }: { role: Role; index: number }) {
  const Icon = role.icon
  const isSeller = role.accent === 'seller'

  // Scoped accent classes so each card themes itself.
  const ring = isSeller ? 'text-[var(--seller)]' : 'text-primary'
  const iconBg = isSeller ? 'bg-[var(--seller)]' : 'bg-primary'
  const iconGlow = isSeller
    ? 'shadow-[0_0_45px_-5px_var(--seller)]'
    : 'shadow-[0_0_45px_-5px_var(--primary)]'
  const iconFg = isSeller
    ? 'text-[var(--seller-foreground)]'
    : 'text-primary-foreground'
  const checkColor = isSeller ? 'text-[var(--seller)]' : 'text-primary'
  const btnBg = isSeller ? 'bg-[var(--seller)]' : 'bg-primary'
  const btnFg = isSeller
    ? 'text-[var(--seller-foreground)]'
    : 'text-primary-foreground'

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className="group relative flex flex-col rounded-[2rem] border border-foreground/15 bg-card px-7 py-10 transition-all duration-300 hover:-translate-y-2 hover:border-foreground/30 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)] md:px-9"
    >
      {/* Icon with verified badge */}
      <div className="relative mx-auto">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full ${iconBg} ${iconGlow} transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon className={`h-11 w-11 ${iconFg}`} strokeWidth={2} />
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-card bg-foreground">
          <BadgeCheck className="h-4 w-4 text-background" />
        </span>
      </div>

      {/* Title */}
      <h2
        className={`mt-7 text-center font-display text-4xl font-black uppercase tracking-tight ${ring}`}
      >
        {role.title}
      </h2>

      {/* Description */}
      <p className="mx-auto mt-4 max-w-xs text-pretty text-center font-mono text-xs leading-relaxed text-foreground/60">
        {role.description}
      </p>

      {/* Divider */}
      <div className="my-7 h-px w-full bg-foreground/10" />

      {/* Features */}
      <ul className="space-y-4">
        {role.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${checkColor}`}
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <span className="text-sm font-medium text-foreground/80">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Neobrutalist CTA */}
      <Link
        href={role.href}
        className={`group/btn mt-9 inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground ${btnBg} px-6 py-4 shadow-[5px_5px_0_0_var(--color-foreground)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_var(--color-foreground)]`}
      >
        <span
          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] ${btnFg}`}
        >
          {role.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  )
}

export const roles: Role[] = [
  {
    id: 'buyer',
    icon: ShoppingCart,
    title: 'Buyer',
    description:
      'Discover products from verified sellers and build your trusted purchasing reputation.',
    features: [
      'Shop securely from verified sellers',
      'Build your Trust Score',
      'Earn higher tiers and unlock benefits',
      'Access a global marketplace',
    ],
    cta: 'Continue as Buyer',
    href: '#',
    accent: 'primary',
  },
  {
    id: 'seller',
    icon: Store,
    title: 'Seller',
    description:
      'Launch your storefront, grow your reputation, and sell directly to verified buyers.',
    features: [
      'Create and manage your products',
      'Receive payments on-chain',
      'Build your Trust Score',
      'Unlock exclusive seller tiers',
    ],
    cta: 'Continue as Seller',
    href: '#',
    accent: 'primary',
  },
]
