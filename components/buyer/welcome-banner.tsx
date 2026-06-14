'use client'

import { ShieldCheck, Award, User, ArrowRight } from 'lucide-react'

export function BuyerWelcomeBanner() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      {/* Greeting */}
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back, Aim Labs! <span className="inline-block">👋</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Discover trusted products from verified sellers around the world.
        </p>
      </div>

      {/* NEX IDENTITY box */}
      <div className="w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0e1a] via-[#111a35] to-[#1a1147] p-5 text-white ring-1 ring-white/10 lg:max-w-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
              <ShieldCheck className="h-4 w-4 text-white" />
            </span>
            <span className="text-sm font-bold tracking-wide">NEX IDENTITY</span>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300">
            View Identity Card
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-2.5">
            <User className="mt-0.5 h-5 w-5 text-blue-400" />
            <div>
              <p className="text-xs text-slate-400">Role</p>
              <p className="text-sm font-bold">Buyer</p>
            </div>
          </div>
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
  )
}
