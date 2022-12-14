const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const lines = String(data).split(/\r?\n/);
  const dirs = {};
  const parserPath = [];

  for (const line of lines) {
    if (/\d+\s\w+/.test(line)) {
      const fileSize = Number(line.match(/\d+/)[0]);

      const path = [];

      parserPath.forEach((dir) => {
        path.push(dir);

        const dirTotal = dirs[path.join('/')] ?? 0;
        dirs[path.join('/')] = dirTotal + fileSize;
      });
    } else if (/\$ cd/.test(line)) {
      const [_, _command, param] = line.split(' ');

      param === '..' ? parserPath.pop() : parserPath.push(param);
    }
  }

  const result = Object.values(dirs)
    .sort((a, b) => a - b)
    .find((dirSize) => 70000000 - dirs['/'] + dirSize >= 30000000);

  console.log(result);
});
