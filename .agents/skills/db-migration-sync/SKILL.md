---
name: db-migration-sync
description: >-
  Execute PostgreSQL schema changes, generate Alembic migrations, verify schema namespace isolation, and enforce non-negotiable financial precision invariants.
---

# Database Migration & Schema Invariants Runbook

Skill ini memandu proses modifikasi tabel, pembuatan revisi Alembic, dan verifikasi kepatuhan isolasi namespace basis data (`shared_auth`, `schema_kopkar`, `schema_marketplace`) di `apps/backend/`.

---

## ⚡ 5-Step Execution Workflow

```text
[1. Update Models] ──► [2. Generate Alembic] ──► [3. Invariant Review] ──► [4. Apply & Test] ──► [5. Confirm]
```

### Langkah 1: Modifikasi Model SQLAlchemy
1. Tambahkan atau modifikasi model pada `apps/backend/app/modules/<scope>/<domain>/models.py`.
2. Pastikan `__table_args__ = {"schema": "<nama_schema>"}` terpasang dengan benar.
3. Seluruh atribut moneter (harga, saldo, kuota, simpanan) **wajib menggunakan `Numeric(15, 2)`**.
4. Periksa [references/checklist.md](references/checklist.md) sebelum melanjutkan.

### Langkah 2: Buat Revisi Alembic Otomatis
Jalankan perintah pembuatan migrasi:
```bash
cd apps/backend && alembic revision --autogenerate -m "deskripsi_perubahan_tabel"
```

### Langkah 3: Review File Migrasi (`alembic/versions/*.py`)
Buka file migrasi yang baru dibuat dan verifikasi:
1. Namespace schema terdaftar pada operasi `op.create_table(..., schema='schema_kopkar')`.
2. Fungsi `upgrade()` dan `downgrade()` bersifat simetris (dapat di-rollback tanpa error).
3. Tidak ada operasi `drop_table` atau `drop_column` tanpa justifikasi migrasi data formal.

### Langkah 4: Terapkan Migrasi ke Database Lokal
```bash
cd apps/backend && alembic upgrade head
```

### Langkah 5: Uji Status & Rollback
Uji kemampuan rollback untuk menjamin migrasi bersih:
```bash
# Rollback 1 revisi
alembic downgrade -1

# Terapkan kembali ke versi terbaru
alembic upgrade head
```
