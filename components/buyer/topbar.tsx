'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Bell, MessageSquare, ShoppingCart, Menu, ChevronDown, Package, X } from 'lucide-react'
import Image from 'next/image'
import type { ProductAlert } from '@/lib/actions/notifications'

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
  productAlerts?: ProductAlert[]
}

export function BuyerTopbar({ onMenuClick, walletAddress, pendingOrdersCount = 0, productAlerts = [] }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  // Close notification dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    if (notifOpen) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [notifOpen])

  const alertCount = productAlerts.length

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
        {/* Notification Bell with dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {alertCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {alertCount > 9 ? '9+' : alertCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border bg-card p-2 shadow-xl z-50">
              <div className="flex items-center justify-between px-3 py-2">
                <h3 className="text-sm font-bold text-foreground">New Product Alerts</h3>
                <button
                  onClick={() => setNotifOpen(false)}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {alertCount === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground/40" />
                  <p className="mt-2 text-xs text-muted-foreground">No new products launched yet.</p>
                </div>
              ) : (
                <div className="max-h-72 overflow-y-auto space-y-1">
                  {productAlerts.map((alert, i) => (
                    <Link
                      key={i}
                      href={`/product/${alert.productSlug}`}
                      onClick={() => setNotifOpen(false)}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                        <Package className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {alert.productName}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          <span className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 mr-1.5">
                            {alert.category}
                          </span>
                          by {alert.sellerName}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {alert.launchedAt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

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
