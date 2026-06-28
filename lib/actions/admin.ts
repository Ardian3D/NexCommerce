'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export type AdminStats = {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  avgTrustScore: number
}

export type PendingUser = {
  id: string
  walletAddress: string
  fullName: string | null
  email: string | null
  role: string
  createdAt: Date
  storeName: string | null
}

export type AdminOrderRow = {
  id: string
  buyerWallet: string
  amount: number
  status: string
}

export type AdminUserRow = {
  id: string
  walletAddress: string
  fullName: string | null
  email: string | null
  role: string
  verificationStatus: string
  createdAt: Date
  storeName: string | null
}

export async function getAdminStats(): Promise<AdminStats> {
  const [totalUsers, totalProducts, totalOrders, revenue, avgBuyer, avgSeller] =
    await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { amount: true } }),
      prisma.buyerProfile.aggregate({ _avg: { trustScore: true } }),
      prisma.sellerProfile.aggregate({ _avg: { trustScore: true } }),
    ])

  const scores = [avgBuyer._avg.trustScore, avgSeller._avg.trustScore].filter(Boolean) as number[]
  const avgTrustScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0

  return {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue: Number(revenue._sum.amount ?? 0),
    avgTrustScore,
  }
}

export async function getPendingVerifications(): Promise<PendingUser[]> {
  const users = await prisma.user.findMany({
    where: { verificationStatus: 'pending' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      walletAddress: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
      sellerProfile: { select: { storeName: true } },
    },
  })

  return users.map((u) => ({
    id: u.id,
    walletAddress: u.walletAddress,
    fullName: u.fullName,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
    storeName: u.sellerProfile?.storeName ?? null,
  }))
}

export async function getRecentOrders(limit = 5): Promise<AdminOrderRow[]> {
  const rows = await prisma.order.findMany({
    take: limit,
    orderBy: { orderedAt: 'desc' },
    include: { buyer: { select: { walletAddress: true } } },
  })

  return rows.map((o) => ({
    id: o.id,
    buyerWallet: o.buyer.walletAddress,
    amount: Number(o.amount),
    status: o.status,
  }))
}

export async function getAllUsers(): Promise<AdminUserRow[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      walletAddress: true,
      fullName: true,
      email: true,
      role: true,
      verificationStatus: true,
      createdAt: true,
      sellerProfile: { select: { storeName: true } },
    },
  })

  return users.map((u) => ({
    id: u.id,
    walletAddress: u.walletAddress,
    fullName: u.fullName,
    email: u.email,
    role: u.role,
    verificationStatus: u.verificationStatus,
    createdAt: u.createdAt,
    storeName: u.sellerProfile?.storeName ?? null,
  }))
}

export async function approveUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      verificationStatus: 'approved',
      verificationCompletedAt: new Date(),
    },
  })
  revalidatePath('/admin/dashboard')
  revalidatePath('/admin/verification')
}

export async function rejectUser(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { verificationStatus: 'unverified' },
  })
  revalidatePath('/admin/dashboard')
  revalidatePath('/admin/verification')
}

// ── Products ──────────────────────────────────────────────
export async function getAdminProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      seller: { select: { fullName: true, sellerProfile: { select: { storeName: true } } } },
      _count: { select: { orders: true } },
    },
  })
}

// ── Orders ────────────────────────────────────────────────
export async function getAdminOrders() {
  return prisma.order.findMany({
    orderBy: { orderedAt: 'desc' },
    include: {
      buyer: { select: { walletAddress: true, fullName: true } },
      seller: { select: { walletAddress: true, sellerProfile: { select: { storeName: true } } } },
    },
  })
}

// ── Revenue ───────────────────────────────────────────────
export async function getAdminRevenue() {
  const [total, byStatus, recentOrders] = await Promise.all([
    prisma.order.aggregate({ _sum: { amount: true }, _count: true }),
    prisma.order.groupBy({ by: ['status'], _sum: { amount: true }, _count: true }),
    prisma.order.findMany({
      take: 10,
      orderBy: { orderedAt: 'desc' },
      include: { buyer: { select: { walletAddress: true } } },
    }),
  ])
  return { total, byStatus, recentOrders }
}

