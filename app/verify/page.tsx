'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { WalletNavbar } from '@/components/wallet-navbar'
import { Footer } from '@/components/footer'
import { Stepper } from '@/components/auth/stepper'
import {
  VerificationForm,
  type FormState,
} from '@/components/auth/verification-form'
import { AdditionalDetailsForm } from '@/components/auth/additional-details-form'
import { ReviewForm } from '@/components/auth/review-form'
import { IdentityCard } from '@/components/auth/identity-card'
import { WhyVerification } from '@/components/auth/why-verification'

const gridBackground = {
  backgroundImage:
    'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

const EASE = [0.22, 1, 0.36, 1] as const
const WALLET = '8XH...K9P'

const initialState: FormState = {
  fullName: '',
  email: '',
  country: '',
  telegram: '',
  twitter: '',
  bio: '',
  photo: null,
  occupation: '',
  interests: '',
  categories: [],
  website: '',
  discord: '',
  linkedin: '',
  whyJoin: '',
  storeName: '',
  storeDescription: '',
  storeWebsite: '',
  businessCategory: '',
  yearsExperience: '',
  termsAccepted: false,
}

const headings: Record<number, { eyebrow: string; line1: string; line2: string; sub: string }> = {
  1: {
    eyebrow: 'Verification Step 1 of 3',
    line1: 'Verify Your',
    line2: 'Identity',
    sub: 'Complete your profile information to become a verified member of NexCommerce.',
  },
  2: {
    eyebrow: 'Verification Step 2 of 3',
    line1: 'Additional',
    line2: 'Details',
    sub: 'Help us understand your interests and build your initial Trust Score.',
  },
  3: {
    eyebrow: 'Verification Step 3 of 3',
    line1: 'Review &',
    line2: 'Submit',
    sub: 'Review your details. This is the digital identity you are creating on NexCommerce.',
  },
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <VerifyContent />
    </Suspense>
  )
}

function VerifyContent() {
  const router = useRouter()
  const params = useSearchParams()
  const role = params.get('role') === 'seller' ? 'seller' : 'buyer'
  const accent = role === 'seller' ? 'var(--seller)' : 'var(--primary)'

  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [values, setValues] = useState<FormState>(initialState)

  function patch(p: Partial<FormState>) {
    setValues((v) => ({ ...v, ...p }))
  }

  function goTo(n: number) {
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSubmit() {
    setSubmitting(true)
    setTimeout(() => router.push('/pending-review'), 1800)
  }

  const heading = headings[step]
  const cardStatus = step === 3 ? 'ready' : 'pending'

  return (
    <div className="min-h-screen bg-foreground p-2 sm:p-3">
      <main className="relative overflow-hidden rounded-lg bg-background">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={gridBackground}
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-[calc(100vh-1rem)] flex-col">
          <WalletNavbar address={WALLET} />

          <section className="relative flex-1 px-6 pb-20 pt-6 md:px-10">
            <div className="mx-auto max-w-7xl">
              {/* Header row: headline + stepper */}
              <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span
                    className="text-sm font-bold uppercase tracking-[0.15em]"
                    style={{ color: accent }}
                  >
                    {heading.eyebrow}
                  </span>
                  <h1 className="mt-3 font-display text-6xl font-black uppercase leading-[0.88] tracking-tight text-foreground sm:text-7xl">
                    <span className="block">{heading.line1}</span>
                    <span className="block" style={{ color: accent }}>
                      {heading.line2}
                    </span>
                  </h1>
                  <p className="mt-5 max-w-sm font-mono text-sm leading-relaxed text-foreground/60">
                    {heading.sub}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                  className="hidden lg:block lg:pt-6"
                >
                  <Stepper current={step} accent={accent} />
                </motion.div>
              </div>

              {/* Main grid: form + live preview */}
              <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      {step === 1 && (
                        <VerificationForm
                          role={role}
                          values={values}
                          onChange={patch}
                          onSubmit={() => goTo(2)}
                        />
                      )}
                      {step === 2 && (
                        <AdditionalDetailsForm
                          role={role}
                          values={values}
                          onChange={patch}
                          onNext={() => goTo(3)}
                          onBack={() => goTo(1)}
                          wallet={WALLET}
                        />
                      )}
                      {step === 3 && (
                        <ReviewForm
                          role={role}
                          values={values}
                          onChange={patch}
                          onBack={() => goTo(2)}
                          onSubmit={handleSubmit}
                          submitting={submitting}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                  className="lg:sticky lg:top-6"
                >
                  <h2 className="text-lg font-bold uppercase tracking-wide text-foreground">
                    Your Identity Preview
                  </h2>
                  <p className="mt-1 text-sm text-foreground/55">
                    {step === 3
                      ? 'Your NexCommerce ID Card is ready for verification.'
                      : 'This is how your NexCommerce ID Card will look.'}
                  </p>

                  <div className="mt-5 space-y-5">
                    <IdentityCard
                      role={role}
                      fullName={values.fullName}
                      photo={values.photo}
                      wallet={WALLET}
                      country={values.country}
                      categories={values.categories}
                      status={cardStatus}
                    />
                    <WhyVerification />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
