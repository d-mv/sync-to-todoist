const { flatten } = require('../tools/flatten');
const { identity } = require('../tools/identity');
const { getColumnsObject } = require('./get_cards');
const { getProjectsObject } = require('./get_columns');
const { getOctokit } = require('./setup');

let CARDS_IN_COLUMNS = {};

async function getIssues(cards) {
  let issues = [];

  cards.forEach(card => {
    if (card.content_url) {
      CARDS_IN_COLUMNS = {
        ...CARDS_IN_COLUMNS,
        [card.content_url]: {
          columnId: card.column_url.split('https://api.github.com/projects/columns/')[1],
          projectId: card.project_url.split('https://api.github.com/projects/')[1],
        },
      };
      issues.push(
        getOctokit().request(`GET /${card.content_url.split('https://api.github.com/')[1]}`),
      );
    }
  });
  return await Promise.all(issues)
    .then(results => results.map(result => result.data))
    .then(mapped => flatten(identity(mapped)))
    .then(flatten => flatten.filter(issue => issue.assignee.login === process.env.GITHUB_I_AM))
    .then(filtered =>
      filtered.map(element => {
        return {
          by: element.user.login,
          columnName: getColumnsObject()[CARDS_IN_COLUMNS[element.url].columnId],
          content: element.title,
          created_at: element.created_at,
          label: element.labels[0].name,
          projectId: CARDS_IN_COLUMNS[element.url].projectId,
          projectName: getProjectsObject()[CARDS_IN_COLUMNS[element.url].projectId],
          updated_at: element.updated_at,
          url: 'https://github.com/' + element.url.split('https://api.github.com/repos/')[1],
        };
      }),
    );
}

module.exports = { getIssues };
