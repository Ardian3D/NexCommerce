'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkle } from './sparkle'

export function Hero() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      tl.from('.hero-line', {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      })
        .from(
          '.hero-sub',
          {
            y: 24,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5',
        )
        .fromTo(
          '.hero-cta',
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            stagger: 0.12,
          },
        )
        .from(
          '.hero-wire',
          {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
          },
          '-=1',
        )
        .from(
          '.hero-star',
          {
            opacity: 0,
            scale: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.8',
        )

      gsap.to('.hero-wire', {
        y: 16,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to('.scroll-chevron', {
        y: 6,
        duration: 0.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="relative flex flex-1 flex-col items-center px-6 pt-12 text-center md:pt-20"
    >
      {/* Background Wireframe */}
      <div
        className="
          hero-wire
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -z-10
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-[38%]
          opacity-50
          md:h-[560px]
          md:w-[560px]
          lg:h-[640px]
          lg:w-[640px]
        "
      >
        <Image
          src="/hero-logo.png"
          alt=""
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Decorative Stars */}
      <Sparkle className="hero-star absolute left-[10%] top-[42%] h-5 w-5 text-foreground" />
      <Sparkle className="hero-star absolute right-[10%] top-[42%] h-5 w-5 text-foreground" />

      {/* Heading */}
      <h1
        className="
          relative z-10
          font-display
          font-black
          uppercase
          leading-[0.88]
          tracking-tight
          text-6xl
          text-foreground
          sm:text-7xl
          md:text-8xl
          lg:text-[7rem]
          xl:text-[8rem]
        "
      >
        <span className="block overflow-hidden">
          <span className="hero-line block">
            AI-Powered
          </span>
        </span>

        <span className="block overflow-hidden">
          <span className="hero-line block">
            Commerce{' '}
            <span className="text-primary">
              Platform
            </span>
          </span>
        </span>
      </h1>

      {/* Description */}
      <p
        className="
          hero-sub
          relative z-10
          mt-8
          max-w-2xl
          text-pretty
          font-sans
          text-base
          leading-relaxed
          text-foreground/70
          md:text-lg
        "
      >
        Empowering buyers and sellers with intelligent tools,
        seamless transactions, and a modern marketplace experience
        built for growth.
      </p>

      {/* CTA Buttons */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <button
          className="
            hero-cta
            flex items-center gap-2
            rounded-2xl
            bg-primary
            px-8 py-4
            font-sans
            text-sm
            font-semibold
            uppercase
            tracking-wide
            text-primary-foreground
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-xl
          "
        >
          <Sparkle />
          Start Shopping
          <Sparkle />
        </button>

        <button
          className="
            hero-cta
            flex items-center gap-2
            rounded-2xl
            border
            border-foreground/20
            bg-background/50
            px-8 py-4
            font-sans
            text-sm
            font-semibold
            uppercase
            tracking-wide
            text-foreground
            backdrop-blur-sm
            transition-all
            duration-300
            hover:border-primary
            hover:bg-primary/5
          "
        >
          <Sparkle />
          Become a Seller
          <Sparkle />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        className="
          relative z-10
          mt-32
          flex flex-col
          items-center
          gap-1
          font-sans
          text-xs
          font-medium
          uppercase
          tracking-[0.3em]
          text-foreground/60
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="scroll-chevron h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>

        <span>Scroll</span>
      </div>
    </section>
  )
}
