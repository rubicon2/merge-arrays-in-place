/**
 * @param {*[]} a The first array to be merged.
 * @param {*[]} b The second array to be merged.
 * @param {(a: any, b: any) => any} [mergeElementHandler=(a, b) => b] A function that decides which value to keep at each position in the output array. By default, this simply uses the value from each array index in array b instead of that of the same index in array a. You could use this, for example, to keep the largest number at each index out of the two arrays, or traverse objects and compare array elements based on object properties.
 * @returns {*[]} The merged array. The original arrays are unchanged.
 */
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
