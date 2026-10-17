# KopKar SAI — Web Marketplace (`apps/web-marketplace`)

Aplikasi web belanja internal khusus karyawan PT SAI yang melayani pemesanan produk fisik toko koperasi same-day serta katering basah pre-order (PO H-1).

---

## 1. Arsitektur & Teknologi

* **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) dengan Design System Bento
* **Icons:** [Lucide React](https://lucide.dev/)
* **Package Manager:** [pnpm](https://pnpm.io/)
* **Komunikasi API:** REST Client terhubung ke `apps/backend`

---

## 2. Fitur Utama & Keputusan Arsitektural

1. **Pemesanan Toko Fisik Same-Day (`MP-DEC-001`):**
   * Pemesanan barang toko fisik diverifikasi dengan checklist fisik rak etalase oleh kasir sebelum status pesanan siap bayar dan siap diambil diterbitkan.
2. **Katering Basah Pre-Order H-1:**
   * Pemesanan makanan basah mitra supplier dilakukan H-1 dengan batas waktu (*cutoff time*) harian dan konfirmasi kesanggupan supplier.
3. **Antrean Prioritas Divisi General Affairs (`MP-DEC-002`):**
   * Akun karyawan divisi General Affairs (`is_ga = true`) menempati prioritas antrean teratas untuk kebutuhan konsumsi rapat dan operasional pabrik/kantor.
4. **Katalog 11 Layar Resmi Terkunci (`SH-DEC-008`):**
   * Antarmuka terikat pada katalog 11 layar resmi (`MP-SCR-001` s/d `MP-SCR-011`), meliputi katalog produk, detail barang, keranjang belanja terpisah same-day vs PO H-1, verifikasi kasir, dan riwayat pesanan.

---

## 3. Struktur Direktori Fitur (Feature-Driven)

```text
src/
├── components/
│   ├── layout/              # MobileFrame, TopHeader, BottomNav
│   └── ui/                  # Button, Card, Badge, Modal, Input
├── features/
│   ├── catalog/             # Grid produk toko fisik & menu katering H-1
│   ├── cart/                # Keranjang belanja dengan pemisahan checkout
│   ├── checkout/            # Pembayaran tunai/potong gaji (payroll deduction)
│   ├── cashier/             # Dashboard kasir & checklist fisik etalase toko
│   └── order-history/       # Status pesanan real-time & resi digital
├── types/                   # TypeScript interfaces & kontrak payload API
└── App.tsx                  # Root Routing & View Switcher
```

---

## 4. Panduan Memulai Cepat (Local Development)

### Prasyarat
* Node.js 20+
* pnpm 9+

### Instalasi & Menjalankan Aplikasi
```bash
# Pindah ke direktori web-marketplace
cd apps/web-marketplace

# Instal dependensi
pnpm install

# Jalankan server pengembangan
pnpm dev --port 5175
```

Aplikasi dapat dibuka di peramban: `http://localhost:5175/`.

---

## 5. Integrasi Sesi Akun
Aplikasi menggunakan sistem autentikasi terpusat (`shared_auth`). Pengguna yang telah masuk di portal Koperasi (`apps/web-kopkar`) dapat langsung berbelanja tanpa proses login ulang (*Single Identity / Shared JWT*).
