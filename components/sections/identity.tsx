import { Check } from 'lucide-react'
import { TierCardSlider } from './tier-card-slider'
import { Reveal, Stagger, RevealItem } from '@/components/reveal'

const features = [
  'Verified Identity',
  'Trust Score System',
  'Tier Progression',
  'Wallet Integration',
  'Permanent Reputation',
]

export function Identity() {
  return (
    <section
      id="identity"
      className="relative px-6 py-20 md:px-10 md:py-28"
    >
      {/* Top label */}
      <Reveal className="mx-auto mb-12 max-w-7xl">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border">
            <Check className="h-3 w-3 text-primary" />
          </span>
          Your Identity, Your Trust
        </span>
      </Reveal>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left — copy */}
        <Reveal direction="right">
          <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Your Digital
            <br />
            Commerce Identity
          </h2>

          <p className="mt-6 max-w-sm text-pretty font-mono text-xs leading-relaxed text-foreground/60">
            Every verified member receives a permanent NexCommerce Identity
            Card powered by blockchain technology.
          </p>

          <Stagger className="mt-10 space-y-5">
            {features.map((feature) => (
              <RevealItem
                key={feature}
                className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide text-foreground"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </span>
                {feature}
              </RevealItem>
            ))}
          </Stagger>
        </Reveal>

        {/* Right — tier card slider */}
        <Reveal direction="left" delay={0.1}>
          <TierCardSlider />
        </Reveal>
      </div>
    </section>
  )
}
