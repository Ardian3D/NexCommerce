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

// ── Dashboard stats types ──

export type RecentTransaction = {
  name: string
  counterparty: string
  amount: string
  date: string
  image: string
}

export type IdentityStats = {
  totalOrders: number
  totalSpent: string
  reviewCount: number
  recentTransactions: RecentTransaction[]
}

// ── Fetch real dashboard stats from DB ──

export async function getIdentityStats(
  userId: string,
  role: 'buyer' | 'seller',
): Promise<IdentityStats> {
  const orderField = role === 'buyer' ? 'buyerId' : 'sellerId'

  // Total orders & total spent
  const [orderAgg, orderCount] = await Promise.all([
    prisma.order.aggregate({
      where: { [orderField]: userId },
      _sum: { amount: true },
    }),
    prisma.order.count({
      where: { [orderField]: userId },
    }),
  ])

  // Review count — no dedicated reviews table, default to 0
  const reviewCount = 0

  // Recent transactions (last 5 orders)
  const recentOrders = await prisma.order.findMany({
    where: { [orderField]: userId },
    orderBy: { orderedAt: 'desc' },
    take: 5,
    select: {
      productName: true,
      productSlug: true,
      image: true,
      amount: true,
      orderedAt: true,
      buyerId: true,
      sellerId: true,
    },
  })

  const recentTransactions: RecentTransaction[] = recentOrders.map((o) => {
    const counterpartyId = role === 'buyer' ? o.sellerId : o.buyerId
    return {
      name: (role === 'buyer' ? 'Purchased ' : 'Sold ') + (o.productName || 'Item'),
      counterparty: counterpartyId
        ? `${counterpartyId.slice(0, 4)}...${counterpartyId.slice(-4)}`
        : 'Unknown',
      amount: `${role === 'buyer' ? '-' : '+'} $${Number(o.amount).toFixed(2)} USDC`,
      date: new Date(o.orderedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      image: o.image || '/placeholder.svg',
    }
  })

  return {
    totalOrders: orderCount,
    totalSpent: `$${Number(orderAgg._sum.amount ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    reviewCount,
    recentTransactions,
  }
}
