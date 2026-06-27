import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { signJWT } from '@/lib/auth/jwt'
import { SESSION_COOKIE } from '@/lib/auth/session'
import { PublicKey } from '@solana/web3.js'
import nacl from 'tweetnacl'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  let body: { wallet?: string; signature?: string; nonce?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const { wallet, signature, nonce } = body

  if (!wallet || !signature || !nonce) {
    return NextResponse.json({ error: 'wallet, signature, and nonce are required' }, { status: 400 })
  }

  // Validasi format public key
  let pubKey: PublicKey
  try {
    pubKey = new PublicKey(wallet)
  } catch {
    return NextResponse.json({ error: 'invalid wallet address' }, { status: 400 })
  }

  // Cek nonce di DB
  const nonceRecord = await prisma.authNonce.findUnique({ where: { nonce } })

  if (
    !nonceRecord ||
    nonceRecord.wallet !== wallet ||
    nonceRecord.used ||
    nonceRecord.expiresAt < new Date()
  ) {
    return NextResponse.json({ error: 'invalid or expired nonce' }, { status: 401 })
  }

  // Verifikasi signature Solana (Ed25519)
  const message = `NexCommerce Authentication\nNonce: ${nonce}`
  const messageBytes = new TextEncoder().encode(message)

  let signatureBytes: Uint8Array
  try {
    signatureBytes = Buffer.from(signature, 'base64')
  } catch {
    return NextResponse.json({ error: 'invalid signature format' }, { status: 400 })
  }

  const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, pubKey.toBytes())

  if (!isValid) {
    return NextResponse.json({ error: 'signature verification failed' }, { status: 401 })
  }

  // Tandai nonce sudah dipakai (prevent replay)
  await prisma.authNonce.update({ where: { nonce }, data: { used: true } })

  // Cari user di DB
  const user = await prisma.user.findUnique({
    where: { walletAddress: wallet },
    select: {
      id: true,
      role: true,
      verificationStatus: true,
      identityActivatedAt: true,
    },
  })

  // Issue JWT
  const token = await signJWT({
    sub: user?.id ?? null,
    wallet,
    role: user?.role ?? null,
    verificationStatus: user?.verificationStatus ?? 'unverified',
  })

  const response = NextResponse.json({
    success: true,
    user: user
      ? {
          role: user.role,
          verificationStatus: user.verificationStatus,
          identityActivatedAt: user.identityActivatedAt,
        }
      : null,
  })

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 900, // 15 menit
    path: '/',
  })

  return response
}
