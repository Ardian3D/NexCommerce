'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  BadgeCheck,
  Star,
  ShieldCheck,
  Package,
  MapPin,
  Globe,
  AtSign,
  Plus,
  Pencil,
  ShoppingCart,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
} from 'lucide-react'

type StoreProduct = {
  slug: string
  name: string
  price: number
  image: string | null
  tier: string
  score: number
  status: string
}

type Props = {
  storeName: string
  storeDescription: string
  storeWebsite: string | null
  businessCategory: string | null
  country: string | null
  photoUrl: string | null
  trustScore: number
  tier: string
  memberSince?: string
  responseTime?: string
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  completedRevenue: number
  products: StoreProduct[]
}

const fmt = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

export function StoreProfileClient(props: Props) {
  const {
    storeName,
    storeDescription,
    storeWebsite,
    businessCategory,
    country,
    photoUrl,
    trustScore,
    tier,
    memberSince,
    responseTime,
    totalProducts,
    totalOrders,
    totalRevenue,
    completedRevenue,
    products,
  } = props

  const publishedProducts = products.filter((p) => p.status === 'published')

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Banner + identity */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative h-28 w-full bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 sm:h-36">
          <button className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/55">
            <Pencil className="h-3.5 w-3.5" />
            Edit Banner
          </button>
        </div>

        <div className="px-5 pb-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="-mt-12 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 ring-4 ring-card sm:-mt-14 sm:h-28 sm:w-28">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={storeName}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black text-white">
                    {storeName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    {storeName}
                  </h1>
                  <BadgeCheck className="h-6 w-6 text-blue-500" />
                </div>
                {storeDescription && (
                  <p className="text-sm text-muted-foreground">{storeDescription}</p>
                )}
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
              <Link
                href="/seller/settings"
                className="flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              {tier} Tier
            </span>
            {country && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {country}
              </span>
            )}
            {businessCategory && (
              <span className="inline-flex items-center gap-1.5">
                <AtSign className="h-4 w-4" />
                {businessCategory}
              </span>
            )}
            {storeWebsite && (
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-4 w-4" />
                {storeWebsite}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile
          icon={ShieldCheck}
          label="Trust Score"
          value={`${trustScore} / 100`}
          tint="text-blue-600 bg-blue-500/10"
        />
        <StatTile
          icon={BadgeCheck}
          label="Tier"
          value={tier}
          tint="text-violet-600 bg-violet-500/10"
        />
        <StatTile
          icon={Package}
          label="Products"
          value={String(totalProducts)}
          tint="text-amber-600 bg-amber-500/10"
        />
        <StatTile
          icon={TrendingUp}
          label="Total Revenue"
          value={fmt(totalRevenue)}
          tint="text-emerald-600 bg-emerald-500/10"
        />
        <StatTile
          icon={ShoppingCart}
          label="Orders"
          value={String(totalOrders)}
          tint="text-rose-600 bg-rose-500/10"
        />
      </section>

      {/* Info badges */}
      <div className="flex flex-wrap gap-3">
        {memberSince && (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Member since {memberSince}
          </span>
        )}
        {responseTime && (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Response: {responseTime}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
          <DollarSign className="h-3.5 w-3.5" />
          Completed: {fmt(completedRevenue)}
        </span>
      </div>

      {/* Products */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Published Products ({publishedProducts.length})
          </h2>
          <Link
            href="/seller/products"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        {publishedProducts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Package className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No published products yet.</p>
            <Link
              href="/seller/products/new"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Publish your first product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {publishedProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm font-semibold text-foreground">{p.name}</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-base font-bold text-foreground">
                      ${p.price.toFixed(2)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {p.score}
                    </span>
                  </div>
                </div>
              </Link>
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
        )}
      </section>
    </div>
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
      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${tint}`}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  )
}
