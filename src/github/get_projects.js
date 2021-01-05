const dotenv = require('dotenv').config();
const { filterProjects } = require('../tools/filter_projects');
const { identity } = require('../tools/identity');
const { getOctokit } = require('./setup');

async function getGithubProjects(params) {
  let result = await getOctokit().request('GET /orgs/{org}/projects', {
    org: process.env.GITHUB_ORG,
    mediaType: {
      previews: ['inertia'],
    },
  });

  if (params.includeIgnored) result = result.data;
  else result = filterProjects(result.data);

  return identity(
    result.map(element => {
      if (params.idsOnly) return { id: element.id, name: element.name };
      else return element;
    }),
  );
}

module.exports = { getGithubProjects };
