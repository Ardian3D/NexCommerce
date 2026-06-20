import { AdminShell } from '@/components/admin/shell'
import { getAdminStats } from '@/lib/actions/admin'
import { Users, Package, ClipboardList, DollarSign, ShieldCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminAnalyticsPage() {
  const stats = await getAdminStats()
  const cards = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, tone: 'bg-violet-100 text-violet-600' },
    { label: 'Total Products', value: stats.totalProducts.toLocaleString(), icon: Package, tone: 'bg-blue-100 text-blue-600' },
    { label: 'Total Orders', value: stats.totalOrders.toLocaleString(), icon: ClipboardList, tone: 'bg-emerald-100 text-emerald-600' },
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, tone: 'bg-amber-100 text-amber-600' },
    { label: 'Avg Trust Score', value: `${stats.avgTrustScore} / 100`, icon: ShieldCheck, tone: 'bg-violet-100 text-violet-600' },
  ]

  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div><h1 className="text-xl font-bold text-foreground">Analytics</h1><p className="text-sm text-muted-foreground">Platform-wide performance overview</p></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.tone}`}>
                <c.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-xs text-muted-foreground">{c.label}</p>
              <p className="mt-0.5 text-2xl font-bold text-foreground">{c.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-card py-16">
          <p className="text-sm text-muted-foreground">Detailed charts coming in next update</p>
        </div>
      </div>
    </AdminShell>
  )
}
