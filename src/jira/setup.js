const dotenv = require('dotenv').config();
const JiraApi = require('jira-client');
const { logError } = require('../tools/logger');

const { JIRA_HOST, JIRA_USERNAME, JIRA_PASSWORD } = process.env;

let jira = undefined;

async function connectJira() {
  if (!JIRA_HOST || !JIRA_USERNAME || !JIRA_PASSWORD) {
    logError('missing env');
    return;
  }

  jira = new JiraApi({
    protocol: 'https',
    host: JIRA_HOST,
    username: JIRA_USERNAME,
    password: JIRA_PASSWORD,
    apiVersion: '2',
    strictSSL: true,
  });

  return true;
}

function getJira() {
  return jira;
}

module.exports = { getJira, connectJira };
