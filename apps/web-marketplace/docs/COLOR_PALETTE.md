# Marketplace — Japanese Kitchen & Sakura Kyoto Design Tokens

Dokumentasi resmi token desain dan palet warna antarmuka aplikasi **Marketplace & Kantin KOPKARSAI** (`apps/web-marketplace`). 

Gaya visual marketplace mengadopsi penuh **Japanese Style (Sakura Kyoto Kitchen Aesthetic)** sesuai desain kanonikal pada mockup antarmuka mobile KOPKARSAI (`和食 - Sakura Kyoto Kitchen`).

> [!NOTE]
> **Aturan Logo & Palet UI**: Antarmuka **tidak diwajibkan** mengikuti warna asal logo (tidak harus hijau). Yang utama adalah estetika **Japanese Style**, sedangkan **logo utama KOPKARSAI wajib tetap kuning/emas** (`#F6CE2C` / `#FFD967`) sebagai focal point identitas.

---

## 1. Warna Brand Utama (Core Japanese Crimson & Sakura)

| Token Tailwind | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| `sakura-900` / `crimson` | `#83273B` | `rgb(131, 39, 59)` | 🍷 | **Primary Wine / Enji (臙脂)**: Header bar aplikasi, drawer navigasi utama, tombol aksi primer. |
| `sakura-950` / `crimson-deep` | `#5E1526` | `rgb(94, 21, 38)` | 🍷 | Latar belakang gradient *bottom drawer sheet* pemesanan detail menu. |
| `sakura-800` | `#9E2A40` | `rgb(158, 42, 64)` | 🍷 | Border tombol aktif, teks judul pada latar terang, dan hover state. |
| `sakura-700` | `#BC3455` | `rgb(188, 52, 85)` | 🌺 | Border badge sakura, teks aksen menu, dan garis pembatas aktif. |
| `sakura-600` | `#DC4C70` | `rgb(220, 76, 112)` | 🌸 | Notification badge keranjang (`cart badge`), icon favorit ❤️, aksen back button. |
| `sakura-500` | `#ED7691` | `rgb(237, 118, 145)` | 🌸 | Glow underline tab navigasi aktif, indikator kategori terpilih. |
| `sakura-200` | `#FCE4E9` | `rgb(252, 228, 233)` | 🌸 | **Halo Ring Frame**: Cincin halo bercahaya lembut pada foto makanan melingkar. |
| `sakura-100` | `#FDF0F3` | `rgb(253, 240, 243)` | 🌸 | Latar pill badge status (`Available`, `和食`, `限定料理 Special`). |
| `sakura-50` | `#FFF8F9` | `rgb(255, 248, 249)` | 🌸 | Latar belakang card bento makanan versi soft pink. |

---

## 2. Warna Kanvas Kertas Washi & Kartu Menu (Surfaces & Washi Paper)

| Token Tailwind | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| `washi-canvas` | `#FAF6F0` | `rgb(250, 246, 240)` | 📜 | **Warm Washi Ivory**: Kanvas latar belakang utama seluruh layar aplikasi. |
| `washi-cream` | `#F7F2E7` | `rgb(247, 242, 231)` | 📜 | Kontainer sekunder, area input pencarian, dan slider promo. |
| `white` | `#FFFFFF` | `rgb(255, 255, 255)` | ⚪ | **Card Surface**: Kartu menu produk bento dengan border `border-sakura-200/50`. |
| `sumi-black` | `#1A1615` | `rgb(26, 22, 21)` | ⬛ | **Sumi Ink**: Teks nama produk/menu (misal *"Kuro kosho jiru"*), heading utama. |
| `sumi-muted` | `#665E60` | `rgb(102, 94, 96)` | 🔘 | Teks deskripsi, rincian bahan rempah/sayur, kalori, dan berat porsi. |

---

## 3. Warna Aksen Kyoto & Indikator Tradisional (Accents & Status)

| Token Tailwind | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| `kyoto-gold` | `#E5A812` | `rgb(229, 168, 18)` | 🟡 | Warna teks harga produk (`$5`, `Rp 25.000`), rating bintang ulasan. |
| `kyoto-amber-light` | `#FEF6DC` | `rgb(254, 246, 220)` | 🟡 | Background badge harga hemat / promo kasir. |
| `kyoto-matcha` | `#2E6B4F` | `rgb(46, 107, 79)` | 🥬 | Tag kategori `Veggie`, menu vegetarian, status katering sehat. |
| `kyoto-indigo` | `#1E3A5F` | `rgb(30, 58, 95)` | 🌊 | Aksen gelombang Seigaiha, menu seafood/ikan, dan tag tradisi laut. |
| `tag-nori` | `#1F1A1BCC` | `rgba(31, 26, 27, 0.8)` | ⬛ | Floating dark pill tag pada gambar makanan (contoh: `海苔 Nori`). |

---

## 4. Tipografi Resmi (Japanese Typography)

- **Judul Menu & Heading**: Wajib menggunakan font **`Zen Old Mincho`** (Serif tradisional Jepang) untuk menghadirkan keanggunan kaligrafi (*calligraphic aesthetics*).
  - Contoh: *"Kuro kosho jiru"*, *"Soup 汁物 (Shiru-mono)"*, *"限定料理 Special"*.
- **Body & Data Transaksional**: Menggunakan **`Zen Kaku Gothic New`** (atau Sans modern) untuk keterbacaan tinggi pada daftar bahan makanan, harga, dan nutrisi porsi.

---

## 5. Pola Komponen Visual Khas (Design Component Motifs)

1. **Circular Halo Image Frames**:
   - Foto menu disajikan dalam lingkaran dengan cincin halo berlapis:
     ```html
     <div class="relative rounded-full p-2 bg-gradient-to-b from-sakura-100 to-sakura-200/40 shadow-sakura-soft">
       <img class="rounded-full object-cover w-36 h-36" src="..." alt="..." />
     </div>
     ```
2. **Pill Badges Dwibahasa (Kanji + Latin)**:
   - Format: `限定料理 Special`, `和食`, `Popular`.
   - Menggunakan `rounded-full px-3 py-0.5 text-xs font-serif bg-sakura-100 text-sakura-800 border border-sakura-200`.
3. **Bottom Order Sheet (Deep Wine Drawer)**:
   - Panel bawah untuk tombol pemesanan menggunakan warna `bg-gradient-to-b from-sakura-900 to-sakura-950` dengan sudut membulat atas `rounded-t-[32px]`, teks putih, stepper jumlah menu, dan tombol order pill putih `bg-white text-sakura-900 font-bold`.
4. **Header KOPKARSAI 和食**:
   - Header atas memuat logo KOPKARSAI, subtitle *Sakura Kyoto Kitchen*, lambang bunga sakura di tengah, serta ikon shopping bag dengan badge kuantitas merah.
