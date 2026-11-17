---
trigger: glob
globs: "apps/web-kopkar/**, apps/web-marketplace/**, apps/web-gateway/**"
description: "Unified Japanese Style (Kyoto Heritage & Sakura Aesthetic), logo color decoupling (yellow logo invariant), per-webapp color palette routing, and status badges."
---

# KopKar SAI — UI Design System & Token Specifications

## Rule Identity
- **Activation**: **Glob (`apps/web-kopkar/**`, `apps/web-marketplace/**`, `apps/web-gateway/**`)**
- **Scope**: All styling, themes, design tokens, and UI presentation across `apps/web-kopkar`, `apps/web-marketplace`, and `apps/web-gateway`.

---

## 1. Filosofi Desain Terpadu: Japanese Style (Kyoto Heritage & Sakura Aesthetic)

Seluruh antarmuka ekosistem KOPKARSAI disatukan dalam **satu bahasa desain terpadu: *Japanese Style (Kyoto Heritage & Sakura Kyoto Aesthetic)*** yang anggun, tenang, dan bersahabat:
- **Brand Signature**: *Deep Crimson Wine / Enji (臙脂色)* (`#83273B` / `#801A38`) yang dipadukan dengan spektrum warna bunga Sakura (`#FDF0F3`–`#DC4C70`).
- **Canvas & Surface**: Kertas tradisional Washi ivory (`#FAF6F0` / `#F7F9F4`) dengan kartu bento putih berbatas halus (*soft halo borders*).
- **Aksen Tradisional**: Emas Kyoto (*Kohaku* `#E5A812` / `#F6CE2C`), Hijau Alami (*Matcha* `#2E6B4F`), dan Biru Gelombang (*Seigaiha Indigo* `#1E3A5F`).
- **Tipografi Resmi**:
  - Judul / Display / Kanji / Section: **`Okashi`** (Weight `400` Regular; aset lokal: `assets/fonts/Okashi-otf/Okashi^-Regular.ttf`).
  - Teks Body / Data / Formulir / Accent / Navigation / Label / Angka Finansial: **`Geist`** (Weight `300`–`800`; aset lokal: `public/fonts/Geist-*.ttf` dengan dukungan `tabular-nums`).
- **Motif Komponen Khas**:
  - *Circular Halo Frames*: Foto profil & foto makanan melingkar dengan ring halo bercahaya lembut (`ring-4 ring-sakura-200/50`).
  - *Bilingual Pill Badges*: Label dwibahasa Kanji + Inggris (contoh: `限定料理 Special`, `和食`, `Popular`).
  - *Deep Wine Curved Drawer*: Panel bottom sheet/dock berwarna merah anggur pekat (`from-sakura-900 to-sakura-950`).

> [!IMPORTANT]
> **Kebijakan Aset Lokal**: Dilarang menambahkan dependensi font/CSS/icon dari CDN eksternal pada perubahan baru. Simpan aset statis dan font secara lokal pada `assets/fonts/`.

---

## 2. Aturan Independensi Palet UI terhadap Logo (Logo Color Decoupling)

> [!CRITICAL]
> **Ketentuan Warna Logo vs Palet Antarmuka UI**:
> 1. **Tidak Wajib Mengikuti Palet Asal Logo**: Desain antarmuka (UI/UX) **TIDAK DIWAJIBKAN** menjaga atau mengadopsi palet warna turunan dari logo asal (misalnya warna hijau/emerald lama tidak lagi menjadi keharusan tema UI). Dilarang memaksakan UI menjadi bernuansa hijau hanya demi menyamakan warna asal logo.
> 2. **Prioritas Utama adalah Japanese Style**: Arah estetika antarmuka sepenuhnya memprioritaskan gaya Jepang modern (*Japanese Style / Kyoto Heritage*) dengan warna kertas Washi, Deep Crimson Wine (*Enji*), Sakura blossom, dan tipografi **`Okashi`** (Heading & Display) / **`Geist`** (Body, UI, Data & Finansial).
> 3. **Logo Utama Wajib Tetap Kuning/Emas**: Lambang/emblem utama KOPKARSAI (elemen kelopak bunga origami) **wajib tetap berwarna kuning / emas (*Kyoto Golden Yellow*, `#F6CE2C` / `#FFD967` / `#EEB310`)** sebagai pusat identitas (*focal point*) yang kontras dan megah di atas latar belakang bertema Japanese style.

