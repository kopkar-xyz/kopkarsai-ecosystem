# Sequence Diagram Ekosistem KopKar SAI & Marketplace
*Dokumen Tunggal Alur Proses Bisnis Terpadu: Client, Supplier, Admin Koperasi, dan Kepala Koperasi*

> [!TIP]
> Dokumen ini tersedia dalam versi modular terpisah per topik:
> - 🛒 **Modul 1**: [01-pembelian-marketplace.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/swimlane-flows/01-pembelian-marketplace.md)
> - 🍱 **Modul 2**: [02-manajemen-produk.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/swimlane-flows/02-manajemen-produk.md)
> - 👥 **Modul 3**: [03-manajemen-user-keanggotaan.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/swimlane-flows/03-manajemen-user-keanggotaan.md)
> - 💰 **Modul 4**: [04-simulasi-simpan-pinjam.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/swimlane-flows/04-simulasi-simpan-pinjam.md)
> - 📑 **Folder Indeks**: [docs/swimlane-flows/README.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/swimlane-flows/README.md)

---

## 1. Ringkasan Arsitektur & Partisipan (Sequence Lifelines)

Sistem operasional digital KopKar SAI mengintegrasikan tata kelola Koperasi Karyawan (`apps/web-kopkar`) dan Belanja Karyawan (`apps/web-marketplace`) di bawah prinsip **"One Contract — Two Applications"**.

| Partisipan / Lifeline | Simbol & Peran Utama | Lingkup Tanggung Jawab |
| :--- | :--- | :--- |
| **Client / Pembeli** | 👤 `Client` (Karyawan PT SAI) | Memilih produk, melakukan pembayaran di muka, mengambil pesanan dengan nota/QR, melaporkan defect produk, simulasi pinjaman. |
| **Supplier / Mitra UMKM** | 🍱 `Supplier` (Mitra Koperasi) | Mendaftarkan produk, mengirim sampel uji baku, konfirmasi kesanggupan PO H-1, dropping stok harian, segregasi barang PO, merespons defect report, mengambil sisa fisik retur sore hari. |
| **Admin Koperasi / Kasir** | 🏪 `Admin Koperasi` (Pengurus Toko) | Verifikasi fisik & terima stok pagi, penyiapan pesanan offline, handle penyesuaian stok habis manual, serah terima & scan QR nota, Stock Take Opname (STO), import Excel penjualan kasir, verifikasi calon anggota, penetapan sanksi defect. |
| **Kepala Koperasi** | 🏛️ `Kepala Koperasi` (Executive Head) | Approval final berjenjang (Dual-Approval) registrasi keanggotaan (`KK-DEC-001`), otorisasi kebijakan finansial. |
| **Sistem Ekosistem** | ⚙️ `Sistem KopKar & Marketplace` | Validasi payment gateway, audio alert Jepang (*"いらっしゃいませ - Irasshaimase"*), prioritas GA, diskon & bundling Shopee-style, kalkulator limit Rp 50 juta, delisting timer 30 hari. |

---

## 2. Alur 1: Pembelian Marketplace, Promosi & Manajemen Toko

### 2.1 Same-Day Order & Penyesuaian Manual saat Stok Habis
> **Karakteristik**: Pesanan langsung dibayar lunas di muka ke rekening penampungan KopKar (*"kantong kopkar"*). Pembayaran memicu notifikasi visual dan audio alert berbahasa Jepang (*"いらっしゃいませ - Irasshaimase / Ada pesanan baru"*) di tablet/browser Admin Toko. Jika barang fisik habis, admin menghubungi pembeli langsung, selisih diselesaikan manual di luar sistem (cash/transfer/tukar barang), dan admin melakukan *adjust order* final di sistem.

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

### 2.2 Pre-Order (PO H-1) dengan Konfirmasi Kesanggupan Supplier
> **Karakteristik**: Diberlakukan cut-off time (15:00 WIB). Sistem meneruskan rekap PO ke Supplier yang memiliki tombol interaktif untuk mengonfirmasi kesanggupan (*Sanggup Penuhi* vs *Berhalangan*).

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

### 2.3 Manajemen Promosi & Paket Bundling ala Shopee
> **Karakteristik**: Diskon ganda (Normal vs Anggota) dan logika Bundling Shopee (Kombo Hemat) yang diatur penuh oleh Admin Koperasi.

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

