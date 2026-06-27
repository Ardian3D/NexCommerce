'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Store,
  ClipboardList,
  Heart,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Star,
  IdCard,
  Settings,
  BadgeCheck,
  ChevronDown,
  Gift,
  X,
} from 'lucide-react'
import Image from 'next/image'

type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: string
  isNew?: boolean
}

const nav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/buyer/dashboard' },
  { label: 'Marketplace', icon: Store, href: '/marketplace' },
  { label: 'Orders', icon: ClipboardList, href: '/buyer/orders' },
  { label: 'Wishlist', icon: Heart, href: '/buyer/wishlist' },
  { label: 'Trusted Sellers', icon: ShieldCheck, href: '/buyer/sellers' },
  { label: 'AI Assistant', icon: Sparkles, href: '/buyer/ai', isNew: true },
  { label: 'Messages', icon: MessageSquare, href: '/buyer/messages' },
  { label: 'Reviews', icon: Star, href: '/buyer/reviews' },
  { label: 'Identity Card', icon: IdCard, href: '/identity' },
  { label: 'Settings', icon: Settings, href: '/buyer/settings' },
]

type Props = {
  open?: boolean
  onClose?: () => void
  displayName?: string
  tier?: string
  walletAddress?: string
}

export function BuyerSidebar({
  open = false,
  onClose,
  displayName = '',
  tier = 'Starter',
  walletAddress = '',
}: Props) {
  const pathname = usePathname()
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    : '—'

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col bg-[#0a0e1a] text-slate-300 transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 px-6 py-5">
          <Image src="/logo-sidebar.png" alt="Logo" width={190} height={190} />
          <button
            onClick={onClose}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Buyer profile */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 ring-2 ring-violet-500/40">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                <path d="M12 3l8 16H4l8-16Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-semibold text-white">
                  {displayName || 'Buyer'}
                </span>
                <BadgeCheck className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-xs text-slate-400">Verified Buyer</span>
            </div>
          </div>
          <span className="mt-2 ml-14 inline-block rounded-md bg-violet-500/20 px-2 py-0.5 text-[11px] font-semibold text-violet-300">
            {tier}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/buyer/dashboard' &&
                item.href !== '/marketplace' &&
                pathname.startsWith(item.href))
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500/90 px-1.5 text-[11px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
                {item.isNew ? (
                  <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-300">
                    New
                  </span>
                ) : null}
              </Link>
            )
          })}
        </nav>

        {/* Invite & Earn card */}
        <div className="px-4 py-4">
          <div className="rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
                <Gift className="h-4 w-4 text-white" />
              </span>
              <span className="text-sm font-bold text-white">Invite &amp; Earn</span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-300">
              Invite your friends and earn NEX rewards together!
            </p>
            <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90">
              Invite Now
            </button>
          </div>
        </div>

        {/* Wallet footer */}
        <div className="border-t border-white/10 px-4 py-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg">
              <Image src="/phantom-navbar-logo.png" alt="Phantom" width={35} height={35} />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-sm font-semibold text-white">
                {shortAddress}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Phantom
              </span>
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </aside>
    </>
  )
}
