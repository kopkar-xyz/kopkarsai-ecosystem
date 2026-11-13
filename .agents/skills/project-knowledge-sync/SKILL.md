---
name: project-knowledge-sync
description: >-
  Inspect, cross-reference, and verify implementation against canonical requirements, business rules, decisions, screen budgets, and contract data in docs/project-knowledge. Use when implementing domain logic, checking IDs (KK-REQ/MP-REQ/SH-DEC/KK-SCR), or validating specification sync.
---

# Project Knowledge & Specification Sync Runbook

Skill ini memandu pencocokan kode sumber terhadap sumber kebenaran resmi (*Single Source of Truth*) pada `docs/project-knowledge/data/`.

---

## ⚡ Kapan Menggunakan Skill Ini

1. Mengimplementasikan fitur baru atau merefaktor logika bisnis domain.
2. Memverifikasi apakah aturan bisnis sudah disetujui klien atau masih `NEEDS_CLIENT_CONFIRMATION`.
3. Menelusuri korelasi ID (`KK-REQ-xxx`, `MP-REQ-xxx`, `KK-BR-xxx`, `SH-DEC-xxx`, `KK-SCR-xxx`, `MP-SCR-xxx`).
4. Memeriksa batas 25 layar terkunci (`SH-DEC-008`) dan kelengkapan submodule sebelum serah terima.

---

## 🔎 Alur Penelusuran

1. Cari ID Requirement di `docs/project-knowledge/data/requirements/requirements.yaml`.
2. Cari Aturan Bisnis terkait di `docs/project-knowledge/data/business-rules/rules.yaml`.
3. Periksa Decision Log di `docs/project-knowledge/data/decisions/decisions.yaml`.
4. Periksa katalog 25 layar terkunci di [references/screen-catalog.md](references/screen-catalog.md).
5. Cantumkan ID entitas resmi pada komentar kode, pesan commit, atau ringkasan tugas.

Lihat [references/cheatsheet.md](references/cheatsheet.md) untuk peta file YAML dan aturan status ketidakpastian (`proposed` / `Q-xxx`).

---

## ✅ Verification

Jalankan skrip validasi konsistensi bawaan submodule setelah memeriksa atau mengubah data pengetahuan:
```bash
python docs/project-knowledge/scripts/validate/validate_workspace.py
```
*(Gunakan `python3` di POSIX jika perlu.)*
