import { redirect } from 'next/navigation'
import { Sparkles, Package, BarChart3, MessageSquare, TrendingUp } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'

const features = [
  {
    icon: Package,
    title: 'AI Product Descriptions',
    description: 'Generate SEO-optimized titles, descriptions, and tags instantly.',
  },
  {
    icon: BarChart3,
    title: 'Sales Predictions',
    description: 'Get AI forecasts on which products will perform best this week.',
  },
  {
    icon: TrendingUp,
    title: 'Pricing Optimizer',
    description: 'Smart pricing recommendations based on market trends.',
  },
  {
    icon: MessageSquare,
    title: 'Review Insights',
    description: 'Summarize and analyze customer feedback automatically.',
  },
]

export default async function SellerAiPage() {
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
      <div className="flex flex-col items-center py-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-violet-500/30">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Nex AI Assistant</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Your AI-powered seller toolkit. Optimize listings, predict trends, and grow your store
          — all powered by Claude AI.
        </p>
        <div className="mt-5 flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400">
          <Sparkles className="h-3.5 w-3.5" />
          Coming Soon — In Development
        </div>

        <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 text-left">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SellerShell>
  )
}
