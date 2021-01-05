const { JIRA_HOST, JIRA_BOARD } = process.env;

function makeContent(summary, url) {
  return `${url} (${summary})`;
}

function makeJiraIssueUrl(id) {
  return `https://${JIRA_HOST}/jira/software/projects/RQPY/boards/${JIRA_BOARD}?selectedIssue=${id}`;
}

module.exports = { makeContent, makeJiraIssueUrl };
