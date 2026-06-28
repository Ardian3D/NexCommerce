'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, Bell, MessageSquare, ExternalLink, Menu, ChevronDown, LogOut } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

type Props = {
  onMenuClick?: () => void
  walletAddress?: string
  pendingOrdersCount?: number
}

export function SellerTopbar({ onMenuClick, walletAddress, pendingOrdersCount = 0 }: Props) {
  const router = useRouter()
  const { disconnect } = useWallet()
  const [walletOpen, setWalletOpen] = useState(false)
  const walletRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (walletRef.current && !walletRef.current.contains(e.target as Node)) {
        setWalletOpen(false)
      }
    }
    if (walletOpen) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [walletOpen])

  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    : '—'

  async function handleDisconnect() {
    try { await disconnect() } catch { /* ok */ }
    router.push('/connect')
  }

  return (
    <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-card px-4 py-3 sm:gap-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative flex-1 sm:max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search anything..."
          className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-12 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:block">
          ⌘ K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Link
          href="/seller/orders"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          {pendingOrdersCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {pendingOrdersCount > 9 ? '9+' : pendingOrdersCount}
            </span>
          )}
        </Link>
        <Link
          href="/seller/messages"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <MessageSquare className="h-5 w-5" />
        </Link>
        <Link
          href="/seller/store"
          className="hidden h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:flex sm:px-4"
        >
          <span>View Store</span>
          <ExternalLink className="h-4 w-4" />
        </Link>

        <div className="relative" ref={walletRef}>
          <button
            onClick={() => setWalletOpen((v) => !v)}
            className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background pl-1.5 pr-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md">
              <Image src="/phantom-navbar-logo.png" alt="Phantom" width={35} height={35} />
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              {shortAddress}
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${walletOpen ? 'rotate-180' : ''}`} />
          </button>

          {walletOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-xl z-50">
              <button
                onClick={handleDisconnect}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
