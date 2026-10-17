---
trigger: model_decision
description: "Use when working on business logic, domain invariants, contract scope, requirements, screen catalogs, or referencing docs/project-knowledge."
---

# KopKar SAI — Business Knowledge & Traceability Architecture Rule

## Rule Identity
- **Activation**: **Model Decision**
- **Description**: *"Use when working on business logic, domain invariants, contract scope, requirements, screen catalogs, or referencing docs/project-knowledge."*
- **Scope**: Cross-application domain integrity, business logic implementations, and documentation synchronization.

---

## 1. Core Principle: Single Source of Truth

Seluruh perilaku bisnis, batasan fungsional, dan parameter sistem tidak boleh hanya tersimpan dalam ingatan percakapan atau kode mentah.

Direktori `docs/project-knowledge/data/` (YAML) adalah **pemegang otoritas kebenaran data (*Single Source of Truth*)**:

| Direktori Data | Otoritas Informasi |
| :--- | :--- |
| `data/requirements/requirements.yaml` | Spesifikasi kebutuhan sistem (`SH-REQ-xxx`, `KK-REQ-xxx`, `MP-REQ-xxx`, `SH-NFR-xxx`) |
| `data/features/features.yaml` | Katalog fitur resmi terhubung (`SH-FTR-xxx`, `KK-FTR-xxx`, `MP-FTR-xxx`) |
| `data/business-rules/rules.yaml` | Aturan bisnis institusional koperasi (`KK-BR-xxx`, `MP-BR-xxx`) |
| `data/decisions/decisions.yaml` | Log keputusan teknis & arsitektur resmi (`SH-DEC-xxx`, `KK-DEC-xxx`, `MP-DEC-xxx`) |
| `data/assumptions/assumptions.yaml` | Asumsi awal perencanaan teknis & operasional (`SH-ASM-xxx`) |
| `data/contract/terms.yaml` & `scope-matrix.yaml` | Batasan komersial, deliverables, dan ruang lingkup kontrak |

---

## 2. Taksonomi ID Unik & Pelacakan Entitas (*Traceability*)

Setiap entitas sistem memiliki identifier permanen yang **dilarang didaur ulang atau dihapus sepihak**:

- `KK-REQ-xxx`: Kebutuhan fungsional Koperasi (misal: `KK-REQ-001` Dual-Approval).
- `MP-REQ-xxx`: Kebutuhan fungsional Marketplace (misal: `MP-REQ-002` Same-Day Checklist).
- `SH-REQ-xxx`: Kebutuhan bersama/shared (misal: `SH-REQ-001` Shared Authentication).
- `KK-BR-xxx`: Aturan bisnis institusional (misal: `KK-BR-001` Jadwal Uji Kelayakan Sampel).
- `MP-BR-xxx`: Aturan bisnis marketplace (misal: `MP-BR-001` Pemotongan Gaji / Kuota).
- `KK-SCR-xxx` & `MP-SCR-xxx`: Katalog layar antarmuka resmi (terkunci 25 layar).
- `SH-DEC-xxx`: Architecture Decision Record.

Jika suatu entitas digantikan atau dihentikan, tandai statusnya menjadi `superseded`, `deprecated`, atau `cancelled`. **Jangan pernah menimpa ID lama dengan konsep baru.**

---

## 3. Batasan 25 Layar Antarmuka Resmi (Screen Budget)

Sesuai kesepakatan baseline `SH-DEC-008` dan kontrak resmi, pengembangan antarmuka frontend dikunci pada **25 layar resmi**:

### KOPKAR (14 Layar — `KK-SCR-001` s/d `KK-SCR-014`)
1. `KK-SCR-001`: Portal Gateway Terpadu (Single Landing Page KopKar & Marketplace)
2. `KK-SCR-002`: Formulir Registrasi Mandiri Anggota Karyawan
3. `KK-SCR-003`: Halaman Login Terpadu Akun Karyawan
4. `KK-SCR-004`: Dasbor Utama Anggota Koperasi
5. `KK-SCR-005`: Antarmuka Verifikasi Anggota Baru (Admin Toko)
6. `KK-SCR-006`: Antarmuka Persetujuan Final Anggota (Kepala Koperasi)
7. `KK-SCR-007`: Formulir Pengajuan Produk Mitra Supplier
8. `KK-SCR-008`: Manajemen Penjadwalan & Pengujian Sampel Fisik
9. `KK-SCR-009`: Log Histori & Siklus Revisi Produk Supplier
10. `KK-SCR-010`: Dasbor Rekapitulasi Pesanan Masuk Supplier
11. `KK-SCR-011`: Modul Monitoring Keaktifan & Sanksi Supplier
12. `KK-SCR-012`: Kalkulator Interaktif Simulasi Simpan Pinjam
13. `KK-SCR-013`: Pengelolaan Profil & Kontak Anggota
14. `KK-SCR-014`: Dasbor Analitik Rekomendasi Suplai Harian

### MARKETPLACE (11 Layar — `MP-SCR-001` s/d `MP-SCR-011`)
1. `MP-SCR-001`: Etalase Katalog Belanja Terpadu (Toko Fisik & Supplier ACC)
2. `MP-SCR-002`: Halaman Detail Produk & Status Ketersediaan
3. `MP-SCR-003`: Keranjang Belanja Terpisah (Same-Day vs Pre-Order H-1)
4. `MP-SCR-004`: Alur Checkout & Pemilihan Metode Pengambilan
5. `MP-SCR-005`: Unggah Bukti Transfer & Status Pembayaran
6. `MP-SCR-006`: Dasbor Verifikasi Checklist Rak Toko (Kasir / Petugas)
7. `MP-SCR-007`: Antrean Pemrosesan Pesanan Prioritas Divisi GA
8. `MP-SCR-008`: Halaman Riwayat Transaksi & Status Pesanan Konsumen
9. `MP-SCR-009`: Dasbor Rekapitulasi Penjualan & Ekspor Excel Toko
10. `MP-SCR-010`: Antarmuka Konfirmasi Penyerahan Pesanan Mandiri (Pickup)
11. `MP-SCR-011`: Pengaturan Toko & Konfigurasi Jam Operasional Kasir

> [!WARNING]
> **Dilarang Menambah Layar Baru di Luar 25 Layar Terkunci**:
> Fitur baru harus diintegrasikan ke dalam layar yang ada (melalui tab, modal, atau inline controls) kecuali jika diajukan melalui prosedur *Change Request* resmi (`data/changes/`).

---

## 4. Larangan Halusinasi & Asumsi Sepihak

1. **Status Status Requirement**:
   - Status `approved` hanya boleh disematkan jika ada bukti tertulis atau persetujuan resmi.
   - Requirement yang belum pasti wajib berstatus `proposed` atau `under_evaluation`.
2. **Aturan Bisnis Tanpa Keputusan Formal**:
   - Jika suatu aturan bisnis belum memiliki dasar SOP tertulis dari Koperasi, gunakan status `NEEDS_CLIENT_CONFIRMATION` dan catat pertanyaan terbuka pada `data/contract/open-questions.yaml` (`Q-xxx`).
