# GitHub Project & Issue Management Examples

Contoh perintah `scripts/agentic/gh_project.py` (gunakan `python` di Windows atau `python3` di POSIX).

> [!TIP]
> Di Windows PowerShell, selalu gunakan *single-quoted here-string* `@' ... '@` untuk teks `--body` multiline yang mengandung backtick agar karakter seperti `` `0 `` tidak ditafsirkan sebagai *null byte*.

---

## 1. Create Issue (Dry-Run ➔ Live)

```bash
# Review Phase (Dry-Run)
python scripts/agentic/gh_project.py create-issue \
  --title "Implement Dual-Approval Verification Backend" \
  --type feat \
  --status Ready \
  --priority High \
  --assignee <github-username> \
  --body "## Summary
Backend endpoint for two-tier member verification (Admin Toko -> Kepala Koperasi).

## Acceptance Criteria
- [ ] Admin Toko can verify KTP
- [ ] Kepala Koperasi gives final approval
- [ ] Non-active member cannot login

## Definition of Done
- Code reviewed and tests passing" \
  --dry-run

# Execution Phase (Setelah Developer Setuju — hapus flag --dry-run)
```

---

## 2. Edit Issue (Dry-Run ➔ Live)

```bash
python scripts/agentic/gh_project.py edit-issue \
  --issue 101 \
  --title "Updated Title" \
  --add-label "backend" \
  --dry-run
```

---

## 3. Close Issue (Dry-Run ➔ Live)

```bash
python scripts/agentic/gh_project.py close-issue \
  --issue 101 \
  --comment "Resolved via PR #10" \
  --reason completed \
  --dry-run
```

---

## 4. Delete Issue (Dry-Run ➔ Live, Destructive)

```bash
python scripts/agentic/gh_project.py delete-issue \
  --issue 101 \
  --dry-run
```
