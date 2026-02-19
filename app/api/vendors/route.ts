import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyToken } from '@/src/lib/auth';

// ─── GET /api/vendors ─────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('vendorify_token')?.value;
    const user = token ? await verifyToken(token) : null;

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const applications = await prisma.vendorApplication.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('[GET /api/vendors]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// ─── POST /api/vendors ────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('vendorify_token')?.value;
    const user = token ? await verifyToken(token) : null;

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { vendorName, stallType, licenseNumber } = body as {
      vendorName: string;
      stallType: string;
      licenseNumber: string;
    };

    if (!vendorName || !stallType || !licenseNumber) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const application = await prisma.vendorApplication.create({
      data: {
        vendorName,
        stallType,
        licenseNumber,
        status: 'Pending',
        userId: user.userId,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('[POST /api/vendors]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
