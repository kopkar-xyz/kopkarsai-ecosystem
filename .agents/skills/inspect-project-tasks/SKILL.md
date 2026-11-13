---
name: inspect-project-tasks
description: >-
  Inspect assigned developer tasks, local task branches, active worktrees, and PR review requests with offline fallback. Use at the start of a session, before choosing an issue, or to reconcile local and GitHub state.
---

# Inspect Project Tasks Runbook

Skill ini memeriksa task aktif, branch lokal, git worktree, dan issue/PR yang ditugaskan ke akun GitHub pengembang aktif (terdaftar di `.agent/developer.local.json`).

---

## Execution

```bash
# Ringkasan terformat
python scripts/agentic/tasks.py

# Output JSON
python scripts/agentic/tasks.py --json
```
*(Gunakan `python3` di Linux/macOS jika perlu.)*

---

## Behavior & Verification

- **Offline / Tanpa `gh`**: Menampilkan branch lokal berpola `{type}/{issue}-{slug}`, worktree di `.agent/worktrees/`, dan status cache `.agent/task-state.json`.
- **Online dengan `gh` terautentikasi**: Mengambil daftar GitHub Issue terbuka milik akun terdaftar di `.agent/developer.local.json` serta permintaan review PR.
- **Verifikasi**: Pastikan `Active Branch` dan daftar `Assigned GitHub Issues` sesuai dengan task yang akan dikerjakan sebelum memodifikasi kode.
