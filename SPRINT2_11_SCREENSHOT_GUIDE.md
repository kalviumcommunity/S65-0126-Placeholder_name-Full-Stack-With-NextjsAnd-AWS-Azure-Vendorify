# Sprint 2.11 Screenshot Suggestions

## 📸 What Screenshots to Capture

This document suggests screenshots that demonstrate your team's professional GitHub workflow. These help document your Sprint 2.11 completion and can be included in sprint reviews or documentation.

---

## 1️⃣ Branch Naming Convention Examples

### Screenshot 1A: Feature Branch Creation

**What to capture:**
```bash
git checkout -b feature/vendor-search
```

Then show the terminal output:

```
Switched to a new branch 'feature/vendor-search'
```

**Why:** Shows you're following the `feature/<feature-name>` convention correctly.

**Where to add:** Include in sprint documentation or `docs/` folder.

---

### Screenshot 1B: Branch List in GitHub

**Steps:**
1. Go to your GitHub repository
2. Click **Branches** tab
3. Show a list of branches with mixed types

**What a good list looks like:**
```
feature/user-authentication     (3 days ago) ✓
feature/vendor-search           (2 days ago) ✓
fix/navbar-responsive-layout    (1 day ago)  ✓
chore/update-dependencies       (1 week ago) ✓
docs/readme-workflow            (Just now)   ✓
main                            (latest)     ✓
```

**Why:** Demonstrates consistent naming across the team's work.

**File location:** Save as `docs/screenshots/branch-list.png`

---

### Screenshot 1C: Git Log Showing Branch Names

**Terminal command:**
```bash
git log --oneline --graph --all --decorate
```

**Example output:**
```
* 3a8f2e1 (feat/vendor-search) feat: add vendor search filter
* 2b9c4d7 (fix/navbar-responsive) fix: navbar responsive on mobile
*   1e7f6c2 Merge pull request #12 from team/feat/user-auth
|\
| * 0d5a3e9 (feature/user-auth) feat: add user authentication
|/
* 8c2b1f4 (main) docs: add branch naming conventions
```

**Why:** Shows clean commit history with proper branch usage.

---

## 2️⃣ Pull Request Examples

### Screenshot 2A: Create Pull Request Page

**Steps:**
1. Click **New pull request** on GitHub
2. Select your feature branch → main
3. Fill out the PR template

**What to show:**
- Branch selector showing `feature/* → main`
- PR title field (descriptive name)
- Description showing the template sections

**File location:** `docs/screenshots/pr-create.png`

**Why:** Demonstrates the full PR workflow.

---

### Screenshot 2B: Completed PR Showing All Checklist Items

**Steps:**
1. Open an example PR that was merged
2. Scroll down to show the checklist
3. Highlight all checked items

**What should be visible:**
```
✅ Code Quality
  ✅ Ran npm run lint — no new ESLint errors
  ✅ Ran npm run lint:fix to auto-fix issues
  ✅ Ran npm run format — code is properly formatted
  ✅ All TypeScript errors are resolved

✅ Testing & Functionality
  ✅ Feature works locally (npm run dev)
  ✅ No new console errors or warnings
  ✅ Changes don't break existing features

✅ Code Structure
  ✅ Code follows folder structure conventions
  ✅ Naming conventions are consistent
  ✅ Components are in src/components/
  ...and more
```

**File location:** `docs/screenshots/pr-checklist.png`

**Why:** Shows the team takes code quality seriously.

---

### Screenshot 2C: PR with Conversation/Comments

**Steps:**
1. Open a PR with reviewer comments
2. Show a code suggestion or feedback
3. Show the author's response

**Example script:**
- **Reviewer:** "Could we extract this into a helper function for reusability?"
- **Author:** "Good idea! Done in commit 3a8f2e1"

**File location:** `docs/screenshots/pr-review-feedback.png`

**Why:** Demonstrates healthy code review discussion.

---

## 3️⃣ Code Review Examples

### Screenshot 3A: PR Review Page with Approval

**Steps:**
1. Open a merged PR
2. Go to **Files changed** tab
3. Show the highlighted diffs
4. Scroll to see **Approve** button was clicked

**What to show:**
```
✅ [Reviewer Name] approved these changes
- 2 commits commits with 5 file changes
- Changes are green (approved)
```

**File location:** `docs/screenshots/pr-approval.png`

**Why:** Shows the code review process is working.

---

### Screenshot 3B: GitHub Code Diff View

**Steps:**
1. Go to a merged PR
2. Click **Files changed**
3. Show the before/after code comparison

