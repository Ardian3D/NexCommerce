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
