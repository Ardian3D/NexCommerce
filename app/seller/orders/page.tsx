import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/session'
import { SellerShell } from '@/components/seller/shell'
import { SellerOrdersClient } from '@/components/seller/orders-client'
import { getOrdersBySeller, getSellerOverview, getSellerTabCounts } from '@/lib/seller-orders'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'

export const metadata: Metadata = {
  title: 'Orders · Seller · NexCommerce',
  description: 'Manage and fulfill customer orders from your store.',
}

export default async function SellerOrdersPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [orders, tabCounts, overview, dashData] = await Promise.all([
    getOrdersBySeller(session.sub).catch(() => []),
    getSellerTabCounts(session.sub).catch(() => ({
      'All Orders': 0, Pending: 0, Paid: 0, Shipped: 0, Delivered: 0, Completed: 0, Cancelled: 0,
    })),
    getSellerOverview(session.sub).catch(() => ({
      totalOrders: 0, totalRevenue: 0, pendingOrders: 0, awaitingShipment: 0, completedOrders: 0,
    })),
    getSellerDashboardData(session.sub).catch(() => null),
  ])

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={dashData?.storeName}
      tier={dashData?.tier}
      pendingOrdersCount={dashData?.pendingOrders}
    >
      <SellerOrdersClient orders={orders} tabCounts={tabCounts} overview={overview} />
    </SellerShell>
  )
}
