function myFunc(a) {
  return a;
}

// parser Query
function parserUrlQuery(url) {
  const queryParams = {};
  const urlObj = new URL(url);

  for (const [key, value] of urlObj.searchParams.entries()) {
    if (queryParams[key]) {
      if (Array.isArray(queryParams[key])) {
        queryParams[key].push(value);
      } else {
        queryParams[key] = [queryParams[key], value];
      }
    } else {
      queryParams[key] = value;
    }
  }

  return queryParams;
}

module.exports = { myFunc, parserUrlQuery };
