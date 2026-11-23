# Modul 2: Manajemen Produk Mitra (Supplier), Uji Sampel, STO & Defect Report
*Dokumen Alur Proses Bisnis & Sequence Diagram Tata Kelola Produk, Sampel, Inventaris, dan Laporan Defect*

---

## 1. Deskripsi Modul & Lingkup Bisnis

Modul Manajemen Produk mengatur siklus hidup produk titipan mitra UMKM/Supplier di ekosistem KopKar dan Marketplace, meliputi:
1. **Pendaftaran Produk Baru & Uji Kelayakan Sampel**: Seleksi mutu makanan basah terikat jadwal baku (Selasa/Rabu penyerahan sampel, Kamis pengujian, Jumat pengumuman kelayakan) dengan syarat mutlak **Supplier wajib Anggota Koperasi Aktif** (`KK-BR-002`).
2. **Kendali Mandiri Supplier & Delisting 30 Hari**: Switch toggle *Turn ON / Turn OFF* etalase serta mekanisme proteksi inaktivitas 30 hari (*countdown warning H-7* sebelum otomatis di-delist).
3. **Operasional Harian & STO Koperasi**: Penerimaan barang pagi, operasional kasir, Stock Take Opname (STO) sore hari, serta **kewajiban supplier mengambil seluruh sisa produk saat jam pulang kerja** (`KK-BR-007`).
4. **Fitur Pelaporan Cacat Produk (Defect Report) & Sanksi Bertingkat**: Pelaporan makanan rusak/basi oleh anggota, *notice & accept* perbaikan oleh supplier, serta penjatuhan sanksi bertingkat oleh Admin (Teguran, Produk Cuti, Produk Blacklist, hingga Supplier Blacklist).

---

## 2. Alur 2.1: Pendaftaran Produk Baru & Uji Sampel Baku

> **Ketentuan Baku Uji Sampel (`KK-BR-004` / `KK-DEC-003`)**:
> - Penyerahan fisik sampel hanya dilayani pada hari **Selasa atau Rabu** (Shift A atau Shift B di lokasi SAI B atau SAI T).
> - Pengujian kelayakan organoleptik dan kemasan dilaksanakan oleh tim Koperasi paling lambat hari **Kamis**.
> - Pengumuman hasil status resmi diterbitkan setiap hari **Jumat**.
> - Pengajuan produk yang berstatus **Revisi** wajib mencatat versi baru tanpa menimpa histori audit (`KK-BR-005`).

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

## 3. Alur 2.2: Kendali Mandiri Supplier & Kebijakan Delisting 30 Hari

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

## 4. Alur 2.3: Operasional Harian Koperasi & Stock Take Opname (STO)

> **Kewajiban Pengambilan Sisa (`KK-BR-007`)**: Produk makanan basah tidak boleh menginap di koperasi karena risiko kedaluwarsa. **Supplier WAJIB mengambil seluruh sisa fisik produk saat jam pulang kerja**. Kerusakan atau barang tidak laku menjadi tanggungan supplier.

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

## 5. Alur 2.4: Fitur Pelaporan Cacat Produk (Defect Report) & Sanksi Bertingkat

> **Kebijakan Defect Makanan**: Karena produk merupakan makanan konsumsi basah (*perishable*), **tidak ada pengembalian uang (no refund)** kepada anggota pembeli. Namun, laporan ini berfungsi sebagai instrumen penjaminan mutu dan dasar penjatuhan sanksi administratif bagi supplier.
> 
> **Pilihan Tingkatan Sanksi oleh Admin**:
> 1. **Teguran Resmi Tertulis** (Catatan evaluasi mutu).
> 2. **Produk Disuruh Cuti** (Skorsing sementara: produk dinonaktifkan dari katalog selama periode evaluasi).
> 3. **Produk Di-Blacklist** (Produk tersebut dihapus permanen dari koperasi).
> 4. **Supplier Di-Blacklist** (Seluruh produk mitra dinonaktifkan dan kemitraan diputus permanen).

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

## 6. Referensi Aturan Bisnis Terkait

- `KK-BR-002`: Syarat wajib supplier adalah anggota koperasi aktif terverifikasi.
- `KK-BR-003`: Format penentuan HPP dan usulan harga jual produk.
- `KK-BR-004` / `KK-DEC-003`: Siklus baku penyerahan sampel (Selasa/Rabu), uji Kamis, dan pengumuman Jumat.
- `KK-BR-005`: Riwayat versi perbaikan form tanpa menghapus audit trail.
- `KK-BR-006`: Delisting otomatis setelah 30 hari tanpa suplai dan tanpa transaksi.
- `KK-BR-007`: Tanggung jawab finansial dan kewajiban retur sisa barang harian oleh supplier.
- `KK-BR-008`: Manajemen keluhan mutu produk dan sanksi bertingkat (Teguran, Cuti Produk, Blacklist Produk, Blacklist Supplier).
