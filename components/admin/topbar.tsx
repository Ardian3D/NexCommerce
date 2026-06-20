'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Menu, Calendar, Bell, ChevronDown, ShieldCheck,
  Clock, LogOut, Settings,
} from 'lucide-react'
import { getPendingVerifications, getPendingCount } from '@/lib/actions/admin'
import type { PendingUser } from '@/lib/actions/admin'

export function AdminTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const today = new Date()
  const dateLabel = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  useEffect(() => {
    getPendingCount().then(setPendingCount)
  }, [])

  useEffect(() => {
    if (notifOpen && pendingUsers.length === 0) {
      getPendingVerifications().then(setPendingUsers)
    }
  }, [notifOpen, pendingUsers.length])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function shortenWallet(addr: string) {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

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
        {/* Date */}
        <button className="hidden h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:flex">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap">{dateLabel}</span>
        </button>

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            {pendingCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {pendingCount > 9 ? '9+' : pendingCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="font-semibold text-foreground">Notifications</p>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                  {pendingCount} pending
                </span>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-border">
                {pendingUsers.length === 0 ? (
                  <li className="py-8 text-center text-sm text-muted-foreground">No notifications</li>
                ) : (
                  pendingUsers.slice(0, 6).map((u) => (
                    <li key={u.id} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer"
                      onClick={() => { router.push('/admin/verification'); setNotifOpen(false) }}>
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <Clock className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {u.role === 'seller' ? 'Business' : 'KYC'} verification pending
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {u.email ?? shortenWallet(u.walletAddress)}
                        </p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <div className="border-t border-border px-4 py-2.5">
                <button
                  onClick={() => { router.push('/admin/verification'); setNotifOpen(false) }}
                  className="w-full text-center text-xs font-semibold text-primary hover:underline"
                >
                  View all verifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-border bg-background py-1.5 pl-2 pr-2 transition-colors hover:bg-muted sm:pr-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600">
              <ShieldCheck className="h-4 w-4 text-white" />
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-semibold text-foreground">Admin</span>
              <span className="block text-[11px] text-muted-foreground">Super Administrator</span>
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <div className="border-b border-border px-4 py-3">
                <p className="text-sm font-bold text-foreground">Super Administrator</p>
                <p className="text-xs text-muted-foreground">admin@nexcommerce.io</p>
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => { router.push('/admin/settings'); setProfileOpen(false) }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
