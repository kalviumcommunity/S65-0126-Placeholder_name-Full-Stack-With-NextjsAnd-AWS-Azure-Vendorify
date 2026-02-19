# Branch Protection Setup Guide

## 📌 Overview

Branch protection rules ensure code quality and prevent accidental changes to critical branches like `main`. This guide shows how to set up GitHub's built-in branch protection features.

---

## 🔒 What We're Protecting

We'll configure protection rules for:

- **`main`** — Production-ready code only
- **`develop`** — Integration branch (optional)

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Open Repository Settings

1. Go to your GitHub repository: `github.com/your-username/amogas`
2. Click **Settings** (top menu)
3. Click **Branches** (left sidebar)

**Path:** Settings → Branches

---

### Step 2: Add Branch Protection Rule

1. Click **Add rule** (green button)
2. Enter branch name pattern: `main`
3. You'll see configuration options below

**Pattern name field:** Type `main`

---

### Step 3: Configure Protection Rules

Check the following options (in order):

#### ✅ **Require a pull request before merging**
- [ ] Require at least **1 approving review**
- [ ] **Dismiss stale pull request approvals when new commits are pushed**
  - *(When someone updates the PR, reviewers should re-review)*

**What it does:** No one can push directly to `main`. All changes must go through PRs.

**Why:** Ensures code review before production changes.

---

#### ✅ **Require status checks to pass before merging**
- [ ] **Require branches to be up to date before merging**
- [ ] Select **GitHub Actions** or checks that apply to your project

*Note: If you haven't set up GitHub Actions yet, you can skip status checks for now and add them later.*

**What it does:** PRs must pass all automated tests and checks.

**Why:** Prevents broken code from reaching main.

---

#### ✅ **Require code reviews**
- [ ] **Require approvals:** 1 (student team size)
- [ ] **Require review from Code Owners** (optional - set up in later sprint)
- [ ] **Dismiss stale pull request approvals when new commits are pushed**

**What it does:** At least 1 team member must approve before merge.

**Why:** Two sets of eyes catch mistakes.

---

#### ✅ **Restrictions on who can push to matching branches**
- [ ] **Restrict who can push to matching branches**
- [ ] Add team members or specific users who can bypass these rules

*For student projects, keep this unchecked to allow all team members to contribute.*

---

#### ✅ **Require branches to be up to date before merging**
- [ ] Enable this option

**What it does:** PR must be updated with latest `main` before merging.

**Why:** Prevents missed conflicts and ensures all code is tested together.

---

#### ❌ Don't Check (Advanced Features)

The following are advanced and not needed for student projects:

- ❌ Require commits be signed
- ❌ Require conversation resolution before merging
- ❌ Require deployments to succeed before merging
- ❌ Require status checks from external services

---

### Step 4: Save Configuration

1. Scroll to **bottom** of page
2. Click **Create** (green button)

---

## ✅ Final Checklist

After setting up, verify:

- [ ] Rule applies to `main` branch
- [ ] At least 1 review required before merge
- [ ] Status checks enabled (if using GitHub Actions)
- [ ] Branch must be up to date before merging
- [ ] Team members can still create PRs
- [ ] Only admins can bypass rules

---

## 🧪 Test the Protection Rules

### Test 1: Try Direct Push (Should Fail ✗)

```bash
# Create a test branch
git checkout -b test-branch

# Make a small change
echo "test" >> test.txt

# Try to push directly to main (this should fail)
git push origin test-branch:main
```

**Expected Result:** ❌ Error message: "Branch is protected"

If this works, protection is NOT enabled. Check your settings.

---

### Test 2: Create PR (Should Work ✅)

```bash
# Create feature branch
git checkout -b feature/test-protection

# Make a change
echo "test" >> test.txt
git add .
git commit -m "test: verify branch protection"

# Push normally
git push origin feature/test-protection
```

**Expected Result:** ✅ Push succeeds, Create PR appears on GitHub

---

### Test 3: Attempt Merge Without Review (Should Fail ✗)

1. On GitHub, open your test PR
2. Try to click **Merge pull request**
3. Should see message: "This branch has 1 review required"

**Expected Result:** ❌ Merge button disabled until review approved

---

