---
name: developer-onboarding
description: Initialize and validate local developer identity, configure workstation label, and run preflight diagnostics for KopKar SAI.
---

# Developer Onboarding & Preflight Runbook

This skill initializes and verifies local developer identity (`.agent/developer.local.json`) and runs comprehensive environment checks.

---

## 1. Quick Onboarding Setup

### Non-Interactive Setup
```bash
python3 scripts/agentic/bootstrap.py \
  --display-name "Developer" \
  --github-username "ekyaaa" \
  --machine-label "dev-nobara" \
  --project-number 1 \
  --project-owner "kopkar-xyz" \
  --project-title "kopkar-sai" \
  --non-interactive
```

### Interactive Setup
```bash
python3 scripts/agentic/bootstrap.py
```

---

## 2. Diagnostics & Preflight Healthcheck

```bash
python3 scripts/agentic/doctor.py
```

Options:
- `--json`: Output full diagnostic results in machine-readable JSON format.
- `--strict`: Treat warnings as fatal blockers.
- `--quiet`: Only output issues requiring remediation.
