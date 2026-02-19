# Branch Naming Conventions

## Overview

Consistent branch naming makes our workflow more professional, improves collaboration, and makes the repository easier to navigate. Every team member should follow these conventions.

---

## 📋 Branch Types & Naming Format

### 1. **Feature Branches** — `feature/<feature-name>`
New functionality, UI components, or major improvements.

**Format:**
```
feature/<what-you-are-building>
```

**Examples:**
```
feature/user-authentication
feature/vendor-dashboard
feature/api-integration
feature/search-functionality
feature/email-notifications
feature/user-profile-page
feature/payment-gateway
```

**When to use:**
- Adding new pages
- Building new components
- Implementing new APIs
- Adding new features to existing pages

---

### 2. **Bug Fix Branches** — `fix/<bug-name>`
Fixing bugs, typos, and broken functionality.

**Format:**
```
fix/<what-is-broken>
```

**Examples:**
```
fix/navbar-responsive-layout
fix/button-click-handler
fix/console-errors-dashboard
fix/null-pointer-exception
fix/form-validation-error
fix/logout-redirect
fix/environment-variable-loading
```

**When to use:**
- Fixing broken features
- Resolving runtime errors
- Fixing styling issues
- Fixing broken links or routes

---

### 3. **Chore Branches** — `chore/<task-name>`
Maintenance, dependencies, tooling, and configuration updates (no user-facing changes).

**Format:**
```
chore/<what-is-being-maintained>
```

**Examples:**
```
chore/update-dependencies
chore/upgrade-typescript
chore/improve-linting-config
chore/add-husky-hooks
chore/update-eslint-rules
chore/configure-prettier
chore/update-package-json
chore/docker-optimization
```

**When to use:**
- Updating npm packages
- Changing configuration files
- Improving build setup
- Updating CI/CD workflows
- Adding development tools

---

### 4. **Documentation Branches** — `docs/<doc-name>`
README updates, guides, comments, and documentation improvements.

**Format:**
```
docs/<what-documentation-is-updated>
```

**Examples:**
```
docs/readme-setup-instructions
docs/api-documentation
docs/folder-structure-guide
docs/team-workflow-guidelines
docs/deployment-guide
docs/testing-documentation
docs/code-review-standards
```

**When to use:**
- Updating README.md
- Adding code comments
- Creating guides
- Improving existing documentation
- Adding deployment instructions

---

## ✅ Naming Rules

### Do's ✅
- Use **lowercase** for all branch names
- Use **hyphens** `-` to separate words (not underscores or spaces)
- Keep branch names **concise but descriptive** (30-50 characters ideal)
- Use **present tense** (e.g., `add-modal` not `added-modal`)
- Reference **issue numbers** if applicable: `feature/add-user-auth-#42`

### Don'ts ❌
- ❌ Don't use spaces: `feature/user profile` → `feature/user-profile`
- ❌ Don't use uppercase: `Feature/UserAuth` → `feature/user-auth`
- ❌ Don't use special characters: `feature/user@auth` → `feature/user-auth`
- ❌ Don't be vague: `feature/stuff` → `feature/vendor-dashboard`
- ❌ Don't commit directly to `main` or `develop`

---

## 🔄 Branch Workflow Example

### Scenario: You're building a vendor search feature

**1. Create your branch:**
```bash
git checkout -b feature/vendor-search
```

**2. Work on your feature:**
```bash
git add .
git commit -m "feat: add vendor search filter"
git commit -m "refactor: improve search performance"
git push origin feature/vendor-search
```

**3. Create a Pull Request** (GitHub will auto-populate branch name)

**4. After review and approval:**
```bash
# GitHub merges your PR automatically
# Your branch is deleted
```

**5. Clean up locally:**
```bash
git checkout main
git pull origin main
git branch -d feature/vendor-search
```

---

## 🎯 Why Consistent Naming Matters

### 1. **Clarity** 🎯
- Team members instantly understand what each branch does
- No confusion about purpose or scope
- Easier to find specific work in branch history

### 2. **Collaboration** 👥
- Multiple team members can work on different areas simultaneously
- Clear naming prevents merge conflicts
- Easy to review who did what

### 3. **Automation** 🤖
- Branch names can trigger automated workflows
- Release tools can categorize changes by branch type
- Code review checklists can be auto-applied

### 4. **Maintainability** 🔧
- Git history is self-documenting
- New team members onboard faster
- Easy to track feature development over time

### 5. **Code Review** 👀
- Reviewers know immediately if a PR adds features or fixes bugs
- Easier to spot scope creep (e.g., fixes mixed with features)
- Clearer expectations for testing

---

## 📊 Branch Naming at a Glance

| Branch Type | Purpose | Example |
|-------------|---------|---------|
| `feature/*` | New functionality | `feature/user-authentication` |
| `fix/*` | Bug fixes | `fix/navbar-responsive-layout` |
| `chore/*` | Maintenance & tooling | `chore/update-dependencies` |
| `docs/*` | Documentation updates | `docs/readme-setup` |

---

## 🚀 Protected Branches

The following branches are **protected** and require:
- ✅ At least 1 code review approval
- ✅ All automated checks to pass (lint, build)
- ✅ Branch is up to date with `main`
- ❌ No direct commits allowed

**Protected branches:**
- `main` — Production-ready code only
- `develop` — Integration branch (if using)

---

## 💡 Quick Reference

```bash
# Create a feature branch
git checkout -b feature/new-feature-name

# Create a fix branch
git checkout -b fix/bug-to-fix

# Create a chore branch
git checkout -b chore/maintenance-task

# Create a docs branch
git checkout -b docs/update-name

# Push to remote
git push origin <branch-name>

# Delete branch locally
git branch -d <branch-name>

# Delete branch remotely
git push origin --delete <branch-name>
```

---

## 🔗 Related Documentation

- [Pull Request Guidelines](.github/pull_request_template.md)
- [Code Review Checklist](CODE_REVIEW_CHECKLIST.md)
- [Branch Protection Setup](BRANCH_PROTECTION_SETUP.md)

---

*Last updated: Sprint 2.11 — Team Branching & PR Workflow Setup*
