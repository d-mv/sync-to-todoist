const colors = require('colors');

const { log, dir } = console;

// TODO: logger, logObject, logError
function logger(message, ...props) {
  log();
  process.stdout.write(message);

  if (props.length) {
    process.stdout.write(': '.red.underline);
    dir(props, { depth: 15 });
  }

  log();
}

function logInfo(message, ...props) {
  process.stdout.write(message.blue + ' ');

  if (props.length) {
    dir(...props, { depth: 15 });
  } else log('');
}

function logError(message, ...props) {
  process.stdout.write(message.red.underline + ' ');

  if (props.length) {
    dir(...props, { depth: 15 });
  } else log('');
}

function logNoActionSpecified(domain) {
  logError(`No action specified for ${domain.toUpperCase()}`);
}

module.exports = { logger, logInfo, logError, log, logNoActionSpecified };
