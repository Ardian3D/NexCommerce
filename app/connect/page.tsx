'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AuthNavbar } from '@/components/auth-navbar'
import { ConnectCard } from '@/components/auth/connect-card'
import { Footer } from '@/components/footer'
import { Sparkle } from '@/components/sparkle'

const gridBackground = {
  backgroundImage:
    'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-foreground p-2 sm:p-3">
      <main className="relative overflow-hidden rounded-lg bg-background">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={gridBackground}
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-[calc(100vh-1rem)] flex-col sm:min-h-[calc(100vh-1.5rem)]">
          <AuthNavbar />

          {/* Hero / connect area */}
          <section className="relative flex flex-1 flex-col items-center px-6 pb-20 pt-8 text-center md:pt-12">
            {/* Decorative wireframes */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -8 }}
              animate={{ opacity: 0.85, x: 0, rotate: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="pointer-events-none absolute left-0 top-1/3 hidden h-44 w-44 -translate-x-1/4 lg:block xl:h-56 xl:w-56"
              aria-hidden="true"
            >
              <Image
                src="/bahan2.png"
                alt=""
                fill
                className="object-contain mix-blend-multiply"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 8 }}
              animate={{ opacity: 0.85, x: 0, rotate: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="pointer-events-none absolute right-0 top-1/4 hidden h-48 w-48 translate-x-1/4 lg:block xl:h-60 xl:w-60"
              aria-hidden="true"
            >
              <Image
                src="/bahan1.png"
                alt=""
                width={192}
                height={192}
                className='relative left-7'
              />
            </motion.div>

            {/* Decorative stars */}
            <Sparkle className="absolute left-[18%] top-[34%] hidden h-5 w-5 text-foreground md:block" />
            <Sparkle className="absolute right-[18%] top-[34%] hidden h-5 w-5 text-foreground md:block" />

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 font-display text-6xl font-black uppercase leading-[0.88] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[7rem]"
            >
              <span className="block">Connect Your</span>
              <span className="block text-primary">Identity</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative z-10 mt-6 max-w-xl text-pretty font-mono text-sm leading-relaxed text-foreground/60 md:text-base"
            >
              Connect your Phantom wallet to access the NexCommerce ecosystem and
              begin your verification journey.
            </motion.p>

            {/* Connect card */}
            <div className="relative z-10 mt-12 flex w-full justify-center">
              <ConnectCard />
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
