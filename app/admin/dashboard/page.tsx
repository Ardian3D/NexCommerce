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

export const metadata: Metadata = {
  title: 'Admin Dashboard | NexCommerce',
  description: 'Overview of NexCommerce platform activities.',
}

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        {/* KPI cards + recent activity */}
        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <AdminStatCards />
          <AdminRecentActivity />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AdminOverviewChart />
          <AdminPlatformOverview />
        </div>

        {/* Queue + orders + health */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
          <AdminVerificationQueue />
          <AdminRecentOrders />
          <AdminSystemHealth />
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
