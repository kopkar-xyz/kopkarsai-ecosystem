#!/usr/bin/env python3
"""
Common utilities for agentic workflow scripts in KopKar SAI Ecosystem.
Standard library only: zero external dependencies.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

SCHEMA_VERSION = 1

class Status:
    PASS = "PASS"
    WARN = "WARN"
    FAIL = "FAIL"
    PENDING_CONFIGURATION = "PENDING_CONFIGURATION"

def get_repo_root() -> Path:
    """Find the Git repository root directory."""
    try:
        res = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            capture_output=True,
            text=True,
            check=True
        )
        return Path(res.stdout.strip())
    except Exception:
        # Fallback to parent of scripts/agentic/
        return Path(__file__).resolve().parent.parent.parent

def get_identity_path() -> Path:
    """
    Locate the developer local configuration file.
    Supports worktrees by checking root .agent/ first,
    or looking up to the main worktree git directory.
    """
    env_path = os.environ.get("AGENTIC_DEV_CONFIG")
    if env_path:
        return Path(env_path)

    repo_root = get_repo_root()
    direct_path = repo_root / ".agent" / "developer.local.json"
    if direct_path.is_file():
        return direct_path

    # If running inside a git worktree, check the main worktree repository root
    try:
        common_git = subprocess.run(
            ["git", "rev-parse", "--git-common-dir"],
            capture_output=True,
            text=True
        )
        if common_git.returncode == 0 and common_git.stdout.strip():
            main_git = Path(common_git.stdout.strip()).resolve()
            if main_git.name == ".git":
                main_root = main_git.parent
                main_config = main_root / ".agent" / "developer.local.json"
                if main_config.is_file():
                    return main_config
    except Exception:
        pass

    return direct_path

def get_schema_path() -> Path:
    return get_repo_root() / ".agent" / "developer.schema.json"

def get_example_path() -> Path:
    return get_repo_root() / ".agent" / "developer.example.json"

def load_identity() -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """
    Load developer identity JSON.
    Returns (data, error_message).
    """
    config_file = get_identity_path()
    if not config_file.is_file():
        return None, f"Developer configuration not found at {config_file}"

    try:
        with open(config_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data, None
    except json.JSONDecodeError as e:
        return None, f"Invalid JSON in {config_file}: {e}"
    except Exception as e:
        return None, f"Error reading {config_file}: {e}"

def validate_identity(data: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """
    Validate identity against requirements without external jsonschema dependency.
    """
    errors: List[str] = []

    if not isinstance(data, dict):
        return False, ["Configuration root must be a JSON object"]

    # 1. Schema Version
    if data.get("schema_version") != SCHEMA_VERSION:
        errors.append(f"schema_version must be integer {SCHEMA_VERSION}")

    # 2. Developer Section
    dev = data.get("developer")
    if not isinstance(dev, dict):
        errors.append("Missing required 'developer' object")
    else:
        disp_name = dev.get("display_name")
        if not disp_name or not isinstance(disp_name, str) or not disp_name.strip():
            errors.append("developer.display_name must be a non-empty string")

        gh_user = dev.get("github_username")
        if not gh_user or not isinstance(gh_user, str) or not gh_user.strip():
            errors.append("developer.github_username must be a non-empty string")
        elif not re.match(r"^[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,37}[a-zA-Z0-9])?$", gh_user):
            errors.append(f"'{gh_user}' is not a valid GitHub username format")

        email = dev.get("email")
        if email is not None:
            if not isinstance(email, str) or not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
                errors.append(f"developer.email '{email}' is not a valid email address")

    # 3. Workspace Section
    ws = data.get("workspace")
    if not isinstance(ws, dict):
        errors.append("Missing required 'workspace' object")
    else:
        machine = ws.get("machine_label")
        if not machine or not isinstance(machine, str) or not machine.strip():
            errors.append("workspace.machine_label must be a non-empty string")

    # 4. Project Section (Optional)
    proj = data.get("project")
    if proj is not None:
        if not isinstance(proj, dict):
            errors.append("'project' must be an object if provided")
        else:
            p_num = proj.get("project_number")
            if p_num is not None and (not isinstance(p_num, int) or p_num <= 0):
                errors.append("project.project_number must be a positive integer")

    return len(errors) == 0, errors

def find_gh_binary() -> Optional[str]:
    """Find native GitHub CLI binary."""
    workspace_gh = get_repo_root() / ".agent/bin/gh"
    if workspace_gh.is_file() and os.access(workspace_gh, os.X_OK):
        return str(workspace_gh)

    user_local = Path("/home/mashupsoat/.local/bin/gh")
    if user_local.is_file() and os.access(user_local, os.X_OK):
        return str(user_local)

    which_gh = shutil.which("gh")
    if which_gh:
        return which_gh

    common_paths = [
        Path.home() / ".local/bin/gh",
        Path("/usr/local/bin/gh"),
        Path("/usr/bin/gh"),
    ]
    for p in common_paths:
        if p.is_file() and os.access(p, os.X_OK):
            return str(p)

    return None

def run_cmd(cmd: List[str], cwd: Optional[Path] = None, timeout: int = 15) -> subprocess.CompletedProcess:
    """Run shell command and return CompletedProcess."""
    work_dir = cwd or get_repo_root()
    return subprocess.run(
        cmd,
        cwd=str(work_dir),
        capture_output=True,
        text=True,
        timeout=timeout,
        check=False,
    )

def is_git_ignored(file_path: Path) -> bool:
    """Verify if a specific file is ignored by Git."""
    root = get_repo_root()
    try:
        rel = file_path.relative_to(root)
    except ValueError:
        rel = file_path

    res = run_cmd(["git", "check-ignore", "-q", str(rel)])
    return res.returncode == 0

def get_git_branch() -> str:
    """Return active git branch or empty string if detached."""
    res = run_cmd(["git", "symbolic-ref", "--short", "-q", "HEAD"])
    return res.stdout.strip() if res.returncode == 0 else ""

def get_default_branch() -> str:
    """Detect default branch (main or master)."""
    res = run_cmd(["git", "symbolic-ref", "refs/remotes/origin/HEAD"])
    if res.returncode == 0 and res.stdout.strip():
        return res.stdout.strip().split("/")[-1]
    return "main"

def sanitize_text(text: str, max_len: int = 500) -> str:
    """Sanitize text to prevent control character injection and excessive lengths."""
    if not text:
        return ""
    # Strip null bytes and non-printable control characters (except newline, tab)
    cleaned = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", text)
    return cleaned[:max_len].strip()
