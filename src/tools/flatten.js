function flatten(data) {
  let result = [];

  data.forEach(element => {
    if (Array.isArray(element)) result = [...result, ...element];
    else result = [...result, element];
  });

  return result;
}

module.exports = { flatten };
