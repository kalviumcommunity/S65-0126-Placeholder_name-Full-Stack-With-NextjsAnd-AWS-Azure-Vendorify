This folder is the recommended location for App Router route folders and layouts when the project is organized under `src/`.

Notes:
- The repository currently contains `app/` at the project root for immediate Next.js compatibility.
- When ready to migrate, move the root `app/` to `src/app/` and update any tooling or CI that assumes root-level `app/`.

Suggested substructure:
- `src/app/layout.tsx` — application root layout (app-level providers, fonts)
- `src/app/page.tsx` — home route
- `src/app/(feature)/page.tsx` — feature routes

Keep route folders small and focused; prefer nested route folders for complex flows.
