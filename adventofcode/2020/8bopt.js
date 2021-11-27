import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* */
const input = fs.readFileSync(`${__dirname}/8input.txt`, 'utf-8')
const instructions = input.split("\n").filter(Boolean)
console.time("Time")
const jump = `jmp`
const noOperation = `nop`
const accumulator = `acc`

let i = 0
let switched = new Set();
let lastSwitchAccumator = 0;
let accumulatorValue = 0;
let totalIteration = 0
let lastSwitch = 0
while (i !== instructions.length) {
    i=lastSwitch
    accumulatorValue = lastSwitchAccumator;
    let alreadySwitched = false;
    const executedLines = new Set();
    // let currentInstruction = instructions[i]
    while (!executedLines.has(i) && i !== instructions.length) {
        totalIteration += 1
        executedLines.add(i);
        const line = instructions[i];
        let [verb, number] =line.split(" ");
        number = Number(number);
        if (!alreadySwitched && !switched.has(i)) {
            if ((verb === noOperation) || (verb === jump)) {
                if (verb === noOperation) {
                    verb = jump
                } else if (verb === jump) {
                    verb = noOperation
                }
                alreadySwitched = true;
                switched.add(i);
                lastSwitch = i
                lastSwitchAccumator = accumulatorValue;
            }
        }
        if ((verb === noOperation) || (verb === accumulator)) {
            i += 1
            if (verb === accumulator) {
                accumulatorValue += number;
            }
        } else if (verb === jump) {
            i += number;
        }
    }
    // console.log(`executedLines ${Array.from(executedLines)}
    // `);
}
console.timeEnd("Time")
console.log(`switched ${Array.from(switched)}
    `);
console.log(`accumulator value ${accumulatorValue}`);
console.log("total iterations", new Intl.NumberFormat("fr").format(totalIteration));