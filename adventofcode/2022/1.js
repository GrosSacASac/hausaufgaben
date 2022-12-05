import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/1input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

const kals=[];
let current = 0;
lines.forEach(line => {
    if (!line) {
        kals.push(current);
        current = 0;
    }
    current += Number(line);
});
kals.sort((a, b) => {
    return b - a;
});
const [f, s, t] = kals;
const max = f;
const top3= f + s + t;


console.timeEnd("Time");
console.log({f, s, t});
console.log({max});
console.log({top3});
