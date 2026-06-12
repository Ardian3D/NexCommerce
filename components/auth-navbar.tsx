'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const links = ['Products', 'Categories', 'About', 'Contact']

export function AuthNavbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="NexCommerce home">
          <Image
            src="/navbar-logo.png"
            alt="NexCommerce"
            width={140}
            height={40}
            priority
            className="h-8 w-auto object-contain md:h-9"
          />
        </Link>

        {/* Navigation — center */}
        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {links.map((link) => (
            <Link
              key={link}
              href={`/#${link.toLowerCase()}`}
              className="group relative text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60 transition-colors duration-300 hover:text-foreground"
            >
              {link}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Back to home */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back To Home
        </Link>
      </div>
    </motion.header>
  )
}
