#!/usr/bin/env python3
"""
Sync Frontend Issues & Label Hierarchy for KopKar SAI Ecosystem.
Manages all 11 Parent Issues, 40 Sub-Issues, Labels, and Agent Message Board.
Supports full --dry-run for developer review gate.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import (
    find_gh_binary,
    get_repo_root,
    load_identity,
    sanitize_text,
)

DEFAULT_REPO = "kopkar-xyz/kopkarsai-ecosystem"
DEFAULT_ORG = "kopkar-xyz"
DEFAULT_PROJECT_NUMBER = 1

def normalize_assignees(raw: str) -> List[str]:
    cleaned = raw.replace("&", ",").replace(" and ", ",").replace("`", "").replace("@", "").strip()
    result = []
    for part in cleaned.split(","):
        u = part.strip()
        if not u:
            continue
        if u.lower() == "revani":
            u = "revaniputeri"
        result.append(u)
    return result

# 1. Label Definitions
FRONTEND_LABELS = [
    {"name": "FE: Todo", "color": "6E7781", "description": "Frontend implementation not started"},
    {"name": "FE: Ongoing", "color": "FBCA04", "description": "Frontend implementation in progress"},
    {"name": "FE: Done", "color": "2DA44E", "description": "Frontend acceptance criteria verified"},
    {"name": "FE: Blocked", "color": "D73A4A", "description": "Frontend blocked by dependency"},
    {"name": "scope: koperasi-client", "color": "5C6BC0", "description": "Koperasi member and supplier UI"},
    {"name": "scope: koperasi-admin", "color": "896CEB", "description": "Koperasi admin and approval UI"},
    {"name": "scope: marketplace", "color": "1F6FEB", "description": "Marketplace storefront, cart, cashier UI"},
    {"name": "scope: shared", "color": "8250DF", "description": "Shared ecosystem gateway and global UI"},
]

# 2. Message Board Definition
MESSAGE_BOARD_ISSUE = {
    "title": "[AGENT BOARD][FE] KOPKARSAI Frontend Coordination",
    "labels": ["scope: shared", "FE: Ongoing"],
    "assignees": ["ekyaaa", "revani"],
    "body": """## Purpose
Pusat komunikasi koordinasi dan serah-terima (*handoff*) pengembangan frontend antara pengembang manusia dan agen AI di **KOPKARSAI Ecosystem**.

## Active Frontend Owners
- **Koperasi Client & Admin**: @ekyaaa
- **Marketplace**: @revani
- **Shared Ecosystem**: @ekyaaa & @revani

## Documentation References
- [Frontend Feature Ownership Matrix](docs/project-knowledge/frontend/FEATURE_OWNERSHIP_MATRIX.md)
- [Frontend GitHub Issue Plan](docs/project-knowledge/frontend/ISSUE_TRACKING.md)
- [Antigravity Ownership Rules](.agents/rules/frontend-ownership.md)

## Coordination Protocol
Setiap kali terjadi delegasi tugas atau perubahan lintas-wilayah, tulis pesan dengan format:

```markdown
**[HANDOFF]**
From: @sender
To: @recipient
Domain: [Koperasi / Marketplace / Shared]
Feature: [FEATURE_ID]
Issue: [Issue URL/Number]
Request: [Detail permintaan koordinasi]
Reason: [Alasan perubahan]
Affected Files: [Path berkas]
Status: Pending Acknowledgment
```

