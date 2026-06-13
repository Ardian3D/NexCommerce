import { Info, ShieldCheck, Lock, Star, Users } from 'lucide-react'

const features = [
  { icon: ShieldCheck, label: 'Verified Identity' },
  { icon: Lock, label: 'Secure Marketplace' },
  { icon: Star, label: 'Reputation System' },
  { icon: Users, label: 'Community Trust' },
]

export function WhyVerification() {
  return (
    <div className="rounded-[1.5rem] border border-primary/20 bg-primary/[0.04] p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Info className="h-4 w-4 text-primary" />
        </span>
        <div>
          <h3 className="text-sm font-bold text-primary">Why verification?</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
            Verification helps us build a trusted marketplace where buyers and
            sellers can trade with confidence.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {features.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="h-5 w-5 shrink-0 text-primary" />
            <span className="text-xs font-medium leading-tight text-foreground/70">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
