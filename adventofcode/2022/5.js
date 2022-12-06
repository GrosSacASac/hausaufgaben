import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/5input.txt`, 'utf-8');
console.time("Time");
let [stacksInput, commands] = input.split("\n\n");
stacksInput = stacksInput.split("\n").filter(Boolean);
commands = commands.split("\n").filter(Boolean);

let stacks = [];
const createStacks = (stacksInput) => {
    const stacksLines = stacksInput.slice(0, stacksInput.length - 1);
    const numbers = stacksInput[stacksInput.length - 1];
    // the number donc't matter, we just take the last one to know the length
    const length = Number(Array.from(numbers).filter(character => {
        return character !== " ";
    }).at(-1));
    stacks = Array.from({length}, () => {
        return [];
    });

    for (let i = stacksLines.length - 1; i >= 0; i -= 1) {
        const stackLine = stacksLines[i];
        // every 4 there is a character
        for (let k = 1, m = 0; k < stackLine.length; k += 4, m += 1) {
            const c = stackLine[k];
            if (c !== " ") {
                stacks[m].push(c)
            }
        }

    }
    return stacks;
};


console.timeEnd("Time");
console.log(createStacks(stacksInput));
