const { identity } = require('../tools/identity');
const { logInfo } = require('../tools/logger');
const { getTodoist } = require('./setup');

async function getTodoistProjects(params) {
  const projects = await getTodoist().projects.get();
  logInfo(
    '[todoist] projects:',
    identity(
      projects.map(element => {
        if (params.idsOnly) return { id: element.id, name: element.name };
        else return element;
      }),
    ),
  );
}

module.exports = { getTodoistProjects };
