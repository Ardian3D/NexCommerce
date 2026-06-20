import { AdminShell } from '@/components/admin/shell'
import { Megaphone } from 'lucide-react'

export default function AdminPromotionsPage() {
  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-foreground">Promotions</h1><p className="text-sm text-muted-foreground">Manage discounts and promotional campaigns</p></div>
          <button className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110">+ New Promotion</button>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-24">
          <Megaphone className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-semibold text-foreground">No promotions yet</p>
          <p className="text-xs text-muted-foreground">Create discount codes and campaigns for your marketplace.</p>
          <button className="mt-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110">Create First Promotion</button>
        </div>
      </div>
    </AdminShell>
  )
}
