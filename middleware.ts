import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const path = request.nextUrl.pathname
  const isProd = process.env.NODE_ENV === 'production'

  // If on main domain and trying to access /blog, redirect to blog subdomain
  if (!hostname?.startsWith('blog.') && path.startsWith('/blog')) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = path.replace('/blog', '')
    newUrl.host = `blog.${hostname}`
    return NextResponse.redirect(newUrl)
  }

  // Handle blog subdomain routing
  if (hostname?.startsWith('blog.')) {
    // Special case: root path on blog subdomain
    if (path === '/') {
      return NextResponse.next()
    }

    // For all other blog paths, rewrite to include /blog prefix internally
    if (!path.startsWith('/blog')) {
      const newUrl = request.nextUrl.clone()
      newUrl.pathname = `/blog${path}`
      return NextResponse.rewrite(newUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}