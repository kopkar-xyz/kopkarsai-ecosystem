# Monorepo Operations Cheatsheet

Referensi konfigurasi lingkungan dan akun seeder pengujian lokal.

---

## 🔑 Akun Seeder Pengujian Lokal (Default Test Credentials)

Password default untuk seluruh akun seeder pengembang lokal adalah: `KopkarTest123!`

| Role | Nomor Karyawan (Username) | Email | Peran Utama |
| :--- | :--- | :--- | :--- |
| `SUPERADMIN` | `SA-001` | `superadmin@sai.local` | Konfigurasi sistem global |
| `KEPALA_KOPERASI` | `KK-001` | `kepala.kopkar@sai.local` | Approval final keanggotaan (`KK-SCR-006`) |
| `ADMIN_TOKO` | `AT-001` | `admin.toko@sai.local` | Verifikasi tahap 1 & checklist kasir |
| `ANGGOTA` | `EMP-1001` | `budi.santoso@sai.local` | Belanja anggota & simulasi pinjaman |
| `SUPPLIER` | `SUP-2001` | `supplier.dapur@sai.local` | Pengajuan produk & pasokan katering |
| `GA` | `GA-3001` | `ga.officer@sai.local` | Pesanan kantor prioritas antrean (`MP-SCR-007`)|

---

## ⚙️ Variabel Lingkungan Utama (`.env` Backend)

```env
# Application
ENVIRONMENT=development
DEBUG=True
SECRET_KEY=dev-secret-key-change-in-production-min32bytes

# Database PostgreSQL
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/kopkar_ecosystem

# Object Storage S3-Compatible
S3_ENDPOINT_URL=https://s3.neocloud.id
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_BUCKET_NAME=kopkar-media-dev
S3_REGION=id-jakarta-1

# CORS Allowed Origins
CORS_ORIGINS=["http://localhost:5173","http://localhost:5174"]
```