### 2.4 Manajemen Produk Koperasi & Import STO Kasir via Excel
> **Karakteristik**: Penambahan master produk toko (manual/import) serta integrasi cepat STO menggunakan file Excel dari mesin kasir offline toko fisik berbasis Barcode/SKU untuk memotong kuantitas terjual.

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

## 3. Alur 2: Manajemen Produk Mitra, STO & Defect Report

### 3.1 Pendaftaran Produk Baru & Uji Kelayakan Sampel Baku
> **Karakteristik**: Penyerahan sampel fisik terikat jadwal baku (Selasa/Rabu, uji Kamis, hasil Jumat) dengan syarat wajib **Anggota Koperasi Aktif** (`KK-BR-002`).

```mermaid
sequenceDiagram
    autonumber
    actor Supplier as 🍱 Supplier (Anggota Koperasi Aktif)
    participant Portal as 📱 Portal KopKar
    participant Admin as 🏪 Admin & Tim Kurasi Koperasi

    Note over Supplier, Portal: 1. Pengecekan Syarat & Input Form Pendaftaran
    Supplier->>Portal: Akses menu "Pengajuan Produk Baru"
    Portal->>Portal: Validasi status: Wajib ANGGOTA AKTIF (KK-BR-002)
    Supplier->>Portal: Isi data formulir:
    Note over Supplier, Portal: - Nama Produk, Kategori, Foto Kemasan<br/>- Asal Barang (Produksi Sendiri / Reseller)<br/>- Komposisi, Masa Kedaluwarsa<br/>- Usulan Harga Beli Koperasi (HPP Supplier)<br/>- Usulan Harga Jual Konsumen
    Supplier->>Portal: Pilih jadwal penyerahan sampel fisik (Slot Selasa / Rabu)
    Portal->>Portal: Simpan draf pengajuan (PENDING_SAMPLE_SUBMISSION)
    Portal-->>Admin: Notifikasi jadwal kedatangan sampel produk baru

    Note over Supplier, Admin: 2. Penyerahan Sampel Fisik (Hari Selasa/Rabu)
    Supplier->>Admin: Serahkan fisik sampel produk & kemasan di gerai Koperasi
    Admin->>Admin: Hari Kamis: Uji mutu fisik (rasa, aroma, kebersihan kemasan, label expired, margin HPP)

    Note over Admin, Portal: 3. Pengumuman Hasil Uji Kelayakan (Hari Jumat)
    alt Hasil Pengujian: LOLOS (APPROVED)
        Admin->>Portal: Input keputusan: "LULUS / APPROVE" (Kunci HPP & Harga Jual Resmi)
        Portal->>Portal: Update status: APPROVED & terbitkan ke Master Katalog
        Portal-->>Supplier: Notifikasi: "Selamat! Produk disetujui, slot jadwal dropping harian aktif"
    else Hasil Pengujian: PERLU REVISI (REVISION_REQUIRED)
        Admin->>Portal: Input keputusan: "REVISI" & tulis catatan perbaikan detail
        Portal->>Portal: Simpan log revisi sebagai versi baru tanpa timpa riwayat (KK-BR-005)
        Portal-->>Supplier: Notifikasi catatan evaluasi (Rasa, Higienitas, Kemasan, Tanggal Expired)
        Supplier->>Portal: Perbaiki data formulir & pilih tanggal uji sampel ulang
        Portal-->>Admin: Notifikasi jadwal pengujian sampel ulang
    end
```

---

### 3.2 Kendali Mandiri Supplier & Kebijakan Delisting 30 Hari

```mermaid
sequenceDiagram
    autonumber
    actor Supplier as 🍱 Client / Supplier (Mitra)
    participant Portal as 📱 Portal Supplier
    participant Mkt as 🛒 Katalog Marketplace
    participant Cron as ⏱️ Scheduler Inaktivitas (Cron)

    Note over Supplier, Mkt: 1. Kendali Mandiri Tampilan Etalase
    opt Switch Toggle Tampilan
        Supplier->>Portal: Klik switch toggle (Turn ON / Turn OFF)
        Portal->>Mkt: Perbarui visibilitas produk di katalog (Tampil / Sembunyi)
    end

    Note over Cron, Portal: 2. Pemantauan Inaktivitas Harian (Tengah Malam)
    loop Setiap Tengah Malam
        Cron->>Cron: Hitung hari sejak suplai fisik / pesanan terakhir (inactivity_days)
        alt Hari Inaktif >= 23 Hari (Mendekati Batas 30 Hari)
            Cron->>Portal: Aktifkan Delisting Countdown Warning (H-7)
            Portal-->>Supplier: Tampilkan banner: "Peringatan: 7 Hari Lagi Produk Dihapus Otomatis!"
            opt Supplier Melakukan Suplai / Ada Order Baru
                Supplier->>Portal: Suplai fisik ke koperasi atau menerima pesanan
                Portal->>Cron: Reset counter inaktivitas ke 0 hari (Produk aman)
            end
        else Hari Inaktif >= 30 Hari Penuh
            Cron->>Portal: Eksekusi Soft-Delete / Delist Produk (status: DELISTED_INACTIVE)
            Portal->>Mkt: Hapus produk secara permanen dari etalase Marketplace
            Portal-->>Supplier: Notifikasi: "Produk dihapus karena inaktif 30 hari. Wajib daftar ulang jika ingin berjualan kembali."
        end
    end
```

