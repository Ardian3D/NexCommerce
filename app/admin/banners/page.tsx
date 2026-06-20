import { AdminShell } from '@/components/admin/shell'
import { Image as ImageIcon } from 'lucide-react'

export default function AdminBannersPage() {
  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-foreground">Banners</h1><p className="text-sm text-muted-foreground">Manage homepage and marketplace banners</p></div>
          <button className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110">+ Upload Banner</button>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-24">
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-semibold text-foreground">No banners uploaded</p>
          <p className="text-xs text-muted-foreground">Upload banners to display on the homepage and marketplace.</p>
          <button className="mt-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110">Upload First Banner</button>
        </div>
      </div>
    </AdminShell>
  )
}
