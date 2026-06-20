import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

// Node.js environment (Vercel serverless) butuh WebSocket constructor
if (typeof WebSocket === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  neonConfig.webSocketConstructor = require('ws')
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? ''

  // Neon → pakai HTTP/WebSocket adapter (tidak hang di serverless)
  if (url.includes('neon.tech')) {
    const pool = new Pool({ connectionString: url })
    const adapter = new PrismaNeon(pool)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new PrismaClient({ adapter } as any)
  }

  // Local PostgreSQL → pakai TCP biasa
  return new PrismaClient()
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