**Example:**
```diff
- const handleSubmit = () => {
-   console.log("Submitting form");
-   const email = document.getElementById("email").value;
+ const handleFormSubmit = (e: FormEvent) => {
+   e.preventDefault();
+   const email = (e.target as HTMLInputElement).value;
```

**File location:** `docs/screenshots/code-diff.png`

**Why:** Demonstrates the diff review interface and quality improvements.

---

### Screenshot 3C: Request Changes Feedback

**Steps:**
1. Open a PR with requested changes
2. Show a comment with "Request changes" status

**Example:**
```
👤 Reviewer requested changes

"This function is missing type annotations. 
Can we add a return type and parameter types?
This helps catch bugs early!"
```

**File location:** `docs/screenshots/pr-request-changes.png`

**Why:** Shows constructive feedback process.

---

## 4️⃣ Automated Checks Passing

### Screenshot 4A: GitHub Actions / Status Checks

**Steps:**
1. Open a recent PR
2. Scroll to the **Checks** section
3. Show all checks passing with ✅

**What a good status looks like:**
```
✅ build (node.js 18.x) — All checks passed
✅ ESLint Check — Passed
✅ TypeScript Check — Passed
✅ Prettier Format Check — Passed
All status checks have passed
```

**File location:** `docs/screenshots/checks-passing.png`

**Why:** Demonstrates automated quality gates are working.

---

### Screenshot 4B: Failing Checks & Fix

**Steps:**
1. Find or create a PR with failing checks
2. Show the failure (e.g., ESLint error)
3. Then show a commit that fixes it
4. Show the checks pass again

**Example flow:**
```
❌ ESLint Check — 2 errors
   - Unused variable 'userId' in components/User.tsx

(Author pushes fix commit)

✅ ESLint Check — All checks passed
```

**File location:** `docs/screenshots/checks-fixed.png`

**Why:** Shows the team fixes issues identified by automated tools.

---

## 5️⃣ Branch Protection Rules

### Screenshot 5A: Branch Protection Settings

**Steps:**
1. Go to **Settings** → **Branches**
2. Click on the protection rule for `main`
3. Show all enabled options

**What to show:**
```
✅ Require a pull request before merging
   ✅ Require at least 1 approving review
   
✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   ✅ GitHub Actions: build
   ✅ GitHub Actions: eslint
```

**File location:** `docs/screenshots/branch-protection-settings.png`

**Why:** Proves you've configured GitHub to enforce standards.

---

### Screenshot 5B: Protected Branch Error

**Steps:**
1. Try to push directly to main (simulated is fine)
2. Show the error message
3. OR show the merge button disabled with warning

**Error message example:**
```
! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'origin'
```

Or on GitHub PR:
```
🔒 This branch has 1 review required

Merge pull request is disabled until:
- At least 1 approving review
- All status checks pass
```

**File location:** `docs/screenshots/branch-protected.png`

**Why:** Shows protection is actually enforced, not just configured.

---

## 6️⃣ Team Collaboration Evidence

### Screenshot 6A: Multiple Team Members' Contributions

**Steps:**
1. Go to **Insights** → **Contributors**
2. Show multiple team members with contributions
3. Capture the timeline view

**Example:**
```
👤 [Student Name 1] — 8 commits
   feature/user-auth
   fix/logout-bug
   chore/update-eslint

👤 [Student Name 2] — 6 commits
   feature/vendor-search
   docs/workflow-guide

👤 [Student Name 3] — 5 commits
   feature/payment-integration
```

**File location:** `docs/screenshots/team-contributors.png`

**Why:** Shows the whole team is participating.

---

### Screenshot 6B: PR with Multiple Reviewers

**Steps:**
1. Find a PR that was reviewed and merged
2. Show the reviewers list
3. Show comments from different team members

**Example:**
```
Reviewers:
👤 @student1 - Approved ✅
👤 @student2 - Approved ✅

Comments:
@student1: "Great implementation! One small improvement..."
@student2: "Added a suggestion in files changed"
@dev-author: "Thanks! Updated based on your feedback"
```

**File location:** `docs/screenshots/multi-reviewer-pr.png`

**Why:** Demonstrates peer review culture.

---

### Screenshot 6C: Git Network Graph

**Steps:**
1. Go to **Insights** → **Network**
2. Capture the network visualization

**What it shows:**
- Multiple branches diverging from main
- Team members' work happening in parallel
- Clean merges back to main

**File location:** `docs/screenshots/git-network.png`

**Why:** Beautiful visualization of team workflow.

---

## 7️⃣ Documentation Screenshots

### Screenshot 7A: README Team Workflow Section

