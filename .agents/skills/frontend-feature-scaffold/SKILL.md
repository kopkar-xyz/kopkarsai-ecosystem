---
name: frontend-feature-scaffold
description: >-
  Scaffold a new frontend feature module in apps/web-kopkar or apps/web-marketplace following feature-driven modularity, custom reusable UI components, and the 200-line page budget.
---

# Frontend Domain Feature Scaffolding Runbook

Skill ini memandu proses pembuatan modul fitur antarmuka baru di `apps/web-kopkar/src/features/<domain>/` atau `apps/web-marketplace/src/features/<domain>/` sesuai dengan katalog **25 Layar Antarmuka Resmi** (`KK-SCR-xxx` / `MP-SCR-xxx`).

---

## 🏗️ Struktur Modul Fitur Frontend

Setiap modul fitur wajib dienkapsulasi dalam satu folder domain:

```text
src/features/<domain>/
├── api/                        # Pemanggilan endpoint API domain
│   └── <domain>-api.ts
├── components/                 # Komponen UI spesifik fitur (Modal, Form, Checklist)
│   ├── <Domain>Form.tsx
│   └── <Domain>Table.tsx
├── hooks/                      # Custom hooks untuk orkestrasi state & async data
│   └── use<Domain>.ts
├── types.ts                    # Tipe data TypeScript & DTOs
└── index.ts                    # Public export modul fitur
```

Halaman rute kemudian dibuat tipis di:
```text
src/pages/<Domain>View.tsx      # Komposisi antarmuka (< 200 baris kode)
```

Lihat [references/templates.md](references/templates.md) untuk template kode acuan.

---

## ⚡ Langkah Eksekusi (Step-by-Step)

### Langkah 1: Tentukan Identitas Layar Resmi
Periksa nomor ID layar resmi pada `02-business-knowledge-sync.md`:
- KOPKAR: `KK-SCR-001` s/d `KK-SCR-014`
- MARKETPLACE: `MP-SCR-001` s/d `MP-SCR-011`

### Langkah 2: Definisikan Kontrak Data (`types.ts`)
1. Buat interface data domain, filter state, dan payload request/response.
2. Selaraskan dengan schema Pydantic pada backend (`apps/backend`).

### Langkah 3: Tulis API Client (`api/<domain>-api.ts`)
1. Gunakan instance `apiClient` dari `src/lib/api-client.ts`.
2. Kembalikan data bertipe pasti (`Promise<EntityResponse>`).

### Langkah 4: Buat Custom Hook (`hooks/use<Domain>.ts`)
1. Kelola state data server: `data`, `isLoading`, `error`, serta fungsi mutasi (`submit`, `refresh`).
2. Tampilkan feedback visual (toast notification) pada skenario sukses/gagal.
3. Jaga agar logika bisnis tidak bocor ke dalam komponen tampilan.

### Langkah 5: Bangun Komponen Fitur Menggunakan Reusable UI Primitives
1. Gunakan komponen UI dasar dari `src/components/ui/` (`Button`, `Input`, `StatusBadge`, `Modal`, `Card`).
2. Hindari membuat inline styling kustom yang menyimpang dari token desain pada `07-ui-design-system.md`.

### Langkah 6: Susun Halaman Tipis (`src/pages/<Domain>View.tsx`)
1. Pastikan panjang berkas **di bawah 200 baris kode**.
2. Komposisikan header halaman, breadcrumbs, pemanggilan hook, dan peletakan komponen fitur.

### Langkah 7: Daftarkan Rute pada `src/app/router.tsx`
1. Pasang proteksi route guard berdasarkan role pengguna (`RequireAuth`, `RequireRole`).
2. Pastikan rute terdaftar dengan path URL yang bersih dan teratur.
