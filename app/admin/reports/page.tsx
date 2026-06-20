import { AdminShell } from '@/components/admin/shell'
import { AdminReportsSummary, AdminTopReportReasons } from '@/components/admin/reports'

export default function AdminReportsPage() {
  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div><h1 className="text-xl font-bold text-foreground">Reports</h1><p className="text-sm text-muted-foreground">Platform reports and flagged content</p></div>
        <AdminReportsSummary />
        <AdminTopReportReasons />
      </div>
    </AdminShell>
  )
}
