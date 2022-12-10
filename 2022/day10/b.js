const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const ins = String(data).split(/\r?\n/);
  let cycle = 1;
  let x = 1;

  let CRT = Array(6)
    .fill(null)
    .map(() => Array(40).fill('.'));

  const updateCycle = () => {
    const row = Math.floor(cycle / 40);
    const caret = (cycle - 1) % 40;

    const sprite = [x - 1, x, x + 1];

    if (sprite.includes(caret)) {
      CRT[row][caret] = '#';
    }

    cycle++;
  };

  for (const i of ins) {
    const [name, param] = i.split(' ');
    updateCycle();

    if (name === 'addx') {
      updateCycle();
      x += Number(param);
    }
  }

  fs.writeFileSync('output.txt', CRT.map((line) => line.join('')).join('\n'));
});
