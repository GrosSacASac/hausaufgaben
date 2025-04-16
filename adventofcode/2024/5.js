import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/5input.txt`, 'utf-8');


console.time("Time");

let total = 0;
let totalb = 0;
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

const incorrects = new Set();
const verifyUpdates = () => {
    updates.forEach((numbers, updateIndex) => {
        const {length} = numbers;
        const halfLength = Math.floor(length / 2);
        let valid = true;
        let middleNumber;
        numbers.forEach((number, i) => {
            rules.forEach(([a, b]) => {
                if (number === b) {
                    for (let j = i + 1; j < length; j += 1) {
                        if (numbers[j] === a) {
                            // invalid
                            valid = false;
                            incorrects.add(updateIndex)
                            break;
                        }
                    }
                }
            });
            if (i === halfLength) {
                middleNumber = number;
            }
        });
        if (valid) {
            total += middleNumber;
        }
    });
};

for (updateIndex of incorrects.entries()) {//does not iterate ?
    const numbers = updates[updateIndex];
    const copy = numbers.slice();
    const {length} = numbers;
    const halfLength = Math.floor(length / 2);
    
    let middleNumber;
    numbers.forEach((number, i) => {
        rules.forEach(([a, b]) => {
            if (number === b) {
                for (let j = i + 1; j < length; j += 1) {
                    if (numbers[j] === a) {
                        copy[i] = a
                        copy[j] = b
                        break;
                    }
                }
            }
        });
    });
    
    middleNumber = numbers[halfLength];
    totalb += middleNumber;
}
verifyUpdates();
// While the Elves get to work printing the correctly-ordered updates, you have a little time to fix the rest of them.

// For each of the incorrectly-ordered updates, use the page ordering rules to put the page numbers in the right order. For the above example, here are the three incorrectly-ordered updates and their correct orderings:

//     75,97,47,61,53 becomes 97,75,47,61,53.
//     61,13,29 becomes 61,29,13.
//     97,13,75,29,47 becomes 97,75,47,29,13.

// After taking only the incorrectly-ordered updates and ordering them correctly, their middle page numbers are 47, 29, and 47. Adding these together produces 123.

// Find the updates which are not in the correct order. What do you get if you add up the middle page numbers after correctly ordering just those updates?
console.timeEnd("Time");
// console.table(rules)
// console.table(updates)
console.log(total);
console.log(totalb);