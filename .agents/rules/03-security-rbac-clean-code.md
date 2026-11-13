---
trigger: always_on
---

# KopKar SAI — Security, RBAC & Data Integrity Invariants

## 1. Multi-Role RBAC (Deny by Default)

6 peran resmi: `SUPERADMIN`, `KEPALA_KOPERASI`, `ADMIN_TOKO`, `ANGGOTA`, `SUPPLIER`, `GA`.
- **Server-Side Authorization**: Menyembunyikan UI di frontend **bukan** keamanan; setiap endpoint wajib memeriksa role/permission di sisi server (`dependencies.py`).
- **Deny by Default**: Seluruh route terlindungi kecuali endpoint publik eksplisit (`/auth/login`, `/auth/register`, gateway).

## 2. Dual-Approval Registrasi Anggota (`KK-DEC-001`)

`Register` → `PENDING_ADMIN_VERIFICATION` *(Admin Toko cek KTP & NIK)* → `PENDING_HEAD_APPROVAL` *(Kepala Koperasi approval final)* → `ACTIVE_MEMBER`.
- **Larangan Bypass**: Akun berstatus pending atau `REJECTED` **dilarang keras** diberikan akses login ke Koperasi maupun Marketplace.

## 3. Media Sensitif S3 (`SH-DEC-003` / `SH-NFR-001`)

- Simpan KTP, bukti transfer, dan foto produk di S3-compatible storage (maks. `3.0 MB`/berkas), bukan SSD lokal.
- Whitelist MIME (`image/jpeg`, `image/png`, `image/webp`) dengan validasi *magic bytes* dan `Content-Length`.
- Gunakan bucket privat + **presigned URL** berbatas waktu (15–30 menit) untuk berkas sensitif (KTP & bukti bayar).

## 4. Non-Destructive Financial Invariant (`SH-ASM-003`)

- **No Raw SQL `DELETE`** pada transaksi belanja (`orders`, `order_items`), pengajuan & uji sampel (`product_submissions`, `sample_tests`), histori keanggotaan/sanksi, verifikasi kasir, dan audit keuangan.
- Gunakan soft-delete (`is_deleted = true`, `status = CANCELLED`, `archived_at`) serta tabel audit log *append-only*.
