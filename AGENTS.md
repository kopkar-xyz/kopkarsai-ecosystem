# AGENTS.md — KopKar SAI Ecosystem Core Invariants

Selamat datang di repositori ekosistem digital **KopKar SAI** (`kopkarsai-ecosystem`). Seluruh agen AI dan kontributor teknis **wajib mematuhi invariant inti berikut**:

---

## 1. Tata Kelola "One Contract — Two Applications"

Repositori ini memayungi satu kontrak kerja terpadu untuk dua aplikasi dengan backend bersama:
1. **KOPKAR (`apps/web-kopkar`)**: Sistem Koperasi Karyawan (registrasi anggota, verifikasi dual-approval, pengajuan supplier, uji sampel makanan, simulasi pinjaman).
2. **MARKETPLACE (`apps/web-marketplace`)**: Platform belanja karyawan (produk toko fisik same-day, katering PO H-1 supplier, checklist fisik kasir, antrean prioritas GA).
3. **BACKEND (`apps/backend`)**: Layanan modular monolith berbasis **FastAPI (Python)** dengan basis data PostgreSQL (`shared_auth`, `schema_kopkar`, `schema_marketplace`).

### Klasifikasi 4-Scope Wajib:
Setiap deliverable, fitur, tabel, dan perubahan kode harus memiliki klasifikasi scope yang jelas:
- `CONTRACT`: Aspek legal, komersial, termin pembayaran, dan governance.
- `SHARED`: Komponen yang benar-benar digunakan bersama (Autentikasi Nomor Karyawan, S3 Storage, Notifikasi In-App).
- `KOPKAR`: Modul fungsional Koperasi Karyawan.
- `MARKETPLACE`: Modul belanja dan kasir marketplace internal.

---

## 2. Single Source of Truth & Traceability

1. **Otoritas Data**: Submodule `docs/project-knowledge/data/` (YAML) adalah pemegang otoritas kebenaran data untuk requirements (`data/requirements/`), aturan bisnis (`data/business-rules/`), keputusan arsitektur (`data/decisions/`), dan kontrak (`data/contract/`).
2. **Taksonomi ID Permanen**: Jangan pernah mendaur ulang atau mengubah ID permanen (`KK-REQ-xxx`, `MP-REQ-xxx`, `SH-DEC-xxx`, `KK-BR-xxx`).
3. **Batasan 25 Layar Terkunci**: Pengembangan frontend terikat pada katalog 25 layar resmi (`KK-SCR-001` - `KK-SCR-014` dan `MP-SCR-001` - `MP-SCR-011`). Dilarang membuat layar tambahan tanpa prosedur Change Request formal (`data/changes/`).

---

## 3. Invariant Keamanan & Integritas Finansial

1. **Alur Dual-Approval**: Registrasi anggota baru wajib disetujui berjenjang oleh Admin Toko lalu Kepala Koperasi sebelum akun dapat login.
2. **Penyimpanan S3 Eksternal**: Berkas foto KTP, bukti pembayaran, dan gambar produk wajib disimpan di S3-compatible Object Storage (maksimal 3 MB per berkas).
3. **Larangan Hapus Finansial (*No Raw Delete*)**: Dilarang menggunakan `DELETE` pada data transaksi, pesanan, riwayat pengajuan, dan audit. Gunakan status atau soft-delete.
4. **Presisi Finansial**: Seluruh nilai uang wajib menggunakan `Numeric(15, 2)` / decimal. Dilarang menggunakan `float`.

---

## 4. Antigravity Customizations Directory

- **Rules**: [.agents/rules/](.agents/rules/)
  - `01-ecosystem-architecture.md` (Always On)
  - `02-business-knowledge-sync.md` (Model Decision)
  - `03-security-rbac-clean-code.md` (Always On)
  - `04-backend-fastapi-architecture.md` (Model Decision)
  - `05-database-and-migrations.md` (Model Decision)
  - `06-frontend-react-architecture.md` (Model Decision)
  - `07-ui-design-system.md` (Model Decision)
  - `08-qa-e2e-testing.md` (Model Decision)
- **Skills**: [.agents/skills/](.agents/skills/)
  - `backend-domain-scaffold`: Panduan pembuatan modul domain FastAPI baru.
  - `frontend-feature-scaffold`: Panduan pembuatan layar/fitur baru React TypeScript.
  - `db-migration-sync`: Panduan migrasi skema database Alembic & isolasi PostgreSQL.
  - `project-knowledge-sync`: Panduan sinkronisasi implementasi dengan spesifikasi YAML.
  - `ecosystem-monorepo-ops`: Panduan operasional dev server, seeder, dan build.
  - `playwright-e2e`: Panduan pengujian otomatis skenario bisnis kritis.
