import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export type JWTPayload = {
  sub: string | null   // user UUID (null jika belum register)
  wallet: string       // Solana public key
  role: 'buyer' | 'seller' | 'admin' | null
  verificationStatus: 'unverified' | 'pending' | 'approved'
}

export async function signJWT(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret)
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}
