const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const ins = String(data).split(/\r?\n/);
  let cycle = 1;
  let x = 1;
  let totalSS = 0;

  const updateCycle = () => {
    if (cycle === 20 || (cycle - 20) % 40 === 0) {
      totalSS += x * cycle;
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

  console.log(totalSS);
});
