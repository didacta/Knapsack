const fs = require('fs');

function knapsackRecursive(items, capacity) {

  function recur(i, size) {
    if (i === 0) {
      return {
        value: 0,
        size: 0,
        chosen: []
      };
    }

    else if (items[i].size > size) {
      return recur(i - 1, size);
    }
    else {
      const r0 = recur(i - 1, size);
      const r1 = recur(i - 1, size - items[i].size);
      r1.value += items[i].value;
      if (r0.value > r1.value) {
        return r0;
      } else {
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(i); // Make a copy of array
        return r1;
      }
    }
  }

  return recur(items.length - 1, capacity);
}


// -------------------------------------------------------------------
const args = process.argv.slice(2);

if (args.length != 2) {
  console.error("usage:knapsack infile capacity");
  process.exit(1);
}
const filename = args[0];
const capacity = args[1];

const filedata = fs.readFileSync(filename, "utf8");
const lines = filedata.trim().split(/[\r\n]+/);
const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));
  items[index] = {
    index: index,
    size: size,
    value: value
  };
}

knapsackRecursive(items, capacity)
console.log(items);