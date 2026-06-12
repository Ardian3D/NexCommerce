import { Sparkle } from '@/components/sparkle'
import { Reveal } from '@/components/reveal'

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative px-6 pb-16 pt-12 md:px-10 md:pb-20"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
        {/* Left — heading + label */}
        <Reveal direction="right">
          <h2 className="font-display text-6xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl md:text-8xl">
            How It Works
          </h2>

          <span className="mt-6 inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border">
              <Sparkle className="h-3 w-3 text-foreground" />
            </span>
            Simple Process, Powerful Trust
          </span>
        </Reveal>

        {/* Right — paragraph */}
        <Reveal direction="left" delay={0.1}>
          <p className="font-mono text-sm leading-relaxed text-foreground/60 lg:text-right">
            NexCommerce combines verified identities, blockchain-powered
            ownership, and peer-to-peer commerce to create a safer marketplace
            for everyone.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
