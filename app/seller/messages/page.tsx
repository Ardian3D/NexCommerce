import { redirect } from 'next/navigation'
import { MessageSquare, Sparkles } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'

export default async function SellerMessagesPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const data = await getSellerDashboardData(session.sub).catch(() => null)

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={data?.storeName}
      tier={data?.tier}
      pendingOrdersCount={data?.pendingOrders}
    >
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 ring-1 ring-border">
          <MessageSquare className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Messages</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Direct messaging between buyers and sellers is coming soon.
          You'll be able to respond to buyer inquiries and build relationships in real time.
        </p>
        <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" />
          Coming Soon
        </div>
      </div>
    </SellerShell>
  )
}
