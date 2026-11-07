---
name: sync-project-state
description: Synchronize task status and GitHub Project v2 based on verifiable evidence (branches, tests, PRs, unblock notes).
---

# Sync Project State Runbook

This skill validates concrete evidence before updating a task's state in `.agent/task-state.json` and the bound GitHub Project #1 (`kopkar-sai`).

> [!IMPORTANT]
> **Developer Review Gate**: Mutasi status terminal (seperti menutup issue ke `Done`) atau modifikasi issue GitHub harus didahului konfirmasi dan review dari developer.

## Status Machine

```text
Backlog ➔ Ready ➔ In Progress ➔ In Review ➔ Done (Terminal)
(Blocked is bidirectional with Backlog, Ready, In Progress, In Review)
```

## Execution

### 1. Move to In Progress
```bash
python3 scripts/agentic/sync-state.py \
  --state "In Progress" \
  --issue 101
```

### 2. Mark Blocked (Requires Reason >= 3 chars)
```bash
python3 scripts/agentic/sync-state.py \
  --state "Blocked" \
  --issue 101 \
  --blocker-reason "Menunggu skema database Dual-Approval"
```

### 3. Move to In Review (Requires PR & Test Evidence)
```bash
python3 scripts/agentic/sync-state.py \
  --state "In Review" \
  --issue 101 \
  --pr-url "https://github.com/kopkar-xyz/kopkarsai-ecosystem/pull/1" \
  --test-evidence "All 45 backend unit tests passing"
```

### 4. Move to Done (Requires Merged PR or Approval)
```bash
python3 scripts/agentic/sync-state.py \
  --state "Done" \
  --issue 101 \
  --pr-merged
```
