'use server'

import { prisma } from '@/lib/db'

export type SellerRecentOrder = {
  id: string
  productName: string
  buyerName: string
  amount: string
  status: string
  orderedAt: string
}

export type ChartPoint = {
  day: string
  revenue: number
  orders: number
}

export type SellerDashboardData = {
  storeName: string
  tier: string
  trustScore: number
  totalProducts: number
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
  recentOrders: SellerRecentOrder[]
  chartData: ChartPoint[]
}


export async function getSellerDashboardData(userId: string): Promise<SellerDashboardData> {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const [user, productCount, orderStats, recentOrders, chartOrders] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        sellerProfile: {
          select: { storeName: true, trustScore: true, currentTier: true },
        },
      },
    }),
    prisma.product.count({ where: { sellerId: userId } }),
    prisma.order.groupBy({
      by: ['status'],
      where: { sellerId: userId },
      _count: true,
      _sum: { amount: true },
    }),
    prisma.order.findMany({
      where: { sellerId: userId },
      orderBy: { orderedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        productName: true,
        amount: true,
        status: true,
        orderedAt: true,
        buyer: {
          select: { fullName: true, walletAddress: true },
        },
      },
    }),
    prisma.order.findMany({
      where: { sellerId: userId, orderedAt: { gte: sevenDaysAgo } },
      select: { orderedAt: true, amount: true },
      orderBy: { orderedAt: 'asc' },
    }),
  ])

  const totalOrders = orderStats.reduce((sum, g) => sum + g._count, 0)
  const pendingOrders = orderStats
    .filter((g) => ['Pending', 'Paid'].includes(g.status))
    .reduce((s, g) => s + g._count, 0)
  const totalRevenue = orderStats.reduce(
    (sum, g) => sum + Number(g._sum.amount ?? 0),
    0
  )

  // Build 7-day chart data
  const chartData: ChartPoint[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dayOrders = chartOrders.filter((o) => {
      const od = new Date(o.orderedAt)
      return od.getDate() === d.getDate() && od.getMonth() === d.getMonth()
    })
    chartData.push({
      day: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      revenue: parseFloat(
        dayOrders.reduce((s, o) => s + Number(o.amount), 0).toFixed(2)
      ),
      orders: dayOrders.length,
    })
  }

  return {
    storeName:
      user?.sellerProfile?.storeName ?? user?.fullName ?? 'My Store',
    tier: user?.sellerProfile?.currentTier ?? 'Starter',
    trustScore: user?.sellerProfile?.trustScore ?? 0,
    totalProducts: productCount,
    totalOrders,
    pendingOrders,
    totalRevenue,
    recentOrders: recentOrders.map((o) => ({
      id: o.id,
      productName: o.productName ?? 'Product',
      buyerName:
        o.buyer.fullName ??
        `${o.buyer.walletAddress.slice(0, 4)}...${o.buyer.walletAddress.slice(-4)}`,
      amount: `$${Number(o.amount).toFixed(2)}`,
      status: o.status,
      orderedAt: new Date(o.orderedAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    })),
    chartData,
  }
}
