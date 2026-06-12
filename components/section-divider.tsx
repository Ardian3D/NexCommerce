'use client'

import { motion } from 'framer-motion'

/**
 * Animated section divider.
 * Renders an invisible track with a blue line that draws itself
 * (scales from the center outward) when scrolled into view.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-px w-full max-w-7xl px-6 md:px-10"
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full origin-center bg-gradient-to-r from-transparent via-primary to-transparent"
      >
        {/* Travelling glow dot */}
        <motion.span
          initial={{ left: '0%', opacity: 0 }}
          whileInView={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.1 }}
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_2px_var(--color-primary)]"
        />
      </motion.div>
    </div>
  )
}
