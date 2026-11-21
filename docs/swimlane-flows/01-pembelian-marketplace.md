# Modul 1: Pembelian Marketplace, Promosi Shopee-Style & Manajemen Toko
*Dokumen Alur Proses Bisnis & Sequence Diagram Pemesanan, Diskon, Bundling, dan Inventaris Toko*

---

## 1. Deskripsi Modul & Lingkup Bisnis

Modul ini mengatur seluruh siklus perdagangan pada platform Marketplace (`apps/web-marketplace`) dan operasional gerai Koperasi (`apps/web-kopkar`), mencakup:
1. **Pemesanan Hari H (Same-Day Order)** dengan audio alert Jepang (*"いらっしゃいませ! - Irasshaimase"*), antrean prioritas GA, serta alur penyesuaian manual (*order adjustment*) jika stok fisik habis.
2. **Pemesanan Esok Hari (Pre-Order / PO H-1)** dengan cut-off time, konfirmasi kesanggupan supplier, segregasi barang PO, dan pengambilan mandiri.
3. **Akses Kiosk / Tablet Pabrik**: Akses cepat pemesanan di area pabrik bagi karyawan menggunakan NIK.
4. **Manajemen Diskon & Paket Bundling ala Shopee**: Pengaturan harga bertingkat (Diskon Normal vs Diskon Anggota Koperasi), flash sale/periode promo, kuota stok diskon, serta paket kombo hemat (*Bundling Shopee Logic*).
5. **Manajemen Produk Koperasi Sendiri & Import STO Kasir**: Pengelolaan barang milik toko koperasi (manual/import) serta integrasi impor berkas Excel penjualan kasir fisik berbasis Barcode/SKU untuk pemotongan stok otomatis.

---

## 2. Alur 1.1: Pemesanan Hari H (Same-Day Order) & Penyesuaian Stok

> **Kebijakan Stok Habis**: Jika barang yang sudah dibayar ternyata habis akibat selisih kasir fisik offline, hal ini merupakan tanggung jawab admin. Admin akan menghubungi pembeli secara langsung via chat. Penanganan selisih dana (refund tunai, transfer balik, atau ganti produk seharga) diselesaikan secara manual di luar sistem. Admin kemudian melakukan penyesuaian (*adjust*) daftar barang final di sistem.

