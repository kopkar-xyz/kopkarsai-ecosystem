---
name: frontend-feature-scaffold
description: >-
  Scaffold a frontend feature module in apps/web-kopkar or apps/web-marketplace following feature-driven modularity, reusable UI primitives, and the 200-line view budget. Use when adding or refactoring a frontend feature or screen.
---

# Frontend Domain Feature Scaffolding Runbook

Skill ini memandu pembuatan modul fitur baru di `apps/web-kopkar` (domain `@ekyaaa`) atau `apps/web-marketplace` (domain `@revani`) dalam batas **25 Layar Antarmuka Resmi** (`KK-SCR-xxx` / `MP-SCR-xxx`).

> [!NOTE]
> **Status Codebase Saat Ini**:
> - `apps/web-kopkar`: aktif sebagai prototype UI (`src/features/<domain>/<Domain>View.tsx` + tab state di `src/App.tsx`).
> - `apps/web-marketplace`: saat ini baru berisi `README.md` (belum di-scaffold).
> - Sebelum menyentuh folder milik pengembang lain, ikuti protokol `[HANDOFF]` di `.agents/rules/frontend-ownership.md`.

---

## 🏗️ Struktur Modul Fitur (Target Modularity)

```text
src/features/<domain>/
├── api/                        # Pemanggilan endpoint API domain (saat terhubung backend)
├── components/                 # Komponen UI spesifik fitur (Modal, Form, Checklist)
├── hooks/                      # Custom hooks orkestrasi state & async data
├── types.ts                    # TypeScript interfaces & DTOs
└── <Domain>View.tsx            # Komposisi view tipis (< 200 LOC; atau di src/pages/ saat memakai router)
```

Lihat [references/templates.md](references/templates.md) untuk template kode acuan.

---

## ⚡ Langkah Eksekusi

1. **Verifikasi Layar & Ownership**: Cocokkan ID layar pada `.agents/skills/project-knowledge-sync/references/screen-catalog.md` dan cek kepemilikan folder (`@ekyaaa` vs `@revani`).
2. **Definisikan Kontrak Data (`types.ts`)**: Selaraskan DTO dengan schema Pydantic target atau kontrak di `docs/project-knowledge/`.
3. **Pisahkan Logic ke Hooks (`hooks/use<Domain>.ts`) & API (`api/`)**: Jaga agar view tidak menampung logika bisnis atau fetch langsung.
4. **Gunakan Komponen UI & Token Resmi**: Pakai komponen di `src/components/ui/` serta token warna dari `docs/COLOR_PALETTE.md` dan `.agents/rules/07-ui-design-system.md` (tanpa CDN eksternal).
5. **Jaga Budget < 200 LOC**: Pastikan file komposisi view/page (`*View.tsx`, `App.tsx`) tetap di bawah 200 baris kode.

---

## ✅ Verification

Verifikasi kompilasi TypeScript (`tsc -b`) dan bundle produksi Vite pada aplikasi target:
```bash
pnpm --dir apps/web-kopkar build
# atau untuk apps/web-marketplace setelah di-scaffold:
pnpm --dir apps/web-marketplace build
```
Pastikan build selesai dengan exit code 0 tanpa error TypeScript.
