import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyToken } from '@/src/lib/auth';

// ─── POST /api/upload ─────────────────────────────────────────────────────────
// Vercel-compatible: no file system writes. Validates the file and saves a
// Document record with a mock URL so the rest of the app keeps working.
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const token = request.cookies.get('vendorify_token')?.value;
    const user = token ? await verifyToken(token) : null;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only image files (JPEG, PNG, GIF, WebP) are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5 MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be under 5 MB.' },
        { status: 400 }
      );
    }

    // Save metadata in DB with a mock URL (no disk write on serverless)
    await prisma.document.create({
      data: {
        fileName: file.name,
        fileUrl: 'https://example.com/mock-file.jpg',
        userId: user.userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        fileName: file.name,
        message: 'File received (mock upload for production).',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/upload]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
