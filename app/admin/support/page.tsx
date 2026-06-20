'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '@/components/admin/shell'
import { getSupportTickets, closeSupportTicket } from '@/lib/actions/admin'
import { LifeBuoy, CheckCircle2, Clock, Loader2 } from 'lucide-react'

type Ticket = { id: string; name: string; email: string; category: string; description: string; status: string; createdAt: Date }

const categoryTone: Record<string, string> = {
  General: 'bg-slate-100 text-slate-700',
  'Payment Issue': 'bg-rose-100 text-rose-700',
  'Account Problem': 'bg-amber-100 text-amber-700',
  'Technical Bug': 'bg-blue-100 text-blue-700',
  'Verification Issue': 'bg-violet-100 text-violet-700',
  Other: 'bg-slate-100 text-slate-700',
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [closing, setClosing] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getSupportTickets().then((data) => {
      setTickets(data as Ticket[])
      setLoading(false)
    })
  }, [])

  async function handleClose(id: string) {
    setClosing(id)
    await closeSupportTicket(id)
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, status: 'closed' } : t))
    setClosing(null)
  }

  const filtered = filter === 'all' ? tickets : tickets.filter((t) => t.status === filter)
  const openCount = tickets.filter((t) => t.status === 'open').length

  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Support Tickets</h1>
            <p className="text-sm text-muted-foreground">{openCount} open tickets</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
              <Clock className="h-4 w-4" /> {openCount} Open
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {['all', 'open', 'closed'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-foreground hover:bg-muted'}`}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-muted-foreground">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-20">
            <LifeBuoy className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-semibold text-foreground">No tickets found</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((t) => (
              <div key={t.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{t.email}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${t.status === 'open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {t.status}
                  </span>
                </div>

                <span className={`self-start rounded-full px-2 py-0.5 text-xs font-semibold ${categoryTone[t.category] ?? 'bg-slate-100 text-slate-700'}`}>
                  {t.category}
                </span>

                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">{t.description}</p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">
                    {new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  {t.status === 'open' && (
                    <button onClick={() => handleClose(t.id)} disabled={closing === t.id}
                      className="flex items-center gap-1 rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-200 disabled:opacity-60">
                      {closing === t.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}
                      Close
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}
