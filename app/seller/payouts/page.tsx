import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Wallet, DollarSign, Clock, CheckCircle2, Sparkles } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'

async function getPayoutData(sellerId: string) {
  const orders = await prisma.order.findMany({
    where: { sellerId },
    select: { amount: true, status: true, orderedAt: true, productName: true },
    orderBy: { orderedAt: 'desc' },
  })

  const completedRevenue = orders
    .filter((o) => ['Completed', 'Delivered'].includes(o.status))
    .reduce((s, o) => s + Number(o.amount), 0)

  const pendingRevenue = orders
    .filter((o) => ['Pending', 'Paid', 'Shipped'].includes(o.status))
    .reduce((s, o) => s + Number(o.amount), 0)

  return { orders, completedRevenue, pendingRevenue }
}

const statusColor: Record<string, string> = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  Paid: 'bg-blue-100 text-blue-700',
  Pending: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-sky-100 text-sky-700',
  Cancelled: 'bg-red-100 text-red-700',
}

export default async function SellerPayoutsPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [{ orders, completedRevenue, pendingRevenue }, dashData] = await Promise.all([
    getPayoutData(session.sub),
    getSellerDashboardData(session.sub).catch(() => null),
  ])

  const shortAddress = session.wallet
    ? `${session.wallet.slice(0, 6)}...${session.wallet.slice(-6)}`
    : '—'

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={dashData?.storeName}
      tier={dashData?.tier}
      pendingOrdersCount={dashData?.pendingOrders}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payouts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Revenue and payout overview</p>
        </div>

        {/* Revenue summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-900/10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Completed Revenue
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-emerald-700 dark:text-emerald-400">
              ${completedRevenue.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-emerald-600/70">From delivered & completed orders</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-900/10">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                Pending Revenue
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-amber-700 dark:text-amber-400">
              ${pendingRevenue.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-amber-600/70">From active orders in progress</p>
          </div>
        </div>

        {/* Wallet */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
              <Image src="/phantom-navbar-logo.png" alt="Phantom" width={28} height={28} />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Connected Wallet</p>
              <p className="font-mono text-xs text-muted-foreground">{shortAddress}</p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Phantom · Solana
            </span>
          </div>
        </div>

        {/* Automated payouts coming soon */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5 p-6 text-center">
          <Wallet className="mx-auto h-10 w-10 text-primary/60" />
          <h3 className="mt-4 text-base font-semibold text-foreground">Automated Payouts</h3>
          <p className="mt-2 max-w-sm mx-auto text-sm text-muted-foreground">
            On-chain automatic payouts directly to your Solana wallet are coming soon.
            Revenue tracking is live now.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            Automated Payouts — Coming Soon
          </div>
        </div>

        {/* Order revenue history */}
        {orders.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-semibold text-foreground">Revenue History</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Product</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground">Amount</th>
                  <th className="hidden px-5 py-3 text-right text-xs font-semibold text-muted-foreground sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.slice(0, 20).map((o, i) => (
                  <tr key={i} className="transition-colors hover:bg-muted/30">
                    <td className="px-5 py-3.5 text-foreground">{o.productName ?? '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColor[o.status] ?? 'bg-muted text-muted-foreground'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-foreground">
                      ${Number(o.amount).toFixed(2)}
                    </td>
                    <td className="hidden px-5 py-3.5 text-right text-muted-foreground sm:table-cell">
                      {new Date(o.orderedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
            <DollarSign className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">No revenue recorded yet.</p>
          </div>
        )}
      </div>
    </SellerShell>
  )
}
