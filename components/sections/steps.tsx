import { UserPlus, IdCard, ShieldCheck, ShoppingCart } from 'lucide-react'
import { Stagger, RevealItem } from '@/components/reveal'

const steps = [
  {
    icon: UserPlus,
    num: '01',
    title: 'Create Account',
    desc: 'Register as a Buyer or Seller and complete your profile information.',
  },
  {
    icon: IdCard,
    num: '02',
    title: 'Verify Identity',
    desc: 'Submit your information for review and receive your NexCommerce Identity Card.',
  },
  {
    icon: ShieldCheck,
    num: '03',
    title: 'Get Verified',
    desc: 'Our team reviews your application to ensure trust and authenticity.',
  },
  {
    icon: ShoppingCart,
    num: '04',
    title: 'Trade Directly',
    desc: 'Buy and sell through peer-to-peer crypto transactions with verified members.',
  },
]

export function Steps() {
  return (
    <section className="relative px-6 pb-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Cards */}
        <Stagger className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, num, title, desc }) => (
            <RevealItem
              key={num}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/15 bg-card px-7 py-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.45)]"
            >
              {/* Watermark number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-5 select-none font-display text-8xl font-black leading-none text-foreground/4 transition-colors duration-300 group-hover:text-primary/8"
              >
                {num}
              </span>

              {/* Icon badge */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-8 w-8" strokeWidth={1.75} />
              </div>

              {/* Step label */}
              <span className="relative mt-7 inline-flex w-fit items-center rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/60">
                Step {num}
              </span>

              <h3 className="relative mt-3 font-display text-2xl font-black uppercase leading-none tracking-wide text-foreground">
                {title}
              </h3>

              <p className="relative mt-3 font-mono text-xs leading-relaxed text-foreground/55">
                {desc}
              </p>
            </RevealItem>
          ))}
        </Stagger>

        {/* Timeline rail with numbered nodes (desktop only) */}
        <div className="relative mt-0 hidden lg:block">
          <div className="grid grid-cols-4">
            {steps.map(({ num }, i) => (
              <div key={num} className="flex flex-col items-center">
                <div className="h-8 w-px bg-foreground/20" />
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-background font-mono text-xs font-bold text-primary">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal rail behind nodes */}
          <div className="absolute bottom-4.5 left-[12.5%] right-[12.5%] z-0 h-px bg-foreground/15" />
        </div>
      </div>
    </section>
  )
}
