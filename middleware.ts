import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const idToken = request.cookies.get('firebase_id_token')?.value;
  const { pathname } = request.nextUrl;

  if (!idToken && (pathname.startsWith('/generator') || pathname.startsWith('/history'))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (idToken && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/generator', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/generator/:path*', '/generator', '/history/:path*', '/history', '/sign-up', '/sign-in'],
};
