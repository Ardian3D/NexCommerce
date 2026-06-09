import { cn } from '@/lib/utils'

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-3.5 w-3.5', className)}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 0c.6 5.4 2.6 9.4 8 12-5.4 2.6-7.4 6.6-8 12-.6-5.4-2.6-9.4-8-12 5.4-2.6 7.4-6.6 8-12Z" />
    </svg>
  )
}
