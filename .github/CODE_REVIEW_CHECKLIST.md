# Code Review Checklist

## 👀 How to Use This Checklist

When reviewing a Pull Request, go through each section and verify that the code meets our standards. Use ✅ and ❌ to track completion.

---

## 1️⃣ Code Quality & Style

### Linting & Formatting
- [ ] **ESLint passes** — No red squiggly lines in code
- [ ] **Prettier formatted** — Code is consistent and readable
- [ ] **No TypeScript errors** — Build completes without type errors
- [ ] **No console errors/warnings** — Application runs cleanly

### Code Practices
- [ ] **Code is readable** — Variable names are clear and meaningful
- [ ] **Comments explain "why"** — Not just paraphrasing the code
- [ ] **No unnecessary console.log()** — Removed all debug statements
- [ ] **DRY principle** — No significant code duplication
- [ ] **Single responsibility** — Functions do one thing well

---

## 2️⃣ Folder Structure & Naming Conventions

### Project Organization
- [ ] **Code follows folder structure**
  - [ ] Components in `src/components/`
  - [ ] Utilities in `src/lib/`
  - [ ] Pages/routes in `src/app/`
  - [ ] No random files in root directory

### Naming Conventions
- [ ] **File names are descriptive** — `UserCard.tsx`, not `Card1.tsx`
- [ ] **Consistent naming** — camelCase for functions, PascalCase for components
- [ ] **Variable names are clear** — `userEmail` not `email123`
- [ ] **No abbreviations** — Unless industry-standard (API, URL, etc.)
- [ ] **Branch name follows convention** — `feature/*`, `fix/*`, `chore/*`, `docs/*`

---

## 3️⃣ TypeScript & Type Safety

### Type Annotations
- [ ] **Types are properly annotated** — No implicit `any` types
- [ ] **Function parameters have types** — Clear what each parameter should be
- [ ] **Return types specified** — Functions declare what they return
- [ ] **Props typed correctly** — Component props use interfaces/types
- [ ] **No `any` types** — Avoid using `any` unless absolutely necessary

### Error Handling
- [ ] **Try-catch blocks present** — Where API calls/risky operations exist
- [ ] **Error messages are helpful** — Tell developers what went wrong
- [ ] **Null checks exist** — Guard against undefined values

---

## 4️⃣ Security & Sensitive Data

### Data Protection
- [ ] **No hardcoded secrets** — API keys, passwords not in code
- [ ] **No API keys in components** — Only in server code or `.env` files
- [ ] **Environment variables properly used**
  - [ ] Server secrets: `process.env.DATABASE_URL`
  - [ ] Client vars: `process.env.NEXT_PUBLIC_API_URL`
- [ ] **`.env.local` not committed** — `.gitignore` includes it
- [ ] **No sensitive logs** — Passwords/tokens not printed to console

### Data Validation
- [ ] **User input validated** — No direct use of unsanitized input
- [ ] **API responses validated** — Check type before using
- [ ] **SQL/database queries parameterized** — Protect against injection
- [ ] **File uploads validated** — Type and size checks

---

## 5️⃣ Functionality & Testing

### Feature Completeness
- [ ] **Feature works as intended** — Test locally before reviewing
- [ ] **Edge cases handled** — What if array is empty? User not found?
- [ ] **No broken links/routes** — Navigation works correctly
- [ ] **Mobile responsiveness** — Works on phone/tablet if UI changes

### Testing & Verification
- [ ] **Feature tested locally** — Reviewer ran `npm run dev` and verified
- [ ] **Existing features not broken** — No regression detected
- [ ] **Different browsers tested** — Chrome, Firefox, Safari (if possible)
- [ ] **Different screen sizes tested** — Desktop, tablet, mobile

---

## 6️⃣ Documentation & Clarity

### Code Documentation
- [ ] **Unclear code is commented** — Explains the "why"
- [ ] **Complex logic is explained** — Why this approach?
- [ ] **Type annotations serve as docs** — Clear intent from types

### Project Documentation
- [ ] **README updated if needed** — New setup steps documented
- [ ] **Folder README updated** — Instructions reflect changes
- [ ] **API documentation updated** — New endpoints documented
- [ ] **Breaking changes noted** — If behavior changed significantly

