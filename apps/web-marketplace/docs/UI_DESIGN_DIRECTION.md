# Marketplace — UI Design Direction (Visual Reference Guide)

Dokumentasi panduan arah desain antarmuka (*UI Design Direction*) untuk **Marketplace & Kantin KOPKARSAI** (`apps/web-marketplace`), disusun berdasarkan pemindaian referensi visual [UI-Design-Directions.png](references/UI-Design-Directions.png).

> [!IMPORTANT]
> **Fungsi Dokumen & Gambar Referensi**:
> Berkas gambar [`references/UI-Design-Directions.png`](references/UI-Design-Directions.png) berfungsi **hanya sebagai referensi UI secara visual** (*visual mood, hierarki layar, proporsi komponen, dan atmosfer Japanese Kitchen*).
> - **Palet Warna Resmi** tetap mengacu penuh pada [`COLOR_PALETTE.md`](COLOR_PALETTE.md).
> - **Aturan Desain Sistem Ekosistem** mengacu pada [`07-ui-design-system.md`](../../../.agents/rules/07-ui-design-system.md).
> - Contoh teks produk/kategori pada mockup (seperti *Noodles, Rice, Soup, Salad, Sushi*, `00:05`, atau label harga promo) bersifat ilustratif; label fitur dan alur bisnis tetap mengikuti spesifikasi kanonikal di `docs/project-knowledge/`.

---

## 1. Color Palette

Seluruh token warna, kode HEX, dan konfigurasi Tailwind untuk Marketplace **tetap menggunakan [`COLOR_PALETTE.md`](COLOR_PALETTE.md)** sebagai sumber kebenaran tunggal (*single source of truth*).

Ringkasan pemetaan palet dari referensi visual ke token resmi di `COLOR_PALETTE.md`:

| Kelompok Warna | Token Resmi (`COLOR_PALETTE.md`) | Kode HEX | Peran pada Referensi UI |
| :--- | :--- | :--- | :--- |
| **Primary & Crimson** | `sakura-900` / `crimson` | `#83273B` | Header/action bar kategori, harga promo, ikon aksi `+`, ikon back `←` |
| **Deep Drawer** | `sakura-950` / `crimson-deep` | `#5E1526` | Gradient bawah *Wave Pattern Drawer* pada layar detail |
| **Sakura Accents** | `sakura-700`, `sakura-600`, `sakura-500` | `#BC3455`, `#DC4C70`, `#ED7691` | Badge keranjang (`2`), underline tab aktif, badge `-30%`, aksen interaktif |
| **Washi Surfaces** | `washi-canvas`, `washi-cream`, `white` | `#FAF6F0`, `#F7F2E7`, `#FFFFFF` | Latar belakang utama kanvas washi, permukaan kartu lembut, tombol CTA `Pesan` |
| **Sumi Ink (Text)** | `sumi-black`, `sumi-muted` | `#1A1615`, `#665E60` | Teks judul & rating utama, harga coret / metadata / teks sekunder |
| **Kyoto Accents** | `kyoto-gold`, `kyoto-matcha`, `kyoto-indigo` | `#E5A812`, `#2E6B4F`, `#1E3A5F` | Bintang rating, aksen tradisional (Matcha & Indigo), emblem logo kuning/emas |

> [!NOTE]
> **Catatan Normalisasi Gambar Referensi**: Pada gambar `UI-Design-Directions.png` terdapat beberapa salah cetak/artefak teks HEX akibat rendering grafis (misalnya `#FAK6F0`, `#F772E7`, `#1A4615`, `#665560`, dan `#ESAB12`). Saat implementasi kode, selalu gunakan nilai HEX kanonikal dari [`COLOR_PALETTE.md`](COLOR_PALETTE.md) (`#FAF6F0`, `#F7F2E7`, `#1A1615`, `#665E60`, `#E5A812`).

---

## 2. Typography

Mengacu pada standar tipografi terbaru di [`07-ui-design-system.md`](../../../.agents/rules/07-ui-design-system.md), aplikasi menggunakan dua jenis huruf lokal yang disimpan di [`assets/fonts/`](../../../assets/fonts/):

### A. Heading / Judul / Display / Kanji / Section
- **Font Family**: **`Okashi`** (Weight `400` / Regular)
- **Aset Lokal**: `assets/fonts/Okashi-otf/Okashi^-Regular.ttf`
- **Karakter Visual**: Playful, ekspresif, berkarakter kuas/tulisan tangan Jepang modern yang ramah dan menonjol.
- **Penggunaan pada UI**:
  - Judul section kategori (contoh visual: `Soup`)
  - Judul nama produk pada kartu katalog & layar detail (contoh visual: `Snack Kelapa Pelangi`, `Teh Kotak Melati`, `Ultra Milk Strawberry`)
  - Elemen aksen Kanji/display di header (`市場`)

