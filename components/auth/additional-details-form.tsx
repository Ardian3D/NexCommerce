'use client'

import { useRef } from 'react'
import {
  Briefcase,
  Heart,
  Globe,
  Send,
  Link2,
  Store,
  Tag,
  Clock,
  Wallet,
  FileText,
  ArrowRight,
  ArrowLeft,
  ShoppingCart,
} from 'lucide-react'
import type { FormState } from './verification-form'

const buyerCategories = [
  'Electronics',
  'Fashion',
  'Gaming',
  'Home & Living',
  'Sports',
  'Books',
  'Beauty',
]

const sellerCategories = [
  'Electronics',
  'Gaming',
  'Fashion',
  'Digital Products',
]

export function AdditionalDetailsForm({
  role,
  values,
  onChange,
  onNext,
  onBack,
  wallet,
}: {
  role: 'buyer' | 'seller'
  values: FormState
  onChange: (patch: Partial<FormState>) => void
  onNext: () => void
  onBack: () => void
  wallet: string
}) {
  const isSeller = role === 'seller'
  const accent = isSeller ? 'var(--seller)' : 'var(--primary)'
  const RoleIcon = isSeller ? Store : ShoppingCart

  function toggleCategory(cat: string) {
    const has = values.categories.includes(cat)
    onChange({
      categories: has
        ? values.categories.filter((c) => c !== cat)
        : [...values.categories, cat],
    })
  }

  return (
    <div className="rounded-[2rem] border border-foreground/15 bg-card p-6 sm:p-8 md:p-9">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5">
            <FileText className="h-5 w-5 text-foreground/70" />
          </span>
          <h2 className="text-xl font-bold text-foreground">
            Additional Details ({isSeller ? 'Seller' : 'Buyer'})
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

      {isSeller ? (
        <SellerFields values={values} onChange={onChange} />
      ) : (
        <BuyerFields values={values} onChange={onChange} />
      )}

      {/* Categories */}
      <div className="mt-7">
        <label className="mb-3 block text-sm font-semibold text-foreground">
          {isSeller ? 'What will you sell?' : 'Preferred Categories'}
        </label>
        <div className="flex flex-wrap gap-2.5">
          {(isSeller ? sellerCategories : buyerCategories).map((cat) => {
            const active = values.categories.includes(cat)
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-all"
                style={{
                  borderColor: active ? accent : 'var(--color-border)',
                  backgroundColor: active ? accent : 'transparent',
                  color: active ? '#fff' : 'var(--color-foreground)',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Why join (buyer) */}
      {!isSeller && (
        <div className="mt-7">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Why Join NexCommerce?
          </label>
          <div className="rounded-xl border border-foreground/15 bg-background px-4 py-3 transition-colors focus-within:border-primary/50">
            <textarea
              value={values.whyJoin}
              onChange={(e) => onChange({ whyJoin: e.target.value.slice(0, 300) })}
              rows={3}
              placeholder="Tell us why you want to join NexCommerce."
              className="w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </div>
        </div>
      )}

      {/* Wallet (readonly) */}
      <div className="mt-7">
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Wallet Information
        </label>
        <div className="flex items-center justify-between rounded-xl border border-foreground/15 bg-foreground/[0.03] px-4 py-3">
          <span className="flex items-center gap-3 text-sm text-foreground/60">
            <Wallet className="h-4 w-4 text-foreground/40" />
            Connected Wallet
          </span>
          <span className="font-mono text-sm font-semibold text-foreground">
            {wallet}
          </span>
        </div>
      </div>

      {/* Nav buttons */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-xl border border-foreground/20 bg-background px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
        >
          Continue to Next Step
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

function BuyerFields({
  values,
  onChange,
}: {
  values: FormState
  onChange: (patch: Partial<FormState>) => void
}) {
  return (
    <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
      <Field label="Occupation">
        <InputWithIcon icon={Briefcase}>
          <input
            value={values.occupation}
            onChange={(e) => onChange({ occupation: e.target.value })}
            placeholder="e.g. Software Engineer"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
          />
        </InputWithIcon>
      </Field>
      <Field label="Interests">
        <InputWithIcon icon={Heart}>
          <input
            value={values.interests}
            onChange={(e) => onChange({ interests: e.target.value })}
            placeholder="e.g. Tech, gaming, travel"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
          />
        </InputWithIcon>
      </Field>
      <Field label="Website (Optional)">
        <InputWithIcon icon={Globe}>
          <input
            value={values.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="https://yoursite.com"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
          />
        </InputWithIcon>
      </Field>
      <Field label="Discord (Optional)">
        <InputWithIcon icon={Send}>
          <input
            value={values.discord}
            onChange={(e) => onChange({ discord: e.target.value })}
            placeholder="username#0000"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
          />
        </InputWithIcon>
      </Field>
      <Field label="LinkedIn (Optional)">
        <InputWithIcon icon={Link2}>
            <input
              value={values.linkedin}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/you"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
          />
        </InputWithIcon>
      </Field>
    </div>
  )
}

function SellerFields({
  values,
  onChange,
}: {
  values: FormState
  onChange: (patch: Partial<FormState>) => void
}) {
  return (
    <>
      <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field label="Store Name">
          <InputWithIcon icon={Store}>
            <input
              value={values.storeName}
              onChange={(e) => onChange({ storeName: e.target.value })}
              placeholder="Your store name"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </InputWithIcon>
        </Field>
        <Field label="Business Category">
          <InputWithIcon icon={Tag}>
            <input
              value={values.businessCategory}
              onChange={(e) => onChange({ businessCategory: e.target.value })}
              placeholder="e.g. Consumer Electronics"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </InputWithIcon>
        </Field>
        <Field label="Website">
          <InputWithIcon icon={Globe}>
            <input
              value={values.storeWebsite}
              onChange={(e) => onChange({ storeWebsite: e.target.value })}
              placeholder="https://yourstore.com"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </InputWithIcon>
        </Field>
        <Field label="Years of Experience">
          <InputWithIcon icon={Clock}>
            <input
              value={values.yearsExperience}
              onChange={(e) => onChange({ yearsExperience: e.target.value })}
              placeholder="e.g. 3 years"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          </InputWithIcon>
        </Field>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Store Description
        </label>
        <div className="rounded-xl border border-foreground/15 bg-background px-4 py-3 transition-colors focus-within:border-primary/50">
          <textarea
            value={values.storeDescription}
            onChange={(e) =>
              onChange({ storeDescription: e.target.value.slice(0, 300) })
            }
            rows={3}
            placeholder="Describe what your store sells and what makes it unique."
            className="w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
          />
        </div>
      </div>
    </>
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
  icon: typeof Briefcase
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-foreground/15 bg-background px-4 py-3 transition-colors focus-within:border-primary/50">
      <Icon className="h-4 w-4 shrink-0 text-foreground/40" />
      {children}
    </div>
  )
}
