'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { getServerSession } from '@/lib/auth/session'

export async function removeFromWishlist(productId: number) {
  const session = await getServerSession()
  if (!session?.sub) throw new Error('Unauthorized')

  await prisma.wishlist.deleteMany({
    where: { buyerId: session.sub, productId },
  })

  revalidatePath('/buyer/wishlist')
  revalidatePath('/buyer/dashboard')
}

export async function addToWishlist(productId: number) {
  const session = await getServerSession()
  if (!session?.sub) throw new Error('Unauthorized')

  await prisma.wishlist.upsert({
    where: { buyerId_productId: { buyerId: session.sub, productId } },
    update: {},
    create: { buyerId: session.sub, productId },
  })

  revalidatePath('/buyer/wishlist')
  revalidatePath('/buyer/dashboard')
}

export async function getWishlistItems(userId: string) {
  const items = await prisma.wishlist.findMany({
    where: { buyerId: userId },
    orderBy: { createdAt: 'desc' },
  })

  if (items.length === 0) return []

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) } },
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      oldPrice: true,
      image: true,
      tier: true,
      score: true,
      inStock: true,
      seller: {
        select: {
          fullName: true,
          sellerProfile: { select: { storeName: true } },
        },
      },
    },
  })

  return products.map((p) => ({
    ...p,
    price: `$${Number(p.price).toFixed(2)}`,
    oldPrice: p.oldPrice ? `$${Number(p.oldPrice).toFixed(2)}` : null,
    sellerName: p.seller.sellerProfile?.storeName ?? p.seller.fullName ?? 'Seller',
  }))
}
