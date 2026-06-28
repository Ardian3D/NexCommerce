'use server'

import { prisma } from '@/lib/db'

export type ProductAlert = {
  productName: string
  productSlug: string
  category: string
  sellerName: string
  launchedAt: string
}

export async function getNewProductAlerts(limit = 5): Promise<ProductAlert[]> {
  const products = await prisma.product.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      name: true,
      slug: true,
      category: true,
      createdAt: true,
      seller: {
        select: {
          fullName: true,
          sellerProfile: { select: { storeName: true } },
        },
      },
    },
  })

  return products.map((p) => ({
    productName: p.name,
    productSlug: p.slug,
    category: p.category ?? 'Uncategorized',
    sellerName: p.seller?.sellerProfile?.storeName || p.seller?.fullName || 'Unknown Seller',
    launchedAt: new Date(p.createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  }))
}
