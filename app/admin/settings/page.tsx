import { AdminShell } from '@/components/admin/shell'

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <div className="space-y-4 p-4">
        <div><h1 className="text-xl font-bold text-foreground">System Settings</h1><p className="text-sm text-muted-foreground">Configure platform-wide settings</p></div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* General */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h2 className="text-base font-bold text-foreground">General</h2>
            {[
              { label: 'Platform Name', value: 'NexCommerce' },
              { label: 'Support Email', value: 'support@nexcommerce.io' },
              { label: 'Platform Fee (%)', value: '2.5' },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs font-semibold text-muted-foreground">{f.label}</label>
                <input defaultValue={f.value} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary" />
              </div>
            ))}
          </div>

          {/* Blockchain */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h2 className="text-base font-bold text-foreground">Blockchain</h2>
            {[
              { label: 'Network', value: 'Solana Mainnet' },
              { label: 'RPC Endpoint', value: 'https://api.mainnet-beta.solana.com' },
              { label: 'Treasury Wallet', value: 'NEX...COMM' },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs font-semibold text-muted-foreground">{f.label}</label>
                <input defaultValue={f.value} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary" />
              </div>
            ))}
          </div>

          {/* Verification */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h2 className="text-base font-bold text-foreground">Verification</h2>
            {[
              { label: 'Auto-Approve', value: 'Disabled' },
              { label: 'Review SLA (hours)', value: '48' },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs font-semibold text-muted-foreground">{f.label}</label>
                <input defaultValue={f.value} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary" />
              </div>
            ))}
          </div>

          {/* Trust System */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h2 className="text-base font-bold text-foreground">Trust System</h2>
            {[
              { label: 'Starter Tier Max Score', value: '59' },
              { label: 'Ascent Tier Max Score', value: '79' },
              { label: 'Elite Tier Min Score', value: '90' },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs font-semibold text-muted-foreground">{f.label}</label>
                <input defaultValue={f.value} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary" />
              </div>
            ))}
          </div>
        </div>

        <button className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">
          Save Settings
        </button>
      </div>
    </AdminShell>
  )
}
