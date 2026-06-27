import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BadgeCheck, ShieldCheck, Package, Store } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'
import { getBuyerDashboardData } from '@/lib/actions/buyer-dashboard'
import { BuyerShell } from '@/components/buyer/shell'

async function getVerifiedSellers() {
  return prisma.user.findMany({
    where: { role: 'seller', verificationStatus: 'approved' },
    select: {
      id: true,
      fullName: true,
      sellerProfile: {
        select: {
          storeName: true,
          storeDescription: true,
          businessCategory: true,
          trustScore: true,
          currentTier: true,
          memberSince: true,
        },
      },
      _count: { select: { products: true } },
    },
    orderBy: { sellerProfile: { trustScore: 'desc' } },
  })
}

const TIER_COLOR: Record<string, string> = {
  Titanium: 'bg-slate-800 text-white',
  Elite: 'bg-violet-600 text-white',
  Ascent: 'bg-blue-600 text-white',
  Starter: 'bg-muted text-muted-foreground',
}

export default async function TrustedSellersPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [sellers, dashData] = await Promise.all([
    getVerifiedSellers(),
    getBuyerDashboardData(session.sub).catch(() => null),
  ])

  return (
    <BuyerShell
      walletAddress={session.wallet}
      displayName={dashData?.displayName}
      tier={dashData?.tier}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trusted Sellers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {sellers.length} verified seller{sellers.length !== 1 ? 's' : ''} on NexCommerce
          </p>
        </div>

        {sellers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-card py-20 text-center ring-1 ring-border">
            <Store className="h-16 w-16 text-muted-foreground/40" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">No verified sellers yet</h2>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sellers.map((seller) => {
              const name = seller.sellerProfile?.storeName ?? seller.fullName ?? 'Seller'
              const tier = seller.sellerProfile?.currentTier ?? 'Starter'
              const score = seller.sellerProfile?.trustScore ?? 0
              const category = seller.sellerProfile?.businessCategory ?? '—'
              const productCount = seller._count.products

              return (
                <div
                  key={seller.id}
                  className="flex flex-col rounded-2xl bg-card p-6 ring-1 ring-border transition-shadow hover:shadow-md"
                >
                  {/* Avatar + name */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-lg font-bold text-white">
                      {name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-semibold text-foreground">{name}</span>
                        <BadgeCheck className="h-4 w-4 shrink-0 text-blue-500" />
                      </div>
                      <span className="text-xs text-muted-foreground">{category}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${TIER_COLOR[tier] ?? TIER_COLOR.Starter}`}
                    >
                      {tier}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {score} Trust Score
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {seller.sellerProfile?.storeDescription ?? 'Verified seller on NexCommerce.'}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Package className="h-3.5 w-3.5" />
                    {productCount} product{productCount !== 1 ? 's' : ''}
                  </div>

                  <Link
                    href="/marketplace"
                    className="mt-4 flex w-full items-center justify-center rounded-lg border border-border py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    Browse Products
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </BuyerShell>
  )
}
