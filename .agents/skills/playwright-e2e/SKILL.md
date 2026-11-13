---
name: playwright-e2e
description: >-
  Execute and develop Playwright browser E2E test suites for critical KopKar and Marketplace user journeys. Use when writing, running, or debugging end-to-end browser tests.
---

# Playwright E2E Testing Runbook

Skill ini memandu penulisan, eksekusi, dan debugging skenario pengujian browser otomatis menggunakan **Playwright** untuk 5 alur bisnis kritis KopKar & Marketplace.

> [!NOTE]
> **Prasyarat Codebase**: Saat ini `playwright.config.*`, `tests/e2e/`, dan `tests/pom/` belum di-scaffold di repositori (baru tersedia `tests/agentic/`). Jalankan perintah di bawah setelah harness Playwright dan dev server target disiapkan.

---

## ⚡ Pre-Check & Eksekusi

1. **Pastikan Config & Server Aktif**: Periksa keberadaan `playwright.config.ts` / `playwright.config.js` serta pastikan server dev frontend/backend target berjalan (`ecosystem-monorepo-ops`).
2. **Jalankan Pengujian**:
```bash
# Jalankan seluruh skenario E2E dalam mode headless
npx playwright test

# Jalankan skenario spesifik dengan browser interaktif (headed)
npx playwright test tests/e2e/01-member-registration-dual-approval.spec.ts --headed

# Tampilkan laporan HTML & rekaman trace/video
npx playwright show-report
```

---

## 🎯 Struktur Target Pengujian E2E

```text
tests/
├── e2e/
│   ├── 01-member-registration-dual-approval.spec.ts
│   ├── 02-supplier-product-sample-flow.spec.ts
│   ├── 03-marketplace-same-day-checkout.spec.ts
│   ├── 04-ga-priority-queue.spec.ts
│   └── 05-loan-simulation-calculator.spec.ts
└── pom/
    ├── BasePage.ts
    ├── LoginPage.ts
    ├── MemberRegistrationPage.ts
    ├── AdminVerificationPage.ts
    ├── StoreChecklistPage.ts
    └── LoanCalculatorPage.ts
```

Lihat [references/critical-flows.md](references/critical-flows.md) untuk template spesifikasi skenario uji kritis.

---

## ✅ Verification

Pastikan seluruh test suite keluar dengan exit code `0`, tidak ada flaky retry yang gagal di `playwright-report/`, dan trace kegagalan (jika ada) diinspeksi melalui `npx playwright show-report`.
