import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let day = ``;
Array.from(__filename.split(__dirname)[1]).forEach(function (c) {
    if (Number.isFinite(parseInt(c))) {
        day = `${day}${c}`;
    }
});
const input = fs.readFileSync(`${__dirname}/${day}input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

let total = 0;
lines.forEach(line => {
    if (!line) {
        return;
    }
    let wins = 0;
    const [card, winningNumbers] = line.split("|");
    const cardNumbers = card.split(":")[1].trim();
    const cardNumbersArray = cardNumbers.split(" ").map(Number).filter(Boolean);
    const winningNumbersArray = winningNumbers.trim().split(" ").map(Number).filter(Boolean);
    
    wins = cardNumbersArray.reduce(function (t, n) {
        return t + Number(winningNumbersArray.some(function (n2) {
            return n === n2;
        }));
    }, 0);
    // console.log(wins);
    if (wins) {
        total += 2**(wins-1);
    }

});


console.timeEnd("Time");
console.log({total});
// console.log(current);
