'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  BarChart3,
  Megaphone,
  Sparkles,
  Wallet,
  Store,
  Star,
  Settings,
  BadgeCheck,
  ChevronDown,
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
  { label: 'Dashboard', icon: LayoutDashboard, href: '/seller/dashboard' },
  { label: 'Products', icon: Package, href: '/seller/products' },
  { label: 'Orders', icon: ClipboardList, href: '/seller/orders' },
  { label: 'Customers', icon: Users, href: '/seller/customers' },
  { label: 'Analytics', icon: BarChart3, href: '/seller/analytics' },
  { label: 'Marketing', icon: Megaphone, href: '/seller/marketing' },
  { label: 'AI Assistant', icon: Sparkles, href: '/seller/ai', isNew: true },
  { label: 'Payouts', icon: Wallet, href: '/seller/payouts' },
  { label: 'Store Profile', icon: Store, href: '/seller/store' },
  { label: 'Identity Card', icon: BadgeCheck, href: '/seller/identity' },
  { label: 'Reviews', icon: Star, href: '/seller/reviews' },
  { label: 'Settings', icon: Settings, href: '/seller/settings' },
]

type Props = {
  open?: boolean
  onClose?: () => void
  storeName?: string
  tier?: string
  walletAddress?: string
  pendingOrdersCount?: number
}

export function SellerSidebar({
  open = false,
  onClose,
  storeName = '',
  tier = 'Starter',
  walletAddress = '',
  pendingOrdersCount = 0,
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

        {/* Seller profile */}
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
                  {storeName || 'My Store'}
                </span>
                <BadgeCheck className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-xs text-slate-400">Verified Seller</span>
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
              (item.href !== '/seller/dashboard' && pathname.startsWith(item.href))
            const badge =
              item.label === 'Orders' && pendingOrdersCount > 0
                ? String(pendingOrdersCount)
                : item.badge
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
                {badge ? (
                  <span className="rounded-full bg-blue-500/90 px-2 py-0.5 text-[11px] font-bold text-white">
                    {badge}
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

        {/* Complete profile card */}
        <div className="px-4 py-4">
          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span>Complete Your Profile</span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              Add store banner and social links to build more trust.
            </p>
            <Link
              href="/seller/store"
              className="mt-3 block w-full rounded-lg bg-white/10 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-white/15"
            >
              Update Profile
            </Link>
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
