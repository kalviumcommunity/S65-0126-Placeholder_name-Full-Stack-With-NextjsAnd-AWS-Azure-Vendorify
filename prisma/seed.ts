import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create a user
  const user = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice Example",
      role: "USER",
    },
  });
  console.log("✅ User created:", user.email);

  // 2. Create a project owned by the user
  const project = await prisma.project.create({
    data: {
      name: "Demo Project",
      description: "A seeded demo project to explore the schema",
      ownerId: user.id,
    },
  });
  console.log("✅ Project created:", project.name);

  // 3. Create 2 tasks linked to the project
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: "Initialize repository",
        description: "Set up Git repo, add README, and basic CI/CD tooling",
        projectId: project.id,
        creatorId: user.id,
        assignedToId: user.id,
        status: "TODO",
        priority: 1,
      },
      {
        title: "Add authentication",
        description: "Implement user login with JWT and secure password hashing",
        projectId: project.id,
        creatorId: user.id,
        // Intentionally not assigned to show that assignedToId can be null
        status: "TODO",
        priority: 2,
      },
    ],
  });
  console.log(`✅ ${tasks.count} tasks created`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
