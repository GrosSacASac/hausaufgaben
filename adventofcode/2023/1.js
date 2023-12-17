import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/1input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

let current = 0;
lines.forEach(line => {
    if (!line) {
        return;
    }
    let firstN = ``;
    let lastN = ``;
    Array.from(line).forEach(function (c) {
        const asNumber = parseInt(c);
        if (!Number.isFinite(asNumber)) {
            return;
        }
        if (!firstN) {
            firstN = c;
        }
        lastN = c;
    });
    const coordinateString = `${firstN}${lastN}`;  
    const coordinate = Number(coordinateString);
    console.log(coordinate);
    current += coordinate;
});


console.timeEnd("Time");
console.log({current});
