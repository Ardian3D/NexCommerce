'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  BadgeCheck,
  Star,
  ShieldCheck,
  Package,
  MessageSquareText,
  MapPin,
  Globe,
  AtSign,
  Plus,
  Pencil,
  ShoppingCart,
} from 'lucide-react'
import { SellerShell } from '@/components/seller/shell'

const products = [
  { name: 'Pro Gaming Mouse', price: 39, sales: 0, image: '/store/product-mouse.png' },
]

const reviews = [
  {
    name: 'Marcus Lee',
    rating: 5,
    date: '2 days ago',
    text: 'Fast delivery and the quality is exactly as described. Will buy again from this seller.',
  },
  {
    name: 'Sofia Reyes',
    rating: 4,
    date: '1 week ago',
    text: 'Great product and smooth on-chain transaction. Trustworthy seller, highly recommend.',
  },
]

export default function StoreProfilePage() {
  return (
    <SellerShell>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Banner + identity */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative h-40 w-full sm:h-56">
            <Image
              src="/store/banner.png"
              alt="Store banner"
              fill
              className="object-cover"
              priority
            />
            <button className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/55">
              <Pencil className="h-3.5 w-3.5" />
              Edit Banner
            </button>
          </div>

          <div className="px-5 pb-6 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="-mt-12 flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 ring-4 ring-card sm:-mt-14 sm:h-28 sm:w-28">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-12 w-12 text-white"
                    fill="currentColor"
                  >
                    <path d="M12 3l8 16H4l8-16Z" />
                  </svg>
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      Aim Labs
                    </h1>
                    <BadgeCheck className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Building quality digital products for gamers and creators.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <Link
                  href="/seller/products/new"
                  className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-opacity hover:opacity-95"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Link>
                <button className="flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                Starter Tier
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                Indonesia
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-4 w-4" />
                aimlabs.store
              </span>
              <span className="inline-flex items-center gap-1.5">
                <AtSign className="h-4 w-4" />
                aimlabs
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile
            icon={ShieldCheck}
            label="Trust Score"
            value="60 / 100"
            tint="text-blue-600 bg-blue-500/10"
          />
          <StatTile
            icon={BadgeCheck}
            label="Tier"
            value="Starter"
            tint="text-violet-600 bg-violet-500/10"
          />
          <StatTile
            icon={Package}
            label="Products"
            value="1"
            tint="text-amber-600 bg-amber-500/10"
          />
          <StatTile
            icon={Star}
            label="Reviews"
            value="4.5"
            tint="text-emerald-600 bg-emerald-500/10"
          />
        </section>

        {/* Products */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Products</h2>
            <Link
              href="/seller/products"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <div
                key={p.name}
                className="group overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={p.image || '/placeholder.svg'}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Active
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm font-semibold text-foreground">
                    {p.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-base font-bold text-foreground">
                      ${p.price}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ShoppingCart className="h-3.5 w-3.5" />
                      {p.sales} sold
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add product tile */}
            <Link
              href="/seller/products/new"
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Plus className="h-7 w-7" />
              <span className="text-xs font-semibold">Add Product</span>
            </Link>
          </div>
        </section>

        {/* Reviews */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquareText className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">Reviews</h2>
            <span className="text-sm text-muted-foreground">
              ({reviews.length})
            </span>
          </div>
          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {r.name}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < r.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted-foreground/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SellerShell>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tint: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${tint}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-xl font-bold text-foreground">{value}</p>
    </div>
  )
}
