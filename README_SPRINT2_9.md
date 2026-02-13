# Sprint 2.9: TypeScript & ESLint Configuration

## 📋 Overview

This sprint brings code quality and consistency to the project through strict TypeScript configuration, ESLint rules, Prettier formatting, and automated pre-commit hooks. The goal is to catch bugs early and ensure the entire team writes clean, consistent code.

---

## 🎯 Why This Matters

### Strict TypeScript (`strict: true`)

**The Problem:** Without strict TypeScript, you can accidentally write:
```typescript
function greet(name) {  // ❌ Implicit 'any' type
  return "Hello " + name;
}

let age;  // ❌ Unused variable
age = 25;

const result = undefined.toString();  // ❌ Crashes at runtime
```

**The Solution:** Strict mode catches these **before** they become runtime bugs:
- `noImplicitAny: true` — Forces you to declare types explicitly
- `noUnusedLocals: true` — Catches dead code
- `noUnusedParameters: true` — Prevents forgotten function parameters

This saves debugging time and prevents production errors.

### ESLint Rules

**Consistency Rules:**
- `semi: error` — Always use semicolons
- `quotes: error` — Always use double quotes

**Best Practices:**
- `no-console: warn` — Warns when you leave `console.log()` in code
- React hooks rules — Prevents infinite loops and dependency issues

Why? Consistency makes code reviews faster and prevents silly mistakes.

### Prettier Auto-Formatting

**Before Prettier:**
```typescript
const config = {name:"John",age:30,email:"john@example.com"}
```

**After Prettier:**
```typescript
const config = {
  name: "John",
  age: 30,
  email: "john@example.com",
};
```

No arguments about spacing, indentation, or trailing commas — Prettier decides automatically.

### Pre-Commit Hooks

**Without hooks:** Bad code gets committed → Code reviews → Fix in PR → More commits  
**With hooks:** Bad code is blocked at commit time → Fix locally → Commit succeeds

Example:
```bash
git commit -m "add user feature"
# ❌ ESLint error: Unexpected string format. Use double quotes instead.
# Commit aborted.

# Fix the issue
npm run lint:fix

# Try again
git commit -m "add user feature"
# ✅ All checks passed
```

This means your main branch always has clean code — no surprises in reviews.

---

## ✅ What's Configured

### TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### ESLint (`.eslintrc.json`)
- Enforces double quotes, semicolons
- Warns on console statements
- Extends Next.js best practices

### Prettier (`.prettierrc`)
- 2-space indentation
- Double quotes, trailing commas
- Line width of 80 characters

### Husky + lint-staged
- Runs ESLint and Prettier before each commit
- Only checks staged files (fast)
- Blocks commits if issues are found

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install --save-dev eslint prettier eslint-config-next eslint-plugin-prettier eslint-config-prettier
```

### 2. Set Up Pre-Commit Hooks
```bash
npx husky-init && npm install
npm install --save-dev lint-staged
npx husky add .husky/pre-commit "npx lint-staged"
```

### 3. Try the Lint Commands
```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
npm run format        # Format all files
```

---

## 🧪 Testing the Setup

See `TYPESCRIPT_ESLINT_SETUP.md` for detailed testing instructions. Quick version:

1. Create a file with a lint violation:
   ```bash
   echo "const x = 'single quotes'" > test.ts
   ```

2. Try to commit:
   ```bash
   git add test.ts
   git commit -m "test"
   # ❌ Fails due to quotes rule
   ```

3. Fix and commit:
   ```bash
   npm run lint:fix
   git add test.ts
   git commit -m "fix: correct quotes"
   # ✅ Succeeds
   ```

---

## 📊 How It Improves Team Collaboration

| Without Strict Config | With Strict Config |
|---|---|
| Type errors found in code review | Type errors found before commit |
| Inconsistent formatting | Automatically formatted |
| Unused variables slip through | Caught by linter |
| Everyone formats differently | Prettier enforces one style |
| Bad PRs need multiple rounds | PRs are clean on first submission |

---

## 🔧 Available Commands

```bash
npm run lint           # Check for lint issues
npm run lint:fix       # Auto-fix lint issues
npm run format         # Auto-format with Prettier
npm run dev            # Start dev server
npm run build          # Build for production
```

---

## 📁 Configuration Files

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript strict settings |
| `.eslintrc.json` | ESLint rules and extensions |
| `.prettierrc` | Prettier formatting rules |
| `.husky/pre-commit` | Git hook that runs linters before commit |
| `package.json` | lint-staged config and scripts |

---

## ⚡ Why This Setup Works

1. **TypeScript catches type errors** → Fewer runtime bugs
2. **ESLint catches style/logic issues** → Code quality is consistent
3. **Prettier removes formatting debates** → Everyone's code looks the same
4. **Husky blocks bad commits** → Main branch stays clean
5. **lint-staged runs fast** → Only checks changed files

Result: Your team can focus on features instead of fixing formatting and type errors.

---

## 🚫 Common Issues & Solutions

**Q: My commit is blocked by ESLint**
```bash
npm run lint:fix    # Auto-fix the issue
git add .
git commit -m "message"  # Try again
```

**Q: Husky hook not running?**
```bash
npx husky install   # Reinstall hooks
```

**Q: I want to skip checks temporarily**
```bash
git commit --no-verify -m "message"  # Bypass (not recommended)
```

---

## 📚 Learn More

- [TypeScript Handbook](https://www.typescriptlang.org/docs/) — Strict mode
- [ESLint Documentation](https://eslint.org/docs/) — Rules and configuration
- [Prettier Documentation](https://prettier.io/docs/) — Code formatting
- [Husky](https://typicode.github.io/husky/) — Git hooks

---

## 🎬 Next Steps

- ✅ Run `npm run lint` to check your code
- ✅ Use `npm run lint:fix` before committing
- ✅ All future commits will be blocked if they fail checks
- ✅ No more formatting debates in code reviews!

Welcome to a stricter, cleaner codebase. 🎉
