"""
Unit tests for Pull Request Preparation Tool.
"""

from __future__ import annotations

import unittest
from scripts.agentic.prepare_pr import extract_issue_and_type

class TestPreparePR(unittest.TestCase):
    def test_extract_issue_and_type_valid(self):
        task_type, issue_num, slug = extract_issue_and_type("feat/101-loan-calculator-backend")
        self.assertEqual(task_type, "feat")
        self.assertEqual(issue_num, 101)
        self.assertEqual(slug, "loan-calculator-backend")

        task_type, issue_num, slug = extract_issue_and_type("fix/202-member-approval-check")
        self.assertEqual(task_type, "fix")
        self.assertEqual(issue_num, 202)
        self.assertEqual(slug, "member-approval-check")

    def test_extract_issue_and_type_invalid(self):
        task_type, issue_num, slug = extract_issue_and_type("main")
        self.assertIsNone(task_type)
        self.assertIsNone(issue_num)
        self.assertIsNone(slug)

        task_type, issue_num, slug = extract_issue_and_type("dev/ekyaaa")
        self.assertIsNone(task_type)

if __name__ == "__main__":
    unittest.main()
