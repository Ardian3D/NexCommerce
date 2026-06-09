import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'

export default function Page() {
  return (
    <div className="min-h-screen bg-foreground p-2 sm:p-3">
      <main className="relative flex min-h-[calc(100vh-1rem)] flex-col overflow-hidden rounded-lg bg-background sm:min-h-[calc(100vh-1.5rem)]">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-1 flex-col">
          <Navbar />
          <Hero />
        </div>
      </main>
    </div>
  )
}
