import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/3input.txt`, 'utf-8');
console.time("Time");
// const lines = input.split("\n");
let c="x";


states
while (c) {

}

let safe = 0;

const isLineSafe = (numbers) => {
    let increasing = undefined;
    let first = true;
    return numbers.every((number, i) => {
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
};

const numbersFromLine = (line) => {
    return line.split(" ").map(function (number) {
        const stripped = number.trim();
        const asNumber = parseInt(stripped);
        if (!Number.isFinite(asNumber)) {
            return;
        }
        return asNumber;
    }).filter(Boolean);
};

lines.forEach(line => {
    if (!line) {
        return;
    }
    safe += Number(isLineSafe(numbersFromLine(line)));
});


let safeb = 0;
lines.forEach(line => {
    if (!line) {
        return;
    }
    const numbers = numbersFromLine(line);
    const safeWithOneRemoval = isLineSafe(numbers) || numbers.some((ignore, i) => {
        const arrayMinusOneElement = Array.from(numbers);
        arrayMinusOneElement.splice(i, 1);
        return isLineSafe(arrayMinusOneElement)
    });
    safeb += Number(safeWithOneRemoval);
});

console.timeEnd("Time");
console.log({safe, safeb});
