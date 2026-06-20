'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '@/components/admin/shell'
import {
  getPendingVerifications,
  approveUser,
  rejectUser,
  type PendingUser,
} from '@/lib/actions/admin'
import { ShieldCheck, Check, X, Loader2, Clock } from 'lucide-react'

const dotColors = [
  'from-violet-500 to-purple-600',
  'from-rose-500 to-orange-500',
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-cyan-500',
  'from-fuchsia-500 to-violet-600',
]

function shortenWallet(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export default function AdminVerificationPage() {
  const [items, setItems] = useState<PendingUser[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    getPendingVerifications().then((data) => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  async function handleApprove(id: string) {
    setActionLoading(id + '-approve')
    await approveUser(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    setActionLoading(null)
  }

  async function handleReject(id: string) {
    setActionLoading(id + '-reject')
    await rejectUser(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    setActionLoading(null)
  }

  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Verification Queue</h1>
            <p className="text-sm text-muted-foreground">
              Review and approve identity verification submissions
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
            <Clock className="h-4 w-4" />
            {items.length} Pending
          </span>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="py-20 text-center text-sm text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card py-20">
            <ShieldCheck className="h-10 w-10 text-emerald-500" />
            <p className="text-sm font-semibold text-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground">No pending verifications at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((u, i) => {
              const isApprovingLoading = actionLoading === u.id + '-approve'
              const isRejectingLoading = actionLoading === u.id + '-reject'
              const isBusy = isApprovingLoading || isRejectingLoading

              return (
                <div key={u.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
                  {/* User identity */}
                  <div className="flex items-center gap-3">
                    <span className={`h-12 w-12 shrink-0 rounded-full bg-gradient-to-br ${dotColors[i % dotColors.length]}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-foreground">
                        {u.storeName ?? u.fullName ?? shortenWallet(u.walletAddress)}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {u.email ?? shortenWallet(u.walletAddress)}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                      Pending
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 rounded-xl bg-muted/40 px-3 py-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wallet</span>
                      <span className="font-mono font-semibold text-foreground">{shortenWallet(u.walletAddress)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-semibold text-foreground capitalize">
                        {u.role === 'seller' ? 'Business Verification' : 'KYC Verification'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted</span>
                      <span className="font-semibold text-foreground">
                        {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleApprove(u.id)}
                      disabled={isBusy}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
                    >
                      {isApprovingLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(u.id)}
                      disabled={isBusy}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50 disabled:opacity-60"
                    >
                      {isRejectingLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
                      Reject
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AdminShell>
  )
}
