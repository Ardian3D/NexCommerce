'use client'

import Image from 'next/image'
import { ShieldCheck, BadgeCheck, Wallet, CalendarDays, Globe, Star } from 'lucide-react'

export type IdentityData = {
  role: 'buyer' | 'seller'
  fullName: string
  photo: string | null
  wallet: string
  country?: string
  categories?: string[]
  status?: 'pending' | 'ready'
  memberSince?: string
  trustScore?: number
  tier?: string
}

/** Stylized NexCommerce "N" mark used for the header logo and the big emboss. */
function NMark({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path d="M11 30V10h4l10 13V10h4v20h-4L15 17v13h-4Z" fill={fill} />
      <path d="M11 10h6l-6 8V10Z" fill={fill} opacity={0.55} />
    </svg>
  )
}

const cardSurface =
  'linear-gradient(135deg,#e8eaed 0%,#cfd2d7 20%,#eef0f2 37%,#c5c8ce 54%,#eaecef 71%,#d1d4d9 100%)'

const brushed =
  'repeating-linear-gradient(115deg,rgba(255,255,255,0.045) 0px,rgba(255,255,255,0.045) 1px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0) 4px)'

export function IdentityCard({
  fullName,
  photo,
  wallet,
  country,
  memberSince,
  trustScore = 60,
  tier = 'Starter',
}: IdentityData) {
  const dateLabel =
    memberSince ||
    new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  const filledStars = Math.round((trustScore / 100) * 5)

  return (
    <div className="@container w-full">
      <div
        className="relative aspect-[1.5] w-full overflow-hidden rounded-[5%] text-[#2c3038] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)] ring-1 ring-white/60"
        style={{ background: cardSurface }}
      >
        {/* Brushed metal texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: brushed }}
          aria-hidden="true"
        />
        {/* Soft sheen */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 80% 0%,rgba(255,255,255,0.45) 0%,rgba(255,255,255,0) 45%)',
          }}
          aria-hidden="true"
        />
        {/* Inner edge highlight */}
        <div
          className="pointer-events-none absolute inset-[1.5%] rounded-[4%] ring-1 ring-inset ring-white/30"
          aria-hidden="true"
        />

        {/* Embossed big N */}
        <div
          className="pointer-events-none absolute right-[6%] top-1/2 h-[78%] -translate-y-1/2"
          aria-hidden="true"
        >
          <div className="relative h-full">
            <NMark
              className="absolute left-[1.2%] top-[1.2%] h-full w-auto"
              fill="rgba(255,255,255,0.55)"
            />
            <NMark
              className="absolute h-full w-auto"
              fill="rgba(70,80,95,0.16)"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between p-[5%]">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-[2.2cqw]">
              <NMark className="h-[7cqw] w-[7cqw]" fill="#3a3f48" />
              <div className="leading-none">
                <p className="text-[4.8cqw] font-black tracking-tight text-[#2c3038]">
                  NexCommerce
                </p>
                <p className="mt-[1cqw] text-[2.1cqw] font-semibold tracking-[0.3em] text-[#6b7079]">
                  VERIFIED IDENTITY CARD
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[1.6cqw] rounded-full px-[2.8cqw] py-[1.4cqw] ring-1 ring-[#9aa0aa]/70">
              <BadgeCheck
                className="h-[3.6cqw] w-[3.6cqw] text-[#2c3038]"
                strokeWidth={2.5}
              />
              <span className="text-[2.8cqw] font-extrabold tracking-[0.18em] text-[#2c3038]">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Identity body */}
          <div className="flex flex-1 items-center gap-[4.5cqw]">
            {/* Photo */}
            <div className="relative shrink-0">
              <div className="relative h-[23cqw] w-[23cqw] overflow-hidden rounded-full bg-[#b9bcc2] ring-[0.7cqw] ring-white/70 shadow-[0_6px_14px_-4px_rgba(0,0,0,0.4)]">
                {photo ? (
                  <Image
                    src={photo || '/placeholder.svg'}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[2.6cqw] font-semibold text-[#7b818b]">
                    PHOTO
                  </span>
                )}
              </div>
              <span className="absolute bottom-[6%] right-[4%] flex h-[6cqw] w-[6cqw] items-center justify-center rounded-full bg-[#2c3038] ring-2 ring-white/80">
                <ShieldCheck
                  className="h-[3.6cqw] w-[3.6cqw] text-white"
                  strokeWidth={2.5}
                />
              </span>
            </div>

            {/* Name + rows */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[5.4cqw] font-bold leading-none text-[#23272e]">
                {fullName.trim() || 'Your Name'}
              </h3>
              <p className="mt-[1.2cqw] text-[2.5cqw] font-bold tracking-[0.16em] text-[#6b7079]">
                VERIFIED MEMBER
              </p>

              <div className="mt-[2.4cqw] space-y-[1.6cqw]">
                <Row icon={Wallet} label="WALLET ADDRESS" value={wallet} />
                <Row icon={CalendarDays} label="MEMBER SINCE" value={dateLabel} />
                <Row
                  icon={Globe}
                  label="COUNTRY"
                  value={country?.trim() || 'Your Country'}
                />
              </div>
            </div>
          </div>

          {/* Footer: chip + trust score + tier */}
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-[4cqw]">
              <Chip className="h-[8.5cqw] w-[12cqw]" />
              <div>
                <p className="text-[2.4cqw] font-semibold tracking-[0.16em] text-[#6b7079]">
                  TRUST SCORE
                </p>
                <div className="mt-[0.8cqw] flex items-end gap-[2.6cqw]">
                  <p className="leading-none text-[#23272e]">
                    <span className="text-[6.4cqw] font-black">{trustScore}</span>
                    <span className="text-[3.2cqw] font-semibold text-[#6b7079]">
                      {' '}
                      /100
                    </span>
                  </p>
                  <div className="mb-[1cqw] flex gap-[0.7cqw]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        className={`h-[3.4cqw] w-[3.4cqw] ${
                          i < filledStars
                            ? 'fill-[#3a3f48] text-[#3a3f48]'
                            : 'text-[#a3a8b1]'
                        }`}
                        strokeWidth={2}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right leading-none">
              <p className="text-[2.4cqw] font-semibold tracking-[0.16em] text-[#6b7079]">
                TIER
              </p>
              <p className="mt-[1cqw] text-[5.2cqw] font-black uppercase tracking-tight text-[#23272e]">
                {tier}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wallet
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-[3cqw]">
      <Icon
        className="h-[5.4cqw] w-[5.4cqw] shrink-0 text-[#3a3f48]"
        strokeWidth={1.8}
      />
      <div className="min-w-0 leading-tight">
        <p className="text-[2.5cqw] font-semibold tracking-[0.14em] text-[#6b7079]">
          {label}
        </p>
        <p className="truncate text-[3.7cqw] font-semibold text-[#23272e]">
          {value}
        </p>
      </div>
    </div>
  )
}

/** Metallic SIM-style chip. */
function Chip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 44" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="chipgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9ebee" />
          <stop offset="0.5" stopColor="#b9bdc4" />
          <stop offset="1" stopColor="#d6d9dd" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="58"
        height="42"
        rx="7"
        fill="url(#chipgrad)"
        stroke="#9aa0aa"
        strokeWidth="1"
      />
      <g stroke="#7e848e" strokeWidth="1.4" fill="none">
        <line x1="30" y1="1" x2="30" y2="14" />
        <line x1="30" y1="30" x2="30" y2="43" />
        <line x1="1" y1="22" x2="18" y2="22" />
        <line x1="42" y1="22" x2="59" y2="22" />
        <rect x="18" y="14" width="24" height="16" rx="3" />
      </g>
    </svg>
  )
}
