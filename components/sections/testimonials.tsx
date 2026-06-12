'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkle } from '@/components/sparkle'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const testimonials = [
  {
    quote:
      'NexCommerce completely changed how I sell online. The trust score system means buyers take me seriously from day one.',
    name: 'Maya Rahardjo',
    role: 'Verified Seller · Elite Tier',
    initials: 'MR',
    rating: 5,
  },
  {
    quote:
      'Owning my wallet and keys gives me total peace of mind. Transactions are fast, transparent, and genuinely peer-to-peer.',
    name: 'Daniel Osei',
    role: 'Buyer · Ascent Tier',
    initials: 'DO',
    rating: 5,
  },
  {
    quote:
      'The identity verification felt premium and effortless. My reputation now follows me everywhere on the platform.',
    name: 'Sofia Marchetti',
    role: 'Verified Seller · Elite Tier',
    initials: 'SM',
    rating: 5,
  },
  {
    quote:
      'I went from first-time buyer to a high-volume merchant in months. The tier progression actually rewards real activity.',
    name: 'Arjun Mehta',
    role: 'Verified Seller · Ascent Tier',
    initials: 'AM',
    rating: 5,
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)

  const t = testimonials[index]

  return (
    <section className="relative px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — active testimonial card */}
        <Reveal direction="right" className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-foreground/15 bg-card p-8 md:p-10">
            <Quote
              className="absolute -right-4 -top-4 h-28 w-28 text-primary/5"
              aria-hidden="true"
            />

            <div className="relative min-h-[15rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  <blockquote className="mt-6 text-pretty text-lg font-medium leading-relaxed text-foreground md:text-xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-black text-primary-foreground">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-foreground">
                        {t.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/50">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Nav arrows + dots */}
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={index === i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === i
                      ? 'w-6 bg-primary'
                      : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        {/* Right — copy */}
        <Reveal direction="left" delay={0.1} className="order-1 lg:order-2">
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
        </Reveal>
      </div>
    </section>
  )
}
