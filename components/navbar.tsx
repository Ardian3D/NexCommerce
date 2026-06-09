import Image from 'next/image'
import { Sparkle } from './sparkle'

const links = ['Products', 'Categories', 'About', 'Contact']

export function Navbar() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/navbar-logo.png"
            alt="NexCommerce"
            width={140}
            height={40}
            priority
            className="h-auto w-auto object-contain"
          />
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="
                text-sm
                font-medium
                uppercase
                tracking-wider
                text-foreground/70
                transition-all
                duration-300
                hover:text-foreground
              "
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
       <button
  className="
    flex
    items-center
    gap-2
    rounded-full
    bg-gradient-to-r
    from-blue-500
    to-blue-600
    px-6
    py-3
    text-xs
    font-semibold
    uppercase
    tracking-wider
    text-white
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-xl
    hover:shadow-blue-500/30
  "
>
          <Sparkle className="h-4 w-4" />
          Start Shop
          <Sparkle className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}