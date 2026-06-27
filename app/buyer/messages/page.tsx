import { redirect } from 'next/navigation'
import { MessageSquare, Sparkles } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { getBuyerDashboardData } from '@/lib/actions/buyer-dashboard'
import { BuyerShell } from '@/components/buyer/shell'

export default async function MessagesPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const dashData = await getBuyerDashboardData(session.sub).catch(() => null)

  return (
    <BuyerShell
      walletAddress={session.wallet}
      displayName={dashData?.displayName}
      tier={dashData?.tier}
    >
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 ring-1 ring-border">
          <MessageSquare className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Messages</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Direct messaging between buyers and sellers is coming soon.
          You'll be able to chat with verified sellers before and after a purchase.
        </p>
        <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" />
          Coming Soon
        </div>
      </div>
    </BuyerShell>
  )
}
