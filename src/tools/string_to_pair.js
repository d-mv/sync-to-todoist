function stringToPair(s) {
  return { [s.split(':')[0]]: s.split(':')[1] };
}

module.exports = { stringToPair };
