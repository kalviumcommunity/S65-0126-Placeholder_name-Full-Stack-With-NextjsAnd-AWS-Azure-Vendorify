
"Hello — this is my Sprint 2.10 work: Environment Variable Management for a Next.js 13+ project using TypeScript and the App Router. The goal was to provide a simple, secure, and student-friendly way to manage configuration and secrets for local development and to document the pattern for teammates."

---

## 2. Problem Statement (20–30s)

"Why this matters: applications need configuration values (like API base URLs) and secrets (like database connection strings). If secrets are stored in source control or accidentally used in client code, they can be leaked. New contributors also need a clear template so they know what to set up locally."

---

## 3. What I Implemented (30–45s)

"I implemented a minimal, secure setup compatible with Next.js 13+:

- A local development file: ` .env.local` (contains real local values — do NOT commit).
- A committed template: ` .env.example` (placeholder values and comments explaining each variable).
- An updated `.gitignore` pattern to ignore all env files while allowing ` .env.example` to be committed.
- Documentation added to `README.md` explaining safe usage, runtime vs build-time behavior, and best practices."

---

## 4. Files & Purpose (30s)

"Quick file breakdown:

- ` .env.local` — Local-only values (example: `DATABASE_URL` and `NEXT_PUBLIC_API_BASE_URL`).
- ` .env.example` — Template with placeholders and comments describing whether each variable is server-only or public.
- `.gitignore` — Pattern:

```
.env*
!.env.example
```

This makes sure all `.env` files are ignored, except the template."

---

## 5. Safe Usage Examples (30–40s)

"Key code examples to show safe usage:

- Server-side (safe):

```ts
// server-only module
const dbUrl = process.env.DATABASE_URL;
```

- Client-side (safe):

```ts
// client component
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
```

- Unsafe (do not do):

```ts
// ❌ Never put this in a client component
const dbUrl = process.env.DATABASE_URL; // exposes secret
```

Explain verbally: `NEXT_PUBLIC_` prefix is required for variables that must be included in the browser bundle; without it, those variables are undefined in client code."

---

## 6. Runtime vs Build-time (20–30s)

"Short note: Next.js reads `.env` files at build and at runtime depending on hosting. Client variables are baked into bundles at build-time, so changing a client env after deployment typically requires a rebuild. Server variables can often be injected at runtime by the host."

---

## 7. Security Best Practices (20–30s)

"Main rules:
- Never commit ` .env.local` or other real secret files.
- Commit ` .env.example` to document required variables.
- Only use `NEXT_PUBLIC_` for values safe to expose to the browser.
- For production, inject secrets through the hosting provider (do not store them in the repository)."

---

## 8. Quick Demo Steps (20–30s)

"To validate locally:
1. Copy the template: `cp .env.example .env.local` and fill real values.
2. Run `npm run dev` and confirm no env-related errors.
3. Check `git status` — ` .env.local` should be ignored while ` .env.example` is tracked."

---

## 9. Common Pitfalls & How I Prevented Them (20s)

"Common mistakes include committing secrets, forgetting `NEXT_PUBLIC_` for client variables, and using server secrets in client code. My changes prevent these by:
- Ignoring `.env*` by default
- Providing a clear ` .env.example` with comments
- Documenting safe patterns in the `README.md`"

---

## 10. Closing (10–15s)

"In short: Sprint 2.10 delivers a simple, secure environment variable pattern for Next.js 13+ that’s easy for students to follow and keeps secrets out of source control. I’m ready to demo any part or answer questions. Thank you."

---

## Q&A Prompts (for follow-up)

- "Why the `NEXT_PUBLIC_` prefix?" — "It signals Next.js to include the variable in client bundles; without it the value is server-only and `undefined` in browser code."
- "What if I accidentally commit a secret?" — "Rotate the secret immediately and remove it from history; use `.gitignore` to avoid future commits."
- "Do we need dotenv or extra libraries?" — "No — Next.js already supports `.env` files for this use case."

---

*End of script.*
