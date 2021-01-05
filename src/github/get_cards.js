const { CONFIG } = require('../config');
const { flatten } = require('../tools/flatten');
const { identity } = require('../tools/identity');
const { getOctokit } = require('./setup');

let COLUMNS = {};

async function getCards(columns) {
  let cards = [];
  columns
    .filter(el => CONFIG.github.columnsToCheck.includes(el.name))
    .forEach(column => {
      COLUMNS = { ...COLUMNS, [column.id]: column.name };
      cards.push(
        getOctokit().request('GET /projects/columns/{column_id}/cards', {
          column_id: column.id,
          mediaType: {
            previews: ['inertia'],
          },
        }),
      );
    });
  return await Promise.all(cards)
    .then(results => results.map(result => result.data))
    .then(mapped => flatten(identity(mapped)));
}

function getColumnsObject() {
  return COLUMNS;
}

module.exports = { getCards, getColumnsObject };
