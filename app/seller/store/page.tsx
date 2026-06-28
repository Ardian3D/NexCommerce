import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'
import { SellerShell } from '@/components/seller/shell'
import { StoreProfileClient } from '@/components/seller/store-profile-client'

export default async function StoreProfilePage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const profile = await prisma.user.findUnique({
    where: { id: session.sub },
    select: {
      fullName: true,
      country: true,
      photoUrl: true,
      sellerProfile: {
        select: {
          storeName: true,
          storeDescription: true,
          storeWebsite: true,
          businessCategory: true,
          trustScore: true,
          currentTier: true,
          memberSince: true,
          responseTime: true,
        },
      },
    },
  })

  const rawProducts = await prisma.product.findMany({
    where: { sellerId: session.sub },
    orderBy: { createdAt: 'desc' },
  })

  const totalOrders = await prisma.order.count({ where: { sellerId: session.sub } })

  type StatRow = { status: string; _sum: { amount: number | null } }
  const rawStats = (await prisma.order.groupBy({
    by: ['status'],
    where: { sellerId: session.sub },
    _sum: { amount: true },
  })) as unknown as StatRow[]

  const sp = profile?.sellerProfile
  const totalRevenue = rawStats.reduce((s, g) => s + Number(g._sum.amount ?? 0), 0)
  const completedRevenue = rawStats
    .filter((g) => ['Delivered', 'Completed'].includes(g.status))
    .reduce((s, g) => s + Number(g._sum.amount ?? 0), 0)

  // Cast raw products — Prisma client may not have `status`/`score` in type on older generate
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products = (rawProducts as any[]).map((p: any) => ({
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
    image: p.image,
    tier: p.tier,
    score: p.score ?? 0,
    status: p.status ?? 'published',
  }))

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={sp?.storeName ?? profile?.fullName ?? undefined}
      tier={sp?.currentTier ?? undefined}
    >
      <StoreProfileClient
        storeName={sp?.storeName ?? profile?.fullName ?? 'My Store'}
        storeDescription={sp?.storeDescription ?? ''}
        storeWebsite={sp?.storeWebsite ?? null}
        businessCategory={sp?.businessCategory ?? null}
        country={profile?.country ?? null}
        photoUrl={profile?.photoUrl ?? null}
        trustScore={sp?.trustScore ?? 0}
        tier={sp?.currentTier ?? 'Starter'}
        memberSince={sp?.memberSince ?? undefined}
        responseTime={sp?.responseTime ?? undefined}
        totalProducts={rawProducts.length}
        totalOrders={totalOrders}
        totalRevenue={totalRevenue}
        completedRevenue={completedRevenue}
        products={products}
      />
    </SellerShell>
  )
}
