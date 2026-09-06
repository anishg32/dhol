import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // next is the intended redirect URL after auth
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      const authorizedEmail = process.env.AUTHORIZED_ADMIN_EMAIL || "teamaliyanz@gmail.com"
      
      // If the intended destination is an admin route, enforce admin email
      if (next.startsWith('/admin')) {
        if (user && user.email === authorizedEmail) {
          return NextResponse.redirect(`${origin}${next}`)
        } else {
          await supabase.auth.signOut()
          return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`)
        }
      }
      
      // For all other users/routes, simply redirect them to their next location
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
