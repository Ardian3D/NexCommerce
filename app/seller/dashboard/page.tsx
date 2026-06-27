import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'
import { WelcomeBanner } from '@/components/seller/welcome-banner'
import { StatCards } from '@/components/seller/stat-cards'
import { OverviewChart } from '@/components/seller/overview-chart'
import { TasksCard, NotificationsCard } from '@/components/seller/tasks-notifications'
import { RecentOrders, QuickActions, NexAiAssistant } from '@/components/seller/bottom-row'

export default async function SellerDashboardPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const data = await getSellerDashboardData(session.sub)

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={data.storeName}
      tier={data.tier}
      pendingOrdersCount={data.pendingOrders}
    >
      <div className="space-y-5">
        <WelcomeBanner
          storeName={data.storeName}
          tier={data.tier}
          trustScore={data.trustScore}
        />
        <StatCards
          trustScore={data.trustScore}
          tier={data.tier}
          totalProducts={data.totalProducts}
          totalOrders={data.totalOrders}
          pendingOrders={data.pendingOrders}
          totalRevenue={data.totalRevenue}
        />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <OverviewChart data={data.chartData} />
          <TasksCard />
          <NotificationsCard />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <RecentOrders orders={data.recentOrders} />
          <QuickActions />
          <NexAiAssistant />
        </div>
      </div>
    </SellerShell>
  )
}
