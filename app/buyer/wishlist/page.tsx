import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShieldCheck, BadgeCheck, Package, ShoppingBag } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { getWishlistItems, removeFromWishlist } from '@/lib/actions/wishlist'
import { getBuyerDashboardData } from '@/lib/actions/buyer-dashboard'
import { BuyerShell } from '@/components/buyer/shell'

export default async function WishlistPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [items, dashData] = await Promise.all([
    getWishlistItems(session.sub),
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Wishlist</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length} saved item{items.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/marketplace"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            Browse More
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-card py-20 text-center ring-1 ring-border">
            <Heart className="h-16 w-16 text-muted-foreground/40" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Save products you love and find them here later.
            </p>
            <Link
              href="/marketplace"
              className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-shadow hover:shadow-lg"
              >
                {/* Remove button */}
                <form action={removeFromWishlist.bind(null, item.id)}>
                  <button
                    type="submit"
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-pink-500 shadow-sm transition-colors hover:bg-white hover:text-pink-700"
                    title="Remove from wishlist"
                  >
                    <Heart className="h-4 w-4 fill-pink-500" />
                  </button>
                </form>

                {/* Product image */}
                <Link href={`/product/${item.slug}`}>
                  <div className="relative aspect-square bg-[#eef0f3]">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground/40" />
                      </div>
                    )}
                    {item.inStock === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-foreground">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-foreground hover:text-primary">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-base font-bold text-foreground">{item.price}</span>
                    {item.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">{item.oldPrice}</span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="truncate">{item.sellerName}</span>
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      {item.tier}
                    </span>
                    {item.score != null && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {item.score}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/product/${item.slug}`}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BuyerShell>
  )
}
