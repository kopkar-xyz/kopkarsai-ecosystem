#!/usr/bin/env python3
"""
Discord Webhook Notification Dispatcher (Legacy Fallback / Testing Tool).
NOTE: The primary production notification sender is the existing Discord Bot
(ekyaaa/dc-bot-project-management) receiving GitHub App webhook events directly.
This script is preserved for dry-run testing and legacy fallback when configured.
Uses GitHub Secrets (DISCORD_WEBHOOK_URL, DISCORD_MENTION_MAP) strictly from environment.
Never logs secrets or leaks raw mappings.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Tuple

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import sanitize_text

def sanitize_discord_content(text: str) -> str:
    """Strip mass ping attempts (@everyone, @here) and control characters."""
    if not text:
        return ""
    cleaned = re.sub(r"@(everyone|here)", lambda m: "@\u200b" + m.group(1), text)
    cleaned = re.sub(r"<@&?\d+>", "[mention]", cleaned)
    return sanitize_text(cleaned, max_len=1000)

def parse_mention_map(raw_json: Optional[str]) -> Dict[str, str]:
    if not raw_json:
        return {}
    try:
        data = json.loads(raw_json)
        if isinstance(data, dict):
            return {str(k).lower(): str(v).strip() for k, v in data.items() if str(v).strip().isdigit()}
    except Exception:
        pass
    return {}

def build_payload(
    event_type: str,
    title: str,
    url: str,
    actor: str,
    repo_name: str,
    details: str,
    mention_map: Dict[str, str],
) -> Tuple[Dict[str, Any], List[str]]:
    actor_clean = sanitize_text(actor.lower())
    discord_user_id = mention_map.get(actor_clean)

    mentioned_users: List[str] = []
    content_prefix = ""

    if discord_user_id:
        content_prefix = f"<@{discord_user_id}> "
        mentioned_users.append(discord_user_id)

    color_map = {
        "issue_assigned": 0x3498DB,  # Blue
        "issue_opened": 0x2ECC71,    # Green
        "pr_ready": 0x9B59B6,        # Purple
        "review_requested": 0xE67E22,# Orange
        "ci_failure": 0xE74C3C,      # Red
        "state_sync": 0x1ABC9C,      # Turquoise
    }
    embed_color = color_map.get(event_type, 0x95A5A6)

    event_labels = {
        "issue_assigned": "📌 Issue Assigned",
        "issue_opened": "🆕 Issue Opened",
        "pr_ready": "🚀 Pull Request Ready",
        "review_requested": "👀 Review Requested",
        "ci_failure": "❌ CI Workflow Failed",
        "state_sync": "🔄 Task State Synchronized",
    }
    event_label = event_labels.get(event_type, f"Event: {event_type}")

    embed = {
        "title": f"[{repo_name}] {event_label}",
        "description": f"**{sanitize_discord_content(title)}**\n\n{sanitize_discord_content(details)}",
        "url": url if url.startswith("https://github.com/") else None,
        "color": embed_color,
        "fields": [
            {"name": "Actor", "value": f"@{actor}", "inline": True},
            {"name": "Repository", "value": repo_name, "inline": True},
        ],
        "footer": {
            "text": "KopKar SAI Supervised Development Coordination",
        },
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }

    allowed_mentions = {
        "parse": [],
        "users": mentioned_users,
    }

    payload = {
        "content": content_prefix.strip() if content_prefix else None,
        "embeds": [embed],
        "allowed_mentions": allowed_mentions,
    }
    return payload, mentioned_users

def send_webhook(
    url: str,
    payload: Dict[str, Any],
    max_retries: int = 3,
    backoff_factor: float = 1.0,
    http_poster: Optional[Callable[[str, bytes], Tuple[int, bytes]]] = None,
) -> Tuple[bool, str]:
    if not url.startswith("https://discord.com/api/webhooks/") and not url.startswith("http://"):
        return False, "Invalid Discord webhook URL format"

    data = json.dumps(payload).encode("utf-8")

    def default_poster(target_url: str, post_data: bytes) -> Tuple[int, bytes]:
        req = urllib.request.Request(
            target_url,
            data=post_data,
            headers={
                "Content-Type": "application/json",
                "User-Agent": "KopKarSAI-NotificationAgent/1.0",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status, resp.read()

    poster = http_poster or default_poster

    for attempt in range(1, max_retries + 1):
        try:
            status, _ = poster(url, data)
            if status in (200, 204):
                return True, f"Notification delivered (HTTP {status})"
        except urllib.error.HTTPError as e:
            if e.code == 429:
                retry_after = 1.0
                try:
                    err_body = json.loads(e.read().decode("utf-8"))
                    retry_after = float(err_body.get("retry_after", 1.0))
                except Exception:
                    pass
                time.sleep(retry_after)
                continue
            return False, f"Discord API rejected payload with HTTP {e.code}: {e.reason}"
        except Exception as e:
            if attempt == max_retries:
                return False, f"Failed after {max_retries} attempts: {e}"
            time.sleep(backoff_factor * (2 ** (attempt - 1)))

    return False, "Exceeded retry attempts"

def main():
    parser = argparse.ArgumentParser(description="Dispatch Discord Webhook Notification")
    parser.add_argument("--event", required=True, choices=["issue_assigned", "issue_opened", "pr_ready", "review_requested", "ci_failure", "state_sync"])
    parser.add_argument("--title", required=True, help="Notification title")
    parser.add_argument("--url", default="", help="Relevant URL")
    parser.add_argument("--actor", default="github-actions", help="Actor username")
    parser.add_argument("--repo", default="kopkar-xyz/kopkarsai-ecosystem", help="Repository full name")
    parser.add_argument("--details", default="", help="Detailed message")
    parser.add_argument("--dry-run", action="store_true", help="Print payload without sending")
    args = parser.parse_args()

    webhook_url = os.environ.get("DISCORD_WEBHOOK_URL", "")
    mention_json = os.environ.get("DISCORD_MENTION_MAP", "")
    mention_map = parse_mention_map(mention_json)

    payload, _ = build_payload(
        event_type=args.event,
        title=args.title,
        url=args.url,
        actor=args.actor,
        repo_name=args.repo,
        details=args.details,
        mention_map=mention_map,
    )

    if args.dry_run or not webhook_url:
        print("[DRY RUN] Discord Webhook Payload:")
        print(json.dumps(payload, indent=2))
        if not webhook_url:
            print("\nDISCORD_WEBHOOK_URL not set in environment. Dry run completed.")
        sys.exit(0)

    success, msg = send_webhook(webhook_url, payload)
    if success:
        print(f"✅ {msg}")
        sys.exit(0)
    else:
        print(f"❌ {msg}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
