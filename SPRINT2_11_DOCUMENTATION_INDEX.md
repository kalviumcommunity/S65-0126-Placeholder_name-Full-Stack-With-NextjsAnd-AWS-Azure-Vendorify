# 📑 Sprint 2.11 Documentation Index

**Everything you need for professional team collaboration on GitHub**

---

## 🎯 Start Here

**New to this workflow?** Read in this order:

1. 📄 **This file** (you're here) — Overview of all materials
2. 📋 [SPRINT2_11_QUICK_REFERENCE.md](SPRINT2_11_QUICK_REFERENCE.md) — One-page cheat sheet
3. 📖 [README.md](README.md#-team-workflow--pr-process) — Full team workflow explanation
4. ⚙️ [.github/BRANCH_PROTECTION_SETUP.md](.github/BRANCH_PROTECTION_SETUP.md) — Set up GitHub

---

## 📚 Complete Documentation Suite

### Core Documents (in `.github/` folder)

#### 1. [BRANCH_NAMING_CONVENTIONS.md](.github/BRANCH_NAMING_CONVENTIONS.md)
**What:** How to name your branches  
**When:** Before creating any branch  
**Read Time:** 5 minutes  
**Key Points:**
- 4 branch types: `feature/`, `fix/`, `chore/`, `docs/`
- Naming rules: lowercase, hyphens, descriptive
- Examples and why it matters

---

#### 2. [pull_request_template.md](.github/pull_request_template.md)
**What:** Template auto-loaded for every PR  
**When:** Every time you create a PR  
**Read Time:** 2 minutes  
**Includes:**
- Summary section
- Changes made
- Screenshots
- Comprehensive checklist
- Related issue links

**Auto-loads on GitHub** — You don't need to copy it!

---

#### 3. [CODE_REVIEW_CHECKLIST.md](.github/CODE_REVIEW_CHECKLIST.md)
**What:** Complete guide for reviewing code  
**When:** When reviewing a teammate's PR  
**Read Time:** 10 minutes  
**10 Review Categories:**
1. Code Quality & Style
2. Folder Structure & Naming
3. TypeScript & Types
4. Security & Secrets
5. Functionality & Testing
6. Documentation
7. Git & Version Control
8. Performance
9. Accessibility
10. Team Standards

---

#### 4. [BRANCH_PROTECTION_SETUP.md](.github/BRANCH_PROTECTION_SETUP.md)
**What:** How to protect the `main` branch  
**When:** First week of team development  
**Read Time:** 15 minutes  
**Includes:**
- Step-by-step GitHub setup (~5 minutes)
- 4 protection rules explained
- Testing the protection
- Troubleshooting guide
- Why each rule matters

---

### Supporting Documents

#### 5. [SPRINT2_11_COMPLETION.md](SPRINT2_11_COMPLETION.md)
**What:** Complete sprint overview  
**When:** When understanding the full scope  
**Read Time:** 15 minutes  
**Includes:**
- What was delivered
- How to use each guide
- Implementation checklist
- FAQ section
- Success criteria

---

#### 6. [SPRINT2_11_QUICK_REFERENCE.md](SPRINT2_11_QUICK_REFERENCE.md)
**What:** One-page cheat sheet  
**When:** Daily reference during development  
**Read Time:** 2 minutes  
**Includes:**
- 5-step workflow
- Branch naming cheat sheet
- Quick checklists
- Common problems & solutions
- When to check full guides

---

#### 7. [SPRINT2_11_SCREENSHOT_GUIDE.md](SPRINT2_11_SCREENSHOT_GUIDE.md)
**What:** What screenshots to capture  
**When:** When documenting your work  
**Read Time:** 10 minutes  
**Includes:**
- 7 screenshot categories
- Specific instructions for each
- Photography tips
- How to use in documentation
- Suggested file structure

---

#### 8. [README.md](README.md#-team-workflow--pr-process) — Team Workflow Section
**What:** Team workflow explained in main README  
**When:** When onboarding new team members  
**Read Time:** 10 minutes  
**Includes:**
- Branch naming strategy
- PR template explanation
- Code review guidelines
- Branch protection overview
- Why this workflow matters

---

## 🔍 Quick Lookup Table

**What's your situation?**

| I need to... | Read this | Time |
|---|---|---|
| Create a feature branch | [Quick Ref](SPRINT2_11_QUICK_REFERENCE.md#-quick-start-the-5-step-workflow) | 1 min |
| Know branch naming rules | [Branch Conventions](.github/BRANCH_NAMING_CONVENTIONS.md) | 5 min |
| Fill out a PR | [PR Template](.github/pull_request_template.md) | 2 min |
| Review a teammate's code | [Review Checklist](.github/CODE_REVIEW_CHECKLIST.md) | 10 min |
| Set up branch protection | [Protection Setup](.github/BRANCH_PROTECTION_SETUP.md) | 15 min |
| Fix a merge problem | [Quick Ref Solutions](SPRINT2_11_QUICK_REFERENCE.md#-common-problems--solutions) | 2 min |
| Understand the full workflow | [README Section](README.md#-team-workflow--pr-process) | 10 min |
| Take screenshots | [Screenshot Guide](SPRINT2_11_SCREENSHOT_GUIDE.md) | 10 min |
| One-page overview | [Completion Doc](SPRINT2_11_COMPLETION.md) | 15 min |

---

## 📂 File Structure

```
amogas/
│
├── README.md
│   └── Section: "Team Workflow & PR Process" ← Start here for overview
│
├── .github/
│   ├── pull_request_template.md ← Auto-loads on GitHub
│   ├── BRANCH_NAMING_CONVENTIONS.md
│   ├── CODE_REVIEW_CHECKLIST.md
│   ├── BRANCH_PROTECTION_SETUP.md
│   └── workflows/
│
├── SPRINT2_11_COMPLETION.md ← Full sprint overview
├── SPRINT2_11_QUICK_REFERENCE.md ← Cheat sheet (print this!)
├── SPRINT2_11_SCREENSHOT_GUIDE.md ← Documentation screenshots
├── SPRINT2_11_DOCUMENTATION_INDEX.md ← This file
│
└── docs/
    └── screenshots/ ← Store all workflow screenshots here
```

---

## 🎓 Learning Paths

### Path 1: Quick Setup (30 minutes)
For teams who need to start right now:

1. Read [Quick Reference](SPRINT2_11_QUICK_REFERENCE.md) (5 min)
2. Read [Branch Naming](.github/BRANCH_NAMING_CONVENTIONS.md) (5 min)
3. Set up [Branch Protection](.github/BRANCH_PROTECTION_SETUP.md) (10 min)
4. Read [Completion Doc](SPRINT2_11_COMPLETION.md) (10 min)

**Result:** Team can start using workflow immediately

---

### Path 2: Complete Understanding (1 hour)
For teams who want to understand everything:

1. Read [Completion Doc](SPRINT2_11_COMPLETION.md) (15 min)
2. Read [README Workflow Section](README.md#-team-workflow--pr-process) (10 min)
3. Read [Branch Naming](.github/BRANCH_NAMING_CONVENTIONS.md) (5 min)
4. Read [Code Review Checklist](.github/CODE_REVIEW_CHECKLIST.md) (10 min)
5. Read [Branch Protection Setup](.github/BRANCH_PROTECTION_SETUP.md) (15 min)
6. Read [Screenshot Guide](SPRINT2_11_SCREENSHOT_GUIDE.md) (5 min)

**Result:** Team fully understands why every rule exists

---

### Path 3: Implementation (2-3 hours)
For teams ready to actually execute:

1. Same reads as Path 2 (1 hour)
2. Set up branch protection on GitHub (10 min)
3. Create and test a practice PR as a team (30 min)
4. Capture screenshots (20 min)
5. Commit all documentation to git (10 min)

**Result:** Workflow is live and tested

---

## 🚀 Recommended Sequence for Your Team

### Week 1: Understanding
- [ ] All team members read [Quick Reference](SPRINT2_11_QUICK_REFERENCE.md)
- [ ] All team members read [README Workflow section](README.md#-team-workflow--pr-process)
- [ ] Someone reads full [Completion Doc](SPRINT2_11_COMPLETION.md)

### Week 1: Setup (Friday)
- [ ] One admin reads [Branch Protection Setup](.github/BRANCH_PROTECTION_SETUP.md)
- [ ] Admin sets up branch protection on GitHub
- [ ] Test with a practice PR from each team member

### Week 2: Using the Workflow
- [ ] First real feature branches
- [ ] First real code reviews
- [ ] Reference [Code Review Checklist](.github/CODE_REVIEW_CHECKLIST.md) for reviews
- [ ] Reference [Branch Naming](.github/BRANCH_NAMING_CONVENTIONS.md) for help

### Week 3: Documentation
- [ ] Capture screenshots using [Screenshot Guide](SPRINT2_11_SCREENSHOT_GUIDE.md)
- [ ] Update README with real examples
- [ ] Write sprint completion summary

---

## ✅ Checklist Before Submission

**Have you completed all of this?**

### Documentation ✅
- [ ] [BRANCH_NAMING_CONVENTIONS.md](.github/BRANCH_NAMING_CONVENTIONS.md) created
- [ ] [pull_request_template.md](.github/pull_request_template.md) updated
- [ ] [CODE_REVIEW_CHECKLIST.md](.github/CODE_REVIEW_CHECKLIST.md) created
- [ ] [BRANCH_PROTECTION_SETUP.md](.github/BRANCH_PROTECTION_SETUP.md) created
- [ ] [README Team Workflow section](README.md#-team-workflow--pr-process) added
- [ ] [SPRINT2_11_SCREENSHOT_GUIDE.md](SPRINT2_11_SCREENSHOT_GUIDE.md) created
- [ ] [SPRINT2_11_COMPLETION.md](SPRINT2_11_COMPLETION.md) created
- [ ] [SPRINT2_11_QUICK_REFERENCE.md](SPRINT2_11_QUICK_REFERENCE.md) created

### Setup ✅
- [ ] Branch protection configured on `main`
- [ ] Team tested workflow with 1-2 practice PRs
- [ ] PR template auto-loads when creating new PR

### Evidence ✅
- [ ] At least 5 screenshots captured
- [ ] Screenshots show: branches, PR, checklist, approval, protection
- [ ] Screenshots saved in `docs/screenshots/` folder

### Git ✅
- [ ] All new files committed
- [ ] Everything pushed to GitHub
- [ ] Links in README tested and working

---

## 🎯 Key Concepts Explained

### Branch Naming
**Why it matters:** Everyone understands what each branch does at a glance

**Pattern:** `<type>/<description>`

**Types:**
- `feature/` — New functionality
- `fix/` — Bug fixes
- `chore/` — Maintenance
- `docs/` — Documentation

---

### Pull Request Template
**Why it matters:** Ensures nothing is forgotten, quality gates are clear

**Sections:**
1. Summary — What does this PR do?
2. Changes Made — Specific modifications
3. Screenshots — Visual evidence
4. Checklist — Quality verification
5. Related Issue — Links to GitHub issues

---

### Code Review Checklist
**Why it matters:** Ensures reviews are thorough and consistent

**10 Review Categories:**
- Code Quality
- Structure & Naming
- TypeScript & Types
- Security
- Functionality
- Documentation
- Git Hygiene
- Performance
- Accessibility
- Communication

---

### Branch Protection
**Why it matters:** Prevents mistakes from reaching production

**Rules:**
- Require PR review (no direct pushes)
- Require automated checks pass
- Require branch up-to-date
- At least 1 approval needed

---

## 💡 Pro Tips

### For Team Leads
- Make sure everyone reads [Quick Reference](SPRINT2_11_QUICK_REFERENCE.md) first
- Test the workflow before depending on it
- Have a practice PR day where everyone tries it
- Refer back to checklists during reviews

### For Team Members
- Bookmark [Quick Reference](SPRINT2_11_QUICK_REFERENCE.md)
- Refer to [Code Review Checklist](.github/CODE_REVIEW_CHECKLIST.md) when reviewing
- Ask "Is my branch name right?" if unsure — reference [Branch Naming](.github/BRANCH_NAMING_CONVENTIONS.md)
- Check [Quick Reference]() when you hit a problem

### For New Members Joining Later
- Have them read [Quick Reference](SPRINT2_11_QUICK_REFERENCE.md) first (5 min)
- Have them read [README section](README.md#-team-workflow--pr-process) (10 min)
- Have them create a practice branch to get comfortable
- Pair them with a mentor for their first PR

---

## 🔗 Navigation

**Jump to a specific guide:**

| Guide | Purpose | Location |
|-------|---------|----------|
| Quick Start | One-page reference | [SPRINT2_11_QUICK_REFERENCE.md](SPRINT2_11_QUICK_REFERENCE.md) |
| Branch Naming | How to name branches | [.github/BRANCH_NAMING_CONVENTIONS.md](.github/BRANCH_NAMING_CONVENTIONS.md) |
| PR Template | What goes in a PR | [.github/pull_request_template.md](.github/pull_request_template.md) |
| Code Review | How to review code | [.github/CODE_REVIEW_CHECKLIST.md](.github/CODE_REVIEW_CHECKLIST.md) |
| Protection Setup | GitHub configuration | [.github/BRANCH_PROTECTION_SETUP.md](.github/BRANCH_PROTECTION_SETUP.md) |
| Full Completion | Complete overview | [SPRINT2_11_COMPLETION.md](SPRINT2_11_COMPLETION.md) |
| Screenshots | What to document | [SPRINT2_11_SCREENSHOT_GUIDE.md](SPRINT2_11_SCREENSHOT_GUIDE.md) |
| README | Team workflow section | [README.md](README.md#-team-workflow--pr-process) |

---

## ❓ Quick Questions?

**Q: Where do I start if I'm new?**  
A: Read [SPRINT2_11_QUICK_REFERENCE.md](SPRINT2_11_QUICK_REFERENCE.md) first (5 minutes)

**Q: How do I name my branch?**  
A: Check [Branch Naming](.github/BRANCH_NAMING_CONVENTIONS.md) or the quick reference

**Q: What do I put in a PR?**  
A: The template auto-loads on GitHub. Just follow the sections.

**Q: How do I review code?**  
A: Use [CODE_REVIEW_CHECKLIST.md](.github/CODE_REVIEW_CHECKLIST.md) and be kind!

**Q: Why can't I merge?**  
A: Check [BRANCH_PROTECTION_SETUP.md](.github/BRANCH_PROTECTION_SETUP.md) or [Quick Ref Solutions](SPRINT2_11_QUICK_REFERENCE.md#-common-problems--solutions)

**Q: Where are the screenshots?**  
A: See [SPRINT2_11_SCREENSHOT_GUIDE.md](SPRINT2_11_SCREENSHOT_GUIDE.md)

---

## 📊 Documentation Stats

| Document | Length | Read Time | Purpose |
|----------|--------|-----------|---------|
| Quick Reference | 1 page | 2 min | Daily use |
| README Section | 2 pages | 10 min | Overview |
| Branch Naming | 3 pages | 5 min | Reference |
| PR Template | 1 page | 2 min | Auto-loaded |
| Code Review | 5 pages | 10 min | Review guide |
| Protection Setup | 6 pages | 15 min | Setup guide |
| Completion Doc | 6 pages | 15 min | Full overview |
| Screenshot Guide | 7 pages | 10 min | Documentation |
| Total | 31 pages | ~70 min | Everything |

---

## 🎓 What You've Created

**A professional team workflow that includes:**

✅ Consistent branch naming (prevents confusion)  
✅ Clear PR expectations (quality gates)  
✅ Structured code reviews (knowledge sharing)  
✅ Protected branches (safety & quality)  
✅ Complete documentation (onboarding)  
✅ Visual evidence (screenshots)  

**This is what professional teams use.** You're learning real practices.

---

## 🚀 Next Steps

1. **Read** → [SPRINT2_11_QUICK_REFERENCE.md](SPRINT2_11_QUICK_REFERENCE.md)
2. **Setup** → [BRANCH_PROTECTION_SETUP.md](.github/BRANCH_PROTECTION_SETUP.md)
3. **Practice** → Create a test PR together
4. **Document** → Capture screenshots
5. **Submit** → Commit and push to GitHub

---

## 📌 Bookmark This!

**Save this file for quick navigation:**
- [SPRINT2_11_DOCUMENTATION_INDEX.md](SPRINT2_11_DOCUMENTATION_INDEX.md) ← You are here

**Print this for reference:**
- [SPRINT2_11_QUICK_REFERENCE.md](SPRINT2_11_QUICK_REFERENCE.md)

---

**Sprint 2.11 is ready!** 🎉

Choose a guide above and get started!

---

*Sprint 2.11 — Team Branching & PR Workflow Setup*  
*Documentation Index for Vendorify Project*  
*February 2026*
