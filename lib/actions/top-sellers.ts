'use server'

import { prisma } from '@/lib/db'

export type TopSeller = {
  rank: number
  name: string
  tier: string
  products: string
  score: number
  initials: string
  walletAddress: string
}

export async function getTopSellers(limit = 5): Promise<TopSeller[]> {
  const sellers = await prisma.user.findMany({
    where: {
      role: 'seller',
      verificationStatus: 'approved',
      sellerProfile: { isNot: null },
    },
    select: {
      fullName: true,
      walletAddress: true,
      sellerProfile: {
        select: {
          storeName: true,
          currentTier: true,
          trustScore: true,
        },
      },
      _count: { select: { products: true } },
    },
    orderBy: { sellerProfile: { trustScore: 'desc' } },
    take: limit,
  })

  return sellers.map((s, i) => ({
    rank: i + 1,
    name: s.sellerProfile?.storeName || s.fullName || 'Unknown Seller',
    tier: s.sellerProfile?.currentTier || 'Starter',
    products: `${s._count.products} Products`,
    score: s.sellerProfile?.trustScore ?? 0,
    initials: (s.sellerProfile?.storeName || s.fullName || 'S')
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 3),
    walletAddress: s.walletAddress ?? '',
  }))
}
