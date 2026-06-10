import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Catalog } from '@/components/sections/catalog'
import { Identity } from '@/components/sections/identity'
import { Steps } from '@/components/sections/steps'
import { HowItWorks } from '@/components/sections/how-it-works'
import { BuildOnTrust } from '@/components/sections/build-on-trust'
import { Testimonials } from '@/components/sections/testimonials'
import { Faq } from '@/components/sections/faq'
import { Footer } from '@/components/footer'

const gridBackground = {
  backgroundImage:
    'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

export default function Page() {
  return (
    <div className="min-h-screen bg-foreground p-2 sm:p-3">
      <main className="relative rounded-lg bg-background">
        <div className="relative">
          {/* Hero — pinned, gets covered on scroll */}
          <div className="sticky top-2 z-0 overflow-hidden rounded-t-lg bg-background sm:top-3">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={gridBackground}
              aria-hidden="true"
            />
            <div className="relative z-10 flex min-h-[calc(100vh-1rem)] flex-col sm:min-h-[calc(100vh-1.5rem)]">
              <Navbar />
              <Hero />
            </div>
          </div>

          {/* Content — slides up over the hero */}
          <div className="relative z-10 overflow-hidden rounded-t-[2rem] rounded-b-lg border-t-[6px] border-primary bg-background shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.4)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={gridBackground}
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col">
              <Catalog />
              <Identity />
              <Steps />
              <HowItWorks />
              <BuildOnTrust />
              <Testimonials />
              <Faq />
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
