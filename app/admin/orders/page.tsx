import { AdminShell } from '@/components/admin/shell'
import { getAdminOrders } from '@/lib/actions/admin'
import { ClipboardList } from 'lucide-react'

const statusStyle: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Paid: 'bg-emerald-100 text-emerald-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-violet-100 text-violet-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-rose-100 text-rose-700',
}

function shorten(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders()
  const totalRevenue = orders.reduce((s, o) => s + Number(o.amount), 0)

  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Orders</h1>
            <p className="text-sm text-muted-foreground">{orders.length} total orders · ${totalRevenue.toFixed(2)} revenue</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold">
            <ClipboardList className="h-4 w-4 text-emerald-500" />
            {orders.length} Orders
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Buyer</th>
                  <th className="px-4 py-3">Seller</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">No orders yet</td></tr>
                ) : orders.map((o) => (
                  <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-xs font-semibold text-foreground">{o.id}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground truncate max-w-[140px]">{o.productName ?? '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{shorten(o.buyer.walletAddress)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {o.seller.sellerProfile?.storeName ?? shorten(o.seller.walletAddress)}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-foreground">${Number(o.amount).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyle[o.status] ?? 'bg-slate-100 text-slate-700'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
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
