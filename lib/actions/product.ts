'use server'

import { prisma } from '@/lib/db'
import { requireSession } from '@/lib/auth/session'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
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
  | { success: true; slug: string; id: number; name: string }
  | { success: false; error: string }

export async function createProduct(
  input: CreateProductInput,
): Promise<CreateProductResult> {
  const session = await requireSession()
  if (!session.sub) return { success: false, error: 'Session expired. Please reconnect your wallet.' }

  if (!input.name.trim()) return { success: false, error: 'Product name is required.' }
  if (!input.category) return { success: false, error: 'Please select a category.' }
  if (!input.price || parseFloat(input.price) <= 0) return { success: false, error: 'Please enter a valid price.' }

  const slug = slugify(input.name.trim())

  try {
    const product = await prisma.product.create({
      data: {
        slug,
        name: input.name.trim(),
        subtitle: '',
        sellerId: session.sub,
        tier: 'Ascent',
        price: parseFloat(input.price),
        inStock: parseInt(input.stock) || 0,
        category: input.category,
        description: input.description ? [input.description] : [],
        features: input.features,
        image: input.image && !input.image.startsWith('blob:') ? input.image : null,
        status: input.status,
      },
    })

    return { success: true, slug: product.slug, id: product.id, name: product.name }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('Unique constraint') && msg.includes('slug'))
      return { success: false, error: 'A product with this name already exists. Try a different name.' }
    if (msg.includes('foreign key'))
      return { success: false, error: 'Seller account not found. Please reconnect.' }
    console.error('createProduct error:', msg)
    return { success: false, error: `Database error: ${msg.slice(0, 100)}` }
  }
}
