const { getTodoist } = require('./setup');

async function getExistingTask(task) {
  const items = await getTodoist().items.get();

  let result = undefined;

  items.forEach(item => {
    if (
      item.content === task.content &&
      String(item.project_id) === String(task.project_id) &&
      item.content.split('(')[0].trim() === task.content.split('(')[0].trim()
    ) {
      result = item;
    }
  });
  return result;
}

module.exports = { getExistingTask };
