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
  /** Secondary line under the status, e.g. delivery window or completion date */
  fulfillment: {
    label: string
    value: string
  }
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

export const orders: Order[] = [
  {
    id: '#NC-2025-05-24-8921',
    productSlug: 'logitech-g-pro-x-superlight-2',
    productName: 'Logitech G Pro X Superlight 2',
    productSubtitle: 'Wireless Gaming Mouse',
    seller: 'Aim Labs Store',
    image: '/store/product-mouse.png',
    status: 'Paid',
    amount: 155.73,
    items: 1,
    orderedAt: 'May 24, 2025 · 10:42 AM',
    fulfillment: { label: 'Estimated delivery', value: 'May 28 – Jun 1, 2025' },
  },
  {
    id: '#NC-2025-05-18-7754',
    productSlug: 'apple-airpods-pro-2nd-gen',
    productName: 'Apple AirPods Pro 2nd Gen',
    productSubtitle: 'Active Noise Cancelling Earbuds',
    seller: 'Tech Haven',
    image: '/market/airpods.png',
    status: 'Shipped',
    amount: 189.99,
    items: 1,
    orderedAt: 'May 18, 2025 · 03:15 PM',
    fulfillment: { label: 'Estimated delivery', value: 'May 22 – May 26, 2025' },
  },
  {
    id: '#NC-2025-05-10-5532',
    productSlug: 'keychron-k8-pro-mechanical-keyboard',
    productName: 'Keychron K8 Pro Mechanical Keyboard',
    productSubtitle: 'Wireless Mechanical Keyboard',
    seller: 'NextGen Store',
    image: '/market/keyboard.png',
    status: 'Delivered',
    amount: 89.99,
    items: 1,
    orderedAt: 'May 10, 2025 · 11:09 AM',
    fulfillment: { label: 'Delivered on', value: 'May 14, 2025' },
  },
  {
    id: '#NC-2025-05-02-2210',
    productSlug: 'lg-ultragear-27-144hz-gaming-monitor',
    productName: 'LG UltraGear 27" 144Hz Gaming Monitor',
    productSubtitle: 'QHD Gaming Monitor',
    seller: 'Elite Gear Store',
    image: '/market/monitor.png',
    status: 'Completed',
    amount: 229.99,
    items: 1,
    orderedAt: 'May 2, 2025 · 09:20 AM',
    fulfillment: { label: 'Completed on', value: 'May 7, 2025' },
  },
  {
    id: '#NC-2025-04-28-1099',
    productSlug: 'secretlab-titan-evo-2022',
    productName: 'Secretlab Titan Evo 2022',
    productSubtitle: 'Premium Ergonomic Gaming Chair',
    seller: 'Game On Store',
    image: '/market/chair.png',
    status: 'Cancelled',
    amount: 449.99,
    items: 1,
    orderedAt: 'Apr 28, 2025 · 02:45 PM',
    fulfillment: { label: 'Cancelled on', value: 'Apr 29, 2025' },
  },
]

export const orderSummary = {
  totalOrders: 24,
  totalSpent: 1115.7,
  deliveredOrders: 12,
  pendingOrders: 3,
  cancelledOrders: 2,
}
