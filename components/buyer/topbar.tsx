'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Bell, MessageSquare, ShoppingCart, Menu, ChevronDown } from 'lucide-react'
import Image from 'next/image'

function IconButton({
  icon: Icon,
  count,
  href,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  count?: number
  href?: string
  onClick?: () => void
}) {
  const inner = (
    <span className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
      <Icon className="h-5 w-5" />
      {count != null && count > 0 ? (
        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
          {count > 9 ? '9+' : count}
        </span>
      ) : null}
    </span>
  )

  if (href) return <Link href={href}>{inner}</Link>
  if (onClick) return <button onClick={onClick}>{inner}</button>
  return <span>{inner}</span>
}

type Props = {
  onMenuClick?: () => void
  walletAddress?: string
  pendingOrdersCount?: number
}

export function BuyerTopbar({ onMenuClick, walletAddress, pendingOrdersCount = 0 }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    : '—'

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      router.push(`/marketplace?q=${encodeURIComponent(q)}`)
    } else {
      router.push('/marketplace')
    }
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
      <form onSubmit={handleSearch} className="relative flex-1 sm:max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, brands and more..."
          className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-12 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 flex h-10 items-center px-3 text-muted-foreground hover:text-foreground"
          aria-label="Search"
        >
          <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] sm:block">
            ↵
          </kbd>
        </button>
      </form>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <IconButton icon={Bell} count={pendingOrdersCount} href="/buyer/orders" />
        <IconButton icon={MessageSquare} href="/buyer/messages" />
        <IconButton icon={ShoppingCart} href="/cart" />

        <Link
          href="/buyer/settings"
          className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background pl-1.5 pr-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md">
            <Image src="/phantom-navbar-logo.png" alt="Phantom" width={35} height={35} />
          </span>
          <span className="hidden items-center gap-1 sm:flex">
            {shortAddress}
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>
    </header>
  )
}
