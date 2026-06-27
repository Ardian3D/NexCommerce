import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'
import { OverviewChart } from '@/components/seller/overview-chart'
import { BarChart3, TrendingUp, ShoppingBag, DollarSign, Users } from 'lucide-react'

export default async function SellerAnalyticsPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const data = await getSellerDashboardData(session.sub)

  const avgOrderValue = data.totalOrders > 0 ? data.totalRevenue / data.totalOrders : 0
  const conversionNote = data.totalProducts > 0 ? `${data.totalOrders} orders across ${data.totalProducts} products` : 'No products yet'

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={data.storeName}
      tier={data.tier}
      pendingOrdersCount={data.pendingOrders}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Performance overview for your store
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard
            icon={DollarSign}
            label="Total Revenue"
            value={`$${data.totalRevenue.toFixed(2)}`}
            tint="text-emerald-600 bg-emerald-500/10"
          />
          <KpiCard
            icon={ShoppingBag}
            label="Total Orders"
            value={String(data.totalOrders)}
            tint="text-blue-600 bg-blue-500/10"
          />
          <KpiCard
            icon={TrendingUp}
            label="Avg. Order Value"
            value={`$${avgOrderValue.toFixed(2)}`}
            tint="text-violet-600 bg-violet-500/10"
          />
          <KpiCard
            icon={Users}
            label="Pending Orders"
            value={String(data.pendingOrders)}
            tint="text-amber-600 bg-amber-500/10"
          />
        </div>

        {/* 7-day chart */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <OverviewChart data={data.chartData} />

          {/* Summary panel */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Summary</h2>
            </div>
            <div className="mt-5 space-y-4">
              <SummaryRow label="Total Products" value={String(data.totalProducts)} />
              <SummaryRow label="Trust Score" value={`${data.trustScore} / 100`} />
              <SummaryRow label="Current Tier" value={data.tier} />
              <SummaryRow label="Order Coverage" value={conversionNote} small />
            </div>
          </div>
        </div>

        {/* Coming soon deeper analytics */}
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10">
            <BarChart3 className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">Deeper Analytics</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Conversion funnels, traffic sources, and cohort analysis are coming soon.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-semibold text-muted-foreground">
            Coming Soon
          </span>
        </div>
      </div>
    </SellerShell>
  )
}

function KpiCard({
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

function SummaryRow({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-right font-semibold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>{value}</span>
    </div>
  )
}
