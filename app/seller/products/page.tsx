import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Package, ShoppingCart, Star, Eye } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'

async function getSellerProducts(sellerId: string) {
  return prisma.product.findMany({
    where: { sellerId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      subtitle: true,
      slug: true,
      price: true,
      inStock: true,
      category: true,
      image: true,
      rating: true,
      reviews: true,
      tier: true,
      badgeLabel: true,
    },
  })
}

export default async function SellerProductsPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [products, dashData] = await Promise.all([
    getSellerProducts(session.sub),
    getSellerDashboardData(session.sub).catch(() => null),
  ])

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={dashData?.storeName}
      tier={dashData?.tier}
      pendingOrdersCount={dashData?.pendingOrders}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Products</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {products.length} product{products.length !== 1 ? 's' : ''} in your store
            </p>
          </div>
          <Link
            href="/seller/products/new"
            className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-opacity hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground">No products yet</h2>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Start selling by listing your first product.
            </p>
            <Link
              href="/seller/products/new"
              className="mt-6 flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-opacity hover:opacity-95"
            >
              <Plus className="h-4 w-4" />
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                  )}
                  {p.badgeLabel && (
                    <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      {p.badgeLabel}
                    </span>
                  )}
                  <span
                    className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      p.inStock > 0
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {p.inStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {p.category ?? p.tier}
                  </p>
                  <h3 className="mt-0.5 truncate text-sm font-semibold text-foreground">{p.name}</h3>
                  {p.subtitle && (
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.subtitle}</p>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-foreground">
                      ${Number(p.price).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {p.rating ? Number(p.rating).toFixed(1) : '—'}
                      <span className="text-muted-foreground/60">({p.reviews})</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={`/seller/products/${p.slug}`}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Link>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>{p.inStock} stock</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add product tile */}
            <Link
              href="/seller/products/new"
              className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Plus className="h-8 w-8" />
              <span className="text-sm font-semibold">Add Product</span>
            </Link>
          </div>
        )}
      </div>
    </SellerShell>
  )
}
