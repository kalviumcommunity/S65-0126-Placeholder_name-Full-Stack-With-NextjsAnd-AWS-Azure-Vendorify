# Vendorify

## 📋 Project Overview

**Vendorify** is a Next.js 13+ TypeScript web application built with a clean, scalable folder structure. This project demonstrates modern web development best practices and serves as a foundation for future feature development.

**Problem Statement (Placeholder):**
A vendor management platform that helps businesses discover and connect with service providers, streamlining vendor relationships and improving business operations.

---

## 📁 Folder Structure

```
src/
├── app/          # Next.js App Router - pages and routes
├── components/   # Reusable React components
└── lib/          # Utilities, helpers, and configurations

public/          # Static assets (images, icons, etc.)
.gitignore       # Git exclusions
package.json     # Dependencies and scripts
tsconfig.json    # TypeScript configuration
next.config.ts   # Next.js configuration
```

---

## 📖 Folder Explanations

### `src/app/`
- Contains all your routes and page components
- Uses Next.js App Router for all pages
- Each folder represents a route (e.g., `src/app/dashboard/page.tsx` creates `/dashboard`)
- Place layouts, root templates, and page components here

### `src/components/`
- Stores reusable UI components
- Keep components small and focused (single responsibility)
- Examples: Button, Header, Card, Footer, Sidebar
- Each component should handle one specific task

### `src/lib/`
- Utility functions and helper code
- API client functions and configuration
- Pure functions for data formatting and validation
- Constants and configuration values
- Should contain no React components

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or later
- npm, yarn, pnpm, or bun package manager

### Installation

```bash
npm install
```

Or with yarn, pnpm, or bun:

```bash
yarn install
# or
pnpm install
# or
bun install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

The app will automatically reload when you make changes to your code.

### Build for Production

```bash
npm run build
npm start
```

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript compiler options |
| `package.json` | Project dependencies and scripts |
| `src/app/layout.tsx` | Root layout component |
| `src/app/page.tsx` | Home page |

---

## 💡 Why This Structure?

### ✅ Clarity
- Every file has a clear, predictable location
- New developers can find code quickly
- Clear separation between UI components, routes, and utilities
- Reduced cognitive load when navigating the codebase

### ✅ Scalability
- Easy to add new pages without disrupting existing code
- Reusable components reduce code duplication
- Utility functions are centralized and easy to maintain
- Structure supports growth without major reorganization

### ✅ Team Collaboration
- Consistent naming conventions reduce confusion
- Different team members can work on different folders independently
- Clear patterns make code reviews easier
- New team members can onboard faster

---

## 🔄 Future Sprints

This foundation is ready for:
- Adding API routes and backend logic
- Building complex UI components
- Implementing authentication and user accounts
- Adding state management (Context, Redux, Zustand)
- Setting up testing frameworks
- Building admin and user dashboards
- Deploying to production

---

## 📸 Screenshot

To view your application:

1. Run `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## ✨ Code Quality & Consistency

This project uses strict TypeScript, ESLint, Prettier, and pre-commit hooks to ensure clean, consistent code.

### Quick Start

```bash
# Install quality tools
npm install --save-dev eslint prettier eslint-config-next eslint-plugin-prettier eslint-config-prettier

# Set up pre-commit hooks
npx husky-init && npm install
npm install --save-dev lint-staged
npx husky add .husky/pre-commit "npx lint-staged"
```

### Available Commands

```bash
npm run lint       # Check code for issues
npm run lint:fix   # Auto-fix lint issues
npm run format     # Auto-format all files
```

### What's Configured

- **Strict TypeScript** — Catches type errors before runtime
- **ESLint** — Enforces code quality rules (double quotes, semicolons, no unused vars)
- **Prettier** — Auto-formats code consistently
- **Pre-commit hooks** — Blocks commits with style/type errors

