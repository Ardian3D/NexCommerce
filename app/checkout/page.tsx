import { BuyerShell } from '@/components/buyer/shell'
import { CheckoutClient } from '@/components/checkout/checkout-client'
import { getProducts } from '@/lib/products'

export const metadata = {
  title: 'Checkout | NexCommerce',
  description: 'Review your order and complete your secure payment on Solana.',
}

export default async function CheckoutPage({
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
      <CheckoutClient product={product} initialQty={initialQty} />
    </BuyerShell>
  )
}