### Commit Messages
- [ ] **Messages are descriptive** — `git log` tells a story
- [ ] **Conventional format** — `feat:`, `fix:`, `chore:`, `docs:`
- [ ] **Lowercase and concise** — Not `ADDED NEW FEATURE`
- [ ] **No typos** — Spell-checked

---

## 7️⃣ Git & Version Control

### Branch & Commits
- [ ] **Commits are logical** — Each commit is a coherent change
- [ ] **No giant commits** — Changes are reasonably sized
- [ ] **Branch is up to date** — Merged with latest `main`
- [ ] **No merge conflicts** — All conflicts resolved

### PR Quality
- [ ] **PR is focused** — Solves one problem, not many
- [ ] **Scope is appropriate** — Not too big, not too small
- [ ] **Descriptive PR title** — Clear at a glance
- [ ] **Summary explains changes** — Why and what, not just how

---

## 8️⃣ Performance & Optimization

### Rendering & Efficiency
- [ ] **No N+1 queries** — Queries optimized
- [ ] **No unnecessary re-renders** — React components efficient
- [ ] **Dependencies of hooks are correct** — `useEffect`, `useMemo` dependencies
- [ ] **Images optimized** — Using `next/image` for Next.js
- [ ] **No hardcoded delays** — No `setTimeout()` without good reason

### Bundle Size
- [ ] **No large dependencies added** — Or justified in PR
- [ ] **Unused imports removed** — Clean import statements
- [ ] **Tree-shaking friendly** — Code structure allows optimization

---

## 9️⃣ Accessibility & Inclusivity

### Web Standards
- [ ] **Semantic HTML** — Using correct tags (`<button>`, not `<div>` for buttons)
- [ ] **Alt text on images** — Helps screen readers
- [ ] **ARIA labels present** — Custom components have proper labels
- [ ] **Keyboard navigation works** — Can tab through interactive elements
- [ ] **Color contrast sufficient** — Text readable for colorblind users

---

## 🔟 Team Standards

### Code Review Expectations
- [ ] **Changes match team standards** — Consistent with codebase
- [ ] **No style arguments** — ESLint/Prettier handle this
- [ ] **Constructive feedback** — Comments are kind and helpful
- [ ] **Questions asked respectfully** — Learning opportunity, not criticism
- [ ] **Acknowledge good work** — 👍 great solution, clever approach

### Communication
- [ ] **Reviewer is respectful** — Nice, professional tone
- [ ] **Author is responsive** — Engages with feedback
- [ ] **Both sides open to discussion** — Discuss better solutions
- [ ] **Approval given when ready** — Not withheld unnecessarily

---

## 📋 Review Summary Template

Use this when completing your review:

```
✅ Code Quality: [OK / Needs Work]
✅ Documentation: [OK / Needs Work]
✅ Testing: [OK / Needs Work]
✅ Security: [OK / Needs Work]
✅ Performance: [OK / Needs Work]

📝 Summary:
[Brief explanation of review findings]

🎯 Key Points:
- [Point 1]
- [Point 2]
- [Point 3]

✅ Verdict: [Approve / Request Changes / Comment]
```

---

## 🎓 Learning Resources

### Code Review Best Practices
- **Comment with kindness** — Assume good intent, ask questions
- **Teach, don't criticize** — Use reviews as learning opportunities
- **Be specific** — "This variable name is unclear, what about `userCount`?" instead of "Bad naming"
- **Give alternatives** — Suggest better approaches if you see them
- **Acknowledge constraints** — Understand time limits, complexity, skill levels

### Review Red Flags 🚩
These items require extra attention:
- Changes to authentication or security
- Database schema changes
- Core component modifications
- Environmental configuration changes
- Dependency updates

---

## 💡 Quick Checklist (Abbreviated)

For quick reviews, focus on:
1. ✅ **Does it work?** — Test locally
2. ✅ **Is it secure?** — No secrets exposed
3. ✅ **Is it readable?** — ESLint/Prettier pass
4. ✅ **Is it documented?** — Clear what it does
5. ✅ **Does it fit the project?** — Follows conventions

---

## 🔗 Related Documentation

- [Branch Naming Conventions](BRANCH_NAMING_CONVENTIONS.md)
- [Pull Request Template](pull_request_template.md)
- [Branch Protection Setup](BRANCH_PROTECTION_SETUP.md)

---

*Last updated: Sprint 2.11 — Team Branching & PR Workflow Setup*
