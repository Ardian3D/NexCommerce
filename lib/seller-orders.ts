import { prisma } from './db'
import type { OrderStatus } from '@/lib/orders'
import { statusStyles, statusDot } from '@/lib/orders'

export type { OrderStatus }
export { statusStyles, statusDot }

export type SellerOrder = {
  id: string
  productSlug: string
  productName: string
  image: string
  unitPrice: number
  qty: number
  buyer: string
  orderedAt: string
  status: OrderStatus
  meta: {
    label: string
    value?: string
    chip?: 'solana'
  }
}

export type SellerOverview = {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  awaitingShipment: number
  completedOrders: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSellerOrder(row: any): SellerOrder {
  return {
    id: row.id,
    productSlug: row.productSlug ?? '',
    productName: row.productName ?? '',
    image: row.image ?? '',
    unitPrice: Number(row.amount) / row.items,
    qty: row.items,
    buyer: row.buyer?.fullName ?? row.buyer?.walletAddress?.slice(0, 8) ?? '',
    orderedAt: new Date(row.orderedAt).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    status: row.status as OrderStatus,
    meta: {
      label: row.metaLabel ?? '',
      value: row.metaValue ?? undefined,
      chip: row.paymentChip === 'solana' ? 'solana' : undefined,
    },
  }
}

const buyerSelect = {
  select: { fullName: true, walletAddress: true },
}

export async function getOrdersBySeller(sellerId: string): Promise<SellerOrder[]> {
  const rows = await prisma.order.findMany({
    where: { sellerId },
    include: { buyer: buyerSelect },
    orderBy: { orderedAt: 'desc' },
  })
  return rows.map(toSellerOrder)
}

export async function getSellerOverview(sellerId: string): Promise<SellerOverview> {
  const [totalOrders, revenue, pendingOrders, awaitingShipment, completedOrders] =
    await Promise.all([
      prisma.order.count({ where: { sellerId } }),
      prisma.order.aggregate({ where: { sellerId }, _sum: { amount: true } }),
      prisma.order.count({ where: { sellerId, status: 'Pending' } }),
      prisma.order.count({ where: { sellerId, status: 'Paid' } }),
      prisma.order.count({ where: { sellerId, status: 'Completed' } }),
    ])

  return {
    totalOrders,
    totalRevenue: Number(revenue._sum.amount ?? 0),
    pendingOrders,
    awaitingShipment,
    completedOrders,
  }
}

export async function getSellerTabCounts(
  sellerId: string
): Promise<Record<'All Orders' | OrderStatus, number>> {
  const groups = await prisma.order.groupBy({
    by: ['status'],
    where: { sellerId },
    _count: true,
  })

  const base: Record<string, number> = {
    'All Orders': 0,
    Pending: 0,
    Paid: 0,
    Shipped: 0,
    Delivered: 0,
    Completed: 0,
    Cancelled: 0,
  }

  let total = 0
  for (const g of groups) {
    base[g.status] = g._count
    total += g._count
  }
  base['All Orders'] = total

  return base as Record<'All Orders' | OrderStatus, number>
}
