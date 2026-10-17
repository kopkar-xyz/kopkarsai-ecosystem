---
trigger: always_on
---

# KopKar SAI Ecosystem — Monorepo Architecture & System Boundaries

## Rule Identity
- **Activation**: **Always On**
- **Scope**: Entire repository (`kopkarsai-ecosystem`)
- **Governs**: System boundaries, monorepo layout, domain partitions, and interaction with documentation submodule.

---

## 1. Product Context & Core Mandate

The **KopKar SAI Digital Ecosystem** is developed under a **"One Contract — Two Applications"** governance model for Koperasi Karyawan PT SAI:

1. **KOPKAR (`apps/web-kopkar`)**:
   Sistem Koperasi Karyawan berbasis web untuk registrasi mandiri anggota, verifikasi *Dual-Approval*, pendaftaran & uji kelayakan sampel supplier, kalkulator simulasi angsuran & simpanan, serta dasbor analitik rekomendasi suplai terpusat.
2. **MARKETPLACE (`apps/web-marketplace`)**:
   Platform belanja internal khusus karyawan untuk produk fisik toko fisik koperasi (same-day dengan verifikasi checklist rak toko) dan produk katering basah supplier (pre-order H-1 dengan alur konfirmasi WhatsApp), dilengkapi antrean prioritas pemrosesan bagi divisi General Affairs (GA).
3. **BACKEND SERVICE (`apps/backend`)**:
   Layanan API modular berbasis **FastAPI (Python)** yang mengelola autentikasi terpadu (Nomor Karyawan & Password), otorisasi RBAC berjenjang, logika bisnis domain koperasi & marketplace, integrasi penyimpanan berkas S3-compatible, serta pencatatan audit finansial.

---

## 2. Strict Domain & Scope Partitioning

Setiap entitas, requirement, modul kode, basis data, dan perubahan wajib diklasifikasikan ke dalam salah satu dari empat scope:

```text
CONTRACT (Induk Legal, Tata Kelola & Komersial)
├── SHARED       ──► Infrastruktur bersama: Single VPS, Auth Terpadu, Reverse Proxy, S3 Storage, DB Backup
├── KOPKAR       ──► Modul Keanggotaan, Supplier, Sampel Makanan, Simulasi Pinjaman, Analitik Suplai
└── MARKETPLACE  ──► Modul Katalog Belanja, Keranjang Same-Day / PO H-1, Checklist Etalase, Antrean GA
```

> [!CRITICAL]
> **Larangan Polusi Scope `SHARED`**:
> Dilarang menempatkan fitur, tabel, atau router ke dalam scope `SHARED` hanya demi kemudahan akses. Scope `SHARED` hanya boleh digunakan untuk komponen yang benar-benar dipakai bersama oleh kedua aplikasi (misal: otentikasi akun karyawan, session, konfigurasi S3, notifikasi in-app terpadu).

---

## 3. Monorepo Directory Layout

```text
kopkarsai-ecosystem/
├── .agents/                               # Antigravity agent configurations
│   ├── rules/                             # Workspace behavioral rules
│   └── skills/                            # Operational runbooks & task skills
├── apps/
│   ├── backend/                           # FastAPI modular monolith backend service
│   ├── web-kopkar/                        # React + TypeScript frontend untuk Koperasi
│   └── web-marketplace/                   # React + TypeScript frontend untuk Marketplace
├── docs/
│   └── project-knowledge/                 # [Git Submodule] Canonical single source of truth:
│       ├── data/                          # YAML data (requirements, business rules, decisions, etc.)
│       ├── docs/                          # Technical docs, architecture, meeting notes
│       ├── latex/                         # Formal controlled documents (DOC-001, DOC-002, DOC-003)
│       └── scripts/                       # Verification & table generation scripts
├── AGENTS.md                              # Workspace core invariants
└── README.md                              # Monorepo developer guide
```

---

## 4. Single VPS Compute Budget Invariant (4 vCPU / 8 GB RAM)

Seluruh sistem di-hosting pada satu VPS produksi. Setiap agen dan pengembang wajib mempertimbangkan batas memori dan sumber daya:

- **OS & System Overhead**: ~1.0 GB RAM
- **Reverse Proxy (Nginx) & SSL**: ~0.5 GB RAM
- **PostgreSQL Database Engine**: ~2.5 - 3.0 GB RAM (`schema_kopkar`, `schema_marketplace`, `shared_auth`)
- **Backend FastAPI Process & Worker**: ~1.5 GB RAM
- **Background Jobs & Cache**: ~0.5 GB RAM
- **Swap Space (NVMe Buffer)**: 4.0 GB disk buffer untuk mencegah *Out-Of-Memory (OOM)* kill.

### Aturan Efisiensi Komputasi:
1. **Penyimpanan Berkas Dialihkan ke S3**: File upload (KTP, gambar produk, bukti transfer) **dilarang disimpan di SSD server lokal**. Seluruh media diunggah langsung / presigned ke S3-compatible Object Storage (maksimal 3 MB per file).
2. **PostgreSQL Tanpa Data Binary**: Dilarang menyimpan file mentah atau BYTEA besar di PostgreSQL.
3. **Stateless API**: Backend FastAPI didesain stateless agar mudah direstart tanpa kehilangan sesi aktif.

---

## 5. Architectural Decision Records (ADR) Baseline

Agen wajib mematuhi keputusan arsitektural yang telah ditetapkan di `docs/project-knowledge/data/decisions/decisions.yaml`:

- **`SH-DEC-001`**: Basis data akun terpadu menggunakan Nomor Karyawan & Password untuk kedua aplikasi.
- **`SH-DEC-003`**: Penyimpanan berkas media sensitif pada S3 dengan presigned URL berbatas waktu.
- **`SH-DEC-008`**: Katalog terkunci pada **25 Layar Antarmuka Resmi** (14 Layar KOPKAR + 11 Layar Marketplace).
- **`KK-DEC-001`**: Verifikasi registrasi anggota wajib melalui alur *Dual-Approval* bertahap.
- **`MP-DEC-001`**: Pemesanan same-day wajib diverifikasi dengan checklist fisik rak toko oleh kasir sebelum status siap bayar diterbitkan.
- **`MP-DEC-002`**: Pemrosesan pesanan akun General Affairs (`is_ga = true`) menempati prioritas antrean teratas.
