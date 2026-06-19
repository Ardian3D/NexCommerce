import { ShieldCheck, Star, Headphones, MapPin } from 'lucide-react'

const items = [
  { icon: MapPin, title: 'Buyer Protection', desc: 'Get full refund if item is not delivered', tone: 'text-violet-600 bg-violet-100' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'All payments are secured on Solana', tone: 'text-blue-600 bg-blue-100' },
  { icon: Star, title: 'Verified Sellers', desc: 'All sellers are verified and trusted', tone: 'text-amber-600 bg-amber-100' },
  { icon: Headphones, title: '24/7 Support', desc: "We're here to help you anytime", tone: 'text-orange-600 bg-orange-100' },
]

export function TrustBar({ className = '' }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 gap-5 rounded-2xl bg-secondary/40 p-6 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {items.map((it) => (
        <div key={it.title} className="flex items-start gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${it.tone}`}>
            <it.icon className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-foreground">{it.title}</p>
            <p className="text-xs text-muted-foreground">{it.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
