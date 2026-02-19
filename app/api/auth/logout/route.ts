import { NextResponse } from 'next/server';

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.delete('vendorify_token');
  return response;
}
