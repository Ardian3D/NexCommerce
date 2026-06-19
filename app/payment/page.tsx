import { BuyerShell } from '@/components/buyer/shell'
import { PaymentClient } from '@/components/payment/payment-client'
import { products } from '@/lib/products'

export const metadata = {
  title: 'Payment | NexCommerce',
  description: 'Approve the transaction in your wallet to complete the purchase.',
}

export default async function PaymentPage({
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
      <PaymentClient product={product} qty={initialQty} />
    </BuyerShell>
  )
}
