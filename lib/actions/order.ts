'use server'

import { prisma } from '@/lib/db'
import { requireSession } from '@/lib/auth/session'

export type PlaceOrderInput = {
  productSlug: string
  qty: number
}

export type PlaceOrderResult =
  | { success: true; orderId: string }
  | { success: false; error: string }

export async function placeOrder(
  input: PlaceOrderInput,
): Promise<PlaceOrderResult> {
  try {
    const session = await requireSession()
    if (!session.sub) return { success: false, error: 'Not authenticated' }

    const product = await prisma.product.findUnique({
      where: { slug: input.productSlug },
      select: {
        id: true,
        name: true,
        subtitle: true,
        image: true,
        price: true,
        inStock: true,
        sellerId: true,
      },
    })

    if (!product) return { success: false, error: 'Product not found' }
    if (product.inStock < input.qty)
      return { success: false, error: 'Insufficient stock' }
    if (product.sellerId === session.sub)
      return { success: false, error: 'Cannot buy your own product' }

    const orderId = `NC-${Date.now().toString(36).toUpperCase()}`

    const [order] = await prisma.$transaction([
      prisma.order.create({
        data: {
          id: orderId,
          buyerId: session.sub,
          sellerId: product.sellerId,
          productId: product.id,
          productSlug: input.productSlug,
          productName: product.name,
          productSubtitle: product.subtitle ?? null,
          image: product.image,
          status: 'Paid',
          amount: Number(product.price) * input.qty,
          items: input.qty,
          fulfillmentLabel: 'Shipping',
          fulfillmentValue: 'Standard delivery',
          metaLabel: 'Payment',
          metaValue: 'Solana Pay',
          paymentChip: 'USDC',
        },
      }),
      prisma.product.update({
        where: { id: product.id },
        data: { inStock: { decrement: input.qty } },
      }),
    ])

    return { success: true, orderId: order.id }
  } catch (err) {
    console.error('placeOrder error:', err)
    return { success: false, error: 'Failed to place order' }
  }
}
