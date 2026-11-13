---
name: ecosystem-monorepo-ops
description: >-
  Execute monorepo developer workflows for dev servers, builds, and environment setup. Use when starting local services, checking port allocations, or running verification builds across KopKar, Gateway, Marketplace, and Backend.
---

# KopKar SAI Monorepo Operations Runbook

Skill ini memandu pengelolaan server pengembangan lokal dan verifikasi build pada monorepo `kopkarsai-ecosystem`.

---

## ⚡ Alokasi Port & Status Layanan Saat Ini

| Service | Port Lokal | Status Codebase | Package Manager / Runtime |
| :--- | :--- | :--- | :--- |
| Web KopKar (`apps/web-kopkar`) | `http://localhost:5173` | **Current (Prototype UI)** | `pnpm` |
| Web Marketplace (`apps/web-marketplace`) | `http://localhost:5174` | **Target (Baru `README.md`)** | `pnpm` (planned) |
| Web Gateway (`apps/web-gateway`) | `http://localhost:5175` | **Current (Implemented)** | `pnpm` / `npm` |
| Backend API (`apps/backend`) | `http://localhost:8000` | **Target (Baru `README.md`)** | Python 3.12+ (planned) |
| PostgreSQL Database | `localhost:5432` | Infrastruktur Target | PostgreSQL 16 |

Lihat [references/cheatsheet.md](references/cheatsheet.md) untuk daftar kredensial seeder target dan variabel lingkungan `.env` backend.

---

## 🚀 Menjalankan Layanan yang Sudah Tersedia (Current)

### 1. Frontend Web KopKar (`apps/web-kopkar`)
```bash
pnpm --dir apps/web-kopkar install
pnpm --dir apps/web-kopkar dev --port 5173
```

### 2. Frontend Web Gateway (`apps/web-gateway`)
```bash
pnpm --dir apps/web-gateway install
pnpm --dir apps/web-gateway dev
```
*(Port default Vite sudah diset ke `5175` di `apps/web-gateway/package.json`.)*

---

## 🧱 Layanan Target (Setelah Di-Scaffold)

### 1. Backend FastAPI (`apps/backend`)
*(Berlaku setelah `apps/backend/app/main.py` dan `.venv` di-scaffold.)*
```powershell
# Windows PowerShell
cd apps/backend
.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```
```bash
# POSIX (Linux/macOS)
cd apps/backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```
Seeder & lint backend target (setelah modul tersedia): `python -m app.scripts.seed_users`, `ruff check .`, `mypy app/`.

### 2. Frontend Web Marketplace (`apps/web-marketplace`)
*(Berlaku setelah `apps/web-marketplace/package.json` dan `src/` di-scaffold.)*
```bash
pnpm --dir apps/web-marketplace dev --port 5174
```

---

## ✅ Verification (Build & Checks)

Jalankan perintah berikut untuk memverifikasi build frontend dan tooling agentic yang aktif saat ini:
```bash
pnpm --dir apps/web-kopkar build
pnpm --dir apps/web-gateway build
python -m unittest discover -s tests/agentic -p "test_*.py" -v
```
*(Catatan: `apps/web-kopkar` dan `apps/web-gateway` saat ini memiliki script `dev`, `build`, dan `preview`; belum ada script `lint` di `package.json`.)*
