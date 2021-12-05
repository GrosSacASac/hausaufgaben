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
    // horizontal only
    if (!(x1 === x2 || y1 === y2)) {
        return;
    }
    if (x1 === x2) {
        const direction = y1 < y2;
        let increment = -1
        if (direction) {
            increment = 1;
        }
        for (let y = y1; y !== y2 + increment; y += increment) {
            const key = `${x1},${y}`;
            map.set(key, (map.get(key) || 0) + 1); 
        }
    }
    if (y1 === y2) {
        const direction = x1 < x2;
        let increment = -1
        if (direction) {
            increment = 1;
        }
        for (let x = x1; x !== x2 + increment; x += increment) {
            const key = `${x},${y1}`;
            map.set(key, (map.get(key) || 0) + 1); 
        }
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
