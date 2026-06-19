import type { Metadata } from 'next'
import { SellerShell } from '@/components/seller/shell'
import { IdentityClient } from '@/components/identity/identity-client'

export const metadata: Metadata = {
  title: 'My Identity | NexCommerce Seller',
  description: 'Your on-chain seller identity and trust reputation across NexCommerce.',
}

export default function SellerIdentityPage() {
  return (
    <SellerShell>
      <IdentityClient role="seller" />
    </SellerShell>
  )
}
