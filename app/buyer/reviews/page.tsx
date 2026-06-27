import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Star, ShoppingBag, BadgeCheck } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'
import { getBuyerDashboardData } from '@/lib/actions/buyer-dashboard'
import { BuyerShell } from '@/components/buyer/shell'

async function getReviewableOrders(userId: string) {
  return prisma.order.findMany({
    where: {
      buyerId: userId,
      status: { in: ['Delivered', 'Completed'] },
    },
    orderBy: { orderedAt: 'desc' },
    select: {
      id: true,
      productName: true,
      productSlug: true,
      image: true,
      amount: true,
      orderedAt: true,
      seller: {
        select: {
          fullName: true,
          sellerProfile: { select: { storeName: true } },
        },
      },
    },
  })
}

export default async function ReviewsPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [orders, dashData] = await Promise.all([
    getReviewableOrders(session.sub),
    getBuyerDashboardData(session.sub).catch(() => null),
  ])

  return (
    <BuyerShell
      walletAddress={session.wallet}
      displayName={dashData?.displayName}
      tier={dashData?.tier}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Reviews</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Rate and review your completed orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-card py-20 text-center ring-1 ring-border">
            <Star className="h-16 w-16 text-muted-foreground/40" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">No completed orders to review</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Once your orders are delivered, you can leave a review here.
            </p>
            <Link
              href="/marketplace"
              className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const sellerName =
                order.seller.sellerProfile?.storeName ?? order.seller.fullName ?? 'Seller'
              return (
                <div
                  key={order.id}
                  className="flex items-center gap-4 rounded-2xl bg-card p-5 ring-1 ring-border"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted">
                    {order.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={order.image} alt={order.productName ?? ''} className="h-full w-full rounded-xl object-cover" />
                    ) : (
                      <ShoppingBag className="h-7 w-7 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{order.productName ?? 'Product'}</p>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      {sellerName}
                      <BadgeCheck className="h-3 w-3 text-blue-500" />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(order.orderedAt).toLocaleDateString('en-US', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                      {' · '}${Number(order.amount).toFixed(2)}
                    </p>
                  </div>

                  {/* Star rating (UI only — review system coming soon) */}
                  <div className="shrink-0 text-right">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="h-5 w-5 cursor-pointer text-muted-foreground transition-colors hover:fill-amber-400 hover:text-amber-400"
                        />
                      ))}
                    </div>
                    <Link
                      href="/review"
                      className="mt-2 block text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Write a review
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </BuyerShell>
  )
}
