# KOPKARSAI — Ekosistem Unified Japanese Design System

Dokumentasi induk sistem desain dan palet warna ekosistem **KOPKARSAI**. Seluruh antarmuka ekosistem kini disatukan dalam satu bahasa visual: **Japanese Style (Kyoto Heritage & Sakura Aesthetic)** yang terinspirasi dari keanggunan kuliner dan estetika Kyoto modern (`和食 - Sakura Kyoto Kitchen`).

---

## 1. Aturan Independensi Palet UI terhadap Logo (Logo Color Decoupling)

> [!IMPORTANT]
> **Ketentuan Warna Logo vs Palet Antarmuka UI**:
> 1. **Tidak Wajib Menjaga Identitas Warna Logo pada UI**: Desain antarmuka aplikasi **tidak diwajibkan** mengikuti atau mempertahankan palet warna turunan dari logo asal (misalnya warna hijau/emerald lama tidak lagi menjadi keharusan tema UI).
> 2. **Prioritas Utama adalah Japanese Style**: Arah estetika antarmuka memprioritaskan gaya Jepang modern (*Japanese Style / Kyoto Heritage*) dengan warna kertas Washi, Deep Crimson Wine (*Enji*), Sakura blossom, dan tipografi Mincho/Gothic.
> 3. **Logo Utama Wajib Tetap Kuning/Emas**: Lambang/emblem utama KOPKARSAI (elemen kelopak bunga origami) **wajib tetap dipertahankan berwarna kuning / emas (*Kyoto Golden Yellow*, `#F6CE2C` / `#FFD967` / `#EEB310`)** sebagai pusat identitas resmi (*focal point*) yang kontras dan elegan di atas kanvas bertema Japanese style.

---

## 2. Arsitektur Desentralisasi Token (Per-Webapp Color Palette)

Sesuai aturan arsitektur frontend ekosistem ([`.agents/rules/07-ui-design-system.md`](../.agents/rules/07-ui-design-system.md)), spesifikasi detail palet warna dan token Tailwind dikelola langsung di dalam masing-masing webapp:

| Aplikasi | Lingkup & Peran UI | Lokasi Spesifikasi Desain | Konfigurasi Tailwind |
| :--- | :--- | :--- | :--- |
| **Digital Gateway** | Pintu gerbang SSO, landing page, paviliun & transisi portal | [`apps/web-gateway/docs/COLOR_PALETTE.md`](../apps/web-gateway/docs/COLOR_PALETTE.md) | [`apps/web-gateway/tailwind.config.js`](../apps/web-gateway/tailwind.config.js) |
| **Koperasi (KOPKAR)** | Koperasi admin/client, E-Member card, simpan pinjam, kasir | [`apps/web-kopkar/docs/COLOR_PALETTE.md`](../apps/web-kopkar/docs/COLOR_PALETTE.md) | [`apps/web-kopkar/tailwind.config.js`](../apps/web-kopkar/tailwind.config.js) |
| **Marketplace & Kantin** | Belanja mobile-first karyawan, food catalog, order drawer | [`apps/web-marketplace/docs/COLOR_PALETTE.md`](../apps/web-marketplace/docs/COLOR_PALETTE.md) | `apps/web-marketplace/tailwind.config.js` |

---

## 3. Inti Identitas Visual Bersama (Core Aesthetic Invariants)

1. **Warna Brand Signature — *Deep Crimson Wine / Enji (臙脂)***:
   - `#83273B` / `#801A38` sebagai identitas visual utama KOPKARSAI.
   - Dipadukan dengan spektrum warna bunga Sakura (`sakura-50` hingga `sakura-900`) untuk aksen tombol, hover, glow, dan border badge.

2. **Latar Belakang Tradisional — *Washi Canvas (生成り)***:
   - Kanvas utama menggunakan warna hangat kertas Washi alami (`#FAF6F0` / `#F7F9F4`).
   - Kartu konten menggunakan kartu bento putih susu (`#FFFFFF`) dengan border halus sakura (`#FCE4E9`) dan bayangan lembut `shadow-sakura-soft`.

3. **Tipografi Jepang Klasik & Modern**:
   - **Heading & Nilai Utama**: `Zen Old Mincho` (Serif kaligrafis bernuansa kuil & kuliner Kyoto).
   - **Body & Data Tabel**: `Zen Kaku Gothic New` (Sans-serif presisi dan bersih untuk operasi kasir).

4. **Motif Komponen Khas (Visual Motifs)**:
   - *Circular Halo Frames*: Foto menu dan profil berbentuk lingkaran dengan cincin halo berlapis (`rounded-full ring-4 ring-sakura-200/50`).
   - *Bilingual Badges*: Label status dwibahasa Kanji + Inggris (contoh: `限定料理 Special`, `和食`, `Popular`).
   - *Deep Wine Curved Drawer*: Panel pesanan bawah melengkung (`rounded-t-[32px]`) berwarna crimson pekat dengan tombol order pill putih kontras.

---

## 4. Matriks Status Ekosistem Terpadu (Unified Status Matrix)

| Status | Background | Border | Teks | Dot | Makna Alur Bisnis |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `PENDING` | `#FEF6DC` (Amber 100) | `#FDE68A` | `#78350F` | 🟡 `#E5A812` | Menunggu verifikasi admin / PO katering baru masuk |
| `ACCEPTED` / `ACC` | `#E8F5EE` (Matcha 100)| `#A7F3D0` | `#065F46` | 🟢 `#10B981` | Supplier sanggup / sampel lolos kurasi |
| `ACTIVE` | `#E8F5EE` (Matcha 100)| `#A7F3D0` | `#065F46` | 🟢 `#10B981` | Anggota aktif (Dual-Approval Complete) |
| `IN_REVIEW` | `#EEF2F6` (Indigo 100)| `#BFDBFE` | `#1E3A5F` | 🔵 `#3B82F6` | Pengajuan sedang diuji / checklist rak |
| `REJECTED` | `#FDF0F3` (Sakura 100)| `#FECDD3` | `#9F1239` | 🔴 `#DC4C70` | Supplier berhalangan / pengajuan ditolak |
| `REVISION` | `#FFF3E6` (Kaki 100)  | `#FED7AA` | `#9A3412` | 🟠 `#F97316` | Perlu perbaikan berkas, resep, atau gramasi |
| `PRIORITY_GA` | `#FEF9C3` (Gold 100)  | `#FDE047` | `#854D0E` | 🟡 `#E5A812` | Antrean prioritas divisi General Affairs |
