---
name: pr-preparation
description: Validate branch naming, clean working tree, execute local tests, and generate a standardized Pull Request matching repository templates.
---

# PR Preparation Runbook (Alias for prepare-pr)

This skill verifies that the local workspace is ready for Pull Request creation, runs test verification, and outputs a formatted PR body.

## Execution

```bash
python3 scripts/agentic/prepare-pr.py \
  --test-cmd "pytest apps/backend/tests"
```
