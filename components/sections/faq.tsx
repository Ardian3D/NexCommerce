'use client'

import { useState } from 'react'
import { Sparkle } from '@/components/sparkle'
import { Plus } from 'lucide-react'

const faqs = [
  'Does NexCommerce hold my funds?',
  'What happens if my application is rejected?',
  'Who controls my wallet?',
  'How do I become verified?',
  'Why do I need verification?',
  'How are disputes resolved?',
  'How do tiers work?',
  'What payment methods are supported?',
  'Is NexCommerce available worldwide?',
  'How do I contact support?',
]

export function Faq() {
  const [active, setActive] = useState<number>(0)

  // Split into two columns
  const left = faqs.filter((_, i) => i % 2 === 0)
  const right = faqs.filter((_, i) => i % 2 === 1)

  return (
    <section
      id="faq"
      className="relative border-t border-border px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <span className="inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border">
            <Sparkle className="h-3 w-3 text-foreground" />
          </span>
          FAQ
        </span>

        {/* Heading */}
        <h2 className="mt-8 text-center font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center font-mono text-xs leading-relaxed text-foreground/60">
          Find answers to the most common questions about identity
          verification, wallet ownership, trust scores, and peer-to-peer
          commerce on NexCommerce.
        </p>

        {/* Two-column pills */}
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            {left.map((q, i) => (
              <FaqPill
                key={q}
                question={q}
                index={i * 2}
                active={active === i * 2}
                onClick={setActive}
              />
            ))}
          </div>
          <div className="space-y-4">
            {right.map((q, i) => (
              <FaqPill
                key={q}
                question={q}
                index={i * 2 + 1}
                active={active === i * 2 + 1}
                onClick={setActive}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqPill({
  question,
  index,
  active,
  onClick,
}: {
  question: string
  index: number
  active: boolean
  onClick: (i: number) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      aria-pressed={active}
      className={`flex w-full items-center justify-between gap-4 rounded-full border px-6 py-4 text-left transition-all duration-300 ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-foreground/20 bg-card text-foreground hover:border-primary/50'
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-wide">
        {question}
      </span>
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
          active ? 'bg-white/20 text-primary-foreground' : 'bg-foreground/5 text-foreground'
        }`}
      >
        <Plus className="h-4 w-4" />
      </span>
    </button>
  )
}
