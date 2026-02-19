# Sprint 2.11 Quick Reference Guide

**Keep this handy!** A one-page reference for your team's GitHub workflow.

---

## 🚀 Quick Start: The 5-Step Workflow

```bash
# Step 1: Create feature branch
git checkout -b feature/your-feature-name

# Step 2: Work and commit
git add .
git commit -m "feat: your clear description"

# Step 3: Push to GitHub
git push origin feature/your-feature-name

# Step 4: Create PR on GitHub
# → Fill out template
# → Request review from teammate

# Step 5: After approval → Merge to main
# → Delete branch
```

---

## 📝 Branch Naming Cheat Sheet

**Match your work type to the correct prefix:**

| I'm... | Use This | Example |
|--------|----------|---------|
| Adding a feature | `feature/` | `feature/user-auth` |
| Fixing a bug | `fix/` | `fix/navbar-mobile` |
| Updating tools/deps | `chore/` | `chore/update-eslint` |
| Writing docs | `docs/` | `docs/api-guide` |

**Golden Rule:** `<type>/<lowercase-kebab-case>`

**Bad Names ❌** | **Good Names ✅**
---|---
`userAuth` | `feature/user-auth`
`fix_navbar` | `fix/navbar-responsive`
`stuff` | `feature/vendor-search`
`CHORE/UPDATE` | `chore/update-dependencies`

---

## 📋 PR Checklist (Before Requesting Review)

Copy this checklist into your PR description:

```
## ✅ Before Requesting Review

Code Quality:
- [ ] npm run lint → no errors
- [ ] npm run format → formatted
- [ ] npm run build → succeeds
- [ ] No console.log() left in code

Functionality:
- [ ] Works locally (npm run dev)
- [ ] No new console errors
- [ ] Didn't break other features

Structure & Security:
- [ ] Code in correct folder (components/, lib/, app/)
- [ ] No API keys or secrets exposed
- [ ] Naming is consistent
- [ ] Comments explain "why", not "what"

Git:
- [ ] Branch name follows convention
- [ ] Commits are descriptive
- [ ] No node_modules or .DS_Store committed
```

---

## 👀 Reviewer Checklist (Abbreviated)

**5-minute review focuses on:**

1. ✅ **Does it work?** Test locally
2. ✅ **Is it safe?** No secrets exposed?
3. ✅ **Is it readable?** ESLint/Prettier pass?
4. ✅ **Is it right?** Code quality acceptable?
5. ✅ **Is it clear?** Is documentation present?

**Then:** Click **Approve** or **Request changes**

---

## 🔐 Branch Protection: What It Means for You

**You CANNOT:**
- ❌ Push directly to `main`
- ❌ Merge without 1 approval
- ❌ Merge if tests fail

**What TO DO:**
- ✅ Create feature branch
- ✅ Create PR
- ✅ Request review
- ✅ Wait for approval + checks
- ✅ Merge

**If merge button is gray:**
- Check: Are all checks green? ✓
- Check: Do you have 1 approval? ✓
- Check: Is branch updated? (Click "Update branch")
- Then try merging again

---

## 📚 When You Need More Help

**Don't know what to do?**

