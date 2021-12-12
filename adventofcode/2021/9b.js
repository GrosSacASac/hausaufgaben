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
let total = 0;

matrix.forEach((line, i) => {
    line.forEach((number, j) => {
        if (
            (!Number.isFinite(matrix?.[i-1]?.[j]) || matrix?.[i-1]?.[j] > number) &&
            (!Number.isFinite(matrix?.[i+1]?.[j]) || matrix?.[i+1]?.[j] > number) &&
            (!Number.isFinite(matrix[i][j-1]) || matrix[i][j-1] > number) &&
            (!Number.isFinite(matrix[i][j+1]) || matrix[i][j+1] > number)
        ) {
            lowPoints.push([i, j])
        }
    });
});

const bassinSize = (x, y, visited = []) => {
    const locationString = `${x},${y}`; 
    if (visited.includes(locationString)) {
        return 0;
    }
    visited.push(locationString);
    let size = 1;
    if (Number.isFinite(matrix?.[x-1]?.[y]) && matrix[x-1][y] !== 9) {
        size += bassinSize(x-1, y, visited);
    }
    if (Number.isFinite(matrix?.[x+1]?.[y]) && matrix[x+1][y] !== 9) {
        size += bassinSize(x+1, y, visited);
    }
    if (Number.isFinite(matrix[x][y+1]) && matrix[x][y+1] !== 9) {
        size += bassinSize(x, y+1, visited);
    }
    if (Number.isFinite(matrix[x][y-1]) && matrix[x][y-1] !== 9) {
        size += bassinSize(x, y-1, visited);
    }
    return size;
}

let bassinSizes = [];
let v = [];
lowPoints.forEach(([x, y]) => {
    bassinSizes.push(bassinSize(x,y,v))
});
bassinSizes.sort(function (a,b) {
    return b-a;
});
// console.log(bassinSizes);
total = bassinSizes[0] * bassinSizes[1] * bassinSizes[2];
console.timeEnd("Time");
console.log(total);

