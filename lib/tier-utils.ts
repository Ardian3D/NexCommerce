export function nextTierLabel(tier: string): string {
  if (tier === 'Starter') return 'Next: Ascent (40)'
  if (tier === 'Ascent') return 'Next: Elite (70)'
  if (tier === 'Elite') return 'Next: Titanium (90)'
  return 'Max Tier Reached'
}
