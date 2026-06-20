import type { Metadata } from 'next'
import { BuyerShell } from '@/components/buyer/shell'
import { OrdersClient } from '@/components/buyer/orders-client'
import { getOrdersByBuyer, getOrderSummary } from '@/lib/orders'

export const metadata: Metadata = {
  title: 'My Orders · NexCommerce',
  description: 'Track and manage all your orders in one place.',
}

// TODO: ganti SEED_BUYER_ID dengan ID dari session wallet yang sedang login
const SEED_BUYER_ID = 'SEED_BUYER_111111111111111111111111111111111'

export default async function BuyerOrdersPage() {
  const [orders, summary] = await Promise.all([
    getOrdersByBuyer(SEED_BUYER_ID).catch(() => []),
    getOrderSummary(SEED_BUYER_ID).catch(() => ({
      totalOrders: 0, totalSpent: 0, deliveredOrders: 0, pendingOrders: 0, cancelledOrders: 0,
    })),
  ])

  return (
    <BuyerShell>
      <OrdersClient orders={orders} summary={summary} />
    </BuyerShell>
  )
}
