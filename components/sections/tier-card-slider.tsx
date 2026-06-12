'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const cards = [
  { tier: 'Starter', src: '/card-tier-starter.png', zoom: 1.06, posY: '50%' },
  { tier: 'Ascent', src: '/card-tier-ascent.png', zoom: 1.06, posY: '50%' },
  { tier: 'Elite', src: '/card-tier-elite.png', zoom: 1.01, posY: '50%' },
]

export function TierCardSlider() {
  const [index, setIndex] = useState(2)

  const go = (i: number) => setIndex((i + cards.length) % cards.length)

  return (
    <div className="flex w-full flex-col items-center">
      {/* Slider viewport */}
      <div className="w-full max-w-lg overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {cards.map(({ tier, src, zoom, posY }) => (
            <div key={tier} className="w-full shrink-0 px-1">
              <div className="relative aspect-[1.585/1] w-full overflow-hidden rounded-[1.4rem] shadow-2xl">
                <Image
                  src={src}
                  alt={`NexCommerce ${tier} tier identity card`}
                  fill
                  sizes="(max-width: 768px) 90vw, 512px"
                  className="object-cover"
                  style={{
                    objectPosition: `50% ${posY}`,
                    transform: `scale(${zoom})`,
                  }}
                  priority={tier === 'Elite'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous card"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {cards.map(({ tier }, i) => (
            <button
              key={tier}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${tier} tier`}
              aria-current={index === i}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-foreground/20 hover:bg-foreground/40'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next card"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Tier label */}
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">
        {cards[index].tier} Tier
      </p>
    </div>
  )
}
