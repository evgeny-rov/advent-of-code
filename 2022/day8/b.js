const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const matrix = String(data)
    .split(/\r?\n/)
    .map((line) => line.split(''));

  let bestScenicScore = 0;

  const calcScore = (currentTree, trees) => {
    let result = 0;

    for (const tree of trees) {
      result++;

      if (tree >= currentTree) {
        break;
      }
    }

    return result;
  };

  for (let row = 0; row < matrix.length; row++) {
    for (let cell = 0; cell < matrix[row].length; cell++) {
      if (row === 0 || cell === 0 || row === matrix.length - 1 || cell === matrix[row].length - 1) {
        continue;
      }

      const currentTree = matrix[row][cell];

      const left = matrix[row].slice(0, cell).reverse();
      const right = matrix[row].slice(cell + 1);
      const top = matrix
        .map((row) => row[cell])
        .slice(0, row)
        .reverse();
      const bottom = matrix.map((row) => row[cell]).slice(row + 1);

      const totalScore =
        calcScore(currentTree, left) *
        calcScore(currentTree, right) *
        calcScore(currentTree, top) *
        calcScore(currentTree, bottom);

      bestScenicScore = Math.max(bestScenicScore, totalScore);
    }
  }

  console.log(bestScenicScore);
});
