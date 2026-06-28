import { redirect, notFound } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getProductBySlug } from '@/lib/products'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'
import { ProductDetail } from '@/components/product/product-detail'

export default async function SellerProductPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const session = await getServerSession()
  if (!session?.sub || session.role !== 'seller') redirect('/connect')

  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const dashData = await getSellerDashboardData(session.sub).catch(() => null)

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={dashData?.storeName}
      tier={dashData?.tier}
    >
      <ProductDetail product={product} />
    </SellerShell>
  )
}
