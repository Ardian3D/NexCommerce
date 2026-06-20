import { AdminShell } from '@/components/admin/shell'
import { getAdminProducts } from '@/lib/actions/admin'
import { Package, BadgeCheck } from 'lucide-react'

const tierStyle: Record<string, string> = {
  Elite: 'bg-violet-100 text-violet-700',
  Ascent: 'bg-blue-100 text-blue-700',
  Titanium: 'bg-slate-100 text-slate-700',
}

export default async function AdminProductsPage() {
  const products = await getAdminProducts()

  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Products</h1>
            <p className="text-sm text-muted-foreground">{products.length} products listed on platform</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold">
            <Package className="h-4 w-4 text-blue-500" />
            {products.length} Products
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Seller</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Orders</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">No products yet</td></tr>
                ) : products.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-muted" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground max-w-[180px]">{p.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[180px]">{p.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs">
                        <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="truncate max-w-[120px]">
                          {p.seller.sellerProfile?.storeName ?? p.seller.fullName ?? '—'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tierStyle[p.tier] ?? 'bg-slate-100 text-slate-700'}`}>
                        {p.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-foreground">${Number(p.price).toFixed(2)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p.inStock}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p._count.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
