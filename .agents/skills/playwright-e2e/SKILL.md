---
name: playwright-e2e
description: >-
  Execute and develop Playwright browser E2E test suites for critical user journeys across KopKar and Marketplace web applications.
---

# Playwright E2E Testing Runbook

Skill ini memandu proses penulisan, eksekusi, dan debugging skenario pengujian browser otomatis menggunakan **Playwright** untuk memastikan seluruh alur bisnis kritis berjalan lancar tanpa regresi.

---

## ⚡ Perintah Eksekusi Cepat

```bash
# Jalankan seluruh skenario E2E dalam mode headless
npx playwright test

# Jalankan skenario spesifik dengan browser interaktif (headed)
npx playwright test tests/e2e/dual-approval.spec.ts --headed

# Tampilkan laporan hasil pengujian HTML & rekaman trace/video
npx playwright show-report
```

---

## 🎯 Struktur Standar Pengujian E2E

```text
tests/
├── e2e/
│   ├── 01-member-registration-dual-approval.spec.ts  # Alur registrasi mandiri & verifikasi
│   ├── 02-supplier-product-sample-flow.spec.ts       # Pengajuan produk & jadwal uji sampel
│   ├── 03-marketplace-same-day-checkout.spec.ts      # Belanja same-day & checklist fisik kasir
│   ├── 04-ga-priority-queue.spec.ts                  # Antrean prioritas pesanan divisi GA
│   └── 05-loan-simulation-calculator.spec.ts         # Akurasi kalkulator simulasi pinjaman
│
└── pom/                                              # Page Object Models
    ├── BasePage.ts
    ├── LoginPage.ts
    ├── MemberRegistrationPage.ts
    ├── AdminVerificationPage.ts
    ├── StoreChecklistPage.ts
    └── LoanCalculatorPage.ts
```

Lihat [references/critical-flows.md](references/critical-flows.md) untuk template spesifikasi skenario uji kritis.
