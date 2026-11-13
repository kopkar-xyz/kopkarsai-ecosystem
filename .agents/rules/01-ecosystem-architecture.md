---
trigger: always_on
---

# KopKar SAI Ecosystem — Architecture & System Boundaries

## 1. Product Context ("One Contract — Two Applications")

1. **KOPKAR (`apps/web-kopkar`)**: Portal Koperasi Karyawan (registrasi, Dual-Approval, supplier & uji sampel, simulasi pinjaman, analitik suplai).
2. **MARKETPLACE (`apps/web-marketplace`)**: Belanja internal karyawan (produk toko same-day + checklist kasir, katering PO H-1, antrean prioritas GA).
3. **BACKEND (`apps/backend`)**: Modular monolith **FastAPI (Python)** + PostgreSQL (`shared_auth`, `schema_kopkar`, `schema_marketplace`).

## 2. Strict 4-Scope Partitioning

- `CONTRACT`: Aspek legal, komersial, & governance.
- `SHARED`: Hanya komponen lintas dua aplikasi (Auth NIK, session, S3 Storage, notifikasi in-app). **Dilarang menempatkan modul spesifik domain ke `SHARED` hanya demi kemudahan akses.**
- `KOPKAR`: Keanggotaan, supplier, sampel makanan, simpan pinjam, analitik suplai.
- `MARKETPLACE`: Katalog belanja, same-day/PO H-1, checklist kasir, antrean GA.

## 3. Monorepo Layout & Single VPS Budget

```text
kopkarsai-ecosystem/
├── .agents/                    # Rules & skills Antigravity
├── apps/
│   ├── backend/                # FastAPI modular monolith
│   ├── web-kopkar/             # React + TypeScript (Koperasi)
│   └── web-marketplace/        # React + TypeScript (Marketplace)
├── docs/project-knowledge/     # [Submodule] YAML SoT, specs, LaTeX kontrak
└── scripts/agentic/            # Orkestrasi workflow & GitHub Project
```

- **VPS Budget (`4 vCPU / 8 GB RAM` + `4 GB` NVMe swap)**: Detail alokasi ada di [system-topology.md](docs/project-knowledge/docs/architecture/system-topology.md).
- **Stateless & S3**: File upload (KTP, produk, bukti bayar) wajib ke S3-compatible storage (maks. `3 MB`); dilarang simpan file mentah di SSD lokal atau `BYTEA` PostgreSQL.
- **ADR Baseline**: Mengacu ke `docs/project-knowledge/data/decisions/decisions.yaml` (`SH-DEC-001`, `SH-DEC-003`, `SH-DEC-008`, `KK-DEC-001`, `MP-DEC-001`, `MP-DEC-002`).
