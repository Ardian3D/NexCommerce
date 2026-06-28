'use server'

import { prisma } from '@/lib/db'

export type RecentOrderItem = {
  id: string
  productName: string
  image: string | null
  status: string
  amount: string
  orderedAt: string
  sellerName: string
}

export type WishlistItem = {
  image: string | null
  price: string
}

export type RecommendedProduct = {
  slug: string
  name: string
  price: string
  image: string | null
  tier: string
  score: number | null
  sellerName: string
}

export type BuyerDashboardData = {
  displayName: string
  tier: string
  trustScore: number
  totalOrders: number
  deliveredOrders: number
  pendingOrders: number
  wishlistCount: number
  recentOrders: RecentOrderItem[]
  wishlistItems: WishlistItem[]
  recommendedProducts: RecommendedProduct[]
}


export async function getBuyerDashboardData(userId: string): Promise<BuyerDashboardData> {
  const [user, orderStats, recentOrders, wishlistRows, products] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        buyerProfile: { select: { trustScore: true, currentTier: true } },
      },
    }),
    prisma.order.groupBy({
      by: ['status'],
      where: { buyerId: userId },
      _count: true,
    }),
    prisma.order.findMany({
      where: { buyerId: userId },
      orderBy: { orderedAt: 'desc' },
      take: 3,
      select: {
        id: true,
        productName: true,
        image: true,
        status: true,
        amount: true,
        orderedAt: true,
        seller: {
          select: {
            fullName: true,
            sellerProfile: { select: { storeName: true } },
          },
        },
      },
    }),
    prisma.wishlist.findMany({
      where: { buyerId: userId },
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      where: { status: 'published', inStock: { gt: 0 } },
      select: {
        slug: true,
        name: true,
        price: true,
        image: true,
        tier: true,
        score: true,
        seller: {
          select: {
            fullName: true,
            sellerProfile: { select: { storeName: true } },
          },
        },
      },
    }),
  ])

  // Fetch wishlist product details
  const wishlistProductIds = wishlistRows.map((w) => w.productId)
  const wishlistProducts =
    wishlistProductIds.length > 0
      ? await prisma.product.findMany({
          where: { id: { in: wishlistProductIds } },
          select: { id: true, image: true, price: true },
        })
      : []

  const wishlistMap = new Map(wishlistProducts.map((p) => [p.id, p]))

  const totalOrders = orderStats.reduce((sum, g) => sum + g._count, 0)
  const deliveredOrders =
    (orderStats.find((g) => g.status === 'Delivered')?._count ?? 0) +
    (orderStats.find((g) => g.status === 'Completed')?._count ?? 0)
  const pendingOrders = orderStats
    .filter((g) => ['Pending', 'Paid', 'Shipped'].includes(g.status))
    .reduce((s, g) => s + g._count, 0)

  return {
    displayName: user?.fullName ?? 'Buyer',
    tier: user?.buyerProfile?.currentTier ?? 'Starter',
    trustScore: user?.buyerProfile?.trustScore ?? 0,
    totalOrders,
    deliveredOrders,
    pendingOrders,
    wishlistCount: await prisma.wishlist.count({ where: { buyerId: userId } }),
    recentOrders: recentOrders.map((o) => ({
      id: o.id,
      productName: o.productName ?? 'Product',
      image: o.image,
      status: o.status,
      amount: `$${Number(o.amount).toFixed(2)}`,
      orderedAt: new Date(o.orderedAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      sellerName:
        o.seller.sellerProfile?.storeName ?? o.seller.fullName ?? 'Verified Seller',
    })),
    wishlistItems: wishlistRows.map((w) => {
      const p = wishlistMap.get(w.productId)
      return {
        image: p?.image ?? null,
        price: p ? `$${Number(p.price).toFixed(2)}` : '—',
      }
    }),
    recommendedProducts: products.map((p) => ({
      slug: p.slug,
      name: p.name,
      price: `$${Number(p.price).toFixed(2)}`,
      image: p.image,
      tier: p.tier,
      score: p.score,
      sellerName:
        p.seller.sellerProfile?.storeName ?? p.seller.fullName ?? 'Seller',
    })),
  }
}
