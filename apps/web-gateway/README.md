# KOPKARSAI Digital Gateway (`apps/web-gateway`)

Gerbang digital resmi satu halaman (*single-page gateway*) untuk ekosistem **KOPKARSAI**, yang memfasilitasi navigasi terarah ke dua sistem utama:
1. **Sistem Koperasi** — Portal keanggotaan mandiri, simpanan berkala, kalkulator simulasi pinjaman instan, dan alur verifikasi dual-approval berjenjang.
2. **Marketplace** — Platform belanja karyawan untuk produk toko fisik koperasi same-day (verifikasi checklist rak kasir), katering PO H-1 supplier, serta antrean prioritas divisi General Affairs (GA).

---

## 1. Arsitektur & Teknologi

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) dengan custom token palet brand
- **Motion & Timeline**: [GSAP 3.15](https://gsap.com/) master timeline untuk animasi perakitan SVG geometris, rotasi terkontrol, dan transisi satu canvas
- **Icons**: [Lucide React](https://lucide.dev/) untuk micro-indicator visual sekunder

---

## 2. Palet Desain & Brand Tokens

Palet warna diekstraksi secara presisi dari aset referensi resmi (`src/assets/kopkarsai-logo-reference.png`):

| Token | Nilai Hex | Penggunaan |
|---|---|---|
| `--brand-green` | `#065C2B` | Background kanvas utama dan aksen teks tombol |
| `--brand-green-deep` | `#043D1D` | Garis lipatan radial (*crease folds*) dan bayangan kontras |
| `--brand-yellow` | `#F6CE2C` | Surface kartu Marketplace, aksen interaktif, dan fokus ring |
| `--brand-yellow-light` | `#FFD967` | Gradasi pusat emblem origami (*center glow highlight*) |
| `--surface-cream` | `#F7F9F4` | Surface kartu Sistem Koperasi |
| `--text-light` | `#FFFFFF` | Wordmark KOPKARSAI dan tipografi kontras tinggi |
| `--text-muted` | `#BEDACC` | Subheading dan microcopy pendukung |

---

## 3. Koreografi GSAP Master Timeline — "Golden Assembly"

Gateway menggunakan evolusi satu kanvas (*single-canvas evolution*) tanpa reload atau routing jump:

1. **0.00 – 0.20s (Green Canvas)**: Viewport hijau solid KOPKARSAI (`#065C2B`), bersih dan tenang.
2. **0.20 – 1.10s (Fragment Assembly)**: 8 segmen geometris radial logo muncul dari offset posisi/rotasi kecil dengan stagger presisi, garis lipatan origami (*crease fold lines*) menajam.
3. **1.10 – 1.55s (Controlled Rotation)**: Logo yang telah tersusun berotasi anggun sebesar 45° dan melambat (*deceleration*) ke orientasi final.
4. **1.55 – 2.05s (Lift & Wordmark Reveal)**: Logo terangkat sedikit ke atas; tipografi **KOPKARSAI** muncul dari bawah melalui masked reveal (`overflow: hidden`).
5. **2.05 – 2.55s (Brand Reposition)**: Grup identitas brand (logo + wordmark) bergeser secara mulus ke posisi atas kanvas.
6. **2.35 – 3.10s (Gateway Cards Reveal)**: Subheading dan dua kartu product preview meluncur masuk dari bawah dengan stagger halus.

### Fitur Aksesibilitas & Sesi
- **Reduced Motion Support**: Jika `prefers-reduced-motion` aktif, timeline langsung mengarah ke final state tanpa animasi yang mengganggu.
- **Session Intelligence**: Menggunakan `sessionStorage` (`kopkarsai_gateway_intro_seen`). Kunjungan berulang dalam tab/sesi yang sama langsung menuju final state.
- **Lewati Intro / Esc**: Tombol lewati intro muncul halus di sudut kanan atas dan dapat ditekan dengan tombol keyboard `Esc`.
- **Putar Ulang Intro**: Tombol "Putar Ulang Intro" di bagian footer memungkinkan evaluasi ulang koreografi animasi kapan saja.

---

## 4. Konfigurasi URL Tujuan (.env)

Konfigurasi URL kedua layanan dikelola melalui berkas `.env`:

```bash
# URL Sistem Koperasi
VITE_KOPKARSAI_SYSTEM_URL=http://localhost:5173

# URL Marketplace Karyawan
VITE_KOPKARSAI_MARKETPLACE_URL=http://localhost:5174
```

### Validasi Keamanan:
- Sistem memvalidasi bahwa URL harus diawali protokol valid `http://` atau `https://`.
- Jika URL belum diatur (kosong), kartu layanan otomatis berada dalam status **"Tautan belum dikonfigurasi"** dan navigasi dinonaktifkan secara aman (mencegah broken link atau penggunaan tautan fiktif `#`).

---

## 5. Menjalankan Proyek Secara Lokal

Masuk ke direktori gateway:

```bash
cd apps/web-gateway
```

### Menjalankan Server Pengembangan:
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5175`.

### Membangun Versi Produksi:
```bash
npm run build
```

### Menjalankan Pratinjau Build:
```bash
npm run preview
```
