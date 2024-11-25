import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const { data: { session } } = await supabase.auth.getSession()

    // Om användaren försöker nå admin-sidor
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // Tillåt åtkomst till login-sidan
      if (req.nextUrl.pathname === '/admin/login') {
        // Om användaren redan är inloggad, redirect till dashboard
        if (session) {
          return NextResponse.redirect(new URL('/admin/dashboard', req.url))
        }
        return res
      }

      // För alla andra admin-sidor, kräv inloggning
      if (!session) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // Vid fel, omdirigera till login för säkerhets skull
    if (req.nextUrl.pathname.startsWith('/admin') && 
        req.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return res
  }
}

export const config = {
  matcher: ['/admin/:path*']
}