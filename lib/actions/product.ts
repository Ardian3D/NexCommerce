'use server'

import { prisma } from '@/lib/db'
import { requireSession } from '@/lib/auth/session'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    + '-' + Date.now().toString(36)
}

export type CreateProductInput = {
  name: string
  category: string
  price: string
  stock: string
  description: string
  features: string[]
  tags: string[]
  image?: string
  status: 'published' | 'draft'
}

export type CreateProductResult =
  | { success: true; slug: string; id: number }
  | { success: false; error: string }

export async function createProduct(
  input: CreateProductInput,
): Promise<CreateProductResult> {
  try {
    const session = await requireSession()
    if (!session.sub) return { success: false, error: 'Not authenticated' }

    const slug = slugify(input.name.trim() || 'product')
    const tier = 'Ascent' // default tier for new products

    const product = await prisma.product.create({
      data: {
        slug,
        name: input.name.trim(),
        subtitle: '',
        sellerId: session.sub,
        tier,
        price: parseFloat(input.price) || 0,
        inStock: parseInt(input.stock) || 0,
        category: input.category,
        description: input.description ? [input.description] : [],
        features: input.features,
        image: input.image ?? null,
        status: input.status,
      },
    })

    return { success: true, slug: product.slug, id: product.id }
  } catch (err) {
    console.error('createProduct error:', err)
    return { success: false, error: 'Failed to create product' }
  }
}
