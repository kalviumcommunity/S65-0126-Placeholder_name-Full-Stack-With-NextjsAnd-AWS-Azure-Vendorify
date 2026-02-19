import { prisma } from './prisma';

/**
 * Get all vendor applications for a specific user
 */
export async function getVendorApplicationsByUser(userId: number) {
  try {
    const applications = await prisma.vendorApplication.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return applications;
  } catch (error) {
    console.error('Error fetching vendor applications:', error);
    throw error;
  }
}

/**
 * Get a single vendor application by ID
 */
export async function getVendorApplicationById(id: number) {
  try {
    const application = await prisma.vendorApplication.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return application;
  } catch (error) {
    console.error('Error fetching vendor application:', error);
    throw error;
  }
}

/**
 * Create a new vendor application
 */
export async function createVendorApplication(
  userId: number,
  vendorName: string,
  stallType: string,
  licenseNumber: string
) {
  try {
    const application = await prisma.vendorApplication.create({
      data: { userId, vendorName, stallType, licenseNumber },
    });
    return application;
  } catch (error) {
    console.error('Error creating vendor application:', error);
    throw error;
  }
}

/**
 * Find a user by email
 */
export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}
