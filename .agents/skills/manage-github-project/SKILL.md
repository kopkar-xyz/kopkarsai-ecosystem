---
name: manage-github-project
description: >-
  Automate creation, editing, closing, linking, and status updates of GitHub Issues and Project #1 items via gh CLI with a mandatory developer review gate. Use when creating, updating, closing, or inspecting GitHub issues or Project v2 board items.
---

# Manage GitHub Project & Issues Runbook

Skill ini mengotomasi interaksi dengan GitHub Issues dan GitHub Project #1 (`kopkar-xyz/projects/1`) melalui `scripts/agentic/gh_project.py` dan `gh` CLI.

---

## ⚠️ Mandatory Rule: Developer Review Gate

**KEBIJAKAN MUTLAK:** Agen **dilarang** membuat (`create`), mengedit (`edit`), menutup (`close`), atau menghapus (`delete`) issue maupun item Project GitHub secara sepihak tanpa preview dan persetujuan eksplisit developer.

### Alur Wajib (4 Langkah):
1. **Formulasi Draf**: Susun judul, label, assignee (`<github-username>`), status, priority, dan body terstruktur (`## Summary`, `## Scope / Out of Scope`, `## Acceptance Criteria`, `## Definition of Done`).
2. **Preview Dry-Run**: Jalankan perintah dengan `--dry-run` atau tampilkan draf lengkap ke developer. *(Di PowerShell, gunakan single-quoted here-string `@' ... '@` untuk menghindari interpolasi backtick).*
3. **Minta Konfirmasi Eksplisit**: Tunggu persetujuan eksplisit developer ("Setuju", "Lanjutkan", "Approved").
4. **Eksekusi Live**: Jalankan perintah tanpa `--dry-run` hanya setelah disetujui.

---

## Execution Commands

Lihat [references/examples.md](references/examples.md) untuk contoh payload lengkap `create-issue`, `edit-issue`, `close-issue`, dan `delete-issue`.

### Read-Only Inspection & Repo Linking
```bash
# Lihat item & status Project #1
python scripts/agentic/gh_project.py view-project --owner kopkar-xyz --project 1

# Link repository ke Project #1
python scripts/agentic/gh_project.py link-repo --owner kopkar-xyz --repo kopkarsai-ecosystem --project 1
```

---

## ✅ Verification

Setelah mutasi GitHub disetujui dan dijalankan, verifikasi hasilnya:
```bash
gh issue view <issue-number> --json title,labels,assignees,state
python scripts/agentic/gh_project.py view-project --owner kopkar-xyz --project 1
```
*(Jika muncul error scope Project v2, jalankan `gh auth refresh -s project,read:project,read:org,repo`.)*
