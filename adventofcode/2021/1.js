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
let increased = 0;
let lastNumber = numbers[0];
for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] > lastNumber) {
        increased += 1;
    }
    lastNumber = numbers[i];
}
console.timeEnd("Time")
console.log(increased)
