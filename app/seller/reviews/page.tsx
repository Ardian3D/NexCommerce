import { redirect } from 'next/navigation'
import { Star, Sparkles, Package } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'

async function getSellerProductReviews(sellerId: string) {
  return prisma.product.findMany({
    where: { sellerId, reviews: { gt: 0 } },
    select: {
      id: true,
      name: true,
      image: true,
      rating: true,
      reviews: true,
      slug: true,
    },
    orderBy: { rating: 'desc' },
  })
}

export default async function SellerReviewsPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [products, dashData] = await Promise.all([
    getSellerProductReviews(session.sub),
    getSellerDashboardData(session.sub).catch(() => null),
  ])

  const totalReviews = products.reduce((s, p) => s + p.reviews, 0)
  const avgRating =
    products.length > 0
      ? products.reduce((s, p) => s + Number(p.rating ?? 0), 0) / products.length
      : 0

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={dashData?.storeName}
      tier={dashData?.tier}
      pendingOrdersCount={dashData?.pendingOrders}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Customer feedback for your products
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <p className="mt-3 text-xs font-medium text-muted-foreground">Avg. Rating</p>
            <p className="mt-0.5 text-2xl font-bold text-foreground">
              {products.length > 0 ? avgRating.toFixed(1) : '—'}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <Package className="h-5 w-5 text-muted-foreground" />
            <p className="mt-3 text-xs font-medium text-muted-foreground">Products Reviewed</p>
            <p className="mt-0.5 text-2xl font-bold text-foreground">{products.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 col-span-2 sm:col-span-1">
            <Star className="h-5 w-5 text-muted-foreground" />
            <p className="mt-3 text-xs font-medium text-muted-foreground">Total Reviews</p>
            <p className="mt-0.5 text-2xl font-bold text-foreground">{totalReviews}</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground">No reviews yet</h2>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Reviews from buyers will appear here once your products receive ratings.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-foreground">{p.name}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i <= Math.round(Number(p.rating ?? 0))
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-bold text-foreground">
                        {Number(p.rating ?? 0).toFixed(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({p.reviews} review{p.reviews !== 1 ? 's' : ''})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed reviews coming soon */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5 p-6 text-center">
          <Star className="mx-auto h-8 w-8 text-amber-400" />
          <h3 className="mt-3 text-base font-semibold text-foreground">Individual Review Breakdown</h3>
          <p className="mt-2 max-w-sm mx-auto text-sm text-muted-foreground">
            Buyer comments and detailed per-review listing are coming soon.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            Coming Soon
          </div>
        </div>
      </div>
    </SellerShell>
  )
}
