import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/3input.txt`, 'utf-8');
console.time("Time");
const lines = input.split("\n").filter(Boolean);


const priorityFromLetter = (letter) => {
    const p = letter.charCodeAt(0)-96;
    if (p < 0) {
        return p + 58
    }
    return p;
};
const findCommonLetter = (left, right) => {
    return left.split("").find(letter => {
        return right.includes(letter);
    });
};
const findCommonAmongstLines = (l, ...otherLines) => {
    return l.split("").find(letter => {
        return otherLines.every(otherLine => {
            return otherLine.includes(letter);
        });
    });
};
const result = lines.reduce((total, line) => {
    const { length } = line;
    const half = length / 2;
    const left = line.substring(0, half);
    const right = line.substring(half);
    return total + priorityFromLetter(findCommonLetter(left, right));
}, 0);

let resultb = 0;
let packOf3Lines = [];
lines.map(line => {
    packOf3Lines.push(line);
    if (packOf3Lines.length < 3) {
        return;
    }
    resultb += priorityFromLetter(findCommonAmongstLines(...packOf3Lines));
    packOf3Lines.length = 0;
});


console.timeEnd("Time");
console.log(result);
console.log(resultb);