---

### 3.3 Operasional Harian Koperasi & Stock Take Opname (STO)
> **Kewajiban Pengambilan Sisa (`KK-BR-007`)**: Makanan basah tidak boleh menginap di koperasi. **Supplier WAJIB mengambil seluruh sisa fisik saat pulang kerja**.

```mermaid
sequenceDiagram
    autonumber
    actor Supplier as 🍱 Supplier (Mitra)
    participant Admin as 🏪 Admin Koperasi (Kasir)
    participant Sys as ⚙️ Sistem Inventaris (POS & DB)
    actor Buyer as 👤 Pembeli (Kasir / Online)

    Note over Supplier, Sys: 1. Pagi Hari (06:30 - 07:30): Penerimaan Stok Masuk
    Supplier->>Admin: Datang membawa suplai stok fisik makanan harian
    Admin->>Admin: Cek fisik barang datang (jumlah porsi, kesegaran, kemasan)
    Admin->>Sys: Input kuantitas barang masuk (Goods Receipt)
    Sys->>Sys: Tambahkan stok etalase toko & sinkronkan kuota ke Marketplace
    Sys-->>Supplier: Notifikasi / bukti serah terima stok masuk harian

    Note over Buyer, Sys: 2. Siang Hari (08:00 - 16:00): Operasional Penjualan
    Buyer->>Admin: Transaksi belanja di kasir offline atau checkout marketplace
    Admin->>Sys: Proses transaksi penjualan
    Sys->>Sys: Pemotongan stok otomatis secara real-time
    Supplier->>Sys: Pantau sisa stok & penjualan berjalan melalui ponsel

    Note over Admin, Supplier: 3. Sore Hari (16:00 - 17:00): STO & Wajib Ambil Sisa
    Admin->>Admin: Eksekusi STO (Stock Take Opname) menghitung sisa fisik di rak
    Admin->>Sys: Input angka sisa fisik ke modul STO
    Sys->>Sys: Kalkulasi: Barang Terjual = Barang Masuk - Sisa Fisik
    Sys->>Sys: Terbitkan laporan penjualan harian & reset stok makanan basah ke 0
    Supplier->>Sys: Cek sisa fisik produk yang belum laku di Koperasi
    Note over Supplier, Admin: ⚠️ WAJIB DIAMBIL: Makanan basah tidak boleh menginap (KK-BR-007)
    Supplier->>Admin: Datang saat jam pulang kerja & ambil seluruh sisa fisik makanan
    Admin->>Supplier: Serahkan fisik makanan sisa & cairkan uang hak hasil jualan
    Supplier-->>Admin: Konfirmasi penerimaan sisa barang dan uang bagi hasil
```

---

### 3.4 Fitur Pelaporan Cacat Produk (Defect Report) & Sanksi Bertingkat
> **Kebijakan Defect Makanan**: Makanan konsumsi **tidak ada pengembalian uang (no refund)**. Laporan menjadi dasar penegakan mutu & sanksi bertingkat oleh Admin.

