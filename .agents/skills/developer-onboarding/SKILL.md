---
name: developer-onboarding
description: >-
  Initialize and validate local developer identity (.agent/developer.local.json) and run preflight environment diagnostics for KopKar SAI. Use when onboarding a new workstation, fixing missing identity files, or checking local/GitHub CLI readiness.
---

# Developer Onboarding & Preflight Runbook

Skill ini menginisialisasi identitas pengembang lokal (`.agent/developer.local.json`, gitignored) dan memvalidasi kesiapan environment lokal maupun GitHub CLI (`gh`).

*(Gunakan `python` di Windows atau `python3` di Linux/macOS.)*

---

## 1. Setup Identitas Lokal

### Non-Interactive Setup
```bash
python scripts/agentic/bootstrap.py \
  --display-name "<Display Name>" \
  --github-username "<github-username>" \
  --email "<email@domain>" \
  --machine-label "<machine-label>" \
  --project-number 1 \
  --project-owner "kopkar-xyz" \
  --project-title "kopkar-sai" \
  --non-interactive
```

### Interactive Setup
```bash
python scripts/agentic/bootstrap.py
```

---

## 2. Diagnostics & Preflight Healthcheck

```bash
python scripts/agentic/doctor.py
```

Opsi tambahan:
- `--json`: Output terstruktur dalam format JSON.
- `--strict`: Menganggap warning sebagai kegagalan (*blocker*).
- `--quiet`: Hanya menampilkan item yang perlu perbaikan.

---

## ✅ Verification & Interpretasi Output

Pastikan `doctor.py` menampilkan `Local Environment: ✅ LOCAL_READY` dan periksa arti tiap status:
- `PASS`: Konfigurasi valid dan siap digunakan.
- `PENDING_CONFIGURATION`: Item opsional/remote belum terikat (misal belum login `gh` atau belum terhubung ke Project `#1`).
- `WARN`: Non-blocking, tetapi perlu perhatian (misal akun `gh` berbeda dengan `github_username` lokal).
- `FAIL`: Blocker lokal (misal `.agent/developer.local.json` hilang/rusak atau tidak ter-gitignore) — ikuti instruksi `Fix:` yang dicetak oleh `doctor.py`.
