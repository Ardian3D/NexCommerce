'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { WalletNavbar } from '@/components/wallet-navbar'
import { RoleCard, roles } from '@/components/auth/role-card'
import { Footer } from '@/components/footer'

const gridBackground = {
  backgroundImage:
    'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

const EASE = [0.22, 1, 0.36, 1] as const

export default function SelectionRolePage() {
  return (
    <div className="min-h-screen bg-foreground p-2 sm:p-3">
      <main className="relative overflow-hidden rounded-lg bg-background">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={gridBackground}
          aria-hidden="true"
        />

        {/* Decorative wireframes */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -8 }}
          animate={{ opacity: 0.8, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="pointer-events-none absolute bottom-24 left-0 hidden h-44 w-44 -translate-x-1/4 lg:block xl:h-52 xl:w-52"
          aria-hidden="true"
        >
          <Image
            src="/bahan3.png"
            alt=""
            fill
            className="object-contain mix-blend-multiply"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 8 }}
          animate={{ opacity: 0.8, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="pointer-events-none absolute right-0 top-1/3 hidden h-40 w-40 translate-x-1/4 lg:block xl:h-48 xl:w-48"
          aria-hidden="true"
        >
          <Image
            src="/bahan3.png"
            alt=""
            width={200}
            height={200}
          />
        </motion.div>

        <div className="relative z-10 flex min-h-[calc(100vh-1rem)] flex-col sm:min-h-[calc(100vh-1.5rem)]">
          <WalletNavbar />

          {/* Selection area */}
          <section className="relative flex-1 px-6 pb-20 pt-6 md:px-10 md:pt-10">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              {/* Left — headline */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="lg:pr-4"
              >
                <h1 className="font-display text-6xl font-black uppercase leading-[0.88] tracking-tight text-foreground sm:text-7xl">
                  <span className="block">Choose Your</span>
                  <span className="block text-primary">Identity</span>
                </h1>

                <p className="mt-7 max-w-sm font-mono text-sm leading-relaxed text-foreground/60">
                  Every journey on NexCommerce starts with a verified identity.
                </p>
                <p className="mt-5 max-w-sm font-mono text-sm leading-relaxed text-foreground/60">
                  Choose the role that best represents how you want to
                  participate in the marketplace and begin building your
                  reputation within a trusted commerce ecosystem.
                </p>
              </motion.div>

              {/* Right — role cards */}
              <div className="grid gap-6 sm:grid-cols-2">
                {roles.map((role, i) => (
                  <RoleCard key={role.id} role={role} index={i} />
                ))}
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
