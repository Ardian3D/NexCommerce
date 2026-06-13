'use client'

import { ShieldCheck, Award, ArrowRight } from 'lucide-react'

export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0e1a] via-[#111a35] to-[#1a1147] p-6 text-white sm:p-8">
      {/* decorative wave */}
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30"
        viewBox="0 0 400 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 120 Q100 60 200 110 T400 80"
          stroke="#3b82f6"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M0 150 Q120 90 240 140 T400 110"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </svg>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, Aim Labs!{' '}
            <span className="inline-block">👋</span>
          </h1>
          <p className="mt-2 text-slate-300">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>

        {/* NEX IDENTITY box */}
        <div className="w-full max-w-md shrink-0 rounded-xl bg-black/30 p-5 ring-1 ring-white/10 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-violet-600">
                <ShieldCheck className="h-4 w-4 text-white" />
              </span>
              <span className="text-sm font-bold tracking-wide">NEX IDENTITY</span>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300">
              View Identity Card
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2.5">
              <Award className="mt-0.5 h-5 w-5 text-violet-400" />
              <div>
                <p className="text-xs text-slate-400">Tier</p>
                <p className="text-sm font-bold">Starter</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-blue-400" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-400">Trust Score</p>
                <p className="text-sm font-bold">60 / 100</p>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
