import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getBuyerDashboardData } from '@/lib/actions/buyer-dashboard'
import { getNewProductAlerts } from '@/lib/actions/notifications'
import { BuyerShell } from '@/components/buyer/shell'
import { BuyerWelcomeBanner } from '@/components/buyer/welcome-banner'
import { BuyerStatCards } from '@/components/buyer/stat-cards'
import { BuyerMainColumn } from '@/components/buyer/main-column'
import { BuyerSideColumn } from '@/components/buyer/side-column'

export default async function BuyerDashboardPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [data, productAlerts] = await Promise.all([
    getBuyerDashboardData(session.sub),
    getNewProductAlerts(5),
  ])

  return (
    <BuyerShell
      walletAddress={session.wallet}
      displayName={data.displayName}
      tier={data.tier}
      pendingOrdersCount={data.pendingOrders}
      productAlerts={productAlerts}
    >
      <div className="space-y-6">
        <BuyerWelcomeBanner
          fullName={data.displayName}
          tier={data.tier}
          trustScore={data.trustScore}
        />
        <BuyerStatCards
          trustScore={data.trustScore}
          tier={data.tier}
          totalOrders={data.totalOrders}
          deliveredOrders={data.deliveredOrders}
          pendingOrders={data.pendingOrders}
          wishlistCount={data.wishlistCount}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <BuyerMainColumn products={data.recommendedProducts} />
          </div>
          <div className="xl:col-span-1">
            <BuyerSideColumn
              recentOrders={data.recentOrders}
              wishlistItems={data.wishlistItems}
              wishlistCount={data.wishlistCount}
            />
          </div>
        </div>
      </div>
    </BuyerShell>
  )
}
