Sprint 2.13: PostgreSQL Schema Design — Video Script

Hi — in this short walkthrough I’ll explain the PostgreSQL schema I designed for Vendorify and how to use it with Prisma.

Intro
Hi, I’m presenting Sprint 2.13. We designed a normalized PostgreSQL schema for Vendorify and added Prisma schema and a seed script.

Core entities
There are four main entities: User, Project, Task, and Comment. Users own Projects. Projects contain Tasks. Tasks may have a creator and an assignee and can have many Comments.

Prisma schema highlights
The schema uses `id` primary keys with `autoincrement()`. `email` on User is unique. `TaskStatus` is an enum with TODO, IN_PROGRESS, DONE, BLOCKED. Foreign keys use `@relation` and enforce referential integrity. We use `onDelete: Cascade` for owned data and `onDelete: SetNull` for optional user references. Timestamps use `@default(now())` and `@updatedAt`.

Normalization summary
The schema follows 1NF, 2NF, and 3NF: all columns are atomic, attributes depend on the primary key, and there are no transitive dependencies. We avoid duplicating user or project fields across tables.

Indexes & performance
We added indexes for common queries: `@@index([projectId, status])` on Task and indexes on foreign keys and email. Composite unique on `@@unique([ownerId, name])` prevents duplicate project names per user.

Migration & developer commands
Run:
```
npx prisma migrate dev --name init_schema
npx prisma generate
npx prisma studio
```
`migrate` applies schema changes, `generate` creates the Prisma Client, and `studio` opens a web GUI to inspect data.

Seed script
The seed creates one user, one project owned by that user, and two tasks for the project. Run the seed with `npx prisma db seed` or `npx ts-node prisma/seed.ts`.

Common queries
Examples you’ll use in the app:
```
prisma.project.findMany({ where: { ownerId } })
prisma.task.findMany({ where: { projectId, status } })
prisma.task.findMany({ where: { assignedToId }, include: { project, creator, assignedTo } })
prisma.task.findUnique({ where: { id }, include: { comments: { include: { author } }, creator, assignedTo, project } })
```

Mistakes to avoid
Don’t store relational data as JSON. Always declare foreign keys. Don’t denormalize by copying user fields into other tables. Use enums for multi-state fields rather than booleans.

Recap
We created a normalized, scalable schema with Prisma models, indexes, and a seed script. The schema enforces integrity and supports common app queries efficiently.

Next steps
Run the migration, seed the DB, open Prisma Studio, and start building API routes that use the Prisma Client.

Thanks — that’s Sprint 2.13.
