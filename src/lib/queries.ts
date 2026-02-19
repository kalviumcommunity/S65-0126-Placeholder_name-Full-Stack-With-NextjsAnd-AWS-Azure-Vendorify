import { prisma } from './prisma';

/**
 * Example: Get all users from the database
 * This function can be used in Server Components or API Routes
 */
export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * Example: Get a specific user by email
 */
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        projects: true,
        createdTasks: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

/**
 * Example: Create a new user
 */
export async function createUser(email: string, name: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role: 'USER',
      },
    });
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Example: Get all projects for a user
 */
export async function getUserProjects(userId: number) {
  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      include: {
        tasks: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

/**
 * Example: Get all tasks for a project
 */
export async function getProjectTasks(projectId: number) {
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}
