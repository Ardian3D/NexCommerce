import { Sparkle } from '@/components/sparkle'
import { ShieldCheck, Crown, Wallet } from 'lucide-react'
import { Reveal, Stagger, RevealItem } from '@/components/reveal'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Trust Score',
    desc: 'Every member has a trust score based on their activity, reviews, and transaction history.',
  },
  {
    icon: Crown,
    title: 'Tier System',
    desc: 'Grow your tier by increasing your volume and maintaining a high trust score.',
  },
  {
    icon: Wallet,
    title: 'You Own Your Wallet',
    desc: 'Your wallet, keys, and funds are 100% yours. We never store or access your private keys.',
  },
]

export function BuildOnTrust() {
  return (
    <section id="trust" className="relative px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Label — left aligned */}
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border">
              <Sparkle className="h-3 w-3 text-foreground" />
            </span>
            Trust Is Our Foundation
          </span>
        </Reveal>

        {/* Heading — centered */}
        <Reveal className="mt-10 text-center" delay={0.05}>
          <h2 className="font-display text-6xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl md:text-8xl">
            Build On Trust
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-mono text-sm leading-relaxed text-foreground/60">
            Every verified member earns reputation through real activity,
            transparent transactions, and community trust creating a safer
            marketplace for buyers and sellers worldwide.
          </p>
        </Reveal>

        {/* Cards */}
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <RevealItem
              key={title}
              className="group flex flex-col items-center rounded-[1.75rem] border border-foreground/15 bg-card px-8 py-12 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_24px_50px_-24px_rgba(37,99,235,0.4)]"
            >
              <Icon
                className="h-14 w-14 text-primary transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <h3 className="mt-8 font-display text-2xl font-black uppercase tracking-wide text-foreground">
                {title}
              </h3>
              <p className="mt-4 font-mono text-xs leading-relaxed text-foreground/60">
                {desc}
              </p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
