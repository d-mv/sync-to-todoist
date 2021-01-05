const { stringToPair } = require('./string_to_pair');
const dotenv = require('dotenv').config();

let MATCHER = {};

(process.env.GITHUB_TODOIST_PRJ_MATCH || '')
  .split(';')
  .forEach(el => (MATCHER = { ...MATCHER, ...stringToPair(el) }));

function projectMatch(projectId) {
  return MATCHER[String(projectId)];
}

module.exports = { projectMatch };
