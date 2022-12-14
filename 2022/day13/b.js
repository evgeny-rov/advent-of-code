const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const pairs = String(data)
    .split(/\r?\n\r?\n/)
    .map((pair) => pair.split(/\r?\n/).map((pair) => JSON.parse(pair)));

  const compare = (a, b) => {
    if (typeof a === 'undefined') return 1;
    if (typeof b === 'undefined') return -1;
    if (Number.isInteger(a) && Number.isInteger(b)) return a === b ? 0 : a < b ? 1 : -1;
    if (Number.isInteger(a) && Array.isArray(b)) return compare([a], b);
    if (Number.isInteger(b) && Array.isArray(a)) return compare(a, [b]);

    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const comparisonResult = compare(a[i], b[i]);
      if (comparisonResult !== 0) return comparisonResult;
    }

    return 0;
  };

  const dividers = [[[2]], [[6]]];
  const sorted = [...pairs, dividers].flat().sort((p1, p2) => compare(p2, p1));
  const [d1Idx, d2Idx] = sorted.reduce(
    (acc, val, idx) => (dividers.includes(val) ? [...acc, idx + 1] : acc),
    []
  );

  console.log(d1Idx * d2Idx);
});
