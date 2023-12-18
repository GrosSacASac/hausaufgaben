import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/3input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

const symbols = [`+`, `-`, `*`, `$`, `#`, `%`, ];
const data = [];
lines.forEach(line => {
    if (!line) {
        return;
    }
    const linedata = [];
    data.push(linedata);

    
    const registerNumber = function (string, start, end) {
        linedata.push({
            number: Number(string),
            start,
            end,
        });    
    };
    
    let currentNumber = ``;
    let currentNumberIndex = 0;
    Array.from(line).forEach(function (c, i) {
        if (Number.isFinite(parseInt(c))) {
            if (!currentNumber) {
                currentNumberIndex = i;
            }
            currentNumber = `${currentNumber}${c}`;
        } else {
            if (currentNumber) {
                registerNumber(currentNumber, currentNumberIndex, i);
                currentNumber = ``;
            }
            if (symbols.includes(c)) {
                linedata.push({
                    symbol: c,
                    i,
                });
            }
        }
    });
    
    if (currentNumber) {
        registerNumber(currentNumber, currentNumberIndex, line.length - 1);
    }


});
const checkLine = function (lineData, start, end) {
    let symbolAdjacent = false;
    lineData.forEach(function (item) {
        if (!item.symbol) {
            return;
        }
        const {i} = item;
        for (let position = start; position < end; position += 1) {
            if (Math.abs(position - i) <= 1) {
                symbolAdjacent = true;
                break;
            }
        }
    });
    return symbolAdjacent;
};

let current = 0;
data.forEach(function (lineData, y) {
    lineData.forEach(function (item) {
        if (!item.number) {
            return;
        }
        const {number, start, end} = item;
        let symbolAdjacent = false;
        // check if symbol is adjacent
        
        if (y > 0) {
            const lineabove = data[y-1];
            symbolAdjacent = checkLine(lineabove, start, end);
        }
        symbolAdjacent ||= checkLine(lineData, start, end);
        if (y < data.length - 1) {
            const linebelow = data[y+1];
            symbolAdjacent ||= checkLine(linebelow, start, end);
        }
        if (symbolAdjacent) {
            // console.log(number);
            current += number;
        }

    });
});

console.timeEnd("Time");
// console.log(data);
console.log(current);
