---
name: backend-domain-scaffold
description: >-
  Scaffold a new FastAPI domain module in apps/backend/app/modules/ with unidirectional layers (router, schemas, service, repository, models). Use when creating or structuring a backend domain module in apps/backend.
---

# Backend Domain Module Scaffolding Runbook

Skill ini memandu pembuatan modul domain baru pada `apps/backend/app/modules/<scope>/<domain>/` (`shared`, `kopkar`, `marketplace`) dengan prinsip *unidirectional layers*.

> [!NOTE]
> **Prasyarat Codebase**: `apps/backend/` saat ini baru berisi `README.md` (belum di-scaffold). Pastikan kerangka dasar `app/main.py` dan `app/core/` sudah dibuat sebelum menambahkan modul domain.

---

## 🏗️ Struktur Standar Modul Domain

```text
apps/backend/app/modules/<scope>/<domain>/
├── __init__.py         # Ekspos router dan entitas publik modul
├── router.py           # Endpoint FastAPI APIRouter & dependency injection
├── schemas.py          # Pydantic v2 schemas (*CreateRequest, *UpdateRequest, *Response)
├── service.py          # Business rules & domain invariants
├── repository.py       # Query persistence SQLAlchemy 2.0 AsyncSession (tanpa HTTPException)
└── models.py           # Model SQLAlchemy Mapped + BaseAuditModel
```

Lihat [references/templates.md](references/templates.md) untuk template kode lengkap masing-masing file.

---

## ⚡ Langkah Eksekusi

1. **Tentukan Scope & Domain**: `app/modules/{shared|kopkar|marketplace}/<domain>/`.
2. **Buat Model (`models.py`)**: Turunkan dari `Base` dan `BaseAuditModel`, pasang `__table_args__ = {"schema": "<nama_schema>"}`, wajib `Numeric(15, 2)` untuk nominal uang, dan ekspor model agar terbaca Alembic.
3. **Definisikan Schemas (`schemas.py`)**: Pisahkan Request/Response DTOs dengan `ConfigDict(from_attributes=True)`; jangan ekspos `password_hash` atau atribut sensitif.
4. **Tulis Repository (`repository.py`)**: Gunakan SQLAlchemy 2.0 `select()` dengan `AsyncSession`; gunakan status/soft-delete (no raw `DELETE` pada transaksi/audit).
5. **Implementasikan Service (`service.py`)**: Validasi aturan bisnis & lempar custom exception dari `app/core/exceptions.py`.
6. **Ekspos Router (`router.py`) & Daftarkan di `app/main.py`**: Pasang `Depends(get_db)`, `Depends(get_current_active_user)`, serta `require_roles(...)`, lalu `app.include_router(..., prefix="/api/v1")`.

---

## ✅ Verification

Setelah modul selesai dibuat (ketika runtime `apps/backend` sudah tersedia):
```bash
cd apps/backend
python -c "from app.main import app; print(len(app.routes))"
pytest
```
Pastikan endpoint baru muncul di OpenAPI Swagger (`/docs`) dan seluruh unit/integration test lulus.
