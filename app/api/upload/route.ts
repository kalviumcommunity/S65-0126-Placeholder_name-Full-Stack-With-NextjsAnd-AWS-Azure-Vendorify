import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { prisma } from '@/src/lib/prisma';
import { verifyToken } from '@/src/lib/auth';

// ─── POST /api/upload ─────────────────────────────────────────────────────────
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

    // Build unique filename
    const ext = file.name.split('.').pop() ?? 'jpg';
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const filename = `${Date.now()}-${user.userId}-${safeName}.${ext}`;

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadsDir, filename), buffer);

    // Save metadata in DB
    const document = await prisma.document.create({
      data: {
        fileName: file.name,
        fileUrl: `/uploads/${filename}`,
        userId: user.userId,
      },
    });

    return NextResponse.json(
      {
        message: 'File uploaded successfully.',
        document: {
          id: document.id,
          fileName: document.fileName,
          fileUrl: document.fileUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/upload]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
