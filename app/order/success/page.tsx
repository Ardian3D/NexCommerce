import { BuyerShell } from '@/components/buyer/shell'
import { SuccessClient } from '@/components/order/success-client'
import { getProducts } from '@/lib/products'

export const metadata = {
  title: 'Payment Confirmed | NexCommerce',
  description: 'Your order has been placed successfully.',
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; qty?: string }>
}) {
  const { product: slug, qty } = await searchParams
  const products = await getProducts()

  const product =
    products.find((p) => p.slug === slug) ??
    products.find((p) => p.slug === 'logitech-g-pro-x-superlight-2') ??
    products[0]

  const initialQty = Number(qty) > 0 ? Number(qty) : 1

  return (
    <BuyerShell>
      <SuccessClient product={product} qty={initialQty} />
    </BuyerShell>
  )
}