```mermaid
sequenceDiagram
    autonumber
    actor Anggota as 👤 Anggota Koperasi (Pembeli)
    participant Portal as 📱 Web KopKar & Marketplace
    actor Supplier as 🍱 Supplier (Mitra)
    participant Admin as 🏪 Admin Koperasi

    Note over Anggota, Portal: 1. Anggota Menemukan Defect & Submit Laporan
    Anggota->>Portal: Buka menu "Laporkan Cacat Produk / Defect Report"
    Anggota->>Portal: Isi form laporan keluhan:
    Note over Anggota, Portal: - Pilih Produk & Tanggal Pembelian<br/>- Jenis Cacat (Basi, Bau Asam, Benda Asing, Kemasan Rusak)<br/>- Unggah Foto Bukti Cacat & Deskripsi Singkat
    Portal->>Portal: Simpan tiket laporan (Status: REPORTED_PENDING_ACTION)
    Note over Anggota: Info ke Anggota: "Laporan diterima untuk evaluasi mutu.<br/>(Kebijakan makanan konsumsi: Tidak ada refund uang)"

    Note over Portal, Supplier: 2. Notifikasi Masuk ke Supplier & Tindak Lanjut
    Portal-->>Supplier: Push Notifikasi: "Terdapat Laporan Defect pada Produk Anda"
    Supplier->>Portal: Buka detail tiket laporan & lihat foto bukti cacat
    Supplier->>Supplier: Melakukan investigasi internal (proses masak / kemasan)
    Supplier->>Portal: Klik tombol: "Accept Perbaikan" & tulis rencana perbaikan mutu
    Portal->>Portal: Update status tiket: FIX_ACCEPTED_BY_SUPPLIER

    Note over Admin, Supplier: 3. Verifikasi Admin & Eksekusi Sanksi Bertingkat
    Portal-->>Admin: Notifikasi: Supplier telah menanggapi laporan defect
    Admin->>Admin: Buka halaman "Manajemen Laporan & Mutu Produk"
    Admin->>Admin: Periksa bukti cacat dan komitmen perbaikan supplier
    Admin->>Portal: Tentukan tindakan sanksi pada halaman laporan:
    alt Sanksi Ringan: Teguran Resmi
        Admin->>Portal: Pilih opsi: "Teguran Resmi Tertulis"
        Portal-->>Supplier: Surat peringatan resmi masuk ke akun supplier
    else Sanksi Sedang: Produk Disuruh Cuti (Skorsing Sementara)
        Admin->>Portal: Pilih opsi: "Produk Disuruh Cuti" (misal: 7 s/d 30 Hari)
        Portal->>Portal: Nonaktifkan produk dari etalase Marketplace selama periode cuti
        Portal-->>Supplier: Notifikasi skorsing sementara produk
    else Sanksi Berat: Produk Di-Blacklist
        Admin->>Portal: Pilih opsi: "Blacklist Produk"
        Portal->>Portal: Hapus produk secara permanen dari sistem KopKar
        Portal-->>Supplier: Notifikasi penghapusan permanen produk
    else Sanksi Fatal: Supplier Di-Blacklist Total (Kasus Basi Massal/Keracunan)
        Admin->>Portal: Pilih opsi: "Blacklist Supplier"
        Portal->>Portal: Nonaktifkan seluruh produk & bekukan akun supplier permanen
        Portal-->>Supplier: Pemberitahuan pemutusan hubungan kemitraan koperasi
    end
    Portal->>Portal: Tutup tiket laporan (Status: RESOLVED_SANCTION_APPLIED)
```

---

## 4. Alur 3: Manajemen User & Keanggotaan (Dual-Approval)

### 4.1 Registrasi Pegawai Non-Anggota Menjadi Anggota Koperasi
> **Karakteristik**: Berkas identitas NIK dan foto KTP wajib diverifikasi berjenjang oleh Admin Toko (Tahap 1) dan Kepala Koperasi (Tahap 2) sebelum akun diaktifkan (`KK-DEC-001`).