```mermaid
sequenceDiagram
    autonumber
    actor Client as 👤 Client (Pembeli / GA)
    participant Mkt as 🛒 Web Marketplace / Kiosk
    participant Gw as 💳 Payment Gateway Mandiri/QRIS
    participant Admin as 🏪 Admin Koperasi (Kasir)
    actor Supplier as 🍱 Supplier (Mitra)

    Note over Client, Mkt: 1. Pemilihan Produk & Checkout
    opt Pemesanan via Kiosk / Tablet Pabrik
        Client->>Mkt: Login cepat menggunakan NIK di Tablet Koperasi
    end
    Client->>Mkt: Pilih produk ready stock & klik Checkout
    opt Jika Pemesan adalah Divisi General Affairs (is_ga = true)
        Mkt->>Mkt: Beri label GA Priority (Otomatis posisi teratas di antrean kasir)
    end
    Mkt->>Gw: Request pembuatan tagihan pembayaran
    Gw-->>Client: Tampilkan QRIS / Virtual Account Mandiri

    Note over Client, Gw: 2. Pembayaran Lunas di Muka (Kantong KopKar)
    Client->>Gw: Bayar lunas tagihan belanja
    Gw->>Gw: Verifikasi settlement masuk ke rekening penampungan KopKar
    Gw-->>Mkt: Webhook konfirmasi pembayaran sukses (PAID_PROCESSING)

    Note over Mkt, Admin: 3. Audio Alert Jepang & Notifikasi Admin
    Mkt->>Client: Terbitkan E-Nota digital & QR Code Pengambilan
    Mkt-->>Admin: WebSocket order baru (Prioritas GA tampil paling atas)
    Note over Admin: 🔊 Audio Alert berbunyi di tablet/browser:<br/>"いらっしゃいませ! (Irasshaimase / Pesanan Masuk)"

    Note over Admin, Client: 4. Pengecekan Fisik & Penanganan Out-of-Stock
    Admin->>Admin: Cek fisik barang di etalase toko
    alt Fisik Barang Tersedia Lengkap
        Admin->>Admin: Siapkan & bungkus makanan/barang
        Admin->>Mkt: Centang status: "Pesanan Siap Diambil" (READY_FOR_PICKUP)
        Mkt-->>Client: Push Notifikasi: "Pesanan Anda siap diambil di Koperasi"
    else Terjadi Selisih / Stok Fisik Habis (Kasir Offline)
        Note over Admin, Client: Admin hubungi pembeli langsung (Chat Personal)
        Admin->>Client: Negosiasi manual: Ganti produk lain, transfer balik, atau refund cash
        Client-->>Admin: Sepakati solusi penggantian barang / refund manual
        Admin->>Admin: Selesaikan selisih finansial secara manual di luar sistem
        Admin->>Mkt: Lakukan "Adjust Barang Final" pada pesanan di sistem
        Admin->>Mkt: Update status pesanan: READY_FOR_PICKUP
        Mkt-->>Client: Push Notifikasi update barang siap diambil
    end

    Note over Client, Admin: 5. Pengambilan Mandiri & Verifikasi E-Nota
    Client->>Admin: Datang ke gerai Koperasi & tunjukkan QR Code / E-Nota
    Admin->>Admin: Scan QR Code / verifikasi nomor invoice & serahkan barang
    Admin->>Mkt: Centang status: "Sudah Diambil" (COMPLETED)
    Mkt->>Mkt: Alokasikan saldo hak supplier ke buku rekapitulasi

    Note over Admin, Supplier: 6. Settlement Finansial Sore Hari
    Admin->>Admin: Rekap penjualan harian saat jam pulang kerja
    Admin->>Supplier: Pencairan dana hak bagi hasil (Transfer Online / Tunai)
    Supplier-->>Admin: Konfirmasi penerimaan pembayaran
```

---

## 3. Alur 1.2: Pre-Order (PO H-1) dengan Konfirmasi Kesanggupan Supplier

> **Kebijakan PO H-1**: Diberlakukan batas waktu pemesanan (*Cut-off Time*, misal pukul 15:00 WIB). Sistem meneruskan rekap PO ke Supplier yang memiliki tombol interaktif untuk mengonfirmasi kesanggupan (*Sanggup Penuhi* vs *Berhalangan*).

```mermaid
sequenceDiagram
    autonumber
    actor Client as 👤 Client (Pembeli)
    participant Mkt as 🛒 Web Marketplace
    participant Gw as 💳 Payment Gateway / KopKar
    actor Supplier as 🍱 Supplier (Mitra Katering)
    participant Admin as 🏪 Admin Koperasi (Kasir)

    Note over Client, Mkt: 1. Pemesanan Sebelum Cut-Off Time (Maks. 15:00 WIB)
    Client->>Mkt: Pilih menu PO H-1, jumlah porsi, & tanggal pengantaran
    Mkt->>Gw: Terbitkan invoice pembayaran PO
    Client->>Gw: Bayar lunas ke rekening KopKar sebelum cut-off
    Gw-->>Mkt: Konfirmasi pembayaran lunas diterima (CONFIRMED_PREORDER)
    Mkt->>Client: Terbitkan E-Nota & QR Code tiket PO

    Note over Mkt, Supplier: 2. Notifikasi & Konfirmasi Kesanggupan Supplier
    Mkt-->>Supplier: Notifikasi rekap PO H-1 masuk ke portal supplier
    Mkt-->>Admin: Tampilkan daftar antrean PO di dashboard
    alt Supplier Mengonfirmasi "Sanggup Penuhi"
        Supplier->>Mkt: Klik tombol: "Sanggup Penuhi"
        Mkt-->>Admin: Status PO: SUPPLIER_CONFIRMED (Siap produksi)
        Supplier->>Supplier: Memasak & mengemas porsi pesanan di dapur
    else Supplier Mengonfirmasi "Berhalangan / Stok Bahan Habis"
        Supplier->>Mkt: Klik tombol: "Berhalangan" & isi alasan
        Mkt-->>Admin: Alert: Supplier berhalangan memenuhi PO
        Admin->>Client: Hubungi pemesan (tawarkan ganti menu mitra lain / refund)
        Admin->>Mkt: Batalkan PO & selesaikan refund dana ke pembeli
    end

    Note over Supplier, Admin: 3. Hari-H Pagi (06:30 - 07:30): Pengantaran & Segregasi
    Supplier->>Admin: Bawa paket PO katering & barang etalase ke Koperasi
    Supplier->>Admin: Segregasi fisik bersama: Pisahkan paket PO dari jualan bebas
    Admin->>Admin: Tempel stiker identitas pemesan & taruh di "PO Pickup Counter"
    Admin->>Mkt: Konfirmasi barang PO tiba (PO_READY_FOR_PICKUP)
    Mkt-->>Client: Push Notifikasi: "Pesanan katering PO telah tiba di Koperasi"

    Note over Client, Admin: 4. Pengambilan & Settlement
    Client->>Admin: Tunjukkan E-Nota / QR Code saat jam istirahat
    Admin->>Admin: Verifikasi nota, serahkan makanan, & centang COMPLETED
    Admin->>Supplier: Sore hari: Cairkan dana hasil penjualan PO ke Supplier
```

