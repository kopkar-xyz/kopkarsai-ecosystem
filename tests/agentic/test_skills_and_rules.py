"""
Unit tests for Antigravity Skills, Rules, and Hooks Discovery in KopKar SAI.
"""

from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from scripts.agentic.common import get_repo_root

VALID_RULE_TRIGGERS = {"always_on", "model_decision", "glob", "manual"}


class TestSkillsAndRules(unittest.TestCase):
    def setUp(self):
        self.repo_root = get_repo_root()

    def test_required_skills_exist_and_have_frontmatter(self):
        required_skills = [
            "developer-onboarding",
            "inspect-project-tasks",
            "start-task",
            "sync-project-state",
            "prepare-pr",
            "manage-github-project",
        ]
        skills_dir = self.repo_root / ".agents" / "skills"
        self.assertTrue(skills_dir.is_dir(), ".agents/skills must be a directory")

        for skill_name in required_skills:
            self.assertTrue(
                (skills_dir / skill_name / "SKILL.md").is_file(),
                f"SKILL.md missing for required skill {skill_name}",
            )

        # Validate every skill directory under .agents/skills/
        skill_dirs = [p for p in skills_dir.iterdir() if p.is_dir()]
        self.assertGreaterEqual(len(skill_dirs), len(required_skills))

        for skill_dir in skill_dirs:
            skill_name = skill_dir.name
            skill_path = skill_dir / "SKILL.md"
            self.assertTrue(skill_path.is_file(), f"SKILL.md missing for {skill_name}")

            content = skill_path.read_text(encoding="utf-8")
            self.assertTrue(content.startswith("---"), f"{skill_name}/SKILL.md must start with YAML frontmatter")

            name_match = re.search(r"^name:\s*([\w\-]+)", content, re.MULTILINE)
            self.assertIsNotNone(name_match, f"{skill_name} missing 'name:' in frontmatter")
            self.assertEqual(name_match.group(1), skill_name)

            desc_match = re.search(r"^description:\s*(.+)", content, re.MULTILINE)
            self.assertIsNotNone(desc_match, f"{skill_name} missing 'description:' in frontmatter")

    def test_rules_frontmatter(self):
        rules_dir = self.repo_root / ".agents" / "rules"
        self.assertTrue(rules_dir.is_dir(), ".agents/rules must be a directory")

        required_rules = [
            "agentic-workflow-constraints.md",
            "github-coordination.md",
            "native-gh-execution.md",
            "frontend-ownership.md",
        ]
        for rule_name in required_rules:
            self.assertTrue((rules_dir / rule_name).is_file(), f"{rule_name} must exist")

        rule_files = sorted(rules_dir.glob("*.md"))
        self.assertGreater(len(rule_files), 0, "Expected rule markdown files in .agents/rules/")

        for rule_file in rule_files:
            self.assertFalse(rule_file.is_symlink(), f"{rule_file.name} must not be a symlink")
            content = rule_file.read_text(encoding="utf-8")
            self.assertGreaterEqual(
                len(content.strip()),
                60,
                f"{rule_file.name} is suspiciously short (possible broken symlink pointer)",
            )
            self.assertTrue(
                content.startswith("---"),
                f"{rule_file.name} must start with YAML frontmatter",
            )

            fm_end = content.find("\n---", 3)
            self.assertNotEqual(fm_end, -1, f"{rule_file.name} missing closing frontmatter delimiter")
            frontmatter = content[3:fm_end]

            trigger_match = re.search(r"^trigger:\s*(\S+)", frontmatter, re.MULTILINE)
            self.assertIsNotNone(trigger_match, f"{rule_file.name} missing 'trigger:' in frontmatter")
            trigger = trigger_match.group(1).strip("'\"")
            self.assertIn(
                trigger,
                VALID_RULE_TRIGGERS,
                f"{rule_file.name} has invalid trigger '{trigger}'",
            )

            if trigger == "model_decision":
                self.assertRegex(
                    frontmatter,
                    r"(?m)^description:\s*.+",
                    f"{rule_file.name} with trigger=model_decision must declare 'description:'",
                )
            elif trigger == "glob":
                self.assertRegex(
                    frontmatter,
                    r"(?m)^globs:\s*.+",
                    f"{rule_file.name} with trigger=glob must declare 'globs:'",
                )

    def test_hooks_json_validity(self):
        hooks_file = self.repo_root / ".agents" / "hooks.json"
        self.assertTrue(hooks_file.is_file(), ".agents/hooks.json must exist")

        with open(hooks_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        self.assertIn("session-preflight", data)
        hook_spec = data["session-preflight"]
        self.assertTrue(hook_spec.get("enabled", True))
        self.assertIn("SessionStart", hook_spec)
        self.assertIn("PreInvocation", hook_spec)

    def test_agents_markdown_policies(self):
        agents_file = self.repo_root / "AGENTS.md"
        self.assertTrue(agents_file.is_file(), "Root AGENTS.md must exist")
        content = agents_file.read_text(encoding="utf-8")
        self.assertIn("Supervised Autonomous Development Coordination Policies", content)
        self.assertIn("developer-onboarding", content)
        self.assertIn("start-task", content)
        self.assertIn("sync-project-state", content)
        self.assertIn("prepare-pr", content)

    def test_developer_schema_and_example(self):
        schema_path = self.repo_root / ".agent" / "developer.schema.json"
        example_path = self.repo_root / ".agent" / "developer.example.json"

        self.assertTrue(schema_path.is_file())
        self.assertTrue(example_path.is_file())

        with open(schema_path, "r", encoding="utf-8") as f:
            schema = json.load(f)
        self.assertEqual(schema.get("title"), "AgenticDeveloperIdentity")

        with open(example_path, "r", encoding="utf-8") as f:
            example = json.load(f)
        self.assertEqual(example.get("schema_version"), 1)
        self.assertIn("developer", example)
        self.assertIn("workspace", example)


if __name__ == "__main__":
    unittest.main()
