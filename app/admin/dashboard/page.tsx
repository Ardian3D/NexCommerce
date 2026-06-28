import type { Metadata } from 'next'
import { AdminShell } from '@/components/admin/shell'
import { AdminStatCards } from '@/components/admin/stat-cards'
import { AdminRecentActivity } from '@/components/admin/panels'
import { AdminOverviewChart, AdminPlatformOverview } from '@/components/admin/charts'
import {
  AdminVerificationQueue,
  AdminRecentOrders,
  AdminSystemHealth,
} from '@/components/admin/panels'
import { AdminReportsSummary, AdminTopReportReasons } from '@/components/admin/reports'
import { getAdminStats, getPendingVerifications, getRecentOrders, getRecentActivity, getChartData, getPlatformOverview, getSystemHealth } from '@/lib/actions/admin'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Dashboard | NexCommerce',
  description: 'Overview of NexCommerce platform activities.',
}

export default async function AdminDashboardPage() {
  const [stats, pendingQueue, recentOrders, activity, chartData, platformOverview, systemHealth] = await Promise.all([
    getAdminStats(),
    getPendingVerifications(),
    getRecentOrders(5),
    getRecentActivity(5),
    getChartData(7),
    getPlatformOverview(),
    getSystemHealth(),
  ])

  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        {/* KPI cards + recent activity */}
        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <AdminStatCards
            totalUsers={stats.totalUsers}
            totalProducts={stats.totalProducts}
            totalOrders={stats.totalOrders}
            totalRevenue={stats.totalRevenue}
            avgTrustScore={stats.avgTrustScore}
          />
          <AdminRecentActivity items={activity} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AdminOverviewChart data={chartData} />
          <AdminPlatformOverview overview={platformOverview} />
        </div>

        {/* Queue + orders + health */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
          <AdminVerificationQueue queue={pendingQueue} />
          <AdminRecentOrders orders={recentOrders} />
          <AdminSystemHealth health={systemHealth} />
        </div>

        {/* Reports */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AdminReportsSummary />
          <AdminTopReportReasons />
        </div>
      </div>
    </AdminShell>
  )
}
