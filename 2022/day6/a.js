const fs = require('fs');

fs.readFile('./input.txt', (_, data) => {
  const input = String(data);
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const chunk = input.slice(i, i + 4);
    const uniqueChars = new Set(chunk);

    if (uniqueChars.size === 4) {
      result = i + 4;
      break;
    }
  }

  console.log(result);
});
