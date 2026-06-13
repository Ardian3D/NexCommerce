'use client'

import {
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  User,
  Globe,
  Send,
  AtSign,
  Image as ImageIcon,
  Briefcase,
} from 'lucide-react'
import type { FormState } from './verification-form'

const checklist = [
  { label: 'Identity Information', status: 'Complete' },
  { label: 'Wallet Connected', status: 'Connected' },
  { label: 'Profile Photo', status: 'Uploaded' },
  { label: 'Additional Details', status: 'Complete' },
]

export function ReviewForm({
  role,
  values,
  onChange,
  onBack,
  onSubmit,
  submitting,
}: {
  role: 'buyer' | 'seller'
  values: FormState
  onChange: (patch: Partial<FormState>) => void
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
}) {
  const roleLabel = role === 'seller' ? 'Seller' : 'Buyer'

  const summary = [
    { icon: User, label: 'Name', value: values.fullName || '—' },
    { icon: Globe, label: 'Country', value: values.country || '—' },
    { icon: Send, label: 'Telegram', value: values.telegram || '—' },
    { icon: AtSign, label: 'X', value: values.twitter || '—' },
    {
      icon: ImageIcon,
      label: 'Photo',
      value: values.photo ? 'Uploaded' : 'Not uploaded',
    },
    { icon: Briefcase, label: 'Role', value: roleLabel },
  ]

  return (
    <div className="rounded-[2rem] border border-foreground/15 bg-card p-6 sm:p-8 md:p-9">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5">
          <ShieldCheck className="h-5 w-5 text-foreground/70" />
        </span>
        <h2 className="text-xl font-bold text-foreground">Review &amp; Submit</h2>
      </div>

      {/* Summary */}
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground/60">
          Summary
        </h3>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
          {summary.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3 bg-background px-4 py-3"
            >
              <span className="flex items-center gap-2.5 text-sm text-foreground/60">
                <Icon className="h-4 w-4 text-foreground/40" />
                {label}
              </span>
              <span className="truncate text-sm font-semibold text-foreground">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground/60">
          Verification Checklist
        </h3>
        <div className="space-y-2.5">
          {checklist.map(({ label, status }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] px-4 py-3"
            >
              <span className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {label}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Terms */}
      <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-xl border border-foreground/15 bg-background px-4 py-4">
        <input
          type="checkbox"
          checked={values.termsAccepted}
          onChange={(e) => onChange({ termsAccepted: e.target.checked })}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span className="text-sm leading-relaxed text-foreground/70">
          I confirm that all submitted information is accurate.
        </span>
      </label>

      {/* Nav */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="flex items-center justify-center gap-2 rounded-xl border border-foreground/20 bg-background px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground/5 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!values.termsAccepted || submitting}
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Submit for Verification
            </>
          )}
        </button>
      </div>
    </div>
  )
}
