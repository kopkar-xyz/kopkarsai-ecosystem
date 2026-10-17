# KOPKARSAI — Design Tokens & Color Palette Specification

Dokumentasi resmi palet warna dan token desain antarmuka aplikasi **Koperasi Karyawan SAI (KOPKARSAI)**. Dikonfigurasi pada file [`tailwind.config.js`](../apps/web-kopkar/tailwind.config.js) dan dipatuhi oleh komponen UI di `apps/web-kopkar`.

---

## 1. Warna Brand Utama (Core Brand Colors)

| Token Tailwind | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| `kopkar-primary` | `#0F5132` | `rgb(15, 81, 50)` | 🟢 | **Primary Emerald Green**: Latar kartu utama hero finansial, tombol aksi primer, identitas resmi koperasi. |
| `kopkar-primary-dark` | `#0B3D25` | `rgb(11, 61, 37)` | 🟢 | Shade gelap untuk efek *hover* tombol utama dan gradasi kartu. |
| `kopkar-primary-light` | `#198754` | `rgb(25, 135, 84)` | 🟢 | Aksen hijau segar untuk badge status aktif, checkbox terverifikasi, dan indikator progres. |
| `kopkar-gold` | `#F5B324` | `rgb(245, 179, 36)` | 🟡 | **Secondary Golden Yellow**: Warna resmi logo bunga/payung 12-kelopak KOPKARSAI, tombol sorotan (*highlight*), RFID metallic chip. |
| `kopkar-gold-hover` | `#E5A417` | `rgb(229, 164, 23)` | 🟡 | Efek *hover* pada elemen tombol emas dan interaksi aktif. |
| `kopkar-gold-light` | `#FEF3C7` | `rgb(254, 243, 199)` | 🟡 | Latar belakang badge prioritas GA dan aksen *glow ring*. |

---

## 2. Warna Permukaan Kartu Bento (Bento Surfaces)

| Token Tailwind | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| `kopkar-mint` | `#EAF6EE` | `rgb(234, 246, 238)` | 🥬 | **Surface Mint Soft**: Latar kartu Hub Supplier UMKM, badge "Unit SAI B", dan info agenda harian. |
| `kopkar-mint-light` | `#F0FDF4` | `rgb(240, 253, 244)` | 🥬 | Variasi mint ultra-light untuk latar belakang card sekunder dan hover state. |
| `kopkar-cream` | `#FEF9E7` | `rgb(254, 249, 231)` | 🍦 | **Surface Warm Cream**: Latar kartu Bento Kalkulator Finansial & Pinjaman. |
| `kopkar-cream-light` | `#FFFDF5` | `rgb(255, 253, 245)` | 🍦 | Variasi cream lembut untuk container input slider dan dropdown. |
| `kopkar-dock` | `#0B2E1E` | `rgb(11, 46, 30)` | 🌲 | **Dark Evergreen**: Latar belakang *floating bottom navigation dock bar* dan gradasi E-Member Card. |
| `white` | `#FFFFFF` | `rgb(255, 255, 255)` | ⚪ | Kartu permukaan bento putih standar dan pill aktif pada dock navigasi. |

---

## 3. Warna Netral & Tipografi (Neutrals & Typography)

| Token Tailwind | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| `kopkar-bg` | `#F8FAF9` | `rgb(248, 250, 249)` | ⚪ | Latar belakang canvas aplikasi *mobile-first*. |
| `kopkar-dark` | `#0B2E1E` | `rgb(11, 46, 30)` | ⬛ | Warna teks heading utama, judul kartu bento, dan teks kontras tinggi. |
| `kopkar-muted` | `#4A5568` | `rgb(74, 85, 104)` | 🔘 | Warna teks sekunder, deskripsi paragraf, dan sub-label. |
| `slate-400` | `#94A3B8` | `rgb(148, 163, 184)` | 🔘 | Teks tanggal, waktu, caption, dan placeholder input. |
| `slate-200` | `#E2E8F0` | `rgb(226, 232, 240)` | ⚪ | Garis batas tipis (*border divider*) antar-elemen. |

---

## 4. Matriks Warna Status Badge (Status Indicators)

Digunakan pada komponen [`StatusBadge.tsx`](../apps/web-kopkar/src/components/ui/StatusBadge.tsx):

| Status | Background | Border | Teks | Titik Dot | Makna Status Alur Bisnis |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `PENDING` | `#FEF3C7` (Amber 100) | `#FDE68A` | `#78350F` | 🟡 `#F59E0B` | Menunggu verifikasi admin / PO katering baru masuk. |
| `ACCEPTED` / `ACC` | `#D1FAE5` (Emerald 100)| `#A7F3D0` | `#065F46` | 🟢 `#10B981` | Supplier sanggup penuhi / Sampel lolos kurasi. |
| `ACTIVE` | `#D1FAE5` (Emerald 100)| `#A7F3D0` | `#065F46` | 🟢 `#10B981` | Anggota aktif koperasi (Dual-Approval Complete). |
| `IN_REVIEW` | `#DBEAFE` (Blue 100) | `#BFDBFE` | `#1E40AF` | 🔵 `#3B82F6` | Sampel makanan sedang diuji kelayakan kurator. |
| `REJECTED` | `#FFE4E6` (Rose 100) | `#FECDD3` | `#9F1239` | 🔴 `#F43F5E` | Supplier berhalangan / Pengajuan ditolak. |
| `REVISION` | `#FFEDD5` (Orange 100) | `#FED7AA` | `#9A3412` | 🟠 `#F97316` | Perlu perbaikan resep, gramasi, atau kemasan. |
| `PRIORITY_GA` | `#FEF9C3` (Yellow 100) | `#FDE047` | `#854D0E` | 🟡 `#F5B324` | Antrean prioritas pesanan divisi General Affairs. |

---

## 5. Cuplikan Konfigurasi `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kopkar: {
          primary: "#0F5132",
          "primary-dark": "#0B3D25",
          "primary-light": "#198754",
          gold: "#F5B324",
          "gold-hover": "#E5A417",
          "gold-light": "#FEF3C7",
          mint: "#EAF6EE",
          "mint-light": "#F0FDF4",
          cream: "#FEF9E7",
          "cream-light": "#FFFDF5",
          dock: "#0B2E1E",
          "dock-active": "#134B32",
          bg: "#F8FAF9",
          dark: "#0B2E1E",
          muted: "#4A5568",
        },
      },
      borderRadius: {
        '2.5xl': '22px',
        '3xl': '26px',
        '3.5xl': '30px',
        '4xl': '36px',
      },
      boxShadow: {
        'bento': '0 4px 20px -2px rgba(11, 46, 30, 0.06), 0 2px 6px -1px rgba(11, 46, 30, 0.04)',
        'bento-hover': '0 10px 30px -4px rgba(11, 46, 30, 0.12), 0 4px 10px -2px rgba(11, 46, 30, 0.06)',
        'dock': '0 12px 40px -6px rgba(11, 46, 30, 0.35)',
        'card-gold': '0 8px 24px -4px rgba(245, 179, 36, 0.25)',
      },
    },
  },
  plugins: [],
};
```
