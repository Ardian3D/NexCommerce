'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LogOut, Copy, Check } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

const links = ['Products', 'Categories', 'About', 'Contact']

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function WalletNavbar() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { publicKey, disconnect } = useWallet()
  const router = useRouter()

  const address = publicKey ? publicKey.toBase58() : null
  const displayAddress = address ? shortenAddress(address) : '—'

  async function handleCopy() {
    if (!address) return
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDisconnect() {
    await disconnect()
    router.push('/connect')
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="NexCommerce home"
        >
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

        {/* Wallet chip */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Wallet menu"
            className="flex items-center gap-3 rounded-full border border-border bg-card px-2.5 py-2 transition-all duration-300 hover:border-primary/50 hover:shadow-sm"
          >
            {/* Phantom avatar */}
            <Image src="/phantom-navbar-logo.png" alt="Phantom avatar" width={30} height={30} />

            <span className="flex flex-col items-start pr-1 text-left">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-foreground">
                Phantom
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              <span className="font-mono text-[11px] text-foreground/55">
                {displayAddress}
              </span>
            </span>

            <ChevronDown
              className={`h-4 w-4 text-foreground/50 transition-transform duration-300 ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl"
              >
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? 'Copied!' : 'Copy Address'}
                </button>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}
