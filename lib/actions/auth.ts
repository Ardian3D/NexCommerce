'use server'

import { prisma } from '@/lib/db'

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

export async function createUserWithRole(
  walletAddress: string,
  role: 'buyer' | 'seller'
) {
  return prisma.user.upsert({
    where: { walletAddress },
    update: {},
    create: { walletAddress, role },
    select: { id: true, role: true, verificationStatus: true },
  })
}

export async function submitVerification(
  walletAddress: string,
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
  return prisma.user.update({
    where: { walletAddress },
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

export async function markIdentityActivated(walletAddress: string) {
  return prisma.user.update({
    where: { walletAddress },
    data: { identityActivatedAt: new Date() },
  })
}

// Dipanggil dari admin dashboard
export async function approveUser(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      verificationStatus: 'approved',
      verificationCompletedAt: new Date(),
    },
  })
}
