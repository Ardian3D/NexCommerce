import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/session'
import { getIdentityData } from '@/lib/actions/identity'
import { SellerShell } from '@/components/seller/shell'
import { IdentityClient } from '@/components/identity/identity-client'

export const metadata: Metadata = {
  title: 'My Identity | NexCommerce Seller',
  description: 'Your on-chain seller identity and trust reputation across NexCommerce.',
}

export default async function SellerIdentityPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const identity = await getIdentityData(session.sub, 'seller')

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={identity.fullName}
      tier={identity.tier}
    >
      <IdentityClient
        role="seller"
        cardData={{
          fullName: identity.fullName,
          photo: identity.photo,
          wallet: identity.wallet,
          country: identity.country,
          memberSince: identity.memberSince,
          trustScore: identity.trustScore,
          tier: identity.tier,
        }}
      />
    </SellerShell>
  )
}