**Steps:**
1. Go to your repository
2. Scroll to "Team Workflow & PR Process" section
3. Capture the full section

**File location:** This is already in your repo - reference it.

**Why:** Shows documentation is complete.

---

### Screenshot 7B: .github Folder Structure

**Steps:**
1. On GitHub, click on `.github` folder
2. Show all the new files you created:
   - `pull_request_template.md`
   - `BRANCH_NAMING_CONVENTIONS.md`
   - `CODE_REVIEW_CHECKLIST.md`
   - `BRANCH_PROTECTION_SETUP.md`

**File location:** Reference in your documentation.

**Why:** Shows you've created comprehensive workflow documentation.

---

## 📋 Screenshot Checklist

Use this to organize which screenshots to capture:

### Essential Screenshots (Must Have)
- [ ] Branch list showing naming conventions
- [ ] Completed PR with checklist items
- [ ] PR approval from reviewer
- [ ] GitHub Actions checks passing
- [ ] Branch protection settings enabled
- [ ] Team contributors showing multiple members

### Nice-to-Have Screenshots
- [ ] Code review feedback/conversation
- [ ] Code diff showing improvements
- [ ] PR with requested changes → fix flow
- [ ] Git network graph
- [ ] Status checks failing → then passing

### Documentation Screenshots
- [ ] README Team Workflow section
- [ ] .github folder with all guides
- [ ] BRANCH_PROTECTION_SETUP.md displayed

---

## 📁 Suggested Folder Structure for Screenshots

```
docs/
├── screenshots/
│   ├── branch-list.png
│   ├── pr-create.png
│   ├── pr-checklist.png
│   ├── pr-approval.png
│   ├── code-diff.png
│   ├── checks-passing.png
│   ├── branch-protection-settings.png
│   ├── team-contributors.png
│   └── git-network.png
└── SCREENSHOTS_GUIDE.md (this file)
```

---

## 💡 Photography Tips for Screenshots

### Do's ✅
- ✅ Make sure text is **readable** — use a reasonable zoom level
- ✅ **Highlight the important part** — circle or arrow if helpful
- ✅ Include **context** — what repository, what branch, etc.
- ✅ Use **descriptive filenames** — `pr-review-approval.png` not `screenshot1.png`
- ✅ **Crop** screenshots to remove clutter
- ✅ **Timestamp** when relevant — shows it's recent

### Don't's ❌
- ❌ Include personal information (real names, emails if sensitive)
- ❌ Expose API keys or secrets (even in blur)
- ❌ Capture at crazy zoom levels (tiny or huge)
- ❌ Use generic names like "image.png"
- ❌ Include other browser tabs or notifications

---

## 🎬 Creating a Demo/Walkthrough Video (Bonus)

If your team wants to go extra:

1. **Record a 3-5 minute video** showing:
   - Creating a feature branch
   - Making a commit
   - Creating a PR
   - Requesting review
   - Making improvements
   - Merging the PR

2. **Tools:**
   - macOS: QuickTime Player
   - Windows: Snipping Tool or OBS Studio
   - Free: OBS Studio (all platforms)

3. **Share:** Upload to `docs/` folder or link in README

---

## 📊 Using Screenshots in Documentation

### In README
```markdown
## Team Workflow

Here's an example of our PR process:

![Team workflow example](docs/screenshots/pr-complete-flow.png)
```

### In Sprint Completion Document
```markdown
## Evidence of Implementation

### Branch Naming Convention
![Branch list showing naming conventions](docs/screenshots/branch-list.png)

### Code Review Process
![PR with multiple approvals](docs/screenshots/multi-reviewer-pr.png)
```

### In Presentation
- Include 5-7 best screenshots
- Arrange in logical flow
- Add captions explaining each step

---

## 🎯 Summary

**Minimum Evidence Needed:**
- 3-5 screenshots showing the workflow in action
- At least one screenshot from each section above
- Clear, readable images with captions

**What Reviewers Look For:**
- ✅ Consistent branch naming
- ✅ Evidence of code reviews
- ✅ Working protected branches
- ✅ Team collaboration (multiple contributors)
- ✅ Professional documentation

---

## 🔗 Related Documentation

- [Branch Naming Conventions](.github/BRANCH_NAMING_CONVENTIONS.md)
- [Pull Request Template](.github/pull_request_template.md)
- [Code Review Checklist](.github/CODE_REVIEW_CHECKLIST.md)
- [Branch Protection Setup](.github/BRANCH_PROTECTION_SETUP.md)

---

*Last updated: Sprint 2.11 — Team Branching & PR Workflow Setup*
