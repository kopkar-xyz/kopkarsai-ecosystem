---
trigger: model_decision
description: "Use for UI/UX styling, design tokens, color palettes, responsive layouts, typography, and status badge styling in KopKar and Marketplace."
---

# KopKar SAI — UI Design System & Token Specifications

## Rule Identity
- **Activation**: **Model Decision**
- **Description**: *"Use for UI/UX styling, design tokens, color palettes, responsive layouts, typography, and status badge styling in KopKar and Marketplace."*
- **Scope**: All styling, themes, and UI presentation components across `apps/web-kopkar` and `apps/web-marketplace`.

---

## 1. Visual Philosophy & Identity

KopKar SAI memadukan citra **koperasi karyawan modern yang terpercaya, transparan, dan solid** dengan **pengalaman belanja marketplace yang cepat, intuitif, dan ramah pengguna**:

- **KOPKAR**: Nuansa institusional profesional, bersih, berorientasi akurasi data finansial dan administrasi tertib.
- **MARKETPLACE**: Nuansa ritel modern, visual produk menggugah selera (untuk katering makanan/minuman), antrean cepat, dan kontrol belanja yang ringkas.

---

## 2. Color Palette & Semantic Tokens

### Primary & Accent Hues
- **Primary Brand (Cooperative Trust)**: Deep Emerald / Teal (`#0F766E` / `#0D9488`).
- **Secondary Neutral**: Rich Slate (`#0F172A` text main, `#334155` text secondary, `#64748B` text muted).
- **Backgrounds**: Soft Slate Background (`#F8FAFC`), Clean White Surface Cards (`#FFFFFF`).
- **Dividers & Borders**: Thin Neutral Borders (`#E2E8F0` / `#CBD5E1`).

### Status Badges Matrix (Standar Status Visual)

| Status Alur | Background | Border | Teks | Penggunaan |
| :--- | :--- | :--- | :--- | :--- |
| `PENDING_VERIF` | `#FEF3C7` (Amber 100) | `#FCD34D` | `#92400E` | Registrasi baru, pengajuan sampel supplier |
| `IN_REVIEW` | `#DBEAFE` (Blue 100) | `#93C5FD` | `#1E40AF` | Checklist rak toko fisik sedang berjalan |
| `READY_TO_PAY` | `#EDE9FE` (Purple 100)| `#C4B5FD` | `#5B21B6` | Pesanan lolos checklist toko, siap transfer |
| `ACTIVE` / `APPROVED` | `#D1FAE5` (Emerald 100)| `#6EE7B7` | `#065F46` | Anggota aktif, produk disetujui, pesanan selesai |
| `REJECTED` / `CANCELLED`| `#FFE4E6` (Rose 100) | `#FDA4AF` | `#9F1239` | Verifikasi ditolak, pesanan batal |
| `PRIORITY_GA` | `#FEF9C3` (Yellow 100) | `#FDE047` | `#854D0E` | Antrean prioritas General Affairs |

---

## 3. Geometry, Elevation & Spacing

- **Corner Radius**:
  - Cards & Containers: `12px` - `16px` (`rounded-xl`).
  - Buttons, Inputs & Controls: `8px` - `10px` (`rounded-lg`).
  - Badges & Status Chips: `9999px` (`rounded-full`).
- **Shadows**:
  - Halus, ringan, dan tidak berlebihan (`shadow-sm` untuk kartu normal, `shadow-md` untuk modal/dropdown, `shadow-lg` untuk drawer). Hindari drop shadow hitam pekat.
- **Operational Density**:
  - Halaman operasional admin & kasir (verifikasi, checklist, analitik) mengutamakan kerapatan data (*dense & scannable*).
  - Halaman belanja anggota mengutamakan keterbacaan gambar produk dan kejelasan harga.

---

## 4. Typography Standards

- Gunakan font sans-serif modern yang terbaca jelas: `Inter`, `Plus Jakarta Sans`, atau sistem fallback sans-serif.
- Format nominal Rupiah wajib menggunakan separator ribuan baku:
  - Format yang benar: `Rp 15.000,-` atau `Rp 1.250.000` (menggunakan helper `formatCurrencyIDR`).
  - Dilarang menampilkan format mentah seperti `15000` atau `Rp15000.0`.

---

## 5. Micro-Animations & Interactivity

- Setiap tombol interaktif memiliki visual state: `hover:bg-opacity-90`, `active:scale-[0.98]`, `transition-all duration-150`.
- Tampilkan skeleton loading atau spinner yang konsisten saat menunggu server request.
- Tampilkan feedback toast notifikasi (`success`, `error`, `info`) di pojok antarmuka setelah aksi pengguna selesai.
