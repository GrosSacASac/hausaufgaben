import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/3input.txt`, 'utf-8')
console.time("Time")
let lines = input.split("\n")
const snumbers = lines.filter(Boolean).map(rawLine => {
    return rawLine.trim();
}).filter(Boolean);
let a = 0;
let b = 0;
let array = Array.from({length: snumbers[0].length}, function () {
    return 0;
});
snumbers.forEach(binaryString => {
    Array.from(binaryString).forEach((c, i) => {
        if (c === `1`) {
            array[i] += 1;
        }
    });
});
let mostCommon = array.map(count => {
    return Number(count >= (snumbers.length / 2));
});
a = parseInt(mostCommon.join(""), 2);
// could problably use bitwise operators
b = parseInt(mostCommon.map(positionI => {
    return Number(positionI === 0);
}).join(""), 2);
console.timeEnd("Time")
console.log(a*b)
// console.log(array, mostCommon, a, b)
// console.log(a.toString(2), b.toString(2));
