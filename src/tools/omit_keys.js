function omitKeys(keys = [], obj) {
  let result = {};

  Object.keys(obj).forEach(key => {
    if (!keys.includes(key)) result = { ...result, [key]: obj[String(key)] };
  });
  return result;
}

module.exports = { omitKeys };
