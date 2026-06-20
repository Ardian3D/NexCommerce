import { AdminShell } from '@/components/admin/shell'
import { AlertTriangle } from 'lucide-react'

export default function AdminDisputesPage() {
  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div><h1 className="text-xl font-bold text-foreground">Disputes</h1><p className="text-sm text-muted-foreground">Manage buyer–seller disputes</p></div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card py-24">
          <AlertTriangle className="h-10 w-10 text-amber-400" />
          <p className="text-sm font-semibold text-foreground">No disputes yet</p>
          <p className="text-xs text-muted-foreground">Disputes will appear here when buyers or sellers file a claim.</p>
        </div>
      </div>
    </AdminShell>
  )
}
