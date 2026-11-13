---
trigger: model_decision
description: Instructions for native GitHub CLI execution, Project #1 automation, and zero-manual-effort issue management on this workstation for KopKar SAI.
---

# Native GitHub CLI & Project #1 Automation Rules

This rule defines how Antigravity natively executes GitHub CLI (`gh`) operations and manages GitHub Project #1 (`kopkar-xyz/projects/1`) directly without requiring manual user intervention in the web browser.

---

## 1. Cross-OS Binary & Authentication Setup

- **`gh` Binary Resolution**: Resolved dynamically via `PATH` (`shutil.which("gh")` in `scripts/agentic/common.py`).
- **Config Directory**: Uses the OS default GitHub CLI config (`%APPDATA%\GitHub CLI` on Windows, `~/.config/gh` on Linux/macOS), overridable via `GH_CONFIG_DIR`.
- **Required Auth Scopes**: Authenticate with `gh auth login -s project,read:project,read:org,repo` (or `gh auth refresh -s project,read:project,read:org,repo`) so Project v2 GraphQL commands succeed.
- **Python Invocation**: Run `scripts/agentic/*.py` with `python` on Windows or `python3` on Linux/macOS.

---

## 2. Project & Repository Canonical Binding

Always use these targets unless explicitly overridden by the user:
- **Repository**: `kopkar-xyz/kopkarsai-ecosystem`
- **Organization**: `kopkar-xyz`
- **Project v2**: `https://github.com/orgs/kopkar-xyz/projects/1` (Project `#1` `kopkar-sai`)
- **Default Assignee**: Active developer's `github_username` from `.agent/developer.local.json` (fallback: explicit `--assignee` flag)

---

## 3. Issue & Project Management Policy (Mandatory Developer Review Gate)

When the user asks to create an issue, start a feature/bugfix, or add/edit/delete a task:
1. **Never ask the user to open the browser or create/edit the issue manually.**
2. Formulate a structured GitHub Issue title and body matching repository standards:
   - `## Summary`
   - `## Scope / Out of Scope`
   - `## Acceptance Criteria`
   - `## Definition of Done`
3. **MANDATORY REVIEW GATE**: Before executing actual creation, editing, closing, or deletion on GitHub:
   - Present the structured proposal / diff / impact to the developer.
   - Run `--dry-run` to preview the command payload (note: on PowerShell, pass multiline `--body` safely via a single-quoted here-string `@' ... '@` without backtick escapes):
     ```bash
     python scripts/agentic/gh_project.py create-issue \
       --title "<Title>" \
       --body "<Structured Body>" \
       --type <feat|fix|refactor|docs|test|chore> \
       --status <Backlog|Ready|In Progress> \
       --priority <Urgent|High|Medium|Low> \
       --assignee <github-username> \
       --dry-run
     ```
   - **Ask the developer for explicit review and confirmation.**
4. **Execute Only After Explicit Developer Approval**:
   - Run the script without `--dry-run` once the developer approves.
5. If starting work immediately on that approved issue:
   - Create the task branch using `start_task.py`:
     ```bash
     python scripts/agentic/start_task.py --type <type> --issue <number> --slug <slug>
     ```
   - Update project status to `In Progress` using `sync_state.py`.

---

## 4. Canonical Vocabulary for Status & Priority

- **Status**: `Backlog` | `Ready` | `In Progress` | `In Review` | `Blocked` | `Done` (adaptively mapped to `Todo`, `In progress`, `Done` for Project #1 if specific columns do not exist).
- **Priority**: `Urgent` | `High` | `Medium` | `Low`
