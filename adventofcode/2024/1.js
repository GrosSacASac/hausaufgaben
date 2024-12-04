import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/1input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

const leftNumbers = [];
const rightNumbers = [];
const leftOrRightHelper = [leftNumbers,rightNumbers];

lines.forEach(line => {
    if (!line) {
        return;
    }
    let leftOrRight = 0;
    line.split(" ").forEach(function (number) {
        const stripped = number.trim();
        const asNumber = parseInt(stripped);
        if (!Number.isFinite(asNumber)) {
            return;
        }
        // console.log(asNumber, leftOrRight)
        leftOrRightHelper[leftOrRight].push(asNumber);
        leftOrRight += 1;
    });
});
const compareValue = (a, b) => a - b;
leftNumbers.sort(compareValue);
rightNumbers.sort(compareValue);

let addUp = 0;

leftNumbers.forEach((value, i) => {
    const difference = rightNumbers[i] - value;
    addUp += Math.abs(difference);
});

let similarityScore = 0;
let lastFound = 0;
leftNumbers.forEach(value => {
    let found = 0
    // starts at 0 could start higher,
    for (let i = 0; i < rightNumbers.length; i += 1) {
        const valueRight = rightNumbers[i];
        if (valueRight < value) {
            continue;
        } else if (valueRight > value) {
            similarityScore += (found * value);
            break;
        } else {
            found += 1;
            lastFound = i;
        }
    }
})
console.timeEnd("Time");
console.log({addUp});
console.log({similarityScore});
