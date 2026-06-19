import { Check } from 'lucide-react'

export const checkoutSteps = ['Cart', 'Checkout', 'Payment', 'Confirmation'] as const

export function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      {checkoutSteps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  done
                    ? 'bg-primary text-primary-foreground'
                    : active
                      ? 'bg-violet-600 text-white'
                      : 'bg-secondary text-muted-foreground'
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`text-sm font-semibold ${
                  active ? 'text-violet-600' : done ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            </div>
            {i < checkoutSteps.length - 1 && (
              <span className={`h-px w-8 sm:w-12 ${i < current ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
