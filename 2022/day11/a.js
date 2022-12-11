const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const monkeys = String(data)
    .split(/Monkey \d+:\r?\n/)
    .filter((line) => line.length > 0)
    .map((monkey) => {
      const lines = monkey.split(/\r?\n/);
      const items = lines[0].match(/\d+/g);
      const data = { inspections: 0 };

      const inspect = (a) => {
        data.inspections++;
        const [operator] = lines[1].match(/[+*-/]/g);
        const operand = lines[1].match(/\d+/g);
        const b = operand ? operand[0] : a;
        return eval(`${a} ${operator} ${b}`);
      };

      const test = (val) => {
        const b = lines[2].match(/\d+/g);
        const [onTrue, onFalse] = (lines[3] + lines[4]).match(/\d+/g);
        return val % Number(b) === 0 ? Number(onTrue) : Number(onFalse);
      };

      return { items, data, inspect, test };
    });

  const round = () => {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        const item = monkey.items.shift();
        const itemWithWorry = Math.floor(monkey.inspect(item) / 3);
        const nextMonkey = monkey.test(itemWithWorry);

        monkeys[nextMonkey].items.push(itemWithWorry);
      }
    });
  };

  for (let i = 0; i < 20; i++) round();

  const sorted = monkeys.sort((mA, mB) => mB.data.inspections - mA.data.inspections);
  console.log(sorted[0].data.inspections * sorted[1].data.inspections);
});