### Test 4: Merge With Approval (Should Work ✅)

1. Assign a teammate to review the PR
2. Have them click **Approve**
3. Now **Merge pull request** button becomes active

**Expected Result:** ✅ PR merges successfully

---

## 🔄 Branch Protection for Multiple Branches

If you want to protect both `main` and `develop`:

**Repeat the setup for `develop` branch:**
1. Settings → Branches
2. Click **Add rule**
3. Enter `develop` as pattern
4. Apply same rules as `main`

---

## 📚 Protection Rule Summary

| Rule | Benefit | Team Size |
|------|---------|-----------|
| Require PR before merge | Prevents accidental changes | All |
| At least 1 review | Catches mistakes | 2+ members |
| Status checks pass | Automated quality gates | Any with CI |
| Update before merge | Tests with latest code | All |

---

## 🚨 Troubleshooting

### Problem: "I accidentally pushed code directly to main"

**Solution 1: Revert the commit**
```bash
git revert <commit-hash>
git push origin main
```

**Solution 2: Use GitHub UI**
1. Go to Commits tab
2. Click the commit
3. Click "Revert this commit"
4. Create new PR to reverse changes

---

### Problem: "Branch is outdated, can't merge"

**Solution:** Update your branch in GitHub
- PR shows: "This branch is out of date"
- Click "Update branch" button
- Click "Merge pull request" again

Or merge locally:
```bash
git fetch origin
git merge origin/main
git push origin feature/your-branch
```

---

### Problem: "Merge button is disabled but I'm approved"

**Check:**
- ✅ All status checks passing (if enabled)
- ✅ Branch is updated with main (click "Update branch")
- ✅ You have approval from reviewer
- ✅ Reviewer is a team member (not just any account)

If still stuck, wait 1-2 minutes for GitHub to refresh.

---

## 📋 Team Workflow with Protection

### Normal Workflow:

```
1. Create feature branch
   git checkout -b feature/awesome-feature

2. Work on feature
   git add .
   git commit -m "feat: add awesome feature"

3. Push to GitHub
   git push origin feature/awesome-feature

4. Create Pull Request on GitHub
   - Opens automatically after push
   - Add title and description
   - Link to issue if applicable

5. Request Review
   - Assign team member as reviewer
   - They review code and changes

6. Make Requested Changes (if any)
   git add .
   git commit -m "refactor: address review feedback"
   git push origin feature/awesome-feature

7. Approve and Merge
   - Once approved, click "Merge pull request"
   - GitHub auto-merges to main
   - Branch is auto-deleted (optional)

8. Clean up locally
   git checkout main
   git pull origin main
   git branch -d feature/awesome-feature
```

---

## 🎓 Why These Rules Matter

### **Require PR Before Merge**
- Prevents accidental overwrites
- Documents all changes
- Enables discussion before code reaches main

### **Require Code Review**
- Catches bugs early
- Shares knowledge across team
- Improves code quality
- Helps team learn best practices

### **Require Status Checks**
- Ensures code builds without errors
- Runs linting automatically
- Catches TypeScript errors
- Prevents broken dependencies

### **Require Up-to-Date Branch**
- Prevents merge conflicts
- Ensures changes work with latest code
- Reduces surprises in production

---

## 🔗 Related Documentation

- [Branch Naming Conventions](BRANCH_NAMING_CONVENTIONS.md)
- [Pull Request Template](pull_request_template.md)
- [Code Review Checklist](CODE_REVIEW_CHECKLIST.md)

---

## 💡 Additional Settings (Optional)

If you want to go further, you can enable:

- **Require branches to be up to date** — Already in our setup
- **Require status checks** — If using GitHub Actions (next sprint)
- **Require code owners review** — Set up in `.github/CODEOWNERS` file (advanced)
- **Dismiss stale reviews** — Already configured above

---

## ✅ You're Done!

Your `main` branch is now protected. Your team can:
- ✅ Create feature branches safely
- ✅ Submit PRs for all changes
- ✅ Review each other's code
- ✅ Maintain code quality
- ✅ Prevent accidental mistakes

**Time to protect `main`: ~5-10 minutes**

---

*Last updated: Sprint 2.11 — Team Branching & PR Workflow Setup*
