import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('í¼± Seeding database...');

  // Clean up existing data
  await prisma.vendorApplication.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.create({
    data: {
      name: 'Alice Demo',
      email: 'alice@vendorify.com',
      password: hashedPassword,
    },
  });
  console.log('âœ… User created:', alice.email);

  const bob = await prisma.user.create({
    data: {
      name: 'Bob Vendor',
      email: 'bob@vendorify.com',
      password: hashedPassword,
    },
  });
  console.log('âœ… User created:', bob.email);

  // Create vendor applications
  await prisma.vendorApplication.createMany({
    data: [
      {
        vendorName: "Alice's Fresh Produce",
        stallType: 'Food & Produce',
        licenseNumber: 'LIC-2024-001',
        status: 'Approved',
        userId: alice.id,
      },
      {
        vendorName: "Alice's Bakery Corner",
        stallType: 'Bakery',
        licenseNumber: 'LIC-2024-002',
        status: 'Pending',
        userId: alice.id,
      },
      {
        vendorName: "Bob's Electronics Stall",
        stallType: 'Electronics',
        licenseNumber: 'LIC-2024-003',
        status: 'Pending',
        userId: bob.id,
      },
    ],
  });
  console.log('âœ… Vendor applications created');

  console.log('\ní¾‰ Seed completed!');
  console.log('Demo accounts:');
  console.log('  Email: alice@vendorify.com  Password: password123');
  console.log('  Email: bob@vendorify.com    Password: password123');
}

main()
  .catch((e) => {
    console.error('âŒ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
