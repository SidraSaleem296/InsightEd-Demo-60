import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Handle /api/stripe route dynamically
  if (pathname.startsWith('/api/stripe')) {
    return NextResponse.next(); // Allow dynamic handling for the /api/stripe route
  }

  // Handle /search route dynamically
  if (pathname.startsWith('/search')) {
    return NextResponse.next(); // Allow dynamic handling for the /search route
  }

  // Continue with normal handling for all other routes
  return NextResponse.next();
}

export const config = {
  // Apply middleware only to the /api/stripe and /search routes
  matcher: ['/api/stripe', '/search'],
};
