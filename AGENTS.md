# Execution Plan: Repository Decoupling & Manual Baseline Establishment

## Goal
To logically and technically sever the automatic synchronization between the **Private/Curation** environment and the **Public/Professional Portfolio**, ensuring a stable, manually-managed baseline for public viewing.

---

## Repository Reference
* **Public Repository:** `https://github.com/lonesome-data/professional-portfolio.git`
* **Private Repository:** `https://github.com/lonesome-data/resume_creator.git`

---

## Phase 1: Severing the Sync Logic
**Objective:** Identify and dismantle the bridge so that a push to the private side no longer triggers an update on the public side.

### 1.1 Audit Git Hooks
Local hooks often automate cross-repo transfers.

* **Action:** Navigate to the private repository root: `cd resume_creator`
* **Action:** List all active hooks: `ls .git/hooks/`
* **Target:** Inspect `pre-push`, `post-commit`, or `post-receive` for any `git push` commands targeting the public repository URL.
* **Remedy:** Rename the file (e.g., `mv .git/hooks/pre-push .git/hooks/pre-push.bak`) or comment out the specific push lines.

### 1.2 Review Remote Configurations
* **Action:** Run `git remote -v` inside `resume_creator`
* **Check:** Look for remotes named `public`, `portfolio`, `upstream`, or secondary push URLs under `origin` that point to the `professional-portfolio` URL.
* **Command:** If a dedicated public remote exists: `git remote remove [REMOTE_NAME]`
* **Command:** If `origin` has multiple push URLs, reset it to only point to private: `git remote set-url --push origin https://github.com/lonesome-data/resume_creator.git`

### 1.3 Audit CI/CD & Cloud Automation
* **Action:** In the `resume_creator` repo, check for `.github/workflows/`
* **Check:** Search YAML files for keywords: `professional-portfolio`, `remote add`, or secrets like `PORTFOLIO_DEPLOY_KEY`.
* **Remedy:** Delete the YAML file responsible for syncing or disable the workflow in the GitHub Actions UI.
* **Action:** Check **Settings > Webhooks** on GitHub for the `resume_creator` repository. Delete any webhook pointing to deployment services linked to the portfolio site.

---

## Phase 2: Establishing the Public Baseline
**Objective:** Initialize the public repository with a permanent, self-contained version of the resume.

### 2.1 Sanitize `resume.html`
* **Action:** Navigate to the public repository: `cd professional-portfolio`
* **Task:** Open `resume.html` and verify all assets.
* **Requirement:** Ensure all `<link>`, `<script>`, and `<img>` tags point to local files within `professional-portfolio` or valid CDNs. No paths should reference `../resume_creator/`.
* **Validation:** Open `resume.html` in a clean browser environment to ensure it renders without 404 errors.

### 2.2 The Source of Truth Commit
* **Action:** Stage and commit the finalized file in the `professional-portfolio` repo.
* **Command:** ```bash
    git add resume.html
    git commit -m "docs: establish standalone resume.html (sync disabled)"
    git push origin main
    ```

---

## Phase 3: Updating Documentation
**Objective:** Prevent accidental re-coupling by documenting the manual boundary.

### 3.1 Public `README.md` Update
* **Action:** Edit `README.md` in `professional-portfolio`. Append to the **Maintenance** section:
    > "Maintenance Note: The resume.html file is a static baseline. It is manually curated and is not automatically updated by the resume_creator repository. To update the public resume, changes must be manually ported and committed here."

### 3.2 Private `README.md` Update
* **Action:** Edit `README.md` in `resume_creator`. Append to the **Workflow** section:
    > "Workflow Note: This repository is for private curation and temporal tracking only. Automatic synchronization to professional-portfolio has been disabled. Approved versions must be manually exported to the professional repository."

---

## Success Criteria (Verification for Agent)
1.  **Verification 1:** Run a dummy commit in `resume_creator`: `git commit --allow-empty -m "test sync" && git push`
2.  **Verification 2:** Check `professional-portfolio` logs: `cd professional-portfolio && git fetch && git log origin/main`. Ensure no new commits appeared from the private push.
3.  **Verification 3:** Confirm both `README.md` files contain the string "manually ported".