function mergeArraysInPlace(a, b, mergeElementHandler = (a, b) => b) {
  const result = [];
  let i = 0;
  while (i < a.length && i < b.length) {
    const merged = mergeElementHandler(a[i], b[i]);
    result.push(merged);
    i++;
  }
  return result.concat(a.slice(i), b.slice(i));
}

module.exports = mergeArraysInPlace;