See [README_SPRINT2_9.md](README_SPRINT2_9.md) for detailed explanation and [TYPESCRIPT_ESLINT_SETUP.md](TYPESCRIPT_ESLINT_SETUP.md) for testing guide.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API reference
- [React Documentation](https://react.dev) - React fundamentals and best practices
- [TypeScript Handbook](https://www.typescriptlang.org/docs) - TypeScript essentials
- [Web Development Best Practices](https://developer.mozilla.org/en-US/docs/Web) - MDN Web Docs

---




### **Architecture Overview**

| Page      | Route        | Strategy | Config                      | Use Case           | Deployment Impact |
| --------- | ------------ | -------- | --------------------------- | ------------------ | ----------------- |
| About     | `/about`     | **SSG**  | `revalidate = false`        | Static content     | Pre-built in Docker |
| Dashboard | `/dashboard` | **SSR**  | `dynamic = 'force-dynamic'` | Real-time data     | Server-side in ECS |
| Vendors   | `/vendors`   | **ISR**  | `revalidate = 60`           | Occasional updates | Cached in ECS |

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

### **Testing the Pages**

```bash
# Local development
pnpm dev
```

Then visit:
- http://localhost:3000/about (SSG)
- http://localhost:3000/dashboard (SSR - refresh to see time change)
- http://localhost:3000/vendors (ISR)

---

## 🐳 **Docker & Containerization**

### **Multi-Stage Docker Build**
The application uses an optimized multi-stage Docker build:

```dockerfile
# Development dependencies → Production build → Runtime image
Node.js 20 Alpine → Next.js standalone → Minimal production container
```

**Features:**
- ✅ Multi-stage build for minimal image size
- ✅ Non-root user for security
- ✅ Health checks with curl
- ✅ Optimized for Next.js standalone output
- ✅ Production-ready configuration

### **Local Docker Testing**
```bash
# Build the image
docker build -t vendorify-app .

# Run locally
docker run -p 3000:3000 vendorify-app
```

---

## ☁️ **AWS Infrastructure**

### **ECS Configuration**
- **Cluster:** `vendorify-cluster`
- **Service:** `vendorify-service` 
- **Task Definition:** `vendorify-task`
- **Resources:** 0.5 vCPU, 1GB Memory
- **Network:** VPC with Fargate launch type

### **Container Specifications**
- **Image:** `612812184105.dkr.ecr.us-east-1.amazonaws.com/vendorify-app:latest`
- **Port:** 3000 (HTTP)
- **Health Check:** HTTP endpoint monitoring
- **Logging:** CloudWatch Logs (`/ecs/vendorify-app`)
- **Environment:** Production configuration with NODE_ENV=production

### **CI/CD Pipeline**
**GitHub Actions workflow** (`.github/workflows/deploy.yml`):

**Triggers:** Push to `main` or `deploy` branches

**Steps:**
1. **Build & Test**
   - Install dependencies with pnpm
   - Run ESLint for code quality
   - Build Next.js application

2. **Deploy** (production branches only)
   - Configure AWS credentials
   - Login to Amazon ECR
   - Build and tag Docker image
   - Push to ECR registry
   - Update ECS task definition
   - Deploy new service revision
   - Wait for service stability

### **Required GitHub Secrets**
```bash
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
```

---

## 🔧 **Environment-Aware Builds & Secrets Management**

This project supports per-environment configuration files and safe secret injection at build/runtime.

### **Environment Files**
The following files are included with placeholder values only:
- `.env.development` - Local development variables
- `.env.staging` - Staging environment configuration  
- `.env.production` - Production environment configuration
- `.env.example` - Template of required variables

### **Build Commands**
```bash
pnpm build:staging     # Build with staging config
pnpm build:production  # Build with production config
```

### **Secrets Management in Production**
**🚨 No secrets committed to Git** - Real secrets are injected via:

**AWS Production:**
- **GitHub Actions:** Repository secrets for CI/CD
- **AWS Parameter Store:** Runtime secrets via ECS task definition
- **Environment Variables:** Injected at container startup

**Security Best Practices:**
- ✅ Secrets stored in AWS Parameter Store/Secrets Manager
- ✅ IAM roles for service-to-service authentication  
- ✅ No hardcoded credentials in code or Docker images
- ✅ Least-privilege access patterns

---

## 📚 **Learn More**

### **Next.js Resources**
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - feedback and contributions welcome!

### **AWS Resources**
- [ECS Documentation](https://docs.aws.amazon.com/ecs/) - container orchestration
- [Fargate Guide](https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html) - serverless containers
- [ECR Documentation](https://docs.aws.amazon.com/ecr/) - container registry

### **DevOps Resources**
- [GitHub Actions](https://docs.github.com/en/actions) - CI/CD automation
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/) - containerization guides

---

## 🚀 **Deployment Status**

**Current Environment:** Production  
**Last Deployed:** Automatic via GitHub Actions  
**Health Status:** Monitored via ECS health checks  
**Logs:** Available in CloudWatch (`/ecs/vendorify-app`)

**To deploy changes:**
1. Push to `main` or `deploy` branch
2. GitHub Actions automatically builds and deploys
3. ECS performs rolling deployment with zero downtime
4. Health checks ensure successful deployment

---

*Built with ❤️ using Next.js, Docker, and AWS ECS*

---

## Environment Variable Management

Purpose
- Use environment variables to keep configuration and secrets out of source code.

Server-side vs Client-side
- Server-side variables (example: `DATABASE_URL`) must never be exposed to the browser. They are available only to server code and should be set without the `NEXT_PUBLIC_` prefix.
- Client-side variables (example: `NEXT_PUBLIC_API_BASE_URL`) must be prefixed with `NEXT_PUBLIC_` so Next.js includes them in browser bundles.

Quick examples
- Safe server-side usage (server components, API routes, or server-only modules):

```ts
const dbUrl = process.env.DATABASE_URL;
```

- Safe client-side usage (client components or browser code):

```ts
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
```

Why keep server secrets out of client components
- Anything used in client components is included in the bundle and can be inspected by anyone. Server secrets must never be put into client code to avoid leaks and security breaches.

What happens if you forget `NEXT_PUBLIC_`
- If you omit the `NEXT_PUBLIC_` prefix for a client-facing variable, Next.js will not expose it to the browser. `process.env.VAR_NAME` will be `undefined` in client code.

Runtime vs Build-time
- Next.js loads `.env` files at build and at runtime (depending on hosting). Variables used in client bundles are baked in at build time. Keep this in mind if changing env values after deployment — you may need to rebuild.

How to replicate locally
1. Copy the template: `cp .env.example .env.local`
2. Edit `.env.local` and fill in real values (do not commit `.env.local`).

Security best practices (student-friendly)
- Never commit `.env.local` or real secrets to the repo.
- Use `.env.example` to document required variables without sharing secrets.
- For production, inject secrets via your hosting provider's secure environment settings.

Common mistakes to avoid
- Putting `DATABASE_URL` or other secrets in client components.
- Forgetting the `NEXT_PUBLIC_` prefix for variables you expect to use in the browser.
- Committing `.env.local` or other secret files to git (use `.gitignore`).

Validation checklist
- `.env.local` is not committed and remains listed in `.gitignore`.
- `.env.example` exists and documents required variables.
- Server-only secrets (like `DATABASE_URL`) are not used in client code.
- Client variables use the `NEXT_PUBLIC_` prefix when they must be available in the browser.

Short explanation
- Keep secrets on the server and public configuration in `NEXT_PUBLIC_` variables. Use `.env.example` to share what needs to be set, and keep `.env.local` out of source control.
