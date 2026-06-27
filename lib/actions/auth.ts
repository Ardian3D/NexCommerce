'use server'

import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { signJWT } from '@/lib/auth/jwt'
import { getServerSession, SESSION_COOKIE } from '@/lib/auth/session'

export async function getUserByWallet(walletAddress: string) {
  return prisma.user.findUnique({
    where: { walletAddress },
    select: {
      id: true,
      role: true,
      fullName: true,
      country: true,
      photoUrl: true,
      verificationStatus: true,
      identityActivatedAt: true,
      createdAt: true,
      sellerProfile: { select: { storeName: true, currentTier: true, trustScore: true } },
      buyerProfile: { select: { currentTier: true, trustScore: true } },
    },
  })
}

// Wallet dibaca dari JWT session — client tidak bisa inject wallet address palsu
export async function createUserWithRole(role: 'buyer' | 'seller') {
  const session = await getServerSession()
  if (!session?.wallet) throw new Error('Unauthorized')

  const user = await prisma.user.upsert({
    where: { walletAddress: session.wallet },
    update: {},
    create: { walletAddress: session.wallet, role },
    select: { id: true, role: true, verificationStatus: true },
  })

  // Issue JWT baru dengan role yang sudah ada
  const token = await signJWT({
    sub: user.id,
    wallet: session.wallet,
    role: user.role,
    verificationStatus: user.verificationStatus,
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 900,
    path: '/',
  })

  return user
}

export async function submitVerification(
  form: {
    fullName: string
    email: string
    country: string
    telegram: string
    twitter: string
    bio: string
    photo: string | null
    termsAccepted: boolean
    // buyer
    occupation?: string
    interests?: string
    categories?: string[]
    website?: string
    discord?: string
    linkedin?: string
    whyJoin?: string
    // seller
    storeName?: string
    storeDescription?: string
    storeWebsite?: string
    businessCategory?: string
    yearsExperience?: string
  },
  role: 'buyer' | 'seller'
) {
  const session = await getServerSession()
  if (!session?.wallet) throw new Error('Unauthorized')

  return prisma.user.update({
    where: { walletAddress: session.wallet },
    data: {
      fullName: form.fullName,
      email: form.email || null,
      country: form.country,
      telegram: form.telegram,
      twitter: form.twitter,
      bio: form.bio,
      photoUrl: form.photo,
      termsAccepted: form.termsAccepted,
      verificationStatus: 'pending',
      ...(role === 'buyer'
        ? {
            buyerProfile: {
              upsert: {
                create: {
                  occupation: form.occupation,
                  interests: form.interests,
                  preferredCategories: form.categories ?? [],
                  website: form.website,
                  discord: form.discord,
                  linkedin: form.linkedin,
                  whyJoin: form.whyJoin,
                },
                update: {
                  occupation: form.occupation,
                  interests: form.interests,
                  preferredCategories: form.categories ?? [],
                  website: form.website,
                  discord: form.discord,
                  linkedin: form.linkedin,
                  whyJoin: form.whyJoin,
                },
              },
            },
          }
        : {
            sellerProfile: {
              upsert: {
                create: {
                  storeName: form.storeName,
                  storeDescription: form.storeDescription,
                  storeWebsite: form.storeWebsite,
                  businessCategory: form.businessCategory,
                  yearsExperience: form.yearsExperience,
                },
                update: {
                  storeName: form.storeName,
                  storeDescription: form.storeDescription,
                  storeWebsite: form.storeWebsite,
                  businessCategory: form.businessCategory,
                  yearsExperience: form.yearsExperience,
                },
              },
            },
          }),
    },
  })
}

export async function markIdentityActivated() {
  const session = await getServerSession()
  if (!session?.wallet) throw new Error('Unauthorized')

  return prisma.user.update({
    where: { walletAddress: session.wallet },
    data: { identityActivatedAt: new Date() },
  })
}

// Hanya admin yang bisa approve — dicek via role di JWT
export async function approveUser(userId: string) {
  const session = await getServerSession()
  if (session?.role !== 'admin') throw new Error('Forbidden')

  return prisma.user.update({
    where: { id: userId },
    data: {
      verificationStatus: 'approved',
      verificationCompletedAt: new Date(),
    },
  })
}
