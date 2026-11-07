# GitHub Project v2 Binding & Configuration Guide for KopKar SAI

> **Dokumen:** Panduan Pengikatan Repositori `kopkarsai-ecosystem`, GitHub Projects v2 (#1 `kopkar-sai`), dan Runtime Discord Bot.  
> **Sasaran:** Memastikan keselarasan metadata antara GitHub CLI lokal dan GitHub App pada Discord Bot.

---

## 1. Identitas Repositori & Project

- **Organisasi:** `kopkar-xyz`
- **Repositori:** `kopkar-xyz/kopkarsai-ecosystem`
- **Target Project v2:** `https://github.com/orgs/kopkar-xyz/projects/1` (Project `#1` `kopkar-sai`)
- **Project ID:** `PVT_kwDOE-J31M4BqP30`
- **Status Field ID:** `PVTSSF_lADOE-J31M4BqP30zhon1Pk`
- **Priority Field ID:** `PVTSSF_lADOE-J31M4BqP30zhon1ZI`

---

## 2. Konfigurasi Binding di Identitas Lokal (`.agent/developer.local.json`)

```json
{
  "schema_version": 1,
  "developer": {
    "display_name": "Alexander Agung",
    "github_username": "ekyaaa"
  },
  "workspace": {
    "machine_label": "dev-nobara"
  },
  "project": {
    "project_number": 1,
    "project_owner": "kopkar-xyz",
    "project_title": "kopkar-sai",
    "status_field": "Status",
    "priority_field": "Priority"
  }
}
```

---

## 3. Konfigurasi Binding di Runtime Discord Bot (`.env`)

Pada server VPS tempat bot `dc-bot-project-management` berjalan:

```ini
# Repositori
GITHUB_OWNER=kopkar-xyz
GITHUB_REPOSITORY=kopkarsai-ecosystem

# Nomor Project v2
GITHUB_PROJECT_NUMBER=1
```
