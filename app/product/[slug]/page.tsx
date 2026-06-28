import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProductDetail } from '@/components/product/product-detail'
import { getProductBySlug, getProductSlugs } from '@/lib/products'

export async function generateStaticParams() {
  try {
    const slugs = await getProductSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product not found | NexCommerce' }
  return {
    title: `${product.name} | NexCommerce`,
    description: product.subtitle,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  return <ProductDetail product={product} />
}
