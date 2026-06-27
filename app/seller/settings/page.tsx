import { redirect } from 'next/navigation'
import { User, Mail, MapPin, MessageSquare, Globe, FileText, Store, ShieldCheck } from 'lucide-react'
import { getServerSession } from '@/lib/auth/session'
import { prisma } from '@/lib/db'
import { getSellerDashboardData } from '@/lib/actions/seller-dashboard'
import { SellerShell } from '@/components/seller/shell'

async function getSellerProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      fullName: true,
      email: true,
      country: true,
      telegram: true,
      twitter: true,
      bio: true,
      walletAddress: true,
      verificationStatus: true,
      createdAt: true,
      sellerProfile: {
        select: {
          storeName: true,
          storeDescription: true,
          storeWebsite: true,
          businessCategory: true,
          yearsExperience: true,
          trustScore: true,
          currentTier: true,
          memberSince: true,
          responseTime: true,
        },
      },
    },
  })
}

export default async function SellerSettingsPage() {
  const session = await getServerSession()
  if (!session?.sub) redirect('/connect')

  const [profile, dashData] = await Promise.all([
    getSellerProfile(session.sub),
    getSellerDashboardData(session.sub).catch(() => null),
  ])

  if (!profile) redirect('/connect')

  const shortWallet = `${session.wallet.slice(0, 8)}...${session.wallet.slice(-8)}`

  return (
    <SellerShell
      walletAddress={session.wallet}
      storeName={dashData?.storeName}
      tier={dashData?.tier}
      pendingOrdersCount={dashData?.pendingOrders}
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your account and store information</p>
        </div>

        {/* Personal info */}
        <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
          <h2 className="font-semibold text-foreground">Personal Information</h2>
          <div className="mt-5 space-y-4">
            <Field icon={User} label="Full Name" value={profile.fullName} />
            <Field icon={Mail} label="Email" value={profile.email} />
            <Field icon={MapPin} label="Country" value={profile.country} />
            <Field icon={MessageSquare} label="Telegram" value={profile.telegram} />
            <Field icon={Globe} label="Twitter" value={profile.twitter} />
            <Field icon={FileText} label="Bio" value={profile.bio} multiline />
          </div>
        </div>

        {/* Store profile */}
        {profile.sellerProfile && (
          <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
            <h2 className="font-semibold text-foreground">Store Profile</h2>
            <div className="mt-5 space-y-4">
              <Field icon={Store} label="Store Name" value={profile.sellerProfile.storeName} />
              <Field icon={FileText} label="Description" value={profile.sellerProfile.storeDescription} multiline />
              <Field icon={Globe} label="Website" value={profile.sellerProfile.storeWebsite} />
              <Field icon={Store} label="Business Category" value={profile.sellerProfile.businessCategory} />
              <Field icon={User} label="Years of Experience" value={profile.sellerProfile.yearsExperience} />
              <Field icon={MessageSquare} label="Avg. Response Time" value={profile.sellerProfile.responseTime} />
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

        {/* Trust & Tier */}
        <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
          <h2 className="font-semibold text-foreground">Trust & Tier</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {profile.sellerProfile?.trustScore ?? 0}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Trust Score</p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {profile.sellerProfile?.currentTier ?? 'Starter'}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Current Tier</p>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
          <h2 className="font-semibold text-foreground">Verification</h2>
          <div className="mt-4 flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                profile.verificationStatus === 'approved'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-amber-100 text-amber-600'
              }`}
            >
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground capitalize">
                {profile.verificationStatus}
              </p>
              <p className="text-xs text-muted-foreground">
                {profile.verificationStatus === 'approved'
                  ? 'Your identity is verified'
                  : 'Complete identity verification to unlock higher tiers'}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          To update your profile, go to your{' '}
          <a href="/seller/identity" className="font-semibold text-primary hover:underline">
            Identity Card
          </a>
          .
        </p>
      </div>
    </SellerShell>
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
