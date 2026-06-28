import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/session'
import { getIdentityData, getIdentityStats } from '@/lib/actions/identity'
import { BuyerShell } from '@/components/buyer/shell'
import { IdentityClient } from '@/components/identity/identity-client'

export const metadata: Metadata = {
  title: 'My Identity | NexCommerce',
  description: 'Your on-chain identity and trust reputation across NexCommerce.',
}

export default async function IdentityPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const identity = await getIdentityData(session.sub, 'buyer')
  const identityStats = await getIdentityStats(session.sub, 'buyer')

  return (
    <BuyerShell
      walletAddress={session.wallet}
      displayName={identity.fullName}
      tier={identity.tier}
    >
      <IdentityClient
        role="buyer"
        cardData={{
          fullName: identity.fullName,
          photo: identity.photo,
          wallet: identity.wallet,
          country: identity.country,
          memberSince: identity.memberSince,
          trustScore: identity.trustScore,
          tier: identity.tier,
        }}
        stats={identityStats}
        recentTransactions={identityStats.recentTransactions}
        verificationStatus={identity.verificationStatus}
      />
    </BuyerShell>
  )
}
