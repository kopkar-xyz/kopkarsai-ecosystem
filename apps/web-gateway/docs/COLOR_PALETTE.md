# Digital Gateway — Japanese Heritage & Sakura Design Tokens

Dokumentasi resmi token desain dan palet warna antarmuka aplikasi **Digital Gateway KOPKARSAI** (`apps/web-gateway`). Dikonfigurasi pada file [`tailwind.config.js`](../tailwind.config.js).

Gaya visual Gateway mengusung **Japanese Kyoto Heritage & Sakura Aesthetic** dengan perpaduan warna alami Kyoto, kelopak sakura, kayu gerbang tradisional, serta latar bertekstur kertas washi.

> [!NOTE]
> **Aturan Logo & Palet UI**: Antarmuka **tidak diwajibkan** mengikuti warna asal logo (tidak harus hijau). Yang utama adalah estetika **Japanese Style**, sedangkan **logo utama KOPKARSAI wajib tetap kuning/emas** (`#F6CE2C` / `#FFD967`) sebagai focal point.

---

## 1. Warna Brand Utama & Spektrum Sakura (Brand & Sakura Spectrum)

Digunakan untuk identitas utama, header, kelopak sakura, badge sorotan, dan interaktivitas:

| Token Tailwind | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| `sakura-900` / `crimson` | `#83273B` | `rgb(131, 39, 59)` | 🍷 | **Deep Wine / Kurenai**: Header bar, aksen utama Japanese style, tombol primer tegas. |
| `sakura-800` | `#9E2A40` | `rgb(158, 42, 64)` | 🍷 | Warna wine sekunder untuk border tombol dan hover state. |
| `sakura-700` | `#BC3455` | `rgb(188, 52, 85)` | 🌺 | Border badge sakura, teks aksen, dan garis pemisah aktif. |
| `sakura-600` | `#DC4C70` | `rgb(220, 76, 112)` | 🌸 | Aksen tombol aktif, icon love/favorit, notification dot. |
| `sakura-500` | `#ED7691` | `rgb(237, 118, 145)` | 🌸 | Glow ring, active tab indicator, kelopak sakura gugur. |
| `sakura-400` | `#F5A3B5` | `rgb(245, 163, 181)` | 🌸 | Aksen ilustrasi dan border halus. |
| `sakura-300` | `#F9CBD5` | `rgb(249, 203, 213)` | 🌸 | Focus ring input formulir dan hover border. |
| `sakura-200` | `#FCE4E9` | `rgb(252, 228, 233)` | 🌸 | Halo ring kartu bento melingkar, border badge lembut. |
| `sakura-100` | `#FDF0F3` | `rgb(253, 240, 243)` | 🌸 | Background pill badge (`限定料理`, `和食`) & chip filter. |
| `sakura-50` | `#FFF8F9` | `rgb(255, 248, 249)` | 🌸 | Latar kartu bento bercorak sakura sangat halus. |

---

## 2. Warna Gerbang Alami & Emas Kyoto (Heritage Green & Kyoto Gold)

Elemen pelengkap arsitektur gerbang tradisional dan sorotan:

| Token Tailwind | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| `brand-green` | `#065C2B` | `rgb(6, 92, 43)` | 🌲 | Hijau hutan pinus Kyoto, aksen status aktif / sehat. |
| `brand-green-deep` | `#043D1D` | `rgb(4, 61, 29)` | 🌲 | Latar belakang panel gateway koperasi tertutup. |
| `brand-green-dark` | `#032813` | `rgb(3, 40, 19)` | 🌲 | Shading bayangan panel gateway responsif. |
| `brand-yellow` | `#F6CE2C` | `rgb(246, 206, 44)` | 🟡 | Emas Kyoto: border hover kartu gateway, harga spesial. |
| `brand-yellow-deep`| `#E5A812` | `rgb(229, 168, 18)` | 🟡 | Aksen emas gelap, bintang ulasan, rating & badge reward. |
| `brand-yellow-light`| `#FFD967` | `rgb(255, 217, 103)` | 🟡 | Glow ring tombol CTA emas dan efek shiki. |

---

## 3. Latar Belakang & Permukaan Kertas Washi (Washi Canvas & Surfaces)

| Token Tailwind | Kode HEX | RGB | Contoh Visual | Penggunaan & Konteks |
| :--- | :--- | :--- | :---: | :--- |
| `brand-cream` / `washi`| `#F7F9F4` | `rgb(247, 249, 244)` | 📜 | **Washi Kinari Canvas**: Latar belakang utama bernuansa serat kertas alami. |
| `brand-cream-light` | `#FCFDFB` | `rgb(252, 253, 251)` | ⚪ | Permukaan kartu landing & panel dialog. |
| `white` | `#FFFFFF` | `rgb(255, 255, 255)` | ⚪ | Kartu bento, dialog pop-up, dan tombol CTA kontras tinggi. |

---

## 4. Tipografi & Kontras Tinta (Sumi Ink & Typography)

- **Headings & Latin Display**: Menggunakan font display resmi **`Okashi`** (Weight `400` Regular; aset lokal: `/fonts/Okashi^-Regular.ttf`).
- **Body, Form & Navigation**: Menggunakan font sans modern membulat **`M PLUS Rounded 1c`** (Weight `100`–`900`; aset lokal: `/fonts/RoundedMplus1c-*.ttf`).
- **Kanji & Tategaki Calligraphy**: Mempertahankan font serif kaligrafi Jepang **`Zen Old Mincho`** (Weight `400`–`900`; aset lokal: `/fonts/ZenOldMincho-*.ttf`).

| Token Tailwind | Kode HEX | Penggunaan & Konteks |
| :--- | :--- | :--- |
| `sumi-dark` / `text-light` | `#FFFFFF` | Teks di atas latar belakang merah gelap (`sakura-900`) atau hijau pekat. |
| `brand-text-muted` | `#BEDACC` | Teks sekunder pada panel landing bertema hijau gelap. |
| `brand-text-dim` | `#86AB98` | Placeholder atau metadata redup pada kartu gateway. |
| `text-neutral-900` | `#1F1A1B` | Teks judul utama di atas latar belakang washi cream. |
| `text-neutral-600` | `#5C5254` | Teks paragraf dan deskripsi fitur. |

---

## 5. Shadow & Geometri Visual

```javascript
boxShadow: {
  'sakura-soft': '0 15px 35px -10px rgba(244, 114, 182, 0.12), 0 0 0 1px rgba(252, 228, 233, 0.6)',
  'sakura-hover': '0 25px 45px -12px rgba(244, 114, 182, 0.2), 0 0 0 1px rgba(244, 114, 182, 0.4)',
  'gateway-card': '0 20px 40px -15px rgba(3, 40, 19, 0.4), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
  'gateway-card-hover': '0 30px 60px -12px rgba(3, 40, 19, 0.55), 0 0 0 1px rgba(246, 206, 44, 0.25)',
  'gateway-gold': '0 12px 30px -8px rgba(246, 206, 44, 0.3)',
}
```
