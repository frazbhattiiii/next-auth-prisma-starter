import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This is your secret from NextAuth configuration
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret });
  const url = req.nextUrl.clone();

  // Redirect authenticated users from /auth to /dashboard
  if (url.pathname.startsWith('/auth')) {
    if (session) {
      url.pathname = '/'; // Change to your dashboard path
      return NextResponse.redirect(url);
    } else {
      // Continue to /auth if there's no session
      return NextResponse.next();
    }
  }

  // if (
  //   url.pathname.startsWith('/dashboard') ||
  //   url.pathname.startsWith('/resources') ||
  //   url.pathname.startsWith('/subscriptions')
  // ) {
  //   if (!session) {
  //     url.pathname = '/auth'; // Redirect to login if not authenticated
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*'], // Include /auth in the matcher
};