Supported Tags: `[PLAN]`, `[STATUS]`, `[BLOCKED]`, `[HANDOFF]`, `[ACK]`, `[READY_FOR_REVIEW]`, `[DONE]`.
"""
}

# 3. Parent Issues Definition (11 Modules)
PARENT_ISSUES = [
    {
        "id": "P1",
        "title": "[FE][KOPERASI-CLIENT] Pendaftaran Anggota & Dasbor Keanggotaan",
        "scope": "scope: koperasi-client",
        "status": "FE: Ongoing",
        "assignee": "ekyaaa",
        "features": ["KK-FTR-001", "KK-FTR-001-C", "KK-FTR-005"]
    },
    {
        "id": "P2",
        "title": "[FE][KOPERASI-CLIENT] Solusi Finansial & Tabungan Kesejahteraan",
        "scope": "scope: koperasi-client",
        "status": "FE: Ongoing",
        "assignee": "ekyaaa",
        "features": ["KK-FTR-004", "KK-FTR-004-B", "PROP-ADD-NEW-008"]
    },
    {
        "id": "P3",
        "title": "[FE][KOPERASI-CLIENT] Hub Usaha Anggota & Kemitraan Makanan UMKM",
        "scope": "scope: koperasi-client",
        "status": "FE: Ongoing",
        "assignee": "ekyaaa",
        "features": ["KK-FTR-002", "KK-FTR-002-B", "KK-FTR-002-C", "KK-FTR-006", "KK-FTR-007", "PROP-ADD-NEW-005"]
    },
    {
        "id": "P4",
        "title": "[FE][KOPERASI-ADMIN] Verifikasi Keanggotaan & Pengawasan Mitra",
        "scope": "scope: koperasi-admin",
        "status": "FE: Todo",
        "assignee": "ekyaaa",
        "features": ["KK-FTR-001-B", "KK-FTR-003", "PROP-ADD-NEW-010"]
    },
    {
        "id": "P5",
        "title": "[FE][KOPERASI-ADMIN] Kebijakan Diskon, Bundling & Analitik Suplai",
        "scope": "scope: koperasi-admin",
        "status": "FE: Todo",
        "assignee": "ekyaaa",
        "features": ["KK-FTR-007-B", "PROP-ADD-NEW-002", "PROP-ADD-NEW-009", "PROP-ADD-NEW-006"]
    },
    {
        "id": "P6",
        "title": "[FE][MARKETPLACE] Katalog Produk & Detail Belanja",
        "scope": "scope: marketplace",
        "status": "FE: Todo",
        "assignee": "revani",
        "features": ["MP-FTR-001", "MP-FTR-001-B", "PROP-ADD-NEW-001"]
    },
    {
        "id": "P7",
        "title": "[FE][MARKETPLACE] Keranjang, Kiosk Tablet & Antrean Prioritas GA",
        "scope": "scope: marketplace",
        "status": "FE: Todo",
        "assignee": "revani",
        "features": ["MP-FTR-002", "MP-FTR-004", "PROP-ADD-NEW-003"]
    },
    {
        "id": "P8",
        "title": "[FE][MARKETPLACE] Pembayaran, Integrasi Mandiri & Serah Terima Kasir",
        "scope": "scope: marketplace",
        "status": "FE: Todo",
        "assignee": "revani",
        "features": ["MP-FTR-005", "MP-FTR-005-B", "PROP-OOS-ACC-001", "PROP-OOS-ACC-002"]
    },
    {
        "id": "P9",
        "title": "[FE][MARKETPLACE] Dasbor Kasir Meja Toko & Verifikasi Fisik",
        "scope": "scope: marketplace",
        "status": "FE: Todo",
        "assignee": "revani",
        "features": ["MP-FTR-002-B", "MP-FTR-005-C", "PROP-ADD-NEW-004", "PROP-ADD-NEW-007"]
    },
    {
        "id": "P10",
        "title": "[FE][MARKETPLACE] Manajemen Inventaris, Pengaturan & Laporan Kasir",
        "scope": "scope: marketplace",
        "status": "FE: Todo",
        "assignee": "revani",
        "features": ["MP-FTR-001-C", "MP-FTR-008", "MP-FTR-006", "PROP-OOS-ACC-003"]
    },
    {
        "id": "P11",
        "title": "[FE][SHARED] Authentication Gateway & Layanan Bersama Ekosistem",
        "scope": "scope: shared",
        "status": "FE: Ongoing",
        "assignee": "ekyaaa,revani",
        "features": ["SH-FTR-001", "SH-FTR-002", "SH-FTR-003"]
    }
]

def load_all_features() -> List[Dict[str, Any]]:
    matrix_file = get_repo_root() / "docs" / "project-knowledge" / "frontend" / "FEATURE_OWNERSHIP_MATRIX.md"
    features = []
    if not matrix_file.is_file():
        return features

    content = matrix_file.read_text(encoding="utf-8")
    for line in content.splitlines():
        if line.startswith("| `") and not line.startswith("| Feature ID"):
            parts = [p.strip() for p in line.split("|")[1:-1]]
            if len(parts) >= 8:
                fid = parts[0].replace("`", "")
                name = parts[1]
                src = parts[2]
                app = parts[3]
                iface = parts[4]
                path = parts[5].replace("`", "")
                owner = parts[6]
                status = parts[7].replace("`", "")
                features.append({
                    "id": fid,
                    "name": name,
                    "source": src,
                    "app": app,
                    "interface": iface,
                    "path": path,
                    "owner": owner,
                    "status": status,
                })
    return features

def build_sub_issue_body(feat: Dict[str, Any], parent_title: str) -> str:
    owner_str = feat['owner']
    return f"""**Feature ID:** {feat['id']}
