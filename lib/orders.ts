import { prisma } from './db'

export type OrderStatus =
  | 'Pending'
  | 'Paid'
  | 'Shipped'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled'

export type Order = {
  id: string
  productSlug: string
  productName: string
  productSubtitle: string
  seller: string
  image: string
  status: OrderStatus
  amount: number
  items: number
  orderedAt: string
  fulfillment: {
    label: string
    value: string
  }
}

export type OrderSummary = {
  totalOrders: number
  totalSpent: number
  deliveredOrders: number
  pendingOrders: number
  cancelledOrders: number
}

export const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Paid: 'bg-emerald-100 text-emerald-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Completed: 'bg-violet-100 text-violet-700',
  Cancelled: 'bg-red-100 text-red-700',
}

export const statusDot: Record<OrderStatus, string> = {
  Pending: 'bg-amber-500',
  Paid: 'bg-emerald-500',
  Shipped: 'bg-blue-500',
  Delivered: 'bg-green-500',
  Completed: 'bg-violet-500',
  Cancelled: 'bg-red-500',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toOrder(row: any): Order {
  return {
    id: row.id,
    productSlug: row.productSlug ?? '',
    productName: row.productName ?? '',
    productSubtitle: row.productSubtitle ?? '',
    seller: row.seller?.sellerProfile?.storeName ?? row.seller?.fullName ?? '',
    image: row.image ?? '',
    status: row.status as OrderStatus,
    amount: Number(row.amount),
    items: row.items,
    orderedAt: new Date(row.orderedAt).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    fulfillment: {
      label: row.fulfillmentLabel ?? '',
      value: row.fulfillmentValue ?? '',
    },
  }
}

const sellerSelect = {
  select: {
    fullName: true,
    sellerProfile: { select: { storeName: true } },
  },
}

export async function getOrdersByBuyer(buyerId: string): Promise<Order[]> {
  const rows = await prisma.order.findMany({
    where: { buyerId },
    include: { seller: sellerSelect },
    orderBy: { orderedAt: 'desc' },
  })
  return rows.map(toOrder)
}

export async function getOrderSummary(buyerId: string): Promise<OrderSummary> {
  const [totalOrders, totalSpent, deliveredOrders, pendingOrders, cancelledOrders] =
    await Promise.all([
      prisma.order.count({ where: { buyerId } }),
      prisma.order.aggregate({ where: { buyerId }, _sum: { amount: true } }),
      prisma.order.count({ where: { buyerId, status: 'Delivered' } }),
      prisma.order.count({ where: { buyerId, status: 'Pending' } }),
      prisma.order.count({ where: { buyerId, status: 'Cancelled' } }),
    ])

  return {
    totalOrders,
    totalSpent: Number(totalSpent._sum.amount ?? 0),
    deliveredOrders,
    pendingOrders,
    cancelledOrders,
  }
}
