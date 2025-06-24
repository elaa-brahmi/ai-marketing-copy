import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/* export function middleware(request: NextRequest) {
  if (!auth.currentUser) {
    return NextResponse.redirect(new URL('/sign-up', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard'],
}; */

// This function checks for a Firebase ID token in cookies
export function middleware(request: NextRequest) {
  const idToken = request.cookies.get('firebase_id_token')?.value;

  // If no token, redirect to sign-up
  if (!idToken) {
    return NextResponse.redirect(new URL('/sign-up', request.url));
  }

  // Optionally, you can verify the token here with Firebase Admin SDK (for extra security)
  // But for most client-side protected routes, just checking presence is enough

  return NextResponse.next();
}

export const config = {
  matcher: ['/generator/:path*', '/generator', '/history/:path*', '/history'],
};