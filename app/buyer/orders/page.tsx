import type { Metadata } from 'next'
import { BuyerShell } from '@/components/buyer/shell'
import { OrdersClient } from '@/components/buyer/orders-client'

export const metadata: Metadata = {
  title: 'My Orders · NexCommerce',
  description: 'Track and manage all your orders in one place.',
}

export default function BuyerOrdersPage() {
  return (
    <BuyerShell>
      <OrdersClient />
    </BuyerShell>
  )
}