### B. Teks Body / Data / Formulir / Accent / Navigation / Label
- **Font Family**: **`Geist`** (Weights `300`–`800`: Light, Regular, Medium, SemiBold, Bold)
- **Aset Lokal**: `public/fonts/Geist-*.ttf` (tersedia juga di `assets/fonts/`)
- **Karakter Visual**: Clean modern sans-serif dengan presisi tinggi, keterbacaan optimal, serta perataan angka monospaced via `tabular-nums` untuk kebutuhan transaksi finansial dan data tabel.
- **Penggunaan pada UI**:
  - Label navigasi pada *Crimson Action Bar* & tab sub-kategori (`Seafood`, `Veggie`, `Meat`, `Poultry`)
  - Harga produk, harga coret, dan badge persentase diskon (`Rp 5.000`, `Rp 8.000`, `-30%`)
  - Baris statistik produk (`4.9`, `3,2k Ratings`, `10RB+ Terjual`)
  - Deskripsi produk, daftar komposisi/bahan, counter kuantitas (`1`), dan teks tombol CTA (`Pesan`)

> [!IMPORTANT]
> **Kebijakan Hosting Lokal**: Seluruh berkas font dimuat secara lokal dari repositori (`assets/fonts/`) melalui `@font-face` atau bundel aset aplikasi; dilarang memuat font dari CDN eksternal.

---

## 3. Key Components / UI Notes

Analisis komponen visual utama berdasarkan tampilan dua layar mobile pada sisi kanan [UI-Design-Directions.png](references/UI-Design-Directions.png):

### 1. Washi Canvas (`#FAF6F0`)
- Latar belakang utama menggunakan permukaan *warm washi ivory* yang bersih dan nyaman dipandang, dipadukan dengan nuansa kertas tradisional Jepang serta ornamen sakura lembut.

### 2. Top Mobile Header
- **Kiri**: Aksen Kanji `市場` (*Ichiba* / Pasar) pada layar katalog, atau ikon panah kembali (`←`) berwarna crimson pada layar detail produk.
- **Tengah**: Emblem logo bunga origami **berwarna kuning/emas** (*Kyoto Golden Yellow*, mematuhi aturan *Logo Color Decoupling* pada `07-ui-design-system.md`).
- **Kanan**: Ikon keranjang belanja garis tipis (*line icon*) berwarna crimson dengan badge penghitung item berbentuk lingkaran (`2`).

### 3. Crimson Action Bar & Sub-Category Tabs
- **Crimson Action Bar**: Bar horizontal penuh berwarna `#83273B` dengan sudut membulat (*rounded pill container*) berisi 5 kategori utama dengan ikon garis minimalis (`Noodles`, `Rice`, `Soup`, `Salad`, `Sushi` pada mockup). Item yang aktif ditandai ikon putih solid/terisi dan label tebal.
- **Sub-Category Tabs**: Tab teks horizontal di bawah judul kategori (`Seafood`, `Veggie`, `Meat`, `Poultry`) dengan indikator garis bawah crimson (`underline`) pada tab aktif (`Veggie`).

### 4. Rounded-Square Food / Product Hero *(Sesuai Tampilan Mockup UI)*
- **Catatan Penting Bentuk Foto**: Meskipun keterangan teks di sisi kiri gambar menyebut *"Circure Food Hero"*, tampilan layar mobile pada referensi UI **menggunakan foto produk berbentuk persegi membulat (*rounded-square / soft-rounded rectangle*)**, bukan lingkaran (*circular*).
- **Penerapan**:
  - Pada **kartu katalog grid 2 kolom**, gambar produk menggunakan container kotak dengan sudut membulat (`rounded-xl` / `rounded-2xl`) dan badge diskon `-30%` di pojok kanan atas.
  - Pada **layar detail produk**, foto utama ditampilkan besar di tengah dalam bingkai persegi membulat (`rounded-2xl` / `rounded-3xl`) dengan kartu pembungkus lembut di atas kanvas washi.

### 5. Soft Rounded Product Cards (Grid 2 Kolom)
- Kartu produk berbentuk persegi panjang dengan sudut membulat lembut, spasi antar kartu yang lega, dan bayangan halus (*subtle shadow*).
- **Anatomi kartu**:
  1. Thumbnail produk *rounded-square* + pill badge diskon (`-30%`) di sudut kanan atas foto.
  2. Judul produk maksimal 2 baris (`Teh Kotak Melati`, `Snack Kelapa Pelangi`).
  3. Harga utama tebal berwarna crimson (`Rp 5.000`) dan harga asli tercoret berwarna abu-abu (`Rp 8.000`).
  4. Tombol quick-add `+` berwarna crimson di sudut kanan bawah kartu.

### 6. Product Detail Summary & Wave Pattern Drawer
- **Detail Header & Metadata**:
  - Judul produk terpusat, diikuti baris harga besar (`Rp 5.000`), harga coret (`Rp 8.000`), dan pill diskon soft-sakura (`-30%`).
  - Baris metrik 3 kolom berpemisah vertikal tipis: Rating bintang emas (`4.9 ★★★★★`), jumlah ulasan (`3,2k Ratings`), dan jumlah terjual (`10RB+ Terjual`).
- **Wave Pattern Bottom Drawer**:
  - Panel bawah dengan sudut atas membulat besar (`rounded-t-[32px]`) berwarna gradient crimson pekat (`#83273B` ke `#5E1526`) dan tekstur halus motif gelombang **Seigaiha**.
  - Memuat deskripsi produk dan rincian bahan dengan teks putih/ivory berjarak baca nyaman.
  - Baris aksi bawah berisi **stepper kuantitas** berbentuk pill transparan/outline (`-  1  +`) di kiri dan **tombol CTA utama** berbentuk pill kontras tinggi berwarna putih/ivory dengan teks crimson (`Pesan`) di kanan.
