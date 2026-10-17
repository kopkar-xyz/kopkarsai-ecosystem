# Project Knowledge Data Cheatsheet

Peta navigasi cepat ke berkas otoritatif pada `docs/project-knowledge/`:

---

## 📂 Lokasi Single Source of Truth (YAML)

| Kategori Data | Lokasi File | Contoh Prefix ID |
| :--- | :--- | :--- |
| **Requirements** | `docs/project-knowledge/data/requirements/requirements.yaml` | `KK-REQ-xxx`, `MP-REQ-xxx`, `SH-REQ-xxx`, `SH-NFR-xxx` |
| **Features** | `docs/project-knowledge/data/features/features.yaml` | `KK-FTR-xxx`, `MP-FTR-xxx`, `SH-FTR-xxx` |
| **Business Rules**| `docs/project-knowledge/data/business-rules/rules.yaml` | `KK-BR-xxx`, `MP-BR-xxx`, `SH-BR-xxx` |
| **Decisions (ADR)**| `docs/project-knowledge/data/decisions/decisions.yaml` | `KK-DEC-xxx`, `MP-DEC-xxx`, `SH-DEC-xxx` |
| **Assumptions** | `docs/project-knowledge/data/assumptions/assumptions.yaml` | `KK-ASM-xxx`, `MP-ASM-xxx`, `SH-ASM-xxx` |
| **Open Questions**| `docs/project-knowledge/data/contract/open-questions.yaml` | `Q-xxx` |
| **Change Requests**| `docs/project-knowledge/data/changes/changes.yaml` | `KK-CHG-xxx`, `MP-CHG-xxx`, `SH-CHG-xxx` |

---

## 🔍 Skrip Validasi & Konsistensi Data

Gunakan skrip Python bawaan submodule untuk memvalidasi konsistensi relasi antar-entitas:

```bash
# Validasi integritas ID dan relasi data YAML
python3 docs/project-knowledge/scripts/validate/validate_workspace.py
```

---

## 📋 Aturan Pencatatan Status & Ketidakpastian

Jika menemukan kebutuhan baru atau aturan bisnis yang belum tertera:
1. **Jangan Mengarang**: Tetapkan status awal sebagai `proposed` atau `under_evaluation`.
2. **Pertanyaan Terbuka**: Tambahkan tiket `Q-xxx` di `docs/project-knowledge/data/contract/open-questions.yaml` bila membutuhkan konfirmasi Klien/Pengurus Koperasi.
