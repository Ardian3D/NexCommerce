import { redirect } from 'next/navigation'
import { Users, ShoppingBag, DollarSign } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'

async function getSellerCustomers(sellerId: string) {
  const orders = await prisma.order.findMany({
    where: { sellerId },
    select: {
      buyerId: true,
      amount: true,
      status: true,
      orderedAt: true,
      buyer: {
        select: {
          fullName: true,
          walletAddress: true,
          country: true,
        },
      },
    },
    orderBy: { orderedAt: 'desc' },
  })

  const customerMap = new Map<
    string,
    { name: string; wallet: string; country: string | null; totalSpent: number; orderCount: number; lastOrder: Date }
  >()

  for (const o of orders) {
    const existing = customerMap.get(o.buyerId)
    if (existing) {
      existing.totalSpent += Number(o.amount)
      existing.orderCount += 1
      if (new Date(o.orderedAt) > existing.lastOrder) {
        existing.lastOrder = new Date(o.orderedAt)
      }
    } else {
      customerMap.set(o.buyerId, {
        name: o.buyer.fullName ?? `${o.buyer.walletAddress.slice(0, 6)}...${o.buyer.walletAddress.slice(-4)}`,
        wallet: o.buyer.walletAddress,
        country: o.buyer.country,
        totalSpent: Number(o.amount),
        orderCount: 1,
        lastOrder: new Date(o.orderedAt),
      })
    }
  }

  return Array.from(customerMap.entries()).map(([id, c]) => ({ id, ...c }))
}

export default async function SellerCustomersPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [customers, dashData] = await Promise.all([
    getSellerCustomers(session.sub),
    getSellerDashboardData(session.sub).catch(() => null),
  ])

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0)
  const totalOrders = customers.reduce((s, c) => s + c.orderCount, 0)

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={dashData?.storeName}
      tier={dashData?.tier}
      pendingOrdersCount={dashData?.pendingOrders}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {customers.length} unique buyer{customers.length !== 1 ? 's' : ''} from your store
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard icon={Users} label="Total Customers" value={String(customers.length)} tint="text-blue-600 bg-blue-500/10" />
          <StatCard icon={ShoppingBag} label="Total Orders" value={String(totalOrders)} tint="text-violet-600 bg-violet-500/10" />
          <StatCard icon={DollarSign} label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} tint="text-emerald-600 bg-emerald-500/10" />
        </div>

        {customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground">No customers yet</h2>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Customers will appear here once they purchase from your store.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground">Customer</th>
                  <th className="hidden px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground sm:table-cell">Country</th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-muted-foreground">Orders</th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-muted-foreground">Spent</th>
                  <th className="hidden px-5 py-3.5 text-right text-xs font-semibold text-muted-foreground lg:table-cell">Last Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">{c.name}</p>
                          <p className="truncate font-mono text-[11px] text-muted-foreground">
                            {c.wallet.slice(0, 6)}...{c.wallet.slice(-4)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">
                      {c.country ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-foreground">
                      {c.orderCount}
                    </td>
                    <td className="px-5 py-4 text-right font-bold text-foreground">
                      ${c.totalSpent.toFixed(2)}
                    </td>
                    <td className="hidden px-5 py-4 text-right text-muted-foreground lg:table-cell">
                      {c.lastOrder.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SellerShell>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tint: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${tint}`}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-2xl font-bold text-foreground">{value}</p>
    </div>
  )
}
