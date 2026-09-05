import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { pathname } = request.nextUrl
  const method = request.method

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isAdminApi = 
    (pathname.startsWith('/api/messages') && method !== 'POST' && pathname !== '/api/messages/unread-count') ||
    (pathname === '/api/messages/unread-count') ||
    (pathname.startsWith('/api/bookings') && method !== 'POST')

  // Protect /admin routes and sensitive API routes
  if (isAdminPage || isAdminApi) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      // no user, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    // Email restriction check
    const authorizedEmail = process.env.AUTHORIZED_ADMIN_EMAIL || "teamaliyanz@gmail.com"
    if (user.email !== authorizedEmail) {
      // Delete the session
      await supabase.auth.signOut()
      
      if (isAdminApi) {
        return NextResponse.json({ error: 'Forbidden: Unauthorized Admin Account' }, { status: 403 })
      }
      
      // Redirect for pages
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('error', 'unauthorized')
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

