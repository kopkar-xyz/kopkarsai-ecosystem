# KopKar SAI — Web Koperasi Portal (`apps/web-kopkar`)

Portal resmi Koperasi Karyawan PT SAI (KOPKARSAI) berbasis web *mobile-first* yang melayani keanggotaan mandiri, simulasi simpan pinjam, dan kurasi mitra usaha supplier UMKM.

---

## 1. Arsitektur & Teknologi

* **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) dengan palet resmi *Soft Emerald × Golden Bento*
* **Icons:** [Lucide React](https://lucide.dev/)
* **Package Manager:** [pnpm](https://pnpm.io/)
* **Design Guidelines:** Mengacu pada [COLOR_PALETTE.md](../../docs/COLOR_PALETTE.md)

---

## 2. Modul Fitur & 14 Layar Antarmuka

Aplikasi terikat pada katalog 14 layar resmi (`KK-SCR-001` s/d `KK-SCR-014`):

1. **Tab 1 — Beranda Dashboard (`KK-SCR-001`):**
   * **Hero Financial Card:** Ringkasan total simpanan dan estimasi dividen SHU berlatar *soft sage* (`#DFF3E7`) dengan komposisi ornamen 3D koin silinder (SVG) serta CTA ganda (Simulasi Pinjaman & Belanja Toko).
   * **Siklus Jadwal Mingguan:** Format *horizontal date pills* Senin–Jumat dengan penanda dot agenda emas dan kartu detail agenda harian.
   * **Bento Layanan Unggulan:** Tata letak bento 2 kolom: Kalkulator Cepat (`#FEF9E7`), Hub UMKM Supplier (`#EAF6EE`), dan Pintasan Marketplace (`#FFE7AA`).
   * **Announcement Card:** Informasi editorial agenda RAT dan lomba konten kreatif anggota.
   * **Floating Bottom Dock:** Kapsul navigasi melayang (`#0B2E1E`) dengan active state lingkaran kontras putih.

2. **Tab 2 — Simpan Pinjam & Finansial (`KK-SCR-012`):**
   * **Kalkulator Pinjaman Interaktif:** Slider plafon dinamis (hingga Rp 20 Juta), pilihan tenor 3–24 bulan, serta pilihan metode bunga Flat (0.8%/bln) dan Menurun (1.2%/bln).
   * **Rincian Amortisasi Bulanan:** Tabel jadwal cicilan angsuran pokok, bunga, sisa saldo, dan tombol ekspor Excel (.xlsx).
   * **Proyeksi Simpanan:** Akumulasi simpanan pokok, wajib, dan sukarela beserta estimasi dividen SHU modal tahunan.

3. **Tab 3 — Usaha Anggota / Hub UMKM (`KK-SCR-010`):**
   * **Konfirmasi PO Katering H-1:** Daftar pesanan masuk dari marketplace dengan tombol aksi cepat *Sanggup Penuhi* atau *Berhalangan*.
   * **Stepper Uji Kelayakan Sampel (`KK-DEC-003`):** Pelacakan 4 tahapan kurasi (Formulir → Drop Sampel Fisik → Uji Organoleptik → Keputusan).
   * **Analitik Rekomendasi Suplai:** Prediksi kuantitas harian berbasis riwayat transaksi toko guna mewujudkan *zero food waste*.
   * **Modal Pendaftaran Produk Baru:** Formulir pendaftaran sampel dengan kalkulator margin laba otomatis (HPP vs Harga Jual).

4. **Tab 4 — Akun & Profil Anggota (`KK-SCR-013`):**
   * **Digital E-Member Card:** Kartu identitas anggota dengan nomor NIK, unit kerja, status verifikasi, hologram, chip RFID, dan kode QR resmi.
   * **Data Kepegawaian & Kontak:** Informasi terverifikasi HRD.
   * **Menu Operasional:** Tautan log revisi kurasi produk, WhatsApp pengurus koperasi, dan modal konfirmasi logout.

---

## 3. Panduan Memulai Cepat (Local Development)

### Prasyarat
* Node.js 20+
* pnpm 9+

### Instalasi & Menjalankan Aplikasi
```bash
# Pindah ke direktori web-kopkar
cd apps/web-kopkar

# Instal dependensi
pnpm install

# Jalankan server pengembangan
pnpm dev --port 5173
```

Aplikasi dapat dibuka di peramban: `http://localhost:5173/` (atau port alternatif `5174` jika port default terpakai).

### Build Produksi & Typecheck
```bash
pnpm build
```
Menghasilkan bundle statis di folder `dist/` dengan validasi ketat TypeScript (`tsc -b`).