| Question | See This |
|----------|----------|
| "What type of branch?" | [Branch Naming Conventions](.github/BRANCH_NAMING_CONVENTIONS.md) |
| "What goes in the PR?" | [PR Template](.github/pull_request_template.md) |
| "How do I review code?" | [Code Review Checklist](.github/CODE_REVIEW_CHECKLIST.md) |
| "Why is merge blocked?" | [Branch Protection Setup](.github/BRANCH_PROTECTION_SETUP.md) |
| "What screenshots to take?" | [Screenshot Guide](SPRINT2_11_SCREENSHOT_GUIDE.md) |
| "Full overview?" | [README Team Workflow](README.md#-team-workflow--pr-process) |

---

## 🚨 Common Problems & Solutions

### "Remote rejected: main is protected"
**Problem:** You tried to push directly to main  
**Solution:** Use a feature branch instead
```bash
git checkout -b feature/your-feature
git push origin feature/your-feature
# Then create PR on GitHub
```

---

### "Merge button is disabled"
**Problem:** You don't meet the requirements  
**Check:**
- [ ] All status checks passing (green ✓)
- [ ] At least 1 team member approved
- [ ] Branch is up to date (click "Update branch")

---

### "I pushed by mistake to main"
**Solution:** Revert the commit
```bash
git revert <commit-hash>
git push origin main
```
Or ask an admin to revert.

---

### "Branch is out of date"
**Problem:** New changes were added to main after you started  
**Solution:**
1. GitHub shows: "This branch is out of date"
2. Click "Update branch" button
3. Then merge normally

Or manually:
```bash
git fetch origin
git merge origin/main
git push origin feature/your-branch
```

---

### "My code has lint errors"
**Problem:** PR failed GitHub Actions check  
**Solution:**
```bash
npm run lint:fix    # Auto-fix most issues
npm run format      # Format with Prettier
git add .
git commit -m "fix: resolve linting issues"
git push origin feature/your-branch
```
Check will re-run automatically.

---

## 💬 Review Feedback Tips

### As a Reviewer — Be Kind! 👍
```
❌ Bad: "This code is bad"
✅ Good: "I think we could improve readability here. What about extracting this function?"

❌ Bad: "Wrong!"
✅ Good: "Let me suggest an alternative approach..."

❌ Bad: "Dumb variable name"
✅ Good: "What about renaming to make it clearer?"
```

### As an Author — Stay Open 🤝
```
❌ Bad: "This is how it has to be"
✅ Good: "That's a great suggestion! Let me update..."

❌ Bad: No response to feedback
✅ Good: "Got it, updating now" or "Can you explain why?"

❌ Bad: Taking criticism personally
✅ Good: "Thanks for catching that!"
```

---

## ⚡ Speed Tips

### Faster Pull Requests:
1. **Smaller PRs merge faster** → 1 feature per PR, not 5
2. **Clear descriptions** → Reviewers understand immediately
3. **Well-tested** → Less back-and-forth
4. **Early feedback** → Ask in Discord before long work

### Faster Reviews:
1. **Check for secrets first** (security is critical)
2. **Run the code locally** (takes 2 minutes)
3. **Look for patterns** (is it like other code?)
4. **Be constructive** (help them improve)
5. **Approve when ready** (don't delay)

---

## 📊 Metrics to Track

**Your team's workflow health:**

| Metric | Good | Target |
|--------|------|--------|
| Avg PR size | <5 files | Small & focused |
| Avg review time | <24 hours | Fast feedback |
| Approvals per PR | 1-2 | Quality > speed |
| Merge conflicts | <1 per week | Good branch strategy |
| Failed checks | <5% of PRs | Code quality high |

---

## 🎓 What Real Teams Do

**This workflow is used by:**
- ✅ Professional software teams
- ✅ Open-source projects
- ✅ Fortune 500 companies
- ✅ Startups
- ✅ GitHub itself!

**You're learning real practices**, not student fantasy.

---

## 🎬 Full Workflow Video Script

**If you want to practice, here's the scenario:**

```
Time 0:00 — Create feature branch
$ git checkout -b feature/search-filter
"I'm creating a feature branch to add search filtering"

Time 0:30 — Make some code changes
[Show editing src/components/SearchFilter.tsx]
"I'm building the component"

Time 1:00 — Commit and push
$ git add .
$ git commit -m "feat: add search filter component"
$ git push origin feature/search-filter
"Pushing my changes to GitHub"

Time 1:30 — Create PR on GitHub
[Show PR creation page with template]
"Creating a Pull Request with full description"

Time 2:00 — Request review
[Show selecting reviewer]
"Asking my teammate to review the code"

Time 2:30 — Code review feedback
[Show comment with suggestion]
"My reviewer suggests an improvement"

Time 3:00 — Make changes based on feedback
$ git add .
$ git commit -m "refactor: improve performance"
$ git push origin feature/search-filter
"I updated the code based on feedback"

Time 3:30 — Get approval
[Show Approve button and checkbox]
"Great! My teammate approved the PR"

Time 4:00 — Merge to main
[Show Merge button and success message]
"Merging my feature to main"

Time 4:30 — Verify in main
$ git checkout main
$ git pull origin main
"Now the feature is live in main!"
```

---

## 🏆 Before You Submit Sprint 2.11

**Checklist:**

- [ ] **All 6 documentation files created**
  - [ ] BRANCH_NAMING_CONVENTIONS.md
  - [ ] pull_request_template.md (updated)
  - [ ] CODE_REVIEW_CHECKLIST.md
  - [ ] BRANCH_PROTECTION_SETUP.md
  - [ ] Team Workflow section in README
  - [ ] SPRINT2_11_SCREENSHOT_GUIDE.md

- [ ] **Branch protection set up on `main`**
  - [ ] Require PR review
  - [ ] Require passing checks
  - [ ] Tested and working

- [ ] **Team tested the workflow**
  - [ ] Created a practice PR
  - [ ] Requested review
  - [ ] Made a commit with feedback
  - [ ] Merged successfully

- [ ] **Screenshots captured** (at least 5):
  - [ ] Branch list
  - [ ] PR created
  - [ ] PR checklist
  - [ ] Approval
  - [ ] Protection settings

- [ ] **Everything committed to GitHub**
  - [ ] Created final sprint PR
  - [ ] Described what was completed
  - [ ] Merged to main

---

## 🎯 Summary

**You now have:**
- ✅ Professional branch naming
- ✅ Clear PR expectations
- ✅ Structured code reviews
- ✅ Protected main branch
- ✅ Complete documentation
- ✅ Team collaboration process

**Estimated setup time:** 2-3 hours  
**Ongoing effort:** Minutes per PR  
**Value:** Professional practices, safety, quality  

---

## 📞 Need Help?

**Ask in Discord:**
- "How do I name my branch?"
- "What goes in the PR?"
- "Why is my merge blocked?"
- "How do I review code?"

**Or check the detailed guide:**
- [Team Workflow & PR Process](README.md#-team-workflow--pr-process)
- [All Documentation Files](.github/)

---

**Print this page or bookmark it! 📌**

🚀 You're ready to develop like a pro team!

---

*Sprint 2.11 — Team Branching & PR Workflow Setup*  
*Quick Reference Guide for Vendorify Team*  
*February 2026*
