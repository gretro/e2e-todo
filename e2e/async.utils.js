async function mapAsync(items, mapper) {
  const results = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const result = mapper(item, i);

    results.push(result);
  }

  return results;
}

module.exports = {
  mapAsync
};
