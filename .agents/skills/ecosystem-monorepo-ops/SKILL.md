---
name: ecosystem-monorepo-ops
description: >-
  Execute monorepo developer workflows: local dev servers, database seeders for multi-role test users, linting, and build verification.
---

# KopKar SAI Monorepo Operations Runbook

Skill ini memandu pengelolaan alur kerja operasional pengembang lokal, menjalankan server pengembangan (`backend`, `web-kopkar`, `web-marketplace`), pengisian data awal (*database seeders*), dan verifikasi kompilasi kode.

---

## ⚡ Alokasi Port Lokal & Service Mapping

```text
┌─────────────────────────┬───────────────┬───────────────────────────────┐
│ Service                 │ Port Lokal    │ Keterangan                    │
├─────────────────────────┼───────────────┼───────────────────────────────┤
│ Backend API (FastAPI)   │ http://:8000  │ Swagger UI di /docs           │
│ Web KopKar (React)      │ http://:5173  │ Portal Koperasi Karyawan      │
│ Web Marketplace (React) │ http://:5174  │ Marketplace Belanja Karyawan  │
│ PostgreSQL Database     │ localhost:5432│ DB kopkar_ecosystem           │
└─────────────────────────┴───────────────┴───────────────────────────────┘
```

Lihat [references/cheatsheet.md](references/cheatsheet.md) untuk kredensial default seeder dan variabel lingkungan.

---

## 🚀 Menjalankan Server Pengembangan

### 1. Backend FastAPI (`apps/backend`)
```bash
cd apps/backend
# Menggunakan virtualenv Python
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Web KopKar (`apps/web-kopkar`)
```bash
cd apps/web-kopkar
npm run dev -- --port 5173
```

### 3. Frontend Web Marketplace (`apps/web-marketplace`)
```bash
cd apps/web-marketplace
npm run dev -- --port 5174
```

---

## 👥 Menjalankan Seeder Data Pengguna & Peran

Untuk memverifikasi alur multi-role secara cepat tanpa registrasi manual berulang:

```bash
cd apps/backend
python3 -m app.scripts.seed_users
```

Seeder akan membuat akun uji untuk masing-masing peran:
- `superadmin`: Akses penuh kontrol sistem.
- `kepala_koperasi`: Otoritas approval final.
- `admin_toko`: Otoritas verifikasi tahap 1 & kasir checklist.
- `anggota_biasa`: Akun karyawan aktif berbelanja.
- `supplier_mitra`: Anggota dengan produk katering terverifikasi.
- `ga_officer`: Akun prioritas antrean pesanan General Affairs.

---

## 🧪 Linting & Quality Checks

```bash
# Backend Type Check & Lint
cd apps/backend && ruff check . && mypy app/

# Frontend Type Check & Lint
cd apps/web-kopkar && npm run lint
cd apps/web-marketplace && npm run lint
```
