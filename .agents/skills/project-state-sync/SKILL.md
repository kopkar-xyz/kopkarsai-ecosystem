---
name: project-state-sync
description: Synchronize task status and GitHub Project v2 based on verifiable evidence (branches, tests, PRs, unblock notes).
---

# Project State Sync Runbook (Alias for sync-project-state)

This skill validates concrete evidence before updating a task's state in `.agent/task-state.json` and the bound GitHub Project #1 (`kopkar-sai`).

## Execution

```bash
python3 scripts/agentic/sync-state.py \
  --state "In Progress" \
  --issue 101
```
