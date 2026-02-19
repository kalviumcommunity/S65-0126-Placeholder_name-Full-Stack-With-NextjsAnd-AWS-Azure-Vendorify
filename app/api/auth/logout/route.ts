import { NextResponse } from 'next/server';

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  // Explicitly expire the cookie with the same attributes used when setting it.
  // Using .delete() with only the name can fail to clear the cookie in some
  // browsers when the original Set-Cookie included path/secure/sameSite.
  response.cookies.set('vendorify_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
