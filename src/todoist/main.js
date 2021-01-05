const { logInfo, logError } = require('../tools/logger');
const { makeAttachmentsNote } = require('./make_attachments_note');
const { getExistingTask } = require('./get_task');
const { updateNotesForItem } = require('./update_notes');
const { getTodoist, connectTodoist } = require('./setup');

async function postToTodoist({ task, description, comments, attachments }) {
  if (!task) {
    logError('no task to add');
    return;
  }

  const existingItem = await getExistingTask(task);

  if (existingItem) {
    logInfo('[todoist] item exists, will update if needed...');
    await updateNotesForItem(existingItem.id, [
      description,
      comments,
      makeAttachmentsNote(attachments),
    ]);
  } else {
    logInfo(`[todoist] adding task...`);

    try {
      const newItem = await getTodoist().items.add(task);
      logInfo('[todoist] item added');
      await updateNotesForItem(newItem.id, [
        description,
        comments,
        makeAttachmentsNote(attachments),
      ]);
    } catch (err) {
      logError('postToTodoist error', err.message);
    }

    return true;
  }
}

async function sendTasks(tasks) {
  await connectTodoist();

  if (!!tasks && !!tasks.length)
    tasks.forEach(async task => {
      await postToTodoist(task);
    });
}

module.exports = { sendTasks };