---

## 4. Alur 1.3: Manajemen Promosi & Bundling ala Shopee (Admin Toko)

> **Konsep Promosi Shopee-Style**:
> - **Penetapan Harga & Diskon**: Sepenuhnya diatur oleh Koperasi (Supplier hanya menitipkan barang dengan HPP tetap).
> - **Diskon Ganda (Tiering)**: Terdapat diskon khusus **Normal (Non-Anggota, misal 10%)** dan diskon khusus **Anggota Koperasi (misal 13%)**.
> - **Paket Kombo Hemat (Bundling)**: Mengadopsi logika bundling Shopee di mana beberapa produk digabung dengan harga paket hemat. Pengaturan kuota promo, periode waktu (start-end date), dan batas max pembelian per orang dikonfigurasi fleksibel.

```mermaid
sequenceDiagram
    autonumber
    actor Admin as 🏪 Admin Koperasi (Marketing)
    participant Mkt as ⚙️ Sistem Marketplace (Promo Engine)
    actor Pembeli as 👤 Pembeli (Anggota / Non-Anggota)

    Note over Admin, Mkt: 1. Konfigurasi Diskon Produk (Shopee-Style)
    Admin->>Mkt: Buka menu "Manajemen Diskon & Promosi"
    Admin->>Mkt: Pilih produk yang akan dipromosikan (Barang Toko atau Supplier)
    Admin->>Mkt: Input parameter diskon ala Shopee:
    Note over Admin, Mkt: - Harga Awal (Normal) & Harga Coret<br/>- Kuota Stok Promo & Batas Max Beli per Akun<br/>- Periode Promo (Tanggal/Jam Mulai s/d Selesai)<br/>- Diskon Umum (misal 10%) vs Diskon Anggota (misal 13%)
    Mkt->>Mkt: Simpan aturan promosi & jadwalkan aktivasi

    Note over Admin, Mkt: 2. Konfigurasi Paket Bundling / Kombo Hemat
    Admin->>Mkt: Buka menu "Paket Bundling / Kombo Hemat"
    Admin->>Mkt: Pilih produk komponen (misal: Roti A + Susu B)
    Admin->>Mkt: Tentukan harga spesial paket kombo (Logika Bundling Shopee)
    Mkt->>Mkt: Terbitkan promo bundling di etalase Marketplace

    Note over Pembeli, Mkt: 3. Pengalaman Belanja & Penerapan Diskon
    Pembeli->>Mkt: Buka katalog produk / paket bundling
    alt Pembeli Login sebagai ANGGOTA AKTIF
        Mkt-->>Pembeli: Tampilkan harga khusus Anggota (Diskon 13% + Badge Member)
    else Pembeli NON-ANGGOTA
        Mkt-->>Pembeli: Tampilkan harga normal / promo umum (Diskon 10%)
    end
    Pembeli->>Mkt: Checkout pesanan promo / bundling
    Mkt->>Mkt: Validasi kuota promo & batas max beli per akun
    Mkt->>Mkt: Potong stok masing-masing komponen produk secara real-time
```

