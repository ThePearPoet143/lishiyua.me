import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const path = request.nextUrl.pathname
  const isProd = process.env.NODE_ENV === 'production'

  // If on main domain and trying to access /blog, redirect to blog subdomain
  if (!hostname?.startsWith('blog.') && path.startsWith('/blog')) {
    const newUrl = request.nextUrl.clone()
    // Remove /blog prefix from path
    newUrl.pathname = path.replace('/blog', '')
    // Change hostname to blog subdomain
    newUrl.host = `blog.${hostname}`
    return NextResponse.redirect(newUrl)
  }

  // Handle blog subdomain routing
  if (hostname?.startsWith('blog.')) {
    // If accessing root of blog subdomain
    if (path === '/') {
      const newUrl = request.nextUrl.clone()
      // Show the blog index without /blog prefix
      return NextResponse.rewrite(new URL('/blog', request.url))
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
    // Match all paths except static files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 