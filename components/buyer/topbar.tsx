'use client'

import { Search, Bell, MessageSquare, ShoppingCart, Menu, ChevronDown } from 'lucide-react'
import Image from 'next/image'

function IconButton({
  icon: Icon,
  count,
}: {
  icon: React.ComponentType<{ className?: string }>
  count?: number
}) {
  return (
    <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
      <Icon className="h-5 w-5" />
      {count ? (
        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
          {count}
        </span>
      ) : null}
    </button>
  )
}

export function BuyerTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
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
      <div className="relative flex-1 sm:max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for products, brands and more..."
          className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-12 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:block">
          ⌘ K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <IconButton icon={Bell} count={3} />
        <IconButton icon={MessageSquare} count={2} />
        <IconButton icon={ShoppingCart} count={1} />

        <button className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background pl-1.5 pr-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
          <span className="flex h-7 w-7 items-center justify-center rounded-md">
            <Image src="/phantom-navbar-logo.png" alt="Phantom avatar" width={35} height={35} />
          </span>
          <span className="hidden items-center gap-1 sm:flex">
            8XH...K9P
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}
