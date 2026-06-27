import { redirect } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { getBuyerDashboardData } from '@/lib/actions/buyer-dashboard'
import { BuyerShell } from '@/components/buyer/shell'

export default async function AiAssistantPage() {
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
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-500/30">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Nex AI Assistant</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Your personal AI shopping assistant. Get personalized product recommendations,
          price analysis, and seller insights — powered by Claude AI.
        </p>
        <div className="mt-6 flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700">
          <Sparkles className="h-3.5 w-3.5" />
          Coming Soon — In Development
        </div>
      </div>
    </BuyerShell>
  )
}
