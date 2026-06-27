import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { randomBytes } from 'crypto'
import { PublicKey } from '@solana/web3.js'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const wallet = req.nextUrl.searchParams.get('wallet')

  if (!wallet) {
    return NextResponse.json({ error: 'wallet required' }, { status: 400 })
  }

  // Validasi format Solana public key
  try {
    new PublicKey(wallet)
  } catch {
    return NextResponse.json({ error: 'invalid wallet address' }, { status: 400 })
  }

  // Hapus nonce lama yang expired untuk wallet ini
  await prisma.authNonce.deleteMany({
    where: { wallet, expiresAt: { lt: new Date() } },
  })

  const nonce = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 menit

  await prisma.authNonce.create({ data: { wallet, nonce, expiresAt } })

  return NextResponse.json({ nonce })
}
