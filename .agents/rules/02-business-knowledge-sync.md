---
trigger: model_decision
description: "Use when working on business logic, domain invariants, contract scope, requirements, screen catalogs, or referencing docs/project-knowledge."
---

# KopKar SAI — Business Knowledge & Traceability Architecture Rule

## Rule Identity
- **Activation**: **Model Decision**
- **Description**: *"Use when working on business logic, domain invariants, contract scope, requirements, screen catalogs, or referencing docs/project-knowledge."*
- **Scope**: Cross-application domain integrity, business logic implementations, and documentation synchronization.

---

## 1. Core Principle: Single Source of Truth

Seluruh perilaku bisnis, batasan fungsional, dan parameter sistem tidak boleh hanya tersimpan dalam ingatan percakapan atau kode mentah.

Direktori `docs/project-knowledge/data/` (YAML) adalah **pemegang otoritas kebenaran data (*Single Source of Truth*)**:

| Direktori Data | Otoritas Informasi |
| :--- | :--- |
| `data/requirements/requirements.yaml` | Spesifikasi kebutuhan sistem (`SH-REQ-xxx`, `KK-REQ-xxx`, `MP-REQ-xxx`, `SH-NFR-xxx`) |
| `data/features/features.yaml` | Katalog fitur resmi terhubung (`SH-FTR-xxx`, `KK-FTR-xxx`, `MP-FTR-xxx`) |
| `data/business-rules/rules.yaml` | Aturan bisnis institusional koperasi (`KK-BR-xxx`, `MP-BR-xxx`) |
| `data/decisions/decisions.yaml` | Log keputusan teknis & arsitektur resmi (`SH-DEC-xxx`, `KK-DEC-xxx`, `MP-DEC-xxx`) |
| `data/assumptions/assumptions.yaml` | Asumsi awal perencanaan teknis & operasional (`SH-ASM-xxx`) |
| `data/contract/terms.yaml` & `scope-matrix.yaml` | Batasan komersial, deliverables, dan ruang lingkup kontrak |

---

## 2. Taksonomi ID Unik & Pelacakan Entitas (*Traceability*)

Setiap entitas sistem memiliki identifier permanen yang **dilarang didaur ulang atau dihapus sepihak**:

- `KK-REQ-xxx`: Kebutuhan fungsional Koperasi (misal: `KK-REQ-001` Dual-Approval).
- `MP-REQ-xxx`: Kebutuhan fungsional Marketplace (misal: `MP-REQ-002` Same-Day Checklist).
- `SH-REQ-xxx`: Kebutuhan bersama/shared (misal: `SH-REQ-001` Shared Authentication).
- `KK-BR-xxx`: Aturan bisnis institusional (misal: `KK-BR-001` Jadwal Uji Kelayakan Sampel).
- `MP-BR-xxx`: Aturan bisnis marketplace (misal: `MP-BR-001` Pemotongan Gaji / Kuota).
- `KK-SCR-xxx` & `MP-SCR-xxx`: Katalog layar antarmuka resmi (terkunci 25 layar).
- `SH-DEC-xxx`: Architecture Decision Record.

Jika suatu entitas digantikan atau dihentikan, tandai statusnya menjadi `superseded`, `deprecated`, atau `cancelled`. **Jangan pernah menimpa ID lama dengan konsep baru.**

---

## 3. Batasan 25 Layar Antarmuka Resmi (Screen Budget — `SH-DEC-008`)

Pengembangan antarmuka frontend dikunci pada **25 layar resmi**: 14 layar KOPKAR (`KK-SCR-001` s/d `KK-SCR-014`) dan 11 layar Marketplace (`MP-SCR-001` s/d `MP-SCR-011`). Lihat daftar lengkapnya di [.agents/skills/project-knowledge-sync/references/screen-catalog.md](../skills/project-knowledge-sync/references/screen-catalog.md).

> [!WARNING]
> **Dilarang Menambah Layar Baru di Luar 25 Layar Terkunci**:
> Fitur baru harus diintegrasikan ke dalam layar yang ada (tab, modal, atau inline controls) kecuali diajukan melalui prosedur *Change Request* resmi (`data/changes/`).

---

## 4. Larangan Halusinasi & Asumsi Sepihak

1. **Status Status Requirement**:
   - Status `approved` hanya boleh disematkan jika ada bukti tertulis atau persetujuan resmi.
   - Requirement yang belum pasti wajib berstatus `proposed` atau `under_evaluation`.
2. **Aturan Bisnis Tanpa Keputusan Formal**:
   - Jika suatu aturan bisnis belum memiliki dasar SOP tertulis dari Koperasi, gunakan status `NEEDS_CLIENT_CONFIRMATION` dan catat pertanyaan terbuka pada `data/contract/open-questions.yaml` (`Q-xxx`).
