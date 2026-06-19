import type { Metadata } from 'next'
import { SellerShell } from '@/components/seller/shell'
import { SellerOrdersClient } from '@/components/seller/orders-client'

export const metadata: Metadata = {
  title: 'Orders · Seller · NexCommerce',
  description: 'Manage and fulfill customer orders from your store.',
}

export default function SellerOrdersPage() {
  return (
    <SellerShell>
      <SellerOrdersClient />
    </SellerShell>
  )
}
