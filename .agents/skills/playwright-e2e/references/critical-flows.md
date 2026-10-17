# Critical Business User Journeys (Playwright Specs)

Spesifikasi pengujian end-to-end untuk 5 skenario bisnis utama pada sistem KopKar SAI.

---

## 1. Alur Registrasi Anggota & Dual-Approval

```typescript
import { test, expect } from '@playwright/test';

test.describe('Alur Registrasi Anggota & Dual-Approval (KK-REQ-001)', () => {
  const testNik = `EMP-${Date.now().toString().slice(-4)}`;

  test('Karyawan daftar mandiri -> diverifikasi Admin Toko -> disetujui Kepala Koperasi', async ({ page }) => {
    // 1. Registrasi Karyawan
    await page.goto('http://localhost:5173/register');
    await page.fill('[data-testid="input-employee-id"]', testNik);
    await page.fill('[data-testid="input-full-name"]', 'Budi Pengujian');
    await page.fill('[data-testid="input-email"]', `${testNik.toLowerCase()}@sai.local`);
    await page.fill('[data-testid="input-password"]', 'PasswordAman123!');
    await page.click('[data-testid="btn-submit-registration"]');

    await expect(page.locator('[data-testid="alert-pending-verification"]')).toBeVisible();

    // 2. Login sebelum disetujui harus ditolak
    await page.goto('http://localhost:5173/login');
    await page.fill('[data-testid="input-employee-id"]', testNik);
    await page.fill('[data-testid="input-password"]', 'PasswordAman123!');
    await page.click('[data-testid="btn-login"]');
    await expect(page.locator('text=Menunggu verifikasi admin')).toBeVisible();

    // 3. Admin Toko verifikasi berkas tahap 1
    await page.goto('http://localhost:5173/login');
    await page.fill('[data-testid="input-employee-id"]', 'AT-001');
    await page.fill('[data-testid="input-password"]', 'KopkarTest123!');
    await page.click('[data-testid="btn-login"]');
    await page.goto('http://localhost:5173/admin/member-verification');
    await page.click(`[data-testid="btn-verify-${testNik}"]`);
    await page.click('[data-testid="btn-confirm-stage1"]');

    // 4. Kepala Koperasi berikan persetujuan final
    await page.goto('http://localhost:5173/login');
    await page.fill('[data-testid="input-employee-id"]', 'KK-001');
    await page.fill('[data-testid="input-password"]', 'KopkarTest123!');
    await page.click('[data-testid="btn-login"]');
    await page.goto('http://localhost:5173/head/member-approvals');
    await page.click(`[data-testid="btn-final-approve-${testNik}"]`);

    // 5. Akun baru login sukses
    await page.goto('http://localhost:5173/login');
    await page.fill('[data-testid="input-employee-id"]', testNik);
    await page.fill('[data-testid="input-password"]', 'PasswordAman123!');
    await page.click('[data-testid="btn-login"]');
    await expect(page.locator('text=Selamat datang, Budi')).toBeVisible();
  });
});
```

---

## 2. Pemesanan Same-Day & Checklist Fisik Kasir

```typescript
import { test, expect } from '@playwright/test';

test.describe('Pemesanan Same-Day & Checklist Kasir (MP-REQ-002)', () => {
  test('Pesanan same-day masuk antrean checklist kasir sebelum pembayaran', async ({ page }) => {
    // 1. Pembeli checkout produk toko
    await page.goto('http://localhost:5174/login');
    await page.fill('[data-testid="input-employee-id"]', 'EMP-1001');
    await page.fill('[data-testid="input-password"]', 'KopkarTest123!');
    await page.click('[data-testid="btn-login"]');

    await page.goto('http://localhost:5174/catalog');
    await page.click('[data-testid="btn-add-to-cart-item-1"]');
    await page.goto('http://localhost:5174/cart');
    await page.click('[data-testid="btn-checkout-same-day"]');
    await expect(page.locator('text=Pesanan Berhasil Dibuat')).toBeVisible();

    // 2. Kasir membuka dasbor checklist rak toko
    await page.goto('http://localhost:5174/login');
    await page.fill('[data-testid="input-employee-id"]', 'AT-001');
    await page.fill('[data-testid="input-password"]', 'KopkarTest123!');
    await page.click('[data-testid="btn-login"]');
    await page.goto('http://localhost:5174/cashier/checklist');

    // 3. Kasir checklist item fisik di rak
    await page.click('[data-testid="checkbox-item-ready-1"]');
    await page.click('[data-testid="btn-confirm-checklist-complete"]');

    // 4. Status pesanan berubah menjadi SIAP DIBAYAR
    await expect(page.locator('text=SIAP_DIBAYAR')).toBeVisible();
  });
});
```
