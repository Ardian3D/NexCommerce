import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createClient(): PrismaClient {
  // Neon PgBouncer pooler (DATABASE_URL) tidak kompatibel dgn Prisma TCP.
  // Pakai DIRECT_URL untuk koneksi langsung tanpa pooler.
  // https://neon.tech/docs/connect/connectivity-issues#prisma
  const directUrl = process.env.DIRECT_URL
  if (directUrl) {
    console.log('[DB] Using DIRECT_URL for Prisma (bypass PgBouncer)')
    process.env.DATABASE_URL = directUrl
  } else {
    console.log('[DB] DIRECT_URL not set, using DATABASE_URL:', process.env.DATABASE_URL ? 'set' : 'NOT SET')
  }

  return new PrismaClient()
}

function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma
  globalForPrisma.prisma = createClient()
  return globalForPrisma.prisma
}

// Lazy init — client hanya dibuat saat query pertama
export const prisma = new Proxy({} as unknown as PrismaClient, {
  get(_, prop: string | symbol) {
    const client = getPrisma()
    const value = Reflect.get(client as object, prop, client)
    return typeof value === 'function' ? value.bind(client) : value
  },
})
