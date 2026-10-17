---
trigger: model_decision
description: "Use for database schema changes, PostgreSQL models, migrations, Alembic, schema isolation, and financial calculation invariants."
---

# KopKar SAI — Database Schema, Schema Isolation & Migrations Rule

## Rule Identity
- **Activation**: **Model Decision**
- **Description**: *"Use for database schema changes, PostgreSQL models, migrations, Alembic, schema isolation, and financial calculation invariants."*
- **Scope**: Database entities, migrations, and SQL workflows across PostgreSQL.

---

## 1. Schema Isolation Architecture

Sesuai rancangan topologi pada `docs/project-knowledge/docs/architecture/system-topology.md`, database PostgreSQL tunggal dibagi ke dalam 3 namespace/schema logis:

```text
PostgreSQL Database: kopkar_ecosystem
├── shared_auth          ──► Data akun, otentikasi, peran RBAC, dan audit log bersama
│   ├── users (nomor_karyawan, password_hash, email, phone, role, status)
│   ├── roles_permissions
│   └── audit_logs
│
├── schema_kopkar        ──► Domain Koperasi Karyawan
│   ├── member_verifications (dual-approval logs, reviewer_id, head_id)
│   ├── supplier_profiles (mitra supplier, keaktifan, komplain)
│   ├── product_submissions (usulan harga beli/jual, komposisi)
│   ├── sample_test_schedules (hari selasa/rabu, shift, hasil uji jumat)
│   └── loan_simulation_presets (suku bunga konfigurasi, parameter kalkulator)
│
└── schema_marketplace   ──► Domain Belanja & Toko
    ├── store_products (katalog toko fisik, barcode, stok rak)
    ├── supplier_acc_products (produk supplier yang lulus uji kelayakan)
    ├── orders (same-day vs pre-order H-1, priority GA flag)
    ├── order_items (kuantitas, harga, status checklist fisik)
    ├── payments (bukti transfer, kasir verifikator, nominal)
    └── store_settings (jam operasional pemesanan same-day)
```

---

## 2. Invariant Perhitungan Finansial & Tipe Data Uang

> [!CRITICAL]
> **Larangan Penggunaan Floating Point (`Float` / `Real`) untuk Uang**:
> Seluruh representasi moneter (harga beli/HPP, harga jual, total pesanan, simpanan, plafon pinjaman, angsuran bunga) **wajib menggunakan tipe data presisi tetap**:
> ```python
> from sqlalchemy import Numeric
> # Format standar: Numeric(15, 2)
> price: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False)
> ```

### Rumus Simulasi Pinjaman:
Kalkulator simulasi pinjaman (`KK-REQ-006`) wajib mendukung dua metode amortisasi standar:
1. **Bunga Flat**: Angsuran pokok dan bunga tetap setiap bulan sepanjang tenor.
2. **Bunga Menurun (Efektif/Anuitas)**: Bunga dihitung berdasarkan sisa pokok pinjaman berjalan.

---

## 3. Standar Kolom Entitas Wajib (Audit Columns)

Setiap tabel di seluruh skema wajib memiliki kolom metadata pelacakan:

```python
from datetime import datetime
from sqlalchemy import DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

class BaseAuditModel:
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )
```

---

## 4. Siklus Migrasi Basis Data (Alembic)

1. **Satu Perubahan — Satu Revisi**: Setiap perubahan pada model SQLAlchemy wajib disertai file migrasi Alembic yang dihasilkan di `apps/backend/alembic/versions/`.
2. **Reversibilitas Migrasi**: Setiap file migrasi wajib mendefinisikan fungsi `upgrade()` dan `downgrade()` secara simetris.
3. **Pemberian Nama Deskriptif**: Berikan pesan migrasi yang jelas:
   ```bash
   alembic revision --autogenerate -m "create_member_verification_and_supplier_tables"
   ```
4. **Verifikasi Constraint & Enum**: Pastikan constraint foreign key dan nilai enum terdaftar eksplisit sebelum menjalankan `alembic upgrade head`.
