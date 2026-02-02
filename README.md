This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 2.3 Advanced Data Fetching and Rendering Strategies

This project demonstrates three core rendering strategies in Next.js 14+ using the App Router.

### Overview

| Page      | Route        | Strategy | Config                      | Use Case           |
| --------- | ------------ | -------- | --------------------------- | ------------------ |
| About     | `/about`     | **SSG**  | `revalidate = false`        | Static content     |
| Dashboard | `/dashboard` | **SSR**  | `dynamic = 'force-dynamic'` | Real-time data     |
| Vendors   | `/vendors`   | **ISR**  | `revalidate = 60`           | Occasional updates |

### 1. Static Rendering (SSG) - `/about`

**What:** Page is pre-built at deployment and served identically to all users.

**Why chosen for Vendorify:** The About page contains company info that rarely changes. SSG provides:

- Instant load times (no server computation)
- Zero server load per request
- Maximum CDN efficiency

**When data is fetched:** At build time (`next build`), before deployment.

### 2. Dynamic Rendering (SSR) - `/dashboard`

**What:** Page is rendered fresh on every request with real-time data.

**Why chosen for Vendorify:** The Dashboard shows user-specific, time-sensitive data. SSR ensures:

- Every user sees current data
- No stale information
- Personalization is possible

**When data is fetched:** On every request (server-side).

**Trade-off:** Slightly slower response time, but guaranteed freshness.

### 3. Hybrid Rendering (ISR) - `/vendors`

**What:** Page is cached and served instantly, but re-rendered in the background every N seconds.

**Why chosen for Vendorify:** The Vendor list updates occasionally but doesn't need real-time accuracy. ISR provides:

- Fast cached responses (like SSG)
- Automatic background updates (like SSR)
- Best of both worlds

**When data is fetched:**

- First request: at build time
- Subsequent: from cache
- Every 60s: background revalidation

### How Caching/Revalidation Improves Performance

| Strategy | Server Load             | Response Time | Data Freshness  |
| -------- | ----------------------- | ------------- | --------------- |
| SSG      | ~0                      | <10ms         | Build time only |
| SSR      | High (1 req = 1 render) | 50-200ms      | Always fresh    |
| ISR      | Low (1 render/60s)      | <10ms         | 60s stale max   |

### Scaling to 10x More Users

**SSR (Dashboard):**

- 10,000 users = 10,000 server renders/second
- Would need horizontal scaling, load balancing
- Database connection pooling required
- Consider moving non-critical data to ISR

**ISR (Vendors):**

- Still only ~1 render per 60 seconds
- 99.98% reduction in server load vs SSR
- Cache layer handles traffic spikes
- Ideal for scaling

**SSG (About):**

- No change needed—static files scale infinitely
- CDN handles all traffic

### Testing the Pages

```bash
pnpm dev
```

Then visit:

- http://localhost:3000/about (SSG)
- http://localhost:3000/dashboard (SSR - refresh to see time change)
- http://localhost:3000/vendors (ISR)

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Environment-Aware Builds & Secrets Management

This project supports per-environment configuration files and safe secret injection at build/runtime.

### Environment Files

The following files are included with placeholder values only:

- .env.development
- .env.staging
- .env.production
- .env.example (template of required variables)

Next.js automatically loads .env.development for local development. For staging and production builds, use the dedicated scripts below.

### Build Commands

- npm run build:staging
- npm run build:production

### External Secrets (No Secrets in Git)

Do not commit real secrets. Instead, inject them via your existing CI/CD:

- GitHub Actions: use repository or environment secrets and pass them as environment variables during build/deploy.
- AWS Parameter Store: pull parameters at build/runtime and export to the process environment.
- Azure Key Vault: retrieve secrets in pipeline steps or at runtime and export to the process environment.

Only the placeholder files are stored in the repo. Real secrets are loaded from your secret manager during build or runtime.
