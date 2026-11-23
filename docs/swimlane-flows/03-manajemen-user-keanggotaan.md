# Modul 3: Manajemen User & Keanggotaan (Dual-Approval)
*Dokumen Alur Proses Bisnis & Sequence Diagram Onboarding & Verifikasi Berjenjang*

---

## 1. Deskripsi Modul & Lingkup Bisnis

Modul Manajemen User & Keanggotaan mengatur tata kelola identitas akun karyawan dalam ekosistem KopKar SAI. Sesuai prinsip governance **Dual-Approval** (`KK-DEC-001` / `KK-BR-001`), calon anggota tidak dapat diaktifkan secara instan atau sepihak, melainkan wajib melalui dua lapis verifikasi:
1. **Verifikasi Tahap 1 (Admin Toko)**: Memeriksa validitas data karyawan (NIK internal PT SAI), kejelasan foto KTP, dan kelengkapan departemen/divisi.
2. **Otorisasi Tahap 2 (Kepala Koperasi)**: Otorisasi final persetujuan resmi keanggotaan dan komitmen simpanan pokok/wajib.

> [!CAUTION]
> **Larangan Akses Login Sebelum Approval Sah**: Akun yang masih berstatus `PENDING_ADMIN_VERIFICATION`, `PENDING_HEAD_APPROVAL`, atau `REJECTED` **dilarang keras** diberikan akses login ke Koperasi maupun Marketplace.

---

## 2. Alur 3.1: Registrasi Pegawai Non-Anggota Menjadi Anggota Koperasi

### Sequence Diagram: Dual-Approval Onboarding
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

## 3. Rincian Tahapan & Hak Istimewa Anggota

| Tahapan Status | Aktor Penanggung Jawab | Aksi & Validasi |
| :--- | :--- | :--- |
| `DRAFT / INPUT` | Pegawai Non-Anggota | Mengisi NIK, identitas diri, mengunggah foto KTP / ID Card ke S3 storage terenkripsi, menyetujui pemotongan simpanan. |
| `PENDING_ADMIN_VERIFICATION` | Admin Toko | Memeriksa validitas NIK terhadap data induk karyawan PT SAI. Memeriksa keabsahan foto identitas. |
| `PENDING_HEAD_APPROVAL` | Kepala Koperasi | Meninjau berkas yang lolos seleksi administratif dan menandatangani persetujuan keanggotaan resmi secara digital. |
| `ACTIVE_MEMBER` | Sistem KopKar | Akun aktif. Karyawan menerima pesan konfirmasi WhatsApp dan dapat login secara mandiri. |

### Keuntungan Menjadi Anggota Aktif:
1. **Hak Diskon Khusus**: Anggota aktif mendapatkan potongan belanja lebih besar di Marketplace (contoh: 13% untuk anggota vs 10% untuk non-anggota).
2. **Akses Fasilitas Finansial**: Hak menggunakan kalkulator simulasi dan mengajukan fasilitas pinjaman koperasi.
3. **Peluang Menjadi Supplier**: Hak mengajukan produk jualan mandiri untuk dititipkan di gerai KopKar (`KK-BR-002`).

---

## 4. Referensi Aturan Bisnis Terkait

- `SH-BR-001`: Single account berbasis NIK karyawan untuk seluruh ekosistem Koperasi & Marketplace.
- `KK-BR-001` / `KK-DEC-001`: Invarian Dual-Approval pendaftaran anggota (Admin Toko $\rightarrow$ Kepala Koperasi).
- `SH-DEC-003`: Penyimpanan foto KTP & dokumen sensitif wajib ke S3-compatible Object Storage dengan presigned URL privat.
