'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ImagePlus,
  Sparkles,
  Tag,
  ListChecks,
  FileText,
  Loader2,
  X,
  Check,
  Save,
} from 'lucide-react'
import { SellerShell } from '@/components/seller/shell'
import { createProduct } from '@/lib/actions/product'

const categories = [
  'Electronics',
  'Gaming',
  'Fashion',
  'Home & Living',
  'Accessories',
  'Beauty',
  'Sports',
  'Books',
  'Digital Goods',
  'Other',
]

export default function CreateProductPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

  const [loading, setLoading] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function fakeGenerate(key: string, fn: () => void) {
    setLoading(key)
    setTimeout(() => {
      fn()
      setLoading(null)
    }, 1100)
  }

  function generateDescription() {
    fakeGenerate('desc', () => {
      const n = name.trim() || 'this product'
      setDescription(
        `Meet ${n} — crafted for creators and gamers who demand quality. ` +
          `Built with premium attention to detail, it delivers exceptional performance, ` +
          `seamless reliability, and a design that stands out. Perfect for anyone looking ` +
          `to level up their setup with a product they can trust.`,
      )
    })
  }

  function generateTags() {
    fakeGenerate('tags', () => {
      setTags([
        'premium',
        'best-seller',
        category ? category.toLowerCase().replace(/\s+/g, '-') : 'digital',
        'high-quality',
        'gamers',
        'creators',
      ])
    })
  }

  function generateFeatures() {
    fakeGenerate('features', () => {
      setFeatures([
        'Premium build quality with attention to detail',
        'Optimized for performance and reliability',
        'Designed for gamers and creators',
        'Instant digital delivery after purchase',
      ])
    })
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const urls = files.map((f) => URL.createObjectURL(f))
    setImages((prev) => [...prev, ...urls].slice(0, 6))
  }

  async function handleSubmit(status: 'published' | 'draft') {
    setError(null)
    setSubmitting(true)

    try {
      const result = await createProduct({
        name,
        category,
        price,
        stock,
        description,
        features,
        tags,
        image: images[0] ?? undefined,
        status,
      })

      if (result.success) {
        if (status === 'published') {
          router.push('/seller/products')
        } else {
          router.push(`/seller/products/${result.slug}`)
        }
      } else {
        setError(result.error)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20'

  return (
    <SellerShell>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/seller/products"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Back to products"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Create Product
            </h1>
            <p className="text-sm text-muted-foreground">
              List a new product and let Nex AI help you optimize it.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit('published')
          }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Left: form fields */}
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="text-base font-semibold text-foreground">
                Product Details
              </h2>
              <div className="mt-5 space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Product Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Pro Gaming Mouse"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`${inputClass} appearance-none`}
                      required
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Price (USD)
                    </label>
                    <input
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value.replace(/[^0-9.]/g, ''))
                      }
                      inputMode="decimal"
                      placeholder="39.00"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Stock
                    </label>
                    <input
                      value={stock}
                      onChange={(e) =>
                        setStock(e.target.value.replace(/[^0-9]/g, ''))
                      }
                      inputMode="numeric"
                      placeholder="100"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                      Description
                    </label>
                    <button
                      type="button"
                      onClick={generateDescription}
                      disabled={loading === 'desc'}
                      className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/15 disabled:opacity-60"
                    >
                      {loading === 'desc' ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5" />
                      )}
                      Generate with AI
                    </button>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Describe your product, or let Nex AI write it for you."
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      SEO Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {t}
                          <button
                            type="button"
                            onClick={() =>
                              setTags((prev) => prev.filter((x) => x !== t))
                            }
                            aria-label={`Remove ${t}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {features.length > 0 && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Product Features
                    </label>
                    <ul className="space-y-2">
                      {features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* Images */}
            <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="text-base font-semibold text-foreground">
                Product Images
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload up to 6 images. The first image is your cover.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {images.map((src, i) => (
                  <div
                    key={src}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src || '/placeholder.svg'}
                      alt={`Product ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {images.length < 6 && (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    <ImagePlus className="h-6 w-6" />
                    <span className="text-xs font-medium">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </section>
          </div>

          {/* Right: AI assistant + actions */}
          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5">
              <div className="flex items-center gap-2 border-b border-primary/10 bg-card/40 px-5 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-foreground">
                      Nex AI Assistant
                    </h2>
                    <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold text-violet-500">
                      Beta
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI-Powered Commerce Platform
                  </p>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Fill in the product name first, then let Nex AI generate
                  optimized content for your listing.
                </p>
                <AiButton
                  icon={FileText}
                  label="Generate Description"
                  loading={loading === 'desc'}
                  onClick={generateDescription}
                />
                <AiButton
                  icon={Tag}
                  label="Generate SEO Tags"
                  loading={loading === 'tags'}
                  onClick={generateTags}
                />
                <AiButton
                  icon={ListChecks}
                  label="Generate Product Features"
                  loading={loading === 'features'}
                  onClick={generateFeatures}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-opacity hover:opacity-95 disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Publish Product'
                )}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('draft')}
                disabled={submitting}
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </button>
            </section>
          </div>
        </form>
      </div>
    </SellerShell>
  )
}

function AiButton({
  icon: Icon,
  label,
  loading,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  loading: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-3.5 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 disabled:opacity-60"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </span>
      {label}
    </button>
  )
}