**Application:** {feat['app']}
**Interface:** {feat['interface']}
**Frontend Owner:** {owner_str}
**Parent Module:** {parent_title}
**Source:** {feat['source']}

### Objective
Menyediakan antarmuka interaktif responsif bagi pengguna untuk {feat['name'].lower()} sesuai aturan bisnis ekosistem KOPKARSAI.

### UI Scope
- File / Rute: `{feat['path']}`
- Komponen: Formulir input, kartu tampilan status, interaksi tombol aksi, dan dialog konfirmasi.
- Design System: Reusable custom components (`Button`, `Card`, `StatusBadge`, `Modal`).

### Functional Requirements
1. Menampilkan antarmuka yang ramah pengguna dengan validasi data masukan di sisi klien.
2. Mendukung interaktivitas real-time (loading states, disabled actions saat pemrosesan, dan error boundaries).
3. Mengikuti panduan palet warna resmi KOPKARSAI dan sentuhan nuansa Jepang/sakura yang bersahabat.

### Acceptance Criteria
- [ ] Tampilan responsif di layar perangkat seluler dan desktop tanpa horizontal overflow.
- [ ] Seluruh tombol aksi memiliki visual feedback yang jelas (loading spinner saat submit).
- [ ] Komponen UI mematuhi batasan anggaran kode halaman (<200 baris per file view).
- [ ] Kriteria penerimaan fungsional diverifikasi dengan mock data sebelum integrasi API backend.

### Frontend Dependencies
- Design tokens & icons: `lucide-react`, Tailwind CSS tokens di `docs/COLOR_PALETTE.md`.

### Backend Dependency — Deferred
- Penyelarasan REST API endpoint domain terkait pada fase backend handoff berikutnya.

### Verification
- Pengujian interaksi komponen UI dan alur navigasi.
- Verifikasi tampilan responsif (mobile portrait 360-430px dan desktop).

