'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#2563eb', '#7c3aed', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4']

type Piece = {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  size: number
  rotate: number
  drift: number
  rounded: boolean
}

export function ConfettiBurst({ count = 60 }: { count?: number }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.6 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 160,
        rounded: Math.random() > 0.5,
      })),
    [count],
  )

  if (!mounted) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.rounded ? 1 : 1.6),
            backgroundColor: p.color,
            borderRadius: p.rounded ? '9999px' : '2px',
          }}
          initial={{ y: -40, opacity: 0, rotate: p.rotate }}
          animate={{
            y: ['-10%', '120%'],
            x: [0, p.drift],
            opacity: [0, 1, 1, 0],
            rotate: [p.rotate, p.rotate + 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
            repeat: Infinity,
            repeatDelay: 1.4,
          }}
        />
      ))}
    </div>
  )
}
