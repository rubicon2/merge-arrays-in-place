# merge-arrays-in-place

The first two parameters will be the arrays you want to merge, and the optional third parameter is for a element merge function. By default it simply overwrites the first array's element with the corresponding element in the second array.

## Usage

```js
import mergeArraysInPlace from 'merge-arrays-in-place';

// Result: [1, 2, 3, 4]
const overwrite = mergeArraysInPlace(
  [4, 5, 6],
  [1, 2, 3, 4]
);

// Result: [4, 5, 6, 4]
const larger = mergeArraysInPlace(
  [4, 5, 6],
  [1, 2, 3, 4],
  // Custom element merge function that selects the larger of the two elements corresponding to the same array index.
  (a, b) => a > b ? a : b
)

// Result: [{ a: 1, b: 2 }, { c: 3, d: 4 }]
const mergedObjects = mergeArraysInPlace(
  [{ a: 1 }, { c: 3 }],
  [{ b: 2 }, { d: 4 }],
  // Custom element merge function that merges the objects together.
  (a, b) => Object.assign(a, b)
)

// Use with @rubicon2/deep-merge to deeply merge objects in place.
const deeplyMergeObjectsInPlace = mergeArraysInPlace(
  [],
  [],
  (a, b) => deepMerge(a, b)
)
```
