"""
Unit tests for Native GitHub CLI Project & Issue Manager for KopKar SAI.
"""

from __future__ import annotations

import unittest
from unittest.mock import patch, MagicMock
from scripts.agentic.gh_project import (
    create_issue,
    edit_issue,
    close_issue,
    delete_issue,
    link_repository_to_project,
    resolve_status_option_id,
    get_gh_env,
    DEFAULT_ORG,
    DEFAULT_REPO,
    DEFAULT_PROJECT_NUMBER,
    STATUS_FALLBACK_MAP,
)

class TestGhProject(unittest.TestCase):
    def test_get_gh_env(self):
        env = get_gh_env()
        self.assertIsInstance(env, dict)

    def test_resolve_status_option_id_direct_and_fallback(self):
        options = {
            "Todo": "opt_todo",
            "In progress": "opt_inprogress",
            "Done": "opt_done",
        }
        # Direct match
        self.assertEqual(resolve_status_option_id("Todo", options), "opt_todo")
        self.assertEqual(resolve_status_option_id("todo", options), "opt_todo")

        # Fallback mappings
        self.assertEqual(resolve_status_option_id("Backlog", options), "opt_todo")
        self.assertEqual(resolve_status_option_id("Ready", options), "opt_todo")
        self.assertEqual(resolve_status_option_id("In Progress", options), "opt_inprogress")
        self.assertEqual(resolve_status_option_id("In Review", options), "opt_inprogress")
        self.assertEqual(resolve_status_option_id("Blocked", options), "opt_inprogress")
        self.assertEqual(resolve_status_option_id("Done", options), "opt_done")

    def test_resolve_status_option_id_specific_columns(self):
        options = {
            "Backlog": "opt_backlog",
            "Ready": "opt_ready",
            "In Progress": "opt_inprogress",
            "In Review": "opt_inreview",
            "Blocked": "opt_blocked",
            "Done": "opt_done",
        }
        # Direct match should take precedence over fallback
        self.assertEqual(resolve_status_option_id("Backlog", options), "opt_backlog")
        self.assertEqual(resolve_status_option_id("Ready", options), "opt_ready")
        self.assertEqual(resolve_status_option_id("In Review", options), "opt_inreview")

    def test_create_issue_dry_run(self):
        result = create_issue(
            title="Automated Test Issue",
            body="## Summary\nTest body",
            issue_type="feat",
            priority="High",
            status="Ready",
            assignee="ekyaaa",
            dry_run=True,
        )
        self.assertEqual(result.get("status"), "dry_run")
        self.assertEqual(result.get("title"), "Automated Test Issue")

    @patch("scripts.agentic.gh_project.exec_gh")
    def test_link_repo_success(self, mock_exec):
        mock_res = MagicMock()
        mock_res.returncode = 0
        mock_res.stdout = "Linked repository"
        mock_exec.return_value = mock_res

        success = link_repository_to_project(
            repo_name=DEFAULT_REPO,
            project_number=DEFAULT_PROJECT_NUMBER,
            owner=DEFAULT_ORG,
        )
        self.assertTrue(success)
        mock_exec.assert_called_once()
        args = mock_exec.call_args[0][0]
        self.assertIn("link", args)
        self.assertIn(str(DEFAULT_PROJECT_NUMBER), args)

    @patch("scripts.agentic.gh_project.exec_gh")
    def test_create_issue_success(self, mock_exec):
        # 1st call: issue create returns URL
        mock_create = MagicMock()
        mock_create.returncode = 0
        mock_create.stdout = f"https://github.com/{DEFAULT_ORG}/{DEFAULT_REPO}/issues/101"

        # 2nd call: project item-add returns JSON
        mock_add = MagicMock()
        mock_add.returncode = 0
        mock_add.stdout = '{"id": "PVTI_lADOAA"}'

        # 3rd & 4th calls: update status & priority
        mock_field = MagicMock()
        mock_field.returncode = 0
        mock_field.stdout = '{"data": {}}'

        mock_exec.side_effect = [mock_create, mock_add, mock_field, mock_field]

        result = create_issue(
            title="Real Issue",
            body="Task content",
            issue_type="feat",
            dry_run=False,
        )
        self.assertEqual(result.get("status"), "success")
        self.assertEqual(result.get("issue_number"), 101)
        self.assertEqual(result.get("item_id"), "PVTI_lADOAA")

    def test_edit_issue_dry_run(self):
        result = edit_issue(
            issue_number=101,
            title="Updated Title",
            body="Updated Body",
            add_labels=["bug"],
            dry_run=True,
        )
        self.assertEqual(result.get("status"), "dry_run")
        self.assertEqual(result.get("issue_number"), 101)

    @patch("scripts.agentic.gh_project.exec_gh")
    def test_edit_issue_success(self, mock_exec):
        mock_res = MagicMock()
        mock_res.returncode = 0
        mock_res.stdout = "Issue edited"
        mock_exec.return_value = mock_res

        result = edit_issue(
            issue_number=101,
            title="Updated Title",
            dry_run=False,
        )
        self.assertEqual(result.get("status"), "success")
        self.assertEqual(result.get("issue_number"), 101)

    def test_close_issue_dry_run(self):
        result = close_issue(
            issue_number=101,
            comment="Closing note",
            reason="completed",
            dry_run=True,
        )
        self.assertEqual(result.get("status"), "dry_run")
        self.assertEqual(result.get("issue_number"), 101)

    @patch("scripts.agentic.gh_project.exec_gh")
    def test_close_issue_success(self, mock_exec):
        mock_res = MagicMock()
        mock_res.returncode = 0
        mock_res.stdout = "Issue closed"
        mock_exec.return_value = mock_res

        result = close_issue(
            issue_number=101,
            comment="Done in PR #10",
            dry_run=False,
        )
        self.assertEqual(result.get("status"), "success")
        self.assertEqual(result.get("issue_number"), 101)

    def test_delete_issue_dry_run(self):
        result = delete_issue(
            issue_number=101,
            dry_run=True,
        )
        self.assertEqual(result.get("status"), "dry_run")
        self.assertEqual(result.get("issue_number"), 101)

    @patch("scripts.agentic.gh_project.exec_gh")
    def test_delete_issue_success(self, mock_exec):
        mock_res = MagicMock()
        mock_res.returncode = 0
        mock_res.stdout = "Issue deleted"
        mock_exec.return_value = mock_res

        result = delete_issue(
            issue_number=101,
            dry_run=False,
        )
        self.assertEqual(result.get("status"), "success")
        self.assertEqual(result.get("issue_number"), 101)

if __name__ == "__main__":
    unittest.main()
