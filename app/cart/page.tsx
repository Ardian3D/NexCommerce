import { BuyerShell } from '@/components/buyer/shell'
import { CartClient } from '@/components/cart/cart-client'
import { products } from '@/lib/products'

export const metadata = {
  title: 'Your Cart | NexCommerce',
  description: 'Review the items in your cart before checking out.',
}

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; qty?: string }>
}) {
  const { product: slug, qty } = await searchParams

  const product =
    products.find((p) => p.slug === slug) ??
    products.find((p) => p.slug === 'logitech-g-pro-x-superlight-2') ??
    products[0]

  const initialQty = Number(qty) > 0 ? Number(qty) : 1

  return (
    <BuyerShell>
      <CartClient product={product} initialQty={initialQty} />
    </BuyerShell>
  )
}
