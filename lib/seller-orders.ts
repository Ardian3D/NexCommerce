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
  /** Secondary line under the status badge */
  meta: {
    label: string
    /** Optional emphasized value (e.g. tracking number or date) */
    value?: string
    /** Optional badge: 'solana' renders the Solana logo + label */
    chip?: 'solana'
  }
}

export const sellerOrders: SellerOrder[] = [
  {
    id: '#NC-2025-05-24-8921',
    productSlug: 'logitech-g-pro-x-superlight-2',
    productName: 'Logitech G Pro X Superlight 2',
    image: '/store/product-mouse.png',
    unitPrice: 149.99,
    qty: 1,
    buyer: 'PhantomUser',
    orderedAt: 'May 24, 2025 · 10:42 AM',
    status: 'Paid',
    meta: { label: 'Payment Confirmed', chip: 'solana' },
  },
  {
    id: '#NC-2025-05-23-7754',
    productSlug: 'apple-airpods-pro-2nd-gen',
    productName: 'Apple AirPods Pro 2nd Gen',
    image: '/market/airpods.png',
    unitPrice: 189.99,
    qty: 1,
    buyer: 'SolanaTrader',
    orderedAt: 'May 23, 2025 · 03:15 PM',
    status: 'Shipped',
    meta: { label: 'Tracking ID', value: '1Z999AA10123456784' },
  },
  {
    id: '#NC-2025-05-22-5532',
    productSlug: 'keychron-k8-pro-mechanical-keyboard',
    productName: 'Keychron K8 Pro Mechanical Keyboard',
    image: '/market/keyboard.png',
    unitPrice: 89.99,
    qty: 1,
    buyer: 'Web3Gamer',
    orderedAt: 'May 22, 2025 · 11:09 AM',
    status: 'Delivered',
    meta: { label: 'Delivered on', value: 'May 24, 2025' },
  },
  {
    id: '#NC-2025-05-21-2210',
    productSlug: 'lg-ultragear-27-144hz-gaming-monitor',
    productName: 'LG UltraGear 27" 144Hz Gaming Monitor',
    image: '/market/monitor.png',
    unitPrice: 229.99,
    qty: 1,
    buyer: 'DefiHunter',
    orderedAt: 'May 21, 2025 · 09:20 AM',
    status: 'Pending',
    meta: { label: 'Awaiting payment' },
  },
  {
    id: '#NC-2025-05-20-1099',
    productSlug: 'secretlab-titan-evo-2022',
    productName: 'Secretlab Titan Evo 2022',
    image: '/market/chair.png',
    unitPrice: 449.99,
    qty: 1,
    buyer: 'NFTCollector',
    orderedAt: 'May 20, 2025 · 02:45 PM',
    status: 'Cancelled',
    meta: { label: 'Cancelled on', value: 'May 21, 2025' },
  },
]

export const sellerTabCounts: Record<'All Orders' | OrderStatus, number> = {
  'All Orders': 24,
  Pending: 7,
  Paid: 8,
  Shipped: 5,
  Delivered: 3,
  Completed: 18,
  Cancelled: 2,
}

export const sellerOrderOverview = {
  totalOrders: 24,
  totalRevenue: 5689.7,
  pendingOrders: 7,
  awaitingShipment: 5,
  completedOrders: 18,
}
