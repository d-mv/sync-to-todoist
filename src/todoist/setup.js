const Todoist = require('todoist').v8;
const dotenv = require('dotenv').config();
const { logError, logInfo } = require('../tools/logger');

let todoist = undefined;
let isSynced = false;

async function connectTodoist() {
  if (!process.env.TODOIST_API_TOKEN) {
    logError('missing env');
    return;
  }

  todoist = Todoist(process.env.TODOIST_API_TOKEN);
  logInfo('[todoist] syncing...');

  if (!isSynced) {
    await todoist.sync(['all']);
    isSynced = true;
  }

  return true;
}

function getTodoist() {
  return todoist;
}

module.exports = { getTodoist, connectTodoist };
