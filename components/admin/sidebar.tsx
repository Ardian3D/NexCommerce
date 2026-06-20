'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Package,
  ClipboardList,
  AlertTriangle,
  Star,
  BarChart3,
  DollarSign,
  FileText,
  LayoutGrid,
  Megaphone,
  Image as ImageIcon,
  Settings,
  ScrollText,
  LifeBuoy,
  Headphones,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { createSupportTicket } from '@/lib/actions/admin'

type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: string
}

type NavGroup = {
  heading?: string
  items: NavItem[]
}

const groups: NavGroup[] = [
  {
    items: [{ label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' }],
  },
  {
    heading: 'Management',
    items: [
      { label: 'Users', icon: Users, href: '/admin/users' },
      { label: 'Verification', icon: ShieldCheck, href: '/admin/verification', badge: '12' },
      { label: 'Products', icon: Package, href: '/admin/products' },
      { label: 'Orders', icon: ClipboardList, href: '/admin/orders' },
      { label: 'Disputes', icon: AlertTriangle, href: '/admin/disputes', badge: '5' },
      { label: 'Reviews', icon: Star, href: '/admin/reviews' },
    ],
  },
  {
    heading: 'Analytics',
    items: [
      { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
      { label: 'Revenue', icon: DollarSign, href: '/admin/revenue' },
      { label: 'Reports', icon: FileText, href: '/admin/reports' },
    ],
  },
  {
    heading: 'Platform',
    items: [
      { label: 'Categories', icon: LayoutGrid, href: '/admin/categories' },
      { label: 'Promotions', icon: Megaphone, href: '/admin/promotions' },
      { label: 'Banners', icon: ImageIcon, href: '/admin/banners' },
      { label: 'System Settings', icon: Settings, href: '/admin/settings' },
    ],
  },
  {
    heading: 'Other',
    items: [
      { label: 'Audit Logs', icon: ScrollText, href: '/admin/audit-logs' },
      { label: 'Support Tickets', icon: LifeBuoy, href: '/admin/support', badge: '7' },
    ],
  },
]

function ContactSupportModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', category: 'General', description: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await createSupportTicket(form)
    setLoading(false)
    setDone(true)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-700">
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            <p className="text-lg font-bold text-slate-800">Ticket Submitted!</p>
            <p className="text-sm text-slate-500">Our support team will get back to you shortly.</p>
            <button onClick={onClose} className="mt-2 rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-lg font-bold text-slate-800">Contact Support</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required placeholder="Your name" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-violet-400" />
              <input required type="email" placeholder="Email address" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-violet-400" />
              <select value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-violet-400">
                <option>General</option>
                <option>Payment Issue</option>
                <option>Account Problem</option>
                <option>Technical Bug</option>
                <option>Verification Issue</option>
                <option>Other</option>
              </select>
              <textarea required rows={4} placeholder="Describe your issue..." value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-violet-400 resize-none" />
              <button type="submit" disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Ticket'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export function AdminSidebar({
  open = false,
  onClose,
}: {
  open?: boolean
  onClose?: () => void
}) {
  const pathname = usePathname()
  const [supportOpen, setSupportOpen] = useState(false)

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
        <div className="flex items-center gap-2 border-b border-white/5 px-5 py-4">
          <Image src="/logo-sidebar.png" alt="NexCommerce" width={150} height={32} className="h-8 w-auto" />
          <span className="ml-1 rounded-md bg-violet-500/20 px-2 py-0.5 text-[11px] font-semibold text-violet-300">
            Admin Panel
          </span>
          <button
            onClick={onClose}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
          {groups.map((group, gi) => (
            <div key={group.heading ?? `group-${gi}`} className="space-y-1">
              {group.heading ? (
                <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {group.heading}
                </p>
              ) : null}
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                          active ? 'bg-white/20 text-white' : 'bg-violet-500/90 text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Support card */}
        <div className="px-4 py-4">
          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-sm font-semibold text-white">Need help?</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
              Contact our support team
            </p>
            <button
              onClick={() => setSupportOpen(true)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-95"
            >
              <Headphones className="h-4 w-4" />
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {supportOpen && <ContactSupportModal onClose={() => setSupportOpen(false)} />}
    </>
  )
}
