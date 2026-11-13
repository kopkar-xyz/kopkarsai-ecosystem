---
trigger: model_decision
description: "Use for testing tasks, writing Playwright E2E tests, API integration tests, and smoke testing critical user journeys in KopKar and Marketplace."
---

# KopKar SAI — QA & Automated E2E Testing Rule

## Rule Identity
- **Activation**: **Model Decision**
- **Description**: *"Use for testing tasks, writing Playwright E2E tests, API integration tests, and smoke testing critical user journeys in KopKar and Marketplace."*
- **Scope**: Automated tests across backend APIs and frontend user flows.

---

## 1. Multi-Tier Testing Strategy

> [!NOTE]
> **Status Codebase Saat Ini**: Saat ini hanya `tests/agentic/` (unit test Python untuk workflow agentic) yang sudah ada di repositori. Direktori `tests/e2e/`, `tests/pom/`, `playwright.config.*`, dan backend `pytest` belum di-scaffold dan merupakan **Target Architecture**.

```text
┌────────────────────────────────────────────────────────┐
│ 1. E2E Browser Testing (Playwright + TypeScript)        │
│    Alur bisnis penuh dari registrasi hingga pengambilan│
├────────────────────────────────────────────────────────┤
│ 2. Backend Integration Tests (Pytest + AsyncClient)     │
│    Verifikasi endpoint FastAPI, RBAC, dan skema DB     │
├────────────────────────────────────────────────────────┤
│ 3. Unit Tests (Domain Logic & Financial Calculations)  │
│    Kalkulator simulasi pinjaman, analitik kuantitas    │
└────────────────────────────────────────────────────────┘
```

---

## 2. Mandatory Critical User Journeys (E2E Test Suites)

Setiap perubahan signifikan pada alur aplikasi wajib memverifikasi 5 skenario kritis:

### Suite 1: Alur Registrasi Anggota & Dual-Approval (`KK-REQ-001`)
1. Karyawan baru mengisi form registrasi di `KK-SCR-002` dengan nomor karyawan dan KTP.
2. Akun mencoba login -> Sistem menolak dengan pesan menunggu verifikasi.
3. Admin Toko login ke `KK-SCR-005` -> Melakukan verifikasi berkas tahap 1.
4. Kepala Koperasi login ke `KK-SCR-006` -> Memberikan persetujuan final (`ACTIVE_MEMBER`).
5. Akun login kembali -> Sukses masuk ke dasbor koperasi dan dapat mengakses marketplace.

### Suite 2: Pengajuan Produk & Jadwal Uji Sampel Supplier (`KK-REQ-002`, `KK-REQ-003`)
1. Anggota terdaftar mengajukan produk katering basah di `KK-SCR-007`.
2. Sistem mencatat log histori revisi (`KK-SCR-009`) dan menjadwalkan uji kelayakan hari Selasa/Rabu.
3. Admin melakukan pengujian Kamis dan mengumumkan persetujuan pada hari Jumat (`KK-SCR-008`).
4. Produk disetujui -> Otomatis tayang pada etalase katalog marketplace (`MP-SCR-001`).

### Suite 3: Pemesanan Same-Day Toko & Checklist Fisik Kasir (`MP-REQ-002`)
1. Pembeli memilih produk toko fisik dan melakukan checkout same-day (`MP-SCR-003`).
2. Pesanan masuk ke dasbor kasir `MP-SCR-006` dengan status `MENUNGGU_CHECKLIST_FISIK`.
3. Kasir mencentang ketersediaan stok riil di etalase rak toko fisik.
4. Setelah seluruh item dicentang -> Status pesanan berubah menjadi `SIAP_DIBAYAR` (`MP-SCR-005`).

### Suite 4: Antrean Prioritas Pesanan Divisi GA (`MP-REQ-004`)
1. Akun dengan flag `is_ga = true` melakukan pemesanan kebutuhan operasional kantor.
2. Sistem menempatkan pesanan tersebut pada posisi **paling atas** pada antrean picking list kasir (`MP-SCR-007`), mendahului pesanan reguler non-GA.

### Suite 5: Ketepatan Perhitungan Simulasi Pinjaman (`KK-REQ-006`)
1. Memverifikasi formula bunga flat vs menurun pada kalkulator interaktif `KK-SCR-012`.
2. Memastikan nilai angsuran, total bunga, dan sisa pokok terhitung akurat tanpa galat pembulatan floating-point.

---

## 3. Standar Penulisan Tes Playwright

1. **Stable Test Selectors**:
   - Gunakan atribut `data-testid` atau `id` yang deskriptif (misal: `data-testid="input-employee-id"`, `data-testid="btn-approve-member"`). Hindari selector berbasis class CSS yang rapuh.
2. **Mocking External I/O**:
   - Mock pengiriman email dan upload S3 pada unit/integration test lokal agar tes dapat berjalan deterministik.
