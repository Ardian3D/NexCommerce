import { cookies } from 'next/headers'
import { verifyJWT, type JWTPayload } from './jwt'

export const SESSION_COOKIE = 'nexc_session'

export async function getServerSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifyJWT(token)
}

export async function requireSession(): Promise<JWTPayload> {
  const session = await getServerSession()
  if (!session) throw new Error('Unauthorized')
  return session
}

export async function requireRole(role: 'buyer' | 'seller' | 'admin'): Promise<JWTPayload> {
  const session = await requireSession()
  if (session.role !== role) throw new Error('Forbidden')
  return session
}
