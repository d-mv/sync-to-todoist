const { logError, logInfo } = require('../tools/logger');
const { getTodoist } = require('./setup');

async function addNotes(comments, taskId) {
  await comments.forEach(async content => {
    try {
      await getTodoist().notes.add({ item_id: taskId, content });
      logInfo('[todoist] note added');
    } catch (err) {
      logError('[todoist] error adding note', err.message);
    }
  });
  return true;
}

async function updateNotesForItem(taskId, comments) {
  try {
    let commentsToAdd = comments.filter(element => !!element);

    const notes = await getTodoist().notes.get();
    notes.forEach(element => {
      if (element.item_id === taskId) {
        if (comments.includes(element.content))
          commentsToAdd = commentsToAdd.filter(comment => comment !== element.content);
      }
    });
    await addNotes(commentsToAdd, taskId);

    return true;
  } catch (err) {
    logError('[todoist] error updating notes', err.message);
  }
}

module.exports = { updateNotesForItem };
