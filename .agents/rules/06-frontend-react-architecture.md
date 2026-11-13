---
trigger: glob
globs: "apps/web-kopkar/**, apps/web-marketplace/**, apps/web-gateway/**"
description: "React frontend component hierarchy, feature modularity, 200-line view budget, and API integration patterns."
---

# KopKar SAI — React Frontend Architecture & Modularity Rule

## Rule Identity
- **Activation**: **Glob (`apps/web-kopkar/**`, `apps/web-marketplace/**`, `apps/web-gateway/**`)**
- **Scope**: Frontend code in `apps/web-kopkar/`, `apps/web-marketplace/`, and `apps/web-gateway/`.

---

## 1. Current vs Target Directory Layout

- **Current Structure (`apps/web-kopkar` & `apps/web-gateway`)**:
  - `apps/web-kopkar` saat ini menggunakan komposisi berbasis tab di `src/App.tsx` (228 LOC, mock data lokal) dengan view di `src/features/<domain>/<Domain>View.tsx`, komponen bersama di `src/components/{layout,ui}/`, dan tipe global di `src/types/index.ts`.
  - `apps/web-gateway` sudah aktif sebagai single-page landing gateway (`src/pages/GatewayPage.tsx`, `src/hooks/useGatewayIntro.ts`, `src/config/services.ts`).
  - `apps/web-marketplace` saat ini baru berisi `README.md` (belum di-scaffold).
- **Target Architecture (Saat Integrasi API & Build `web-marketplace` / Refactor `web-kopkar`)**:

```text
apps/<web-app>/src/
├── app/
│   ├── router.tsx                  # React Router configuration & route guards
│   ├── layout/                     # App shell, Navbar, Sidebar, Portal Header
│   └── providers.tsx               # Context providers (Auth, QueryClient, Theme)
│
├── components/                     # Reusable design system & shared UI primitives
│   └── ui/                         # Custom reusable UI widgets (Buttons, Inputs, Modals, Badges, Tables)
│
├── features/<domain>/              # Encapsulated business feature module
│   ├── api/                        # Domain API fetchers & mutation handlers
│   ├── components/                 # Feature-specific modals, tables, checklists
│   ├── hooks/                      # Custom hooks for state orchestration & queries
│   └── types.ts                    # Feature-specific TypeScript interfaces & DTOs
│
├── pages/                          # Thin route composition views (< 200 LOC per file)
│   └── <PageName>View.tsx
│
├── lib/
│   ├── api-client.ts               # Fetch/Axios client instance with auth interceptors
│   └── utils.ts                    # Formatting helpers (currency IDR, dates, badges)
│
└── main.tsx                        # React application bootstrap
```

---

## 2. The 200-Line View/Page Budget Invariant

> [!CRITICAL]
> **Strict View/Page Budget (< 200 LOC)**:
> File komposisi view/halaman (`src/pages/*View.tsx`, `src/features/*/*View.tsx`, maupun `src/App.tsx`) **tidak boleh melebihi 200 baris kode** pada kode baru/hasil refactor. *(Catatan: `apps/web-kopkar/src/App.tsx` saat ini 228 LOC dan perlu diringkas saat migrasi ke router/API).*
> - Halaman hanya bertindak sebagai **lem perakit (*glue layer*)** antara layout, custom hooks, dan komponen fitur.
> - Logika pengambilan data, mutasi, dan state management diekstraksi ke **custom hook** di `features/<domain>/hooks/`.
> - Bagian UI kompleks dipecah ke komponen di `features/<domain>/components/`.

---

## 3. Reusable Custom UI Components Requirement

Sesuai arahan teknis proyek, antarmuka mengutamakan **komponen UI kustom mandiri yang dapat digunakan kembali (*reusable custom components*)** tanpa bergantung pada framework komponen monolitik yang kaku:

1. **Komponen Atomik di `components/ui/`**:
   - `Button`: Variasi styling (`primary`, `secondary`, `outline`, `danger`), state loading spinner, dan disabled handling.
   - `Input`, `Select`, `Textarea`: Input kontrol dengan label terintegrasi, helper text, dan visual error feedback.
   - `StatusBadge`: Badge status pesanan / persetujuan dengan token warna baku.
   - `Modal` / `Drawer`: Dialog overlay dengan animasi transisi halus, keyboard ESC handler, dan focus lock.
   - `DataTable`: Tabel data responsif dengan sorting, pagination, dan empty/loading state.
   - `Card`: Surface container kartu putih dengan border halus dan radius proporsional.

---

## 4. State Management & API Integration Patterns

1. **Server State Separation**:
   - Gunakan custom hooks untuk memisahkan data server dari state lokal UI:
     ```typescript
     // features/membership/hooks/useMemberVerification.ts
     export function useMemberVerification(memberId: string) {
       // Hook mengembalikan { data, isLoading, error, approve, reject }
     }
     ```
2. **API Client Interceptor**:
   - Setiap request ke backend secara otomatis menyematkan header `Authorization: Bearer <token>` dari sesi aktif.
   - Jika menerima respons HTTP 401, bersihkan sesi dan redirect pengguna ke halaman login terpadu (`KK-SCR-003`).

---

## 5. Responsive & Mobile-First Layout

Kedua aplikasi wajib responsif:
- `apps/web-kopkar`: Dioptimalkan untuk desktop pengurus & kasir, serta mobile untuk anggota/supplier.
- `apps/web-marketplace`: Dioptimalkan secara *mobile-first* (pengalaman belanja karyawan via smartphone) dan desktop untuk kasir toko fisik.
