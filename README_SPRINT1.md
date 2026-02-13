# Sprint 1 — Project Initialization & Folder Structure

## Project Title
Vendorify (placeholder)

## Short description
A Next.js 13+ TypeScript starter project that demonstrates a scalable application layout, rendering strategies, and production-ready build configurations. This Sprint focuses on project initialization, a clean folder structure under `src/`, and documentation to support future development.

## Folder structure

```
src/
├── app/          # App Router routes & pages (feature routes live here)
├── components/   # Reusable UI components (UI primitives)
└── lib/          # Utilities, helpers, configs, api clients

public/
app/               # Current Next.js App Router entry (project root)
pages/              # Legacy pages directory (if used)
next.config.ts
package.json
README_SPRINT1.md   # Sprint 1 documentation (this file)

```

> Note: The repository currently includes `app/` at the project root for Next.js to run out-of-the-box. The `src/` folder introduced here is the recommended location for application source in future sprints — migrating the Next.js `app/` to `src/app` can be done when ready.

## Folder explanations
- `src/app/` — Feature routes and layout components that use the Next.js App Router. Place route folders (e.g., `src/app/dashboard`) and server/client components here.
- `src/components/` — Shared, presentational, and container components. Small, focused components live here (buttons, form inputs, headers, layout pieces). Use `ComponentName/` directories with `index.tsx`, `styles.module.css`, and `README.md` when a component has multiple files.
- `src/lib/` — Non-UI logic: API clients, helper functions, feature toggles, and configuration utilities. Keep pure functions and side-effect-free code here for easy unit testing.

## Naming conventions
- Files and folders
  - Components: `PascalCase` directories and `index.tsx` export (e.g., `src/components/NavBar/index.tsx`).
  - Hooks and utils: `camelCase` (e.g., `useAuth.ts`, `formatDate.ts`).
  - Page/route folders: `kebab-case` (e.g., `src/app/user-profile`)
- Exports
  - Prefer default exports for React components (`export default function Button() {}`)
  - Prefer named exports for utilities (`export function formatDate() {}`)
- CSS
  - Use module-scoped files: `Component.module.css` or Tailwind classes.

## Setup instructions

Prerequisites
- Node.js 20+ (LTS recommended)
- pnpm (recommended) or npm/yarn

Install

```bash
pnpm install
# or
npm install
```

Run locally

```bash
pnpm dev
# or
npm run dev
```

Build for production

```bash
pnpm build
pnpm start
# or
npm run build
npm run start
```

## Screenshot placeholder
Add a screenshot of the app running locally at `http://localhost:3000` here when available.

![screenshot placeholder](./public/screenshot-placeholder.png)

## Reflection

### Why this structure?
- Predictable locations (`src/components`, `src/lib`, `src/app`) reduce cognitive overhead and make it easy for new contributors to find code.
- Separating UI from logic improves testability and reusability.

### How it supports scalability
- The division encourages small, composable components and atomic utilities.
- It enables feature-driven grouping as the application grows (e.g., `src/features/*`).
- Encourages consistent patterns for routing (App Router), data fetching, and caching strategies.

### How it helps team collaboration
- Clear conventions accelerate onboarding: components follow the same file patterns.
- Easier code reviews: reviewers know where to look for UI vs business logic.
- Simplifies CI workflows and modular testing strategies.

---

Sprint 1 deliverables:
- `src/` scaffolding (`app/`, `components/`, `lib/`)
- `.gitignore` (project-level defaults)
- This `README_SPRINT1.md` with conventions and next steps
- PR template for consistent merge descriptions

If you want, I can:
- Move the root `app/` into `src/app/` (requires adapting `next.config` and verifying builds), or
- Create starter component and util examples under `src/components` and `src/lib`.

***

Prepared for university submission and future sprints.
