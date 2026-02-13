# Sprint 2.9: TypeScript & ESLint Configuration Setup Guide

## 🚀 Quick Setup Steps

### 1. Install Dependencies

```bash
npm install --save-dev eslint prettier eslint-config-next eslint-plugin-prettier eslint-config-prettier
```

This installs:
- **eslint** — Code quality and best practices
- **prettier** — Auto-formatting
- **eslint-config-next** — Next.js recommended rules
- **eslint-plugin-prettier** — ESLint integration with Prettier
- **eslint-config-prettier** — Disables conflicting ESLint rules

### 2. Install Husky + lint-staged

```bash
npx husky-init && npm install
npm install --save-dev lint-staged
```

This sets up:
- **Husky** — Git hooks manager
- **lint-staged** — Run linters only on staged files

### 3. Create Pre-Commit Hook

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

This creates `.husky/pre-commit` that runs linters before each commit.

---

## ✅ What Was Configured

### TypeScript (`tsconfig.json`)
- `strict: true` — Enables all strict type checks
- `noImplicitAny: true` — Rejects implicit `any` types
- `noUnusedLocals: true` — Detects unused variables
- `noUnusedParameters: true` — Detects unused function parameters
- `forceConsistentCasingInFileNames: true` — Enforces consistent file naming

### ESLint (`.eslintrc.json`)
- Extends `next/core-web-vitals` — Next.js best practices
- Extends `plugin:prettier/recommended` — Prettier integration
- `no-console: warn` — Warns on console statements
- `semi: error` — Enforces semicolons
- `quotes: error` — Enforces double quotes
- React hooks rules enabled

### Prettier (`.prettierrc`)
- `singleQuote: false` — Uses double quotes
- `semi: true` — Adds semicolons
- `tabWidth: 2` — 2-space indentation
- `trailingComma: "es5"` — Trailing commas where valid in ES5

### lint-staged (in `package.json`)
```json
"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```

---

## 🧪 Testing the Setup

### Test 1: Run ESLint Manually

```bash
npm run lint
```

This checks all files for style and type issues.

### Test 2: Fix Issues Automatically

```bash
npm run lint:fix
npm run format
```

These auto-fix formatting and some lint issues.

### Test 3: Test Pre-Commit Hook

Follow these steps to intentionally break a rule and see it fail:

1. **Create a test file with a lint violation:**

```bash
echo "const x = 'single quotes'" > test-violation.ts
```

2. **Stage the file:**

```bash
git add test-violation.ts
```

3. **Try to commit (it should fail):**

```bash
git commit -m "test: intentional lint violation"
```

**Expected output:**
```
husky - Linting before commit...
Prettier (prettier/prettier) ...
✖ ESLint error: Unexpected string format. Use double quotes instead.
Commit aborted.
```

4. **Fix the violation:**

Run the auto-fix:

```bash
npm run lint:fix
```

Or manually edit `test-violation.ts` to use double quotes:

```typescript
const x = "double quotes";
```

5. **Stage and commit again:**

```bash
git add test-violation.ts
git commit -m "fix: resolve lint violation"
```

**Expected output:**
```
husky - Linting before commit...
✔ All checks passed
[branch-name abc1234] fix: resolve lint violation
 1 file changed, 1 insertion(+)
```

6. **Clean up the test file:**

```bash
git rm test-violation.ts
git commit -m "chore: remove test file"
```

---

## 📋 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run lint` | Check all files for lint issues |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Auto-format all files |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |

---

## 🔍 Configuration Files

- `tsconfig.json` — TypeScript compilation settings
- `.eslintrc.json` — ESLint rules
- `.prettierrc` — Prettier formatting rules
- `.husky/pre-commit` — Git hook that runs before commits
- `package.json` — Includes lint-staged and script definitions

---

## ⚠️ Troubleshooting

### Husky not running pre-commit checks?
```bash
# Check hook file exists
ls -la .husky/pre-commit

# Re-install Husky
npx husky install
```

### ESLint/Prettier conflicts?
Our config already resolves this:
- `eslint-config-prettier` disables conflicting ESLint rules
- `plugin:prettier/recommended` ensures they work together

### Want to skip pre-commit checks temporarily?
```bash
# Use --no-verify to bypass hooks (not recommended)
git commit --no-verify -m "message"
```

---

## 🎯 Next Steps

All checks are now automated! Your team will:
- ✅ Never commit code with type errors
- ✅ Never commit code with linting issues
- ✅ Always have consistently formatted code
- ✅ Catch unused variables and console statements

No more "fix formatting in review" comments!
