import { redirect } from 'next/navigation'
import { Megaphone, Sparkles, Mail, Tag, Share2, Zap } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'

const tools = [
  {
    icon: Mail,
    title: 'Email Campaigns',
    description: 'Send targeted emails to your buyer list with promotions and updates.',
    tint: 'text-blue-600 bg-blue-500/10',
  },
  {
    icon: Tag,
    title: 'Discount Codes',
    description: 'Create and manage promo codes to drive more sales.',
    tint: 'text-violet-600 bg-violet-500/10',
  },
  {
    icon: Share2,
    title: 'Social Sharing',
    description: 'Auto-generate share cards for Twitter, Telegram, and more.',
    tint: 'text-sky-600 bg-sky-500/10',
  },
  {
    icon: Zap,
    title: 'Flash Sales',
    description: 'Run timed promotions with countdown timers on your product pages.',
    tint: 'text-amber-600 bg-amber-500/10',
  },
]

export default async function SellerMarketingPage() {
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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Marketing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tools to grow your store and reach more buyers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <div key={t.title} className="rounded-2xl border border-border bg-card p-5">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${t.tint}`}>
                <t.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              <button
                disabled
                className="mt-4 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-muted text-xs font-semibold text-muted-foreground"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Coming Soon
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5 p-6 text-center">
          <Megaphone className="mx-auto h-10 w-10 text-primary/60" />
          <h3 className="mt-4 text-base font-semibold text-foreground">
            Nex Marketing Suite
          </h3>
          <p className="mt-2 max-w-sm mx-auto text-sm text-muted-foreground">
            Full marketing automation powered by AI is launching soon. Be the first to access it.
          </p>
          <button
            disabled
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Notify Me When Live
          </button>
        </div>
      </div>
    </SellerShell>
  )
}
