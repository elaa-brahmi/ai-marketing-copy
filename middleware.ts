import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// This function checks for a Firebase ID token in cookies
export function middleware(request: NextRequest) {
  const idToken = request.cookies.get('firebase_id_token')?.value;
  // If no token, redirect to sign-up
  if (!idToken) {
    console.log('No token found, redirecting to sign-up');
    return NextResponse.redirect(new URL('/sign-up', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/generator/:path*', '/generator', '/history/:path*', '/history'],
};