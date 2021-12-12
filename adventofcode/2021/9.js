import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/9input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

const matrix = lines.filter(Boolean).map(line => {
    return Array.from(line).map(Number);
});

const lowPoints = []
const lowPointsPlus = []
let total = 0;

// dddd
// e    a
// e    a
//  ffff
// g    b
// g    b
//  cccc
matrix.forEach((line, i) => {
    line.forEach((number, j) => {
        if (
            (!Number.isFinite(matrix?.[i-1]?.[j]) || matrix?.[i-1]?.[j] > number) &&
            (!Number.isFinite(matrix?.[i+1]?.[j]) || matrix?.[i+1]?.[j] > number) &&
            (!Number.isFinite(matrix[i][j-1]) || matrix[i][j-1] > number) &&
            (!Number.isFinite(matrix[i][j+1]) || matrix[i][j+1] > number)
        ) {
            lowPoints.push(number)
            lowPointsPlus.push(number+1)
            total += (number+1)
        }
    });
});


console.timeEnd("Time");
console.log(lowPoints);
console.log(total);

