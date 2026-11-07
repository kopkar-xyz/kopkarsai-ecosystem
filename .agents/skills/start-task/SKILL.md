---
name: start-task
description: Verify issue ownership, validate branch naming conventions, run preflight checks, and initialize a task branch or isolated git worktree.
---

# Start Task Runbook

This skill guides the creation of a task branch or isolated worktree adhering to the project's strict naming conventions.

## Conventions

- Format: `{type}/{issue-number}-{short-kebab-slug}`
- Allowed types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
- Examples: `feat/101-loan-calculator-backend`, `fix/102-member-approval-status`

## Execution

### 1. Dry-Run Branch Creation
```bash
python3 scripts/agentic/start-task.py \
  --type feat \
  --issue 101 \
  --slug loan-calculator-backend \
  --dry-run
```

### 2. Standard Branch Creation
```bash
python3 scripts/agentic/start-task.py \
  --type feat \
  --issue 101 \
  --slug loan-calculator-backend
```

### 3. Isolated Git Worktree Creation
```bash
python3 scripts/agentic/start-task.py \
  --type feat \
  --issue 101 \
  --slug loan-calculator-backend \
  --worktree
```
