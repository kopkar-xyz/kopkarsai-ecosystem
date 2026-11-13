---
name: start-task
description: >-
  Verify issue ownership, validate branch naming conventions, run preflight checks, and create a task branch or isolated git worktree. Use when starting work on a GitHub issue.
---

# Start Task Runbook

Skill ini memvalidasi preflight & kepemilikan issue lalu membuat branch atau git worktree sesuai konvensi repositori (`{type}/{issue-number}-{short-kebab-slug}`).

- Allowed types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
- Contoh: `feat/101-loan-calculator-backend`, `chore/56-cleanup-agent-rules-skills`

---

## Execution

```bash
# 1. Dry-Run Preview
python scripts/agentic/start_task.py \
  --type feat \
  --issue 101 \
  --slug loan-calculator-backend \
  --dry-run

# 2. Standard Task Branch
python scripts/agentic/start_task.py \
  --type feat \
  --issue 101 \
  --slug loan-calculator-backend

# 3. Isolated Git Worktree (.agent/worktrees/)
python scripts/agentic/start_task.py \
  --type feat \
  --issue 101 \
  --slug loan-calculator-backend \
  --worktree
```
*(Gunakan `python3` di Linux/macOS jika perlu.)*

---

## ✅ Verification

Pastikan branch/worktree aktif sudah berpindah dari `main` dan mengikuti format yang benar:
```bash
git branch --show-current
git worktree list
```
