import type { Metadata } from 'next'
import { BuyerShell } from '@/components/buyer/shell'
import { ReviewClient } from '@/components/review/review-client'
import { getProductBySlug, getProducts } from '@/lib/products'
import { type Order } from '@/lib/orders'

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
  const products = await getProducts()
  
  const product = await getProductBySlug(slug ?? DEFAULT_SLUG) ?? await getProductBySlug(DEFAULT_SLUG) ?? products[2]

  // Create a default order object for review page
  const order: Order = {
    id: 'default-order',
    productSlug: product.slug,
    productName: product.name,
    productSubtitle: product.subtitle,
    seller: product.seller,
    image: product.image,
    status: 'Completed',
    amount: product.price,
    items: 1,
    orderedAt: new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    fulfillment: {
      label: 'Delivered',
      value: 'Delivered',
    },
  }

  return (
    <BuyerShell>
      <ReviewClient product={product} order={order} />
    </BuyerShell>
  )
}