---

## 5. Alur 1.4: Manajemen Produk Koperasi & Import STO Kasir via Excel

> **Produk Toko Koperasi**: Barang retail milik Koperasi (bukan titipan UMKM, seperti ATK, minuman kemasan pabrik, snack) dapat ditambahkan manual atau diimpor massal.
> **Import Cepat STO Kasir**: Berdasarkan hasil kesepakatan, sistem menyediakan fitur impor Excel hasil ekspor kasir toko fisik. Sistem mencocokkan data berdasarkan **Barcode / SKU** yang berisi data **"Barang Terjual di Kasir"**, sehingga sistem secara otomatis memotong stok berjalan:
> $$\text{Sisa Stok Sistem} = \text{Stok Awal} - \text{Terjual di Kasir Fisik} - \text{Terjual Online}$$

```mermaid
sequenceDiagram
    autonumber
    actor Admin as 🏪 Admin Toko / Kasir
    participant POS as 🖥️ Mesin Kasir Offline (Toko Fisik)
    participant Sys as ⚙️ Sistem Inventaris KopKar
    participant Mkt as 🛒 Katalog Marketplace

    Note over Admin, Sys: 1. Tambah Produk Toko Koperasi Sendiri
    alt Input Manual
        Admin->>Sys: Isi form produk toko (Barcode/SKU, Nama, Kategori, Harga Beli, Harga Jual, Stok Awal)
        Sys->>Sys: Simpan ke master inventaris produk koperasi
    else Import Massal Master Produk
        Admin->>Sys: Unggah berkas Excel/CSV daftar produk baru
        Sys->>Sys: Parsing data massal & simpan seluruh produk baru ke database
    end
    Sys->>Mkt: Sinkronkan katalog produk toko ke etalase online

    Note over Admin, Sys: 2. Operasional Harian & Ekspor Kasir Offline
    POS->>POS: Transaksi penjualan kasir fisik berjalan sepanjang hari
    Admin->>POS: Di akhir shift/break, unduh file "Laporan Penjualan Kasir (.xlsx)"
    Note over Admin, POS: File Excel kasir berisi kolom: Barcode/SKU, Nama Barang, Qty Terjual

    Note over Admin, Sys: 3. Import STO Cepat untuk Update Stok Harian
    Admin->>Sys: Buka menu "Stock Take Opname (STO) & Penyesuaian Stok"
    Admin->>Sys: Unggah file Excel Penjualan Kasir Offline
    Sys->>Sys: Baca Barcode / SKU & cocokkan dengan data inventaris
    Sys->>Sys: Eksekusi rumus pengurangan stok otomatis:<br/>Sisa Stok = Stok Awal - Qty Terjual Kasir - Qty Terjual Online
    Sys->>Sys: Perbarui master stok etalase & catat log rekonsiliasi STO
    Sys->>Mkt: Perbarui sisa stok live di etalase Marketplace
    Sys-->>Admin: Tampilkan ringkasan rekonsiliasi: Stok Cocok, Selisih, dan Omzet Kasir
```

---

## 6. Referensi Aturan Bisnis Terkait

- `MP-BR-002`: Verifikasi fisik etalase toko dan alur penyesuaian jika stok habis.
- `MP-BR-003`: Aturan Pre-Order H-1 makanan basah dan konfirmasi kesanggupan supplier.
- `MP-BR-004`: Hak antrean prioritas belanja divisi General Affairs (`is_ga = true`).
- `MP-BR-007`: Prosedur rekonsiliasi kasir dan refund manual di luar sistem.
- Promo Shopee-Style: Pengaturan diskon ganda (Anggota vs Non-Anggota) dan paket kombo hemat bundling.
