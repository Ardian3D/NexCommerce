import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
const SESSION_COOKIE = 'nexc_session'

// Rate limiter sederhana (in-memory, per Edge instance)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false
  entry.count++
  return true
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.devnet.solana.com https://api.mainnet-beta.solana.com wss://api.devnet.solana.com wss://api.mainnet-beta.solana.com",
    "worker-src blob:",
  ].join('; '),
}

// Rute yang membutuhkan role tertentu
const ROLE_PROTECTED = [
  { pattern: /^\/admin(\/|$)/, role: 'admin' },
  { pattern: /^\/seller(\/|$)/, role: 'seller' },
  { pattern: /^\/buyer(\/|$)/, role: 'buyer' },
] as const

// Rute yang membutuhkan JWT (wallet apapun, role apapun)
const AUTH_REQUIRED = [
  /^\/checkout/,
  /^\/payment/,
  /^\/cart/,
  /^\/order/,
  /^\/selection-role/,
  /^\/verify/,
  /^\/pending-review/,
  /^\/identity-activated/,
  /^\/identity/,
  /^\/review/,
]

// Rute dashboard yang butuh verificationStatus = approved
const REQUIRES_APPROVED = [
  /^\/buyer\/dashboard/,
  /^\/seller\/dashboard/,
  /^\/checkout/,
  /^\/payment/,
]

// Dashboard default per role
const ROLE_DASHBOARD: Record<string, string> = {
  buyer: '/buyer/dashboard',
  seller: '/seller/dashboard',
  admin: '/admin/dashboard',
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  // --- Security headers untuk semua response ---
  const response = NextResponse.next()
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }

  // --- Rate limit: /api/auth/* → max 5 req/menit per IP ---
  if (pathname.startsWith('/api/auth/')) {
    const allowed = checkRateLimit(`auth:${ip}`, 5, 60_000)
    if (!allowed) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests, coba lagi 1 menit' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          ...SECURITY_HEADERS,
        },
      })
    }
    return response
  }

  // --- Cek apakah rute ini butuh proteksi ---
  const needsRole = ROLE_PROTECTED.find(({ pattern }) => pattern.test(pathname))
  const needsAuth = AUTH_REQUIRED.some((r) => r.test(pathname))

  if (!needsRole && !needsAuth) return response

  // --- Baca & verifikasi JWT dari cookie ---
  const token = request.cookies.get(SESSION_COOKIE)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/connect', request.url))
  }

  let payload: {
    sub: string | null
    wallet: string
    role: string | null
    verificationStatus: string
  }

  try {
    const { payload: p } = await jwtVerify(token, secret)
    payload = p as typeof payload
  } catch {
    const redirect = NextResponse.redirect(new URL('/connect', request.url))
    redirect.cookies.delete(SESSION_COOKIE)
    return redirect
  }

  // --- Role check untuk admin/seller/buyer routes ---
  if (needsRole) {
    if (payload.role !== needsRole.role) {
      const dest = payload.role ? ROLE_DASHBOARD[payload.role] ?? '/connect' : '/connect'
      return NextResponse.redirect(new URL(dest, request.url))
    }
  }

  // --- Verification check untuk halaman sensitif ---
  if (REQUIRES_APPROVED.some((r) => r.test(pathname))) {
    if (payload.verificationStatus !== 'approved') {
      const dest =
        payload.verificationStatus === 'pending'
          ? '/pending-review'
          : `/verify?role=${payload.role ?? 'buyer'}`
      return NextResponse.redirect(new URL(dest, request.url))
    }
  }

  // Forward user info ke halaman via header (bisa dibaca di RSC)
  if (payload.sub) response.headers.set('x-user-id', payload.sub)
  if (payload.role) response.headers.set('x-user-role', payload.role)
  response.headers.set('x-user-wallet', payload.wallet)

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.ico$|.*\\.gif$).*)',
  ],
}
