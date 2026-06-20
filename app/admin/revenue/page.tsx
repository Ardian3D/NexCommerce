import { AdminShell } from '@/components/admin/shell'
import { getAdminRevenue } from '@/lib/actions/admin'
import { DollarSign, TrendingUp, Package, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

const statusStyle: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Paid: 'bg-emerald-100 text-emerald-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-violet-100 text-violet-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-rose-100 text-rose-700',
}

function shorten(addr: string) { return `${addr.slice(0, 6)}...${addr.slice(-4)}` }

export default async function AdminRevenuePage() {
  const { total, byStatus, recentOrders } = await getAdminRevenue()
  const totalRevenue = Number(total._sum.amount ?? 0)
  const completedRevenue = byStatus.find(s => s.status === 'Completed')?._sum?.amount ?? 0
  const pendingRevenue = byStatus.find(s => s.status === 'Paid')?._sum?.amount ?? 0

  const cards = [
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, tone: 'bg-violet-100 text-violet-600' },
    { label: 'Completed Orders', value: `$${Number(completedRevenue).toFixed(2)}`, icon: CheckCircle2, tone: 'bg-emerald-100 text-emerald-600' },
    { label: 'Pending Payment', value: `$${Number(pendingRevenue).toFixed(2)}`, icon: TrendingUp, tone: 'bg-amber-100 text-amber-600' },
    { label: 'Total Transactions', value: total._count.toString(), icon: Package, tone: 'bg-blue-100 text-blue-600' },
  ]

  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Revenue</h1>
          <p className="text-sm text-muted-foreground">Platform revenue overview</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.tone}`}>
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-xl font-bold text-foreground">{c.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="mb-3 text-base font-bold text-foreground">Revenue by Status</h2>
          <div className="space-y-2">
            {byStatus.map((s) => (
              <div key={s.status} className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyle[s.status] ?? 'bg-slate-100 text-slate-700'}`}>
                    {s.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{s._count} orders</span>
                </div>
                <span className="text-sm font-bold text-foreground">${Number(s._sum.amount ?? 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="mb-3 text-base font-bold text-foreground">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="py-2 pr-4">Order ID</th>
                  <th className="py-2 pr-4">Buyer</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 text-xs font-semibold text-foreground">{o.id}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-muted-foreground">{shorten(o.buyer.walletAddress)}</td>
                    <td className="py-2.5 pr-4 text-xs font-semibold text-foreground">${Number(o.amount).toFixed(2)}</td>
                    <td className="py-2.5 pr-4">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyle[o.status] ?? ''}`}>{o.status}</span>
                    </td>
                    <td className="py-2.5 text-xs text-muted-foreground">
                      {new Date(o.orderedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