// ── Pending count (for notification) ─────────────────────
export async function getPendingCount() {
  return prisma.user.count({ where: { verificationStatus: 'pending' } })
}

// ── Support Tickets ───────────────────────────────────────
export async function createSupportTicket(data: {
  name: string
  email: string
  category: string
  description: string
}) {
  return prisma.supportTicket.create({ data })
}

export async function getSupportTickets() {
  return prisma.supportTicket.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function closeSupportTicket(id: string) {
  await prisma.supportTicket.update({ where: { id }, data: { status: 'closed' } })
  revalidatePath('/admin/support')
}

// ── Dashboard real-time data ──────────────────────────────

export type ActivityItem = {
  icon: 'user' | 'package' | 'order' | 'kyc'
  title: string
  desc: string
  time: string
}

export async function getRecentActivity(limit = 5): Promise<ActivityItem[]> {
  const [recentOrders, recentUsers] = await Promise.all([
    prisma.order.findMany({
      take: limit,
      orderBy: { orderedAt: 'desc' },
      select: { id: true, productName: true, orderedAt: true },
    }),
    prisma.user.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: { fullName: true, walletAddress: true, createdAt: true },
    }),
  ])

  const items: ActivityItem[] = []

  for (const o of recentOrders.slice(0, 3)) {
    items.push({
      icon: 'order',
      title: 'Order placed',
      desc: o.productName || `Order #${o.id.slice(0, 8)}`,
      time: timeAgo(o.orderedAt),
    })
  }

  for (const u of recentUsers.slice(0, 2)) {
    const name = u.fullName || `${u.walletAddress.slice(0, 4)}...${u.walletAddress.slice(-4)}`
    items.push({
      icon: 'user',
      title: 'New user registered',
      desc: name,
      time: timeAgo(u.createdAt),
    })
  }

  return items.sort(() => Math.random() - 0.5).slice(0, limit)
}

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export type ChartPoint = {
  day: string
  orders: number
  revenue: number
  users: number
}

export async function getChartData(days = 7): Promise<ChartPoint[]> {
  const now = new Date()
  const points: ChartPoint[] = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dayEnd = new Date(dayStart.getTime() + 86400000)

    const [orders, users] = await Promise.all([
      prisma.order.aggregate({
        where: { orderedAt: { gte: dayStart, lt: dayEnd } },
        _count: true,
        _sum: { amount: true },
      }),
      prisma.user.count({
        where: { createdAt: { lt: dayEnd } },
      }),
    ])

    const prevUsers = i < days - 1 ? points[points.length - 1]?.users ?? 0 : users - (await prisma.user.count({
      where: { createdAt: { lt: dayStart } },
    }))

    points.push({
      day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      orders: orders._count,
      revenue: Math.round(Number(orders._sum.amount ?? 0)),
      users,
    })
  }

  return points
}

export type PlatformOverview = {
  categories: { name: string; value: number }[]
  roles: { name: string; value: number }[]
}

export async function getPlatformOverview(): Promise<PlatformOverview> {
  const [cats, roles] = await Promise.all([
    prisma.product.groupBy({ by: ['category'], _count: true, orderBy: { _count: { category: 'desc' } }, take: 5 }),
    prisma.user.groupBy({ by: ['role'], _count: true }),
  ])

  return {
    categories: cats.map((c) => ({ name: c.category || 'Other', value: c._count })),
    roles: roles.map((r) => ({ name: r.role, value: r._count })),
  }
}

export type SystemHealth = {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  dbStatus: string
}

export async function getSystemHealth(): Promise<SystemHealth> {
  const [users, products, orders] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
  ])
  return { totalUsers: users, totalProducts: products, totalOrders: orders, dbStatus: 'Connected' }
}