```mermaid
sequenceDiagram
    autonumber
    actor Pegawai as 👤 Pegawai Non-Anggota
    participant Gateway as 🌐 Portal Login / Gateway
    participant Sys as ⚙️ Sistem Shared Auth & S3
    participant Admin as 🏪 Admin Toko (Tahap 1)
    actor Kepala as 🏛️ Kepala Koperasi (Tahap 2)

    Note over Pegawai, Gateway: 1. Pendaftaran Mandiri Calon Anggota
    Pegawai->>Gateway: Klik "Daftar Jadi Anggota Koperasi"
    Pegawai->>Gateway: Isi form pendaftaran (NIK, Nama, Divisi, No WA, Upload Foto KTP/ID Card)
    Pegawai->>Gateway: Setujui komitmen simpanan pokok & simpanan wajib
    Gateway->>Sys: Submit registrasi akun calon anggota
    Sys->>Sys: Simpan foto KTP ke S3 Storage privat
    Sys->>Sys: Buat akun dengan status: PENDING_ADMIN_VERIFICATION (Login Terkunci)
    Sys-->>Pegawai: Notifikasi: "Pendaftaran terkirim, menunggu verifikasi berkas"

    Note over Sys, Admin: 2. Verifikasi Dokumen Tahap 1 (Admin Toko)
    Sys-->>Admin: Notifikasi pendaftaran calon anggota baru
    Admin->>Admin: Buka menu "Verifikasi Calon Anggota"
    Admin->>Admin: Cek validitas NIK ke database HRD & verifikasi foto KTP
    alt Verifikasi Berkas Gagal / Dokumen Palsu
        Admin->>Sys: Klik "Tolak Berkas" & input catatan penolakan
        Sys->>Sys: Update status akun: REJECTED
        Sys-->>Pegawai: Pemberitahuan via WA/Email bahwa pendaftaran ditolak
    else Verifikasi Berkas Sah (Lolos Tahap 1)
        Admin->>Sys: Klik "Lolos Verifikasi"
        Sys->>Sys: Update status akun: PENDING_HEAD_APPROVAL
        Sys-->>Kepala: Notifikasi berkas siap diotorisasi

        Note over Kepala, Sys: 3. Otorisasi Final Tahap 2 (Kepala Koperasi - KK-DEC-001)
        Kepala->>Kepala: Buka menu "Otorisasi Keanggotaan" di dashboard eksekutif
        Kepala->>Kepala: Review kelayakan profil calon anggota
        alt Otorisasi Ditolak Kepala Koperasi
            Kepala->>Sys: Klik "Tolak / Batalkan Permohonan"
            Sys->>Sys: Update status akun: REJECTED
            Sys-->>Pegawai: Pemberitahuan penolakan keanggotaan
        else Otorisasi Disetujui (Dual-Approval Lengkap)
            Kepala->>Sys: Klik "Setujui Keanggotaan" (Mengesahkan SK Anggota)
            Sys->>Sys: Update status akun: ACTIVE_MEMBER & tetapkan Role ANGGOTA
            Sys->>Sys: Buka kunci akses login NIK & Password
            Sys-->>Pegawai: 🎉 Pesan WA/Email: "Selamat! Keanggotaan Koperasi SAI Anda Telah Aktif"
            Note over Pegawai: Pegawai login ke sistem, mendapatkan badge Anggota,<br/>hak diskon spesial 13%, dan akses layanan pinjaman (Sinjam)
        end
    end
```

---

## 5. Alur 4: Simulasi Simpan Pinjam (Sinjam / Bantuan Karyawan)

### 5.1 Validasi Limit Plafon Akumulasi Rp 50 Juta & Kalkulator Simulasi
> **Karakteristik**: Anggota dapat melihat total tagihan berjalan. Jika utang $\ge$ Rp 50 Juta, tombol pengajuan diblokir. Jika utang $<$ Rp 50 Juta, kalkulator simulasi terbuka untuk nominal sisa plafon. Komponen interaktif slider diatur oleh Frontend Developer.

