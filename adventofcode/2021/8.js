import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/8input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");
const patterns = lines.filter(Boolean).map(line => {
    const split = line.split(" | ");
    return split[1];
});

const map = [
    [1, "cf"],
    [7, "acf"],
    [8, "abcdefg"],
    [4, "bdcf"],
];

const count = {}
let total = 0;
patterns.forEach(pattern => {
    const words = pattern.split(" ").filter(Boolean);
    words.forEach(word => {
        map.some(([digit, chars]) => {
            if (chars.length === word.length) {
                // count[digit] = (count[digit] || 0) + 1;
                total += 1;
                return true
            }
        });
    });
});


console.timeEnd("Time");
console.log(total);
// console.log(count);