### References
- `docs/project-knowledge/frontend/FEATURE_OWNERSHIP_MATRIX.md`
- `docs/panduan-fitur-ekosistem.html`
"""

def main():
    parser = argparse.ArgumentParser(description="Sync frontend issues and labels.")
    parser.add_argument("--repo", default=DEFAULT_REPO, help="GitHub repository")
    parser.add_argument("--dry-run", action="store_true", default=True, help="Preview operations without executing")
    parser.add_argument("--execute", action="store_true", help="Execute changes on GitHub (requires gh CLI)")
    parser.add_argument("--create-labels", action="store_true", help="Create frontend labels")
    args = parser.parse_args()

    gh_bin = find_gh_binary()
    is_dry_run = not args.execute

    print("=================================================================")
    print("  KOPKARSAI Frontend GitHub Issue & Label Coordination Plan")
    print(f"  Target Repository: {args.repo}")
    print(f"  Execution Mode:    {'DRY-RUN (Review Gate Active)' if is_dry_run else 'LIVE EXECUTION'}")
    print(f"  GitHub CLI Status: {'Installed (' + str(gh_bin) + ')' if gh_bin else 'NOT INSTALLED (Offline)'}")
    print("=================================================================\n")

    # 1. Labels
    print(f"--- 1. Frontend Labels Plan ({len(FRONTEND_LABELS)} Labels) ---")
    for lbl in FRONTEND_LABELS:
        print(f"  • [{lbl['name']}] (Color: #{lbl['color']}) - {lbl['description']}")

    # 2. Message Board
    print(f"\n--- 2. Agent Coordination Message Board ---")
    print(f"  Title:     {MESSAGE_BOARD_ISSUE['title']}")
    print(f"  Labels:    {', '.join(MESSAGE_BOARD_ISSUE['labels'])}")
    print(f"  Assignees: {', '.join(MESSAGE_BOARD_ISSUE['assignees'])}")

    # 3. Parent Issues & Sub-Issues
    all_features = load_all_features()
    feat_map = {f['id']: f for f in all_features}

    print(f"\n--- 3. Parent & Sub-Issues Inventory ({len(PARENT_ISSUES)} Parents, {len(all_features)} Sub-Issues) ---")
    sub_count = 0
    for p in PARENT_ISSUES:
        print(f"\n📁 Parent [{p['id']}]: {p['title']}")
        print(f"   Scope: {p['scope']} | Status: {p['status']} | Assignee: {p['assignee']}")
        print(f"   Sub-Issues:")
        for fid in p['features']:
            feat = feat_map.get(fid)
            if feat:
                sub_count += 1
                sub_title = f"[FE][{feat['id']}] {feat['name']}"
                print(f"     └─ 📄 {sub_title}")
                print(f"        Owner: {feat['owner']} | Status: {feat['status']} | Scope: {p['scope']}")

    print("\n=================================================================")
    print(f"Total Labels:     {len(FRONTEND_LABELS)}")
    print(f"Total Message Board: 1")
    print(f"Total Parent Issues:{len(PARENT_ISSUES)}")
    print(f"Total Sub-Issues:   {sub_count}")
    print("=================================================================")

    if is_dry_run:
        print("\n💡 NOTICE: This is a DRY-RUN preview. To create issues remotely on GitHub:")
        print("   1. Verify developer review gate confirmation.")
        print("   2. Install GitHub CLI (`sudo dnf install gh && gh auth login`).")
        print("   3. Run with `--execute`.")
        return 0

    if not gh_bin:
        print("\n❌ ERROR: Cannot execute live creation because GitHub CLI ('gh') is not installed on this workstation.")
        print("   ↳ To install: sudo dnf install -y gh && gh auth login")
        return 1

    # Live Execution Mode (Developer Review Gate passed)
    print("\n🚀 Executing remote GitHub operations...")

    # Fetch existing issues to ensure 100% idempotency
    existing_issues = {}
    fetch_cmd = [str(gh_bin), "issue", "list", "--repo", args.repo, "--limit", "200", "--state", "all", "--json", "number,title,url"]
    f_res = subprocess.run(fetch_cmd, capture_output=True, text=True)
    if f_res.returncode == 0:
        try:
            for item in json.loads(f_res.stdout):
                existing_issues[item['title'].strip().lower()] = item
        except Exception:
            pass

    # A. Create Labels
    for lbl in FRONTEND_LABELS:
        print(f"Creating/updating label '{lbl['name']}'...")
        cmd = [str(gh_bin), "label", "create", lbl['name'], "--repo", args.repo, "--color", lbl['color'], "--description", lbl['description'], "--force"]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0:
            print(f"  ✅ Label '{lbl['name']}' ready.")
        else:
            print(f"  ⚠️ Label '{lbl['name']}': {res.stderr.strip() or res.stdout.strip()}")

    # B. Create Message Board
    mb_title_key = MESSAGE_BOARD_ISSUE['title'].strip().lower()
    if mb_title_key in existing_issues:
        print(f"\nMessage Board already exists: {existing_issues[mb_title_key]['url']}")
    else:
        print(f"\nCreating Message Board: {MESSAGE_BOARD_ISSUE['title']}...")
        mb_cmd = [str(gh_bin), "issue", "create", "--repo", args.repo, "--title", MESSAGE_BOARD_ISSUE['title'], "--body", MESSAGE_BOARD_ISSUE['body']]
        for l in MESSAGE_BOARD_ISSUE['labels']:
            mb_cmd.extend(["--label", l])
        for a in MESSAGE_BOARD_ISSUE['assignees']:
            for u in normalize_assignees(a):
                mb_cmd.extend(["--assignee", u])
        mb_res = subprocess.run(mb_cmd, capture_output=True, text=True)
        if mb_res.returncode == 0:
            mb_url = mb_res.stdout.strip()
            print(f"  ✅ Message Board created: {mb_url}")
            # Add to Project v2
            subprocess.run([str(gh_bin), "project", "item-add", str(DEFAULT_PROJECT_NUMBER), "--owner", DEFAULT_ORG, "--url", mb_url], capture_output=True)
        else:
            print(f"  ⚠️ Message Board notice: {mb_res.stderr.strip() or mb_res.stdout.strip()}")

    # C. Create Parents & Sub-Issues
    for p in PARENT_ISSUES:
        p_title_key = p['title'].strip().lower()
        p_url = None
        p_num = None
        if p_title_key in existing_issues:
            p_url = existing_issues[p_title_key]['url']
            p_num = existing_issues[p_title_key]['number']
            print(f"\nParent Issue already exists: {p['title']} (#{p_num}: {p_url})")
        else:
            p_body = f"## Parent Module: {p['title']}\nScope: {p['scope']}\nOwner: {p['assignee']}\n\n### Child Features:\n"
            for fid in p['features']:
                feat = feat_map.get(fid)
                if feat:
                    p_body += f"- [ ] [FE][{feat['id']}] {feat['name']}\n"

            print(f"\nCreating Parent Issue: {p['title']}...")
            p_cmd = [str(gh_bin), "issue", "create", "--repo", args.repo, "--title", p['title'], "--body", p_body, "--label", p['scope'], "--label", p['status']]
            for u in normalize_assignees(p['assignee']):
                p_cmd.extend(["--assignee", u])
            p_res = subprocess.run(p_cmd, capture_output=True, text=True)
            if p_res.returncode == 0:
                p_url = p_res.stdout.strip()
                match = re.search(r"/issues/(\d+)", p_url)
                p_num = int(match.group(1)) if match else None
                print(f"  ✅ Parent created: {p_url}")
                # Add to Project v2
                subprocess.run([str(gh_bin), "project", "item-add", str(DEFAULT_PROJECT_NUMBER), "--owner", DEFAULT_ORG, "--url", p_url], capture_output=True)
            else:
                print(f"  ⚠️ Parent creation notice: {p_res.stderr.strip() or p_res.stdout.strip()}")

        parent_ref_text = f"#{p_num} ({p['title']})" if p_num else p['title']

        for fid in p['features']:
            feat = feat_map.get(fid)
            if feat:
                sub_title = f"[FE][{feat['id']}] {feat['name']}"
                sub_title_key = sub_title.strip().lower()
                if sub_title_key in existing_issues:
                    print(f"    └─ ℹ️ Sub-Issue already exists: {sub_title} ({existing_issues[sub_title_key]['url']})")
                else:
                    sub_body = build_sub_issue_body(feat, parent_ref_text)
                    print(f"  Creating Sub-Issue: {sub_title}...")
                    s_cmd = [str(gh_bin), "issue", "create", "--repo", args.repo, "--title", sub_title, "--body", sub_body, "--label", p['scope'], "--label", feat['status']]
                    for u in normalize_assignees(feat['owner']):
                        s_cmd.extend(["--assignee", u])
                    s_res = subprocess.run(s_cmd, capture_output=True, text=True)
                    if s_res.returncode == 0:
                        s_url = s_res.stdout.strip()
                        print(f"    └─ ✅ Sub-Issue created: {s_url}")
                        # Add to Project v2
                        subprocess.run([str(gh_bin), "project", "item-add", str(DEFAULT_PROJECT_NUMBER), "--owner", DEFAULT_ORG, "--url", s_url], capture_output=True)
                    else:
                        print(f"    └─ ⚠️ Sub-Issue creation notice: {s_res.stderr.strip() or s_res.stdout.strip()}")

    return 0

if __name__ == "__main__":
    sys.exit(main())
    