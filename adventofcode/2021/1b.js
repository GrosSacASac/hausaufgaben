import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/1input.txt`, 'utf-8')
console.time("Time")
let lines = input.split("\n")
const numbers = lines.filter(Boolean).map(rawLine => {
    return rawLine.trim();
}).map(Number).filter(Boolean);


const windows = [];
for (let i = 0; i < numbers.length; i += 1) {
    let currentWindow = 0;
    for (let j = 0; j < 3; j += 1) {
        currentWindow += numbers[i+j];
    }
    // out of bound is undefined
    // undefined + number is NaN
    // NaN is not finite
    if (Number.isFinite(currentWindow)) {
        windows.push(currentWindow);
    }
}

// same as before
let increased = 0;
let lastNumber = windows[0];
for (let i = 0; i < windows.length; i += 1) {
    if (windows[i] > lastNumber) {
        increased += 1;
    }
    lastNumber = windows[i];
}
console.timeEnd("Time")
console.log(increased)
