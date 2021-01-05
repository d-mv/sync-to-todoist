const { CONFIG } = require('../config');
const { labelMatch } = require('../tools/label_match');
const { makeContent, makeJiraIssueUrl } = require('../tools/makers');
const { projectMatch } = require('../tools/project_match');

const dotenv = require('dotenv').config();

const {
  TODOIST_PROJECT_ID,
  TODOIST_SECTION_ID,
  TODOIST_JIRA_LABEL_ID,
  TODOIST_GITHUB_LABEL_ID,
} = process.env;

const PRIORITY_MATCHER = {
  1: 4,
  2: 4,
  3: 3,
  4: 2,
  5: 1,
};

function makeTaskFromJiraIssue(
  { id, priority, by, due, comments, type, summary, desc, attachments },
  index,
) {
  return {
    task: {
      content: makeContent(summary, makeJiraIssueUrl(id)),
      project_id: Number(TODOIST_PROJECT_ID) || 0,
      priority: PRIORITY_MATCHER[Number(priority)],
      section_id: Number(TODOIST_SECTION_ID) || 0,
      child_order: index,
      labels: [Number(TODOIST_JIRA_LABEL_ID) || 0],
    },
    description: desc,
    attachments,
    comments,
  };
}

function makeTaskFromGithubIssue(
  { by, columnName, content, created_at, label, projectId, projectName, updated_at, url },
  index,
) {
  return {
    task: {
      content: makeContent(content, url),
      project_id: projectMatch(projectId), // TODO: can be based on projectName
      priority: 1,
      section_id: 0, // TODO: to be based on columnName
      child_order: index,
      labels: [Number(TODOIST_GITHUB_LABEL_ID), Number(labelMatch(label))],
    },
    // description: desc,
    // attachments,
    // comments,
  };
}

function jiraIssuesToTodoistTasks(issues) {
  let result = [];
  let i = 1;

  if (issues) {
    issues.forEach(async issue => {
      result.push(makeTaskFromJiraIssue(issue, i));
      i += 1;
    });
  }

  return result;
}

function githubIssuesToTodoistTasks(issues) {
  let result = [];
  let i = 1;

  if (issues) {
    issues.forEach(async issue => {
      result.push(makeTaskFromGithubIssue(issue, i));
      i += 1;
    });
  }

  return result;
}

module.exports = { githubIssuesToTodoistTasks, jiraIssuesToTodoistTasks };
