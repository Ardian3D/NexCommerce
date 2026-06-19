import type { Metadata } from 'next'
import { BuyerShell } from '@/components/buyer/shell'
import { ReviewClient } from '@/components/review/review-client'
import { getProductBySlug, products } from '@/lib/products'
import { orders, type Order } from '@/lib/orders'

export const metadata: Metadata = {
  title: 'Write a Review · NexCommerce',
  description: 'Share your experience and help other buyers make better decisions.',
}

const DEFAULT_SLUG = 'logitech-g-pro-x-superlight-2'

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>
}) {
  const { product: slug } = await searchParams
  const product = getProductBySlug(slug ?? DEFAULT_SLUG) ?? getProductBySlug(DEFAULT_SLUG) ?? products[2]

  const order: Order =
    orders.find((o) => o.productSlug === product.slug) ?? orders[0]

  return (
    <BuyerShell>
      <ReviewClient product={product} order={order} />
    </BuyerShell>
  )
}
