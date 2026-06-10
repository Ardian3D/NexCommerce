import { Sparkle } from '@/components/sparkle'
import { Users, ChevronLeft, ChevronRight, Star } from 'lucide-react'

export function Testimonials() {
  return (
    <section className="relative border-t border-border px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — testimonial card grid */}
        <div>
          <div className="grid max-w-md grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl border border-foreground/15 bg-card px-6 py-8"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-2.5 w-2.5 fill-primary text-primary"
                    />
                  ))}
                </div>
                {/* Group icon */}
                <Users
                  className="mt-3 h-12 w-12 text-primary"
                  strokeWidth={1.75}
                />
              </div>
            ))}
          </div>

          {/* Nav arrows */}
          <div className="mt-6 flex max-w-md items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right — copy */}
        <div>
          <span className="inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border">
              <Sparkle className="h-3 w-3 text-foreground" />
            </span>
            Testimonials
          </span>

          <h2 className="mt-4 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            What Our
            <br />
            Community Says
          </h2>

          <p className="mt-6 max-w-md font-mono text-xs leading-relaxed text-foreground/60">
            Join a growing network of verified buyers and sellers who are
            building trust through transparent identities, reputation-based
            tiers, and peer-to-peer commerce.
          </p>
          <p className="mt-4 max-w-md font-mono text-xs leading-relaxed text-foreground/60">
            From first-time buyers to high-volume merchants, NexCommerce helps
            members establish credibility, unlock new opportunities, and trade
            with confidence.
          </p>
        </div>
      </div>
    </section>
  )
}
