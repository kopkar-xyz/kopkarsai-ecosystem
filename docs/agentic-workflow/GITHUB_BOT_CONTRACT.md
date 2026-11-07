# Single Shared Workflow Contract: `kopkarsai-ecosystem` ↔ Discord Project Management Bot

> **Dokumen:** Kontrak Resmi Workflow Pengembangan, Kepemilikan State, Status Machine, dan Konvensi Antarmuka.  
> **Tanggal:** 2026-11-05  
> **Target Repositori:** `kopkar-xyz/kopkarsai-ecosystem`  
> **Bot Terintegrasi:** `ekyaaa/dc-bot-project-management`

---

## 1. Prinsip Utama & Kepemilikan State

Untuk mencegah ambiguitas dan *split-brain*, setiap resource memiliki satu **Canonical Owner**:

| Komponen / Resource | Sumber Kebenaran (Canonical Owner) | Batasan & Aturan |
| :--- | :--- | :--- |
| **Definisi Task & Kriteria** | GitHub Issue | Acceptance criteria, deskripsi, kendala, dan scope (CONTRACT/SHARED/KOPKAR/MARKETPLACE) dicatat di issue. Dilarang membuat database task bayangan di Discord. |
| **Status & Prioritas Pekerjaan** | GitHub Project v2 | Kolom single-select `Status` dan `Priority` pada Project #1 (`kopkar-sai`). Bot Discord membaca dan memperbarui status melalui API GraphQL ini. |
| **Bukti Implementasi** | Git Commits, PR, CI Suite | Perubahan status memerlukan bukti nyata (branch aktif, unit test lulus, PR review, merge). Dilarang membuat bukti palsu (*fabricated progress*). |
| **Identitas Perangkat / Agent** | `.agent/developer.local.json` | Konfigurasi per-mesin lokal (gitignored). Tidak disinkronkan melalui commit Git. |
| **Identitas Discord ↔ GitHub** | SQLite Storage pada Discord Bot | Ditautkan secara aman menggunakan OAuth 2.0 PKCE melalui perintah Discord `/account connect`. |
| **Notifikasi & Interaksi Tim** | Discord Project Management Bot | Saluran komunikasi utama pengembang. Menerima webhook dari GitHub App dan memfasilitasi kueri status melalui slash commands. |

---

## 2. Kosakata Kanonikal: Status & Prioritas

### 2.1 Status Kanonikal
```text
Backlog  ───>  Ready  ───>  In Progress  ───>  In Review  ───>  Done
   │             │              │                 │
   └─────────────┴──────────────┴─────────────────┘
                         ▲
                         │ (dua arah)
                         ▼
                      Blocked
```

- **Backlog**: Pekerjaan tercatat namun belum siap dikerjakan (belum memiliki acceptance criteria jelas).
- **Ready**: Spesifikasi dan kriteria penerimaan telah lengkap; siap diambil oleh developer.
- **In Progress**: Sedang aktif dikerjakan oleh developer pada branch task terisolasi.
- **In Review**: Implementasi selesai, seluruh test lokal lulus, dan Pull Request terbuka siap direview.
- **Blocked**: Pekerjaan terhenti akibat kendala teknis atau dependensi eksternal. **Wajib menyertakan alasan kendala (minimal 3 karakter)**.
- **Done**: Pekerjaan telah selesai, PR telah di-merge ke branch utama (atau disetujui lead), dan CI lulus. **Done adalah status terminal**.

### 2.2 Dual Support Status pada Project #1
Project #1 (`kopkar-sai`) secara bawaan menyediakan kolom `Todo`, `In progress`, dan `Done`.
Skrip otomatisasi mendukung kedua model:
- Jika kolom khusus ada (`Backlog`, `Ready`, `In Review`, `Blocked`), kolom tersebut diisi secara langsung.
- Jika menggunakan opsi default 3 kolom:
  - `Backlog`, `Ready` ➔ `Todo`
  - `In Progress`, `In Review`, `Blocked` ➔ `In progress`
  - `Done` ➔ `Done`

### 2.3 Konvensi Penamaan Branch & Worktree
Pola branch wajib:
```text
{type}/{issue-number}-{short-kebab-slug}
```
Contoh valid:
- `feat/101-loan-calculator-backend`
- `fix/102-dual-approval-verification`
- `refactor/103-screen-budget-optimization`
