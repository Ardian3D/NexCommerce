import type { Metadata } from 'next'
import { SellerShell } from '@/components/seller/shell'
import { SellerOrdersClient } from '@/components/seller/orders-client'
import { getOrdersBySeller, getSellerOverview, getSellerTabCounts } from '@/lib/seller-orders'

export const metadata: Metadata = {
  title: 'Orders · Seller · NexCommerce',
  description: 'Manage and fulfill customer orders from your store.',
}

// TODO: ganti dengan ID dari session wallet seller yang sedang login
const SEED_SELLER_ID = 'SEED_SELLER_2222222222222222222222222222222'

export default async function SellerOrdersPage() {
  const [orders, tabCounts, overview] = await Promise.all([
    getOrdersBySeller(SEED_SELLER_ID).catch(() => []),
    getSellerTabCounts(SEED_SELLER_ID).catch(() => ({
      'All Orders': 0, Pending: 0, Paid: 0, Shipped: 0, Delivered: 0, Completed: 0, Cancelled: 0,
    })),
    getSellerOverview(SEED_SELLER_ID).catch(() => ({
      totalOrders: 0, totalRevenue: 0, pendingOrders: 0, awaitingShipment: 0, completedOrders: 0,
    })),
  ])

  return (
    <SellerShell>
      <SellerOrdersClient orders={orders} tabCounts={tabCounts} overview={overview} />
    </SellerShell>
  )
}
