'use client'

import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
}

/**
 * Reveal — animates its children into view on scroll.
 * Wrap any block to give it a smooth, minimal entrance.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.3,
}: {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/**
 * Stagger — orchestrates a group of RevealItem children so they
 * cascade into view one after another.
 */
export function Stagger({
  children,
  className,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  once?: boolean
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
