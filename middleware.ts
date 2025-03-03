import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const isBlogDomain = hostname?.includes('blog.')
  const path = request.nextUrl.pathname
  
  if (isBlogDomain) {
    // Don't rewrite if it's already pointing to /blog
    if (path.startsWith('/blog')) {
      return NextResponse.next()
    }
    
    // Rewrite the URL to the blog pages
    const url = request.nextUrl.clone()
    url.pathname = `/blog${path}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 