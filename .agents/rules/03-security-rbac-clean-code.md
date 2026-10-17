---
trigger: always_on
---

# KopKar SAI — Security, RBAC & Clean Code Invariants

## Rule Identity
- **Activation**: **Always On**
- **Scope**: Every backend endpoint, frontend component, authentication flow, and data persistence operation across `kopkarsai-ecosystem`.
- **Precedence**: Security and data protection take precedence over feature convenience.

---

## 1. Multi-Role RBAC Model

Sistem mengadopsi struktur hak akses berbasis peran (*Role-Based Access Control*) terpadu untuk `apps/web-kopkar` dan `apps/web-marketplace`:

```text
┌─────────────────┬────────────────────────────────────────────────────────────┐
│ Role            │ Cakupan Otoritas                                           │
├─────────────────┼────────────────────────────────────────────────────────────┤
│ SUPERADMIN      │ Akses penuh konfigurasi sistem, audit log, manajemen user  │
│ KEPALA_KOPERASI │ Otoritas approval final anggota, kebijakan pinjaman, sanksi│
│ ADMIN_TOKO      │ Verifikasi tahap 1 anggota, checklist rak toko, kasir      │
│ ANGGOTA         │ Akses portal anggota, kalkulator pinjaman, belanja belanja │
│ SUPPLIER        │ Anggota terverifikasi yang mengajukan produk & suplai PO   │
│ GA (Gen.Affairs)│ Anggota dengan prioritas antrean pesanan khusus kantor     │
└─────────────────┴────────────────────────────────────────────────────────────┘
```

### Invariants Autorisasi:
1. **Server-Side Authorization Required**: Frontend UI hiding (misal: menyembunyikan tombol verifikasi dari anggota biasa) **BUKAN** mekanisme keamanan. Setiap endpoint API wajib memverifikasi permission token secara independen di sisi server (`dependencies.py`).
2. **Deny by Default**: Seluruh route API terlindungi secara default, kecuali route publik yang secara eksplisit dinyatakan terbuka (misal: `/auth/login`, `/auth/register`, portal gateway landing page).

---

## 2. Invariant Dual-Approval Registrasi Anggota (`KK-DEC-001`)

Alur registrasi mandiri anggota koperasi mematuhi tata kelola verifikasi bertahap:

```text
[Karyawan Register] ──► Status: PENDING_ADMIN_VERIFICATION
                                │
                                ▼
                       (Admin Toko Verifikasi KTP & Data Karyawan)
                                │
                                ▼ Status: PENDING_HEAD_APPROVAL
                                │
                                ▼
                       (Kepala Koperasi Berikan Persetujuan Final)
                                │
                                ▼ Status: ACTIVE_MEMBER
                                │
                    [Bisa Login & Berbelanja di Marketplace]
```

> [!CRITICAL]
> **Larangan Bypass Aktivasi**:
> Akun yang belum berstatus `ACTIVE_MEMBER` (masih pending atau berstatus `REJECTED`) **dilarang keras diberikan hak akses login** ke dalam sistem belanja Marketplace atau modul internal Koperasi.

---

## 3. Tata Kelola Media & Berkas Sensitif (S3 Object Storage)

Sesuai `SH-DEC-003` dan `SH-NFR-001`:

1. **Penyimpanan Eksternal**: Berkas foto KTP, bukti transfer pembayaran, dan foto sampel produk **wajib disimpan di Object Storage S3-compatible**. Dilarang menyimpan file mentah di SSD VPS lokal.
2. **Batas Ukuran Berkas**: Maksimal **3.0 MB per berkas**. Backend wajib memvalidasi Content-Length sebelum pemrosesan.
3. **MIME-Type & Extension Whitelist**: Hanya izinkan format gambar terverifikasi (`image/jpeg`, `image/png`, `image/webp`). Validasi magic bytes, bukan sekadar ekstensi nama berkas.
4. **Presigned URL**: Akses ke berkas sensitif (KTP dan bukti transfer) wajib menggunakan presigned URL berdurasi terbatas (misal: 15–30 menit). Dilarang menjadikan bucket penyimpanan berkas publik secara bebas.

---

## 4. Integritas Data & Larangan Penghapusan Finansial (*Non-Destructive Invariant*)

Sesuai `SH-ASM-003` dan kepatuhan audit UU Dokumen Perusahaan:

1. **No Raw SQL `DELETE`**:
   Dilarang keras mengeksekusi operasi `DELETE` permanen pada data operasional:
   - Catatan transaksi belanja (`orders`, `order_items`).
   - Riwayat pengajuan produk & pengujian sampel supplier (`product_submissions`, `sample_tests`).
   - Log histori status keanggotaan dan sanksi.
   - Catatan verifikasi kasir dan audit keuangan.
2. **Soft Deletes & Event Logs**: Gunakan status penandaan (`is_deleted = true`, `status = CANCELLED`, `archived_at`) dan tabel audit log berbasis event (*append-only*).

---

## 5. Clean Code & Boundary Protection

1. **Validasi Skema Masukan**: Seluruh masukan payload HTTP wajib divalidasi oleh skema Pydantic v2. Jangan pernah mempercayai data masukan pengguna atau query parameter tanpa validasi tipe.
2. **Output Minimization**: Respons API tidak boleh mengekspos field rahasia (`password_hash`, secret keys, internal server filepaths, exception traceback).
3. **Password Security**: Gunakan algoritma hashing standar industri (`bcrypt` atau `argon2id`). Dilarang menyimpan password dalam format plain-text atau hash usang (MD5/SHA1).
