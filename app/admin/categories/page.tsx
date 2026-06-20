import { AdminShell } from '@/components/admin/shell'

const categories = [
  { name: 'Electronics', count: 42, icon: '💻' },
  { name: 'Gaming', count: 38, icon: '🎮' },
  { name: 'Accessories', count: 29, icon: '⌚' },
  { name: 'Home & Living', count: 21, icon: '🏠' },
  { name: 'Fashion', count: 18, icon: '👗' },
  { name: 'Books', count: 14, icon: '📚' },
  { name: 'Sports', count: 11, icon: '🏋️' },
  { name: 'Beauty', count: 9, icon: '✨' },
  { name: 'Digital Products', count: 7, icon: '💾' },
]

export default function AdminCategoriesPage() {
  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-foreground">Categories</h1><p className="text-sm text-muted-foreground">Manage marketplace categories</p></div>
          <button className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110">+ Add Category</button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.count} products</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-primary hover:underline">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
