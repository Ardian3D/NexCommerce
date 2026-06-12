'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkle } from '@/components/sparkle'
import { Plus } from 'lucide-react'
import { Reveal, Stagger, RevealItem } from '@/components/reveal'

const faqs = [
  {
    q: 'Does NexCommerce hold my funds?',
    a: 'No. NexCommerce is fully non-custodial. Your funds always remain in your own wallet, and transactions happen directly between buyer and seller.',
  },
  {
    q: 'Who controls my wallet?',
    a: 'You do, completely. Your wallet, private keys, and funds are 100% yours. We never store, access, or have visibility into your private keys.',
  },
  {
    q: 'How do I become verified?',
    a: 'Create an account, submit your identity information for review, and our team will verify your details. Once approved, you receive your permanent NexCommerce Identity Card.',
  },
  {
    q: 'Why do I need verification?',
    a: 'Verification builds trust across the marketplace. It protects both buyers and sellers, reduces fraud, and unlocks higher tiers with more benefits.',
  },
  {
    q: 'How do tiers work?',
    a: 'Tiers grow with your activity. By increasing your transaction volume and maintaining a high trust score, you progress from Starter to Ascent to Elite.',
  },
  {
    q: 'How are disputes resolved?',
    a: 'Disputes are handled through transparent, on-chain records and a dedicated resolution team that reviews transaction history and member reputation.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'NexCommerce supports peer-to-peer crypto transactions, giving you fast, borderless, and low-fee payments without intermediaries.',
  },
  {
    q: 'Is NexCommerce available worldwide?',
    a: 'Yes. As a decentralized, peer-to-peer marketplace, NexCommerce is accessible to verified members across the globe.',
  },
]

export function Faq() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        {/* Label */}
        <Reveal className="flex justify-center">
          <span className="inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border">
              <Sparkle className="h-3 w-3 text-foreground" />
            </span>
            FAQ
          </span>
        </Reveal>

        {/* Heading */}
        <Reveal className="text-center" delay={0.05}>
          <h2 className="mt-8 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-mono text-xs leading-relaxed text-foreground/60">
            Find answers to the most common questions about identity
            verification, wallet ownership, trust scores, and peer-to-peer
            commerce on NexCommerce.
          </p>
        </Reveal>

        {/* Accordion */}
        <Stagger className="mt-14 space-y-3">
          {faqs.map((faq, i) => (
            <RevealItem key={faq.q}>
              <FaqItem
                question={faq.q}
                answer={faq.a}
                open={active === i}
                onClick={() => setActive(active === i ? null : i)}
              />
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

function FaqItem({
  question,
  answer,
  open,
  onClick,
}: {
  question: string
  answer: string
  open: boolean
  onClick: () => void
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
        open ? 'border-primary/50 bg-card' : 'border-foreground/15 bg-card'
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-bold uppercase tracking-wide text-foreground">
          {question}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open
              ? 'rotate-45 bg-primary text-primary-foreground'
              : 'bg-foreground/5 text-foreground'
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-5 font-mono text-xs leading-relaxed text-foreground/60">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
