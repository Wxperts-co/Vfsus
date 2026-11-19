import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 301 Redirects to home page (/)
  if (
    pathname === '/_next/static/media/6c98c9fb873995d2-s.p.4a6499bc.woff2' ||
    pathname === '/_next/static/media/0595f7052377a1a2-s.p.0de08f1e.woff2' ||
    pathname === '/vehicle-patrol.php' ||
    pathname === '/index.php/post/167' ||
    pathname === '/index.php/why-choose-us.php' ||
    pathname === '/vsf-goes-nationwide.php' ||
    pathname === '/why-choose-us.php' ||
    pathname === '/how-we-recruit.php' ||
    (pathname === '/favicon.ico' && searchParams.has('favicon.6fdfc723.ico'))
  ) {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  // Protect all /admin routes except /admin/login
  if (
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    !pathname.startsWith('/api/') // Skip API routes in middleware as they handle their own auth
  ) {
    const token = request.cookies.get('admin_token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/_next/static/media/6c98c9fb873995d2-s.p.4a6499bc.woff2',
    '/_next/static/media/0595f7052377a1a2-s.p.0de08f1e.woff2',
    '/vehicle-patrol.php',
    '/index.php/post/167',
    '/index.php/why-choose-us.php',
    '/vsf-goes-nationwide.php',
    '/why-choose-us.php',
    '/how-we-recruit.php',
    '/favicon.ico',
  ],
};
