import { AdminShell } from '@/components/admin/shell'
import { Star } from 'lucide-react'

export default function AdminReviewsPage() {
  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div><h1 className="text-xl font-bold text-foreground">Reviews</h1><p className="text-sm text-muted-foreground">Monitor product reviews and ratings</p></div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card py-24">
          <Star className="h-10 w-10 text-amber-400" />
          <p className="text-sm font-semibold text-foreground">No reviews yet</p>
          <p className="text-xs text-muted-foreground">Product reviews from buyers will appear here.</p>
        </div>
      </div>
    </AdminShell>
  )
}
