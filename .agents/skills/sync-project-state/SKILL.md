---
name: sync-project-state
description: >-
  Synchronize task status in .agent/task-state.json and GitHub Project #1 based on verifiable evidence (branches, tests, PRs, unblock notes). Use when moving a task to In Progress, Blocked, In Review, or Done.
---

# Sync Project State Runbook

Skill ini memvalidasi bukti konkret sebelum memperbarui status task di `.agent/task-state.json` dan GitHub Project #1 (`kopkar-sai`).

> [!IMPORTANT]
> **Developer Review Gate**: Mutasi status terminal (menutup ke `Done`) atau perubahan issue GitHub wajib didahului review dan persetujuan eksplisit developer.

## Status Machine

`Backlog` ➔ `Ready` ➔ `In Progress` ➔ `In Review` ➔ `Done` *(Terminal)*
*(Status `Blocked` bersifat dua arah dengan `Backlog`, `Ready`, `In Progress`, dan `In Review`.)*

---

## Execution

```bash
# 1. Pindah ke In Progress (memerlukan branch aktif sesuai konvensi)
python scripts/agentic/sync_state.py --state "In Progress" --issue 101

# 2. Tandai Blocked (memerlukan alasan >= 3 karakter)
python scripts/agentic/sync_state.py --state "Blocked" --issue 101 --blocker-reason "Menunggu skema database Dual-Approval"

# 3. Pindah ke In Review (memerlukan PR URL & bukti test)
python scripts/agentic/sync_state.py --state "In Review" --issue 101 \
  --pr-url "https://github.com/kopkar-xyz/kopkarsai-ecosystem/pull/1" \
  --test-evidence "All tests passing"

# 4. Pindah ke Done (memerlukan PR merged atau approval eksplisit)
python scripts/agentic/sync_state.py --state "Done" --issue 101 --pr-merged
```
*(Gunakan `python3` di Linux/macOS jika perlu.)*

---

## ✅ Verification

Periksa status cache lokal dan ringkasan task setelah sinkronisasi:
```bash
python scripts/agentic/tasks.py
```
