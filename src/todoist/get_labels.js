const { identity } = require('../tools/identity');
const { logInfo } = require('../tools/logger');
const { getTodoist } = require('./setup');

async function getTodoistLabels(params) {
  const labels = await getTodoist().labels.get();
  logInfo(
    '[todoist] labels:',
    identity(
      labels.map(element => {
        if (params.idsOnly) return { id: element.id, name: element.name };
        else return element;
      }),
    ),
  );
}

module.exports = { getTodoistLabels };
