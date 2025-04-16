import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/5input.txt`, 'utf-8');


console.time("Time");

let total = 0;
const [rulesText, updatesText] = input.split("\n\n");
const rules = rulesText.split("\n").map(line => {
    const [a, b] = line.split("|").map(Number);
    return [a, b];
});

const updates = updatesText.split("\n").map(line => {
    const trimmed = line.trim();
    if (!trimmed) {
        return;
    }
    const numbers = trimmed.split(",");
    return numbers.map(Number).filter(Number.isFinite);
}).filter(Boolean);

const verifyUpdates = () => {
    updates.forEach((numbers) => {
        const {length} = numbers;
        const halfLength = Math.floor(length / 2);
        let valid = true;
        let middleNumber;
        numbers.forEach((number, i) => {
            rules.forEach(([a, b]) => {
                if (number === a) {
                    for (let j = i + 1; j < length; j += 1) {
                        
                    }
                }
                if (number === b) {
                    for (let j = i + 1; j < length; j += 1) {
                        if (numbers[j] === a) {
                            // invalid
                            valid = false;
                            break;
                        }
                    }
                }
            })
            if (i === halfLength) {
                middleNumber = number;
            }
        });
        if (valid) {
            total += middleNumber;
        }
    });
};
verifyUpdates();

console.timeEnd("Time");
// console.table(rules)
// console.table(updates)
console.log(total);