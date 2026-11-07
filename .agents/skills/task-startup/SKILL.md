---
name: task-startup
description: Verify issue ownership, validate branch naming conventions, run preflight checks, and initialize a task branch or isolated git worktree.
---

# Task Startup Runbook (Alias for start-task)

This skill guides the creation of a task branch or isolated worktree adhering to the project's strict naming conventions.

## Conventions

- Format: `{type}/{issue-number}-{short-kebab-slug}`
- Allowed types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`

## Execution

```bash
python3 scripts/agentic/start-task.py \
  --type feat \
  --issue 101 \
  --slug loan-calculator-backend
```
