'use client'

import {
  ClipboardCheck,
  PackagePlus,
  Wallet,
  Link2,
  CheckCircle2,
  Star,
  Info,
  AlertCircle,
} from 'lucide-react'

type Task = {
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  title: string
  desc: string
  action: React.ReactNode
}

const tasks: Task[] = [
  {
    icon: ClipboardCheck,
    iconColor: 'text-blue-600',
    title: 'Complete Store Profile',
    desc: 'Add store banner and description',
    action: (
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-foreground">80%</span>
        <span className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
          <span className="block h-full w-[80%] rounded-full bg-blue-500" />
        </span>
      </div>
    ),
  },
  {
    icon: PackagePlus,
    iconColor: 'text-violet-600',
    title: 'Add Your First Product',
    desc: 'Start listing to attract buyers',
    action: <span className="text-xs font-semibold text-blue-600">Start</span>,
  },
  {
    icon: Wallet,
    iconColor: 'text-emerald-600',
    title: 'Enable Payout Method',
    desc: 'Set up wallet for withdrawals',
    action: <span className="text-xs font-semibold text-blue-600">Set Up</span>,
  },
  {
    icon: Link2,
    iconColor: 'text-amber-600',
    title: 'Verify Social Links',
    desc: 'Connect social accounts',
    action: <span className="text-xs font-semibold text-blue-600">Verify</span>,
  },
]

type Notification = {
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
  title: string
  desc: string
  time: string
}

const notifications: Notification[] = [
  {
    icon: CheckCircle2,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Verification Approved',
    desc: 'Your seller identity has been verified.',
    time: '2 days ago',
  },
  {
    icon: Star,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Welcome to NexCommerce!',
    desc: 'Start listing products and grow your store.',
    time: '2 days ago',
  },
  {
    icon: Info,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Complete Your Profile',
    desc: 'Add more details to build trust.',
    time: '3 days ago',
  },
  {
    icon: AlertCircle,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Payout Method Required',
    desc: 'Set up your wallet to receive payments.',
    time: '3 days ago',
  },
]

function CardHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
        View all
      </button>
    </div>
  )
}

export function TasksCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <CardHeader title="Tasks" />
      <ul className="mt-4 space-y-4">
        {tasks.map((t) => (
          <li key={t.title} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <t.icon className={`h-5 w-5 ${t.iconColor}`} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {t.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">{t.desc}</p>
            </div>
            {t.action}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function NotificationsCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <CardHeader title="Recent Notifications" />
      <ul className="mt-4 space-y-4">
        {notifications.map((n) => (
          <li key={n.title} className="flex items-start gap-3">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${n.iconBg}`}
            >
              <n.icon className={`h-5 w-5 ${n.iconColor}`} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {n.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">{n.desc}</p>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground">
              {n.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
