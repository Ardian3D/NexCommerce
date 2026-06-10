import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const columns = [
  {
    title: 'Shop',
    links: ['All Products', 'Categories', 'New Arrivals', 'Best Sellers', 'Deals'],
  },
  {
    title: 'Sell',
    links: ['Become a Seller', 'Seller Dashboard', 'Seller Resources', 'Pricing'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Press', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Terms of Service', 'Privacy Policy', 'Refund Policy', 'Cookie Policy'],
  },
]

const socials: { label: string; path: string }[] = [
  {
    label: 'Instagram',
    path: 'M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.43 8.5 3.42 8.85 3.42 12s0 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.15 4 12 4Zm0 3.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9Zm0 1.78a3.17 3.17 0 1 0 0 6.34 3.17 3.17 0 0 0 0-6.34Zm5.15-.92a1.16 1.16 0 1 1-2.31 0 1.16 1.16 0 0 1 2.31 0Z',
  },
  {
    label: 'X',
    path: 'M17.53 3h2.94l-6.42 7.34L21.6 21h-5.9l-4.62-6.04L5.8 21H2.86l6.87-7.85L2.4 3h6.05l4.18 5.52L17.53 3Zm-1.03 16.2h1.63L7.6 4.7H5.85L16.5 19.2Z',
  },
  {
    label: 'LinkedIn',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.84v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z',
  },
  {
    label: 'GitHub',
    path: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background px-6 pb-8 pt-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,0.8fr)_1.2fr]">
          {/* Brand */}
          <div>
            <Image
              src="/navbar-logo.png"
              alt="NexCommerce"
              width={150}
              height={40}
              className="h-8 w-auto object-contain"
            />
            <p className="mt-5 max-w-xs font-mono text-xs leading-relaxed text-foreground/60">
              The next generation of commerce. Built for everyone, everywhere.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-primary hover:text-primary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                {title}
              </h4>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stay in the loop */}
          <div>
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Stay In The Loop
            </h4>
            <p className="mt-5 font-mono text-xs leading-relaxed text-foreground/60">
              Get updates on new products, exclusive deals, and more.
            </p>
            <form className="mt-5 flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-foreground/50">
            © 2026 NexCommerce. All rights reserved.
          </p>
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
            Building The Future Of Commerce
            <ArrowRight className="h-3.5 w-3.5" />
          </p>
        </div>
      </div>
    </footer>
  )
}
