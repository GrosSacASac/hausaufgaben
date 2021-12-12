import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/11input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

const matrix = lines.filter(Boolean).map(line => {
    return Array.from(line).map(Number);
});

const xMax = matrix.length-1;
const yMax = matrix[0].length-1;
const max = 10;

const bumpRegion = (xStart, xStop , yStart, yStop) => {
    xStart = Math.max(xStart, 0);
    xStop = Math.min(xStop, xMax);
    yStart = Math.max(yStart, 0);
    yStop = Math.min(yStop, yMax);
    for (let x = xStart; x <= xStop; x+=1) {
        for (let y = yStart; y <= yStop; y+=1) {
            const squid = matrix[x][y];
            const plusOne = squid + 1;
            matrix[x][y] = plusOne;
            if (plusOne === max) {
                bumpRegion(x-1,x+1,y-1,y+1); // todo do not rebumb itself
            } 
        }
    }
}
const reinitAbove10 = (xStart, xStop , yStart, yStop) => {
    for (let x = xStart; x <= xStop; x+=1) {
        for (let y = yStart; y <= yStop; y+=1) {
            const squid = matrix[x][y];
            if (squid >= max) {
                matrix[x][y] = 0;
            } 
        }
    }
}
    
const allZero = (xStart, xStop , yStart, yStop) => {
    for (let x = xStart; x <= xStop; x+=1) {
        for (let y = yStart; y <= yStop; y+=1) {
            const squid = matrix[x][y];
            if (squid > 0) {
                return false
            } 
        }
    }
    return true;
}

let crucialStep =0
for (let i = 0; i < Number.MAX_SAFE_INTEGER; i+=1) {
    
    bumpRegion(0, xMax, 0, yMax);
    reinitAbove10(0, xMax, 0, yMax);
    if (allZero(0, xMax, 0, yMax)) {
        crucialStep = i + 1;
        break;
    }
}
// console.log(matrix)


console.timeEnd("Time");
console.log(crucialStep);
