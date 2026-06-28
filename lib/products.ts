import { prisma } from './db'

export type Tier = 'Elite' | 'Ascent' | 'Titanium'

export type Product = {
  id: number
  slug: string
  name: string
  subtitle: string
  seller: string
  sellerWallet: string
  tier: Tier
  score: number
  price: number
  oldPrice?: number
  image: string
  gallery: string[]
  category: string
  subcategory: string
  inStock: number
  description: string[]
  features: string[]
  specs: { label: string; value: string }[]
  rating: number
  reviews: number
  badge?: { label: string; tone: 'hot' | 'new' | 'best' }
  seller_info: {
    products: number
    memberSince: string
    responseTime: string
  }
}

export const tierStyles: Record<Tier, string> = {
  Elite: 'bg-violet-100 text-violet-700',
  Ascent: 'bg-blue-100 text-blue-700',
  Titanium: 'bg-slate-200 text-slate-700',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle ?? '',
    seller: row.seller?.sellerProfile?.storeName ?? row.seller?.fullName ?? '',
    sellerWallet: row.seller?.walletAddress ?? '',
    tier: row.tier as Tier,
    score: row.score ?? 0,
    price: Number(row.price),
    oldPrice: row.oldPrice ? Number(row.oldPrice) : undefined,
    image: row.image ?? '',
    gallery: (row.gallery as string[]) ?? [],
    category: row.category ?? '',
    subcategory: row.subcategory ?? '',
    inStock: row.inStock,
    description: (row.description as string[]) ?? [],
    features: (row.features as string[]) ?? [],
    specs: (row.specs as { label: string; value: string }[]) ?? [],
    rating: Number(row.rating ?? 0),
    reviews: row.reviews,
    badge: row.badgeLabel
      ? { label: row.badgeLabel, tone: (row.badgeTone ?? 'hot') as 'hot' | 'new' | 'best' }
      : undefined,
    seller_info: {
      products: row.seller?._count?.products ?? 0,
      memberSince: row.seller?.sellerProfile?.memberSince ?? '',
      responseTime: row.seller?.sellerProfile?.responseTime ?? '',
    },
  }
}

const sellerInclude = {
  select: {
    fullName: true,
    walletAddress: true,
    _count: { select: { products: true } },
    sellerProfile: {
      select: { storeName: true, memberSince: true, responseTime: true },
    },
  },
}

export async function getProducts(filters?: {
  category?: string
  tier?: string
}): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: {
      status: 'published',
      ...(filters?.category && { category: filters.category }),
      ...(filters?.tier && { tier: filters.tier as 'Elite' | 'Ascent' | 'Titanium' }),
    },
    include: { seller: sellerInclude },
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: { seller: sellerInclude },
  })
  return row ? toProduct(row) : null
}

export async function getProductSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({ select: { slug: true } })
  return rows.map((r) => r.slug)
}
