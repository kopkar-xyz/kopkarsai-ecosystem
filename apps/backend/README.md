# KopKar SAI — Backend Modular Service (`apps/backend`)

Layanan API backend terpadu untuk ekosistem digital **Koperasi Karyawan PT SAI (KOPKARSAI)** yang melayani dua aplikasi frontend: **Web KOPKAR** dan **Web MARKETPLACE**.

---

## 1. Arsitektur & Teknologi

* **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.12+)
* **Database Engine:** PostgreSQL 16 dengan isolasi multi-skema
* **ORM & Migrasi:** SQLAlchemy 2.0 (Async) + Alembic
* **Validasi Skema:** Pydantic v2
* **Penyimpanan Berkas:** S3-compatible Object Storage (Biznet NEO) via Presigned URL (Maks. 3 MB/berkas)
* **Keamanan & Auth:** JWT Bearer Token, Password Hashing (`bcrypt`), Multi-Role RBAC

---

## 2. Partisi Skema Basis Data (Namespace Isolation)

Sesuai aturan arsitektur `05-database-and-migrations.md` dan `SH-DEC-001`:

```text
PostgreSQL: kopkar_db
├── shared_auth          ──► Akun Karyawan terpadu (NIK, password, status, role, audit log)
├── schema_kopkar        ──► Simpan pinjam, pendaftaran anggota, uji sampel supplier, analitik suplai
└── schema_marketplace   ──► Produk toko fisik, katering H-1, pesanan, verifikasi kasir, antrean GA
```

---

## 3. Cakupan Modul Domain

```text
app/
├── core/                    # Konfigurasi env, database engine, security JWT, S3 client
├── dependencies/            # Dependency injection: get_db, require_role, get_current_user
├── modules/
│   ├── auth/                # Login NIK, register anggota (Dual-Approval KK-DEC-001)
│   ├── kopkar/
│   │   ├── membership/      # Verifikasi berkas KTP anggota (Admin Toko -> Kepala Koperasi)
│   │   ├── financial/       # Perhitungan simulasi pinjaman (KK-DEC-002), struktur simpanan
│   │   └── supplier/        # Pengajuan kurasi sampel makanan (KK-DEC-003), analitik suplai
│   └── marketplace/
│       ├── catalog/         # Produk toko fisik same-day & katering basah PO H-1
│       ├── orders/          # Pemesanan, checklist fisik etalase kasir (MP-DEC-001)
│       └── priority/        # Antrean prioritas General Affairs (MP-DEC-002)
└── main.py                  # FastAPI Application Entrypoint
```

---

## 4. Panduan Memulai Cepat (Local Development)

### Prasyarat
* Python 3.12+
* PostgreSQL 16+ berjalan di lokal atau Docker
* pnpm / uv / pip

### Instalasi & Menjalankan Service
```bash
# Pindah ke direktori backend
cd apps/backend

# Buat virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Instal dependensi
pip install -r requirements.txt

# Salin konfigurasi environment
cp .env.example .env

# Jalankan migrasi basis data
alembic upgrade head

# Jalankan server pengembangan
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Dokumentasi interaktif OpenAPI Swagger UI dapat diakses di: `http://localhost:8000/docs`.

---

## 5. Invariant Keamanan & Integritas Finansial
1. **Presisi Finansial:** Seluruh perhitungan uang menggunakan `Numeric(15, 2)` / `Decimal`. Dilarang menggunakan tipe data `float`.
2. **Larangan Hapus Finansial (*No Raw Delete*):** Dilarang menghapus riwayat transaksi belanja dan pengajuan supplier dengan `DELETE`. Gunakan soft-delete atau status penandaan.
3. **Penyimpanan Eksternal S3:** Berkas foto KTP dan sampel produk tidak disimpan di server lokal, melainkan diunggah ke S3-compatible Object Storage dengan URL presigned berbatas waktu.
