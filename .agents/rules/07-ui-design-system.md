---
trigger: glob
globs: "apps/web-kopkar/**, apps/web-marketplace/**, apps/web-gateway/**"
description: "UI/UX styling, design tokens, color palettes, typography, and status badge styling across KopKar, Marketplace, and Gateway."
---

# KopKar SAI — UI Design System & Token Specifications

## Rule Identity
- **Activation**: **Glob (`apps/web-kopkar/**`, `apps/web-marketplace/**`, `apps/web-gateway/**`)**
- **Scope**: All styling, themes, and UI presentation across `apps/web-kopkar`, `apps/web-marketplace`, and `apps/web-gateway`.

---

## 1. Pemisahan Identitas Visual (2 Sistem Desain)

1. **KOPKAR & Marketplace (`apps/web-kopkar`, target `apps/web-marketplace`) — *Soft Emerald × Golden Bento***:
   - Sumber kanonikal token & konfigurasi Tailwind berada di [docs/COLOR_PALETTE.md](../../docs/COLOR_PALETTE.md) dan [apps/web-kopkar/tailwind.config.js](../../apps/web-kopkar/tailwind.config.js).
   - **Core Brand**: `kopkar-primary` (`#0F5132`), `kopkar-primary-dark` (`#0B3D25`), `kopkar-primary-light` (`#198754`), `kopkar-gold` (`#F5B324`), `kopkar-gold-hover` (`#E5A417`), `kopkar-gold-light` (`#FEF3C7`).
   - **Bento Surfaces & Neutrals**: `kopkar-mint` (`#EAF6EE`), `kopkar-cream` (`#FEF9E7`), `kopkar-dock` (`#0B2E1E`), `kopkar-bg` (`#F8FAF9`), `kopkar-dark` (`#0B2E1E`), `kopkar-muted` (`#4A5568`).
   - **Font**: `Plus Jakarta Sans`. *(Catatan gap saat ini: `apps/web-kopkar/index.html` masih memuat Google Fonts CDN dan perlu dimigrasikan ke aset font lokal).*

2. **Digital Gateway (`apps/web-gateway`) — *Kyoto Heritage***:
   - Identitas visual terpisah khusus landing gateway (lihat [apps/web-gateway/README.md](../../apps/web-gateway/README.md)).
   - **Tokens**: `--brand-green` (`#065C2B`), `--brand-green-deep` (`#043D1D`), `--brand-yellow` (`#F6CE2C`), `--brand-yellow-light` (`#FFD967`), `--surface-cream` (`#F7F9F4`), canvas `#FFF9F9`, `--text-muted` (`#BEDACC`).
   - **Font Lokal**: `Zen Old Mincho` dan `Zen Kaku Gothic New` di `apps/web-gateway/public/fonts/`.

> [!IMPORTANT]
> **Kebijakan Aset Lokal**: Dilarang menambahkan dependensi font/CSS/icon dari CDN eksternal pada perubahan baru. Simpan aset statis dan font secara lokal.

---

## 2. Status Badges Matrix (`StatusBadge.tsx` & `COLOR_PALETTE.md`)

| Status | Background | Border | Teks | Makna Alur Bisnis |
| :--- | :--- | :--- | :--- | :--- |
| `PENDING` | `#FEF3C7` | `#FDE68A` | `#78350F` | Menunggu verifikasi admin / PO katering baru |
| `ACCEPTED` / `ACC` | `#D1FAE5` | `#A7F3D0` | `#065F46` | Supplier sanggup / sampel lolos kurasi |
| `ACTIVE` | `#D1FAE5` | `#A7F3D0` | `#065F46` | Anggota aktif (Dual-Approval complete) |
| `IN_REVIEW` | `#DBEAFE` | `#BFDBFE` | `#1E40AF` | Sampel makanan sedang diuji / checklist rak |
| `REJECTED` | `#FFE4E6` | `#FECDD3` | `#9F1239` | Supplier berhalangan / pengajuan ditolak |
| `REVISION` | `#FFEDD5` | `#FED7AA` | `#9A3412` | Perlu perbaikan resep, gramasi, atau kemasan |
| `PRIORITY_GA` | `#FEF9C3` | `#FDE047` | `#854D0E` | Antrean prioritas divisi General Affairs |

---

## 3. Geometry, Density & Formatting

- **Corner Radius & Shadows**: Ikuti token `rounded-2.5xl`–`rounded-4xl` dan `shadow-bento` / `shadow-dock` untuk kartu & dock mobile-first pada KOPKAR/Marketplace.
- **Operational Density**: Halaman admin/kasir mengutamakan kerapatan data yang mudah dipindai; halaman belanja mengutamakan keterbacaan gambar produk & harga.
- **Format Rupiah**: Wajib menggunakan helper `formatCurrencyIDR` (contoh: `Rp 1.250.000`). Dilarang menampilkan angka mentah seperti `15000` atau `Rp15000.0`.
