import type { Metadata } from 'next'
import { BuyerShell } from '@/components/buyer/shell'
import { IdentityClient } from '@/components/identity/identity-client'

export const metadata: Metadata = {
  title: 'My Identity | NexCommerce',
  description: 'Your on-chain identity and trust reputation across NexCommerce.',
}

export default function IdentityPage() {
  return (
    <BuyerShell>
      <IdentityClient />
    </BuyerShell>
  )
}
