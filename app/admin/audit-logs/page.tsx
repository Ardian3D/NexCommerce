import { AdminShell } from '@/components/admin/shell'

const mockLogs = [
  { action: 'User verified', actor: 'Admin', target: '0x8a7f...3d2e', time: 'Just now' },
  { action: 'Product approved', actor: 'Admin', target: 'Corsair Virtuoso', time: '5m ago' },
  { action: 'Order disputed', actor: 'System', target: '#NC-2025-05-24-8921', time: '12m ago' },
  { action: 'User rejected', actor: 'Admin', target: '0x7b8e...9f1a', time: '1h ago' },
  { action: 'Settings updated', actor: 'Admin', target: 'Platform Fee → 2.5%', time: '2h ago' },
]

export default function AdminAuditLogsPage() {
  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div><h1 className="text-xl font-bold text-foreground">Audit Logs</h1><p className="text-sm text-muted-foreground">Track all admin actions on the platform</p></div>
        <div className="rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Actor</th>
                  <th className="px-4 py-3">Target</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {mockLogs.map((l, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{l.action}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{l.actor}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{l.target}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{l.time}</td>
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
