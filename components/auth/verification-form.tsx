'use client'

import { useRef } from 'react'
import {
  User,
  Mail,
  Globe,
  Send,
  AtSign,
  Upload,
  ShoppingCart,
  Store,
  ArrowRight,
} from 'lucide-react'

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Indonesia',
  'Singapore',
  'Japan',
  'India',
  'Brazil',
  'Nigeria',
]

export type FormState = {
  // Step 1 — Identity Information
  fullName: string
  email: string
  country: string
  telegram: string
  twitter: string
  bio: string
  photo: string | null
  // Step 2 — Additional Details (buyer)
  occupation: string
  interests: string
  categories: string[]
  website: string
  discord: string
  linkedin: string
  whyJoin: string
  // Step 2 — Additional Details (seller)
  storeName: string
  storeDescription: string
  storeWebsite: string
  businessCategory: string
  yearsExperience: string
  // Step 3 — Review & Submit
  termsAccepted: boolean
}

export function VerificationForm({
  role,
  values,
  onChange,
  onSubmit,
}: {
  role: 'buyer' | 'seller'
  values: FormState
  onChange: (patch: Partial<FormState>) => void
  onSubmit: () => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const isSeller = role === 'seller'
  const RoleIcon = isSeller ? Store : ShoppingCart
  const accent = isSeller ? 'var(--primary)' : 'var(--primary)'

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onChange({ photo: URL.createObjectURL(file) })
  }

  return (
    <div className="rounded-[2rem] border border-foreground/15 bg-card p-6 sm:p-8 md:p-9">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5">
            <User className="h-5 w-5 text-foreground/70" />
          </span>
          <h2 className="text-xl font-bold text-foreground">
            Basic Information ({isSeller ? 'Seller' : 'Buyer'})
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3 py-2">
          <span className="text-xs font-medium text-foreground/60">
            Your Role:
          </span>
          <span
            className="text-xs font-bold uppercase tracking-wide"
            style={{ color: accent }}
          >
            {role}
          </span>
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: accent }}
          >
            <RoleIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Fields */}
      <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field label="Full Name">
          <InputWithIcon icon={User}>
            <input
              type="text"
              value={values.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="Enter your full name"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </InputWithIcon>
        </Field>

        <Field label="Email Address">
          <InputWithIcon icon={Mail}>
            <input
              type="email"
              value={values.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="youremail@example.com"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </InputWithIcon>
        </Field>

        <Field label="Country">
          <InputWithIcon icon={Globe}>
            <select
              value={values.country}
              onChange={(e) => onChange({ country: e.target.value })}
              className={`w-full bg-transparent text-sm outline-none ${
                values.country ? 'text-foreground' : 'text-foreground/40'
              }`}
            >
              <option value="">Select your country</option>
              {countries.map((c) => (
                <option key={c} value={c} className="text-foreground">
                  {c}
                </option>
              ))}
            </select>
          </InputWithIcon>
        </Field>

        <Field label="Telegram Username">
          <InputWithIcon icon={Send}>
            <input
              type="text"
              value={values.telegram}
              onChange={(e) => onChange({ telegram: e.target.value })}
              placeholder="@yourusername"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </InputWithIcon>
        </Field>

        <Field label="X (Twitter) Username">
          <InputWithIcon icon={AtSign}>
            <input
              type="text"
              value={values.twitter}
              onChange={(e) => onChange({ twitter: e.target.value })}
              placeholder="@yourusername"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </InputWithIcon>
        </Field>

        <Field label="Profile Photo">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center gap-3 rounded-xl border border-foreground/15 bg-background px-4 py-3 text-left transition-colors hover:border-primary/40"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/5">
              <Upload className="h-4 w-4 text-foreground/60" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-medium text-foreground">
                {values.photo ? 'Photo selected' : 'Click to upload'}
              </span>
              <span className="block text-xs text-foreground/40">
                PNG, JPG up to 2MB
              </span>
            </span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handlePhoto}
            className="hidden"
          />
        </Field>
      </div>

      {/* Bio */}
      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Short Bio
        </label>
        <div className="relative rounded-xl border border-foreground/15 bg-background px-4 py-3 transition-colors focus-within:border-primary/50">
          <textarea
            value={values.bio}
            onChange={(e) =>
              onChange({ bio: e.target.value.slice(0, 300) })
            }
            rows={3}
            placeholder={`Tell us about yourself and your experience as a ${role}.`}
            className="w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
          />
          <span className="absolute bottom-2 right-3 font-mono text-xs text-foreground/40">
            {values.bio.length} / 300
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={onSubmit}
        className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
      >
        Continue to Next Step
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}

function InputWithIcon({
  icon: Icon,
  children,
}: {
  icon: typeof User
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-foreground/15 bg-background px-4 py-3 transition-colors focus-within:border-primary/50">
      <Icon className="h-4 w-4 shrink-0 text-foreground/40" />
      {children}
    </div>
  )
}
