const fs = require('fs');

const shapeToPointsTable = {
  A: 1, //rock
  X: 1, //rock
  B: 2, //paper
  Y: 2, //paper
  C: 3, //scissors
  Z: 3, //scissors
};

const playRound = (opponentShape, playerShape) => {
  const opponentShapePoints = shapeToPointsTable[opponentShape];
  const playerShapePoints = shapeToPointsTable[playerShape];

  if (playerShapePoints === opponentShapePoints) {
    // draw
    return [opponentShapePoints + 3, playerShapePoints + 3];
  }

  const winningShape = (playerShapePoints % 3) + 1;

  if (opponentShapePoints === winningShape) {
    // opponent won
    return [opponentShapePoints + 6, playerShapePoints];
  }

  // player won
  return [opponentShapePoints, playerShapePoints + 6];
};

fs.readFile('./input.txt', (_, data) => {
  const gameResult = String(data)
    .split(/\r?\n/)
    .map(([opponent, _, player]) => playRound(opponent, player));

  console.log(
    'player total points:',
    gameResult.reduce((acc, round) => acc + round[1], 0)
  );
});
