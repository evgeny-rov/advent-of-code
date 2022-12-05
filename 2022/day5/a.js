const fs = require('fs');

const configuration = [
  'WMLF',
  'BZVMF',
  'HVRSLQ',
  'FSVQPMTJ',
  'LSW',
  'FVPMRJW',
  'JQCPNRF',
  'VHPSZWRB',
  'BMJCGHZW',
];

const move = (q, from, to) => {
  const taken = configuration[from].slice(-q);
  const remaining = configuration[from].slice(0, -q);

  configuration[from] = remaining;
  configuration[to] += taken.split('').reverse().join('');
};

fs.readFile('./input.txt', (_, data) => {
  String(data)
    .split(/\r?\n/)
    .map((line) => line.match(/[0-9]+/g).map((arg) => Number(arg)))
    .forEach(([q, from, to]) => move(q, from - 1, to - 1));

  const result = configuration.map((col) => col.slice(-1)).join('');

  console.log(result);
});
