# KOPKARSAI — Koperasi App UI Style Direction (Japanese-Inspired Green Theme)

Dokumentasi resmi token desain, palet warna, dan tipografi antarmuka aplikasi **Koperasi Karyawan SAI (KOPKARSAI)** (`apps/web-kopkar`) berdasarkan referensi panduan gaya **"Japanese-Inspired Green Theme for Koperasi Digital"**.

---

## 1. Palet Warna Resmi (Official Color Palette)

| Nama Token | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| **Deep Forest** | `#1F5B45` | `rgb(31, 91, 69)` | 🌲 | **Primary Brand / Bottom Nav**: Latar mobile bottom nav bar (full hijau flush ke bawah), kartu hero utama, dan tombol aksi primer. |
| **Jade Green** | `#2F6F56` | `rgb(47, 111, 86)` | 🟢 | **Secondary Brand**: Header baris kategori, badge aktif, card border kontras, dan hover state. |
| **Moss Green** | `#4F8A67` | `rgb(79, 138, 103)` | 🌿 | **Accent Brand**: Sub-header, tab filter terpilih, indikator status, dan aksen visual. |
| **Soft Sage** | `#A9C3A2` | `rgb(169, 195, 162)` | 🥬 | **Surface Accent**: Icon inactive outline, chip border halus, latar badge sekunder, dan garis pembatas bento. |
| **Warm Ivory** | `#F3ECDD` | `rgb(243, 236, 221)` | 📜 | **Warm Canvas**: Latar belakang dasar aplikasi (*canvas surface*), memberikan kehangatan kertas tradisional Jepang. |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | ⚪ | Kartu permukaan bento, popover dialog, dan teks kontras tinggi di atas Deep Forest. |
| **Ink Black** | `#1A2421` | `rgb(26, 36, 33)` | ⬛ | Teks heading utama dan angka nominal keuangan. |
| **Muted Ink** | `#5C6F67` | `rgb(92, 111, 103)` | 🔘 | Teks deskripsi keterangan, timestamp, dan sub-label. |

---

## 2. Tipografi Resmi (Font Style Direction)

Sesuai panduan visual terlampir:

1. **Heading (Judul & Display)**:
   - **Keluarga Font**: `Nunito Sans` (Bold, 700 / 800)
   - **Karakter**: Ramah, tebal, proporsional, dan tegas untuk judul kartu, nama aplikasi, dan angka nominal.
2. **Body (Teks Utama & Data)**:
   - **Keluarga Font**: `Inter` (Regular 400 / Medium 500)
   - **Karakter**: Sangat bersih, keterbacaan tinggi (*high readability*) untuk tabel pesanan, paragraf, dan formulir operasional.
3. **Accent (Aksen & Slogan)**:
   - **Keluarga Font**: `Quicksand` (SemiBold 600)
   - **Karakter**: Modern, bersahabat (*friendly*), dan lembut untuk badge status, chip, sub-judul dwibahasa, dan tombol aksi.

---

## 3. Spesifikasi Mobile Bottom Navigation Bar

Sesuai instruksi khusus:
- **Posisi**: Menempel penuh (*flush*) di bagian paling bawah layar smartphone (`w-full fixed bottom-0 left-0 right-0 z-40`).
- **Warna Latar**: **Full Hijau Deep Forest (`#1F5B45`)** dengan garis batas atas halus Jade Green (`#2F6F56`).
- **Indikator Aktif vs Tidak Aktif**:
  - **Item Aktif**: Ikon menggunakan mode **FILL** (`fill="currentColor"`), warna putih bersih (`text-white`), dan teks tebal.
  - **Item Tidak Aktif**: Ikon menggunakan mode **OUTLINE** (`fill="none"` dengan stroke biasa), warna Soft Sage transparan (`text-[#A9C3A2]/80`), dan teks normal.
- **Transisi**: Animasi transisi halus saat pengguna berpindah tab.

---

## 4. Matriks Status Operasional

| Status | Background | Border | Teks | Dot |
| :--- | :--- | :--- | :--- | :---: |
| `PENDING` | `#FEF6DC` (Amber 100) | `#FDE68A` | `#78350F` | 🟡 `#E5A812` |
| `ACCEPTED` / `ACC` | `#EAF4EE` (Sage 100) | `#A9C3A2` | `#1F5B45` | 🟢 `#2F6F56` |
| `ACTIVE` | `#EAF4EE` (Sage 100) | `#A9C3A2` | `#1F5B45` | 🟢 `#2F6F56` |
| `IN_REVIEW` | `#EEF2F6` (Indigo 100)| `#BFDBFE` | `#1E3A5F` | 🔵 `#3B82F6` |
| `REJECTED` | `#FDF0F3` (Rose 100)  | `#FECDD3` | `#9F1239` | 🔴 `#DC4C70` |
| `REVISION` | `#FFF3E6` (Kaki 100)  | `#FED7AA` | `#9A3412` | 🟠 `#F97316` |
| `PRIORITY_GA` | `#FEF9C3` (Gold 100)  | `#FDE047` | `#854D0E` | 🟡 `#E5A812` |
