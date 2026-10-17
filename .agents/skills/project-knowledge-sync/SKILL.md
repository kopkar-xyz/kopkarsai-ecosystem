---
name: project-knowledge-sync
description: >-
  Inspect, cross-reference, and verify system implementation against canonical requirements, business rules, decisions, and contract data in docs/project-knowledge.
---

# Project Knowledge & Specification Sync Runbook

Skill ini memandu agen AI dan pengembang untuk memeriksa, mencocokkan, dan memvalidasi kode sumber terhadap sumber kebenaran resmi (*Single Source of Truth*) pada `docs/project-knowledge/data/`.

---

## ⚡ Kapan Menggunakan Skill Ini

Gunakan skill ini ketika:
1. Mengimplementasikan fitur baru atau merefaktor logika bisnis domain.
2. Memverifikasi apakah suatu aturan bisnis (misal: syarat supplier tidak aktif, formula bunga, alur verifikasi) telah disetujui klien.
3. Menelusuri korelasi ID (`KK-REQ-xxx`, `MP-REQ-xxx`, `KK-BR-xxx`, `SH-DEC-xxx`).
4. Menjalankan verifikasi integritas data dokumentasi sebelum serah terima.

---

## 🔎 Alur Penelusuran & Verifikasi

```text
[Fitur / Task yang Diminta]
           │
           ▼
1. Cari ID Requirement di docs/project-knowledge/data/requirements/requirements.yaml
           │
           ▼
2. Cari Aturan Bisnis Terkait di docs/project-knowledge/data/business-rules/rules.yaml
           │
           ▼
3. Periksa Log Keputusan Arsitektur di docs/project-knowledge/data/decisions/decisions.yaml
           │
           ▼
4. Implementasikan Solusi pada Backend (FastAPI) & Frontend (React)
           │
           ▼
5. Cantumkan ID Entitas Resmi pada Komentar Kode, Commit, atau Ringkasan Tugas
```

Lihat [references/cheatsheet.md](references/cheatsheet.md) untuk rujukan query cepat dan lokasi file data.