---

## 3. Per-Webapp Color Palette Routing (Desentralisasi Token)

Setiap webapp memiliki dokumentasi token dan konfigurasi Tailwind mandiri. Ketika mengimplementasikan atau merefaktor UI, agen **WAJIB** merujuk pada `COLOR_PALETTE.md` dan `tailwind.config.js` di dalam direktori aplikasi terkait:

1. **Digital Gateway (`apps/web-gateway/`)**:
   - Sumber kanonikal: [`apps/web-gateway/docs/COLOR_PALETTE.md`](../../apps/web-gateway/docs/COLOR_PALETTE.md) & [`apps/web-gateway/tailwind.config.js`](../../apps/web-gateway/tailwind.config.js).
   - Fokus: Pintu gerbang ekosistem, pavilion landing, kelopak sakura berguguran, dan panel transisi portal.

2. **Koperasi Admin & Client (`apps/web-kopkar/`)**:
   - Sumber kanonikal: [`apps/web-kopkar/docs/COLOR_PALETTE.md`](../../apps/web-kopkar/docs/COLOR_PALETTE.md) & [`apps/web-kopkar/tailwind.config.js`](../../apps/web-kopkar/tailwind.config.js).
   - Fokus: Wabi-Sabi Bento untuk kartu anggota (*E-Member Card*), simpan pinjam, dan meja kasir/approval.

3. **Marketplace & Kantin (`apps/web-marketplace/`)**:
   - Sumber kanonikal: [`apps/web-marketplace/docs/COLOR_PALETTE.md`](../../apps/web-marketplace/docs/COLOR_PALETTE.md) & [`apps/web-marketplace/tailwind.config.js`](../../apps/web-marketplace/tailwind.config.js).
   - Fokus: Pengalaman belanja mobile-first *Sakura Kyoto Kitchen*, katalog hidangan melingkar, drawer checkout, dan badge menu kurasi.

---

## 4. Matriks Warna Status Badge Terpadu (Status Indicators)

Digunakan pada komponen status badge di seluruh aplikasi web:

| Status | Background | Border | Teks | Titik Dot | Makna Alur Bisnis |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `PENDING` | `#FEF6DC` (Amber 100) | `#FDE68A` | `#78350F` | 🟡 `#E5A812` | Menunggu verifikasi admin / PO katering baru |
| `ACCEPTED` / `ACC` | `#E8F5EE` (Matcha 100)| `#A7F3D0` | `#065F46` | 🟢 `#10B981` | Supplier sanggup / sampel lolos kurasi |
| `ACTIVE` | `#E8F5EE` (Matcha 100)| `#A7F3D0` | `#065F46` | 🟢 `#10B981` | Anggota aktif (Dual-Approval complete) |
| `IN_REVIEW` | `#EEF2F6` (Indigo 100)| `#BFDBFE` | `#1E3A5F` | 🔵 `#3B82F6` | Pengajuan sedang diuji / checklist rak |
| `REJECTED` | `#FDF0F3` (Sakura 100)| `#FECDD3` | `#9F1239` | 🔴 `#DC4C70` | Supplier berhalangan / pengajuan ditolak |
| `REVISION` | `#FFF3E6` (Kaki 100)  | `#FED7AA` | `#9A3412` | 🟠 `#F97316` | Perlu perbaikan berkas, resep, atau gramasi |
| `PRIORITY_GA` | `#FEF9C3` (Gold 100)  | `#FDE047` | `#854D0E` | 🟡 `#E5A812` | Antrean prioritas divisi General Affairs |

---

## 5. Geometry, Density & Formatting

- **Corner Radius & Shadows**: Gunakan sudut membulat proporsional (`rounded-2xl`–`rounded-3xl` untuk kartu, `rounded-t-[32px]` untuk bottom drawer) dan bayangan lembut `shadow-sakura-soft`.
- **Operational Density**: Halaman admin/kasir mengutamakan kerapatan data yang mudah dipindai; halaman belanja mengutamakan keterbacaan gambar makanan melingkar, harga emas Kyoto, dan tombol order kontras tinggi.
- **Format Rupiah**: Wajib menggunakan helper `formatCurrencyIDR` (contoh: `Rp 1.250.000`). Dilarang menampilkan angka mentah seperti `15000` atau `Rp15000.0`.
