const { filterProjects } = require('../tools/filter_projects');
const { flatten } = require('../tools/flatten');
const { identity } = require('../tools/identity');
const { getOctokit } = require('./setup');

let PROJECTS = {};

async function getColumns(projects, includeIgnored = false) {
  let columns = [];

  let prjs = projects;

  if (includeIgnored) prjs = filterProjects(projects);

  prjs.forEach(project => {
    PROJECTS = { ...PROJECTS, [project.id]: project.name };
    columns.push(
      getOctokit().request('GET /projects/{project_id}/columns', {
        project_id: project.id,
        mediaType: {
          previews: ['inertia'],
        },
      }),
    );
  });
  return await Promise.all(columns)
    .then(results => results.map(result => result.data))
    .then(mapped => flatten(identity(mapped)));
}

function getProjectsObject() {
  return PROJECTS;
}

module.exports = { getColumns, getProjectsObject };
