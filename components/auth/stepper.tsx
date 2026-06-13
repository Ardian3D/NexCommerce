'use client'

import { motion } from 'framer-motion'

const steps = [
  { n: 1, label: 'Identity Information' },
  { n: 2, label: 'Additional Details' },
  { n: 3, label: 'Review & Submit' },
]

export function Stepper({
  current = 1,
  accent = 'var(--primary)',
}: {
  current?: number
  accent?: string
}) {
  return (
    <div className="flex items-start">
      {steps.map((step, i) => {
        const isActive = step.n === current
        const isDone = step.n < current
        const isLast = i === steps.length - 1

        return (
          <div
            key={step.n}
            className={`flex items-center ${isLast ? '' : 'flex-1'}`}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-primary-foreground transition-colors ${
                  isActive || isDone ? '' : 'bg-foreground/10 !text-foreground/50'
                }`}
                style={
                  isActive || isDone ? { backgroundColor: accent } : undefined
                }
              >
                {step.n}
              </motion.span>
              <span
                className={`whitespace-nowrap text-xs font-semibold transition-colors ${
                  isActive
                    ? ''
                    : isDone
                      ? 'text-foreground/70'
                      : 'text-foreground/40'
                }`}
                style={isActive ? { color: accent } : undefined}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <span className="mx-3 mb-6 h-px flex-1 bg-foreground/15">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isDone ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="block h-full origin-left"
                  style={{ backgroundColor: accent }}
                />
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
