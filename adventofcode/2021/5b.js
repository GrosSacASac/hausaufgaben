import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/5input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");
let from = [];
let to = [];
lines.filter(Boolean).forEach(rawLine => {
    const split = rawLine.split(" -> ");
    from.push(split[0].split(",").map(Number));
    to.push(split[1].split(",").map(Number));
});

const map = new Map();

from.forEach((coordinatesFrom, i) => {
    const [x1, y1] = coordinatesFrom;
    const [x2, y2] = to[i];

    
    const direction = y1 < y2;
    let increment = -1
    if (direction) {
        increment = 1;
    } else if (y1 === y2) {
        increment = 0
    }
    
    const directionX = x1 < x2;
    let incrementX = -1
    if (directionX) {
        incrementX = 1;
    } else if (x1 === x2) {
        incrementX = 0;
    }

    let x = x1;
    for (let y = y1; y !== y2 + increment || x !== x2 + incrementX; y += increment) {
        const key = `${x},${y}`;
        map.set(key, (map.get(key) || 0) + 1);
        x += incrementX;
    }
});

let count = 0;

map.forEach(function (v, key) {
    // console.log(key, v)
    if (v >= 2) {
        count += 1
    }
})
console.timeEnd("Time");
console.log(count);
