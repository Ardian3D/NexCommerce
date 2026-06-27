import { redirect } from 'next/navigation'
import { User, Mail, MapPin, MessageSquare, Globe, FileText } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'
import { getBuyerDashboardData } from '@/lib/actions/buyer-dashboard'
import { BuyerShell } from '@/components/buyer/shell'

async function getBuyerProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      fullName: true,
      email: true,
      country: true,
      telegram: true,
      twitter: true,
      bio: true,
      photoUrl: true,
      walletAddress: true,
      verificationStatus: true,
      createdAt: true,
      buyerProfile: {
        select: {
          occupation: true,
          interests: true,
          website: true,
          discord: true,
          linkedin: true,
          trustScore: true,
          currentTier: true,
        },
      },
    },
  })
}

export default async function SettingsPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [profile, dashData] = await Promise.all([
    getBuyerProfile(session.sub),
    getBuyerDashboardData(session.sub).catch(() => null),
  ])

  if (!profile) redirect('/connect')

  const shortWallet = `${session.wallet.slice(0, 8)}...${session.wallet.slice(-8)}`

  return (
    <BuyerShell
      walletAddress={session.wallet}
      displayName={dashData?.displayName}
      tier={dashData?.tier}
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your account information</p>
        </div>

        {/* Profile card */}
        <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
          <h2 className="font-semibold text-foreground">Profile Information</h2>
          <div className="mt-5 space-y-4">
            <Field icon={User} label="Full Name" value={profile.fullName} />
            <Field icon={Mail} label="Email" value={profile.email} />
            <Field icon={MapPin} label="Country" value={profile.country} />
            <Field icon={MessageSquare} label="Telegram" value={profile.telegram} />
            <Field icon={Globe} label="Twitter" value={profile.twitter} />
            <Field icon={FileText} label="Bio" value={profile.bio} multiline />
          </div>
        </div>

        {/* Buyer profile */}
        {profile.buyerProfile && (
          <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
            <h2 className="font-semibold text-foreground">Buyer Profile</h2>
            <div className="mt-5 space-y-4">
              <Field icon={User} label="Occupation" value={profile.buyerProfile.occupation} />
              <Field icon={Globe} label="Website" value={profile.buyerProfile.website} />
              <Field icon={MessageSquare} label="Discord" value={profile.buyerProfile.discord} />
              <Field icon={MessageSquare} label="LinkedIn" value={profile.buyerProfile.linkedin} />
            </div>
          </div>
        )}

        {/* Wallet */}
        <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
          <h2 className="font-semibold text-foreground">Wallet</h2>
          <div className="mt-4 rounded-xl bg-muted px-4 py-3">
            <p className="font-mono text-sm font-medium text-foreground">{shortWallet}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Phantom · Solana</p>
          </div>
        </div>

        {/* Trust */}
        <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
          <h2 className="font-semibold text-foreground">Trust & Tier</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {profile.buyerProfile?.trustScore ?? 0}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Trust Score</p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {profile.buyerProfile?.currentTier ?? 'Starter'}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Current Tier</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          To update your profile, go to your{' '}
          <a href="/identity" className="font-semibold text-primary hover:underline">
            Identity Card
          </a>
          .
        </p>
      </div>
    </BuyerShell>
  )
}

function Field({
  icon: Icon,
  label,
  value,
  multiline,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | null | undefined
  multiline?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`mt-0.5 text-sm font-medium text-foreground ${multiline ? 'whitespace-pre-wrap' : 'truncate'}`}>
          {value || <span className="italic text-muted-foreground">Not set</span>}
        </p>
      </div>
    </div>
  )
}
