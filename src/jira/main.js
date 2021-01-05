const { CONFIG } = require('../config');
const { logInfo } = require('../tools/logger');
const { getJira, connectJira } = require('./setup');

async function getIssues() {
  await connectJira();

  const sprints = await getJira().getAllSprints(process.env.JIRA_BOARD, 0, 50, 'active');

  const sprintId = sprints.values[0].id;

  const result = await getJira().getBoardIssuesForSprint(process.env.JIRA_BOARD, sprintId);

  let issues = [];

  result.issues.forEach(issue => {
    if (CONFIG.jira.columnsToCheck.includes(issue.fields.status.name)) {
      issues.push({
        id: issue.key,
        priority: issue.fields.priority.id,
        by: issue.fields.reporter.displayName,
        due: issue.fields.duedate,
        comments: issue.fields.comments,
        type: issue.fields.issuetype.name,
        summary: issue.fields.summary,
        desc: issue.fields.description,
        attachments: issue.fields.attachment.map(item => ({
          title: item.filename,
          url: item.content,
        })),
      });
    }
  });
  logInfo(`[jira] got ${issues.length} issue(s)`);
  return issues;
}

module.exports = getIssues;
