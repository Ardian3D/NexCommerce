'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { getUserByWallet } from '@/lib/actions/auth'
import { Sparkle } from '@/components/sparkle'

type Status = 'idle' | 'connecting' | 'checking' | 'redirecting' | 'error'

export function ConnectCard() {
  const router = useRouter()
  const { wallets, wallet, select, connect, connecting, connected, publicKey } = useWallet()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const hasChecked = useRef(false)

  // Panggil connect() setelah wallet ter-select — ref agar tidak loop
  const connectRef = useRef(connect)
  connectRef.current = connect

  useEffect(() => {
    if (!wallet) return
    setStatus('connecting')
    setErrorMsg('')
    connectRef.current().catch(() => {
      // User menolak / menutup popup Phantom
      setStatus('idle')
      setErrorMsg('Connection rejected. Please try again.')
    })
  }, [wallet])

  // Setelah Phantom benar-benar connected → cek DB
  useEffect(() => {
    if (!connected || !publicKey || hasChecked.current) return
    hasChecked.current = true
    setStatus('checking')

    getUserByWallet(publicKey.toBase58())
      .then((user) => {
        setStatus('redirecting')

        if (!user) return router.push('/selection-role')

        const { role, verificationStatus, identityActivatedAt } = user

        if (verificationStatus === 'unverified')
          return router.push(`/verify?role=${role}`)
        if (verificationStatus === 'pending')
          return router.push('/pending-review')
        if (verificationStatus === 'approved' && !identityActivatedAt)
          return router.push(`/identity-activated?role=${role}`)

        router.push(role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard')
      })
      .catch(() => {
        // DB error — jangan redirect, tampilkan pesan error
        hasChecked.current = false
        setStatus('error')
        setErrorMsg('Unable to reach server. Please try again.')
      })
  }, [connected, publicKey, router])

  // Reset guard jika wallet disconnect
  useEffect(() => {
    if (!connected) {
      hasChecked.current = false
      if (status !== 'idle' && status !== 'error') setStatus('idle')
    }
  }, [connected, status])

  function handleConnect() {
    const phantom = wallets.find(
      (w) => w.adapter.name === 'Phantom' || w.adapter.name.toLowerCase().includes('phantom')
    )
    if (!phantom) {
      window.open('https://phantom.app/', '_blank')
      return
    }
    setErrorMsg('')
    setStatus('idle')
    hasChecked.current = false
    select(phantom.adapter.name)
  }

  const isLoading = status === 'connecting' || status === 'checking' || status === 'redirecting' || connecting

  const loadingLabel: Record<Status, string> = {
    idle: '',
    connecting: 'Connecting…',
    checking: 'Checking account…',
    redirecting: 'Redirecting…',
    error: '',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative w-full max-w-md"
    >
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-primary/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="rounded-[2rem] border border-foreground/10 bg-card/80 p-8 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10">
        {/* Logo */}
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

        {/* Error message */}
        {errorMsg && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
            <p className="font-mono text-xs text-rose-600">{errorMsg}</p>
          </div>
        )}

        {/* Connect button */}
        <button
          type="button"
          onClick={handleConnect}
          disabled={isLoading}
          className="group mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 font-display text-lg font-black uppercase tracking-wide text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              {loadingLabel[status]}
            </>
          ) : (
            <>
              <Image src="/phantom-logo.png" alt="Phantom" width={55} height={55} className="mr-4" />
              {status === 'error' ? 'Try Again' : 'Connect Phantom'}
            </>
          )}
        </button>

        <div className="my-6 h-px w-full bg-border" />

        <div className="flex items-center justify-center gap-3 text-center">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <p className="font-mono text-[11px] leading-relaxed text-foreground/55">
            We do not store your private keys and never have access to your funds.
          </p>
        </div>
      </div>

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
