'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShieldCheck, Loader2 } from 'lucide-react'
import { Sparkle } from '@/components/sparkle'

export function ConnectCard() {
  const router = useRouter()
  const [connecting, setConnecting] = useState(false)

  function handleConnect() {
    // Frontend-only for now — backend wallet logic comes later.
    // Simulate the connection, then move the user to role selection.
    setConnecting(true)
    setTimeout(() => router.push('/selection-role'), 1800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative w-full max-w-md"
    >
      {/* Glow behind card */}
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-primary/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="rounded-[2rem] border border-foreground/10 bg-card/80 p-8 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10">
        {/* Logo mark */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/navbar-logo.png"
            alt="NexCommerce"
            width={150}
            height={40}
            priority
            className="h-9 w-auto object-contain"
          />
          <p className="mt-5 max-w-xs font-mono text-xs leading-relaxed text-foreground/60">
            Connect your wallet to continue and become a verified member.
          </p>
        </div>

        {/* Connect button */}
        <button
          type="button"
          onClick={handleConnect}
          disabled={connecting}
          className="group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 font-display text-lg font-black uppercase tracking-wide text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {connecting ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Connecting…
            </>
          ) : (
            <>
              <Image  src="/phantom-logo.png" alt="Phantom" width={55} height={55} className='mr-4' />
              Connect Phantom
            </>
          )}
        </button>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-border" />

        {/* Security note */}
        <div className="flex items-center justify-center gap-3 text-center">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <p className="font-mono text-[11px] leading-relaxed text-foreground/55">
            We do not store your private keys and never have access to your
            funds.
          </p>
        </div>
      </div>

      {/* New to web3 */}
      <p className="mt-6 text-center font-mono text-xs text-foreground/50">
        New to web3?{' '}
        <a
          href="https://phantom.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-primary/80"
        >
          <Sparkle className="h-3 w-3" />
          Get a Phantom wallet
        </a>
      </p>
    </motion.div>
  )
}
