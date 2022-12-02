const fs = require('fs');

const shapeToPointsTable = {
  A: 1, //rock
  B: 2, //paper
  C: 3, //scissors
};

const playRound = (opponentShape, roundOutcome) => {
  const opponentShapePoints = shapeToPointsTable[opponentShape];

  if (roundOutcome === 'Y') {
    // draw
    return [opponentShapePoints + 3, opponentShapePoints + 3];
  } else if (roundOutcome === 'X') {
    const loosingShape = ((opponentShapePoints + 1) % 3) + 1;
    // lose
    return [opponentShapePoints + 6, loosingShape];
  }
  const winningShape = (opponentShapePoints % 3) + 1;
  return [opponentShapePoints, winningShape + 6];
};

fs.readFile('./input.txt', (_, data) => {
  const gameResult = String(data)
    .split(/\r?\n/)
    .map(([opponent, _, outcome]) => playRound(opponent, outcome));

  console.log(
    'player total points:',
    gameResult.reduce((acc, round) => acc + round[1], 0)
  );
});
