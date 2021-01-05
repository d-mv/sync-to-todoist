const dotenv = require('dotenv').config();
const { logInfo } = require('../tools/logger');
const { getCards } = require('./get_cards');
const { getColumns } = require('./get_columns');
const { getIssues } = require('./get_issues');
const { getGithubProjects } = require('./get_projects');
const { connectGithub } = require('./setup');

async function github(params = {}) {
  if (
    !process.env.GITHUB_ORG ||
    !process.env.GITHUB_I_AM ||
    !process.env.GITHUB_IGNORE_PROJECTS_IDS
  )
    throw new Error('missing .env');

  await connectGithub();

  const projects = await getGithubProjects(params);
  const columns = await getColumns(projects, params.includeIgnored);
  const result = await getCards(columns);
  const issues = await getIssues(result);
  logInfo(`[github] there are ${issues.length} issue(s)`);
  return issues;
}

module.exports = { github };
