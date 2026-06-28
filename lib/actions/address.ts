'use server'

import { prisma } from '@/lib/db'
import { requireSession } from '@/lib/auth/session'

export type AddressInput = {
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

export type AddressResult =
  | { success: true }
  | { success: false; error: string }

export async function saveShippingAddress(
  input: AddressInput,
): Promise<AddressResult> {
  const session = await requireSession()
  if (!session.sub) return { success: false, error: 'Not authenticated' }

  if (!input.fullName || !input.address || !input.city || !input.country) {
    return { success: false, error: 'Name, address, city, and country are required.' }
  }

  await prisma.shippingAddress.upsert({
    where: { userId: session.sub },
    create: { ...input, userId: session.sub },
    update: input,
  })

  return { success: true }
}

export async function getShippingAddress() {
  const session = await requireSession()
  if (!session.sub) return null

  return prisma.shippingAddress.findUnique({
    where: { userId: session.sub },
  })
}
