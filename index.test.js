const mergeArraysInPlace = require('./index');

describe('mergeArraysInPlace', () => {
  it('should correctly merge two arrays of objects which are the same length', () => {
    const a = [{ a: 2 }, { a: 3, b: 5 }];
    const b = [
      { a: 1, b: 2 },
      { c: 3, d: 4 },
    ];
    expect(mergeArraysInPlace(a, b)).toEqual([
      {
        a: 1,
        b: 2,
      },
      {
        c: 3,
        d: 4,
      },
    ]);
  });

  it.each([
    {
      a: [{ a: 5 }, { b: 4 }, { c: 3 }],
      b: [{ a: 1 }, { b: 2 }],
      result: [
        {
          a: 1,
        },
        {
          b: 2,
        },
        {
          c: 3,
        },
      ],
    },
    {
      a: [{ a: 5 }, { b: 4 }],
      b: [{ a: 1 }, { b: 2 }, { c: 3 }],
      result: [
        {
          a: 1,
        },
        {
          b: 2,
        },
        {
          c: 3,
        },
      ],
    },
  ])(
    'should correctly merge two arrays of objects which are of different lengths',
    ({ a, b, result }) => {
      expect(mergeArraysInPlace(a, b)).toEqual(result);
    },
  );

  it.each([
    {
      a: [],
      b: [],
      result: [],
    },
    {
      a: [1, 2, 3],
      b: [],
      result: [1, 2, 3],
    },
    {
      a: [],
      b: [1, 2, 3],
      result: [1, 2, 3],
    },
  ])('should work even if one or both arrays are empty', ({ a, b, result }) => {
    expect(mergeArraysInPlace(a, b)).toEqual(result);
  });

  it.each([
    {
      a: [4, 5, 6],
      b: [1, 2, 3],
      result: [1, 2, 3],
    },
    {
      a: [5, 4, 3],
      b: [1, 2],
      result: [1, 2, 3],
    },
    {
      a: [5, 4],
      b: [1, 2, 3],
      result: [1, 2, 3],
    },
  ])(
    'should overwrite the elements from a with elements from b, by default',
    ({ a, b, result }) => {
      expect(mergeArraysInPlace(a, b)).toEqual(result);
    },
  );

  it.each([
    {
      a: [1, 2, 3],
      b: [4, 5, 6],
      mergeHandler: (a, b) => (a > b ? a : b),
      result: [4, 5, 6],
    },
    {
      a: [1, 2, 3],
      b: [4, 5, 6],
      mergeHandler: (a, b) => (a < b ? a : b),
      result: [1, 2, 3],
    },
    {
      a: [1, 2, 3],
      b: [1.5, 2.5, 3.5],
      mergeHandler: (a, b) => [a, b],
      result: [
        [1, 1.5],
        [2, 2.5],
        [3, 3.5],
      ],
    },
    {
      a: [
        {
          where: {
            name: 'jimbo',
          },
        },
      ],
      b: [
        {
          orderBy: {
            publishedAt: 'asc',
          },
        },
      ],
      mergeHandler: (a, b) => Object.assign({}, a, b),
      result: [
        {
          where: {
            name: 'jimbo',
          },
          orderBy: {
            publishedAt: 'asc',
          },
        },
      ],
    },
  ])(
    'should be able to use an optional function in the 3rd parameter to merge elements together',
    ({ a, b, mergeHandler, result }) => {
      expect(mergeArraysInPlace(a, b, mergeHandler)).toEqual(result);
    },
  );
});