```mermaid
sequenceDiagram
    autonumber
    actor Anggota as 👤 Anggota Koperasi
    participant App as 📱 Web KopKar (Modul Sinjam - Frontend)
    participant DB as 🗄️ Database Finansial KopKar
    actor Pengurus as 🏛️ Pengurus Finansial Koperasi

    Note over Anggota, App: 1. Akses Layanan & Fetch Status Utang Aktif
    Anggota->>App: Buka menu "Layanan Bantuan Finansial / Program Peduli"
    App->>DB: Query riwayat pinjaman aktif (current_outstanding_debt)
    DB-->>App: Return total saldo utang berjalan (misal: Rp X)
    App->>App: Evaluasi terhadap MAX_LOAN_CEILING = Rp 50.000.000

    Note over App, Anggota: 2. Evaluasi Kondisi Batas Plafon Pinjaman
    alt Kondisi A: Total Utang Aktif >= Rp 50.000.000 (Limit Terpenuhi)
        App->>App: Kunci tombol pengajuan baru (Status: DISABLED)
        App-->>Anggota: Tampilkan Info: Total Utang Rp X & Sisa Plafon: Rp 0
        App-->>Anggota: ⛔ Warning Banner: "Plafon Maksimal Rp 50 Juta Telah Tercapai.<br/>Harap selesaikan angsuran berjalan sebelum mengajukan kembali."
        Note over Anggota: Anggota hanya dapat memantau jadwal angsuran cicilan berjalan
    else Kondisi B: Total Utang Aktif < Rp 50.000.000 (Tersedia Sisa Plafon)
        App->>App: Hitung Sisa Plafon = Rp 50.000.000 - Total Utang Aktif
        App-->>Anggota: Tampilkan Info: Total Utang Rp X & Sisa Plafon: Rp (50 Jt - X)
        App->>App: Aktifkan kalkulator simulasi interaktif (Max Input = Sisa Plafon)

        Note over Anggota, App: 3. Kalkulator Simulasi Interaktif & Amortisasi (Aturan Frontend)
        Anggota->>App: Input nominal pinjaman yang diinginkan (<= Sisa Plafon)
        Anggota->>App: Pilih tenor pinjaman (3, 6, 12, atau 24 bulan)
        App->>App: Hitung rincian amortisasi (Pokok, Jasa Koperasi, & Estimasi Potongan Gaji)
        App-->>Anggota: Tampilkan tabel angsuran bulanan & beban terhadap THP (< 30%)

        opt Ekspor Simulasi Resmi
            Anggota->>App: Klik "Unduh Simulasi Excel (.xlsx)"
            App-->>Anggota: Unduh berkas ber-watermark Disclaimer Indikatif Resmi (KK-BR-010)
        end

        opt Konsultasi / Pengajuan Berkas
            Anggota->>App: Kirim pengajuan awal bantuan finansial
            App->>Pengurus: Notifikasi pengajuan pinjaman baru (PENDING_REVIEW)
            Pengurus->>Pengurus: Verifikasi kapasitas bayar (DSR <= 30% THP) & proses akad
        end
    end
```

---

## 6. Matriks Status Transisi & Business Rule Invariants

Seluruh alur proses bisnis di atas terikat secara ketat pada aturan kanonikal ekosistem KopKar SAI:

| Modul / Domain | Kode Aturan | Ketentuan Mutlak Sistem |
| :--- | :--- | :--- |
| **Keanggotaan** | `KK-BR-001` / `KK-DEC-001` | **Dual-Approval Berjenjang**: Pendaftaran anggota wajib diverifikasi awal oleh Admin Toko lalu disetujui final oleh Kepala Koperasi sebelum akun dapat login. |
| **Mitra Supplier** | `KK-BR-002` | Hanya anggota terverifikasi yang berhak mendaftar sebagai supplier produk. |
| **Pendaftaran Produk** | `KK-BR-004` / `KK-DEC-003` | Jadwal penyerahan sampel baku: Selasa/Rabu (Shift A/B, SAI B/T), uji Kamis, pengumuman Jumat. |
| **Inaktivitas 30 Hari** | `KK-BR-006` | Supplier yang tidak menyuplai produk dan tidak ada order selama 30 hari berturut-turut di-delist otomatis dan wajib mendaftar ulang jika ingin berjualan kembali. |
| **Pengambilan Sisa STO** | `KK-BR-007` | Barang titipan yang rusak, kedaluwarsa, atau sisa tidak laku harian menjadi tanggungan supplier dan **wajib diambil kembali saat jam pulang kerja**. |
| **Komplain & Sanksi** | `KK-BR-008` | Pelaporan defect makanan tidak ada refund uang; Admin menjatuhkan sanksi bertingkat (Teguran, Cuti Produk, Blacklist Produk, Blacklist Supplier). |
| **Pemesanan Marketplace** | `MP-BR-002` / `MP-BR-004` | Pesanan Same-Day diverifikasi staf toko; antrean prioritas belanja untuk divisi General Affairs (`is_ga = true`). Penyesuaian stok habis diurus manual di luar sistem. |
| **Promosi Shopee-Style** | Konfigurasi Toko | Pengaturan harga diskon (Normal vs Anggota) dan paket bundling (Kombo Hemat) diatur penuh oleh Admin Koperasi. |
| **Import STO Kasir** | POS Reconciliation | Berkas Excel kasir toko fisik berbasis Barcode/SKU berisi data barang terjual untuk memotong kuantitas stok otomatis. |
| **Simpan Pinjam** | `KK-BR-009` / `KK-BR-010` | Batas akumulasi total pinjaman maksimal **Rp 50.000.000**. Anggota dengan utang >= Rp 50 Juta diblokir dari pengajuan baru. Setiap ekspor simulasi menyertakan disclaimer indikatif resmi. |
