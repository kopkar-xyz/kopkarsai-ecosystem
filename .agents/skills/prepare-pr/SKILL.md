---
name: prepare-pr
description: >-
  Validate branch naming, clean working tree, execute local tests, and format a Pull Request body matching .github/PULL_REQUEST_TEMPLATE.md. Use when finalizing a task branch and preparing a Pull Request to main.
---

# Prepare PR Runbook

Skill ini memvalidasi kesiapan branch lokal sebelum membuat Pull Request, menjalankan test verifikasi, dan menyusun deskripsi PR dengan referensi `Closes #<issue>`.

---

## Execution

```bash
# 1. Dry-Run PR Preparation (contoh dengan test agentic yang aktif saat ini)
python scripts/agentic/prepare_pr.py \
  --test-cmd "python -m unittest discover -s tests/agentic" \
  --dry-run

# 2. Standard PR Preparation (atau untuk build frontend)
python scripts/agentic/prepare_pr.py \
  --test-cmd "pnpm --dir apps/web-kopkar build"
```
*(Gunakan `python3` di Linux/macOS jika perlu; gunakan `pytest apps/backend/tests` setelah backend di-scaffold.)*

---

## ✅ Verification & Create PR

1. Pastikan working tree bersih (`git status`) dan branch mengikuti `{type}/{issue}-{slug}`.
2. Setelah mendapat review & persetujuan developer, buat PR dengan `gh` CLI menggunakan body yang dihasilkan dan verifikasi hasilnya:
```bash
gh pr create --base main --head "$(git branch --show-current)" --title "<pr-title>" --body "<pr-body>"
gh pr view --web
```
