const { stringToPair } = require('./string_to_pair');
const dotenv = require('dotenv').config();

let MATCHER = {};

(process.env.GITHUB_TODOIST_LABELS_MATCH || '')
  .split(';')
  .forEach(el => (MATCHER = { ...MATCHER, ...stringToPair(el) }));

function labelMatch(labelId) {
  return MATCHER[String(labelId)];
}

module.exports = { labelMatch };
