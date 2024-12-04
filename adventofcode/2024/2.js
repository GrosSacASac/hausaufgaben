import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/2input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

let safe = 0;
lines.forEach(line => {
    if (!line) {
        return;
    }
    const numbers = line.split(" ").map(function (number) {
        const stripped = number.trim();
        const asNumber = parseInt(stripped);
        if (!Number.isFinite(asNumber)) {
            return;
        }
        return asNumber;
    }).filter(Boolean);
    let increasing = undefined;
    let first = true;
    let lineIsSafe = numbers.every((number, i) => {
        if (first === true) {
            first = false;
            return true;
        }
        const previousNumber = numbers[i - 1];
        let localIncrease = (previousNumber < number)
        if (increasing === undefined) {
            increasing = localIncrease;
        }

        if (increasing === localIncrease) {
            const difference = Math.abs(previousNumber - number);
            if (difference >= 1 && difference <= 3) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });
    safe += Number(lineIsSafe);
});

console.timeEnd("Time");
console.log({safe});
