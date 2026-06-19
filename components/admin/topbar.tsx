'use client'

import { Menu, Calendar, Bell, ChevronDown, ShieldCheck } from 'lucide-react'

export function AdminTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card px-4 py-3 sm:px-6">
      <button
        onClick={onMenuClick}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0">
        <h1 className="truncate text-xl font-bold text-foreground sm:text-2xl">Dashboard</h1>
        <p className="hidden truncate text-sm text-muted-foreground sm:block">
          Overview of NexCommerce platform activities
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button className="hidden h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:flex">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap">May 18 – May 24, 2025</span>
        </button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            8
          </span>
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-border bg-background py-1.5 pl-2 pr-2 transition-colors hover:bg-muted sm:pr-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600">
            <ShieldCheck className="h-4 w-4 text-white" />
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-semibold text-foreground">Admin</span>
            <span className="block text-[11px] text-muted-foreground">Super Administrator</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}
