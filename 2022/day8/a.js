const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const matrix = String(data)
    .split(/\r?\n/)
    .map((line) => line.split(''));

  let visibleTrees = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let cell = 0; cell < matrix[row].length; cell++) {
      if (row === 0 || cell === 0 || row === matrix.length - 1 || cell === matrix[row].length - 1) {
        visibleTrees++;
        continue;
      }

      const tree = matrix[row][cell];

      const left = matrix[row].slice(0, cell);
      const right = matrix[row].slice(cell + 1);
      const top = matrix.map((row) => row[cell]).slice(0, row);
      const bottom = matrix.map((row) => row[cell]).slice(row + 1);

      [left, right, top, bottom]
        .map((line) => line.every((val) => tree > val))
        .some((isVisible) => isVisible) && visibleTrees++;
    }
  }

  console.log(visibleTrees);
});
