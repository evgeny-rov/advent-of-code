const fs = require('fs');

const isSubsetOf = (a, b) => a[0] >= b[0] && a[1] <= b[1];

fs.readFile('./input.txt', (_, data) => {
  const result = String(data)
    .split(/\r?\n/)
    .map((line) => line.split(',').map((range) => range.split('-').map(Number)))
    .reduce(
      (contained, sections) =>
        isSubsetOf(sections[0], sections[1]) || isSubsetOf(sections[1], sections[0])
          ? contained + 1
          : contained,
      0
    );

  console.log(result);
});
