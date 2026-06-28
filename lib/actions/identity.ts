'use server'

import { prisma } from '@/lib/db'

export type IdentityCardData = {
  fullName: string
  photo: string | null
  wallet: string
  country: string
  memberSince: string
  trustScore: number
  tier: string
}

export async function getIdentityData(
  userId: string,
  role: 'buyer' | 'seller' = 'buyer',
): Promise<IdentityCardData> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      fullName: true,
      photoUrl: true,
      walletAddress: true,
      country: true,
      createdAt: true,
      buyerProfile: { select: { trustScore: true, currentTier: true } },
      sellerProfile: { select: { trustScore: true, currentTier: true, storeName: true } },
    },
  })

  const profile =
    role === 'buyer' ? user?.buyerProfile : user?.sellerProfile

  return {
    fullName:
      role === 'seller'
        ? user?.sellerProfile?.storeName || user?.fullName || 'Unverified'
        : user?.fullName ?? 'Unverified',
    photo: user?.photoUrl ?? null,
    wallet: user?.walletAddress
      ? `${user.walletAddress.slice(0, 4)}...${user.walletAddress.slice(-4)}`
      : '—',
    country: user?.country ?? 'Unknown',
    memberSince: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
      : '—',
    trustScore: profile?.trustScore ?? 0,
    tier: profile?.currentTier ?? 'Starter',
  }
}
