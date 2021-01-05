function identity(data) {
  let result = [];

  data.forEach(el => {
    if (!!el) result = [...result, el];
  });

  return result;
}

module.exports = { identity };
