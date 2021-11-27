import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* */
const input = fs.readFileSync(`${__dirname}/8input.txt`, 'utf-8')
const instructions = input.split("\n").filter(Boolean)
const jump = `jmp`
const noOperation = `nop`
const accumulator = `acc`

const executedLines = new Set()
let accumulatorValue = 0
let i = 0
// let currentInstruction = instructions[i]
while (!executedLines.has(i)) {
    executedLines.add(i);
    const line = instructions[i];
    if (line === undefined) {
        break
    }
    let [verb, number] =line.split(" ")
    number = Number(number)
    if ((verb === noOperation) || (verb === accumulator)) {
        i += 1
        if (verb === accumulator) {
            accumulatorValue += number
        }
    } else if (verb === jump) {
        i += number
    }
}
console.log(`executedLines ${Array.from(executedLines)}`);
console.log(`accumulator value ${accumulatorValue}`);