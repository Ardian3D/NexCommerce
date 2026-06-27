'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Sparkle } from './sparkle'

const links = ['Products', 'Card', 'How It Works', 'FAQ']

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-10">
        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center" aria-label="NexCommerce home">
          <Image
            src="/navbar-logo.png"
            alt="NexCommerce"
            width={140}
            height={40}
            priority
            className="h-8 w-auto object-contain md:h-9"
          />
        </a>

        {/* Navigation — center */}
        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="group relative text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60 transition-colors duration-300 hover:text-foreground"
            >
              {link}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/connect"
            className="hidden items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/25 sm:flex"
          >
            <Sparkle className="h-3.5 w-3.5" />
            Start Shop
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden px-6 lg:hidden"
          >
            <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-4">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  {link}
                </a>
              ))}
              <Link
                href="/connect"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground sm:hidden"
              >
                <Sparkle className="h-3.5 w-3.5" />
                Start Shop
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
