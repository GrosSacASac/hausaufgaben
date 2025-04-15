import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const order = ["X", "M", "A", "S"];
const first = order[0];
const last = order[order.length - 1];
const relevant = order.join("", "");

const countLineSingle = (lineArray) => {
    let total = 0;
    let position = -1;
    let i = 0;
    let c = "";
    const lineLength = lineArray.length;
    while (i < lineLength) {
        c = lineArray[i];
        if (relevant.includes(c)) {
            if (position + 1 === order.indexOf(c)) {
                position += 1;
                if (c === last) {
                    total += 1;
                    position = -1;
                }
            } else if (c === first) {
                position = 0;
            } else {
                position = -1;
            }
        }
        i += 1;
    }
    return total;
};

const countLineAndReverse = (lineArray) => {
    const reversed = lineArray.slice().reverse();
    return countLineSingle(lineArray) + countLineSingle(reversed);
};

const linesFromText = (text) => {
    return text.split("\n").filter(Boolean).map((lineAsText) => {
        return Array.from(lineAsText);
    });
}

const columnsFromLines = (lines) => {
    // assume every line has the same length
    const lineLength = lines[0].length;
    const columns = [];
    for (let i = 0; i < lineLength; i +=1) {
        columns.push([]);
    }
    lines.forEach((element, j) => {
        for (let i = 0; i < lineLength; i +=1) {
            columns[i].push(lines[j][i]);
        }
    });
    return columns;
    
};



const input = fs.readFileSync(`${__dirname}/4input.txt`, 'utf-8');
console.time("Time");

const lines = linesFromText(input);
const columns = columnsFromLines(lines);
const diagonals = ...

console.timeEnd("Time");
console.log()