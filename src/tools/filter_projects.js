const dotenv = require('dotenv').config();

function filterProjects(projects) {
  return projects.filter(
    prj => !(process.env.GITHUB_IGNORE_PROJECTS_IDS || '').split(';').includes(String(prj.id)),
  );
}

module.exports = { filterProjects };
