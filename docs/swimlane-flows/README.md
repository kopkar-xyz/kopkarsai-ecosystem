# Indeks Sequence Diagram Ekosistem KopKar SAI & Marketplace
*Koleksi Dokumentasi Alur Proses Bisnis & Sequence Diagram Terpisah Berdasarkan Modul*

Selamat datang di repositori alur proses bisnis interaktif (**Sequence Diagram**) ekosistem digital **KopKar SAI** (`kopkarsai-ecosystem`) di bawah tata kelola **"One Contract — Two Applications"**. Seluruh alur telah diselaraskan dengan hasil wawancara, notulensi rapat manajer, dan keputusan arsitektur kontrak.

---

## 📚 Daftar Modul Alur Proses

Berikut adalah pembagian dokumen alur proses bisnis sequence diagram per modul fungsional:

| Modul | Nama Dokumen & Tautan | Cakupan Sequence Diagram Utama |
| :---: | :--- | :--- |
| **01** | [01-pembelian-marketplace.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/swimlane-flows/01-pembelian-marketplace.md) | **Pembelian Marketplace & Manajemen Toko**:<br/>• **Same-Day Order**: Audio alert Jepang (*"いらっしゃいませ! - Irasshaimase"*), antrean prioritas GA, pick-up QR/nota, dan **penyesuaian manual (*adjust order*) saat stok habis** (selisih diurus manual: cash/transfer/ganti produk).<br/>• **Pre-Order H-1**: Cut-off time 15:00, **tombol konfirmasi kesanggupan supplier** (*Sanggup Penuhi* vs *Berhalangan*), segregasi fisik pagi.<br/>• **Akses Kiosk / Tablet**: Pemesanan cepat di area pabrik dengan NIK.<br/>• **Diskon & Bundling Shopee-Style**: Diskon Normal vs Diskon Anggota, flash sale kuota/periode, paket kombo hemat.<br/>• **Produk Koperasi & Import STO**: Input manual/import produk toko, serta **import Excel kasir toko fisik berbasis Barcode/SKU** untuk auto-potong stok STO cepat. |
| **02** | [02-manajemen-produk.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/swimlane-flows/02-manajemen-produk.md) | **Manajemen Produk Mitra, STO & Defect Report**:<br/>• **Pendaftaran & Uji Sampel Baku**: Syarat wajib Anggota Aktif (`KK-BR-002`), jadwal baku penyerahan sampel (Selasa/Rabu), uji Kamis, hasil Jumat.<br/>• **Kendali Mandiri Supplier**: Switch toggle *Turn ON/OFF* & countdown delisting inaktivitas 30 hari.<br/>• **Operasional & STO Sore**: Goods Receipt pagi, STO sore, **kewajiban supplier ambil seluruh sisa fisik saat pulang** (`KK-BR-007`).<br/>• **Fitur Report Defect Produk & Sanksi**: Laporan makanan cacat/basi oleh anggota (tanpa refund makanan), *notice & accept* perbaikan supplier, verifikasi admin & **penerapan sanksi bertingkat** (Teguran, Produk Disuruh Cuti, Blacklist Produk, Blacklist Supplier). |
| **03** | [03-manajemen-user-keanggotaan.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/swimlane-flows/03-manajemen-user-keanggotaan.md) | **Manajemen User & Keanggotaan**:<br/>• Pendaftaran mandiri pegawai non-anggota (Upload KTP ke S3 privat).<br/>• **Dual-Approval Berjenjang** (`KK-DEC-001`): Verifikasi Dokumen Admin Toko $\rightarrow$ Otorisasi Final Kepala Koperasi.<br/>• Login lockout saat status pending, aktivasi akun, badge anggota, & hak diskon belanja. |
| **04** | [04-simulasi-simpan-pinjam.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/swimlane-flows/04-simulasi-simpan-pinjam.md) | **Layanan Finansial & Simulasi Sinjam**:<br/>• Rebranding "Program Bantuan Kesejahteraan" (*Ndelepno Jeneng Sinjam*).<br/>• **Evaluasi Batas Plafon Maksimal Rp 50.000.000** (Utang $\ge$ 50 Jt tombol diblokir; Utang $<$ 50 Jt membuka sisa limit).<br/>• Pengaturan visual/slider diserahkan ke Frontend Developer dengan batasan kontrak amortisasi & ekspor Excel ber-watermark. |

---

## 🏛️ Matriks Partisipan & Peran (Sequence Lifelines)

| Partisipan / Aktor | Tanggung Jawab dalam Sistem |
| :--- | :--- |
| 👤 **Client / Pembeli** | Memilih produk, melunasi pembayaran di muka, mengambil pesanan di gerai Koperasi dengan QR Code, melaporkan defect produk, simulasi pinjaman. |
| 🍱 **Supplier (Mitra UMKM)** | Mengajukan produk & kirim sampel terjadwal, konfirmasi kesanggupan PO H-1, dropping barang pagi, segregasi barang PO, merespons laporan defect, **wajib mengambil seluruh sisa barang saat jam pulang kerja**. |
| 🏪 **Admin Koperasi (Kasir / Toko)** | Penerimaan stok pagi, penyiapan barang pesanan, handle stok kurang manual, pemindaian QR E-Nota, Stock Take Opname (STO), import Excel penjualan kasir, verifikasi tahap 1 calon anggota, verifikasi laporan defect & penetapan sanksi. |
| 🏛️ **Kepala Koperasi** | Otorisasi final keanggotaan (Dual-Approval `KK-DEC-001`), kebijakan plafon pinjaman, pengawasan pembukuan koperasi. |
| ⚙️ **Sistem Ekosistem** | Otomasi payment gateway, audio alert Jepang (*"いらっしゃいませ - Irasshaimase"*), prioritas GA, diskon & bundling Shopee-style, kalkulator batas kredit Rp 50 juta, timer delisting 30 hari. |

---

> [!NOTE]
> Jika Anda memerlukan seluruh alur ini dalam **satu dokumen gabungan**, silakan lihat berkas arsip tunggal di: [SWIMLANE_FLOWS_KOPKAR_MARKETPLACE.md](file:///home/mashupsoat/Project/kopkar_xyz/kopkarsai-ecosystem/docs/SWIMLANE_FLOWS_KOPKAR_MARKETPLACE.md).
