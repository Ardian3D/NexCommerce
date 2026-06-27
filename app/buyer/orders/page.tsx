import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/session'
import { BuyerShell } from '@/components/buyer/shell'
import { OrdersClient } from '@/components/buyer/orders-client'
import { getOrdersByBuyer, getOrderSummary } from '@/lib/orders'
import { getBuyerDashboardData } from '@/lib/actions/buyer-dashboard'

export const metadata: Metadata = {
  title: 'My Orders · NexCommerce',
  description: 'Track and manage all your orders in one place.',
}

export default async function BuyerOrdersPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [orders, summary, dashData] = await Promise.all([
    getOrdersByBuyer(session.sub).catch(() => []),
    getOrderSummary(session.sub).catch(() => ({
      totalOrders: 0,
      totalSpent: 0,
      deliveredOrders: 0,
      pendingOrders: 0,
      cancelledOrders: 0,
    })),
    getBuyerDashboardData(session.sub).catch(() => null),
  ])

  return (
    <BuyerShell
      walletAddress={session.wallet}
      displayName={dashData?.displayName}
      tier={dashData?.tier}
      pendingOrdersCount={dashData?.pendingOrders}
    >
      <OrdersClient orders={orders} summary={summary} />
    </BuyerShell>
  )
}
