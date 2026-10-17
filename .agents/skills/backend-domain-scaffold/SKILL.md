---
name: backend-domain-scaffold
description: >-
  Scaffold a new domain module in apps/backend/app/modules/ with clean unidirectional layers (router, schemas, service, repository, models).
---

# Backend Domain Module Scaffolding Runbook

Skill ini memandu proses pembuatan modul domain baru pada `apps/backend/app/modules/<scope>/<domain>/` (misal: `kopkar/membership`, `marketplace/orders`, atau `shared/auth`) dengan mematuhi prinsip arsitektur satu arah (*unidirectional layers*).

---

## 🏗️ Struktur Standar Modul Domain

Setiap modul domain wajib dienkapsulasi dengan struktur 5 berkas utama:

```text
apps/backend/app/modules/<scope>/<domain>/
├── __init__.py         # Ekspos router dan entitas publik modul
├── router.py           # Definisi endpoint FastAPI APIRouter & HTTP parameter
├── schemas.py          # Pydantic v2 schemas (Request DTOs, Response DTOs)
├── service.py          # Otoritatif use-case execution & aturan bisnis
├── repository.py       # Operasi persistence SQLAlchemy 2.0
└── models.py           # Model database SQLAlchemy Mapped
```

Lihat [references/templates.md](references/templates.md) untuk template kode lengkap masing-masing file.

---

## ⚡ Langkah Eksekusi (Step-by-Step)

### Langkah 1: Tentukan Scope & Domain
Tentukan apakah modul berada di:
- `app/modules/shared/<domain>/` (Shared Auth, Notifikasi In-App)
- `app/modules/kopkar/<domain>/` (Keanggotaan, Supplier, Uji Sampel, Simulasi Pinjaman)
- `app/modules/marketplace/<domain>/` (Katalog, Keranjang/Pesanan, Checklist Fisik Kasir, Antrean GA)

### Langkah 2: Buat Model Database (`models.py`)
1. Turunkan model dari `Base` dan `BaseAuditModel` (`id`, `created_at`, `updated_at`).
2. Pastikan penamaan skema PostgreSQL sesuai (`schema="schema_kopkar"` atau `schema="schema_marketplace"`).
3. Gunakan `Numeric(15, 2)` untuk field nominal uang.
4. Jangan lupa ekspor model di `app/core/database.py` atau `app/models/__init__.py` agar terdeteksi oleh Alembic.

### Langkah 3: Definisikan Pydantic Schemas (`schemas.py`)
1. Buat DTO terpisah untuk pembuatan (`<Entity>CreateRequest`), pembaruan (`<Entity>UpdateRequest`), dan pembacaan (`<Entity>Response`).
2. Pasang `model_config = ConfigDict(from_attributes=True)` pada response schema.
3. Hindari memaparkan atribut internal (`password_hash`, flag sensitif).

### Langkah 4: Tulis Lapisan Akses Data (`repository.py`)
1. Gunakan SQLAlchemy 2.0 `select()` syntax dengan `AsyncSession`.
2. Tulis metode spesifik (misal: `get_by_id`, `list_with_filter`, `create`, `soft_delete`).
3. Dilarang melempar `HTTPException` pada repository. Kembalikan `None` atau entitas.

### Langkah 5: Implementasikan Logika Bisnis (`service.py`)
1. Validasi seluruh *business rules* dan *domain invariants* di lapisan ini.
2. Jika terjadi pelanggaran aturan, lempar custom domain exception dari `app/core/exceptions.py`.
3. Kelola commit transaksi atau panggil background task (misal: pengiriman notifikasi in-app / email).

### Langkah 6: Ekspos Endpoint HTTP (`router.py`)
1. Buat `APIRouter(prefix="/<domain>", tags=["<Scope> - <Domain>"])`.
2. Gunakan dependency injection `Depends(get_db)` dan `Depends(get_current_active_user)`.
3. Verifikasi role pengguna menggunakan guard dependency jika endpoint memerlukan otoritas khusus (`require_roles([RoleEnum.ADMIN_TOKO, RoleEnum.KEPALA_KOPERASI])`).

### Langkah 7: Daftarkan Router pada `app/main.py`
Tambahkan router baru ke pipeline aplikasi FastAPI:
```python
app.include_router(new_domain_router, prefix="/api/v1")
```
