#!/usr/bin/env python3
"""
Task Context & Summary Tool for KopKar SAI.
Read-only inspection of developer tasks, active branches, and issue status.
Degrades gracefully when gh CLI is unavailable or offline.
"""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import (
    find_gh_binary,
    get_git_branch,
    get_repo_root,
    load_identity,
    run_cmd,
    sanitize_text,
)

def get_local_worktrees() -> List[Dict[str, str]]:
    worktrees = []
    res = run_cmd(["git", "worktree", "list", "--porcelain"])
    if res.returncode == 0:
        current_wt: Dict[str, str] = {}
        for line in res.stdout.splitlines():
            line = line.strip()
            if line.startswith("worktree "):
                current_wt["path"] = line.split(" ", 1)[1]
            elif line.startswith("branch "):
                current_wt["branch"] = line.split(" ", 1)[1].replace("refs/heads/", "")
            elif line.startswith("HEAD "):
                current_wt["head"] = line.split(" ", 1)[1]
            elif line == "":
                if current_wt:
                    worktrees.append(current_wt)
                    current_wt = {}
        if current_wt:
            worktrees.append(current_wt)
    return worktrees

def get_local_task_branches() -> List[str]:
    res = run_cmd(["git", "branch", "--list", "feat/*", "fix/*", "refactor/*", "docs/*", "test/*", "chore/*"])
    if res.returncode == 0:
        branches = []
        for line in res.stdout.splitlines():
            clean = line.replace("*", "").strip()
            if clean:
                branches.append(clean)
        return branches
    return []

def load_cached_task_states() -> Dict[str, Any]:
    state_file = get_repo_root() / ".agent" / "task-state.json"
    if state_file.is_file():
        try:
            with open(state_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def fetch_review_requests() -> List[Dict[str, Any]]:
    gh_bin = find_gh_binary()
    if not gh_bin:
        return []
    cmd = [
        gh_bin, "pr", "list",
        "--search", "review-requested:@me",
        "--state", "open",
        "--json", "number,title,url,author"
    ]
    res = run_cmd(cmd)
    if res.returncode == 0:
        try:
            return json.loads(res.stdout)
        except Exception:
            return []
    return []

def fetch_github_issues(username: str) -> Tuple[List[Dict[str, Any]], Optional[str]]:
    gh_bin = find_gh_binary()
    if not gh_bin:
        return [], "GitHub CLI ('gh') not installed. Showing local repository tasks only."

    cmd = [
        gh_bin, "issue", "list",
        "--assignee", username,
        "--state", "open",
        "--json", "number,title,state,labels,updatedAt,url"
    ]
    res = run_cmd(cmd)
    if res.returncode != 0:
        return [], f"gh CLI query error: {res.stderr.strip() or 'Offline or unauthenticated'}"

    try:
        data = json.loads(res.stdout)
        return data, None
    except Exception as e:
        return [], f"Failed to parse gh output: {e}"

def main():
    parser = argparse.ArgumentParser(description="Inspect active tasks and developer context")
    parser.add_argument("--json", action="store_true", help="Output summary in machine-readable JSON format")
    args = parser.parse_args()

    repo_root = get_repo_root()
    id_data, id_err = load_identity()

    current_branch = get_git_branch()
    local_branches = get_local_task_branches()
    worktrees = get_local_worktrees()
    cached_states = load_cached_task_states()

    username = id_data.get("developer", {}).get("github_username") if id_data else None
    disp_name = id_data.get("developer", {}).get("display_name") if id_data else "Developer"
    machine = id_data.get("workspace", {}).get("machine_label") if id_data else "workstation"

    issues: List[Dict[str, Any]] = []
    issues_err: Optional[str] = None
    if username:
        issues, issues_err = fetch_github_issues(username)

    reviews = fetch_review_requests()

    if args.json:
        output = {
            "developer": {
                "display_name": disp_name,
                "github_username": username,
                "machine_label": machine,
            },
            "git": {
                "current_branch": current_branch,
                "local_task_branches": local_branches,
                "worktrees": worktrees,
            },
            "cached_states": cached_states,
            "assigned_issues": issues,
            "review_requests": reviews,
            "error": issues_err,
        }
        print(json.dumps(output, indent=2))
        sys.exit(0)

    # Human-readable CLI formatting
    print("\n=======================================================")
    print(f"  🧑‍💻 KopKar SAI Task Context: {disp_name} (@{username or 'not configured'})")
    print(f"  💻 Machine: {machine} | Active Branch: {current_branch or '(detached HEAD)'}")
    print("=======================================================\n")

    # 1. Local Task Branches
    print("🌿 Local Task Branches:")
    if not local_branches:
        print("   (No active task branches matching {type}/{issue}-{slug})")
    else:
        for b in local_branches:
            marker = "➔ [ACTIVE]" if b == current_branch else " "
            state_rec = None
            for k, v in cached_states.items():
                if v.get("branch") == b:
                    state_rec = v.get("state")
                    break
            state_info = f" [State: {state_rec}]" if state_rec else ""
            print(f"   {marker} {b}{state_info}")

    # 2. Local Worktrees
    if worktrees:
        print("\n📂 Active Git Worktrees:")
        for wt in worktrees:
            b_name = wt.get("branch", "detached")
            print(f"   • {b_name} ➔ {wt.get('path')}")

    # 3. Assigned Issues from GitHub
    print(f"\n📋 Assigned GitHub Issues (@{username or 'me'}):")
    if issues_err:
        print(f"   ⚠️  Notice: {issues_err}")
    elif not issues:
        print("   (No open issues currently assigned)")
    else:
        for iss in issues:
            labels = [l.get("name") for l in iss.get("labels", [])]
            label_str = f" [{', '.join(labels)}]" if labels else ""
            print(f"   #{iss.get('number')}: {sanitize_text(iss.get('title', ''))}{label_str}")
            print(f"       URL: {iss.get('url')}")

    # 4. Review Requests
    if reviews:
        print("\n👀 Pull Requests Awaiting Your Review:")
        for r in reviews:
            author = r.get("author", {}).get("login", "unknown")
            print(f"   PR #{r.get('number')}: {sanitize_text(r.get('title', ''))} (by @{author})")
            print(f"       URL: {r.get('url')}")

    print("\n-------------------------------------------------------")
    print("Commands:")
    print("  • Start task:   python3 scripts/agentic/start-task.py --type <type> --issue <num> --slug <name>")
    print("  • Sync state:   python3 scripts/agentic/sync-state.py --state <state> --issue <num>")
    print("  • Prepare PR:   python3 scripts/agentic/prepare-pr.py")
    print("-------------------------------------------------------\n")

if __name__ == "__main__":
    main()
