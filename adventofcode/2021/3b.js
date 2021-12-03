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
let c = 0;
let d = 0;

let remaining = snumbers;
let i = 0;
while (remaining.length > 1) {
    let count = 0;
    remaining.forEach(binaryString => {
        const c = binaryString[i];
        if (c === `1`) {
            count += 1;
        }
    });
    let mostCommon = String(Number(count >= (remaining.length / 2)));
    remaining = remaining.filter(binaryString => {
        const c = binaryString[i];
        return (c === mostCommon);
    })
    i += 1;
}
c = parseInt(remaining[0], 2);
// could problably use bitwise operators
remaining = snumbers;
i = 0;
while (remaining.length > 1) {
    let count = 0;
    remaining.forEach(binaryString => {
        const c = binaryString[i];
        if (c === `1`) {
            count += 1;
        }
    });
    let leastCommon = String(Number(count < (remaining.length / 2)));
    remaining = remaining.filter(binaryString => {
        const c = binaryString[i];
        return (c === leastCommon);
    })
    i += 1;
}
d = parseInt(remaining[0], 2);

console.timeEnd("Time")
console.log(c * d)
// console.log(c, d)
