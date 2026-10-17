# Database Migration Quality Checklist

Gunakan checklist ini sebelum dan sesudah menjalankan migrasi database di `apps/backend/`.

---

## ✅ Pre-Flight Checklist (Sebelum Generate Migrasi)

- [ ] **Schema Namespace**: Apakah tabel ditempatkan pada schema yang tepat?
  - `shared_auth` untuk akun, otentikasi, peran RBAC, dan audit.
  - `schema_kopkar` untuk data keanggotaan, supplier, uji sampel, dan pinjaman.
  - `schema_marketplace` untuk katalog toko, keranjang, pesanan, checklist, dan pembayaran.
- [ ] **Tipe Data Uang**: Apakah semua nominal menggunakan `Numeric(15, 2)`? (Dilarang menggunakan `Float`).
- [ ] **Kolom Audit Wajib**: Apakah tabel menyertakan `id`, `created_at`, dan `updated_at`?
- [ ] **Soft Delete**: Jika tabel menyimpan transaksi/pesanan/approval, apakah menggunakan soft-delete / status dan bukan raw delete?
- [ ] **Foreign Key Naming**: Apakah penamaan foreign key terstruktur dan menyertakan nama schema sumber?

---

## 🔍 Migration File Review Checklist (Sebelum `upgrade head`)

- [ ] Apakah fungsi `upgrade()` menyertakan parameter `schema='...'` pada pembuatan tabel/indeks?
- [ ] Apakah fungsi `downgrade()` menghapus tabel/indeks dengan menyertakan schema yang sama?
- [ ] Apakah ada auto-generated `drop_column` yang tidak disengaja akibat model belum diimpor ke metadata Alembic?
- [ ] Apakah enum baru ditambahkan dengan aman tanpa merusak enum yang sedang digunakan?

---

## 🚀 Post-Migration Checklist

- [ ] Apakah `alembic upgrade head` berhasil dengan exit code 0?
- [ ] Apakah `alembic current` menampilkan head terbaru?
- [ ] Apakah query dasar `SELECT * FROM <schema>.<table_name> LIMIT 1;` berjalan tanpa permission issue?
