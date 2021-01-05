const jira = require('./jira/main');
const { github } = require('./github/main');
const { jiraIssuesToTodoistTasks, githubIssuesToTodoistTasks } = require('./todoist/make_tasks');
const { sendTasks } = require('./todoist/main');
const { logInfo, logNoActionSpecified } = require('./tools/logger');
const { getTodoistLabels } = require('./todoist/get_labels');
const { connectTodoist } = require('./todoist/setup');
const { getTodoistProjects } = require('./todoist/get_projects');
const { connectGithub } = require('./github/setup');
const { getGithubProjects } = require('./github/get_projects');
const { omitKeys } = require('./tools/omit_keys');
const args = require('minimist')(process.argv.slice(2), {
  boolean: ['i', 'ids'],
  alias: { i: 'includeIgnored', ids: 'idsOnly' },
});

const params = args._;

async function callJira() {
  switch (params[1]) {
    case 'sync':
      logInfo('[jira] sync...');
      const issues = await jira();
      sendTasks(jiraIssuesToTodoistTasks(issues));
      break;
    default:
      logNoActionSpecified('github');
  }
}

async function callGithub() {
  switch (params[1]) {
    case 'projects':
      logInfo('[github] get projects...');
      await connectGithub();
      const projects = await getGithubProjects(args);
      logInfo('[github] projects:', projects);
      break;
    case 'sync':
      logInfo('[github] sync...');
      const issues = await github(omitKeys(['_'], args));
      sendTasks(githubIssuesToTodoistTasks(issues));
      break;
    default:
      logNoActionSpecified('github');
  }
}

async function callTodoist() {
  switch (params[1]) {
    case 'labels':
      logInfo('[todoist] get labels...');
      await connectTodoist();
      getTodoistLabels(args);
      break;
    case 'projects':
      logInfo('[todoist] get projects...');
      await connectTodoist();
      getTodoistProjects(args);
      break;
    default:
      logNoActionSpecified('todoist');
  }
}

function showHelp() {
  logInfo('HELP', {
    jira: {
      sync: 'Find and sync new Jira issues to Todoist',
    },
    github: {
      projects: 'Show all projects',
      sync: 'Find and sync new Github issues to Todoist',
    },
    todoist: {
      labels: 'Show all Todoist labels',
      projects: 'Show all Todoist projects',
    },
    params: {
      '--i': 'to include ignored projects from github',
      '--ids': 'show only ID and name (Todoist only)',
    },
  });
}

(async function main() {
  if (params[0] === 'jira') callJira();
  else if (params[0] === 'github') callGithub();
  else if (params[0] === 'help') showHelp();
  else callTodoist();
})();
