import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/src/lib/prisma';
import { hashPassword, signToken } from '@/src/lib/auth';

// ─── Env-var guard (caught by the module-level check in prisma.ts, but guard
//     JWT_SECRET here too so the error surfaces in this route's stack trace)
if (!process.env.JWT_SECRET) {
  console.warn(
    '[signup] JWT_SECRET is not set — using insecure fallback. ' +
      'Set JWT_SECRET in your Vercel environment variables.'
  );
}

// ─── POST /api/auth/signup ────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body as {
      name: string;
      email: string;
      password: string;
    };

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    // Prisma unique-constraint violation (P2002) is faster than a pre-check
    // query, and is race-condition-safe.
    const hashed = await hashPassword(password);

    let user;
    try {
      user = await prisma.user.create({
        data: { name, email, password: hashed },
      });
    } catch (dbError) {
      if (
        dbError instanceof Prisma.PrismaClientKnownRequestError &&
        dbError.code === 'P2002'
      ) {
        return NextResponse.json(
          { error: 'An account with this email already exists.' },
          { status: 409 }
        );
      }
      // Surface real DB errors clearly in Vercel logs
      console.error('[POST /api/auth/signup] Database error:', {
        message: (dbError as Error).message,
        code: (dbError as Prisma.PrismaClientKnownRequestError).code,
        stack: (dbError as Error).stack,
      });
      throw dbError;
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json(
      {
        message: 'Account created successfully',
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 }
    );

    response.cookies.set('vendorify_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    // Log the full error so it appears in Vercel's function log viewer.
    console.error('[POST /api/auth/signup] Unhandled error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name,
    });
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
