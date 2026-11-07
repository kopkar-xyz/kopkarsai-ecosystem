---
name: manage-github-project
description: Automate creation, management, linking, and status updates of GitHub Issues and Project v2 items natively using the host GitHub CLI, with mandatory developer review before any issue mutations.
---

# Manage GitHub Project & Issues Runbook

This skill automates interactions with GitHub Issues and GitHub Project #1 (`https://github.com/orgs/kopkar-xyz/projects/1`) using native `gh` commands without requiring manual web UI interaction.

---

## ⚠️ Mandatory Rule: Developer Review Gate (Aturan Wajib Review Developer)

> **KEBIJAKAN MUTLAK:** AI agent **DILARANG KERAS** menambah (create), mengedit (edit/update), menutup (close), atau menghapus (delete) issue maupun item Project GitHub secara sepihak/otomatis tanpa meminta developer mereview dan memberikan konfirmasi terlebih dahulu.

### Alur Wajib (4 Langkah):

1. **Formulasi Draf (Drafting)**:
   - Siapkan rincian lengkap issue sesuai format standar repositori (`## Summary`, `## Scope / Out of Scope`, `## Acceptance Criteria`, `## Definition of Done`, label/type, assignee, initial status, priority).
   - Untuk edit/hapus/tutup: siapkan nomor issue target dan parameter spesifik yang akan diubah beserta alasannya.
2. **Tampilkan Preview Draf / Dry-Run**:
   - Tampilkan draf lengkap secara terstruktur kepada developer di chat, atau jalankan perintah dengan opsi `--dry-run` untuk memperlihatkan muatan persis yang akan dikirim ke GitHub.
3. **Minta Konfirmasi Developer (Explicit Prompt)**:
   - Tanyakan secara eksplisit kepada developer untuk mereview dan memberikan persetujuan:
     > *"Silakan review draf issue di atas sebelum saya eksekusi ke GitHub. Apakah rincian ini sudah sesuai atau ada yang perlu diperbaiki?"*
4. **Eksekusi Hanya Setelah Disetujui (Approved Execution)**:
   - Jalankan perintah live (tanpa `--dry-run`) **HANYA SETELAH** developer menyatakan persetujuan secara eksplisit (misal: "Setuju", "Lanjutkan", "Oke", "Approved").

---

## When to Use

- Ketika developer meminta untuk membuat issue, bugfix, feature, chore, atau task baru.
- Ketika developer meminta untuk mengedit title, body, label, atau assignee issue yang sudah ada.
- Ketika developer meminta untuk menutup atau menghapus issue di GitHub.
- Ketika menghubungkan repository `kopkarsai-ecosystem` ke Project #1.
- Ketika menginspeksi atau membaca board item pada Project #1.

---

## Execution Procedures

### 1. Menambah Issue Baru (Create Issue)

#### Langkah 1 (Review Phase - Jalankan Dry-Run):
```bash
python3 scripts/agentic/gh_project.py create-issue \
  --title "Implement Dual-Approval Verification Backend" \
  --type feat \
  --status Ready \
  --priority High \
  --assignee ekyaaa \
  --body "## Summary
Backend endpoint for two-tier member verification (Admin Toko -> Kepala Koperasi).

## Acceptance Criteria
- [ ] Admin Toko can verify KTP
- [ ] Kepala Koperasi gives final approval
- [ ] Non-active member cannot login

## Definition of Done
- Code reviewed and tests passing" \
  --dry-run
```
*Tampilkan output draf kepada developer dan tunggu konfirmasi.*

#### Langkah 2 (Execution Phase - Setelah Developer Setuju):
```bash
python3 scripts/agentic/gh_project.py create-issue \
  --title "Implement Dual-Approval Verification Backend" \
  --type feat \
  --status Ready \
  --priority High \
  --assignee ekyaaa \
  --body "## Summary
Backend endpoint for two-tier member verification (Admin Toko -> Kepala Koperasi).

## Acceptance Criteria
- [ ] Admin Toko can verify KTP
- [ ] Kepala Koperasi gives final approval
- [ ] Non-active member cannot login

## Definition of Done
- Code reviewed and tests passing"
```

---

### 2. Mengedit Issue yang Ada (Edit Issue)

#### Langkah 1 (Review Phase - Jalankan Dry-Run):
```bash
python3 scripts/agentic/gh_project.py edit-issue \
  --issue 101 \
  --title "Updated Title" \
  --add-label "backend" \
  --dry-run
```

#### Langkah 2 (Execution Phase - Setelah Developer Setuju):
```bash
python3 scripts/agentic/gh_project.py edit-issue \
  --issue 101 \
  --title "Updated Title" \
  --add-label "backend"
```

---

### 3. Menutup Issue (Close Issue)

#### Langkah 1 (Review Phase - Jalankan Dry-Run):
```bash
python3 scripts/agentic/gh_project.py close-issue \
  --issue 101 \
  --comment "Resolved via PR #10" \
  --reason completed \
  --dry-run
```

#### Langkah 2 (Execution Phase - Setelah Developer Setuju):
```bash
python3 scripts/agentic/gh_project.py close-issue \
  --issue 101 \
  --comment "Resolved via PR #10" \
  --reason completed
```

---

### 4. Menghapus Issue (Delete Issue)

> [!CAUTION]
> Menghapus issue bersifat destruktif dan permanen. Pastikan developer secara sadar dan eksplisit menginstruksikan penghapusan.

```bash
python3 scripts/agentic/gh_project.py delete-issue \
  --issue 101 \
  --dry-run
```

---

### 5. Link Repository ke Project #1

```bash
python3 scripts/agentic/gh_project.py link-repo \
  --owner kopkar-xyz \
  --repo kopkarsai-ecosystem \
  --project 1
```

---

### 6. Melihat Item & Status Project #1 (Read-Only)

```bash
python3 scripts/agentic/gh_project.py view-project \
  --owner kopkar-xyz \
  --project 1
```
